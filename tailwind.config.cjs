module.exports = {
  content: ['./index.html', './assets/app.js'],
  theme: { extend: {
    fontFamily: {sans: ['"Noto Sans TC"', 'sans-serif'], serif: ['"Noto Serif TC"', 'serif'], mono: ['"Space Mono"', 'monospace']},
    colors: {studio: {950:'#07090d',900:'#0c0f16',850:'#11151f',800:'#171c29',700:'#22293a'}, sage: {100:'#eef2ee',200:'#d7ded7',300:'#b8c4b9',400:'#8e9e90',500:'#6d7e70'}, amber: {indicator:'#f59e0b',glow:'rgba(245, 158, 11, 0.15)'}}
  }}, plugins: []
};
