const fs = require('fs');
let code = fs.readFileSync('src/app/dashboard/teacher/page.tsx', 'utf8');

// Global theme updates
code = code.replace(/bg-slate-900/g, 'bg-slate-800');
code = code.replace(/bg-slate-950/g, 'bg-slate-900'); 
code = code.replace(/border-slate-800/g, 'border-slate-700');
code = code.replace(/border-white\/10/g, 'border-slate-600');
code = code.replace(/text-white/g, 'text-slate-100');
code = code.replace(/2024-/g, '2026-');
code = code.replace(/2024/g, '2026');

// Structural changes
code = code.replace(
  /<div className="min-h-screen bg-slate-900 text-slate-100 flex font-JakartaSans relative">/g,
  '<div className="min-h-screen bg-slate-900 text-slate-200 flex font-JakartaSans relative pb-28 lg:pb-0">'
);

code = code.replace(
  /<Sidebar \/>/g,
  '{Sidebar()}\n      {MobileNav()}'
);

code = code.replace(
  /<main className="flex-1 lg:ml-80 p-6 lg:p-14 relative z-10">/g,
  `<main className="flex-1 lg:ml-80 p-4 sm:p-6 lg:p-14 relative z-10 overflow-x-hidden">
        
        {/* Mobile App Bar */}
        <div className="flex items-center justify-between lg:hidden mb-6 bg-slate-800 p-3 sm:p-4 rounded-3xl border border-slate-700 shadow-xl">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-900 rounded-xl overflow-hidden shadow-inner border border-slate-700 flex-shrink-0">
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200" alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                    <span className="font-black text-[12px] sm:text-sm tracking-tight leading-none uppercase text-slate-100">Amit Singh</span>
                    <span className="font-bold text-[8px] sm:text-[9px] tracking-[.15em] uppercase text-slate-400 mt-1">Senior Faculty</span>
                </div>
            </div>
            <div className="bg-accent/10 px-3 py-2 rounded-xl text-[9px] font-black text-accent uppercase tracking-widest border border-accent/20 flex-shrink-0">
                SVB
            </div>
        </div>`
);

code = code.replace(
  /<header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">/g,
  `<header className="hidden lg:flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">`
);

code = code.replace(
  /<\/AnimatePresence>(\s*)<\/div>(\s*)<\/main>/g,
  `</AnimatePresence>\n        </div>\n\n        {/* Mobile Footer Logout */}\n        <div className="lg:hidden mt-8 flex justify-center pb-8 border-t border-slate-700 pt-8">\n             <Link href="/" className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-red-500/10 text-red-500 text-[11px] font-black uppercase tracking-widest hover:bg-red-500/20 transition-all border border-red-500/20 shadow-xl shadow-red-500/5">\n                 <LogOutIcon size={16} /> Secure Sign Out\n             </Link>\n        </div>\n      </main>`
);

const mobileNavStr = `
  const MobileNav = () => (
    <div className="lg:hidden fixed bottom-4 left-4 right-4 bg-slate-800 border border-slate-700 rounded-3xl p-2 flex items-center justify-between shadow-2xl z-50">
        {[
            { id: "overview", icon: BarChart3, label: "Home" },
            { id: "classes", icon: BookMarked, label: "Classes" },
            { id: "attendance", icon: CheckSquare, label: "Call" },
            { id: "inspector", icon: Eye, label: "Insights" },
            { id: "gradebook", icon: ClipboardList, label: "Grades" },
        ].map((item) => (
            <button
                key={item.id}
                onClick={() => setActiveTab(item.id as TabType)}
                className={\`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all \${
                    activeTab === item.id 
                    ? "bg-primary text-slate-100 shadow-xl" 
                    : "text-slate-400 hover:text-slate-200"
                }\`}
            >
                <item.icon size={20} strokeWidth={activeTab === item.id ? 2.5 : 2} />
                <span className="text-[8px] font-bold uppercase tracking-widest">{item.label}</span>
            </button>
        ))}
    </div>
  );

  const FormFilters`;
code = code.replace(/const FormFilters/g, mobileNavStr);

code = code.replace(
  /<AnimatePresence mode="wait">[\s\S]*?<\/AnimatePresence>/g,
  `{activeTab === "overview" && DashboardOverview()}
            {activeTab === "classes" && ClassesSection()}
            {activeTab === "attendance" && AttendanceSection()}
            {activeTab === "diary" && DiarySection()}
            {activeTab === "gradebook" && GradebookSection()}
            {activeTab === "inspector" && InspectorSection()}
            {activeTab === "register" && RegistrationSection()}
            {activeTab === "messages" && MessageSection()}`
);

fs.writeFileSync('src/app/dashboard/teacher/page.tsx', code);
