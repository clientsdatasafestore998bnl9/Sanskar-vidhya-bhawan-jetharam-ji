"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Calendar, 
  Award, 
  CreditCard, 
  Bell, 
  LogOut, 
  ChevronRight, 
  ClipboardList, 
  Clock, 
  Download, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  FileText,
  AlertCircle,
  QrCode,
  ChevronLeft,
  CalendarDays,
  Printer,
  ChevronRightSquare,
  ChevronLeftSquare,
  Info
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type TabType = "overview" | "diary" | "attendance" | "performance" | "fees";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [showMarksheet, setShowMarksheet] = useState<{show: boolean, data: any}>({ show: false, data: null });
  const [showQR, setShowQR] = useState(false);
  
  // --- ATTENDANCE SPECIFIC STATE ---
  const [currentMonth, setCurrentMonth] = useState("April 2026");
  const [selectedAttDate, setSelectedAttDate] = useState(new Date().getDate());

  // --- MOCK DATA ---
  const homeworkData: any = {
    12: [
        { teacher: "Mr. R.K. Singh", subject: "Maths", task: "Solve Exercise 5.4 in Diary.", status: "Done" },
        { teacher: "Ms. Sharma", subject: "Physics", task: "Pendulum Experiment Report.", status: "Pending" }
    ],
    13: [
        { teacher: "Dr. Bose", subject: "English", task: "Shakespeare Summary.", status: "Done" }
    ],
    14: [
        { teacher: "Principal", subject: "Notice", task: "Bring Consent Form.", status: "Pending" }
    ]
  };

  // Detailed multi-month attendance data
  const monthData: any = {
    "April 2026": Array.from({ length: 30 }).map((_, i) => {
        const day = i + 1;
        const isSunday = [5, 12, 19, 26].includes(day);
        const isHoliday = day === 10; // Random holiday
        const isAbsent = day === 15;
        
        return {
            day,
            status: isSunday || isHoliday ? 'H' : isAbsent ? 'A' : 'P',
            reason: isSunday ? "School closed for Regular Sunday" : 
                    isHoliday ? "Gazetted Holiday" : 
                    isAbsent ? "Medical Leave (Fever) - Verified by Class Teacher" : 
                    "Regular School Presence Recorded",
            timeIn: isSunday || isHoliday || isAbsent ? "--:--" : "08:15 AM",
            timeOut: isSunday || isHoliday || isAbsent ? "--:--" : "02:30 PM"
        };
    }),
    "March 2026": Array.from({ length: 31 }).map((_, i) => {
        const day = i + 1;
        const isSunday = [1, 8, 15, 22, 29].includes(day);
        const isHoliday = day === 24; // Holi
        return {
            day,
            status: isSunday || isHoliday ? 'H' : 'P',
            reason: isSunday ? "Regular Sunday" : isHoliday ? "Festival Holiday" : "Regular Presence",
            timeIn: isSunday || isHoliday ? "--:--" : "08:20 AM",
            timeOut: isSunday || isHoliday ? "--:--" : "02:35 PM"
        };
    })
  };

  const exams = [
    { title: "Unit Test 1", date: "15 Jan 2026", score: "92/100", status: "Past" },
    { title: "Mid-Term Exam", date: "10 Mar 2026", score: "440/500", status: "Past" },
    { title: "Unit Test 2", date: "25 Apr 2026", syllabus: "Calculus & Thermodynamics", status: "Upcoming" },
  ];

  // --- SUB-COMPONENTS ---

  const MobileNav = () => (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 z-50 flex items-center justify-around p-3 pb-4 lg:hidden shadow-[0_-20px_40px_rgba(0,0,0,0.5)]">
        {[
            { id: "overview", name: "Home", icon: LayoutDashboard },
            { id: "diary", name: "Diary", icon: ClipboardList },
            { id: "attendance", name: "Attnd", icon: CalendarDays },
            { id: "performance", name: "Exams", icon: Award },
            { id: "fees", name: "Fees", icon: CreditCard },
        ].map((item) => (
            <button
                key={item.id}
                onClick={() => setActiveTab(item.id as TabType)}
                className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all ${
                    activeTab === item.id ? "text-accent scale-110 -translate-y-2 relative" : "text-slate-400 hover:text-slate-200"
                }`}
            >
                {/* Active Indicator dot */}
                {activeTab === item.id && <span className="absolute -bottom-2 w-1 h-1 rounded-full bg-accent drop-shadow-[0_0_8px_rgba(var(--accent),0.8)]" />}
                <item.icon size={20} className={activeTab === item.id ? "drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" : ""} />
                <span className="text-[8px] font-black uppercase tracking-widest">{item.name}</span>
            </button>
        ))}
    </nav>
  );

  const Sidebar = () => (
    <aside className="w-80 bg-primary text-white hidden lg:flex flex-col p-10 fixed h-full z-20 shadow-2xl overflow-y-auto scrollbar-hide">
        <div className="flex items-center gap-4 mb-16">
            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center p-2 shadow-xl shadow-black/20">
                <Image src="/logo.png" alt="Logo" width={40} height={40} />
            </div>
            <div className="flex flex-col">
                <span className="font-black text-sm tracking-tighter leading-tight uppercase">SVB Portal</span>
                <span className="font-bold text-[9px] tracking-[.3em] uppercase text-accent">Student Suite</span>
            </div>
        </div>

        <nav className="flex flex-col gap-3">
          {[
            { id: "overview", name: "Overview", icon: LayoutDashboard },
            { id: "diary", name: "Digital Diary", icon: ClipboardList },
            { id: "attendance", name: "Attendance", icon: CalendarDays },
            { id: "performance", name: "Report Card", icon: Award },
            { id: "fees", name: "Fee Portal", icon: CreditCard },
          ].map((item) => (
            <button
                key={item.id}
                onClick={() => setActiveTab(item.id as TabType)}
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all group ${
                    activeTab === item.id 
                    ? "bg-accent text-primary shadow-2xl shadow-accent/20" 
                    : "text-white/30 hover:bg-slate-900/5 hover:text-white"
                }`}
            >
                <item.icon size={18} className={activeTab === item.id ? "text-primary" : "text-white/20 group-hover:text-accent transition-colors"} />
                {item.name}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-10 border-t border-white/5">
             <Link href="/" className="flex items-center gap-4 px-6 py-4 text-white/20 hover:text-white transition-colors group">
                <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-[11px] font-black uppercase tracking-widest">Sign Out</span>
            </Link>
        </div>
    </aside>
  );

  const DashboardOverview = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6 lg:gap-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
            {[
                { label: "Presence", value: "96%", color: "text-primary", bg: "bg-primary/10", icon: Calendar },
                { label: "CGPA", value: "9.2", color: "text-accent", bg: "bg-accent/10", icon: Award },
                { label: "Tasks", value: "85%", color: "text-blue-500", bg: "bg-blue-500/10", icon: ClipboardList },
                { label: "Fees Due", value: "₹4,200", color: "text-red-500", bg: "bg-red-500/10", icon: CreditCard },
            ].map((s, i) => (
                <div key={i} className="bg-slate-800 p-4 sm:p-5 lg:p-6 rounded-[24px] lg:rounded-[35px] border border-slate-700 shadow-xl shadow-black/20 flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-3 lg:gap-5 hover:shadow-lg transition-all text-center sm:text-left">
                    <div className={`w-10 h-10 lg:w-12 lg:h-12 ${s.bg} ${s.color} rounded-[14px] lg:rounded-2xl flex flex-shrink-0 items-center justify-center`}><s.icon size={18} className="lg:w-5 lg:h-5" /></div>
                    <div className="flex flex-col items-center sm:items-start"><span className="text-xl lg:text-2xl font-black text-slate-100 tracking-tighter leading-tight">{s.value}</span><span className="text-[8px] lg:text-[10px] font-bold uppercase tracking-widest text-slate-400">{s.label}</span></div>
                </div>
            ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
            <div className="lg:col-span-8 bg-slate-800 p-6 lg:p-10 rounded-[32px] lg:rounded-[50px] border border-slate-700 shadow-xl shadow-black/20">
                <div className="flex flex-wrap items-center justify-between mb-6 lg:mb-8 pb-4 border-b border-slate-700 gap-4">
                    <h3 className="text-lg lg:text-xl font-black uppercase tracking-tighter text-slate-100">Upcoming Examinations</h3>
                    <AlertCircle className="text-accent lg:w-6 lg:h-6 w-5 h-5" />
                </div>
                <div className="flex flex-col gap-4">
                    {exams.filter(e => e.status === "Upcoming").map((ex, i) => (
                        <div key={i} className="p-6 rounded-3xl bg-slate-900/50 border border-transparent hover:border-accent/20 transition-all flex items-center justify-between group cursor-pointer">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-accent">{ex.date}</span>
                                <h4 className="text-lg font-black text-slate-200 uppercase tracking-tighter group-hover:text-primary transition-colors">{ex.title}</h4>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Syllabus: {ex.syllabus}</p>
                            </div>
                            <ChevronRight size={20} className="text-slate-400 group-hover:text-primary transition-all" />
                        </div>
                    ))}
                </div>
            </div>
            <div className="lg:col-span-4 bg-primary p-6 lg:p-10 rounded-[32px] lg:rounded-[50px] text-white flex flex-col justify-between shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-900/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div>
                    <h3 className="text-xl lg:text-2xl font-black uppercase tracking-tighter mb-2 lg:mb-4">Diary Alert</h3>
                    <p className="text-xs lg:text-sm font-bold opacity-60 leading-relaxed mb-6">You have 2 pending homework tasks for today. Completion status: 40%</p>
                </div>
                <button onClick={() => setActiveTab("diary")} className="bg-accent text-primary py-4 rounded-2xl text-[10px] font-black uppercase tracking-[.2em] shadow-xl hover:scale-105 transition-all">Go to Diary</button>
            </div>
        </div>
    </motion.div>
  );

  const DiarySection = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="grid lg:grid-cols-12 gap-6 lg:gap-10">
        {/* Interactive Calendar */}
        <div className="lg:col-span-5 bg-slate-800 p-6 lg:p-10 rounded-[32px] lg:rounded-[50px] border border-slate-700 shadow-xl shadow-black/20">
            <div className="flex items-center justify-between mb-6 lg:mb-10">
                <h3 className="text-xl font-black uppercase tracking-tighter">Select Date</h3>
                <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">April 2026</span>
            </div>
            <div className="grid grid-cols-7 gap-2">
                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                    <span key={`diary-day-${i}`} className="text-center text-[9px] font-black text-slate-400 uppercase mb-2">{d}</span>
                ))}
                {Array.from({ length: 30 }).map((_, i) => (
                    <button 
                        key={i} 
                        onClick={() => setSelectedDate(i + 1)}
                        className={`w-9 h-9 mx-auto rounded-xl flex items-center justify-center text-xs font-black transition-all ${
                            selectedDate === i + 1 
                            ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105" 
                            : homeworkData[i + 1] ? "bg-accent/20 text-accent border border-accent/30" : "bg-slate-800/50 text-slate-400 hover:bg-slate-800"
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>

        {/* Homework List for selected date */}
        <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-slate-800 p-6 lg:p-10 rounded-[32px] lg:rounded-[50px] border border-slate-700 shadow-xl shadow-black/20 min-h-[400px]">
                <div className="flex items-center justify-between mb-6 lg:mb-10 pb-4 lg:pb-6 border-b border-slate-700">
                    <div className="flex flex-col">
                        <h3 className="text-xl font-black uppercase tracking-tighter text-slate-100">Digital Diary</h3>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tasks for April {selectedDate}, 2026</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center"><ClipboardList size={20} /></div>
                </div>

                <div className="flex flex-col gap-5">
                    {homeworkData[selectedDate] ? (
                        homeworkData[selectedDate].map((hw: any, i: number) => (
                            <div key={i} className="p-6 rounded-3xl bg-slate-800/50 flex items-center justify-between group hover:bg-slate-900 hover:shadow-premium transition-all border border-transparent hover:border-slate-800">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-accent">{hw.subject} • {hw.teacher}</span>
                                    <h4 className="text-lg font-black text-white uppercase tracking-tighter leading-tight group-hover:text-primary transition-colors">{hw.task}</h4>
                                </div>
                                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                                    hw.status === "Done" ? "bg-amber-500/10 text-amber-500/100" : "bg-orange-50 text-orange-500"
                                }`}>
                                    {hw.status === "Done" ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                                    {hw.status}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center mt-20 text-slate-300">
                            <Clock size={48} className="mb-4 opacity-20" />
                            <p className="text-xs font-black uppercase tracking-widest">No tasks for this date</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </motion.div>
  );

  const AttendanceSection = () => {
    const currentData = monthData[currentMonth] || [];
    const selectedInfo = currentData.find((d: any) => d.day === selectedAttDate) || {};

    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-6 lg:gap-10 font-JakartaSans">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
              {/* Detailed Interactive Logs */}
              <div className="lg:col-span-8 bg-slate-800 p-6 lg:p-12 rounded-[32px] lg:rounded-[60px] border border-slate-700 shadow-xl shadow-black/20">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 lg:mb-12">
                      <div className="flex flex-col gap-1">
                          <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-100">Attendance Calendar</h3>
                          <div className="flex items-center gap-4 mt-2">
                             <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500/100 shadow-lg shadow-amber-500/20" /><span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">P</span></div>
                             <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/20" /><span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">A</span></div>
                             <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/20" /><span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">H</span></div>
                          </div>
                      </div>
                      
                      {/* Month Swapping UI */}
                      <div className="flex items-center bg-slate-900/50 p-2 rounded-2xl border border-slate-700 gap-2">
                           <button 
                                onClick={() => setCurrentMonth("March 2026")}
                                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${currentMonth === "March 2026" ? "bg-primary text-white" : "hover:bg-slate-700 text-slate-400"}`}
                           >
                               <ChevronLeft size={18} />
                           </button>
                           <span className="px-4 lg:px-6 text-xs font-bold uppercase tracking-widest text-slate-200">{currentMonth}</span>
                           <button 
                                onClick={() => setCurrentMonth("April 2026")}
                                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${currentMonth === "April 2026" ? "bg-primary text-white" : "hover:bg-slate-700 text-slate-400"}`}
                           >
                               <ChevronRight size={18} />
                           </button>
                      </div>
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                      {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                          <span key={`att-day-${i}`} className={`text-center text-[9px] font-black uppercase mb-2 ${d === "S" ? "text-red-500" : "text-slate-300"}`}>{d}</span>
                      ))}
                      {currentData.map((d: any, i: number) => (
                          <button 
                              key={`attendance-cell-${i}`} 
                              onClick={() => setSelectedAttDate(d.day)}
                              className={`w-9 h-9 mx-auto rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer border shadow-2xl shadow-black/40 ${
                                  selectedAttDate === d.day ? "ring-2 ring-primary border-primary scale-105 z-10" : "border-transparent"
                              } ${
                                  d.status === 'P' ? "bg-amber-500 text-white" : 
                                  d.status === 'A' ? "bg-red-600 text-white" : 
                                  d.status === 'H' ? "bg-blue-600 text-white" :
                                  "bg-slate-800 text-slate-400"
                              }`}
                          >
                              <span className="text-[8px] font-bold opacity-40 leading-none">{d.day}</span>
                              <span className="text-[10px] font-black tracking-tighter">{d.status}</span>
                          </button>
                      ))}
                  </div>
              </div>

              {/* Status Details & Trends */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                  {/* Today's Selection Detail */}
                  <div className="bg-primary text-white p-6 lg:p-10 rounded-[32px] lg:rounded-[50px] shadow-2xl relative overflow-hidden group min-h-[250px] lg:min-h-[300px] flex flex-col justify-between">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-slate-900/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                      <div>
                          <p className="text-[11px] font-black uppercase tracking-[.4em] opacity-40 mb-4 lg:mb-6">{currentMonth.split(' ')[0]} {selectedAttDate}</p>
                          <h4 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter mb-4">
                               {selectedInfo.status === 'P' ? "Present" : selectedInfo.status === 'H' ? "Holiday" : "Absent"}
                          </h4>
                          <div className="flex items-start gap-3 mt-6 lg:mt-8 p-4 bg-slate-900/5 rounded-2xl lg:rounded-3xl border border-white/5">
                               <Info size={16} className="text-accent mt-1 flex-shrink-0" />
                               <p className="text-[11px] font-bold opacity-70 leading-relaxed uppercase tracking-widest">{selectedInfo.reason}</p>
                          </div>
                      </div>
                      {selectedInfo.status === 'P' && (
                          <div className="flex items-center justify-between mt-10 pt-10 border-t border-white/5">
                               <div className="flex flex-col"><span className="text-[8px] font-black uppercase opacity-40">Entry</span><span className="text-sm font-black">{selectedInfo.timeIn}</span></div>
                               <div className="flex flex-col items-end"><span className="text-[8px] font-black uppercase opacity-40">Exit</span><span className="text-sm font-black">{selectedInfo.timeOut}</span></div>
                          </div>
                      )}
                  </div>

                  {/* Attendance Chart - HIGH VISIBILITY */}
                  <div className="bg-slate-800 p-6 lg:p-10 rounded-[32px] lg:rounded-[50px] border border-slate-700 shadow-xl shadow-black/20 flex-1">
                      <div className="flex items-center justify-between mb-6 lg:mb-10">
                          <div>
                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-100">Attendance Trends</h4>
                            <p className="text-[9px] font-bold uppercase text-slate-400 mt-1">Presence percentage (%)</p>
                          </div>
                          <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center"><TrendingUp size={18} /></div>
                      </div>
                      <div className="relative h-44 border-l-2 border-b-2 border-slate-800 flex items-end justify-between px-3 pb-2 gap-4">
                          {/* Y-Axis Grid Lines */}
                          <div className="absolute left-0 right-0 bottom-1/4 h-px bg-slate-800/50" />
                          <div className="absolute left-0 right-0 bottom-1/2 h-px bg-slate-800/50" />
                          <div className="absolute left-0 right-0 bottom-3/4 h-px bg-slate-800/50" />
                          
                          {[{m: "Nov", h: 60}, {m: "Dec", h: 85}, {m: "Jan", h: 95}, {m: "Feb", h: 75}, {m: "Mar", h: 92}].map((data, i) => (
                              <div key={`trend-bar-${i}`} className="flex-1 flex flex-col items-center gap-2 group relative z-10">
                                  <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-all bg-slate-900 text-white px-3 py-1.5 rounded-xl text-[10px] font-black shadow-xl z-20">
                                      {data.h}%
                                  </div>
                                  <motion.div 
                                      initial={{ height: 0 }} 
                                      animate={{ height: `${data.h}%` }} 
                                      className={`w-full rounded-t-xl shadow-lg transition-all relative overflow-hidden border-x border-t border-white/10 ${
                                          i === 4 ? "bg-primary" : "bg-slate-300 group-hover:bg-accent"
                                      }`}
                                  >
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                                  </motion.div>
                                  <span className="text-[9px] font-black uppercase text-slate-500 tracking-tighter">{data.m}</span>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
          </div>
      </motion.div>
    );
  };

  const PerformanceSection = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6 lg:gap-10">
        <div className="bg-slate-900 p-6 lg:p-12 rounded-[32px] lg:rounded-[60px] border border-slate-800 shadow-2xl shadow-black/40 relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 lg:mb-12">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center"><Award size={24} /></div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter">Academic Examination History</h3>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Class: 10-A</span>
                </div>
            </div>

            <div className="flex flex-col gap-6">
                {exams.filter(e => e.status === "Past").map((ex, i) => (
                    <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-8 rounded-[40px] bg-slate-800/50 border border-transparent hover:border-primary/20 hover:bg-slate-900 hover:shadow-premium transition-all cursor-pointer group">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{ex.date}</span>
                             <h4 className="text-xl font-black text-white uppercase tracking-tighter group-hover:text-primary transition-colors">{ex.title}</h4>
                        </div>
                        <div className="flex items-center gap-10">
                            <div className="flex flex-col items-end">
                                <span className="text-2xl font-black text-slate-100 tracking-tighter">{ex.score}</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500/100">Passed</span>
                            </div>
                            <button 
                                onClick={() => setShowMarksheet({ show: true, data: ex })}
                                className="flex items-center gap-2 lg:gap-3 bg-slate-900 border border-slate-700 px-4 py-3 lg:px-6 lg:py-4 rounded-xl lg:rounded-2xl text-[8px] lg:text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white hover:border-primary transition-all shadow-xl shadow-black/20 shrink-0"
                            >
                                <FileText size={14} className="lg:w-4 lg:h-4" /> Marksheet
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Upcoming Section */}
        <div className="bg-slate-950 text-white p-6 lg:p-12 rounded-[32px] lg:rounded-[60px] shadow-2xl overflow-hidden relative border border-slate-800">
            <div className="absolute top-0 right-0 w-32 h-32 lg:w-64 lg:h-64 bg-accent opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <h3 className="text-xl lg:text-2xl font-black uppercase tracking-tighter mb-6 lg:mb-10 flex items-center gap-4">
                 <Clock className="text-accent lg:w-6 lg:h-6 w-5 h-5" /> Upcoming Assessments
            </h3>
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                 <div className="bg-slate-900/5 border border-white/5 p-6 lg:p-8 rounded-[24px] lg:rounded-[40px] flex flex-col gap-4 lg:gap-6">
                    <div className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-xl bg-accent text-primary flex items-center justify-center font-black">25</span>
                        <div className="flex flex-col">
                            <span className="text-xl font-black uppercase tracking-tighter">Unit Test 2</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-accent">April 2024</span>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Syllabus Covered</span>
                            <span className="text-sm font-bold text-white/80 leading-relaxed italic">Calculus, Solid States, Thermodynamics Part 1</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/5 rounded-xl border border-white/5 max-w-fit">
                            <Download size={14} className="text-accent" />
                            <span className="text-[9px] font-black uppercase tracking-widest">Study Resource</span>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
    </motion.div>
  );

  const FeesSection = () => (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-6 lg:gap-10">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            <div className="lg:col-span-7 bg-slate-900 p-6 lg:p-12 rounded-[32px] lg:rounded-[60px] border border-slate-800 shadow-2xl shadow-black/40 flex flex-col justify-between">
                <div>
                    <h3 className="text-xl lg:text-2xl font-black uppercase tracking-tighter mb-2 lg:mb-4 text-white">Fee Ledger Summary</h3>
                    <p className="text-xs lg:text-sm font-bold text-slate-400 uppercase tracking-widest leading-relaxed mb-6 lg:mb-10">Clear all pending dues to avoid late fine during examination board registration.</p>
                    <div className="flex flex-col gap-5">
                         {[
                             { label: "Total Yearly Fees", val: "₹48,000", color: "text-white" },
                             { label: "Paid Till Date", val: "₹36,000", color: "text-amber-500/100" },
                             { label: "Current Balance", val: "₹12,000", color: "text-red-500" },
                         ].map((item, i) => (
                             <div key={i} className="flex justify-between items-center py-4 border-b border-slate-800">
                                <span className="text-xs font-black uppercase tracking-widest text-slate-400">{item.label}</span>
                                <span className={`text-xl font-black tracking-tighter ${item.color}`}>{item.val}</span>
                             </div>
                         ))}
                    </div>
                </div>
                <button onClick={() => setShowQR(true)} className="w-full mt-10 py-6 rounded-[30px] bg-primary text-white font-black uppercase tracking-[.4em] text-xs shadow-2xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-4">
                     Pay Pending Fees <CreditCard size={18} />
                </button>
            </div>
            <div className="lg:col-span-5 bg-slate-950 p-6 lg:p-12 rounded-[32px] lg:rounded-[60px] border border-slate-800 text-white overflow-hidden relative">
                 <div className="absolute top-0 right-0 w-32 h-32 lg:w-48 lg:h-48 bg-accent opacity-10 rounded-full blur-3xl" />
                 <h4 className="text-xs font-black uppercase tracking-widest text-accent mb-6 lg:mb-10">Payment History</h4>
                 <div className="flex flex-col gap-6">
                    {[
                        { id: "#028", date: "15 Feb 2024", amt: "₹12,000" },
                        { id: "#014", date: "10 Nov 2023", amt: "₹12,000" },
                    ].map((t, i) => (
                        <div key={i} className="flex items-center justify-between p-6 rounded-3xl bg-slate-900/5 border border-white/5 hover:bg-slate-900/10 transition-all cursor-pointer group">
                             <div className="flex flex-col gap-1">
                                <span className="text-[8px] font-black uppercase tracking-widest text-white/30">ID: {t.id}</span>
                                <span className="text-sm font-black tracking-tight">{t.date}</span>
                             </div>
                             <div className="flex flex-col items-end">
                                <span className="text-lg font-black text-accent tracking-tighter">{t.amt}</span>
                                <span className="flex items-center gap-1 text-[8px] font-black text-white/30 uppercase tracking-widest group-hover:text-white transition-colors">
                                    <Download size={10} /> Receipt
                                </span>
                             </div>
                        </div>
                    ))}
                 </div>
                 <button className="w-full mt-10 py-4 rounded-2xl border-2 border-white/5 text-white/30 text-[10px] font-black uppercase tracking-widest hover:border-accent hover:text-accent transition-all">Export All History</button>
            </div>
        </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex font-JakartaSans relative pb-24 lg:pb-0">
      {Sidebar()}
      {MobileNav()}

      {/* Main Content */}
      <main className="flex-1 lg:ml-80 p-4 sm:p-6 lg:p-14 relative z-10 overflow-x-hidden">
        
        {/* Mobile App Bar */}
        <div className="flex items-center justify-between lg:hidden mb-6 bg-slate-800 p-3 sm:p-4 rounded-3xl border border-slate-700 shadow-xl">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-900 rounded-xl overflow-hidden shadow-inner border border-slate-700 flex-shrink-0">
                    <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=200" alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                    <span className="font-black text-[12px] sm:text-sm tracking-tight leading-none uppercase text-slate-100">Aryan Paliwal</span>
                    <span className="font-bold text-[8px] sm:text-[9px] tracking-[.15em] uppercase text-slate-400 mt-1">Class 10-A • Roll 12</span>
                </div>
            </div>
            <div className="bg-accent/10 px-3 py-2 rounded-xl text-[9px] font-black text-accent uppercase tracking-widest border border-accent/20 flex-shrink-0">
                SVB
            </div>
        </div>

        {/* Dynamic Header */}
        <header className="flex items-end justify-between gap-4 mb-8 lg:mb-16">
            <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2 lg:gap-3">
                    <span className="bg-accent/10 text-accent px-2 lg:px-3 py-1 rounded-full text-[8px] lg:text-[10px] font-black uppercase tracking-widest leading-none">Session 2026-27</span>
                    <span className="w-1 h-1 lg:w-1.5 lg:h-1.5 bg-slate-600 rounded-full hidden sm:block" />
                    <span className="text-[8px] lg:text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden sm:block">Aryan Paliwal • Grade 10-A • Roll 12</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-7xl font-black text-slate-100 uppercase tracking-tighter leading-tight mt-1 lg:mt-0">
                     {activeTab === "overview" && "Dashboard"}
                     {activeTab === "diary" && "Digital Diary"}
                     {activeTab === "attendance" && "Attendance Logs"}
                     {activeTab === "performance" && "Examination"}
                     {activeTab === "fees" && "Fee Records"}
                </h1>
            </div>
            <div className="flex items-center gap-4 hidden lg:flex">
                 <div className="w-14 h-14 bg-slate-900 rounded-3xl overflow-hidden shadow-premium border-4 border-white ring-1 ring-slate-100 scale-110">
                    <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=200" alt="Avatar" className="w-full h-full object-cover rounded-2xl" />
                 </div>
            </div>
        </header>

        {/* Tab Content */}
        <div className="min-h-[500px]">
            {activeTab === "overview" && DashboardOverview()}
            {activeTab === "diary" && DiarySection()}
            {activeTab === "attendance" && AttendanceSection()}
            {activeTab === "performance" && PerformanceSection()}
            {activeTab === "fees" && FeesSection()}
        </div>

        {/* Mobile Footer Logout */}
        <div className="lg:hidden mt-8 flex justify-center pb-8 border-t border-slate-800 pt-8">
             <Link href="/" className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-red-500/10 text-red-500 text-[11px] font-black uppercase tracking-widest hover:bg-red-500/20 transition-all border border-red-500/20 shadow-xl shadow-red-500/5">
                 <LogOut size={16} /> Secure Sign Out
             </Link>
        </div>
      </main>

      {/* --- MODALS --- */}

      {/* Marksheet Modal */}
      <AnimatePresence>
        {showMarksheet.show && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowMarksheet({ show: false, data: null })} className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl" />
                <motion.div initial={{ opacity: 0, scale: 0.9, y: 100 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 100 }} className="relative bg-slate-900 w-full max-w-4xl rounded-[40px] lg:rounded-[60px] shadow-2xl overflow-y-auto max-h-[90vh]">
                    <div className="p-6 lg:p-20">
                        {/* Marksheet Header */}
                        <div className="flex flex-col items-center text-center mb-8 lg:mb-16">
                            <Image src="/logo.png" alt="SVB Logo" width={60} height={60} className="mb-4 lg:mb-6" />
                            <h2 className="text-2xl lg:text-4xl font-black uppercase tracking-tighter text-slate-100">Sanskar Vidya Bhwan</h2>
                            <p className="text-[8px] lg:text-[11px] font-bold uppercase tracking-[.2em] lg:tracking-[.4em] text-slate-400 mt-2">Bhinmal, Rajasthan (Recognition No. 9821)</p>
                            <div className="mt-8 lg:mt-10 pt-8 lg:pt-10 border-t-2 border-slate-800 w-full flex flex-col sm:flex-row justify-between items-center gap-4">
                                <div className="flex flex-col items-center sm:items-start"><span className="text-[9px] font-bold uppercase text-slate-400 tracking-widest mb-1">Student Name</span><span className="text-sm lg:text-xl font-black text-slate-100">Aryan Paliwal</span></div>
                                <div className="flex flex-col items-center"><span className="text-[9px] font-bold uppercase text-slate-400 tracking-widest mb-1">Examination</span><span className="text-sm lg:text-xl font-black text-accent uppercase">{showMarksheet.data?.title}</span></div>
                                <div className="flex flex-col items-center sm:items-end"><span className="text-[9px] font-bold uppercase text-slate-400 tracking-widest mb-1">Roll No</span><span className="text-sm lg:text-xl font-black text-slate-100">SVB-26-12</span></div>
                            </div>
                        </div>

                        {/* Marks Table */}
                        <div className="bg-slate-800/80 rounded-[24px] lg:rounded-[40px] p-6 lg:p-10 overflow-x-auto shadow-inner">
                             <table className="w-full text-left min-w-[300px]">
                                <thead>
                                    <tr className="border-b border-slate-700"><th className="pb-4 text-[10px] lg:text-[11px] font-bold uppercase tracking-widest text-slate-400">Subject</th><th className="pb-4 text-[10px] lg:text-[11px] font-bold uppercase tracking-widest text-slate-400">Max</th><th className="pb-4 text-[10px] lg:text-[11px] font-bold uppercase tracking-widest text-slate-400">Obtained</th><th className="pb-4 text-[10px] lg:text-[11px] font-bold uppercase tracking-widest text-slate-400 text-right">Grade</th></tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700">
                                    {[
                                        { sub: "Mathematics", max: 100, obt: 92, gr: "A+" },
                                        { sub: "Science", max: 100, obt: 88, gr: "A" },
                                        { sub: "Physics", max: 100, obt: 85, gr: "A" },
                                        { sub: "English", max: 100, obt: 94, gr: "A+" },
                                    ].map((row, i) => (
                                        <tr key={i}><td className="py-4 lg:py-5 font-black text-slate-200 uppercase tracking-tighter text-sm lg:text-base">{row.sub}</td><td className="py-4 lg:py-5 text-sm font-bold text-slate-400">{row.max}</td><td className="py-4 lg:py-5 text-lg font-black text-slate-100">{row.obt}</td><td className="py-4 lg:py-5 text-right font-black text-primary">{row.gr}</td></tr>
                                    ))}
                                </tbody>
                             </table>
                        </div>

                        {/* Final Score */}
                        <div className="mt-8 lg:mt-12 flex flex-col sm:flex-row justify-between items-center gap-6">
                            <div className="flex flex-col items-center sm:items-start"><span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Total Status</span><span className="text-xl lg:text-3xl font-black text-amber-400">Passed (Distinction)</span></div>
                             <div className="flex items-center w-full sm:w-auto gap-4">
                                <button className="flex-shrink-0 bg-slate-800 text-slate-400 p-4 lg:p-5 rounded-2xl hover:bg-slate-700 transition-all border border-slate-700"><Printer size={20} /></button>
                                <button className="flex-1 sm:flex-none bg-primary text-white py-4 px-6 lg:px-10 lg:py-5 rounded-2xl text-[10px] lg:text-[11px] font-black uppercase tracking-[.2em] shadow-2xl hover:bg-accent hover:text-primary transition-all flex items-center justify-center gap-2"><Download size={16} /> Download PDF</button>
                             </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

      {/* QR Payment Modal */}
      <AnimatePresence>
        {showQR && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowQR(false)} className="absolute inset-0 bg-primary/80 backdrop-blur-xl" />
                <motion.div initial={{ opacity: 0, scale: 0.9, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 50 }} className="relative bg-slate-900 w-full max-w-lg rounded-[60px] shadow-2xl overflow-hidden p-14 text-center">
                    <h3 className="text-3xl font-black uppercase tracking-tighter text-white mb-2">School Fee Payment</h3>
                    <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-12">Sanskar Vidya Bhwan Digital Port</p>
                    
                    <div className="bg-slate-800/50 p-10 rounded-[40px] border-2 border-slate-800 flex flex-col items-center mb-10">
                         <div className="w-56 h-56 bg-slate-900 rounded-3xl p-6 shadow-inner border border-slate-800 flex items-center justify-center mb-8">
                             <QrCode size={180} className="text-white" />
                         </div>
                         <div className="flex flex-col"><span className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-1">Total Due</span><span className="text-4xl font-black text-white tracking-tighter">₹12,400</span></div>
                    </div>

                    <div className="flex flex-col gap-4">
                         <button className="w-full py-5 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-xs shadow-xl">Scan & Pay via UPI</button>
                         <button onClick={() => setShowQR(false)} className="w-full py-4 rounded-2xl text-slate-300 text-[10px] font-black uppercase tracking-widest hover:text-red-500 transition-colors">Cancel Procedure</button>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Simple Helper for Circle dashed
function CircleDashed(props: any) {
    return <div {...props} className="w-2 h-2 rounded-full border border-dashed border-slate-300" />
}
