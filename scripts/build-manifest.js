#!/usr/bin/env node
/**
 * build-manifest.js
 *
 * Recursively scans artifacts/, merges custom metadata from
 * artifacts/metadata.json, and generates manifest.json.
 *
 * metadata.json supports:
 *   - Per-artifact: { "path/to/file": { title, tags, category } }
 *   - Per-folder defaults: { "_folder_defaults": { "folder": { tags } } }
 *
 * Usage:  node scripts/build-manifest.js
 */

const fs = require('fs');
const path = require('path');

const ARTIFACTS_DIR = path.join(__dirname, '..', 'artifacts');
const METADATA_FILE = path.join(ARTIFACTS_DIR, 'metadata.json');
const OUTPUT_FILE = path.join(__dirname, '..', 'manifest.json');

const SUPPORTED_EXTENSIONS = [
  '.html', '.htm', '.jsx', '.tsx', '.css', '.svg',
  '.md', '.markdown', '.pdf', '.txt', '.docx', '.qmd',
  '.png', '.jpg', '.jpeg', '.gif', '.webp', '.bmp', '.ico',
  '.json', '.csv', '.xml', '.yaml', '.yml',
  '.js', '.ts', '.py', '.r', '.R', '.sh', '.sql',
  '.ipynb',
];

// Load custom metadata
let metadata = {};
if (fs.existsSync(METADATA_FILE)) {
  try {
    metadata = JSON.parse(fs.readFileSync(METADATA_FILE, 'utf-8'));
    console.log('Loaded metadata.json');
  } catch (e) {
    console.warn('Warning: could not parse metadata.json:', e.message);
  }
}

const folderDefaults = metadata._folder_defaults || {};

function scanRecursive(dir, relativeBase) {
  const results = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    if (entry.name === 'metadata.json') continue;

    const fullPath = path.join(dir, entry.name);
    const relativePath = relativeBase
      ? `${relativeBase}/${entry.name}`
      : entry.name;

    if (entry.isDirectory()) {
      results.push(...scanRecursive(fullPath, relativePath));
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (!SUPPORTED_EXTENSIONS.includes(ext)) continue;

      const stat = fs.statSync(fullPath);
      const folder = relativeBase ? relativeBase.split('/')[0] : null;

      // Merge metadata: folder defaults + per-artifact overrides
      const folderMeta = folder && folderDefaults[folder] ? folderDefaults[folder] : {};
      const artifactMeta = metadata[relativePath] || {};

      // Tags: combine folder defaults + artifact-specific, deduplicated
      const combinedTags = [
        ...(folderMeta.tags || []),
        ...(artifactMeta.tags || []),
      ];
      const tags = [...new Set(combinedTags)];

      const item = {
        filename: entry.name,
        path: relativePath,
        folder: folder,
        size: stat.size,
        modified: stat.mtime.toISOString(),
      };

      if (artifactMeta.title) item.title = artifactMeta.title;
      if (artifactMeta.category) item.category = artifactMeta.category;
      if (tags.length > 0) item.tags = tags;

      results.push(item);
    }
  }

  return results;
}

const artifacts = scanRecursive(ARTIFACTS_DIR, '')
  .sort((a, b) => new Date(b.modified) - new Date(a.modified));

const folders = [...new Set(artifacts.map(a => a.folder).filter(Boolean))].sort();
const allTags = [...new Set(artifacts.flatMap(a => a.tags || []))].sort();

const manifest = {
  generated: new Date().toISOString(),
  count: artifacts.length,
  folders,
  tags: allTags,
  artifacts,
};

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2));
console.log(`Manifest generated: ${artifacts.length} artifact(s), ${folders.length} folder(s), ${allTags.length} tag(s).`);
if (folders.length) console.log(`  Folders: ${folders.join(', ')}`);
if (allTags.length) console.log(`  Tags: ${allTags.join(', ')}`);
