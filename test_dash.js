const fs = require('fs');
const path = require('path');
const content = fs.readFileSync(path.join(__dirname, 'src/app/dashboard/admin/page.tsx'), 'utf-8');
const lines = content.split('\n');

const startIndex = lines.findIndex(l => l.includes('const DashboardOverview = () => {'));
const endIndex = lines.findIndex((l, i) => i > startIndex && l.startsWith('  };') && lines[i-1].includes(');'));

console.log("DashboardOverview bounds:", startIndex, endIndex);
