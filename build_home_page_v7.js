const fs = require('fs');

const content = `"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, Search, User, Star, ChevronRight, ChevronLeft, Flame, MoreHorizontal,
  BookHeart, ClipboardCheck, GraduationCap, Clock4, StickyNote, BellRing,
  BadgeCheck, WalletCards, Medal, MessageCircleMore, PartyPopper, UsersRound,
  BusFront, CalendarOff, Contact, Trophy, CalendarDays, BookOpen, Swords, Sparkles, HeartHandshake, Zap
} from "lucide-react";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Header height and logo size slightly reduced to make it look perfect
  const HomeHeader = () => (
    <div className="bg-white px-6 pt-4 pb-4 flex justify-between items-center z-50 relative rounded-b-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center p-1 border border-slate-100 shadow-[inset_0_2px_5px_rgba(0,0,0,0.02)]">
                <img src="/logo.png" alt="School Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col gap-0.5">
                <span className="text-[15px] font-black text-slate-800 leading-none">Sanskar Vidya Bhawan</span>
                <span className="text-[11px] font-bold text-slate-500">Class 10-A</span>
            </div>
        </div>
        
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-100 shadow-sm cursor-pointer hover:bg-orange-100 transition-colors">
                <Flame size={14} className="text-orange-500 fill-orange-500" />
                <span className="text-xs font-black text-orange-600">12</span>
            </div>
            <div className="w-10 h-10 rounded-full border-[3px] border-amber-400 overflow-hidden shadow-sm cursor-pointer transform hover:scale-105 transition-transform">
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
             <span className="text-xs font-bold text-slate-700">450</span>
         </div>
      </div>
    </div>
  );

  // LEFT SCREEN: Overview / Home
  const LeftScreen = () => {
      const categories = [
          { name: "Diary", id: "diary", icon: BookHeart, color: "text-blue-500 bg-blue-50 border-blue-100" },
          { name: "Attendance", id: "attendance", icon: ClipboardCheck, color: "text-emerald-500 bg-emerald-50 border-emerald-100" },
          { name: "Exams", id: "performance", icon: GraduationCap, color: "text-purple-500 bg-purple-50 border-purple-100" },
          { name: "Time Table", id: "timetable", icon: Clock4, color: "text-rose-500 bg-rose-50 border-rose-100" },
          { name: "Notes", id: "notes", icon: StickyNote, color: "text-cyan-500 bg-cyan-50 border-cyan-100" },
          { name: "Update", id: "update", icon: BellRing, color: "text-orange-500 bg-orange-50 border-orange-100" },
          { name: "Report Card", id: "reportcard", icon: BadgeCheck, color: "text-indigo-500 bg-indigo-50 border-indigo-100" },
          { name: "Fees", id: "fees", icon: WalletCards, color: "text-green-500 bg-green-50 border-green-100" },
          { name: "Leaderboard", id: "leaderboard", icon: Medal, color: "text-yellow-500 bg-yellow-50 border-yellow-100" },
          { name: "Chat", id: "messages", icon: MessageCircleMore, color: "text-pink-500 bg-pink-50 border-pink-100" },
          { name: "Events", id: "events", icon: PartyPopper, color: "text-teal-500 bg-teal-50 border-teal-100" },
          { name: "PTM", id: "ptm", icon: UsersRound, color: "text-sky-500 bg-sky-50 border-sky-100" },
          { name: "Track Bus", id: "bus", icon: BusFront, color: "text-fuchsia-500 bg-fuchsia-50 border-fuchsia-100" },
          { name: "Apply Leave", id: "leave", icon: CalendarOff, color: "text-violet-500 bg-violet-50 border-violet-100" },
          { name: "ID Card", id: "idcard", icon: Contact, color: "text-slate-500 bg-slate-50 border-slate-200" }
      ];

      return (
         <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="relative min-h-[100dvh] bg-[#BBE2FB] flex flex-col overflow-x-hidden"
         >
            {/* White Header */}
            <HomeHeader />

            {/* Background Image (Landscape) correctly placed at top */}
            <div className="absolute top-0 left-0 w-full h-[65vh] z-0 overflow-hidden">
               <img src="/herosection1.jpg" alt="Landscape" className="w-full h-full object-cover opacity-100 pt-16" />
               <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent pt-16" />
            </div>

            {/* Welcome & Mascot */}
            <div className="relative z-20 flex flex-col items-center mt-6 flex-1">
                <h1 className="text-3xl font-black text-slate-800 tracking-tight text-center drop-shadow-md">
                    Welcome, Aryan
                </h1>
                
                {/* Mascot in the middle */}
                <motion.div 
                    animate={{ y: [0, -12, 0], rotate: [0, 2, -2, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="mt-6 w-44 h-44 transform hover:scale-110 transition-transform cursor-pointer relative z-30 drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)]"
                >
                    <img src="/owl1.png" alt="Owl Mascot" className="w-full h-full object-contain" />
                </motion.div>
            </div>

            {/* Bottom White overlapping card */}
            <div className="relative z-20 bg-white rounded-t-[40px] px-5 pt-8 pb-4 shadow-[0_-15px_40px_rgba(0,0,0,0.08)] w-full mt-auto">
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
                <div className="grid grid-cols-5 gap-y-6 gap-x-1 mb-10">
                    {categories.map((cat, i) => (
                        <div key={i} className="flex flex-col items-center gap-1.5 cursor-pointer group" onClick={() => setActiveTab(cat.id)}>
                            <div className={\`w-12 h-12 rounded-[16px] flex items-center justify-center border shadow-[0_4px_10px_rgba(0,0,0,0.03)] group-hover:scale-110 transition-all duration-300 \${cat.color}\`}>
                                <cat.icon size={22} strokeWidth={2.5} />
                            </div>
                            <span className="text-[9px] font-black text-slate-600 text-center leading-tight whitespace-nowrap tracking-tight">{cat.name}</span>
                        </div>
                    ))}
                </div>

                {/* --- FULL LEADERBOARD AND GAMIFICATION SECTION --- */}
                <div className="mt-4 border-t border-slate-100 pt-8 pb-4">
                    
                    {/* LEADERBOARD MAIN */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                                <Trophy size={16} />
                            </div>
                            <h3 className="text-base font-black text-slate-800">Leaderboard</h3>
                        </div>
                    </div>
                    
                    {/* Filters 1: Class / School */}
                    <div className="flex gap-2 mb-4 bg-slate-50 p-1.5 rounded-[16px] border border-slate-100 shadow-inner">
                        <button className="flex-1 bg-white text-amber-500 font-black text-xs py-2.5 rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.03)] border border-slate-100 transition-all">Class</button>
                        <button className="flex-1 bg-transparent text-slate-400 font-bold text-xs py-2.5 rounded-xl hover:bg-slate-100 transition-colors">School</button>
                    </div>
                    
                    {/* Filters 2: Timeframe */}
                    <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2 mb-8 -mx-5 px-5">
                        {["Today", "Last 7 days", "Last Month", "All time"].map((f, i) => (
                            <button key={i} className={\`whitespace-nowrap px-4 py-2 rounded-full text-[11px] font-bold transition-all \${i===0 ? 'bg-amber-400 text-white shadow-[0_4px_12px_rgba(245,158,11,0.3)]' : 'bg-slate-50 text-slate-500 border border-slate-100 hover:bg-slate-100'}\`}>
                                {f}
                            </button>
                        ))}
                    </div>

                    {/* Podium Top 3 (New Beautiful 3D Block Design) */}
                    <div className="flex justify-center items-end px-2 pt-8 mb-8 relative">
                        {/* 2nd Place */}
                        <div className="flex flex-col items-center flex-1 relative top-4">
                            <div className="relative z-20">
                                <div className="w-14 h-14 rounded-full border-[3px] border-[#A2D2FF] overflow-hidden bg-slate-50 shadow-lg"><img src="https://api.dicebear.com/7.x/notionists/svg?seed=Rahul&backgroundColor=transparent" alt="2nd" className="w-full h-full object-cover" /></div>
                            </div>
                            <span className="text-[11px] font-black mt-2 text-slate-700 truncate w-full text-center relative z-20">Rahul</span>
                            <span className="text-[9px] text-[#5A9BD5] font-black relative z-20">450 pts</span>
                            <div className="w-full h-20 bg-[#A2D2FF] rounded-t-[16px] mt-2 border-t-4 border-[#CBE4FF] flex flex-col items-center pt-2 shadow-[0_-5px_15px_rgba(162,210,255,0.3)] relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
                                <span className="text-lg font-black text-blue-800/40 relative z-10">2</span>
                            </div>
                        </div>
                        
                        {/* 1st Place */}
                        <div className="flex flex-col items-center flex-[1.2] relative z-10 -mt-4">
                            <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -top-7 text-4xl drop-shadow-md z-30">👑</motion.div>
                            <div className="relative z-20">
                                <div className="w-20 h-20 rounded-full border-[4px] border-[#FFD166] overflow-hidden bg-amber-50 shadow-xl"><img src="https://api.dicebear.com/7.x/notionists/svg?seed=Aryan&backgroundColor=transparent" alt="1st" className="w-full h-full object-cover" /></div>
                            </div>
                            <span className="text-sm font-black mt-2 text-amber-600 truncate w-full text-center relative z-20">Aryan</span>
                            <span className="text-[10px] text-amber-500 font-black relative z-20">520 pts</span>
                            <div className="w-full h-28 bg-[#FFD166] rounded-t-[20px] mt-2 border-t-[5px] border-[#FFE6A6] flex flex-col items-center pt-3 shadow-[0_-5px_20px_rgba(255,209,102,0.4)] relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent" />
                                <span className="text-2xl font-black text-amber-800/40 relative z-10">1</span>
                                <Star size={16} className="text-white fill-white mt-1 relative z-10 opacity-70" />
                            </div>
                        </div>
                        
                        {/* 3rd Place */}
                        <div className="flex flex-col items-center flex-1 relative top-8">
                            <div className="relative z-20">
                                <div className="w-14 h-14 rounded-full border-[3px] border-[#FFA69E] overflow-hidden bg-red-50 shadow-lg"><img src="https://api.dicebear.com/7.x/notionists/svg?seed=Neha&backgroundColor=transparent" alt="3rd" className="w-full h-full object-cover" /></div>
                            </div>
                            <span className="text-[11px] font-black mt-2 text-slate-700 truncate w-full text-center relative z-20">Neha</span>
                            <span className="text-[9px] text-[#E07A71] font-black relative z-20">390 pts</span>
                            <div className="w-full h-16 bg-[#FFA69E] rounded-t-[16px] mt-2 border-t-4 border-[#FFD0CC] flex flex-col items-center pt-1.5 shadow-[0_-5px_15px_rgba(255,166,158,0.3)] relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
                                <span className="text-md font-black text-red-900/40 relative z-10">3</span>
                            </div>
                        </div>
                    </div>

                    {/* List 4 to 10 */}
                    <div className="flex flex-col gap-2.5 mt-8 mb-6">
                        {[
                            { rank: 4, name: "Sneha", pts: 350 },
                            { rank: 5, name: "Vikram", pts: 320 },
                            { rank: 6, name: "Pooja", pts: 300 },
                            { rank: 7, name: "Rohan", pts: 280 },
                            { rank: 8, name: "Aman", pts: 250 },
                            { rank: 9, name: "Kavya", pts: 210 },
                            { rank: 10, name: "Suresh", pts: 190 },
                        ].map(student => (
                             <div key={student.rank} className="flex items-center gap-3 bg-white p-3.5 rounded-[20px] border border-slate-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)] hover:border-[#FFD166]/50 hover:bg-[#FFF9E6]/30 transition-colors cursor-pointer group">
                                  <span className="text-sm font-black text-slate-300 w-6 text-center">{student.rank}</span>
                                  <div className="w-10 h-10 rounded-full bg-slate-50 overflow-hidden border border-slate-100 shadow-[inset_0_2px_5px_rgba(0,0,0,0.02)]">
                                      <img src={\`https://api.dicebear.com/7.x/notionists/svg?seed=\${student.name}&backgroundColor=transparent\`} alt={student.name} className="w-full h-full object-cover" />
                                  </div>
                                  <span className="text-sm font-bold text-slate-700 flex-1 group-hover:text-amber-600 transition-colors">{student.name}</span>
                                  <div className="flex items-center gap-1.5 bg-[#FFF9E6] px-3 py-1.5 rounded-full border border-[#FFD166]/30">
                                       <Star size={12} className="text-[#FFD166] fill-[#FFD166]" />
                                       <span className="text-xs font-black text-amber-600">{student.pts}</span>
                                  </div>
                             </div>
                        ))}
                        <button className="w-full py-4 mt-3 bg-slate-50 text-xs font-black text-slate-500 hover:bg-[#FFF9E6] hover:text-amber-600 hover:border-[#FFD166]/50 rounded-[20px] transition-all border border-slate-100 shadow-sm flex items-center justify-center gap-2">
                            View All Rankings <ChevronRight size={14} />
                        </button>
                    </div>

                    {/* --- GAMIFICATION (EXPERT PLAN) --- */}
                    <div className="pt-8 border-t border-slate-100">
                        {/* Wallet & Level Card */}
                        <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-[24px] p-5 text-white shadow-[0_10px_30px_rgba(245,158,11,0.3)] mb-8 relative overflow-hidden">
                            <div className="absolute right-0 top-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -mr-10 -mt-10" />
                            <div className="absolute left-0 bottom-0 w-24 h-24 bg-white/10 rounded-full blur-xl -ml-10 -mb-10" />
                            <div className="flex justify-between items-center relative z-10">
                                <div className="flex flex-col">
                                    <span className="text-white/80 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                                        <Sparkles size={12} className="fill-white/80" /> Sanskar Coins
                                    </span>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <span className="text-4xl font-black">450</span>
                                        <Star size={16} className="text-yellow-200 fill-yellow-200" />
                                    </div>
                                </div>
                                <div className="bg-white/20 px-4 py-2 rounded-[16px] backdrop-blur-md border border-white/30 text-center shadow-inner">
                                    <span className="block text-[10px] font-black text-amber-100 uppercase">Level 3</span>
                                    <span className="block text-sm font-black tracking-wide">Scholar</span>
                                </div>
                            </div>
                        </div>

                        {/* Star of the Week Banner */}
                        <div className="bg-gradient-to-r from-purple-50 to-[#F3E5F5] border border-purple-100 rounded-[20px] p-4 flex items-center gap-4 mb-8 shadow-sm relative overflow-hidden">
                            <div className="absolute -right-4 -bottom-4 opacity-5"><Star size={80} className="fill-purple-600" /></div>
                            <div className="w-14 h-14 rounded-full border-2 border-purple-400 overflow-hidden shrink-0 shadow-sm">
                                <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Priya&backgroundColor=e9d5ff" alt="Priya" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col flex-1 relative z-10">
                                <span className="text-[10px] font-black text-purple-600 uppercase tracking-wider flex items-center gap-1 mb-0.5"><Star size={10} className="fill-purple-600"/> Star of the Week</span>
                                <span className="text-sm font-black text-slate-800">Priya Sharma</span>
                                <span className="text-[10px] font-bold text-slate-500 mt-0.5 italic">"For returning a lost wallet"</span>
                            </div>
                        </div>

                        {/* Merit Galaxy - 4 Tabs */}
                        <div className="flex justify-between items-center mb-4 mt-2">
                            <h3 className="text-sm font-black text-slate-800 flex items-center gap-1.5"><Sparkles size={16} className="text-amber-500" /> Merit Galaxy</h3>
                        </div>
                        <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2 mb-6 -mx-5 px-5">
                            <button className="whitespace-nowrap px-4 py-2 rounded-full text-[11px] font-black bg-[#A2D2FF] text-blue-900 shadow-sm border border-[#89C2FF]">Academic Star</button>
                            <button className="whitespace-nowrap px-4 py-2 rounded-full text-[11px] font-black bg-slate-50 text-slate-500 border border-slate-100 hover:bg-slate-100">Karma Star</button>
                            <button className="whitespace-nowrap px-4 py-2 rounded-full text-[11px] font-black bg-slate-50 text-slate-500 border border-slate-100 hover:bg-slate-100">Attendance Star</button>
                            <button className="whitespace-nowrap px-4 py-2 rounded-full text-[11px] font-black bg-slate-50 text-slate-500 border border-slate-100 hover:bg-slate-100">Hidden Talent</button>
                        </div>
                        
                        {/* Compact Podium for Galaxy */}
                        <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)] mb-10">
                            <div className="flex justify-center items-end px-2 pt-2 mb-6 relative">
                                 <div className="flex flex-col items-center flex-1 relative top-3">
                                      <div className="w-12 h-12 rounded-full border-[3px] border-[#A2D2FF] overflow-hidden bg-slate-50"><img src="https://api.dicebear.com/7.x/notionists/svg?seed=Rohan&backgroundColor=transparent" alt="2nd" /></div>
                                      <span className="text-[10px] font-black mt-2 text-slate-700">Rohan</span>
                                      <div className="w-full h-12 bg-[#A2D2FF] rounded-t-[12px] mt-1.5 border-t-2 border-[#CBE4FF] flex flex-col items-center pt-1">
                                          <span className="text-xs font-black text-blue-800/40">2</span>
                                      </div>
                                 </div>
                                 <div className="flex flex-col items-center flex-[1.2] relative z-10 -mt-2">
                                      <div className="absolute -top-5 text-xl drop-shadow-md z-30">👑</div>
                                      <div className="w-14 h-14 rounded-full border-[3px] border-[#FFD166] overflow-hidden bg-amber-50 shadow-md"><img src="https://api.dicebear.com/7.x/notionists/svg?seed=Aryan&backgroundColor=transparent" alt="1st" /></div>
                                      <span className="text-[11px] font-black mt-2 text-amber-600">Aryan</span>
                                      <div className="w-full h-16 bg-[#FFD166] rounded-t-[16px] mt-1.5 border-t-[3px] border-[#FFE6A6] flex flex-col items-center pt-1.5">
                                          <span className="text-sm font-black text-amber-800/40">1</span>
                                      </div>
                                 </div>
                                 <div className="flex flex-col items-center flex-1 relative top-5">
                                      <div className="w-12 h-12 rounded-full border-[3px] border-[#FFA69E] overflow-hidden bg-red-50"><img src="https://api.dicebear.com/7.x/notionists/svg?seed=Neha&backgroundColor=transparent" alt="3rd" /></div>
                                      <span className="text-[10px] font-black mt-2 text-slate-700">Neha</span>
                                      <div className="w-full h-10 bg-[#FFA69E] rounded-t-[12px] mt-1.5 border-t-2 border-[#FFD0CC] flex flex-col items-center pt-1">
                                          <span className="text-xs font-black text-red-900/40">3</span>
                                      </div>
                                 </div>
                            </div>
                            <div className="flex flex-col gap-2.5 border-t border-slate-50 pt-4">
                                 <div className="flex items-center gap-3">
                                     <span className="text-[11px] font-black text-slate-300 w-4 text-center">4</span>
                                     <div className="w-7 h-7 rounded-full bg-slate-50 overflow-hidden border border-slate-100"><img src="https://api.dicebear.com/7.x/notionists/svg?seed=Karan&backgroundColor=transparent" alt="4" /></div>
                                     <span className="text-xs font-bold text-slate-600 flex-1">Karan</span>
                                     <span className="text-[10px] font-black text-amber-500">410 pts</span>
                                 </div>
                                 <div className="flex items-center gap-3">
                                     <span className="text-[11px] font-black text-slate-300 w-4 text-center">5</span>
                                     <div className="w-7 h-7 rounded-full bg-slate-50 overflow-hidden border border-slate-100"><img src="https://api.dicebear.com/7.x/notionists/svg?seed=Pooja&backgroundColor=transparent" alt="5" /></div>
                                     <span className="text-xs font-bold text-slate-600 flex-1">Pooja</span>
                                     <span className="text-[10px] font-black text-amber-500">380 pts</span>
                                 </div>
                            </div>
                        </div>

                        {/* My Badges Collection */}
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-black text-slate-800 flex items-center gap-1.5"><Medal size={16} className="text-emerald-500" /> My Badges</h3>
                            <span className="text-[10px] font-black text-amber-500 cursor-pointer bg-amber-50 px-2 py-1 rounded-full">View all 12</span>
                        </div>
                        <div className="flex gap-3 overflow-x-auto custom-scrollbar pb-6 -mx-5 px-5 mb-4">
                            <div className="min-w-[100px] bg-white rounded-[20px] p-3 flex flex-col items-center border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                                <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mb-2.5 border border-amber-100"><Flame size={20} className="text-amber-500 fill-amber-500" /></div>
                                <span className="text-[10px] font-black text-slate-700 text-center leading-tight mb-0.5">Phoenix</span>
                                <span className="text-[8px] font-bold text-slate-400 text-center">Most Improved</span>
                            </div>
                            <div className="min-w-[100px] bg-white rounded-[20px] p-3 flex flex-col items-center border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                                <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mb-2.5 border border-emerald-100"><HeartHandshake size={20} className="text-emerald-500" /></div>
                                <span className="text-[10px] font-black text-slate-700 text-center leading-tight mb-0.5">Helping Hand</span>
                                <span className="text-[8px] font-bold text-slate-400 text-center">Helped 5 peers</span>
                            </div>
                            <div className="min-w-[100px] bg-white rounded-[20px] p-3 flex flex-col items-center border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-2.5 border border-blue-100"><Zap size={20} className="text-blue-500 fill-blue-500" /></div>
                                <span className="text-[10px] font-black text-slate-700 text-center leading-tight mb-0.5">Iron Man</span>
                                <span className="text-[8px] font-bold text-slate-400 text-center">100% Attend.</span>
                            </div>
                        </div>

                        {/* Class War */}
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-black text-slate-800 flex items-center gap-1.5"><Swords size={16} className="text-rose-500" /> Class War</h3>
                            <span className="text-[9px] font-black bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full border border-rose-200">LIVE 🔥</span>
                        </div>
                        <div className="bg-[#1E293B] rounded-[24px] p-5 text-white shadow-lg mb-10 relative overflow-hidden">
                            <div className="absolute right-[-20px] bottom-[-20px] opacity-10"><Trophy size={120} /></div>
                            <div className="flex justify-between items-center mb-5 relative z-10">
                                <div className="flex flex-col items-center">
                                    <span className="text-sm font-black text-amber-400">Section 10-A</span>
                                    <span className="text-[10px] font-bold text-slate-400">Your Section</span>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-black text-xs text-slate-300">VS</div>
                                <div className="flex flex-col items-center">
                                    <span className="text-sm font-black text-blue-400">Section 10-B</span>
                                    <span className="text-[10px] font-bold text-slate-400">Rivals</span>
                                </div>
                            </div>
                            <div className="w-full h-3.5 bg-slate-700 rounded-full overflow-hidden flex relative z-10 border border-slate-600/50">
                                <div className="h-full bg-amber-400 relative" style={{ width: '55%' }}>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/30" />
                                </div>
                                <div className="h-full bg-blue-400 relative" style={{ width: '45%' }}>
                                    <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/30" />
                                </div>
                            </div>
                            <div className="flex justify-between items-center mt-3 relative z-10">
                                <span className="text-[11px] font-black text-amber-100">12,450 pts</span>
                                <span className="text-[11px] font-black text-blue-100">10,200 pts</span>
                            </div>
                        </div>

                        {/* Redeem Store */}
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-black text-slate-800 flex items-center gap-1.5"><WalletCards size={16} className="text-amber-500" /> Redeem Store</h3>
                            <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-full border border-amber-100">
                                <span className="text-[10px] font-black text-amber-600">450</span>
                                <Star size={10} className="text-amber-500 fill-amber-500" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="bg-white p-3.5 rounded-[20px] border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center justify-between group cursor-pointer hover:border-emerald-200 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-emerald-50 rounded-[12px] flex items-center justify-center shrink-0"><BookOpen className="text-emerald-500" size={18} /></div>
                                    <div className="flex flex-col">
                                        <h4 className="text-xs font-black text-slate-800">Library VIP Access</h4>
                                        <span className="text-[9px] font-bold text-slate-400">Get special books section</span>
                                    </div>
                                </div>
                                <button className="bg-slate-50 border border-slate-200 text-slate-600 text-[10px] font-black px-3 py-1.5 rounded-xl group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 transition-all">50 Coins</button>
                            </div>
                            <div className="bg-white p-3.5 rounded-[20px] border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center justify-between group cursor-pointer hover:border-amber-200 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-orange-50 rounded-[12px] flex items-center justify-center shrink-0"><Flame className="text-orange-500" size={18} /></div>
                                    <div className="flex flex-col">
                                        <h4 className="text-xs font-black text-slate-800">Skip One Homework</h4>
                                        <span className="text-[9px] font-bold text-slate-400">Teacher approval needed</span>
                                    </div>
                                </div>
                                <button className="bg-amber-400 text-white shadow-sm text-[10px] font-black px-3 py-1.5 rounded-xl">150 Coins</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Branding */}
                <div className="mt-6 mb-0 flex flex-col items-center justify-center text-center space-y-1">
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
                             <div className="w-14 h-14 bg-amber-100 text-amber-500 rounded-[16px] flex items-center justify-center font-black text-xl">A+</div>
                             <div className="flex flex-col">
                                 <h4 className="text-base font-black text-slate-800">Mid-Term Exam</h4>
                                 <span className="text-xs font-bold text-slate-500 mt-0.5">Rank: Top 5%</span>
                             </div>
                         </div>
                         <ChevronRight size={20} className="text-amber-400" />
                    </div>
                </div>
            );
        }
        
        return (
             <div className="flex flex-col items-center justify-center py-32 text-slate-400">
                  <Medal size={48} className="mb-4 text-slate-200" />
                  <p className="text-sm font-bold">Content for {activeTab} coming soon</p>
             </div>
        );
    };

    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="min-h-[100dvh] bg-[#F9FBFF] flex flex-col relative overflow-x-hidden pb-4"
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

            <div className="px-6 relative z-10 flex flex-col flex-1 w-full mt-2">
                {/* Title area with small mascot on the right */}
                <div className="flex justify-between items-end mb-6">
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-black text-slate-800 capitalize tracking-tight">
                            {activeTab === 'diary' ? 'Discover' : activeTab === 'performance' ? 'Exams' : activeTab === 'leaderboard' ? 'Leaderboard' : activeTab}
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

                {/* Horizontal Category Pills */}
                {activeTab !== 'leaderboard' && (
                    <div className="flex gap-3 overflow-x-auto custom-scrollbar pb-2 -mx-6 px-6 mb-6">
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
                )}

                {/* Main Content Area */}
                {renderContent()}

                {/* Footer Branding for Right Screen */}
                <div className="mt-auto pt-10 pb-0 flex flex-col items-center justify-center text-center space-y-1.5">
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
          <div className="w-full min-h-[100dvh] md:min-h-0 md:h-[850px] md:max-w-[400px] md:rounded-[40px] bg-white relative md:shadow-2xl overflow-hidden md:border-[8px] md:border-white flex flex-col">
             <div className="flex-1 relative overflow-y-auto overflow-x-hidden custom-scrollbar">
                 <AnimatePresence mode="wait">
                     {activeTab === "overview" ? <LeftScreen key="left" /> : <RightScreen key="right" />}
                 </AnimatePresence>
             </div>
          </div>
      </div>
  );
}
`;

fs.writeFileSync('src/app/dashboard/student/page.tsx', content);
console.log('Successfully wrote page.tsx');
