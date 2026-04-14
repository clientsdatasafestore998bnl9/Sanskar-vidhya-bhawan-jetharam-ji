const fs = require('fs');
let c = fs.readFileSync('src/app/dashboard/teacher/page.tsx', 'utf-8');

// The file currently has Light Mode Colors. We need to convert them to Expert Dark Mode.

// Backgrounds
c = c.replace(/bg-slate-50\/50/g, 'bg-slate-900/40');
c = c.replace(/bg-slate-50/g, 'bg-slate-900');
c = c.replace(/bg-white\/80/g, 'bg-slate-800/80');
c = c.replace(/bg-white/g, 'bg-slate-800');

// Borders
c = c.replace(/border-slate-200\/80/g, 'border-slate-700/80');
c = c.replace(/border-slate-200\/50/g, 'border-slate-700/50');
c = c.replace(/border-slate-200/g, 'border-slate-700');
c = c.replace(/border-slate-300/g, 'border-slate-600');
c = c.replace(/divide-slate-200/g, 'divide-slate-800');

// Shadows
c = c.replace(/shadow-slate-200\/70/g, 'shadow-black/60');
c = c.replace(/shadow-slate-200\/50/g, 'shadow-black/40');
c = c.replace(/shadow-slate-200\/40/g, 'shadow-black/20');
c = c.replace(/shadow-\[0_-10px_40px_rgba\(0,0,0,0\.08\)\]/g, 'shadow-[0_-10px_40px_rgba(0,0,0,0.5)]');

// Texts
c = c.replace(/text-slate-900\/50/g, 'text-slate-100/50');
c = c.replace(/text-slate-900\/40/g, 'text-slate-100/40');
c = c.replace(/text-slate-900\/30/g, 'text-slate-100/20');
c = c.replace(/text-slate-900/g, 'text-slate-100');

c = c.replace(/text-slate-800/g, 'text-slate-200');
c = c.replace(/text-slate-600/g, 'text-slate-300');
c = c.replace(/text-slate-500/g, 'text-slate-400');
c = c.replace(/text-slate-400/g, 'text-primary'); // Make muted highly visible

// Specific fixes for Expert Mode
// Fix MobileNav texts which are now text-slate-100 instead of text-slate-300
// Restore Sidebar exact Student config styling if necessary
// The active sidebar button in Light was: bg-accent text-primary shadow-2xl shadow-accent/20. This holds fine for dark mode.

fs.writeFileSync('src/app/dashboard/teacher/page.tsx', c);
console.log('Converted back to Expert Dark Mode successfully.');
