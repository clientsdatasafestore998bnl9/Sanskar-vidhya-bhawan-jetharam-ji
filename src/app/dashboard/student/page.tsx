"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { 
  Home, Search, User, Star, ChevronRight, ChevronLeft, Flame, MoreHorizontal,
  BookHeart, ClipboardCheck, GraduationCap, Clock4, StickyNote, BellRing,
  BadgeCheck, WalletCards, Medal, MessageCircleMore, PartyPopper, UsersRound,
  BusFront, CalendarOff, Contact, Trophy, CalendarDays, BookOpen, Swords, Sparkles, HeartHandshake, Zap, Crown, FileText, Download, PhoneCall, CheckCircle, Calendar, AlertTriangle, Check, Clock, MapPin, Printer, LogOut, ShieldCheck
} from "lucide-react";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showQR, setShowQR] = useState(false);
  const [activeChatTeacher, setActiveChatTeacher] = useState<string | null>(null);
  const [student, setStudent] = useState<any>(null);
  const [fees, setFees] = useState<any[]>([]);
  const [notices, setNotices] = useState<any[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [studentMarks, setStudentMarks] = useState<any[]>([]);
  const [studentExams, setStudentExams] = useState<any[]>([]);
  const [studentNotes, setStudentNotes] = useState<any[]>([]);
  const [studentRoutine, setStudentRoutine] = useState<any[]>([]);

  useEffect(() => {
    const session = typeof window !== 'undefined' ? localStorage.getItem('svb_student_session') : null;
    if (!session) { window.location.href = '/login'; return; }
    const parsed = JSON.parse(session);
    
    const loadData = async () => {
      setLoadingData(true);
      const { data: stData } = await supabase.from('students').select('*').eq('id', parsed.id).single();
      if (stData) {
        setStudent(stData);
        const { data: exm } = await supabase.from('exams').select('*').is('student_id', null).eq('class', stData.class);
        if (exm) setStudentExams(exm);
        const { data: mrk } = await supabase.from('exams').select('*').eq('student_id', parsed.id);
        if (mrk) setStudentMarks(mrk);
        const { data: nts } = await supabase.from('notes').select('*').eq('class', stData.class).order('created_at', { ascending: false });
        if (nts) setStudentNotes(nts);
        const { data: rtn } = await supabase.from('routine').select('*').eq('class', stData.class);
        if (rtn) setStudentRoutine(rtn);
      }
      const { data: feesData } = await supabase.from('fees').select('*').eq('student_id', parsed.id).order('payment_date', { ascending: false });
      if (feesData) setFees(feesData);
      const { data: noticesData } = await supabase.from('notices').select('*').order('created_at', { ascending: false }).limit(5);
      if (noticesData) setNotices(noticesData);
      // Fetch last 30 days attendance
      const thirtyDaysAgo = new Date(); thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const { data: attData } = await supabase.from('attendance').select('*').eq('student_id', parsed.id).gte('date', thirtyDaysAgo.toISOString().split('T')[0]).order('date', { ascending: false });
      if (attData) setAttendanceRecords(attData);
      setLoadingData(false);
    };
    loadData();
  }, []);

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

  const activeCategory = categories.find(c => c.id === activeTab) || null;

  const HomeHeader = () => (
    <div className="bg-amber-100 px-6 pt-4 pb-4 flex justify-between items-center z-50 sticky top-0 rounded-b-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] border-b border-amber-200">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center p-1 border border-slate-100 shadow-[inset_0_2px_5px_rgba(0,0,0,0.02)]">
                <img src="/logo.png" alt="School Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col gap-0.5">
                <span className="text-[15px] font-black text-slate-800 leading-none">Sanskar Vidya Bhawan</span>
                <span className="text-[11px] font-bold text-slate-500">{student ? `Class ${student.class} • ${student.medium} Medium` : 'Loading...'}</span>
            </div>
        </div>
        
        <div className="flex items-center gap-3">
            <button onClick={() => { localStorage.removeItem('svb_student_session'); window.location.href = '/login'; }} className="w-9 h-9 flex items-center justify-center bg-red-50 border border-red-100 rounded-full text-red-400 hover:bg-red-100 hover:text-red-600 transition-colors" title="Logout">
                <LogOut size={16} />
            </button>
            <div className="w-10 h-10 rounded-full border-[3px] border-amber-400 overflow-hidden shadow-sm cursor-pointer transform hover:scale-105 transition-transform bg-white" onClick={() => setActiveTab('idcard')}>
                {student?.photo_url ? (
                    <img src={student.photo_url} alt="Student" className="w-full h-full object-cover" />
                ) : (
                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${student?.full_name || 'Student'}&backgroundColor=fef3c7`} alt="Student" className="w-full h-full object-cover" />
                )}
            </div>
        </div>
    </div>
  );

  const renderContent = () => {
        if (activeTab === "overview") {
             return (
                 <div className="animate-fade-in">
                    {/* School Category Grid */}
                    <div className="flex justify-between items-center mb-5 mt-2">
                        <h3 className="text-base font-black text-slate-800">School Category</h3>
                    </div>
                    <div className="grid grid-cols-5 gap-y-6 gap-x-1 mb-10">
                        {categories.map((cat, i) => (
                            <div key={i} className="flex flex-col items-center gap-1.5 cursor-pointer group" onClick={() => { setActiveTab(cat.id); window.scrollTo({ top: 0, behavior: 'instant' }); }}>
                                <div className={`w-12 h-12 rounded-[16px] flex items-center justify-center border shadow-[0_4px_10px_rgba(0,0,0,0.03)] group-hover:scale-110 transition-all duration-300 ${cat.color}`}>
                                    <cat.icon size={22} strokeWidth={2.5} />
                                </div>
                                <span className="text-[9px] font-black text-slate-600 text-center leading-tight whitespace-nowrap tracking-tight">{cat.name}</span>
                            </div>
                        ))}
                    </div>

                    {/* Student Welcome Card */}
                    {student && (
                        <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 rounded-[24px] p-5 mb-5 shadow-[0_8px_30px_rgba(79,70,229,0.3)] overflow-hidden cursor-pointer" onClick={() => setActiveTab('idcard')}>
                            <div className="absolute -right-6 -top-6 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
                            <div className="absolute -left-4 -bottom-8 w-24 h-24 bg-violet-400/20 rounded-full blur-xl" />
                            <div className="flex items-center gap-4 relative z-10">
                                <div className="w-14 h-14 rounded-full border-[3px] border-white/30 overflow-hidden bg-white/10 shrink-0 shadow-lg">
                                    {student.photo_url ? (
                                        <img src={student.photo_url} alt="Student" className="w-full h-full object-cover" />
                                    ) : (
                                        <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${student.full_name}&backgroundColor=transparent`} alt="Student" className="w-full h-full object-cover scale-110" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span className="text-white/70 text-[10px] font-black uppercase tracking-widest">Welcome back</span>
                                    <h2 className="text-white font-black text-lg leading-tight truncate">{student.full_name}</h2>
                                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                                        <span className="text-[10px] font-black bg-white/20 text-white px-2 py-0.5 rounded-full">Class {student.class} • {student.medium}</span>
                                        <span className="text-[10px] font-black bg-white/20 text-white px-2 py-0.5 rounded-full">Roll: {student.roll_number || '—'}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-1 shrink-0">
                                    <span className="text-[9px] font-black text-white/60 uppercase tracking-wider">SR No.</span>
                                    <span className="text-base font-black text-white">{student.sr_number}</span>
                                </div>
                            </div>
                        </div>
                    )}


                    <div className="flex flex-col gap-4 border-t border-slate-100 pt-6">
                        
                        <div className="flex justify-between items-center mb-1">
                            <h3 className="text-base font-black text-slate-800">Leaderboard</h3>
                        </div>

                        {/* Sanskar Coins & Level (Side by Side) */}
                        <div className="flex gap-3 mb-2">
                            <div className="flex-1 bg-gradient-to-br from-amber-400 to-orange-500 rounded-[20px] p-3 text-white shadow-[0_4px_15px_rgba(245,158,11,0.2)] relative overflow-hidden flex items-center justify-between cursor-pointer" onClick={() => setActiveTab('leaderboard')}>
                                <div className="absolute right-0 top-0 w-16 h-16 bg-white/20 rounded-full blur-xl -mr-5 -mt-5" />
                                <div className="flex flex-col relative z-10">
                                    <span className="text-white/80 text-[9px] font-black uppercase tracking-wider flex items-center gap-1">
                                        <Sparkles size={10} className="fill-white/80" /> Sanskar Coins
                                    </span>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                        <span className="text-xl font-black">450</span>
                                    </div>
                                </div>
                                <Star size={24} className="text-yellow-200 fill-yellow-200 opacity-80 relative z-10" />
                            </div>
                            
                            <div className="flex-1 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[20px] p-3 text-white shadow-[0_4px_15px_rgba(59,130,246,0.2)] relative overflow-hidden flex items-center justify-between cursor-pointer" onClick={() => setActiveTab('leaderboard')}>
                                <div className="absolute left-0 bottom-0 w-16 h-16 bg-white/20 rounded-full blur-xl -ml-5 -mb-5" />
                                <div className="flex flex-col relative z-10">
                                    <span className="text-white/80 text-[9px] font-black uppercase tracking-wider flex items-center gap-1">
                                        <Trophy size={10} className="text-white/80" /> Level 3
                                    </span>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                        <span className="text-lg font-black tracking-wide">Scholar</span>
                                    </div>
                                </div>
                                <Medal size={24} className="text-blue-200 opacity-80 relative z-10" />
                            </div>
                        </div>
                        
                        {/* Filters */}
                        <div className="flex bg-slate-100 p-1 rounded-full w-full max-w-[200px] mx-auto mb-1 mt-2">
                            <button className="flex-1 bg-white text-slate-800 text-[11px] font-black py-1.5 rounded-full shadow-sm">Class</button>
                            <button className="flex-1 text-slate-500 text-[11px] font-bold py-1.5 rounded-full">School</button>
                        </div>

                        <div className="flex flex-col gap-0 mb-4 mt-2 bg-slate-50 p-1 rounded-[16px] border border-slate-100">
                            <div className="flex flex-wrap justify-center w-full">
                                <button className="flex-1 px-1 py-1.5 text-[9px] font-black bg-amber-400 text-white shadow-sm rounded-[10px]">Today</button>
                                <button className="flex-1 px-1 py-1.5 text-[9px] font-black text-slate-500 hover:bg-slate-200 rounded-[10px]">Last 7 Days</button>
                                <button className="flex-1 px-1 py-1.5 text-[9px] font-black text-slate-500 hover:bg-slate-200 rounded-[10px]">Last Month</button>
                                <button className="flex-1 px-1 py-1.5 text-[9px] font-black text-slate-500 hover:bg-slate-200 rounded-[10px]">All Time</button>
                            </div>

                            <div className="flex flex-wrap justify-center w-full mt-1 border-t border-slate-200 pt-1">
                                <button className="flex-1 px-1 py-1.5 text-[8px] font-black bg-slate-800 text-white shadow-sm rounded-[8px]">Overall</button>
                                <button className="flex-1 px-1 py-1.5 text-[8px] font-black text-blue-600 hover:bg-blue-100 rounded-[8px]">Academic</button>
                                <button className="flex-1 px-1 py-1.5 text-[8px] font-black text-emerald-600 hover:bg-emerald-100 rounded-[8px]">Karma</button>
                                <button className="flex-1 px-1 py-1.5 text-[8px] font-black text-amber-600 hover:bg-amber-100 rounded-[8px]">Attendance</button>
                                <button className="flex-1 px-1 py-1.5 text-[8px] font-black text-purple-600 hover:bg-purple-100 rounded-[8px]">Talent</button>
                            </div>
                        </div>

                        {/* Top Students / Leaderboard Mini View */}
                        <div className="bg-white rounded-[24px] p-4 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                            {/* Podium Top 3 */}
                            <div className="flex justify-center items-end px-2 pt-2 gap-1 relative mb-6 cursor-pointer" onClick={() => setActiveTab('leaderboard')}>
                                {/* 2nd Place */}
                                <div className="flex flex-col items-center flex-1">
                                    <div className="relative z-20">
                                        <div className="w-12 h-12 rounded-full border-[3px] border-[#A2D2FF] overflow-hidden bg-slate-50 shadow-lg"><img src="https://api.dicebear.com/7.x/notionists/svg?seed=Rahul&backgroundColor=transparent" alt="2nd" className="w-full h-full object-cover" /></div>
                                    </div>
                                    <span className="text-[10px] font-black mt-2 text-slate-700 truncate w-full text-center relative z-20">Rahul</span>
                                    <span className="text-[8px] text-[#5A9BD5] font-black relative z-20">450 pts</span>
                                    <div className="w-full h-16 bg-[#A2D2FF] rounded-t-[14px] mt-1.5 border-t-4 border-[#CBE4FF] flex flex-col items-center pt-1 shadow-[0_-5px_15px_rgba(162,210,255,0.3)] relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
                                        <span className="text-base font-black text-blue-800/40 relative z-10">2</span>
                                    </div>
                                </div>
                                
                                {/* 1st Place */}
                                <div className="flex flex-col items-center flex-[1.2] relative z-10">
                                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -top-7 drop-shadow-[0_4px_10px_rgba(245,158,11,0.6)] z-30">
                                        <Crown size={32} className="text-amber-500 fill-amber-400 stroke-[1.5]" />
                                    </motion.div>
                                    <div className="relative z-20">
                                        <div className="w-16 h-16 rounded-full border-[4px] border-[#FFD166] overflow-hidden bg-amber-50 shadow-xl"><img src="https://api.dicebear.com/7.x/notionists/svg?seed=Aryan&backgroundColor=transparent" alt="1st" className="w-full h-full object-cover" /></div>
                                    </div>
                                    <span className="text-xs font-black mt-2 text-amber-600 truncate w-full text-center relative z-20">Aryan</span>
                                    <span className="text-[9px] text-amber-500 font-black relative z-20">520 pts</span>
                                    <div className="w-full h-24 bg-[#FFD166] rounded-t-[18px] mt-1.5 border-t-[5px] border-[#FFE6A6] flex flex-col items-center pt-2 shadow-[0_-5px_20px_rgba(255,209,102,0.4)] relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent" />
                                        <span className="text-xl font-black text-amber-800/40 relative z-10">1</span>
                                    </div>
                                </div>
                                
                                {/* 3rd Place */}
                                <div className="flex flex-col items-center flex-1">
                                    <div className="relative z-20">
                                        <div className="w-12 h-12 rounded-full border-[3px] border-[#FFA69E] overflow-hidden bg-red-50 shadow-lg"><img src="https://api.dicebear.com/7.x/notionists/svg?seed=Neha&backgroundColor=transparent" alt="3rd" className="w-full h-full object-cover" /></div>
                                    </div>
                                    <span className="text-[10px] font-black mt-2 text-slate-700 truncate w-full text-center relative z-20">Neha</span>
                                    <span className="text-[8px] text-[#E07A71] font-black relative z-20">390 pts</span>
                                    <div className="w-full h-12 bg-[#FFA69E] rounded-t-[14px] mt-1.5 border-t-4 border-[#FFD0CC] flex flex-col items-center pt-1 shadow-[0_-5px_15px_rgba(255,166,158,0.3)] relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
                                        <span className="text-sm font-black text-red-900/40 relative z-10">3</span>
                                    </div>
                                </div>
                            </div>

                            {/* List 4 to 10 */}
                            <div className="flex flex-col gap-1.5">
                                {[
                                    { rank: 4, name: "Sneha", pts: 350 },
                                    { rank: 5, name: "Vikram", pts: 320 },
                                    { rank: 6, name: "Pooja", pts: 300 },
                                    { rank: 7, name: "Rohan", pts: 280 },
                                    { rank: 8, name: "Aman", pts: 250 },
                                    { rank: 9, name: "Kavya", pts: 230 },
                                    { rank: 10, name: "Ishaan", pts: 210 },
                                ].map(student => (
                                     <div key={student.rank} className="flex items-center gap-3 bg-white py-1.5 px-2.5 rounded-[12px] border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] cursor-pointer hover:bg-amber-50/50 transition-colors">
                                          <span className="text-xs font-black text-slate-300 w-5 text-center">{student.rank}</span>
                                          <div className="w-8 h-8 rounded-full bg-slate-50 overflow-hidden border border-slate-100 shadow-[inset_0_2px_5px_rgba(0,0,0,0.02)]">
                                              <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${student.name}&backgroundColor=transparent`} alt={student.name} className="w-full h-full object-cover" />
                                          </div>
                                          <span className="text-xs font-bold text-slate-700 flex-1">{student.name}</span>
                                          <div className="flex items-center gap-1 bg-[#FFF9E6] px-2.5 py-1 rounded-full border border-[#FFD166]/30">
                                               <Star size={10} className="text-[#FFD166] fill-[#FFD166]" />
                                               <span className="text-[10px] font-black text-amber-600">{student.pts}</span>
                                          </div>
                                     </div>
                                ))}
                            </div>
                            
                            <button onClick={() => setActiveTab('leaderboard')} className="w-full mt-4 bg-slate-50 text-slate-600 py-3 rounded-[16px] text-[11px] font-black hover:bg-slate-100 transition-colors">View All Ranking</button>
                        </div>

                        {/* My Badges */}
                        <div className="bg-white rounded-[24px] p-4 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] mb-4">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-sm font-black text-slate-800">My Badges</h3>
                                <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md font-black">Unlocked 4/12</span>
                            </div>
                            <div className="grid grid-cols-4 gap-y-4 gap-x-2">
                                {[
                                    { name: "Academic", icon: "🏆", active: true, color: "bg-blue-100 text-blue-500 border-blue-200" },
                                    { name: "Karma", icon: "🤝", active: true, color: "bg-emerald-100 text-emerald-500 border-emerald-200" },
                                    { name: "Attendance", icon: "⏰", active: true, color: "bg-amber-100 text-amber-500 border-amber-200" },
                                    { name: "Talent", icon: "🎨", active: true, color: "bg-purple-100 text-purple-500 border-purple-200" },
                                    { name: "Sports", icon: "⚽", active: false, color: "" },
                                    { name: "Speaker", icon: "🎤", active: false, color: "" },
                                    { name: "Leader", icon: "⭐", active: false, color: "" },
                                    { name: "Helper", icon: "🙌", active: false, color: "" },
                                    { name: "Creative", icon: "💡", active: false, color: "" },
                                    { name: "Techie", icon: "💻", active: false, color: "" },
                                    { name: "Reader", icon: "📚", active: false, color: "" },
                                    { name: "Eco", icon: "🌱", active: false, color: "" },
                                ].map((badge, i) => (
                                    <div key={i} className="flex flex-col items-center gap-1.5 cursor-pointer group">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-sm border ${badge.active ? badge.color : 'bg-slate-50 text-slate-300 border-slate-100 grayscale opacity-50'}`}>
                                            {badge.icon}
                                        </div>
                                        <span className={`text-[8px] font-black text-center leading-tight ${badge.active ? 'text-slate-700' : 'text-slate-400'}`}>{badge.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                 </div>
             );
        }

        if (activeTab === "diary") {
            // Generate 28 days
            const daysList = [];
            const daysName = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
            for(let i=0; i<28; i++) {
                daysList.push({ dayNum: ((12+i)%30)+1, dayName: daysName[i%7] });
            }

            return (
                <div className="flex flex-col animate-fade-in pb-8">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-sm font-black text-slate-800">Diary of November 2026</h3>
                        <button className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1.5 rounded-md font-bold hover:bg-slate-200 flex items-center gap-1 border border-slate-200">
                            <Calendar size={12} /> Custom Date
                        </button>
                    </div>

                    {/* Calendar Dates Strip (4 weeks) */}
                    <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-3 mb-4 -mx-5 px-5">
                        {daysList.map((day, i) => (
                            <div key={i} className={`flex flex-col items-center justify-center min-w-[50px] h-[60px] rounded-[16px] cursor-pointer transition-all ${i === 3 ? 'bg-blue-500 text-white shadow-[0_4px_12px_rgba(59,130,246,0.4)]' : 'bg-slate-50 text-slate-500 border border-slate-100 hover:bg-slate-100'}`}>
                                <span className="text-[10px] font-bold uppercase mb-0.5">{day.dayName}</span>
                                <span className="text-sm font-black">{day.dayNum}</span>
                            </div>
                        ))}
                    </div>
                    
                    {/* Today's Homework */}
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-sm font-black text-slate-800">Today's Homework</h3>
                    </div>

                    <div className="flex flex-col gap-3 mb-6">
                        {/* Math */}
                        <div className="bg-white rounded-[20px] p-4 flex flex-col border border-slate-100 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500 rounded-l-[20px]"></div>
                            <div className="flex justify-between items-start mb-2 pl-2">
                                <div>
                                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-wider">Mathematics</span>
                                    <h4 className="text-sm font-black text-slate-800 leading-tight mt-0.5">Chapter 5: Trigonometry</h4>
                                    <p className="text-[11px] font-bold text-slate-500 mt-1">Topic: Exercise 5.2 - Complete all questions</p>
                                </div>
                                <span className="text-[9px] font-bold bg-slate-50 text-slate-500 px-2 py-1 rounded-full border border-slate-100">Teacher: R.K Singh</span>
                            </div>
                            <button className="mt-2 w-full py-2.5 bg-slate-50 rounded-xl text-slate-600 text-[11px] font-black border border-slate-200 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-colors flex items-center justify-center gap-1">
                                <CheckCircle size={14} /> Mark as Done
                            </button>
                        </div>

                        {/* Science */}
                        <div className="bg-white rounded-[20px] p-4 flex flex-col border border-slate-100 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-purple-500 rounded-l-[20px]"></div>
                            <div className="flex justify-between items-start mb-2 pl-2">
                                <div>
                                    <span className="text-[10px] font-black text-purple-500 uppercase tracking-wider">Science</span>
                                    <h4 className="text-sm font-black text-slate-800 leading-tight mt-0.5">Chapter 12: Electricity</h4>
                                    <p className="text-[11px] font-bold text-slate-500 mt-1">Topic: Circuit Diagrams & Ohm's Law Notes</p>
                                </div>
                                <span className="text-[9px] font-bold bg-slate-50 text-slate-500 px-2 py-1 rounded-full border border-slate-100">Teacher: Neha Sharma</span>
                            </div>
                            <button className="mt-2 w-full py-2.5 bg-slate-50 rounded-xl text-slate-600 text-[11px] font-black border border-slate-200 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-colors flex items-center justify-center gap-1">
                                <CheckCircle size={14} /> Mark as Done
                            </button>
                        </div>

                        {/* Hindi */}
                        <div className="bg-white rounded-[20px] p-4 flex flex-col border border-slate-100 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-orange-500 rounded-l-[20px]"></div>
                            <div className="flex justify-between items-start mb-2 pl-2">
                                <div>
                                    <span className="text-[10px] font-black text-orange-500 uppercase tracking-wider">Hindi</span>
                                    <h4 className="text-sm font-black text-slate-800 leading-tight mt-0.5">पाठ 4: सांवले सपनों की याद</h4>
                                    <p className="text-[11px] font-bold text-slate-500 mt-1">Topic: प्रश्न उत्तर याद करें</p>
                                </div>
                                <span className="text-[9px] font-bold bg-slate-50 text-slate-500 px-2 py-1 rounded-full border border-slate-100">Teacher: V. Kumar</span>
                            </div>
                            <button className="mt-2 w-full py-2.5 bg-slate-50 rounded-xl text-slate-600 text-[11px] font-black border border-slate-200 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-colors flex items-center justify-center gap-1">
                                <CheckCircle size={14} /> Mark as Done
                            </button>
                        </div>

                        {/* English */}
                        <div className="bg-white rounded-[20px] p-4 flex flex-col border border-slate-100 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-pink-500 rounded-l-[20px]"></div>
                            <div className="flex justify-between items-start mb-2 pl-2">
                                <div>
                                    <span className="text-[10px] font-black text-pink-500 uppercase tracking-wider">English</span>
                                    <h4 className="text-sm font-black text-slate-800 leading-tight mt-0.5">Chapter 3: The Little Girl</h4>
                                    <p className="text-[11px] font-bold text-slate-500 mt-1">Topic: Write summary in 100 words</p>
                                </div>
                                <span className="text-[9px] font-bold bg-slate-50 text-slate-500 px-2 py-1 rounded-full border border-slate-100">Teacher: S. Patel</span>
                            </div>
                            <button className="mt-2 w-full py-2.5 bg-slate-50 rounded-xl text-slate-600 text-[11px] font-black border border-slate-200 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-colors flex items-center justify-center gap-1">
                                <CheckCircle size={14} /> Mark as Done
                            </button>
                        </div>

                        {/* Sanskrit */}
                        <div className="bg-white rounded-[20px] p-4 flex flex-col border border-slate-100 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500 rounded-l-[20px]"></div>
                            <div className="flex justify-between items-start mb-2 pl-2">
                                <div>
                                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-wider">Sanskrit</span>
                                    <h4 className="text-sm font-black text-slate-800 leading-tight mt-0.5">तृतीयः पाठः: गोदोहनम्</h4>
                                    <p className="text-[11px] font-bold text-slate-500 mt-1">Topic: शब्दार्थ और अनुवाद</p>
                                </div>
                                <span className="text-[9px] font-bold bg-slate-50 text-slate-500 px-2 py-1 rounded-full border border-slate-100">Teacher: M. Vyas</span>
                            </div>
                            <button className="mt-2 w-full py-2.5 bg-slate-50 rounded-xl text-slate-600 text-[11px] font-black border border-slate-200 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-colors flex items-center justify-center gap-1">
                                <CheckCircle size={14} /> Mark as Done
                            </button>
                        </div>
                    </div>

                    {/* Parents Section - Incomplete Homework */}
                    <div className="bg-red-50 rounded-[24px] p-5 border border-red-100 mt-2">
                        <div className="flex items-center gap-2 mb-3">
                            <AlertTriangle size={18} className="text-red-500" />
                            <h3 className="text-sm font-black text-red-700">Parents Alert: Pending</h3>
                        </div>
                        <p className="text-[10px] font-bold text-red-500/80 mb-4 leading-relaxed">The following homework tasks were not marked as done by the student. Please review them.</p>
                        
                        <div className="flex flex-col gap-2">
                            {/* Past Incomplete 1 */}
                            <div className="bg-white p-3 rounded-[12px] border border-red-100 flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-black text-slate-800">12 Nov, Tue</span>
                                    <span className="text-[10px] font-bold text-slate-500">Mathematics - Chapter 4 (Quadratic Equations)</span>
                                </div>
                                <span className="text-[9px] font-black text-red-500 bg-red-100 px-2 py-1 rounded-md">Pending</span>
                            </div>
                            {/* Past Incomplete 2 */}
                            <div className="bg-white p-3 rounded-[12px] border border-red-100 flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-black text-slate-800">10 Nov, Sun</span>
                                    <span className="text-[10px] font-bold text-slate-500">Science - Biology Diagrams</span>
                                </div>
                                <span className="text-[9px] font-black text-red-500 bg-red-100 px-2 py-1 rounded-md">Pending</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (activeTab === "attendance") {
            // Compute real stats
            const totalDays = attendanceRecords.length;
            const presentDays = attendanceRecords.filter(r => r.status === 'P').length;
            const absentDays = attendanceRecords.filter(r => r.status === 'A').length;
            const attendancePct = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : null;
            const pctColor = attendancePct === null ? 'text-slate-400' : attendancePct >= 75 ? 'text-emerald-500' : attendancePct >= 60 ? 'text-amber-500' : 'text-red-500';

            return (
                <div className="flex flex-col animate-fade-in pb-8">
                    <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col mb-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-black text-slate-800">Monthly Attendance</h3>
                            <span className={`text-xl font-black ${pctColor}`}>{attendancePct !== null ? `${attendancePct}%` : 'No Data'}</span>
                        </div>
                        {totalDays > 0 ? (
                            <>
                                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
                                    <div className="h-full bg-emerald-400 transition-all" style={{ width: `${(presentDays/totalDays)*100}%` }}></div>
                                    <div className="h-full bg-red-400 transition-all" style={{ width: `${(absentDays/totalDays)*100}%` }}></div>
                                </div>
                                <div className="flex justify-between items-center mt-3">
                                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-400"></div><span className="text-[10px] font-bold text-slate-500">Present ({presentDays})</span></div>
                                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-400"></div><span className="text-[10px] font-bold text-slate-500">Absent ({absentDays})</span></div>
                                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-300"></div><span className="text-[10px] font-bold text-slate-500">Total ({totalDays})</span></div>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-4 text-slate-400 text-xs font-bold">No attendance records found yet.<br/>Teacher ne abhi mark nahi kiya.</div>
                        )}
                    </div>

                    {attendanceRecords.length > 0 && (
                        <>
                            <div className="flex justify-between items-center mb-3 mt-2">
                                <h3 className="text-sm font-black text-slate-800">Last 30 Days</h3>
                                <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-md font-bold border border-slate-200">{attendancePct}% Attendance</span>
                            </div>
                            <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-3 mb-4 -mx-5 px-5">
                                {attendanceRecords.slice(0, 14).map((rec, i) => {
                                    const d = new Date(rec.date);
                                    const dayName = d.toLocaleDateString('en-IN', { weekday: 'short' });
                                    const dayNum = d.getDate();
                                    const isAbsent = rec.status === 'A';
                                    return (
                                        <div key={i} className={`flex flex-col items-center justify-center min-w-[50px] h-[60px] rounded-[16px] cursor-pointer transition-all ${
                                            isAbsent ? 'bg-red-50 text-red-500 border border-red-200 shadow-sm' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                                        }`}>
                                            <span className="text-[10px] font-bold uppercase mb-0.5">{dayName}</span>
                                            <span className="text-sm font-black">{dayNum}</span>
                                            <span className={`text-[8px] font-black uppercase mt-0.5 tracking-tighter ${isAbsent ? 'text-red-500' : 'text-emerald-500'}`}>{isAbsent ? 'Absent' : 'Present'}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}

                    <h3 className="text-sm font-black text-slate-800 mb-3 mt-2">Leave Application</h3>
                    <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col gap-3">
                        <input type="text" value={student ? `${student.full_name} (Class ${student.class})` : 'Loading...'} disabled className="w-full bg-slate-50 text-slate-500 text-xs font-bold p-3 rounded-[12px] border border-slate-100" />
                        <div className="flex gap-2 items-center">
                            <div className="flex-1 flex flex-col">
                                <span className="text-[9px] font-bold text-slate-400 mb-1 ml-1">From</span>
                                <input type="date" className="w-full bg-slate-50 text-slate-600 text-xs font-bold p-2.5 rounded-[12px] border border-slate-200 outline-none" />
                            </div>
                            <div className="flex-1 flex flex-col">
                                <span className="text-[9px] font-bold text-slate-400 mb-1 ml-1">To</span>
                                <input type="date" className="w-full bg-slate-50 text-slate-600 text-xs font-bold p-2.5 rounded-[12px] border border-slate-200 outline-none" />
                            </div>
                        </div>
                        <textarea placeholder="Reason for leave..." rows={3} className="w-full bg-slate-50 text-slate-600 text-xs font-bold p-3 rounded-[12px] border border-slate-200 outline-none"></textarea>
                        <button className="w-full py-3.5 mt-2 bg-blue-600 text-white rounded-[12px] font-black text-sm shadow-[0_4px_10px_rgba(37,99,235,0.3)] hover:bg-blue-700 transition-colors">
                            Submit Application
                        </button>
                    </div>
                </div>
            );
        }

        if (activeTab === "performance") {
            const upcoming = studentExams.filter(e => e.status === 'Scheduled');
            const past = studentExams.filter(e => e.status === 'Published');
            
            return (
                <div className="flex flex-col animate-fade-in pb-8">
                    <h3 className="text-sm font-black text-slate-800 mb-3">Upcoming Exams</h3>
                    {upcoming.length > 0 ? upcoming.map((e, i) => {
                        const daysLeft = Math.max(0, Math.ceil((new Date(e.exam_date || e.date).getTime() - Date.now()) / (1000 * 3600 * 24)));
                        return (
                        <div key={i} className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-[20px] p-5 text-white shadow-lg mb-5 relative overflow-hidden">
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                            <div className="flex justify-between items-start relative z-10 mb-2">
                                <div>
                                    <h4 className="text-base font-black">{e.exam_name || e.subject}</h4>
                                    <span className="text-[11px] font-bold text-purple-100 mt-1 block">Date: {new Date(e.exam_date || e.date).toLocaleDateString()}</span>
                                </div>
                                <div className="bg-white/20 px-3 py-1.5 rounded-xl backdrop-blur-sm flex flex-col items-center">
                                    <span className="text-xl font-black leading-none text-white">{daysLeft}</span>
                                    <span className="text-[8px] font-bold uppercase tracking-wider text-purple-100 mt-1">Days Left</span>
                                </div>
                            </div>
                            <p className="text-[11px] font-bold text-purple-100 mb-4 relative z-10 leading-relaxed pr-6">{e.description || 'All main subjects including practicals. Ensure you bring your hall ticket.'}</p>
                            <button className="w-full py-3 bg-white text-purple-600 rounded-xl text-xs font-black shadow-sm flex justify-center items-center gap-2 hover:bg-purple-50 transition-colors">
                                View Details
                            </button>
                        </div>
                    )}) : <p className="text-xs text-slate-400 mb-5">No upcoming exams.</p>}

                    <h3 className="text-sm font-black text-slate-800 mb-3 mt-2">Past Exams</h3>
                    <div className="flex flex-col gap-2">
                        {past.length > 0 ? past.map((e, i) => (
                            <div key={i} className="bg-white rounded-[16px] p-3.5 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center justify-between">
                                <span className="text-sm font-black text-slate-800">{e.exam_name || e.subject}</span>
                                <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">{new Date(e.exam_date || e.date).toLocaleDateString()}</span>
                            </div>
                        )) : <p className="text-xs text-slate-400">No past exams found.</p>}
                    </div>
                </div>
            );
        }

        if (activeTab === "timetable") {
            return (
                <div className="flex flex-col animate-fade-in pb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-black text-slate-800">Show Time Table</h3>
                    </div>
                    {studentRoutine.length > 0 ? studentRoutine.map((r, i) => (
                    <div key={i} className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[24px] p-8 flex flex-col items-center justify-center text-center mt-2 mb-4">
                        <div className="w-16 h-16 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mb-4">
                            <FileText size={32} />
                        </div>
                        <h4 className="text-base font-black text-slate-800 mb-1">Class {r.class} Time Table</h4>
                        <p className="text-[11px] font-bold text-slate-500 mb-8">PDF Document • Updated {new Date(r.created_at).toLocaleDateString()}</p>
                        <a href={r.pdf_url || r.file_url || '#'} target="_blank" className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-black text-sm shadow-[0_4px_15px_rgba(37,99,235,0.3)] hover:bg-blue-700 transition-colors flex items-center gap-2">
                            <Download size={18} /> Download PDF
                        </a>
                    </div>
                    )) : (
                    <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[24px] p-8 flex flex-col items-center justify-center text-center mt-2">
                        <p className="text-xs font-black text-slate-400">Time table not uploaded yet</p>
                    </div>
                    )}
                </div>
            );
        }

        if (activeTab === "notes") {
            const colors = ['bg-blue-500', 'bg-emerald-500', 'bg-purple-500', 'bg-orange-500', 'bg-rose-500'];
            return (
                <div className="flex flex-col animate-fade-in pb-8">
                    <h3 className="text-sm font-black text-slate-800 mb-3">Study Notes & Materials</h3>
                    {studentNotes.length === 0 ? (
                        <p className="text-xs text-slate-400">No notes uploaded yet.</p>
                    ) : (
                        <div className="flex flex-col gap-3 mb-6">
                            {studentNotes.map((note, i) => (
                            <div key={i} className="bg-white rounded-[20px] p-4 border border-slate-100 shadow-sm flex flex-col relative overflow-hidden">
                                <div className={`absolute top-0 left-0 w-1.5 h-full ${colors[i % colors.length]}`}></div>
                                <div className="flex justify-between items-start mb-2 pl-2">
                                    <div>
                                        <h4 className="text-sm font-black text-slate-800 leading-tight">{note.title || note.subject}</h4>
                                        <p className="text-[11px] font-bold text-slate-500 mt-1 line-clamp-2 pr-2">{note.description || note.topic}</p>
                                    </div>
                                    <span className="text-[9px] font-bold text-slate-400 shrink-0">{new Date(note.created_at).toLocaleDateString()}</span>
                                </div>
                                <div className="pl-2 mt-2 flex justify-between items-center">
                                    <span className="text-[9px] font-bold bg-slate-50 text-slate-500 px-2 py-1 rounded-full border border-slate-100">By {note.teacher_name || 'Teacher'}</span>
                                    <a href={note.pdf_url || note.file_url || '#'} target="_blank" className="text-[10px] bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg font-black hover:bg-blue-100 transition-colors flex items-center gap-1 border border-blue-100">
                                        <Download size={12} /> Download
                                    </a>
                                </div>
                            </div>
                            ))}
                        </div>
                    )}
                </div>
            );
        }

        if (activeTab === "update") {
            const newNotices = notices.filter((n: any) => {
                const age = (Date.now() - new Date(n.created_at).getTime()) / 3600000;
                return age < 48;
            });
            return (
                <div className="flex flex-col animate-fade-in pb-8">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-sm font-black text-slate-800">School Notices</h3>
                        {newNotices.length > 0 && (
                            <div className="bg-orange-100 text-orange-600 px-2 py-1 rounded-md text-[10px] font-bold">{newNotices.length} New</div>
                        )}
                    </div>

                    {notices.length === 0 ? (
                        <div className="bg-slate-50 border border-dashed border-slate-200 rounded-[20px] p-8 flex flex-col items-center justify-center text-center">
                            <BellRing size={32} className="text-slate-300 mb-3" />
                            <p className="text-sm font-black text-slate-400">Abhi koi notice nahi hai</p>
                            <p className="text-[10px] font-bold text-slate-400 mt-1">Admin se notices add karwao</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {notices.map((notice: any, i: number) => {
                                const isUrgent = notice.priority === 'urgent' || notice.is_urgent;
                                const date = new Date(notice.created_at);
                                const timeAgo = (() => {
                                    const diff = (Date.now() - date.getTime()) / 1000;
                                    if (diff < 3600) return `${Math.round(diff/60)} min ago`;
                                    if (diff < 86400) return `${Math.round(diff/3600)} hrs ago`;
                                    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
                                })();
                                return isUrgent ? (
                                    <div key={i} className="bg-orange-50 border border-orange-100 rounded-[20px] p-4 flex flex-col gap-2 relative overflow-hidden shadow-sm">
                                        <span className="absolute top-0 right-0 bg-orange-500 text-white text-[9px] font-black px-3 py-1 rounded-bl-[16px]">Urgent</span>
                                        <h4 className="text-sm font-black text-orange-800 mt-2">{notice.title}</h4>
                                        <p className="text-[11px] font-bold text-orange-600/80 leading-snug">{notice.content || notice.message}</p>
                                        <span className="text-[9px] font-black text-orange-400 mt-1">{timeAgo} • {notice.department || "Principal's Desk"}</span>
                                    </div>
                                ) : (
                                    <div key={i} className="bg-white rounded-[16px] p-4 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                                            <BellRing size={18} />
                                        </div>
                                        <div className="flex flex-col">
                                            <h4 className="text-sm font-black text-slate-800">{notice.title}</h4>
                                            <p className="text-[10px] font-bold text-slate-500 mt-1 leading-snug">{notice.content || notice.message}</p>
                                            <span className="text-[9px] font-black text-slate-400 mt-2">{timeAgo} • {notice.department || 'School'}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            );
        }

        if (activeTab === "reportcard") {
            const totalMarksObtained = studentMarks.reduce((acc, m) => acc + (m.marks_obtained || 0), 0);
            const totalMaxMarks = studentMarks.reduce((acc, m) => acc + (m.max_marks || 100), 0);
            const percentageNum = totalMaxMarks > 0 ? (totalMarksObtained / totalMaxMarks) * 100 : 0;
            const percentage = percentageNum.toFixed(1);
            const grade = percentageNum >= 90 ? 'A+' : percentageNum >= 80 ? 'A' : percentageNum >= 70 ? 'B' : percentageNum >= 60 ? 'C' : 'D';

            const colors = [
                { color: "text-blue-500", bg: "bg-blue-50" },
                { color: "text-emerald-500", bg: "bg-emerald-50" },
                { color: "text-amber-500", bg: "bg-amber-50" },
                { color: "text-purple-500", bg: "bg-purple-50" },
                { color: "text-rose-500", bg: "bg-rose-50" }
            ];

             return (
                <div className="flex flex-col animate-fade-in pb-8">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-sm font-black text-slate-800">Overall Result</h3>
                    </div>
                    {studentMarks.length === 0 ? (
                        <p className="text-xs text-slate-400 mb-5">No marks published yet.</p>
                    ) : (
                    <>
                    <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-[20px] p-5 text-white shadow-[0_8px_20px_rgba(79,70,229,0.3)] relative overflow-hidden flex flex-col gap-4 mb-5">
                         <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                         <div className="flex justify-between items-center relative z-10">
                             <div className="flex flex-col">
                                 <span className="text-3xl font-black">{percentage}%</span>
                                 <span className="text-[10px] font-bold text-indigo-200">Total: {totalMarksObtained}/{totalMaxMarks}</span>
                             </div>
                             <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/30 shadow-inner">
                                 <span className="font-black text-2xl text-white">{grade}</span>
                             </div>
                         </div>
                         <button className="w-full bg-white text-indigo-600 py-2.5 rounded-xl font-black text-xs shadow-sm flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors relative z-10">
                             Download Full Report <Download size={14} />
                         </button>
                    </div>

                    <h3 className="text-sm font-black text-slate-800 mb-3">Subject Wise Marks</h3>
                    <div className="flex flex-col gap-2">
                         {studentMarks.map((item, i) => {
                             const c = colors[i % colors.length];
                             return (
                             <div key={i} className="bg-white rounded-[16px] p-3 border border-slate-100 flex items-center justify-between shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                                 <div className="flex items-center gap-3">
                                     <div className={`w-8 h-8 rounded-full flex items-center justify-center ${c.bg} ${c.color} font-black text-[10px]`}>{(item.subject || '?')[0]}</div>
                                     <div className="flex flex-col">
                                         <span className="text-xs font-black text-slate-700">{item.subject}</span>
                                         <span className="text-[9px] font-bold text-slate-400">{item.exam_name}</span>
                                     </div>
                                 </div>
                                 <span className="text-sm font-black text-slate-800">{item.marks_obtained || 0}<span className="text-[10px] text-slate-400 font-bold">/{item.max_marks || 100}</span></span>
                             </div>
                         )})}
                    </div>
                    </>
                    )}
                </div>
             );
        }

        if (activeTab === "fees") {
            const totalPaid = fees.reduce((sum: number, f: any) => sum + (f.amount_paid || f.amount || 0), 0);
            const totalFee = student?.total_fee || student?.fee || 0;
            const pending = Math.max(0, totalFee - totalPaid);
            return (
                <div className="flex flex-col animate-fade-in pb-8">
                    <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col gap-1 mb-5 relative overflow-hidden mt-2">
                        <div className="absolute right-0 top-0 w-24 h-24 bg-red-50 rounded-full blur-2xl -mr-10 -mt-10"></div>
                        <span className="text-[11px] font-bold text-slate-400 relative z-10">Total Pending Dues</span>
                        <h2 className="text-4xl font-black text-slate-800 relative z-10">₹ {pending > 0 ? pending.toLocaleString('en-IN') : '0'}</h2>
                        {pending > 0 ? (
                            <span className="text-[10px] font-black text-red-500 mt-1 bg-red-50 w-max px-2 py-0.5 rounded-full relative z-10 border border-red-100">Balance Pending</span>
                        ) : (
                            <span className="text-[10px] font-black text-emerald-500 mt-1 bg-emerald-50 w-max px-2 py-0.5 rounded-full relative z-10 border border-emerald-100">✓ All Fees Cleared</span>
                        )}
                        <div className="border-t border-slate-100 mt-4 pt-4 flex flex-col gap-2 relative z-10">
                            <div className="flex justify-between items-center text-[11px] font-bold text-slate-600"><span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div> Total Fees (Annual)</span><span className="text-slate-800">₹ {totalFee > 0 ? totalFee.toLocaleString('en-IN') : 'N/A'}</span></div>
                            <div className="flex justify-between items-center text-[11px] font-bold text-slate-600"><span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> Paid Till Date</span><span className="text-emerald-600">₹ {totalPaid.toLocaleString('en-IN')}</span></div>
                        </div>
                    </div>

                    {!showQR ? (
                        <button onClick={() => setShowQR(true)} className="w-full bg-emerald-500 text-white py-4 rounded-2xl font-black text-sm shadow-[0_8px_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 hover:bg-emerald-600 transition-colors mb-6">
                            <WalletCards size={18} /> Pay Online via UPI
                        </button>
                    ) : (
                        <div className="bg-white border-2 border-emerald-100 rounded-[24px] p-6 flex flex-col items-center justify-center text-center shadow-sm mb-6 animate-fade-in relative">
                            <button onClick={() => setShowQR(false)} className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 p-2">✖</button>
                            <h4 className="text-sm font-black text-slate-800 mb-1">Scan to Pay</h4>
                            <p className="text-[10px] font-bold text-slate-500 mb-4">₹ {pending.toLocaleString('en-IN')} • Sanskar Vidya Bhawan</p>
                            <div className="w-40 h-40 bg-white border border-slate-200 rounded-[16px] p-2 flex items-center justify-center mb-3">
                                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=svb@upi&pn=SanskarVidyaBhawan&am=${pending}&cu=INR`} alt="QR Code" className="w-full h-full object-contain" />
                            </div>
                            <span className="text-[9px] font-black text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full">Supports all UPI Apps</span>
                        </div>
                    )}

                    <h3 className="text-sm font-black text-slate-800 mb-3">Payment History</h3>
                    {fees.length === 0 ? (
                        <div className="bg-slate-50 border border-dashed border-slate-200 rounded-[20px] p-6 text-center">
                            <p className="text-xs font-black text-slate-400">Koi payment record nahi mila</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {fees.map((fee: any, i: number) => (
                                <div key={i} className="bg-white p-3 rounded-[16px] border border-slate-100 flex items-center justify-between shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center shrink-0"><BadgeCheck size={20} /></div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black text-slate-800">{fee.description || fee.quarter || 'Fee Payment'}</span>
                                            <span className="text-[9px] font-bold text-slate-400">{fee.payment_date ? new Date(fee.payment_date).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }) : ''} • {fee.mode || 'Cash'}</span>
                                        </div>
                                    </div>
                                    <span className="text-xs font-black text-emerald-500">-₹ {(fee.amount_paid || fee.amount || 0).toLocaleString('en-IN')}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            );
        }

        if (activeTab === "leaderboard") {
            return (
                 <div className="flex flex-col animate-fade-in pb-8">
                     {/* Sanskar Coins & Level (Side by Side) */}
                    <div className="flex gap-3 mb-6">
                        <div className="flex-1 bg-gradient-to-br from-amber-400 to-orange-500 rounded-[20px] p-3 text-white shadow-[0_4px_15px_rgba(245,158,11,0.2)] relative overflow-hidden flex items-center justify-between">
                            <div className="absolute right-0 top-0 w-16 h-16 bg-white/20 rounded-full blur-xl -mr-5 -mt-5" />
                            <div className="flex flex-col relative z-10">
                                <span className="text-white/80 text-[9px] font-black uppercase tracking-wider flex items-center gap-1">
                                    <Sparkles size={10} className="fill-white/80" /> Sanskar Coins
                                </span>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="text-xl font-black">450</span>
                                </div>
                            </div>
                            <Star size={24} className="text-yellow-200 fill-yellow-200 opacity-80 relative z-10" />
                        </div>
                        
                        <div className="flex-1 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[20px] p-3 text-white shadow-[0_4px_15px_rgba(59,130,246,0.2)] relative overflow-hidden flex items-center justify-between">
                            <div className="absolute left-0 bottom-0 w-16 h-16 bg-white/20 rounded-full blur-xl -ml-5 -mb-5" />
                            <div className="flex flex-col relative z-10">
                                <span className="text-white/80 text-[9px] font-black uppercase tracking-wider flex items-center gap-1">
                                    <Trophy size={10} className="text-white/80" /> Level 3
                                </span>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="text-lg font-black tracking-wide">Scholar</span>
                                </div>
                            </div>
                            <Medal size={24} className="text-blue-200 opacity-80 relative z-10" />
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap justify-center gap-1.5 mb-6">
                        <button className="px-3 py-1.5 rounded-full text-[10px] font-black bg-amber-400 text-white shadow-sm">All Time</button>
                        <button className="px-3 py-1.5 rounded-full text-[10px] font-black bg-slate-50 text-slate-500 border border-slate-100 hover:bg-slate-100">This Month</button>
                        <button className="px-3 py-1.5 rounded-full text-[10px] font-black bg-slate-50 text-slate-500 border border-slate-100 hover:bg-slate-100">Class 10-A</button>
                    </div>

                    {/* Podium Top 3 */}
                    <div className="flex justify-center items-end px-2 pt-2 mb-6 gap-1 relative">
                        {/* 2nd Place */}
                        <div className="flex flex-col items-center flex-1">
                            <div className="relative z-20">
                                <div className="w-12 h-12 rounded-full border-[3px] border-[#A2D2FF] overflow-hidden bg-slate-50 shadow-lg"><img src="https://api.dicebear.com/7.x/notionists/svg?seed=Rahul&backgroundColor=transparent" alt="2nd" className="w-full h-full object-cover" /></div>
                            </div>
                            <span className="text-[10px] font-black mt-2 text-slate-700 truncate w-full text-center relative z-20">Rahul</span>
                            <span className="text-[8px] text-[#5A9BD5] font-black relative z-20">450 pts</span>
                            <div className="w-full h-16 bg-[#A2D2FF] rounded-t-[14px] mt-1.5 border-t-4 border-[#CBE4FF] flex flex-col items-center pt-1 shadow-[0_-5px_15px_rgba(162,210,255,0.3)] relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
                                <span className="text-base font-black text-blue-800/40 relative z-10">2</span>
                            </div>
                        </div>
                        
                        {/* 1st Place */}
                        <div className="flex flex-col items-center flex-[1.2] relative z-10">
                            <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -top-7 drop-shadow-[0_4px_10px_rgba(245,158,11,0.6)] z-30">
                                <Crown size={32} className="text-amber-500 fill-amber-400 stroke-[1.5]" />
                            </motion.div>
                            <div className="relative z-20">
                                <div className="w-16 h-16 rounded-full border-[4px] border-[#FFD166] overflow-hidden bg-amber-50 shadow-xl"><img src="https://api.dicebear.com/7.x/notionists/svg?seed=Aryan&backgroundColor=transparent" alt="1st" className="w-full h-full object-cover" /></div>
                            </div>
                            <span className="text-xs font-black mt-2 text-amber-600 truncate w-full text-center relative z-20">Aryan</span>
                            <span className="text-[9px] text-amber-500 font-black relative z-20">520 pts</span>
                            <div className="w-full h-24 bg-[#FFD166] rounded-t-[18px] mt-1.5 border-t-[5px] border-[#FFE6A6] flex flex-col items-center pt-2 shadow-[0_-5px_20px_rgba(255,209,102,0.4)] relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent" />
                                <span className="text-xl font-black text-amber-800/40 relative z-10">1</span>
                                <Star size={12} className="text-white fill-white mt-0.5 relative z-10 opacity-70" />
                            </div>
                        </div>
                        
                        {/* 3rd Place */}
                        <div className="flex flex-col items-center flex-1">
                            <div className="relative z-20">
                                <div className="w-12 h-12 rounded-full border-[3px] border-[#FFA69E] overflow-hidden bg-red-50 shadow-lg"><img src="https://api.dicebear.com/7.x/notionists/svg?seed=Neha&backgroundColor=transparent" alt="3rd" className="w-full h-full object-cover" /></div>
                            </div>
                            <span className="text-[10px] font-black mt-2 text-slate-700 truncate w-full text-center relative z-20">Neha</span>
                            <span className="text-[8px] text-[#E07A71] font-black relative z-20">390 pts</span>
                            <div className="w-full h-12 bg-[#FFA69E] rounded-t-[14px] mt-1.5 border-t-4 border-[#FFD0CC] flex flex-col items-center pt-1 shadow-[0_-5px_15px_rgba(255,166,158,0.3)] relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
                                <span className="text-sm font-black text-red-900/40 relative z-10">3</span>
                            </div>
                        </div>
                    </div>

                    {/* List 4 to 10 */}
                    <div className="flex flex-col gap-1.5">
                        {[
                            { rank: 4, name: "Sneha", pts: 350 },
                            { rank: 5, name: "Vikram", pts: 320 },
                            { rank: 6, name: "Pooja", pts: 300 },
                            { rank: 7, name: "Rohan", pts: 280 },
                            { rank: 8, name: "Aman", pts: 250 },
                            { rank: 9, name: "Kavya", pts: 230 },
                            { rank: 10, name: "Ishaan", pts: 210 },
                        ].map(student => (
                             <div key={student.rank} className="flex items-center gap-3 bg-white py-1.5 px-2.5 rounded-[12px] border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] cursor-pointer hover:bg-amber-50/50 transition-colors">
                                  <span className="text-xs font-black text-slate-300 w-5 text-center">{student.rank}</span>
                                  <div className="w-8 h-8 rounded-full bg-slate-50 overflow-hidden border border-slate-100 shadow-[inset_0_2px_5px_rgba(0,0,0,0.02)]">
                                      <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${student.name}&backgroundColor=transparent`} alt={student.name} className="w-full h-full object-cover" />
                                  </div>
                                  <span className="text-xs font-bold text-slate-700 flex-1">{student.name}</span>
                                  <div className="flex items-center gap-1 bg-[#FFF9E6] px-2.5 py-1 rounded-full border border-[#FFD166]/30">
                                       <Star size={10} className="text-[#FFD166] fill-[#FFD166]" />
                                       <span className="text-[10px] font-black text-amber-600">{student.pts}</span>
                                  </div>
                             </div>
                        ))}
                    </div>
                 </div>
            );
        }

        if (activeTab === "messages") {
             if (activeChatTeacher) {
                 return (
                     <div className="flex flex-col animate-fade-in pb-8 h-[60vh] relative">
                         {/* Chat Header */}
                         <div className="flex items-center justify-between bg-white p-3 rounded-[20px] shadow-sm border border-slate-100 mb-4 mt-2">
                             <div className="flex items-center gap-3">
                                 <button onClick={() => setActiveChatTeacher(null)} className="w-8 h-8 bg-slate-50 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"><ChevronLeft size={16} className="text-slate-600" /></button>
                                 <div className="w-10 h-10 rounded-full bg-blue-100 overflow-hidden relative border border-blue-200">
                                     <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${activeChatTeacher}&backgroundColor=transparent`} alt="Teacher" className="w-full h-full object-cover scale-110" />
                                     <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></div>
                                 </div>
                                 <div className="flex flex-col">
                                     <h4 className="text-sm font-black text-slate-800 line-clamp-1">{activeChatTeacher}</h4>
                                     <span className="text-[9px] font-bold text-emerald-500 flex items-center gap-1"><div className="w-1 h-1 rounded-full bg-emerald-500"></div>Online</span>
                                 </div>
                             </div>
                             <button className="w-10 h-10 bg-emerald-50 text-emerald-600 flex items-center justify-center rounded-full shadow-sm hover:bg-emerald-100 transition-colors">
                                 <PhoneCall size={16} />
                             </button>
                         </div>
                         
                         {/* Chat Area */}
                         <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-3 pb-20 px-1">
                             <div className="flex flex-col gap-1 items-center mt-2 mb-2">
                                 <span className="text-[9px] font-bold bg-slate-100 text-slate-400 px-3 py-1 rounded-full border border-slate-200">Today</span>
                             </div>
                             
                             <div className="flex items-end gap-2 w-[85%]">
                                 <div className="w-6 h-6 rounded-full bg-blue-50 shrink-0 overflow-hidden border border-blue-100"><img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${activeChatTeacher}&backgroundColor=transparent`} alt="T" className="scale-110" /></div>
                                 <div className="bg-white border border-slate-100 p-3 rounded-[16px] rounded-bl-none shadow-sm flex flex-col">
                                     <p className="text-[11px] font-bold text-slate-700 leading-snug">Hello! Please ensure Aryan completes the math assignment by tomorrow.</p>
                                     <span className="text-[8px] font-bold text-slate-400 self-end mt-1">10:45 AM</span>
                                 </div>
                             </div>
                             
                             <div className="flex items-end gap-2 w-[85%] self-end flex-row-reverse">
                                 <div className="bg-blue-500 text-white p-3 rounded-[16px] rounded-br-none shadow-[0_4px_10px_rgba(59,130,246,0.2)] flex flex-col">
                                     <p className="text-[11px] font-bold leading-snug">Noted sir, he is working on it right now.</p>
                                     <span className="text-[8px] font-bold text-blue-200 self-end mt-1">11:02 AM <Check size={10} className="inline ml-0.5" /></span>
                                 </div>
                             </div>
                         </div>
                         
                         {/* Input Area */}
                         <div className="absolute bottom-0 left-0 w-full bg-white p-2 rounded-full shadow-[0_-5px_20px_rgba(0,0,0,0.05)] border border-slate-100 flex items-center gap-2">
                             <input type="text" placeholder="Type a message..." className="flex-1 bg-transparent text-xs font-bold px-3 outline-none text-slate-700" />
                             <button className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center shrink-0 shadow-md hover:bg-blue-600 transition-colors">
                                 <ChevronRight size={18} />
                             </button>
                         </div>
                     </div>
                 );
             }

             return (
                <div className="flex flex-col animate-fade-in pb-8">
                    <div className="bg-slate-50 rounded-full flex items-center px-4 py-3 mb-4 border border-slate-100 shadow-inner mt-2">
                        <Search size={16} className="text-slate-400" />
                        <input type="text" placeholder="Search teacher..." className="bg-transparent text-xs font-bold text-slate-600 ml-2 w-full outline-none placeholder:text-slate-400" />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        {[
                            { name: "Mr. R.K. Singh", sub: "Class Teacher", time: "10:45 AM", msg: "Don't forget the assignment.", unread: 2 },
                            { name: "Ms. Neha Sharma", sub: "Science", time: "Yesterday", msg: "Project submission dates updated.", unread: 0 },
                            { name: "Mr. V. Kumar", sub: "Hindi", time: "Monday", msg: "Good progress in recent tests.", unread: 0 },
                            { name: "Ms. Pooja", sub: "English", time: "Last Week", msg: "Please collect the notebook.", unread: 0 },
                            { name: "Mr. Amit Patel", sub: "Mathematics", time: "12 Nov", msg: "Test syllabus attached.", unread: 0 },
                            { name: "Mrs. Verma", sub: "Social Science", time: "05 Nov", msg: "Map work is pending.", unread: 0 },
                            { name: "Mr. Suresh", sub: "Sports", time: "01 Nov", msg: "Selected for cricket team.", unread: 0 },
                            { name: "Principal Office", sub: "Administration", time: "Oct 20", msg: "Holiday on Friday.", unread: 0 }
                        ].map((t, i) => (
                            <div key={i} onClick={() => setActiveChatTeacher(t.name)} className="bg-white rounded-[20px] p-3 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center gap-3 cursor-pointer hover:bg-blue-50/50 transition-colors relative">
                                <div className="w-12 h-12 rounded-full bg-slate-50 overflow-hidden relative shrink-0 border border-slate-200">
                                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${t.name}&backgroundColor=transparent`} alt="Teacher" className="w-full h-full object-cover scale-110" />
                                    {i < 3 && <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>}
                                </div>
                                <div className="flex flex-col flex-1 overflow-hidden">
                                    <div className="flex justify-between items-center w-full">
                                        <h4 className="text-sm font-black text-slate-800 line-clamp-1">{t.name}</h4>
                                        <span className={`text-[9px] font-bold shrink-0 ml-2 ${t.unread > 0 ? 'text-blue-500' : 'text-slate-400'}`}>{t.time}</span>
                                    </div>
                                    <div className="flex justify-between items-center w-full mt-0.5">
                                        <span className="text-[10px] font-bold text-slate-500 truncate w-[80%]">{t.msg}</span>
                                        {t.unread > 0 && <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-white text-[8px] font-black shrink-0">{t.unread}</div>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
             );
        }

        if (activeTab === "events") {
             return (
                <div className="flex flex-col animate-fade-in pb-8">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-sm font-black text-slate-800">Upcoming Events</h3>
                    </div>
                    
                    <div className="w-full bg-white rounded-[24px] border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden relative mb-5 flex flex-col cursor-pointer group">
                        <div className="h-44 w-full relative overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800" alt="Event" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                            <div className="absolute top-4 left-4 bg-teal-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                                <Sparkles size={12} className="fill-white" /> Featured
                            </div>
                            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/30 text-white text-center rounded-[12px] px-2 py-1 flex flex-col shadow-sm">
                                <span className="text-[10px] font-bold uppercase tracking-widest leading-none mb-0.5">Nov</span>
                                <span className="text-lg font-black leading-none">18</span>
                            </div>
                        </div>
                        <div className="p-4 flex flex-col bg-white">
                            <h4 className="text-lg font-black text-slate-800 mb-1">Annual Sports Day 2026</h4>
                            <p className="text-[11px] font-bold text-slate-500 leading-snug mb-4">Join us for the biggest sporting event of the year. Track and field events, relay races, and much more!</p>
                            
                            <div className="flex items-center gap-4 mb-5 border-t border-slate-100 pt-3">
                                <div className="flex items-center gap-1.5">
                                    <Clock size={14} className="text-slate-400" />
                                    <span className="text-[10px] font-bold text-slate-600">09:00 AM - 04:00 PM</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <MapPin size={14} className="text-slate-400" />
                                    <span className="text-[10px] font-bold text-slate-600">Main Ground</span>
                                </div>
                            </div>
                            
                            <button className="w-full bg-teal-500 text-white py-3.5 rounded-xl font-black text-sm shadow-[0_4px_15px_rgba(20,184,166,0.3)] hover:bg-teal-600 transition-colors">RSVP / Register Now</button>
                        </div>
                    </div>

                    <h3 className="text-sm font-black text-slate-800 mb-3">This Month</h3>
                    <div className="flex flex-col gap-3 mb-6">
                        <div className="bg-white rounded-[16px] p-3 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center gap-4">
                            <div className="w-14 h-14 bg-indigo-50 rounded-xl flex flex-col items-center justify-center shrink-0 border border-indigo-100">
                                <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest leading-none mb-0.5">Oct</span>
                                <span className="text-xl font-black text-indigo-600 leading-none">25</span>
                            </div>
                            <div className="flex flex-col">
                                <h4 className="text-sm font-black text-slate-800">Science Exhibition</h4>
                                <span className="text-[10px] font-bold text-slate-500 mt-0.5">School Auditorium • 10:00 AM</span>
                            </div>
                        </div>
                    </div>

                    <h3 className="text-sm font-black text-slate-800 mb-3">Yearly Events Calendar</h3>
                    <div className="bg-white rounded-[20px] p-4 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] mb-6 flex justify-between items-center cursor-pointer hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center">
                                <CalendarDays size={18} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-black text-slate-800">Academic Year 2026-27</span>
                                <span className="text-[10px] font-bold text-slate-500">Download full PDF calendar</span>
                            </div>
                        </div>
                        <Download size={16} className="text-slate-400" />
                    </div>

                    <h3 className="text-sm font-black text-slate-800 mb-3">Events Gallery</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="h-28 rounded-[16px] overflow-hidden relative group cursor-pointer shadow-sm">
                            <img src="https://images.unsplash.com/photo-1511629091441-ee46146481b6?w=400" alt="Gallery" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                        </div>
                        <div className="h-28 rounded-[16px] overflow-hidden relative group cursor-pointer shadow-sm">
                            <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400" alt="Gallery" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                        </div>
                    </div>
                </div>
             );
        }

        if (activeTab === "ptm") {
             return (
                <div className="flex flex-col animate-fade-in pb-8">
                     <div className="bg-gradient-to-br from-sky-400 to-blue-500 rounded-[24px] p-6 flex flex-col items-center text-center shadow-[0_8px_20px_rgba(56,189,248,0.3)] relative overflow-hidden mb-6 text-white">
                         <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
                         <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shadow-inner mb-3 border border-white/30 backdrop-blur-sm relative z-10">
                             <UsersRound size={28} className="text-white" />
                         </div>
                         <h4 className="text-lg font-black mb-1 relative z-10">Next PTM Scheduled</h4>
                         <span className="text-sm font-bold text-sky-100 relative z-10 mb-5">20th November • 10:00 AM</span>
                         <button className="bg-white text-sky-600 px-6 py-3 rounded-xl font-black text-sm shadow-sm hover:bg-sky-50 transition-colors w-full relative z-10 flex items-center justify-center gap-2">
                             <CalendarDays size={16} /> Add to Calendar
                         </button>
                     </div>

                     <h3 className="text-sm font-black text-slate-800 mb-3">Teachers Attending</h3>
                     <div className="flex flex-col gap-3 mb-6">
                         <div className="bg-white rounded-[16px] p-4 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center justify-between">
                             <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden border border-slate-200"><img src="https://api.dicebear.com/7.x/notionists/svg?seed=Teacher1&backgroundColor=e0f2fe" alt="Teacher" /></div>
                                 <div className="flex flex-col">
                                     <span className="text-sm font-black text-slate-800">Mr. R.K. Singh</span>
                                     <span className="text-[10px] font-bold text-slate-500">Class Teacher • Science</span>
                                 </div>
                             </div>
                             <div className="w-8 h-8 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center"><Check size={14} className="stroke-[3]" /></div>
                         </div>
                         <div className="bg-white rounded-[16px] p-4 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center justify-between">
                             <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden border border-slate-200"><img src="https://api.dicebear.com/7.x/notionists/svg?seed=Teacher2&backgroundColor=f3e8ff" alt="Teacher" /></div>
                                 <div className="flex flex-col">
                                     <span className="text-sm font-black text-slate-800">Ms. Sharma</span>
                                     <span className="text-[10px] font-bold text-slate-500">Mathematics</span>
                                 </div>
                             </div>
                             <div className="w-8 h-8 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center"><Check size={14} className="stroke-[3]" /></div>
                         </div>
                     </div>

                     <h3 className="text-sm font-black text-slate-800 mb-3">Previous PTM</h3>
                     <div className="bg-white rounded-[16px] p-4 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col gap-2">
                         <div className="flex justify-between items-center mb-1">
                             <span className="text-xs font-black text-slate-800">10th August 2026</span>
                             <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-sm">Attended</span>
                         </div>
                         <p className="text-[11px] font-bold text-slate-600 leading-snug">
                             <strong className="text-slate-700">Topics Discussed:</strong> Improvement in Mathematics, Behavior in class, Participation in upcoming Science Fair.
                         </p>
                     </div>
                </div>
             );
        }

        if (activeTab === "bus") {
             return (
                <div className="flex flex-col animate-fade-in pb-8">
                     <h3 className="text-sm font-black text-slate-800 mb-3 mt-2">Live Tracking</h3>
                     <div className="w-full h-64 bg-slate-200 rounded-[24px] mb-5 overflow-hidden relative border-4 border-white shadow-lg">
                         {/* Real Map embed centered on Vinayak Nagar, Bhinmal */}
                         <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14343.37549646453!2d72.2612716!3d25.0051871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3943328e93813955%3A0x6b4bf0f1e8284f18!2sVinayak%20Nagar%2C%20Bhinmal%2C%20Rajasthan%20343029!5e0!3m2!1sen!2sin!4v1714064500000!5m2!1sen!2sin" width="100%" height="100%" style={{border:0, pointerEvents: 'none'}} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-full h-full object-cover opacity-90 grayscale-[0.2]"></iframe>
                         
                         {/* Route Line overlay */}
                         <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxwb2x5bGluZSBwb2ludHM9IjUwLDUwIDE1MCwxMjAgMjUwLDgwIiBmaWxsPSJub25lIiBzdHJva2U9IiMzYjgyZjYiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWRhc2hhcnJheT0iOCw4Ii8+PC9zdmc+')] opacity-70"></div>
                         
                         {/* School Marker */}
                         <div className="absolute top-[10%] left-[10%] bg-white p-1.5 rounded-full shadow-md"><Home size={14} className="text-indigo-500" /></div>
                         
                         {/* Home Marker */}
                         <div className="absolute bottom-[20%] right-[10%] bg-white p-1.5 rounded-full shadow-md"><User size={14} className="text-emerald-500" /></div>

                         <div className="absolute top-[40%] left-[45%] transform -translate-x-1/2 -translate-y-1/2">
                             <div className="w-12 h-12 bg-fuchsia-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(217,70,239,0.6)] border-[3px] border-white relative z-10 animate-bounce">
                                 <BusFront size={20} className="text-white" />
                             </div>
                             <div className="absolute inset-0 bg-fuchsia-500 rounded-full animate-ping opacity-40"></div>
                         </div>
                         
                         <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-[16px] p-3 flex justify-between items-center shadow-lg border border-white/50">
                             <div className="flex flex-col">
                                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-0.5">ETA to Stop</span>
                                 <h4 className="text-2xl font-black text-fuchsia-600 leading-none">5 Mins</h4>
                             </div>
                             <div className="text-right flex flex-col items-end justify-center">
                                 <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-full mb-1 flex items-center gap-1.5 border border-emerald-100">
                                     <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div> On Time
                                 </span>
                                 <span className="text-[10px] font-bold text-slate-500">Distance: 1.2 km away</span>
                             </div>
                         </div>
                     </div>
                     
                     <div className="flex flex-col gap-3">
                         <div className="bg-white rounded-[20px] p-4 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex justify-between items-center">
                             <div className="flex items-center gap-3">
                                 <div className="w-12 h-12 rounded-full bg-slate-50 overflow-hidden border border-slate-200">
                                     <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Ramesh&backgroundColor=transparent" alt="Driver" className="w-full h-full object-cover scale-110" />
                                 </div>
                                 <div className="flex flex-col">
                                     <span className="text-[10px] font-bold text-slate-400 uppercase">Driver</span>
                                     <span className="text-sm font-black text-slate-800">Ramesh Kumar</span>
                                 </div>
                             </div>
                             <button className="w-10 h-10 flex items-center justify-center bg-emerald-50 rounded-full border border-emerald-100 shadow-sm hover:bg-emerald-100 transition-colors">
                                 <PhoneCall size={18} className="text-emerald-600 fill-emerald-600" />
                             </button>
                         </div>
                         
                         <div className="bg-white rounded-[20px] p-4 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex justify-between items-center">
                             <div className="flex flex-col">
                                 <span className="text-[10px] font-bold text-slate-400 uppercase">Bus Number</span>
                                 <span className="text-sm font-black text-slate-800 tracking-wide">RJ46 AB 1243</span>
                             </div>
                             <div className="flex flex-col text-right">
                                 <span className="text-[10px] font-bold text-slate-400 uppercase">Left School at</span>
                                 <span className="text-sm font-black text-slate-800 tracking-wide">02:15 PM</span>
                             </div>
                         </div>
                     </div>
                </div>
             );
        }

        if (activeTab === "leave") {
             return (
                 <div className="flex flex-col animate-fade-in pb-8">
                     <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] mb-6">
                         <h3 className="text-base font-black text-slate-800 mb-4">Apply for Leave</h3>
                         
                         <div className="grid grid-cols-2 gap-3 mb-4">
                             <div className="bg-violet-50 border-2 border-violet-500 p-3 rounded-[16px] flex flex-col items-center text-center cursor-pointer shadow-sm relative overflow-hidden">
                                 <div className="absolute top-2 right-2 w-4 h-4 bg-violet-500 rounded-full flex items-center justify-center"><Check size={10} className="text-white stroke-[3]" /></div>
                                 <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-2 shadow-sm"><span className="text-xl">🤒</span></div>
                                 <span className="text-[11px] font-black text-violet-700">Sick Leave</span>
                             </div>
                             <div className="bg-slate-50 border border-slate-200 p-3 rounded-[16px] flex flex-col items-center text-center cursor-pointer hover:border-slate-300">
                                 <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-2 shadow-sm"><span className="text-xl">✈️</span></div>
                                 <span className="text-[11px] font-black text-slate-600">Casual Leave</span>
                             </div>
                         </div>

                         <div className="flex flex-col gap-3">
                             <div className="flex flex-col gap-1.5">
                                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider pl-1">Date Range</label>
                                 <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between text-sm font-bold text-slate-700">
                                     <span>20 Nov 2026</span>
                                     <ChevronLeft size={14} className="rotate-180 text-slate-400" />
                                     <span>22 Nov 2026</span>
                                 </div>
                             </div>
                             
                             <div className="flex flex-col gap-1.5">
                                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider pl-1">Reason</label>
                                 <textarea rows={3} placeholder="Type your reason here..." className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-700 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 placeholder:text-slate-400 resize-none"></textarea>
                             </div>
                             
                             <div className="flex flex-col gap-1.5 mt-1">
                                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider pl-1">Attach Medical Certificate (Optional)</label>
                                 <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 transition-colors">
                                     <div className="w-8 h-8 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-2"><FileText size={14} /></div>
                                     <span className="text-[11px] font-bold text-slate-500">Tap to upload PDF or Image</span>
                                 </div>
                             </div>
                         </div>
                     </div>
                     <button className="w-full py-4 bg-violet-500 text-white rounded-[16px] font-black text-sm shadow-[0_4px_15px_rgba(139,92,246,0.3)] hover:bg-violet-600 transition-colors">Submit Application</button>
                 </div>
             );
        }

        if (activeTab === "idcard") {
             return (
                 <div className="flex flex-col animate-fade-in items-center justify-center pb-8 pt-4 w-full overflow-x-hidden">
                      <div id="student-id-card" className="w-full max-w-[350px] aspect-[1.586/1] bg-white rounded-[20px] border border-slate-200 shadow-[0_15px_40px_rgba(0,0,0,0.1)] flex relative overflow-hidden group perspective-1000 mt-2">
                          {/* Left Strip Pattern */}
                          <div className="w-2.5 h-full bg-blue-600 absolute left-0 top-0 z-20 shadow-[2px_0_10px_rgba(37,99,235,0.3)]"></div>

                          {/* Content Container */}
                          <div className="flex-1 flex flex-col h-full pl-5 pr-3 py-3 relative z-10">
                            {/* Header */}
                            <div className="flex justify-between items-start mb-3 border-b border-slate-100 pb-2 relative">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100 p-1">
                                        <img src="/logo.png" className="w-full h-full object-contain drop-shadow-sm" />
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="text-blue-900 font-black text-[13px] leading-none tracking-tight uppercase">Sanskar Vidya Bhawan</h3>
                                        <span className="text-[7px] font-bold text-slate-500 uppercase tracking-widest mt-1">Education for Excellence • Estd 2009</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Body */}
                            <div className="flex flex-1 gap-4 items-center">
                                {/* Photo */}
                                <div className="flex flex-col items-center gap-2 h-full justify-center w-[85px] shrink-0">
                                    <div className="w-[75px] h-[85px] rounded-xl border-[3px] border-white shadow-md bg-slate-50 overflow-hidden relative group-hover:scale-105 transition-transform">
                                        {student?.photo_url ? (
                                            <img src={student.photo_url} className="w-full h-full object-cover" />
                                        ) : (
                                            <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${student?.full_name || 'Student'}&backgroundColor=fef3c7`} className="w-full h-full object-cover scale-110" />
                                        )}
                                        <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-xl"></div>
                                    </div>
                                </div>
                                
                                {/* Details */}
                                <div className="flex flex-col h-full justify-center gap-1.5 flex-1 pr-1">
                                    <div className="mb-0.5 flex flex-wrap items-center gap-1.5">
                                        <h2 className="text-[15px] font-black text-slate-800 leading-none tracking-tight">{student?.full_name || 'Student Name'}</h2>
                                        <span className="text-[8px] font-black text-blue-600 uppercase tracking-widest inline-block bg-blue-50 px-2 py-0.5 rounded-sm border border-blue-100 whitespace-nowrap">Student • 2026-27</span>
                                    </div>
                                    
                                    <div className="grid grid-cols-[45px_1fr] gap-y-1 gap-x-2 text-[9px] w-full mt-1">
                                        <span className="text-slate-400 font-bold uppercase tracking-wider">SR No</span>
                                        <span className="font-black text-slate-700">{student?.sr_number || 'N/A'}</span>
                                        
                                        <span className="text-slate-400 font-bold uppercase tracking-wider">Class</span>
                                        <span className="font-black text-slate-700 whitespace-nowrap">Class {student?.class || '—'} • Roll: {student?.roll_number || '—'}</span>
                                        
                                        <span className="text-slate-400 font-bold uppercase tracking-wider">D.O.B.</span>
                                        <span className="font-black text-slate-700">{student?.dob ? new Date(student.dob).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }) : 'N/A'}</span>
                                        
                                        <span className="text-slate-400 font-bold uppercase tracking-wider">Contact</span>
                                        <span className="font-black text-slate-700">{student?.contact_number || 'N/A'}</span>
                                    </div>
                                </div>
                                
                                {/* QR Side */}
                                <div className="flex flex-col items-center justify-start gap-2.5 h-full py-1 w-16 shrink-0 border-l border-slate-100 pl-3">
                                    <div className="text-[8px] font-black text-slate-400 text-center uppercase tracking-widest leading-tight">SVB<br/>2026<br/>{student?.sr_number || '---'}</div>
                                    <div className="w-14 h-14 bg-white rounded-lg p-1 flex items-center justify-center shadow-sm border border-slate-200">
                                        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=SVB-${student?.sr_number || 'UNKNOWN'}&color=1e293b`} className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Footer */}
                            <div className="mt-2 pt-2 flex justify-between items-end relative">
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-slate-200 via-slate-100 to-transparent"></div>
                                <p className="text-[7px] font-bold text-slate-500 leading-snug max-w-[65%]">Bhinmal, Jalore, Rajasthan 343029<br/>sanskarvidyabhawan.edu.in</p>
                                <span className="text-[6px] font-black uppercase tracking-wider text-slate-400 border-t border-slate-300 pt-0.5 mt-1">Principal Auth</span>
                            </div>
                          </div>
                      </div>

                      <div className="flex gap-3 mt-5 w-full max-w-[350px]">
                          <button 
                              onClick={() => window.print()}
                              className="flex-1 py-3.5 bg-slate-800 text-white text-xs font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:bg-slate-900 transition-colors"
                          >
                              <Printer size={16} /> Print ID Card
                          </button>
                          <button 
                              onClick={() => setActiveTab('overview')}
                              className="py-3.5 px-5 bg-white text-slate-600 text-xs font-black uppercase tracking-widest rounded-2xl border border-slate-200 hover:bg-slate-50 transition-colors"
                          >
                              Back
                          </button>
                      </div>
                      <p className="text-[10px] font-bold text-slate-400 mt-4 text-center flex items-center gap-1.5 bg-white py-1.5 px-3 rounded-full shadow-sm border border-slate-100"><Zap size={12} className="text-amber-500 fill-amber-500" /> Print in landscape mode for best results</p>
                      <style>{`@media print { body > * { display: none !important; } #student-id-card { display: flex !important; position: fixed; top: 5mm; left: 5mm; width: 85mm; height: 54mm; } }`}</style>
                 </div>
             );
        }

        return null;
  };

  return (
      <div className="font-sans selection:bg-amber-400 selection:text-white bg-slate-100 md:bg-slate-900 h-[100dvh] md:flex md:items-center md:justify-center md:p-6 -mb-[80px] lg:mb-0">
          <div className="w-full h-[100dvh] md:h-[850px] md:max-w-[400px] md:rounded-[40px] bg-[#BBE2FB] relative md:shadow-2xl overflow-hidden md:border-[8px] md:border-white flex flex-col">
             <div className="flex-1 relative overflow-y-auto overflow-x-hidden custom-scrollbar">
                 
                 <HomeHeader />

                 {/* Background Image (Landscape) correctly placed at top */}
                 <div className="absolute top-0 left-0 w-full h-[65vh] z-0 overflow-hidden pointer-events-none">
                    <img src="/herosection1.jpg" alt="Landscape" className="w-full h-full object-cover opacity-100 pt-16" />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent pt-16" />
                 </div>

                 {/* Very small Back Button in Hero Section Top Corner */}
                 <AnimatePresence>
                    {activeTab !== "overview" && (
                        <motion.button 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            onClick={() => setActiveTab("overview")} 
                            className="absolute top-[86px] left-4 z-40 flex items-center gap-1 bg-white/60 backdrop-blur-md px-2 py-1 rounded-full border border-white/50 shadow-sm hover:bg-white/80 transition-all cursor-pointer"
                        >
                            <ChevronLeft size={14} className="text-slate-800" />
                            <span className="text-[10px] font-black text-slate-800 pr-1.5">Back</span>
                        </motion.button>
                    )}
                 </AnimatePresence>

                 {/* Welcome & Mascot */}
                 <div className="relative z-20 flex flex-col items-center mt-6 min-h-[240px]">
                     <AnimatePresence mode="wait">
                         <motion.div
                             key={activeTab}
                             initial={{ opacity: 0, scale: 0.9, y: 10 }}
                             animate={{ opacity: 1, scale: 1, y: 0 }}
                             exit={{ opacity: 0, scale: 0.9, y: -10 }}
                             transition={{ duration: 0.2 }}
                             className="flex flex-col items-center w-full"
                         >
                             <h1 className="text-3xl font-black text-slate-800 tracking-tight text-center drop-shadow-md">
                                 {activeTab === "overview" ? "Welcome, Aryan" : activeCategory?.name}
                             </h1>
                             
                             {/* Mascot in the middle */}
                             <motion.div 
                                 animate={{ y: [0, -12, 0], rotate: [0, 2, -2, 0] }}
                                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                 className="mt-6 w-44 h-44 transform hover:scale-110 transition-transform cursor-pointer relative z-30 drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)]"
                             >
                                 <img src="/owl1.png" alt="Owl Mascot" className="w-full h-full object-contain" />
                             </motion.div>
                         </motion.div>
                     </AnimatePresence>
                 </div>

                 {/* Bottom White overlapping card */}
                 <div className="relative z-20 bg-white rounded-t-[40px] px-5 pt-8 pb-2 shadow-[0_-15px_40px_rgba(0,0,0,0.08)] w-full mt-auto min-h-[50vh] flex flex-col">
                     
                     {/* Floating Header Box (Overall Attendance or Category Header) */}
                     <AnimatePresence mode="wait">
                         <motion.div 
                             key={`header-${activeTab}`}
                             initial={{ opacity: 0, y: 20 }}
                             animate={{ opacity: 1, y: 0 }}
                             exit={{ opacity: 0, y: -20 }}
                             transition={{ duration: 0.2 }}
                             className="flex items-center gap-4 bg-white/95 backdrop-blur-xl border border-white/50 p-4 rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] mb-8 -mt-16 relative z-10"
                         >
                             <div className={`w-12 h-12 ${activeCategory ? activeCategory.color : 'bg-emerald-100 border border-emerald-200'} rounded-[16px] flex items-center justify-center shrink-0`}>
                                 {activeCategory ? <activeCategory.icon size={22} className="text-current" /> : <CalendarDays className="text-emerald-500" />}
                             </div>
                             <div className="flex flex-col">
                                 <span className="text-base font-black text-slate-800 leading-tight">
                                     {activeCategory ? activeCategory.name : '94.5%'}
                                 </span>
                                 <span className="text-[11px] font-bold text-slate-400">
                                     {activeCategory ? 'Student Area' : 'Overall Attendance'}
                                 </span>
                             </div>
                             {activeCategory ? (
                                 <button onClick={() => { setActiveTab('overview'); window.scrollTo({ top: 0, behavior: 'instant' }); }} className="ml-auto w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors border border-slate-100 shadow-sm cursor-pointer">
                                     <ChevronLeft size={16} className="text-slate-600" />
                                 </button>
                             ) : (
                                 <MoreHorizontal className="ml-auto text-slate-300" />
                             )}
                         </motion.div>
                     </AnimatePresence>

                     {/* Content area */}
                     <div className="flex-1 flex flex-col overflow-hidden">
                          <AnimatePresence mode="wait">
                              <motion.div 
                                  key={`content-${activeTab}`}
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -20 }}
                                  transition={{ duration: 0.2 }}
                                  className="flex-1 flex flex-col"
                              >
                                  {renderContent()}
                              </motion.div>
                          </AnimatePresence>
                     </div>

                     {/* Footer Branding */}
                     {activeTab !== "messages" && (
                         <div className="mt-auto pt-6 pb-6 flex flex-col items-center justify-center text-center bg-white rounded-b-[40px]">
                             <div className="flex items-center gap-1.5 mb-1.5 opacity-90">
                                 <img src="/logo.png" alt="Logo" className="w-5 h-5 object-contain" />
                                 <span className="text-[12px] font-black text-slate-800 leading-none">Sanskar Vidya Bhawan</span>
                             </div>
                             <p className="text-[9px] font-bold text-slate-400 leading-none pb-4">
                                 Developed by <a href="https://technodhaam.com" target="_blank" className="text-blue-500 font-black hover:underline transition-all">TechnoDhaam Web Solutions</a>
                             </p>
                             <button 
                                 onClick={() => window.location.href = '/'}
                                 className="flex items-center gap-2 px-6 py-3 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-full text-[11px] font-black uppercase tracking-widest transition-colors shadow-sm"
                             >
                                 <Home size={14} /> Main Website
                             </button>
                         </div>
                     )}
                 </div>

             </div>
          </div>
      </div>
  );
}
