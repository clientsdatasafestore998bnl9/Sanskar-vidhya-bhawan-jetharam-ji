const fs = require('fs');

const content = `"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, Search, BookOpen, User, Star, ChevronRight, Clock,
  CalendarDays, Award, MessageSquare, CreditCard, ChevronLeft,
  Flame, Download, MoreHorizontal, FileText, CalendarCheck, ClipboardList,
  Megaphone, TrendingUp, Trophy, Users, Bus, FileSignature, IdCard
} from "lucide-react";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // New Header for Home Page (White Background)
  const HomeHeader = () => (
    <div className="bg-white px-6 pt-6 pb-5 flex justify-between items-center z-50 relative rounded-b-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center p-1 border border-slate-100">
                <img src="/logo.png" alt="School Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
                <span className="text-[13px] font-black text-slate-800 leading-tight">Sanskar Vidya Bhawan</span>
                <span className="text-[11px] font-bold text-slate-500">Class 10</span>
            </div>
        </div>
        
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-100 shadow-sm cursor-pointer hover:bg-orange-100 transition-colors">
                <Flame size={14} className="text-orange-500 fill-orange-500" />
                <span className="text-xs font-black text-orange-600">12</span>
            </div>
            <div className="w-9 h-9 rounded-full border-2 border-amber-400 overflow-hidden shadow-sm cursor-pointer transform hover:scale-105 transition-transform">
                <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Aryan&backgroundColor=fef3c7" alt="Student" className="w-full h-full object-cover" />
            </div>
        </div>
    </div>
  );

  // Top Bar for Other Pages
  const TopBar = () => (
    <div className="flex justify-between items-center px-6 pt-8 pb-6 relative z-20">
      <button onClick={() => setActiveTab("overview")} className="bg-white/90 backdrop-blur-md rounded-full w-10 h-10 flex items-center justify-center shadow-[0_4px_15px_rgba(0,0,0,0.04)] border border-slate-50 hover:bg-slate-50 transition-colors group">
         <ChevronLeft size={20} className="text-slate-700 group-hover:-translate-x-0.5 transition-transform" />
      </button>
      
      <div className="flex gap-2">
         <div className="bg-white/90 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-[0_4px_15px_rgba(0,0,0,0.04)] border border-slate-50">
             <div className="w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center shadow-sm">
                <Star size={10} className="text-white fill-white" />
             </div>
             <span className="text-xs font-bold text-slate-700">28</span>
         </div>
      </div>
    </div>
  );

  // LEFT SCREEN: Overview / Home
  const LeftScreen = () => {
      const categories = [
          { name: "Diary", id: "diary", icon: BookOpen, color: "text-blue-500 bg-blue-50 border-blue-100" },
          { name: "Home Work", id: "homework", icon: FileText, color: "text-amber-500 bg-amber-50 border-amber-100" },
          { name: "Attendance", id: "attendance", icon: CalendarCheck, color: "text-emerald-500 bg-emerald-50 border-emerald-100" },
          { name: "Exams", id: "performance", icon: Award, color: "text-purple-500 bg-purple-50 border-purple-100" },
          { name: "Time Table", id: "timetable", icon: Clock, color: "text-rose-500 bg-rose-50 border-rose-100" },
          { name: "Notes", id: "notes", icon: ClipboardList, color: "text-cyan-500 bg-cyan-50 border-cyan-100" },
          { name: "Update", id: "update", icon: Megaphone, color: "text-orange-500 bg-orange-50 border-orange-100" },
          { name: "Report Card", id: "reportcard", icon: TrendingUp, color: "text-indigo-500 bg-indigo-50 border-indigo-100" },
          { name: "Fees", id: "fees", icon: CreditCard, color: "text-green-500 bg-green-50 border-green-100" },
          { name: "Leaderboard", id: "leaderboard", icon: Trophy, color: "text-yellow-500 bg-yellow-50 border-yellow-100" },
          { name: "Chat", id: "messages", icon: MessageSquare, color: "text-pink-500 bg-pink-50 border-pink-100" },
          { name: "Events", id: "events", icon: CalendarDays, color: "text-teal-500 bg-teal-50 border-teal-100" },
          { name: "PTM", id: "ptm", icon: Users, color: "text-sky-500 bg-sky-50 border-sky-100" },
          { name: "Track Bus", id: "bus", icon: Bus, color: "text-fuchsia-500 bg-fuchsia-50 border-fuchsia-100" },
          { name: "Apply Leave", id: "leave", icon: FileSignature, color: "text-violet-500 bg-violet-50 border-violet-100" },
          { name: "ID Card", id: "idcard", icon: IdCard, color: "text-slate-500 bg-slate-50 border-slate-200" }
      ];

      return (
         <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="relative min-h-[100dvh] bg-[#BBE2FB] flex flex-col overflow-x-hidden"
         >
            {/* White Header */}
            <HomeHeader />

            {/* Background Image (Landscape) adjusted to fit below header perfectly */}
            <div className="absolute top-16 left-0 w-full h-[60vh] z-0 overflow-hidden">
               {/* Custom Hero Background */}
               <img src="/herosection1.jpg" alt="Landscape" className="w-full h-full object-cover opacity-100" />
               {/* Gradient overlay to blend top */}
               <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent" />
            </div>

            {/* Welcome & Mascot */}
            <div className="relative z-20 flex flex-col items-center mt-6 flex-1">
                <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight text-center drop-shadow-lg">
                    Welcome back, Aryan
                </h1>
                
                {/* Mascot in the middle */}
                <motion.div 
                    animate={{ y: [0, -12, 0], rotate: [0, 2, -2, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="mt-6 w-40 h-40 transform hover:scale-110 transition-transform cursor-pointer relative z-30 drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)]"
                >
                    <img src="/owl1.png" alt="Owl Mascot" className="w-full h-full object-contain" />
                </motion.div>
            </div>

            {/* Bottom White overlapping card */}
            <div className="relative z-20 bg-white rounded-t-[40px] px-6 pt-8 pb-10 shadow-[0_-15px_40px_rgba(0,0,0,0.08)] w-full mt-auto">
                {/* Day Challenge (Overall Attendance) */}
                <div className="flex items-center gap-4 bg-white/95 backdrop-blur-xl border border-white/50 p-4 rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] mb-8 -mt-16 relative">
                    <div className="w-12 h-12 bg-emerald-100 rounded-[16px] flex items-center justify-center shrink-0 border border-emerald-200">
                        <CalendarDays className="text-emerald-500" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-base font-black text-slate-800 leading-tight">94.5%</span>
                        <span className="text-[11px] font-bold text-slate-400">Overall Attendance</span>
                    </div>
                    <MoreHorizontal className="ml-auto text-slate-300" />
                </div>

                {/* School Category Grid */}
                <div className="flex justify-between items-center mb-5 mt-2">
                    <h3 className="text-base font-black text-slate-800">School Category</h3>
                </div>
                <div className="grid grid-cols-4 gap-y-6 gap-x-2 mb-8">
                    {categories.map((cat, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 cursor-pointer group" onClick={() => setActiveTab(cat.id)}>
                            <div className={\`w-14 h-14 rounded-[20px] flex items-center justify-center border shadow-sm group-hover:scale-105 transition-transform \${cat.color}\`}>
                                <cat.icon size={22} strokeWidth={2} />
                            </div>
                            <span className="text-[10px] font-bold text-slate-600 text-center leading-tight whitespace-nowrap">{cat.name}</span>
                        </div>
                    ))}
                </div>

                {/* Leaderboard Section */}
                <div className="mt-8 border-t border-slate-100 pt-8">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base font-black text-slate-800">Leaderboard</h3>
                    </div>
                    {/* Filters 1: Class / School */}
                    <div className="flex gap-2 mb-4 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                        <button className="flex-1 bg-white text-amber-500 font-black text-xs py-2.5 rounded-lg shadow-sm border border-slate-100">Class</button>
                        <button className="flex-1 bg-transparent text-slate-400 font-bold text-xs py-2.5 rounded-lg hover:bg-slate-100 transition-colors">School</button>
                    </div>
                    
                    {/* Filters 2: Timeframe */}
                    <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2 mb-8 -mx-6 px-6">
                        {["Today", "Last 7 days", "Last Month", "All time"].map((f, i) => (
                            <button key={i} className={\`whitespace-nowrap px-4 py-2 rounded-full text-[11px] font-bold transition-colors \${i===0 ? 'bg-amber-400 text-white shadow-sm' : 'bg-slate-50 text-slate-500 border border-slate-100 hover:bg-slate-100'}\`}>
                                {f}
                            </button>
                        ))}
                    </div>

                    {/* Podium Top 3 */}
                    <div className="flex justify-center items-end gap-3 mb-8 pt-4">
                        {/* 2nd Place */}
                        <div className="flex flex-col items-center flex-1">
                            <div className="relative">
                                <div className="w-14 h-14 rounded-full border-[3px] border-slate-200 overflow-hidden bg-slate-100"><img src="https://api.dicebear.com/7.x/notionists/svg?seed=Rahul&backgroundColor=f8fafc" alt="2nd" className="w-full h-full object-cover" /></div>
                                <div className="absolute -bottom-2 -right-1 bg-slate-200 text-slate-600 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black border-2 border-white shadow-sm">2</div>
                            </div>
                            <span className="text-xs font-black mt-3 text-slate-700">Rahul</span>
                            <span className="text-[10px] text-slate-400 font-bold">450 pts</span>
                            <div className="w-full h-16 bg-gradient-to-t from-slate-100 to-slate-50/50 rounded-t-xl mt-2 border-t border-slate-200 flex justify-center pt-2 shadow-inner">
                                <div className="w-6 h-1 rounded-full bg-slate-200" />
                            </div>
                        </div>
                        {/* 1st Place */}
                        <div className="flex flex-col items-center flex-1 relative -top-6">
                            <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -top-7 text-3xl drop-shadow-md z-10">👑</motion.div>
                            <div className="relative">
                                <div className="w-20 h-20 rounded-full border-[4px] border-amber-400 overflow-hidden bg-amber-50 shadow-[0_4px_15px_rgba(245,158,11,0.3)]"><img src="https://api.dicebear.com/7.x/notionists/svg?seed=Aryan&backgroundColor=fef3c7" alt="1st" className="w-full h-full object-cover" /></div>
                                <div className="absolute -bottom-2 right-0 left-0 mx-auto bg-amber-400 text-white w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-black border-2 border-white shadow-sm">1</div>
                            </div>
                            <span className="text-sm font-black mt-3 text-amber-500">Aryan</span>
                            <span className="text-[10px] text-slate-400 font-bold">520 pts</span>
                            <div className="w-full h-24 bg-gradient-to-t from-amber-100 to-amber-50/50 rounded-t-xl mt-2 border-t border-amber-200 flex justify-center pt-2 shadow-inner">
                                <Star size={16} className="text-amber-400 fill-amber-400" />
                            </div>
                        </div>
                        {/* 3rd Place */}
                        <div className="flex flex-col items-center flex-1">
                            <div className="relative">
                                <div className="w-14 h-14 rounded-full border-[3px] border-orange-200 overflow-hidden bg-orange-50"><img src="https://api.dicebear.com/7.x/notionists/svg?seed=Neha&backgroundColor=fff7ed" alt="3rd" className="w-full h-full object-cover" /></div>
                                <div className="absolute -bottom-2 -left-1 bg-orange-200 text-orange-700 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black border-2 border-white shadow-sm">3</div>
                            </div>
                            <span className="text-xs font-black mt-3 text-slate-700">Neha</span>
                            <span className="text-[10px] text-slate-400 font-bold">390 pts</span>
                            <div className="w-full h-12 bg-gradient-to-t from-orange-50 to-orange-50/30 rounded-t-xl mt-2 border-t border-orange-200 flex justify-center pt-2 shadow-inner">
                                <div className="w-6 h-1 rounded-full bg-orange-200" />
                            </div>
                        </div>
                    </div>

                    {/* List 4 to 10 */}
                    <div className="flex flex-col gap-3">
                        {[
                            { rank: 4, name: "Sneha", pts: 350 },
                            { rank: 5, name: "Vikram", pts: 320 },
                            { rank: 6, name: "Pooja", pts: 300 },
                            { rank: 7, name: "Rohan", pts: 280 },
                            { rank: 8, name: "Aman", pts: 250 },
                            { rank: 9, name: "Kavya", pts: 210 },
                            { rank: 10, name: "Suresh", pts: 190 },
                        ].map(student => (
                             <div key={student.rank} className="flex items-center gap-3 bg-white p-3.5 rounded-[20px] border border-slate-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)] hover:border-amber-200 transition-colors cursor-pointer group">
                                  <span className="text-sm font-black text-slate-400 w-6 text-center">{student.rank}</span>
                                  <div className="w-10 h-10 rounded-full bg-slate-50 overflow-hidden border border-slate-100">
                                      <img src={\`https://api.dicebear.com/7.x/notionists/svg?seed=\${student.name}&backgroundColor=transparent\`} alt={student.name} className="w-full h-full object-cover" />
                                  </div>
                                  <span className="text-sm font-bold text-slate-700 flex-1 group-hover:text-amber-500 transition-colors">{student.name}</span>
                                  <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100">
                                       <Star size={12} className="text-amber-500 fill-amber-500" />
                                       <span className="text-xs font-black text-amber-600">{student.pts}</span>
                                  </div>
                             </div>
                        ))}
                        <button className="w-full py-3.5 mt-3 bg-slate-50 text-xs font-black text-slate-500 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200 rounded-2xl transition-all border border-slate-100">
                            View All Rankings
                        </button>
                    </div>
                </div>

                {/* Footer Branding */}
                <div className="mt-12 mb-4 flex flex-col items-center justify-center text-center space-y-1.5">
                    <p className="text-[11px] font-bold text-slate-400">Student Portal v2.0</p>
                    <p className="text-[11px] font-bold text-slate-400">
                        Developed by <a href="https://technodhaam.com" target="_blank" className="text-blue-500 font-black hover:underline transition-all">TechnoDhaam</a>
                    </p>
                </div>
            </div>
         </motion.div>
      );
  };

  // RIGHT SCREEN: Other Pages (Discover style)
  const RightScreen = () => {
    const renderContent = () => {
        if (activeTab === "diary") {
            return (
                <div className="flex flex-col mt-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-black text-slate-800">Pending Homework</h3>
                        <span className="text-xs font-bold text-amber-500 cursor-pointer">See all</span>
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
                                <div className="w-5 h-5 rounded-full overflow-hidden bg-blue-200 shrink-0">
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
                                <div className="w-5 h-5 rounded-full overflow-hidden bg-purple-200 shrink-0">
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
                    <div className="bg-[#FFF8E1] rounded-[24px] p-5 border border-[#FFECB3] shadow-sm flex items-center justify-between group cursor-pointer hover:shadow-md transition-shadow">
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
                    <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center justify-between group cursor-pointer hover:shadow-md transition-shadow">
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
             <div className="flex flex-col items-center justify-center py-32 text-slate-400">
                  <Award size={48} className="mb-4 text-slate-200" />
                  <p className="text-sm font-bold">Content for {activeTab} coming soon</p>
             </div>
        );
    };

    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="min-h-[100dvh] bg-[#F9FBFF] flex flex-col relative overflow-x-hidden"
        >
            {/* Shared Background Image (Landscape) for consistent theme */}
            <div className="absolute top-0 left-0 w-full h-56 z-0 overflow-hidden">
                <img src="/herosection1.jpg" alt="Landscape Background" className="w-full h-full object-cover opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F9FBFF]" />
            </div>
            
            {/* White floating clouds pattern */}
            <div className="absolute top-10 left-10 w-24 h-12 bg-white/40 rounded-full blur-xl z-10" />
            <div className="absolute top-20 right-10 w-32 h-16 bg-white/30 rounded-full blur-2xl z-10" />

            <TopBar />

            <div className="px-6 relative z-10 flex flex-col flex-1 w-full mt-2 pb-12">
                {/* Title area with small mascot on the right */}
                <div className="flex justify-between items-end mb-6">
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-black text-slate-800 capitalize tracking-tight">
                            {activeTab === 'diary' ? 'Discover' : activeTab === 'performance' ? 'Exams' : activeTab}
                        </h1>
                        <span className="text-xs font-bold text-slate-500 mt-1">Find your school updates</span>
                    </div>
                    {/* Panda Mascot like the image */}
                    <motion.div 
                        animate={{ y: [0, -8, 0], rotate: [0, -3, 3, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        className="w-24 h-24 relative -mr-2 transform hover:scale-105 transition-transform drop-shadow-[0_8px_15px_rgba(0,0,0,0.15)]"
                    >
                         <img src="/panda1.png" alt="Panda Mascot" className="w-full h-full object-contain" />
                    </motion.div>
                </div>

                {/* Search Bar */}
                <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                        type="text" 
                        placeholder={\`Search by title & more...\`} 
                        className="w-full bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] rounded-[20px] py-3.5 pl-12 pr-4 text-sm font-bold text-slate-700 outline-none focus:border-amber-400 transition-colors"
                    />
                </div>

                {/* Horizontal Category Pills */}
                <div className="flex gap-3 overflow-x-auto custom-scrollbar pb-2 -mx-6 px-6">
                    {["All", "Pending", "Completed", "Important"].map((tag, i) => (
                        <div key={i} className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-100 shadow-sm rounded-full whitespace-nowrap cursor-pointer hover:border-amber-200 transition-colors">
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

                {/* Footer Branding for Right Screen */}
                <div className="mt-auto pt-12 flex flex-col items-center justify-center text-center space-y-1.5">
                    <p className="text-[11px] font-bold text-slate-400">Student Portal v2.0</p>
                    <p className="text-[11px] font-bold text-slate-400">
                        Developed by <a href="https://technodhaam.com" target="_blank" className="text-blue-500 font-black hover:underline transition-all">TechnoDhaam</a>
                    </p>
                </div>
            </div>
        </motion.div>
    );
  };

  return (
      <div className="font-sans selection:bg-amber-400 selection:text-white bg-slate-100 md:bg-slate-900 min-h-[100dvh] md:flex md:items-center md:justify-center md:p-6">
          {/* Constrain to mobile width on desktop to look exactly like the app screenshots */}
          <div className="w-full min-h-[100dvh] md:min-h-0 md:h-[850px] md:max-w-[400px] md:rounded-[40px] bg-white relative md:shadow-2xl overflow-hidden md:border-[8px] md:border-white flex flex-col">
             <div className="flex-1 relative overflow-y-auto overflow-x-hidden custom-scrollbar">
                 <AnimatePresence mode="wait">
                     {activeTab === "overview" ? <LeftScreen key="left" /> : <RightScreen key="right" />}
                 </AnimatePresence>
             </div>
             {/* MobileNav removed completely as requested */}
          </div>
      </div>
  );
}
`;

fs.writeFileSync('src/app/dashboard/student/page.tsx', content);
console.log('Successfully wrote page.tsx');
