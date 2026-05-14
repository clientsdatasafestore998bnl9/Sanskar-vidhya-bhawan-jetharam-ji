const fs = require('fs');
const path = require('path');
const content = fs.readFileSync(path.join(__dirname, 'src/app/dashboard/admin/page.tsx'), 'utf-8');
const lines = content.split('\n');

const startIndex = lines.findIndex(l => l.includes('const DashboardOverview = () => ('));
let braceCount = 0;
let endIndex = -1;

for (let i = startIndex; i < lines.length; i++) {
  if (lines[i].includes('(')) braceCount += (lines[i].match(/\(/g) || []).length;
  if (lines[i].includes(')')) braceCount -= (lines[i].match(/\)/g) || []).length;
  if (braceCount === 0 && i > startIndex) {
    endIndex = i;
    break;
  }
}

console.log("DashboardOverview bounds:", startIndex, endIndex);
