const fs = require('fs');
const path = 'src/app/dashboard/teacher/page.tsx';

let content = fs.readFileSync(path, 'utf-8');

// The Sidebar bg-primary is fine. But we need to be careful not to replace text-white inside bg-primary, so we convert general slate colors.

// Backgrounds
content = content.replace(/bg-slate-900\/50/g, 'bg-slate-100/50');
content = content.replace(/bg-slate-900/g, 'bg-slate-50');
content = content.replace(/bg-slate-800\/80/g, 'bg-white/90');
content = content.replace(/bg-slate-800\/50/g, 'bg-slate-50');
content = content.replace(/bg-slate-800\/10/g, 'bg-slate-100/50');
content = content.replace(/bg-slate-800\/5/g, 'bg-slate-100/50');
content = content.replace(/bg-slate-800/g, 'bg-white');

// Borders
content = content.replace(/border-slate-700\/80/g, 'border-slate-200/80');
content = content.replace(/border-slate-700\/50/g, 'border-slate-200/50');
content = content.replace(/border-slate-700/g, 'border-slate-200');
content = content.replace(/border-slate-800/g, 'border-slate-200');
content = content.replace(/border-slate-600/g, 'border-slate-300');
content = content.replace(/divide-slate-800/g, 'divide-slate-200');

// Text Colors
content = content.replace(/text-slate-100\/50/g, 'text-slate-900/50');
content = content.replace(/text-slate-100\/40/g, 'text-slate-900/50');
content = content.replace(/text-slate-100\/20/g, 'text-slate-900/30');
content = content.replace(/text-slate-100/g, 'text-slate-900');

content = content.replace(/text-slate-200/g, 'text-slate-800');
content = content.replace(/text-slate-300/g, 'text-slate-600');
content = content.replace(/text-slate-400/g, 'text-slate-500');
content = content.replace(/text-slate-500/g, 'text-slate-400');

// Shadows
content = content.replace(/shadow-black\/40/g, 'shadow-slate-200/70');
content = content.replace(/shadow-black\/20/g, 'shadow-slate-200/50');
content = content.replace(/shadow-\[0_-10px_40px_rgba\(0,0,0,0\.5\)\]/g, 'shadow-[0_-10px_40px_rgba(0,0,0,0.08)]');

// Reverting specific sidebar texts that were messed up if they relied on text-white explicitly.
// Wait, the sidebar uses text-white primarily (e.g. text-white/30, text-white). That is safe!
// The layout container was `bg-slate-900` -> now `bg-slate-50`.
// One place `text-white` inside the Gradebook `bg-primary text-white` is fine.

fs.writeFileSync(path, content, 'utf-8');
console.log("Converted to Premium Light Theme successfully.");
