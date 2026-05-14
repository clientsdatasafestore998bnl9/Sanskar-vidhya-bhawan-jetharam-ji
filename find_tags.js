const fs = require('fs');
const path = require('path');
const content = fs.readFileSync(path.join(__dirname, 'src/app/dashboard/admin/page.tsx'), 'utf-8');
const lines = content.split('\n');
const snippet = lines.slice(321, 458).join('\n');
const matches = [...snippet.matchAll(/<([A-Z][a-zA-Z]*)/g)];
const uniqueTags = [...new Set(matches.map(m => m[1]))];
console.log(uniqueTags.join(', '));
