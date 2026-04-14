const fs = require('fs');
let c = fs.readFileSync('src/app/dashboard/teacher/page.tsx', 'utf-8');

// Undo rogue glass effects
c = c.replace(/text-white\/50/g, 'text-slate-500');
c = c.replace(/text-white\/30/g, 'text-slate-500');
c = c.replace(/text-white\/10/g, 'text-slate-400');
c = c.replace(/text-white/g, 'text-slate-900');

c = c.replace(/bg-white\/10\/50/g, 'bg-slate-50');
c = c.replace(/bg-white\/10/g, 'bg-white');
c = c.replace(/bg-black\/20\/60/g, '');
c = c.replace(/backdrop-blur-3xl/g, '');

c = c.replace(/\`n/g, '');
c = c.replace(/style=\{\{ backgroundImage: "url\('\/hero2\.jpg'\)" \}\}/g, '');
c = c.replace(/bg-cover bg-center bg-fixed/g, 'bg-slate-50');

c = c.replace(/border-white\/10/g, 'border-slate-200');
c = c.replace(/border-white\/5/g, 'border-slate-200');

// Global Dark -> Light Convert (assuming some dark classes are still lingering)
c = c.replace(/bg-slate-900/g, 'bg-slate-50');
c = c.replace(/bg-slate-800/g, 'bg-white');
c = c.replace(/border-slate-700/g, 'border-slate-200');
c = c.replace(/border-slate-600/g, 'border-slate-300');
c = c.replace(/text-slate-100/g, 'text-slate-900');
c = c.replace(/text-slate-200/g, 'text-slate-800');
c = c.replace(/text-slate-300/g, 'text-slate-600');
c = c.replace(/text-slate-400/g, 'text-slate-500');

c = c.replace(/shadow-black\/50/g, 'shadow-slate-200/50');
c = c.replace(/shadow-black\/40/g, 'shadow-slate-200/40');
c = c.replace(/shadow-slate-200\/70/g, 'shadow-slate-200/50');

// Restore Sidebar primary classes
c = c.replace(/bg-primary text-slate-900/g, 'bg-primary text-slate-50');
c = c.replace(/text-slate-500 hover:bg-slate-50\/10 hover:text-slate-900/g, 'text-white/70 hover:bg-white/10 hover:text-white');
c = c.replace(/text-slate-900\/30 hover:text-slate-900/g, 'text-white/50 hover:text-white');
c = c.replace(/text-slate-500 group-hover:text-slate-900/g, 'text-white/50 group-hover:text-white');

fs.writeFileSync('src/app/dashboard/teacher/page.tsx', c);
console.log('Fixed glass constraints and enforced light mode.');
