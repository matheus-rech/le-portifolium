# Sample Notes

This is a **markdown** artifact rendered in the gallery viewer.

## Features

The Artifact Gallery supports several file types:

- **HTML** -- rendered interactively in iframes
- **JSX** -- transformed with Babel and rendered via React
- **Markdown** -- parsed and styled with the built-in viewer
- **PDF** -- linked for direct browser viewing

## Code Example

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
```

## How to Add Artifacts

Just drop files into the `artifacts/` folder, push to GitHub, and the Action rebuilds the manifest automatically.

> The gallery auto-detects file types and chooses the right viewer.
