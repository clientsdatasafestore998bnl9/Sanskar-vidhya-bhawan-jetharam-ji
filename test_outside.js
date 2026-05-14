const fs = require('fs');
const path = require('path');
const content = fs.readFileSync(path.join(__dirname, 'src/app/dashboard/admin/page.tsx'), 'utf-8');
const lines = content.split('\n');
for (let i = 0; i < 380; i++) {
  if (lines[i].startsWith('const ') || lines[i].startsWith('function ') || lines[i].startsWith('export ')) {
     console.log(i + 1, lines[i].substring(0, 50));
  }
}
