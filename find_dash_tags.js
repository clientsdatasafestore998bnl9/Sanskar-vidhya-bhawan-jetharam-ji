const fs = require('fs');
const path = require('path');
const content = fs.readFileSync(path.join(__dirname, 'src/components/Admin/DashboardOverview.tsx'), 'utf-8');
const matches = [...content.matchAll(/<([A-Z][a-zA-Z]*)/g)];
const uniqueTags = [...new Set(matches.map(m => m[1]))];
console.log(uniqueTags.join(', '));
