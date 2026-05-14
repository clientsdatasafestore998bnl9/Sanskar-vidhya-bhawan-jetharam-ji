const fs = require('fs');
const path = require('path');
const content = fs.readFileSync(path.join(__dirname, 'src/app/dashboard/admin/page.tsx'), 'utf-8');
const lines = content.split('\n');

const retLine = lines.findIndex(l => l.includes('return (') && lines[Math.max(0, lines.indexOf(l)-1)].includes('// --- MAIN LAYOUT ---') || l.includes('// --- MAIN LAYOUT ---'));

console.log("Main Layout return starts at line:", retLine);
