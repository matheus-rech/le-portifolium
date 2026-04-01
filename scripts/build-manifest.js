#!/usr/bin/env node
/**
 * build-manifest.js
 *
 * Recursively scans the artifacts/ folder (including subfolders)
 * and generates manifest.json for the gallery.
 *
 * Supports: HTML, JSX, Markdown, PDF, images, code, data files,
 * Shiny app showcase cards, Quarto rendered output, and more.
 *
 * Usage:  node scripts/build-manifest.js
 * Run automatically via GitHub Actions on every push.
 */

const fs = require('fs');
const path = require('path');

const ARTIFACTS_DIR = path.join(__dirname, '..', 'artifacts');
const OUTPUT_FILE = path.join(__dirname, '..', 'manifest.json');

const SUPPORTED_EXTENSIONS = [
  // Web
  '.html', '.htm', '.jsx', '.tsx', '.css', '.svg',
  // Documents
  '.md', '.markdown', '.pdf', '.txt', '.docx', '.qmd',
  // Images
  '.png', '.jpg', '.jpeg', '.gif', '.webp', '.bmp', '.ico',
  // Data
  '.json', '.csv', '.xml', '.yaml', '.yml',
  // Code
  '.js', '.ts', '.py', '.r', '.R', '.sh', '.sql',
];

function scanRecursive(dir, relativeBase) {
  const results = [];

  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;

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

      results.push({
        filename: entry.name,
        path: relativePath,
        folder: folder,
        size: stat.size,
        modified: stat.mtime.toISOString(),
      });
    }
  }

  return results;
}

const artifacts = scanRecursive(ARTIFACTS_DIR, '')
  .sort((a, b) => new Date(b.modified) - new Date(a.modified));

const folders = [...new Set(artifacts.map(a => a.folder).filter(Boolean))].sort();

const manifest = {
  generated: new Date().toISOString(),
  count: artifacts.length,
  folders,
  artifacts,
};

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2));
console.log(`Manifest generated: ${artifacts.length} artifact(s) in ${folders.length} folder(s).`);
if (folders.length) console.log(`  Folders: ${folders.join(', ')}`);
