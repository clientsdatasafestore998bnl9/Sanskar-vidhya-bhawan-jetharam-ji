const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/app/dashboard/student/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Global Color Replacements (Theme shift to Amber/Orange/Funfluent)
content = content.replace(/bg-\[\#F4F6F9\]/g, 'bg-[#F9FBFF]'); // Softer overall background
content = content.replace(/text-\[\#3B36E4\]/g, 'text-orange-500');
content = content.replace(/bg-\[\#3B36E4\]/g, 'bg-amber-400');
content = content.replace(/border-\[\#3B36E4\]/g, 'border-amber-400');
content = content.replace(/fill-indigo-50/g, 'fill-orange-50');
content = content.replace(/bg-indigo-50/g, 'bg-orange-50');
content = content.replace(/bg-indigo-100/g, 'bg-orange-100');
content = content.replace(/text-indigo-600/g, 'text-orange-600');
content = content.replace(/border-indigo-100/g, 'border-orange-100');
content = content.replace(/hover:bg-indigo-600/g, 'hover:bg-amber-500');
content = content.replace(/shadow-\[0_8px_20px_rgba\(59,54,228,0\.3\)\]/g, 'shadow-[0_8px_20px_rgba(245,158,11,0.3)]');
content = content.replace(/shadow-\[0_12px_30px_rgba\(59,54,228,0\.4\)\]/g, 'shadow-[0_12px_30px_rgba(245,158,11,0.4)]');
content = content.replace(/shadow-\[0_12px_40px_rgba\(59,54,228,0\.3\)\]/g, 'shadow-[0_12px_40px_rgba(245,158,11,0.2)]');
content = content.replace(/shadow-\[0_20px_50px_rgba\(59,54,228,0\.3\)\]/g, 'shadow-[0_8px_30px_rgba(0,0,0,0.04)]');

// Replace Header with the Funfluent playful Hero header
const newHeader = `  const Header = () => (
    <header className="relative bg-gradient-to-b from-[#E5F3FF] to-[#F9FBFF] pt-8 pb-12 px-6 lg:px-12 lg:pt-12 -mx-5 md:-mx-8 lg:-mx-12 lg:mb-6 mb-4 rounded-b-[40px] overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-10 left-10 w-24 h-12 bg-white/60 rounded-full blur-xl" />
        <div className="absolute top-20 right-10 w-32 h-16 bg-white/50 rounded-full blur-2xl" />
        
        {/* Top Badges Bar */}
        <div className="flex items-center justify-between relative z-10 mb-8 lg:mb-12">
            <div className="bg-white rounded-full px-3 py-1.5 flex items-center gap-2 shadow-[0_4px_15px_rgba(0,0,0,0.03)] cursor-pointer">
                <div className="w-6 h-6 bg-amber-400 rounded-full text-white flex items-center justify-center text-[10px] font-black shadow-sm">
                    10
                </div>
                <span className="text-xs font-bold text-slate-700 pr-1">Class 10-A</span>
            </div>
            
            <div className="flex items-center gap-2">
                <div className="bg-white rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-[0_4px_15px_rgba(0,0,0,0.03)] cursor-pointer">
                    <div className="w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center shadow-sm">
                        <Star size={12} className="text-white fill-white" />
                    </div>
                    <span className="text-xs font-bold text-slate-700 pr-1">450</span>
                </div>
                <div className="bg-white rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-[0_4px_15px_rgba(0,0,0,0.03)] cursor-pointer">
                    <span className="text-[12px] leading-none">🇮🇳</span>
                    <span className="text-xs font-bold text-slate-700">ENG</span>
                </div>
            </div>
        </div>

        {/* Welcome Text & Mascot Area */}
        <div className="flex flex-col items-center justify-center text-center relative z-10 mb-2">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-800 tracking-tight">
                Welcome back, Aryan
            </h1>
            <p className="text-sm font-bold text-slate-500 mt-1">Ready for today's tasks?</p>
            
            {/* Mascot Placeholder (Cute Bird/Star) */}
            <div className="mt-6 w-24 h-24 md:w-32 md:h-32 bg-amber-400 rounded-full shadow-[0_10px_30px_rgba(245,158,11,0.3)] flex items-center justify-center border-4 border-white transform rotate-6 hover:rotate-12 transition-transform cursor-pointer">
                <img src="/logo.png" alt="Mascot" className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-md" onError={(e) => e.currentTarget.style.display = 'none'} />
                <Star size={40} className="text-white fill-white absolute -z-10" />
            </div>
        </div>
    </header>
  );`;

content = content.replace(/const Header = \(\) => \([\s\S]*?\n  \);/m, newHeader);


// Replace TopBalanceCard with Funfluent style stats card
const newTopBalanceCard = `  const TopBalanceCard = () => (
    <div className="bg-white rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-50 relative -mt-16 lg:-mt-24 z-20 mb-6 flex flex-col md:flex-row justify-between gap-6 group hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-shadow">
        
        <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-[24px] bg-emerald-100 flex items-center justify-center text-emerald-500 shadow-inner">
                <CalendarDays size={28} />
            </div>
            <div className="flex flex-col">
                <span className="text-3xl font-black text-slate-800 tracking-tight">94.5%</span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-0.5">Overall Attendance</span>
            </div>
        </div>
        
        <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
            <div className="flex flex-col items-center justify-center cursor-pointer group-hover:scale-105 transition-transform" onClick={() => setActiveTab('diary')}>
                <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center mb-1 border border-orange-100">
                    <ClipboardList size={20} />
                </div>
                <span className="text-[10px] font-bold text-slate-500">Diary</span>
            </div>
            <div className="flex flex-col items-center justify-center cursor-pointer group-hover:scale-105 transition-transform" onClick={() => setShowQR(true)}>
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mb-1 border border-blue-100">
                    <QrCode size={20} />
                </div>
                <span className="text-[10px] font-bold text-slate-500">Scan ID</span>
            </div>
            <div className="flex flex-col items-center justify-center cursor-pointer group-hover:scale-105 transition-transform" onClick={() => setActiveTab('performance')}>
                <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mb-1 border border-rose-100">
                    <History size={20} />
                </div>
                <span className="text-[10px] font-bold text-slate-500">History</span>
            </div>
        </div>
    </div>
  );`;

content = content.replace(/const TopBalanceCard = \(\) => \([\s\S]*?<\/div>\n  \);/m, newTopBalanceCard);

// Replace ServicesGrid styling to match circular icons
const newServicesGrid = `  const ServicesGrid = () => (
    <div className="mb-8 md:mb-10 bg-white p-6 rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-50">
        <h3 className="text-slate-800 font-black text-base lg:text-lg mb-5">School category</h3>
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-4 xl:grid-cols-8 gap-y-6 md:gap-y-8 gap-x-2 lg:gap-6">
            {[
                { name: "Attendance", icon: CalendarDays, color: "bg-white text-blue-500 border-blue-100", tab: "attendance" },
                { name: "Diary", icon: ClipboardList, color: "bg-white text-purple-500 border-purple-100", tab: "diary" },
                { name: "Messages", icon: MessageSquare, color: "bg-white text-rose-500 border-rose-100", tab: "messages", badge: 2 },
                { name: "Exams", icon: Award, color: "bg-white text-orange-500 border-orange-100", tab: "performance" },
                { name: "Fees", icon: CreditCard, color: "bg-white text-emerald-500 border-emerald-100", tab: "fees" },
                { name: "Timetable", icon: Clock, color: "bg-white text-amber-500 border-amber-100", tab: "overview" },
                { name: "Leave", icon: PlaneTakeoff, color: "bg-white text-cyan-500 border-cyan-100", tab: "overview" },
                { name: "See all", icon: Grid, color: "bg-slate-50 text-slate-600 border-slate-200", tab: "overview" },
            ].map((s, i) => (
                <div key={i} onClick={() => setActiveTab(s.tab as TabType)} className="flex flex-col items-center gap-2 cursor-pointer group relative">
                    <div className={\`w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-active:scale-95 shadow-sm border \${s.color}\`}>
                        <s.icon size={22} strokeWidth={2.5} />
                    </div>
                    <span className="text-[10px] md:text-xs font-bold text-slate-600 mt-1">{s.name}</span>
                    {s.badge && (
                        <span className="absolute -top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-black flex items-center justify-center rounded-full shadow-sm">
                            {s.badge}
                        </span>
                    )}
                </div>
            ))}
        </div>
    </div>
  );`;

content = content.replace(/const ServicesGrid = \(\) => \([\s\S]*?<\/div>\n  \);/m, newServicesGrid);


// Replace MobileNav with floating fun pill nav
const newMobileNav = `  const MobileNav = () => (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.1)] flex justify-between items-center px-4 py-3 z-50 lg:hidden border border-slate-100">
        {[
            { id: "overview", name: "Home", icon: Home },
            { id: "diary", name: "Diary", icon: Search }, // Used search icon for "Diary" to match image vibe (magnifying glass)
            { id: "performance", name: "Exams", icon: Award },
            { id: "messages", name: "Chat", icon: MessageSquare, badge: 2 }
        ].map((item) => {
            const isActive = activeTab === item.id;
            return (
                <button key={item.id} onClick={() => setActiveTab(item.id as TabType)} className="flex flex-col items-center justify-center w-12 h-12 relative group">
                    {isActive && (
                        <motion.div layoutId="navBubble" className="absolute inset-0 bg-amber-400 rounded-full shadow-md" transition={{ type: "spring", stiffness: 300, damping: 25 }} />
                    )}
                    <item.icon size={isActive ? 22 : 24} className={\`relative z-10 transition-colors duration-300 \${isActive ? 'text-white fill-white/20' : 'text-slate-400 group-hover:text-amber-400'}\`} />
                    {!isActive && <span className="text-[9px] font-bold text-slate-400 mt-1">{item.name}</span>}
                    {item.badge && !isActive && (
                        <span className="absolute top-0 right-1 w-3.5 h-3.5 bg-rose-500 text-white text-[8px] font-black flex items-center justify-center rounded-full border border-white">
                            {item.badge}
                        </span>
                    )}
                </button>
            )
        })}
    </nav>
  );`;

content = content.replace(/const MobileNav = \(\) => \([\s\S]*?<\/nav>\n  \);/m, newMobileNav);

// Small fixes for TodayAlerts
content = content.replace(/<div className="flex flex-col gap-3 md:gap-4 mb-8">/g, '<div className="flex flex-col lg:flex-row gap-3 md:gap-4 mb-8">');
content = content.replace(/className="bg-gradient-to-r from-orange-50 to-rose-50/g, 'className="flex-1 bg-white');
content = content.replace(/className="bg-gradient-to-r from-indigo-50 to-blue-50/g, 'className="flex-1 bg-white');


// Remove the specific DashboardOverview margins to adapt to the new Header
// In the main return:
content = content.replace(/<main className="flex-1 w-full max-w-md md:max-w-3xl mx-auto lg:max-w-none lg:ml-72 p-5 md:p-8 lg:px-12 lg:py-10 transition-all duration-300">/g, '<main className="flex-1 w-full max-w-md md:max-w-3xl mx-auto lg:max-w-none lg:ml-72 p-5 md:p-8 lg:px-12 pb-24 lg:pb-10 transition-all duration-300">');
// Header component call -> wait, Header is inside the max-w-7xl mx-auto
content = content.replace(/<Header \/>/g, '<Header />');

fs.writeFileSync(filePath, content);
console.log('Successfully updated the student dashboard to Funfluent theme.');
