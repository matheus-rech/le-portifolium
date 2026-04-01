const colors = [
  { name: 'Midnight', hex: '#0c0c0f' },
  { name: 'Surface', hex: '#16161a' },
  { name: 'Gold', hex: '#c9a96e' },
  { name: 'Coral', hex: '#e06c5a' },
  { name: 'Sky', hex: '#61dafb' },
  { name: 'Lavender', hex: '#8b9fcc' },
  { name: 'Violet', hex: '#a66bbe' },
  { name: 'Mist', hex: '#e8e6e3' },
];

function ColorPalette() {
  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: '#0c0c0f',
      padding: '2rem',
      fontFamily: 'system-ui, sans-serif',
    }
  },
    React.createElement('h2', {
      style: { color: '#e8e6e3', marginBottom: '1.5rem', fontWeight: 300 }
    }, 'Color Palette'),
    React.createElement('div', {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: '1rem',
      }
    },
      colors.map(c =>
        React.createElement('div', { key: c.hex, style: { textAlign: 'center' } },
          React.createElement('div', {
            style: {
              width: '100%',
              aspectRatio: '1',
              background: c.hex,
              borderRadius: '12px',
              border: '1px solid #2a2a32',
            }
          }),
          React.createElement('div', {
            style: { color: '#8b8994', fontSize: '0.8rem', marginTop: '0.5rem' }
          }, c.name),
          React.createElement('div', {
            style: { color: '#e8e6e3', fontSize: '0.75rem', fontFamily: 'monospace' }
          }, c.hex),
        )
      )
    )
  );
}

module.exports = { default: ColorPalette };
