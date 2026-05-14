const fs = require('fs');
const path = require('path');

const content = `"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, Search, BookOpen, User, Star, ChevronRight, Clock,
  CalendarDays, Award, MessageSquare, CreditCard, ChevronLeft,
  Flame, Download, MoreHorizontal
} from "lucide-react";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Top Bar (Shared between Left and Right screens)
  const TopBar = () => (
    <div className="flex justify-between items-center px-6 pt-12 pb-6 relative z-20">
      <div className="bg-white rounded-full px-3 py-1.5 flex items-center gap-2 shadow-[0_4px_15px_rgba(0,0,0,0.04)] border border-slate-50">
        <div className="w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center shadow-sm">
           <span className="text-white text-[10px] font-black">2</span>
        </div>
        <span className="text-xs font-bold text-slate-700">Class 10</span>
      </div>
      
      <div className="flex gap-2">
         <div className="bg-white rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-[0_4px_15px_rgba(0,0,0,0.04)] border border-slate-50">
             <div className="w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center shadow-sm">
                <Star size={10} className="text-white fill-white" />
             </div>
             <span className="text-xs font-bold text-slate-700">28</span>
         </div>
         <div className="bg-white rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-[0_4px_15px_rgba(0,0,0,0.04)] border border-slate-50">
             <span className="text-[12px] leading-none">🇮🇳</span>
             <span className="text-xs font-bold text-slate-700">ENG</span>
         </div>
      </div>
    </div>
  );

  // LEFT SCREEN: Overview / Home
  const LeftScreen = () => (
     <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="relative min-h-[100dvh] bg-[#A8D8F8] flex flex-col overflow-x-hidden pb-24"
     >
        {/* Background Image (Landscape) */}
        <div className="absolute top-0 left-0 w-full h-[65vh] z-0 overflow-hidden">
           {/* Cartoon Landscape Background */}
           <img src="https://img.freepik.com/free-vector/nature-scene-with-river-hills-forest-mountain-landscape-flat-cartoon-style-illustration_1150-37326.jpg?w=800" alt="Landscape" className="w-full h-full object-cover opacity-90 scale-105" />
           {/* Gradient overlay to blend top */}
           <div className="absolute inset-0 bg-gradient-to-b from-[#A8D8F8]/80 via-transparent to-transparent" />
        </div>

        <TopBar />

        {/* Welcome & Mascot */}
        <div className="relative z-20 flex flex-col items-center mt-2 flex-1">
            <h1 className="text-2xl font-black text-slate-800 tracking-tight text-center drop-shadow-md">
                Welcome back, Aryan
            </h1>
            
            {/* Mascot in the middle */}
            <div className="mt-6 w-36 h-36 transform hover:scale-110 transition-transform cursor-pointer relative z-30">
                <img src="https://api.dicebear.com/7.x/micah/svg?seed=StudentMascot&backgroundColor=transparent" alt="Mascot" className="w-full h-full drop-shadow-2xl" />
            </div>
        </div>

        {/* Bottom White overlapping card */}
        <div className="relative z-20 bg-white rounded-t-[40px] px-6 pt-8 pb-10 shadow-[0_-15px_40px_rgba(0,0,0,0.08)] w-full mt-auto">
            {/* Day Challenge (Overall Attendance) */}
            <div className="flex items-center gap-4 bg-white border border-slate-100 p-4 rounded-[24px] shadow-[0_8px_20px_rgba(0,0,0,0.03)] mb-6 -mt-14 relative bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-90">
                <div className="w-12 h-12 bg-emerald-100 rounded-[16px] flex items-center justify-center shrink-0">
                    <CalendarDays className="text-emerald-500" />
                </div>
                <div className="flex flex-col">
                    <span className="text-base font-black text-slate-800 leading-tight">94.5%</span>
                    <span className="text-[11px] font-bold text-slate-400">Overall Attendance</span>
                </div>
                <MoreHorizontal className="ml-auto text-slate-300" />
            </div>

            {/* So for today */}
            <h3 className="text-sm font-bold text-slate-800 mb-3">So for today</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white border border-slate-100 p-4 rounded-[24px] shadow-[0_4px_15px_rgba(0,0,0,0.02)] flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#FFF3E0] rounded-full flex items-center justify-center shrink-0">
                        <BookOpen size={18} className="text-amber-500" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-base font-black text-slate-800 leading-none mb-0.5">2</span>
                        <span className="text-[10px] font-bold text-slate-400 leading-tight">Tasks Pending</span>
                    </div>
                </div>
                <div className="bg-white border border-slate-100 p-4 rounded-[24px] shadow-[0_4px_15px_rgba(0,0,0,0.02)] flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#FFF3E0] rounded-full flex items-center justify-center shrink-0">
                        <Clock size={18} className="text-amber-500" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-base font-black text-slate-800 leading-none mb-0.5">A+</span>
                        <span className="text-[10px] font-bold text-slate-400 leading-tight">Current Grade</span>
                    </div>
                </div>
            </div>

            {/* School Category */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold text-slate-800">School category</h3>
            </div>
            <div className="flex justify-between overflow-x-auto gap-4 custom-scrollbar pb-2">
                {[
                    { name: "Diary", id: "diary", icon: BookOpen, color: "text-amber-500 bg-amber-50 border-amber-100" },
                    { name: "Exams", id: "performance", icon: Award, color: "text-emerald-500 bg-emerald-50 border-emerald-100" },
                    { name: "Fees", id: "fees", icon: CreditCard, color: "text-blue-500 bg-blue-50 border-blue-100" },
                    { name: "Chat", id: "messages", icon: MessageSquare, color: "text-rose-500 bg-rose-50 border-rose-100" },
                ].map((cat, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 min-w-[64px]" onClick={() => setActiveTab(cat.id)}>
                        <div className={\`w-14 h-14 rounded-full flex items-center justify-center border shadow-sm cursor-pointer hover:scale-105 transition-transform \${cat.color}\`}>
                            <cat.icon size={22} strokeWidth={2.5} />
                        </div>
                        <span className="text-[10px] font-bold text-slate-600">{cat.name}</span>
                    </div>
                ))}
            </div>
        </div>
     </motion.div>
  );

  // RIGHT SCREEN: Other Pages (Discover style)
  const RightScreen = () => {
    const renderContent = () => {
        if (activeTab === "diary") {
            return (
                <div className="flex flex-col mt-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-black text-slate-800">Pending Homework</h3>
                        <span className="text-xs font-bold text-amber-500">See all</span>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-6 custom-scrollbar -mx-6 px-6">
                        {/* Book/Task Cards */}
                        <div className="min-w-[150px] w-[150px] bg-[#E3F2FD] rounded-[24px] p-4 flex flex-col relative overflow-hidden border border-[#BBDEFB] shadow-sm">
                            <span className="absolute top-3 right-3 bg-white text-blue-600 text-[9px] font-black px-2 py-1 rounded-full shadow-sm">Maths</span>
                            <div className="w-full h-28 mb-3 flex items-center justify-center">
                                <img src="https://cdn3d.iconscout.com/3d/premium/thumb/math-book-6815309-5602758.png" className="w-20 h-20 object-contain drop-shadow-md" alt="Math" onError={(e) => { e.currentTarget.style.display='none'; }} />
                                <BookOpen size={48} className="text-blue-300 absolute -z-10" />
                            </div>
                            <h4 className="text-sm font-black text-slate-800 leading-tight mb-1 line-clamp-2">Trigonometry Exercise</h4>
                            <div className="flex items-center gap-1.5 mt-auto pt-2 border-t border-blue-200/50">
                                <div className="w-5 h-5 rounded-full overflow-hidden bg-blue-200">
                                    <img src="https://i.pravatar.cc/150?u=1" alt="Teacher" />
                                </div>
                                <span className="text-[9px] font-bold text-slate-600 truncate">Mr. R.K. Singh</span>
                            </div>
                        </div>

                        <div className="min-w-[150px] w-[150px] bg-[#F3E5F5] rounded-[24px] p-4 flex flex-col relative overflow-hidden border border-[#E1BEE7] shadow-sm">
                            <span className="absolute top-3 right-3 bg-white text-purple-600 text-[9px] font-black px-2 py-1 rounded-full shadow-sm">Science</span>
                            <div className="w-full h-28 mb-3 flex items-center justify-center">
                                <Flame size={48} className="text-purple-300" />
                            </div>
                            <h4 className="text-sm font-black text-slate-800 leading-tight mb-1 line-clamp-2">Physics Experiment Report</h4>
                            <div className="flex items-center gap-1.5 mt-auto pt-2 border-t border-purple-200/50">
                                <div className="w-5 h-5 rounded-full overflow-hidden bg-purple-200">
                                    <img src="https://i.pravatar.cc/150?u=2" alt="Teacher" />
                                </div>
                                <span className="text-[9px] font-bold text-slate-600 truncate">Ms. Sharma</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center mb-4 mt-2">
                        <h3 className="text-sm font-black text-slate-800">Recent Completed</h3>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="bg-white p-4 rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100 flex items-center gap-4">
                            <div className="w-12 h-12 bg-emerald-50 rounded-[16px] text-emerald-500 flex items-center justify-center shrink-0">
                                <BookOpen size={20} />
                            </div>
                            <div className="flex flex-col">
                                <h4 className="text-sm font-black text-slate-800">English Summary</h4>
                                <span className="text-[10px] font-bold text-slate-400">Checked by Dr. Bose</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (activeTab === "performance") {
            return (
                <div className="flex flex-col mt-6 gap-4">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-black text-slate-800">Latest Results</h3>
                    </div>
                    <div className="bg-[#FFF8E1] rounded-[24px] p-5 border border-[#FFECB3] shadow-sm flex items-center justify-between group cursor-pointer">
                         <div className="flex items-center gap-4">
                             <div className="w-14 h-14 bg-amber-100 text-amber-500 rounded-[16px] flex items-center justify-center font-black text-xl">
                                 A+
                             </div>
                             <div className="flex flex-col">
                                 <h4 className="text-base font-black text-slate-800">Mid-Term Exam</h4>
                                 <span className="text-xs font-bold text-slate-500 mt-0.5">Rank: Top 5%</span>
                             </div>
                         </div>
                         <ChevronRight size={20} className="text-amber-400" />
                    </div>
                    <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center justify-between group cursor-pointer">
                         <div className="flex items-center gap-4">
                             <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-[16px] flex items-center justify-center font-black text-xl">
                                 A
                             </div>
                             <div className="flex flex-col">
                                 <h4 className="text-base font-black text-slate-800">Unit Test 1</h4>
                                 <span className="text-xs font-bold text-slate-500 mt-0.5">Rank: Top 10%</span>
                             </div>
                         </div>
                         <ChevronRight size={20} className="text-slate-300" />
                    </div>
                </div>
            );
        }
        
        return (
             <div className="flex flex-col items-center justify-center py-24 text-slate-400">
                  <Award size={48} className="mb-4 text-slate-200" />
                  <p className="text-sm font-bold">Content for {activeTab} coming soon</p>
             </div>
        );
    };

    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="min-h-[100dvh] bg-white flex flex-col relative pb-28 overflow-x-hidden"
        >
            {/* Soft sky background only at the very top (behind the top bar) */}
            <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-[#E5F3FF] via-[#F4F9FF] to-white z-0" />
            
            <TopBar />

            <div className="px-6 relative z-10 flex flex-col flex-1 w-full mt-2">
                {/* Title area with small mascot on the right */}
                <div className="flex justify-between items-end mb-6">
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-black text-slate-800 capitalize tracking-tight">
                            {activeTab === 'diary' ? 'Discover' : activeTab === 'performance' ? 'Exams' : activeTab}
                        </h1>
                        <span className="text-xs font-bold text-slate-500 mt-1">Find your school updates</span>
                    </div>
                    {/* Mascot on branch like the image */}
                    <div className="w-20 h-20 relative -mr-2">
                         <img src="https://api.dicebear.com/7.x/micah/svg?seed=StudentMascot&backgroundColor=transparent" alt="Mascot" className="w-full h-full drop-shadow-md" />
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                        type="text" 
                        placeholder={\`Search in \${activeTab}...\`} 
                        className="w-full bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] rounded-full py-4 pl-12 pr-4 text-sm font-bold text-slate-700 outline-none focus:border-amber-400 transition-colors"
                    />
                </div>

                {/* Horizontal Category Pills */}
                <div className="flex gap-3 overflow-x-auto custom-scrollbar pb-2 -mx-6 px-6">
                    {["All", "Pending", "Completed", "Important"].map((tag, i) => (
                        <div key={i} className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-100 shadow-sm rounded-full whitespace-nowrap cursor-pointer hover:border-amber-200">
                            {i === 0 && <span className="text-[12px]">🎯</span>}
                            {i === 1 && <span className="text-[12px]">⏳</span>}
                            {i === 2 && <span className="text-[12px]">✅</span>}
                            {i === 3 && <span className="text-[12px]">⭐</span>}
                            <span className="text-[11px] font-bold text-slate-600">{tag}</span>
                        </div>
                    ))}
                </div>

                {/* Main Content Area */}
                {renderContent()}
            </div>
        </motion.div>
    );
  };

  const MobileNav = () => (
    <nav className="absolute bottom-0 left-0 w-full bg-white flex justify-around items-center px-4 py-4 z-50 rounded-t-[32px] shadow-[0_-10px_30px_rgba(0,0,0,0.06)] border-t border-slate-50">
        {[
            { id: "overview", name: "Home", icon: Home },
            { id: "diary", name: "Search", icon: Search },
            { id: "performance", name: "My Book", icon: BookOpen },
            { id: "messages", name: "Profile", icon: User }
        ].map((item) => {
            const isActive = activeTab === item.id;
            return (
                <button key={item.id} onClick={() => setActiveTab(item.id)} className="flex flex-col items-center justify-center gap-1.5 w-14 group">
                    <div className={\`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 \${isActive ? 'bg-amber-400 text-white shadow-[0_4px_15px_rgba(245,158,11,0.4)] scale-110' : 'bg-transparent text-slate-400 group-hover:bg-slate-50'}\`}>
                        <item.icon size={20} className={isActive ? "fill-white/20" : ""} strokeWidth={isActive ? 2.5 : 2} />
                    </div>
                    <span className={\`text-[9px] font-bold transition-colors \${isActive ? 'text-amber-500' : 'text-slate-400'}\`}>{item.name}</span>
                </button>
            )
        })}
    </nav>
  );

  return (
      <div className="font-sans selection:bg-amber-400 selection:text-white bg-slate-100 md:bg-slate-900 min-h-screen md:flex md:items-center md:justify-center md:p-6">
          {/* Constrain to mobile width on desktop to look exactly like the app screenshots */}
          <div className="w-full h-[100dvh] md:h-[850px] md:max-w-[400px] md:rounded-[40px] bg-white relative shadow-2xl overflow-hidden border-[8px] border-white md:border-slate-800">
             <AnimatePresence mode="wait">
                 {activeTab === "overview" ? <LeftScreen key="left" /> : <RightScreen key="right" />}
             </AnimatePresence>
             <MobileNav />
          </div>
      </div>
  );
}
