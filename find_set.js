const fs = require('fs');
const path = require('path');
const content = fs.readFileSync(path.join(__dirname, 'src/app/dashboard/admin/page.tsx'), 'utf-8');
const lines = content.split('\n');
const snippet = lines.slice(321, 458).join('\n');
const matches = [...snippet.matchAll(/set[A-Z][a-zA-Z]*/g)];
const uniqueSet = [...new Set(matches.map(m => m[0]))];
console.log("Set vars:", uniqueSet.join(', '));
