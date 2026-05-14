"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { 
  Home, Search, User, ChevronRight, ChevronLeft, Flame, MoreHorizontal,
  BookHeart, ClipboardCheck, GraduationCap, Clock4, StickyNote, BellRing,
  BadgeCheck, WalletCards, Medal, MessageCircleMore, PartyPopper, UsersRound,
  BusFront, CalendarOff, Contact, Trophy, CalendarDays, BookOpen, Swords, Sparkles, HeartHandshake, Zap, Crown, FileText, Download, PhoneCall, CheckCircle, Calendar, AlertTriangle, Check, Clock, MapPin,
  UserPlus, LineChart, Video, Users, Upload, AlignLeft, Send, ArrowLeft, LogOut, ShieldCheck
} from "lucide-react";

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [teacher, setTeacher] = useState<any>(null);
  const [classStudents, setClassStudents] = useState<any[]>([]);
  const [isSubmittingAtt, setIsSubmittingAtt] = useState(false);

  // Admit Form States
  const [admitMedium, setAdmitMedium] = useState("Hindi");

  // Live Attendance States
  const [attDate, setAttDate] = useState(new Date().toISOString().split('T')[0]);
  const [attMedium, setAttMedium] = useState("");
  const [attClass, setAttClass] = useState("");
  
  const [attendanceList, setAttendanceList] = useState<{ id: number|string, name: string, roll: string, photo_url?: string, status: "P" | "A" | null, reason: string, appReceived: string }[]>([]);

  useEffect(() => {
    const session = typeof window !== 'undefined' ? localStorage.getItem('svb_teacher_session') : null;
    if (!session) { window.location.href = '/login'; return; }
    const parsed = JSON.parse(session);

    const loadTeacher = async () => {
      const { data } = await supabase.from('teachers').select('*').eq('id', parsed.id).single();
      if (data) {
        setTeacher(data);
        // Auto-fill class from teacher's designated class
        if (data.designated_class) {
          setAttClass(data.designated_class);
          setAttMedium(data.medium || 'Hindi');
          setDiaryClass(data.designated_class);
          setNotesClass(data.designated_class);
          setGradesClass(data.designated_class);
          loadStudents(data.designated_class);
        }
        loadDynamicData(data.id, data.designated_class);
      }
    };

    const loadStudents = async (cls: string) => {
      const { data } = await supabase.from('students').select('id, full_name, roll_number, photo_url, class, medium').eq('class', cls).order('roll_number', { ascending: true });
      if (data && data.length > 0) {
        setAttendanceList(data.map((s: any) => ({
          id: s.id, name: s.full_name, roll: s.roll_number || '-', photo_url: s.photo_url,
          status: null, reason: '', appReceived: 'No'
        })));
        setClassStudents(data);
      }
    };

    loadTeacher();
  }, []);

  // Grades States
  const [gradesDate, setGradesDate] = useState("");
  const [gradesTest, setGradesTest] = useState("Unit Test 1");
  const [gradesTotal, setGradesTotal] = useState("");
  const [gradesMedium, setGradesMedium] = useState("");
  const [gradesClass, setGradesClass] = useState("");

  // Insights States
  const [insightsMedium, setInsightsMedium] = useState("");
  const [insightsClass, setInsightsClass] = useState("");
  const [insightsRoll, setInsightsRoll] = useState("");
  const [showInsightResult, setShowInsightResult] = useState(false);

  // Chat States
  const [activeChat, setActiveChat] = useState<string | null>(null);

  // Notes States
  const [notesMedium, setNotesMedium] = useState("");
  const [notesClass, setNotesClass] = useState("");
  const [notesStudent, setNotesStudent] = useState("All");
  const [notesDate, setNotesDate] = useState("");
  
  const [diaryMedium, setDiaryMedium] = useState("Hindi");
  const [diaryDate, setDiaryDate] = useState("");
  const [gradesHistoryClass, setGradesHistoryClass] = useState("");

  // Updates State
  const [updateTarget, setUpdateTarget] = useState("School");

  // Dynamic Data States
  const [diaryList, setDiaryList] = useState<any[]>([]);
  const [notesList, setNotesList] = useState<any[]>([]);
  const [gradesHistory, setGradesHistory] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [routineList, setRoutineList] = useState<any[]>([]);
  
  const [diarySubject, setDiarySubject] = useState("Math");
  const [diaryClass, setDiaryClass] = useState("");
  const [diaryHomework, setDiaryHomework] = useState("");

  const [notesTitle, setNotesTitle] = useState("");

  const loadDynamicData = async (teacherId: string, dClass: string) => {
      const { data: dData } = await supabase.from('diary').select('*').eq('teacher_id', teacherId).order('created_at', { ascending: false }).limit(20);
      if (dData) setDiaryList(dData);

      const { data: nData } = await supabase.from('notes').select('*').eq('teacher_id', teacherId).order('created_at', { ascending: false }).limit(20);
      if (nData) setNotesList(nData);

      if (dClass) {
          const { data: rData } = await supabase.from('routine').select('*').eq('class', dClass);
          if (rData) setRoutineList(rData);
      }
  };


  const categories = [
      { name: "Admit", id: "admit", icon: UserPlus, color: "text-blue-500 bg-blue-50 border-blue-100" },
      { name: "Live Attendance", id: "attendance", icon: ClipboardCheck, color: "text-emerald-500 bg-emerald-50 border-emerald-100" },
      { name: "Diary", id: "diary", icon: BookHeart, color: "text-amber-500 bg-amber-50 border-amber-100" },
      { name: "Grades", id: "grades", icon: GraduationCap, color: "text-purple-500 bg-purple-50 border-purple-100" },
      { name: "Insights", id: "insights", icon: LineChart, color: "text-cyan-500 bg-cyan-50 border-cyan-100" },
      { name: "Chat", id: "chat", icon: MessageCircleMore, color: "text-pink-500 bg-pink-50 border-pink-100" },
      { name: "Meetings", id: "meetings", icon: Video, color: "text-orange-500 bg-orange-50 border-orange-100" },
      { name: "Events", id: "events", icon: PartyPopper, color: "text-teal-500 bg-teal-50 border-teal-100" },
      { name: "Time Table", id: "timetable", icon: Clock4, color: "text-rose-500 bg-rose-50 border-rose-100" },
      { name: "Exams", id: "exams", icon: FileText, color: "text-indigo-500 bg-indigo-50 border-indigo-100" },
      { name: "Notes", id: "notes", icon: StickyNote, color: "text-sky-500 bg-sky-50 border-sky-100" },
      { name: "Updates", id: "updates", icon: BellRing, color: "text-yellow-500 bg-yellow-50 border-yellow-100" },
      { name: "Salary", id: "salary", icon: WalletCards, color: "text-green-500 bg-green-50 border-green-100" }
  ];

  const hindiClasses = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"];
  const englishClasses = ["Nursery", "LKG", "UKG", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

  const HomeHeader = () => (
    <div className="bg-amber-100 px-6 pt-4 pb-4 flex justify-between items-center z-50 sticky top-0 rounded-b-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] border-b border-amber-200">
        <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center p-1 border border-slate-100 shadow-[inset_0_2px_5px_rgba(0,0,0,0.02)]">
                <img src="/logo.png" alt="School Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col gap-0.5">
                <span className="text-[16px] font-black text-slate-800 leading-none">{teacher?.full_name || 'SVB Teacher'}</span>
                <span className="text-[11px] font-bold text-slate-500">{teacher?.subject || teacher?.designated_class ? `${teacher.subject || ''} • Class ${teacher.designated_class}` : 'Loading...'}</span>
            </div>
        </div>
        
        <div className="flex items-center gap-3">
            <button onClick={() => { localStorage.removeItem('svb_teacher_session'); window.location.href = '/login'; }} className="w-9 h-9 flex items-center justify-center bg-red-50 border border-red-100 rounded-full text-red-400 hover:bg-red-100 hover:text-red-600 transition-colors" title="Logout">
                <LogOut size={16} />
            </button>
            <div className="w-11 h-11 rounded-full border-[3px] border-amber-400 overflow-hidden shadow-sm cursor-pointer transform hover:scale-105 transition-transform bg-white">
                {teacher?.photo_url ? (
                    <img src={teacher.photo_url} alt="Teacher" className="w-full h-full object-cover" />
                ) : (
                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${teacher?.full_name || 'Teacher'}&backgroundColor=fef3c7`} alt="Teacher" className="w-full h-full object-cover" />
                )}
            </div>
        </div>
    </div>
  );

  const renderContent = () => {
        if (activeTab === "overview") {
             return (
                 <div className="animate-fade-in p-5 pb-24">
                    {/* Hero Section */}
                    <div className="relative w-full h-44 rounded-[24px] overflow-hidden mb-6 shadow-sm border border-slate-100">
                        <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800" alt="Hero" className="w-full h-full object-cover absolute inset-0" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                        <div className="absolute bottom-4 left-5">
                            <span className="text-white/80 text-[10px] font-black tracking-wider uppercase drop-shadow-md">Welcome Back</span>
                            <h2 className="text-2xl font-black text-white leading-tight drop-shadow-lg">{teacher?.full_name || 'Teacher'}</h2>
                        </div>
                    </div>

                    <div className="flex justify-between items-center mb-5">
                        <h3 className="text-base font-black text-slate-800">Teacher Categories</h3>
                    </div>
                    
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-y-6 gap-x-2 mb-10">
                        {categories.map((cat, i) => (
                            <div key={i} className="flex flex-col items-center gap-1.5 cursor-pointer group" onClick={() => { setActiveTab(cat.id); window.scrollTo({ top: 0, behavior: 'instant' }); }}>
                                <div className={`w-12 h-12 rounded-[16px] flex items-center justify-center border shadow-[0_4px_10px_rgba(0,0,0,0.03)] group-hover:scale-110 transition-all duration-300 ${cat.color}`}>
                                    <cat.icon size={22} strokeWidth={2.5} />
                                </div>
                                <span className="text-[9px] font-black text-slate-600 text-center leading-tight whitespace-nowrap tracking-tight">{cat.name}</span>
                            </div>
                        ))}
                    </div>
                 </div>
             );
        }

        return (
            <div className="p-5 pb-24 animate-fade-in">
                <button onClick={() => {
                    setActiveTab("overview");
                    setActiveChat(null);
                    setShowInsightResult(false);
                    window.scrollTo({ top: 0, behavior: 'instant' });
                }} className="flex items-center gap-1.5 text-slate-500 font-bold text-xs mb-5 hover:text-slate-800 transition-colors bg-white px-3 py-1.5 rounded-full shadow-sm w-max border border-slate-100">
                    <ArrowLeft size={14} /> Back to Dashboard
                </button>

                {activeTab === "admit" && (
                    <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col gap-4">
                        <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-2">
                            <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center"><UserPlus size={20} /></div>
                            <div>
                                <h3 className="text-base font-black text-slate-800 leading-tight">Admit Student</h3>
                                <p className="text-[10px] font-bold text-slate-400">Quick student admission form</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-bold text-slate-500 pl-1">Full Name</label>
                            <input type="text" placeholder="Enter student name..." className="w-full bg-slate-50 text-slate-700 text-sm font-bold p-3.5 rounded-[12px] border border-slate-200 outline-none focus:border-blue-400 focus:bg-white transition-colors" />
                        </div>
                        
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-bold text-slate-500 pl-1">Medium</label>
                            <select value={admitMedium} onChange={(e) => setAdmitMedium(e.target.value)} className="w-full bg-slate-50 text-slate-700 text-sm font-bold p-3.5 rounded-[12px] border border-slate-200 outline-none focus:border-blue-400 focus:bg-white transition-colors">
                                <option value="Hindi">Hindi Medium</option>
                                <option value="English">English Medium</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-bold text-slate-500 pl-1">Class</label>
                            <select className="w-full bg-slate-50 text-slate-700 text-sm font-bold p-3.5 rounded-[12px] border border-slate-200 outline-none focus:border-blue-400 focus:bg-white transition-colors">
                                <option value="">Select Class</option>
                                {(admitMedium === "Hindi" ? hindiClasses : englishClasses).map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-bold text-slate-500 pl-1">Admission Date</label>
                            <input type="date" className="w-full bg-slate-50 text-slate-700 text-sm font-bold p-3.5 rounded-[12px] border border-slate-200 outline-none focus:border-blue-400 focus:bg-white transition-colors" />
                        </div>

                        <button className="w-full mt-4 py-4 bg-blue-600 text-white rounded-[16px] font-black text-sm shadow-[0_8px_20px_rgba(37,99,235,0.3)] hover:bg-blue-700 transition-colors">
                            Submit Admission
                        </button>

                        <div className="mt-4 pt-5 border-t border-slate-100">
                            <h4 className="text-[12px] font-black text-slate-800 mb-3 px-1">Admit History</h4>
                            <div className="flex flex-col gap-2">
                                {["Rohan Sharma (10th)", "Priya Verma (8th)", "Aarav Singh (1st)"].map((name, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center font-black text-[10px]">{name[0]}</div>
                                        <span className="text-xs font-bold text-slate-700">{name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "attendance" && (
                    <div className="flex flex-col gap-4">
                        <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col gap-4">
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-2">
                                <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center"><ClipboardCheck size={20} /></div>
                                <div>
                                    <h3 className="text-base font-black text-slate-800 leading-tight">Live Attendance</h3>
                                    <p className="text-[10px] font-bold text-slate-400">Mark daily attendance</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="col-span-2 flex flex-col gap-1.5">
                                    <label className="text-[11px] font-bold text-slate-500 pl-1">Date</label>
                                    <input type="date" value={attDate} onChange={(e) => setAttDate(e.target.value)} className="w-full bg-slate-50 text-slate-700 text-sm font-bold p-3 rounded-[12px] border border-slate-200 outline-none" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[11px] font-bold text-slate-500 pl-1">Medium</label>
                                    <select value={attMedium} onChange={(e) => setAttMedium(e.target.value)} className="w-full bg-slate-50 text-slate-700 text-sm font-bold p-3 rounded-[12px] border border-slate-200 outline-none">
                                        <option value="">Select</option>
                                        <option value="Hindi">Hindi</option>
                                        <option value="English">English</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[11px] font-bold text-slate-500 pl-1">Class</label>
                                    <select value={attClass} onChange={(e) => setAttClass(e.target.value)} className="w-full bg-slate-50 text-slate-700 text-sm font-bold p-3 rounded-[12px] border border-slate-200 outline-none">
                                        <option value="">Select</option>
                                        {(attMedium === "Hindi" ? hindiClasses : attMedium === "English" ? englishClasses : []).map(c => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {attMedium && attClass && (
                            <div className="bg-white rounded-[24px] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col gap-3">
                                <h4 className="text-sm font-black text-slate-800 px-1">Students List</h4>
                                
                                {attendanceList.map((student, idx) => (
                                    <div key={student.id} className="flex flex-col gap-2 p-3 bg-slate-50 rounded-[16px] border border-slate-100">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200">
                                                    {student.photo_url ? (
                                                        <img src={student.photo_url} alt="avatar" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${student.name}&backgroundColor=transparent`} alt="avatar" className="w-full h-full object-cover bg-white" />
                                                    )}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-black text-slate-800 leading-tight">{student.name}</span>
                                                    <span className="text-[10px] font-bold text-slate-400">Roll: {student.roll}</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 bg-white p-1 rounded-xl shadow-sm border border-slate-100">
                                                <button 
                                                    onClick={() => setAttendanceList(prev => prev.map(s => s.id === student.id ? { ...s, status: "P" } : s))}
                                                    className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm transition-colors ${student.status === "P" ? "bg-emerald-500 text-white shadow-md" : "bg-slate-50 text-slate-400 hover:bg-emerald-50 hover:text-emerald-500"}`}
                                                >
                                                    P
                                                </button>
                                                <button 
                                                    onClick={() => setAttendanceList(prev => prev.map(s => s.id === student.id ? { ...s, status: "A" } : s))}
                                                    className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm transition-colors ${student.status === "A" ? "bg-red-500 text-white shadow-md" : "bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500"}`}
                                                >
                                                    A
                                                </button>
                                            </div>
                                        </div>

                                        {student.status === "A" && (
                                            <div className="mt-2 pt-3 border-t border-slate-200 flex flex-col gap-3 animate-fade-in">
                                                <div className="flex flex-col gap-1">
                                                    <label className="text-[10px] font-bold text-slate-500">Absence Reason</label>
                                                    <input 
                                                        type="text" 
                                                        placeholder="Enter reason..." 
                                                        value={student.reason}
                                                        onChange={(e) => setAttendanceList(prev => prev.map(s => s.id === student.id ? { ...s, reason: e.target.value } : s))}
                                                        className="w-full bg-white text-slate-700 text-xs font-bold p-2.5 rounded-[8px] border border-slate-200 outline-none" 
                                                    />
                                                </div>
                                                <div className="flex items-center justify-between bg-white p-2.5 rounded-[8px] border border-slate-200">
                                                    <span className="text-[10px] font-bold text-slate-500">Application Received?</span>
                                                    <div className="flex gap-1">
                                                        <button 
                                                            onClick={() => setAttendanceList(prev => prev.map(s => s.id === student.id ? { ...s, appReceived: "Yes" } : s))}
                                                            className={`px-3 py-1 rounded-md text-[10px] font-black transition-colors ${student.appReceived === "Yes" ? "bg-blue-500 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
                                                        >Yes</button>
                                                        <button 
                                                            onClick={() => setAttendanceList(prev => prev.map(s => s.id === student.id ? { ...s, appReceived: "No" } : s))}
                                                            className={`px-3 py-1 rounded-md text-[10px] font-black transition-colors ${student.appReceived === "No" ? "bg-slate-600 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
                                                        >No</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}

                                <button 
                                    disabled={isSubmittingAtt}
                                    onClick={async () => {
                                        if (!attDate) { alert('Please select a date'); return; }
                                        const unmarked = attendanceList.filter(s => s.status === null);
                                        if (unmarked.length > 0) { alert(`${unmarked.length} students not marked yet!`); return; }
                                        setIsSubmittingAtt(true);
                                        const records = attendanceList.map(s => ({
                                            student_id: s.id,
                                            date: attDate,
                                            status: s.status,
                                            reason: s.reason || null,
                                            marked_by: teacher?.id || null
                                        }));
                                        const { error } = await supabase.from('attendance').upsert(records, { onConflict: 'student_id,date' });
                                        setIsSubmittingAtt(false);
                                        if (error) { alert('Error saving: ' + error.message); }
                                        else { alert(`✅ Attendance saved for ${attDate}! ${attendanceList.filter(s=>s.status==='P').length}P / ${attendanceList.filter(s=>s.status==='A').length}A`); }
                                    }}
                                    className="w-full mt-4 py-4 bg-emerald-600 text-white rounded-[16px] font-black text-sm shadow-[0_8px_20px_rgba(16,185,129,0.3)] hover:bg-emerald-700 transition-colors disabled:opacity-50"
                                >
                                    {isSubmittingAtt ? 'Saving...' : `Submit Attendance (${attendanceList.filter(s=>s.status==='P').length}P / ${attendanceList.filter(s=>s.status==='A').length}A)`}
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "diary" && (
                    <div className="flex flex-col gap-4">
                        <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col gap-4">
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-2">
                                <div className="w-10 h-10 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center"><BookHeart size={20} /></div>
                                <div>
                                    <h3 className="text-base font-black text-slate-800 leading-tight">Write Diary Note</h3>
                                    <p className="text-[10px] font-bold text-slate-400">Assign homework to class diary</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[11px] font-bold text-slate-500 pl-1">Medium</label>
                                    <select value={diaryMedium} onChange={(e) => setDiaryMedium(e.target.value)} className="bg-slate-50 text-slate-700 text-xs font-bold p-3 rounded-[12px] border border-slate-200 outline-none">
                                        <option value="Hindi">Hindi Medium</option>
                                        <option value="Hinglish">Hinglish Medium</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[11px] font-bold text-slate-500 pl-1">Class</label>
                                    <select className="bg-slate-50 text-slate-700 text-xs font-bold p-3 rounded-[12px] border border-slate-200 outline-none">
                                        <option value="">Select Class</option>
                                        {(diaryMedium === "Hindi" ? ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"] : ["Nursery", "LKG", "UKG", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"]).map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[11px] font-bold text-slate-500 pl-1">Subject</label>
                                <select value={diarySubject} onChange={e => setDiarySubject(e.target.value)} className="bg-slate-50 text-slate-700 text-xs font-bold p-3 rounded-[12px] border border-slate-200 outline-none">
                                    <option>Math</option>
                                    <option>Hindi</option>
                                    <option>English</option>
                                    <option>Science</option>
                                    <option>SST</option>
                                    <option>Sanskrit</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[11px] font-bold text-slate-500 pl-1">Homework Detail</label>
                                <textarea value={diaryHomework} onChange={e => setDiaryHomework(e.target.value)} placeholder="Write detailed homework or diary note here..." rows={4} className="w-full bg-slate-50 text-slate-700 text-xs font-bold p-3 rounded-[12px] border border-slate-200 outline-none"></textarea>
                            </div>
                            <button disabled={isSubmitting} onClick={async () => {
                                if(!diaryHomework) { alert('Enter homework'); return; }
                                setIsSubmitting(true);
                                const { data, error } = await supabase.from('diary').insert({
                                    teacher_id: teacher.id,
                                    teacher_name: teacher.full_name,
                                    class: diaryClass || teacher.designated_class || 'All',
                                    subject: diarySubject,
                                    homework: diaryHomework,
                                    medium: diaryMedium
                                }).select('*').single();
                                setIsSubmitting(false);
                                if(error) alert(error.message);
                                else {
                                    alert('Diary updated!');
                                    setDiaryHomework('');
                                    setDiaryList([data, ...diaryList]);
                                }
                            }} className="w-full py-3.5 bg-amber-500 text-white rounded-[12px] font-black text-sm shadow-[0_4px_15px_rgba(245,158,11,0.3)] hover:bg-amber-600 transition-colors disabled:opacity-50">
                                {isSubmitting ? 'Sending...' : 'Send Diary Note'}
                            </button>

                            <div className="mt-4 pt-5 border-t border-slate-100">
                                <h4 className="text-[12px] font-black text-slate-800 mb-3 px-1">Recent Homework History</h4>
                                <div className="flex flex-col gap-3 animate-fade-in">
                                    {diaryList.map((d, i) => (
                                        <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col gap-1">
                                            <div className="flex justify-between items-center">
                                                <span className="text-[11px] font-black text-slate-800">Class {d.class} • {d.subject}</span>
                                                <span className="text-[9px] font-bold text-slate-400">{new Date(d.created_at).toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-[10px] font-bold text-slate-500">{d.homework}</p>
                                        </div>
                                    ))}
                                    {diaryList.length === 0 && <p className="text-[10px] text-slate-400 font-bold px-1 italic">No history found</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "grades" && (
                    <div className="flex flex-col gap-4">
                        <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col gap-4">
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-2">
                                <div className="w-10 h-10 bg-purple-50 text-purple-500 rounded-xl flex items-center justify-center"><GraduationCap size={20} /></div>
                                <div>
                                    <h3 className="text-base font-black text-slate-800 leading-tight">Update Grades</h3>
                                    <p className="text-[10px] font-bold text-slate-400">Add test & exam marks</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1.5 col-span-2">
                                    <label className="text-[11px] font-bold text-slate-500 pl-1">Select Test</label>
                                    <select value={gradesTest} onChange={(e) => setGradesTest(e.target.value)} className="w-full bg-slate-50 text-slate-700 text-sm font-bold p-3 rounded-[12px] border border-slate-200 outline-none">
                                        <option value="Unit Test 1">Unit Test 1</option>
                                        <option value="Unit Test 2">Unit Test 2</option>
                                        <option value="Half Yearly">Half Yearly</option>
                                        <option value="Final Exams">Final Exams</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[11px] font-bold text-slate-500 pl-1">Test Date</label>
                                    <input type="date" value={gradesDate} onChange={(e) => setGradesDate(e.target.value)} className="w-full bg-slate-50 text-slate-700 text-sm font-bold p-3 rounded-[12px] border border-slate-200 outline-none" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[11px] font-bold text-slate-500 pl-1">Total Marks</label>
                                    <input type="number" placeholder="e.g. 100" value={gradesTotal} onChange={(e) => setGradesTotal(e.target.value)} className="w-full bg-slate-50 text-slate-700 text-sm font-bold p-3 rounded-[12px] border border-slate-200 outline-none" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[11px] font-bold text-slate-500 pl-1">Medium</label>
                                    <select value={gradesMedium} onChange={(e) => setGradesMedium(e.target.value)} className="w-full bg-slate-50 text-slate-700 text-sm font-bold p-3 rounded-[12px] border border-slate-200 outline-none">
                                        <option value="">Select</option>
                                        <option value="Hindi">Hindi</option>
                                        <option value="English">English</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[11px] font-bold text-slate-500 pl-1">Class</label>
                                    <select value={gradesClass} onChange={(e) => setGradesClass(e.target.value)} className="w-full bg-slate-50 text-slate-700 text-sm font-bold p-3 rounded-[12px] border border-slate-200 outline-none">
                                        <option value="">Select</option>
                                        {(gradesMedium === "Hindi" ? hindiClasses : gradesMedium === "English" ? englishClasses : []).map(c => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {gradesTotal && gradesMedium && gradesClass && (
                            <div className="bg-white rounded-[24px] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col gap-3">
                                <div className="flex justify-between items-center px-1 mb-2">
                                    <h4 className="text-sm font-black text-slate-800">Students List ({gradesTest})</h4>
                                    <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-md">Out of {gradesTotal}</span>
                                </div>
                                
                                {attendanceList.map((student, idx) => (
                                    <div key={student.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-[16px] border border-slate-100">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200">
                                                <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${student.name}&backgroundColor=transparent`} alt="avatar" className="w-full h-full object-cover bg-white" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-black text-slate-800 leading-tight">{student.name}</span>
                                                <span className="text-[10px] font-bold text-slate-400">Roll: {student.roll}</span>
                                            </div>
                                        </div>
                                        <div className="w-20">
                                            <input type="number" data-id={student.id} data-name={student.name} placeholder="Marks" className="marks-input w-full bg-white text-slate-800 text-center text-sm font-black p-2.5 rounded-[10px] border border-slate-200 outline-none focus:border-purple-400 shadow-sm" />
                                        </div>
                                    </div>
                                ))}

                                <button disabled={isSubmitting} onClick={async () => {
                                    if(!gradesTotal) { alert('Enter total marks'); return; }
                                    setIsSubmitting(true);
                                    
                                    // Collect marks
                                    const inputs = document.querySelectorAll('.marks-input');
                                    const entries = Array.from(inputs).map((inp: any) => {
                                        return {
                                            student_id: inp.dataset.id,
                                            student_name: inp.dataset.name,
                                            class: gradesClass,
                                            medium: gradesMedium,
                                            exam_type: gradesTest,
                                            exam_name: gradesTest,
                                            subject: teacher?.subject || 'General',
                                            max_marks: Number(gradesTotal),
                                            marks_obtained: Number(inp.value || 0),
                                            exam_date: gradesDate || new Date().toISOString().split('T')[0],
                                            status: 'Published'
                                        };
                                    });

                                    const { error } = await supabase.from('exams').insert(entries);
                                    setIsSubmitting(false);
                                    if (error) alert(error.message);
                                    else { alert('Grades submitted successfully!'); }
                                }} className="w-full mt-4 py-4 bg-purple-600 text-white rounded-[16px] font-black text-sm shadow-[0_8px_20px_rgba(147,51,234,0.3)] hover:bg-purple-700 transition-colors disabled:opacity-50">
                                    {isSubmitting ? 'Saving...' : 'Submit Grades'}
                                </button>
                            </div>
                        )}

                        <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col gap-4 mt-2">
                            <h3 className="text-sm font-black text-slate-800">Recent Exam Grade Sheets</h3>
                            <div className="flex flex-col gap-2">
                                <label className="text-[11px] font-bold text-slate-500 pl-1">Select Class to View</label>
                                <select value={gradesHistoryClass} onChange={(e) => setGradesHistoryClass(e.target.value)} className="bg-slate-50 text-slate-700 text-xs font-bold p-3 rounded-[12px] border border-slate-200 outline-none focus:border-purple-300">
                                    <option value="">Select Class</option>
                                    <option value="10-A">Class 10-A</option>
                                    <option value="9-B">Class 9-B</option>
                                    <option value="8-C">Class 8-C</option>
                                </select>
                            </div>

                            {gradesHistoryClass && (
                                <div className="mt-3 overflow-x-auto rounded-[12px] border border-slate-100 animate-fade-in">
                                    <table className="w-full text-left bg-white">
                                        <thead className="bg-slate-50">
                                            <tr>
                                                <th className="p-3 text-[10px] font-black uppercase text-slate-500 whitespace-nowrap">Student Name</th>
                                                <th className="p-3 text-[10px] font-black uppercase text-slate-500 text-center">Marks</th>
                                                <th className="p-3 text-[10px] font-black uppercase text-slate-500 text-center">Grade</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {[
                                                { n: "Aryan Paliwal", m: "85/100", g: "A" },
                                                { n: "Bhavya Sharma", m: "92/100", g: "A+" },
                                                { n: "Chirag Singh", m: "65/100", g: "B" },
                                                { n: "Divya Patel", m: "45/100", g: "C" },
                                            ].map((s, i) => (
                                                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                                    <td className="p-3 text-xs font-bold text-slate-700 whitespace-nowrap">{s.n}</td>
                                                    <td className="p-3 text-xs font-bold text-slate-600 text-center">{s.m}</td>
                                                    <td className="p-3 text-xs font-black text-center">
                                                        <span className={`px-2 py-1 rounded-md ${s.g === 'A+' || s.g === 'A' ? 'bg-emerald-50 text-emerald-600' : s.g === 'B' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'}`}>{s.g}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === "insights" && (
                     <div className="flex flex-col gap-4">
                         <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col gap-4">
                             <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-2">
                                 <div className="w-10 h-10 bg-cyan-50 text-cyan-500 rounded-xl flex items-center justify-center"><LineChart size={20} /></div>
                                 <div>
                                     <h3 className="text-base font-black text-slate-800 leading-tight">Student Kundali (Insights)</h3>
                                     <p className="text-[10px] font-bold text-slate-400">Deep dive into student data</p>
                                 </div>
                             </div>
                             
                             <div className="flex gap-2">
                                 <select value={insightsMedium} onChange={(e) => setInsightsMedium(e.target.value)} className="flex-1 bg-slate-50 text-slate-700 text-xs font-bold p-3 rounded-[12px] border border-slate-200 outline-none">
                                     <option value="">Medium</option>
                                     <option value="Hindi">Hindi</option>
                                     <option value="English">English</option>
                                 </select>
                                 <select value={insightsClass} onChange={(e) => setInsightsClass(e.target.value)} className="flex-1 bg-slate-50 text-slate-700 text-xs font-bold p-3 rounded-[12px] border border-slate-200 outline-none">
                                     <option value="">Class</option>
                                     {(insightsMedium === "Hindi" ? hindiClasses : insightsMedium === "English" ? englishClasses : []).map(c => (
                                         <option key={c} value={c}>{c}</option>
                                     ))}
                                 </select>
                             </div>
                             <input type="text" value={insightsRoll} onChange={(e) => setInsightsRoll(e.target.value)} placeholder="Enter Roll No or Name" className="w-full bg-slate-50 text-slate-700 text-sm font-bold p-3.5 rounded-[12px] border border-slate-200 outline-none focus:border-cyan-400 focus:bg-white" />
                             
                             <button onClick={() => setShowInsightResult(true)} className="w-full py-3.5 bg-cyan-600 text-white rounded-[12px] font-black text-sm shadow-[0_4px_15px_rgba(8,145,178,0.3)] hover:bg-cyan-700 transition-colors flex items-center justify-center gap-2">
                                 <Search size={16} /> Find Details
                             </button>
                         </div>

                         {showInsightResult && (
                             <div className="bg-white rounded-[24px] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-slate-100 flex flex-col gap-4 relative overflow-hidden animate-fade-in">
                                 <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-50 rounded-full blur-3xl -mr-10 -mt-10"></div>
                                 <div className="flex items-center gap-4 relative z-10 border-b border-slate-100 pb-4">
                                     <div className="w-16 h-16 rounded-full overflow-hidden border-[3px] border-cyan-100 shadow-sm bg-slate-50">
                                         <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${insightsRoll || 'Aryan'}&backgroundColor=transparent`} className="w-full h-full object-cover" />
                                     </div>
                                     <div>
                                         <h2 className="text-xl font-black text-slate-800">{insightsRoll || 'Aryan Paliwal'}</h2>
                                         <span className="text-[11px] font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100 mt-1 inline-block">Class {insightsClass || '10-A'} • Roll: {insightsRoll || '101'}</span>
                                     </div>
                                 </div>

                                 <div className="grid grid-cols-2 gap-3 relative z-10">
                                     <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-4 rounded-[16px] border border-cyan-100 flex flex-col items-center text-center shadow-[inset_0_2px_10px_rgba(255,255,255,0.5)]">
                                         <span className="text-3xl font-black text-cyan-600 drop-shadow-sm">89%</span>
                                         <span className="text-[10px] font-bold text-cyan-700/70 uppercase tracking-wider mt-1">Attendance</span>
                                     </div>
                                     <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 p-4 rounded-[16px] border border-purple-100 flex flex-col items-center text-center shadow-[inset_0_2px_10px_rgba(255,255,255,0.5)]">
                                         <span className="text-3xl font-black text-purple-600 drop-shadow-sm">A+</span>
                                         <span className="text-[10px] font-bold text-purple-700/70 uppercase tracking-wider mt-1">Overall Grade</span>
                                     </div>
                                     <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-[16px] border border-amber-100 flex flex-col items-center text-center shadow-[inset_0_2px_10px_rgba(255,255,255,0.5)]">
                                         <span className="text-3xl font-black text-amber-600 drop-shadow-sm">450</span>
                                         <span className="text-[10px] font-bold text-amber-700/70 uppercase tracking-wider mt-1">Sanskar Coins</span>
                                     </div>
                                     <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-[16px] border border-emerald-100 flex flex-col items-center text-center shadow-[inset_0_2px_10px_rgba(255,255,255,0.5)]">
                                         <span className="text-3xl font-black text-emerald-600 drop-shadow-sm">Paid</span>
                                         <span className="text-[10px] font-bold text-emerald-700/70 uppercase tracking-wider mt-1">Fee Status</span>
                                     </div>
                                 </div>

                                 <div className="mt-2 relative z-10">
                                     <h4 className="text-[11px] font-black text-slate-800 mb-2 uppercase tracking-wider flex items-center gap-1.5"><BadgeCheck size={14} className="text-cyan-500" /> Behavioral Note</h4>
                                     <p className="text-xs font-bold text-slate-600 bg-slate-50 p-4 rounded-[16px] border border-slate-100 leading-relaxed shadow-sm">
                                         Excellent performance in academics. Needs to participate more in extracurricular activities. Very disciplined and attentive in class. Shows great leadership skills.
                                     </p>
                                 </div>
                             </div>
                         )}
                     </div>
                )}

                {activeTab === "chat" && (
                    <div className="bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col overflow-hidden h-[calc(100vh-180px)]">
                        {activeChat ? (
                            <div className="flex flex-col h-full animate-fade-in">
                                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white shadow-sm z-10">
                                    <div className="flex items-center gap-3">
                                        <button onClick={() => setActiveChat(null)} className="w-8 h-8 flex items-center justify-center bg-slate-50 rounded-full hover:bg-slate-100"><ArrowLeft size={18} className="text-slate-600" /></button>
                                        <div className="flex flex-col">
                                            <span className="font-black text-slate-800 text-sm">{activeChat}</span>
                                            <span className="text-[9px] font-bold text-emerald-500 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Online</span>
                                        </div>
                                    </div>
                                    <button className="w-10 h-10 rounded-full bg-pink-50 text-pink-500 flex items-center justify-center hover:bg-pink-100 transition-colors shadow-sm"><PhoneCall size={18} /></button>
                                </div>
                                <div className="flex-1 bg-[#F8FAFC] p-4 pb-24 overflow-y-auto flex flex-col gap-3">
                                    <div className="self-center text-[10px] font-bold text-slate-400 bg-slate-200/50 px-3 py-1 rounded-full">Today</div>
                                    <div className="bg-white p-3 rounded-[16px] rounded-tl-none border border-slate-100 shadow-sm self-start max-w-[80%]">
                                        <p className="text-xs font-bold text-slate-700">Has he submitted the maths assignment?</p>
                                        <span className="text-[9px] font-bold text-slate-400 mt-1 block">10:45 AM</span>
                                    </div>
                                    <div className="bg-pink-500 p-3 rounded-[16px] rounded-tr-none shadow-[0_4px_10px_rgba(236,72,153,0.3)] self-end max-w-[80%]">
                                        <p className="text-xs font-bold text-white">Yes, he submitted it yesterday. The performance was good.</p>
                                        <span className="text-[9px] font-bold text-pink-200 mt-1 block text-right">10:48 AM</span>
                                    </div>
                                </div>
                                <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] flex gap-2 items-center z-50">
                                    <div className="w-full max-w-md lg:max-w-2xl mx-auto flex gap-2 items-center">
                                        <input type="text" placeholder="Type a message..." className="flex-1 bg-slate-50 text-slate-700 text-xs font-bold p-3.5 rounded-full border border-slate-200 outline-none focus:border-pink-300 shadow-inner" />
                                        <button className="w-12 h-12 shrink-0 bg-pink-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-pink-600 transition-all active:scale-95"><Send size={18} className="ml-1" /></button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-pink-50/50">
                                    <h3 className="text-base font-black text-slate-800">Parent/Student Chat</h3>
                                    <Search size={18} className="text-slate-400" />
                                </div>
                                <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1 custom-scrollbar">
                                    {[
                                        { name: "Aryan's Father", role: "Parent", msg: "Has he submitted the maths assignment?", time: "10:45 AM", unread: 2 },
                                        { name: "Bhavya Sharma", role: "Student", msg: "Sir, I have a doubt in chapter 4.", time: "Yesterday", unread: 0 },
                                        { name: "Chirag's Mother", role: "Parent", msg: "He will be on leave tomorrow.", time: "Mon", unread: 0 },
                                    ].map((c, i) => (
                                        <div key={i} onClick={() => setActiveChat(c.name)} className="flex items-center gap-3 p-3 rounded-[16px] cursor-pointer hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors">
                                            <div className="w-12 h-12 rounded-full bg-slate-100 overflow-hidden border border-slate-200 shrink-0">
                                                <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${c.name}&backgroundColor=transparent`} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                                                <div className="flex justify-between items-center mb-0.5">
                                                    <span className="text-sm font-black text-slate-800 truncate pr-2">{c.name}</span>
                                                    <span className={`text-[9px] font-black shrink-0 ${c.unread ? 'text-pink-600' : 'text-slate-400'}`}>{c.time}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[8px] font-black bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-[4px] uppercase tracking-wider">{c.role}</span>
                                                    <span className={`text-xs truncate ${c.unread ? 'font-bold text-slate-700' : 'font-medium text-slate-500'}`}>{c.msg}</span>
                                                </div>
                                            </div>
                                            {c.unread > 0 && <div className="w-5 h-5 bg-pink-500 text-white text-[10px] font-black flex items-center justify-center rounded-full shrink-0 shadow-sm">{c.unread}</div>}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                )}

                {activeTab === "meetings" && (
                    <div className="flex flex-col gap-4">
                        <h3 className="text-sm font-black text-slate-800 mb-1">Upcoming Meetings (From Principal)</h3>
                        <div className="bg-orange-50 border border-orange-100 rounded-[20px] p-5 relative overflow-hidden shadow-sm">
                            <div className="absolute right-0 top-0 w-24 h-24 bg-white/40 rounded-full blur-2xl"></div>
                            <span className="bg-orange-500 text-white text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-wider shadow-sm mb-3 inline-block">Scheduled</span>
                            <h4 className="text-base font-black text-orange-900 leading-tight mb-2">Monthly Teacher's Review Meeting</h4>
                            <div className="flex flex-col gap-1.5 mt-4">
                                <div className="flex items-center gap-2 text-[11px] font-bold text-orange-800"><Calendar size={14} /> Date: 28 Nov 2026</div>
                                <div className="flex items-center gap-2 text-[11px] font-bold text-orange-800"><Clock size={14} /> Time: 02:00 PM - 03:30 PM</div>
                                <div className="flex items-center gap-2 text-[11px] font-bold text-orange-800"><MapPin size={14} /> Venue: Conference Room A</div>
                            </div>
                        </div>

                        <h3 className="text-sm font-black text-slate-800 mb-1 mt-3">Previous Meetings</h3>
                        <div className="bg-white rounded-[16px] p-4 border border-slate-100 shadow-sm flex flex-col gap-1">
                            <h4 className="text-sm font-black text-slate-800">Exam Preparation Strategy</h4>
                            <p className="text-[10px] font-bold text-slate-500">Discussed the upcoming half-yearly syllabus and paper patterns.</p>
                            <span className="text-[9px] font-black text-slate-400 mt-2">Held on: 10 Oct 2026</span>
                        </div>
                    </div>
                )}

                {activeTab === "events" && (
                    <div className="flex flex-col gap-4">
                        <div className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-[24px] p-6 border border-teal-100 shadow-lg text-left text-white relative overflow-hidden">
                            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                                    <PartyPopper size={24} className="text-white" />
                                </div>
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-2 py-1 rounded-md">Upcoming Event</span>
                                    <h3 className="text-xl font-black mt-1">Annual Day 2026</h3>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3 mb-5">
                                <div className="bg-black/10 rounded-xl p-3 backdrop-blur-sm">
                                    <span className="text-[9px] font-bold text-teal-100 uppercase tracking-widest block mb-1">Date & Time</span>
                                    <span className="text-[11px] font-black">15 Nov 2026, 10:00 AM</span>
                                </div>
                                <div className="bg-black/10 rounded-xl p-3 backdrop-blur-sm">
                                    <span className="text-[9px] font-bold text-teal-100 uppercase tracking-widest block mb-1">Dress Code</span>
                                    <span className="text-[11px] font-black">Traditional Attire</span>
                                </div>
                            </div>
                            <p className="text-xs font-medium text-teal-50 leading-relaxed mb-5">Join us for the biggest cultural festival of the year! There will be dance performances, award ceremonies, and amazing food stalls set up by our students.</p>
                            <button className="w-full bg-white text-teal-700 text-xs font-black py-3.5 rounded-xl shadow-md hover:bg-teal-50 transition-colors">RSVP / Full Details</button>
                        </div>
                        <h3 className="text-sm font-black text-slate-800 mt-2">Events Gallery</h3>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="h-32 bg-slate-200 rounded-[16px] overflow-hidden"><img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" /></div>
                            <div className="h-32 bg-slate-200 rounded-[16px] overflow-hidden"><img src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" /></div>
                        </div>
                    </div>
                )}

                {activeTab === "timetable" && (
                    <div className="flex flex-col gap-4 animate-fade-in">
                        <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-[32px] p-8 text-white shadow-[0_10px_30px_rgba(244,63,94,0.3)] relative overflow-hidden flex flex-col items-center text-center">
                            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
                            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-pink-400/40 rounded-full blur-3xl"></div>
                            
                            <div className="relative z-10 flex flex-col items-center">
                                <div className="w-20 h-20 bg-white/20 rounded-[24px] flex items-center justify-center backdrop-blur-md border border-white/30 shadow-inner mb-5">
                                    <Calendar size={40} className="text-white drop-shadow-md" />
                                </div>
                                <h2 className="text-3xl font-black mb-2 tracking-tight drop-shadow-sm">Master Time Table</h2>
                                <p className="text-xs font-bold text-rose-100 mb-8 max-w-[80%] leading-relaxed">
                                    Access the complete schedule for Class {teacher?.designated_class || 'All'} all in one place.
                                </p>
                                {routineList.length > 0 ? (
                                <a href={routineList[0].pdf_url || routineList[0].file_url || '#'} target="_blank" className="bg-white text-rose-600 px-8 py-4 rounded-full font-black text-sm shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,0,0,0.2)] transition-all duration-300 flex items-center gap-2">
                                    <Download size={18} /> Download HD PDF
                                </a>
                                ) : (
                                <span className="bg-white/20 text-white px-8 py-4 rounded-full font-black text-sm">Time Table not uploaded yet</span>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "exams" && (
                    <div className="flex flex-col gap-4">
                        <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col gap-4">
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-2">
                                <div className="w-10 h-10 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center"><FileText size={20} /></div>
                                <div>
                                    <h3 className="text-base font-black text-slate-800 leading-tight">Set New Exam</h3>
                                    <p className="text-[10px] font-bold text-slate-400">Configure exam syllabus & timings</p>
                                </div>
                            </div>

                            <input type="text" placeholder="Exam Name (e.g. Unit Test 3)" className="w-full bg-slate-50 text-slate-700 text-sm font-bold p-3.5 rounded-[12px] border border-slate-200 outline-none" />
                            <div className="grid grid-cols-2 gap-3">
                                <input type="date" className="bg-slate-50 text-slate-700 text-sm font-bold p-3.5 rounded-[12px] border border-slate-200 outline-none" />
                                <input type="time" className="bg-slate-50 text-slate-700 text-sm font-bold p-3.5 rounded-[12px] border border-slate-200 outline-none" />
                                <select className="bg-slate-50 text-slate-700 text-sm font-bold p-3.5 rounded-[12px] border border-slate-200 outline-none">
                                    <option>Medium</option>
                                    <option>Hindi</option>
                                    <option>English</option>
                                </select>
                                <select className="bg-slate-50 text-slate-700 text-sm font-bold p-3.5 rounded-[12px] border border-slate-200 outline-none">
                                    <option>Class</option>
                                    <option>10-A</option>
                                </select>
                            </div>
                            <input type="number" placeholder="Total Marks" className="w-full bg-slate-50 text-slate-700 text-sm font-bold p-3.5 rounded-[12px] border border-slate-200 outline-none" />
                            <textarea placeholder="Enter Syllabus Detailed..." rows={3} className="w-full bg-slate-50 text-slate-700 text-sm font-bold p-3.5 rounded-[12px] border border-slate-200 outline-none"></textarea>
                            <button className="w-full py-4 bg-indigo-600 text-white rounded-[16px] font-black text-sm shadow-[0_8px_20px_rgba(79,70,229,0.3)] hover:bg-indigo-700 transition-colors">Submit Exam Details</button>
                        </div>
                        
                        <h3 className="text-sm font-black text-slate-800 mt-2">Previous Exams Set</h3>
                        <div className="bg-white p-4 rounded-[16px] border border-slate-100 shadow-sm flex justify-between items-center">
                            <div>
                                <h4 className="text-sm font-black text-slate-800">Half Yearly</h4>
                                <p className="text-[10px] font-bold text-slate-400">Class 10-A • Hindi</p>
                            </div>
                            <button className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-md">View</button>
                        </div>
                    </div>
                )}

                {activeTab === "notes" && (
                    <div className="flex flex-col gap-4">
                        <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col gap-4">
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-2">
                                <div className="w-10 h-10 bg-sky-50 text-sky-500 rounded-xl flex items-center justify-center"><StickyNote size={20} /></div>
                                <div>
                                    <h3 className="text-base font-black text-slate-800 leading-tight">Send Notes to Students</h3>
                                    <p className="text-[10px] font-bold text-slate-400">Distribute study material</p>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3">
                                <select value={notesMedium} onChange={(e) => setNotesMedium(e.target.value)} className="bg-slate-50 text-slate-700 text-xs font-bold p-3.5 rounded-[12px] border border-slate-200 outline-none focus:border-sky-300">
                                    <option value="">Medium</option>
                                    <option value="Hindi">Hindi</option>
                                    <option value="English">English</option>
                                </select>
                                <select value={notesClass} onChange={(e) => setNotesClass(e.target.value)} className="bg-slate-50 text-slate-700 text-xs font-bold p-3.5 rounded-[12px] border border-slate-200 outline-none focus:border-sky-300">
                                    <option value="">Class</option>
                                    {(notesMedium === "Hindi" ? hindiClasses : notesMedium === "English" ? englishClasses : []).map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>

                            {notesMedium && notesClass && (
                                <select value={notesStudent} onChange={(e) => setNotesStudent(e.target.value)} className="w-full bg-slate-50 text-slate-700 text-xs font-bold p-3.5 rounded-[12px] border border-slate-200 outline-none focus:border-sky-300 animate-fade-in">
                                    <option value="All">All Students</option>
                                    {attendanceList.map(s => (
                                        <option key={s.id} value={s.id}>{s.name} ({s.roll})</option>
                                    ))}
                                </select>
                            )}

                            <input type="text" placeholder="Note Title / Chapter Name" className="w-full bg-slate-50 text-slate-700 text-sm font-bold p-3.5 rounded-[12px] border border-slate-200 outline-none focus:border-sky-300" />
                            
                            <div className="border-2 border-dashed border-sky-200 rounded-[16px] p-6 flex flex-col items-center justify-center text-center bg-sky-50/50 cursor-pointer hover:bg-sky-50 transition-colors">
                                <Upload size={24} className="text-sky-500 mb-2" />
                                <span className="text-xs font-black text-slate-600">Upload PDF / Images</span>
                                <span className="text-[9px] font-bold text-slate-400 mt-1">Max size 10MB</span>
                            </div>
                            <button className="w-full py-4 bg-sky-500 text-white rounded-[16px] font-black text-sm shadow-[0_8px_20px_rgba(14,165,233,0.3)] hover:bg-sky-600 transition-colors flex items-center justify-center gap-2 mt-2">
                                <Send size={18} /> Send Notes
                            </button>
                        </div>

                        <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col gap-4 mt-2">
                            <h3 className="text-sm font-black text-slate-800">Previous Notes</h3>
                            <div className="flex flex-col gap-2 mb-2">
                                <label className="text-[10px] font-bold text-slate-500 pl-1">Filter by Custom Date</label>
                                <input type="date" value={notesDate} onChange={(e) => setNotesDate(e.target.value)} className="bg-slate-50 text-slate-700 text-xs font-bold p-2.5 rounded-[12px] border border-slate-200 outline-none w-max focus:border-sky-300" />
                            </div>

                            {notesDate ? (
                                <div className="flex flex-col gap-3 animate-fade-in">
                                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-sky-100 text-sky-500 rounded-lg flex items-center justify-center"><FileText size={18} /></div>
                                            <div className="flex flex-col">
                                                <span className="text-[11px] font-black text-slate-800">Chapter 4 - Metals</span>
                                                <span className="text-[9px] font-bold text-slate-400">Class 10-A • {notesDate}</span>
                                            </div>
                                        </div>
                                        <button className="text-[10px] font-black text-sky-600 hover:underline">View PDF</button>
                                    </div>
                                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-sky-100 text-sky-500 rounded-lg flex items-center justify-center"><FileText size={18} /></div>
                                            <div className="flex flex-col">
                                                <span className="text-[11px] font-black text-slate-800">Gravity Revision Sheet</span>
                                                <span className="text-[9px] font-bold text-slate-400">Class 9-B • {notesDate}</span>
                                            </div>
                                        </div>
                                        <button className="text-[10px] font-black text-sky-600 hover:underline">View PDF</button>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-[10px] text-slate-400 font-bold px-1 italic">Select a date to view past notes</p>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === "updates" && (
                    <div className="flex flex-col gap-4">
                        <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col gap-4">
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-2">
                                <div className="w-10 h-10 bg-yellow-50 text-yellow-500 rounded-xl flex items-center justify-center"><BellRing size={20} /></div>
                                <div>
                                    <h3 className="text-base font-black text-slate-800 leading-tight">Post Update</h3>
                                    <p className="text-[10px] font-bold text-slate-400">Announcements & notices</p>
                                </div>
                            </div>

                            <div className="flex bg-slate-100 p-1 rounded-[14px] w-full mb-2">
                                <button onClick={()=>setUpdateTarget("School")} className={`flex-1 text-[11px] font-black py-2.5 rounded-[10px] transition-all ${updateTarget === 'School' ? 'bg-white text-yellow-600 shadow-sm' : 'text-slate-500 hover:bg-slate-200/50'}`}>To School</button>
                                <button onClick={()=>setUpdateTarget("Class")} className={`flex-1 text-[11px] font-black py-2.5 rounded-[10px] transition-all ${updateTarget === 'Class' ? 'bg-white text-yellow-600 shadow-sm' : 'text-slate-500 hover:bg-slate-200/50'}`}>To Class</button>
                            </div>

                            {updateTarget === "Class" && (
                                <div className="grid grid-cols-2 gap-3 animate-fade-in">
                                    <select className="bg-slate-50 text-slate-700 text-xs font-bold p-3.5 rounded-[12px] border border-slate-200 outline-none focus:border-yellow-300">
                                        <option>Medium</option>
                                        <option>Hindi</option>
                                        <option>English</option>
                                    </select>
                                    <select className="bg-slate-50 text-slate-700 text-xs font-bold p-3.5 rounded-[12px] border border-slate-200 outline-none focus:border-yellow-300">
                                        <option>Class 10-A</option>
                                        <option>Class 9-B</option>
                                    </select>
                                </div>
                            )}

                            <textarea placeholder="Write announcement for students..." rows={5} className="w-full bg-slate-50 text-slate-700 text-sm font-bold p-4 rounded-[16px] border border-slate-200 outline-none focus:border-yellow-300"></textarea>
                            <button className="w-full py-4 bg-yellow-500 text-white rounded-[16px] font-black text-sm shadow-[0_8px_20px_rgba(234,179,8,0.3)] hover:bg-yellow-600 transition-colors">Publish Update</button>
                        </div>
                        
                        <h3 className="text-sm font-black text-slate-800 mt-2">From Principal</h3>
                        <div className="bg-white p-4 rounded-[16px] border border-slate-100 shadow-sm flex flex-col gap-1">
                            <span className="text-[9px] font-black text-red-500 bg-red-50 w-max px-2 py-0.5 rounded-md mb-1 border border-red-100">Important</span>
                            <h4 className="text-sm font-black text-slate-800">Submit syllabus status</h4>
                            <p className="text-[10px] font-bold text-slate-500">All teachers must submit their syllabus completion report by Friday.</p>
                        </div>
                    </div>
                )}

                {activeTab === "salary" && (
                    <div className="flex flex-col gap-4">
                        <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-[32px] p-8 text-white shadow-[0_10px_30px_rgba(16,185,129,0.3)] relative overflow-hidden">
                            <div className="absolute right-0 bottom-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                            <span className="text-[11px] font-black text-emerald-100 uppercase tracking-wider relative z-10">Total Salary (This Month)</span>
                            <h2 className="text-5xl font-black text-white relative z-10 mt-2 mb-8 tracking-tighter">₹ 45,000</h2>
                            
                            <div className="flex justify-between items-center border-t border-emerald-400/50 pt-5 relative z-10">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-emerald-100 uppercase tracking-widest mb-1">Received</span>
                                    <span className="text-xl font-black text-white">₹ 45,000</span>
                                </div>
                                <div className="w-px h-10 bg-emerald-400/50 mx-4"></div>
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] font-bold text-emerald-100 uppercase tracking-widest mb-1">Remaining</span>
                                    <span className="text-xl font-black text-white">₹ 0</span>
                                </div>
                            </div>
                        </div>

                        <h3 className="text-sm font-black text-slate-800 mt-2">Past 6 Months Payslips</h3>
                        <div className="flex flex-col gap-2">
                            {[
                                { month: "October 2026", date: "1st Nov 2026", amt: "₹ 45,000" },
                                { month: "September 2026", date: "1st Oct 2026", amt: "₹ 45,000" },
                                { month: "August 2026", date: "1st Sep 2026", amt: "₹ 45,000" },
                                { month: "July 2026", date: "1st Aug 2026", amt: "₹ 42,000" },
                                { month: "June 2026", date: "1st Jul 2026", amt: "₹ 42,000" },
                                { month: "May 2026", date: "1st Jun 2026", amt: "₹ 42,000" },
                            ].map((pay, i) => (
                                <div key={i} className="bg-white p-4 rounded-[20px] border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex justify-between items-center hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center shrink-0 border border-emerald-100"><WalletCards size={20} /></div>
                                        <div className="flex flex-col">
                                            <h4 className="text-sm font-black text-slate-800">{pay.month}</h4>
                                            <p className="text-[10px] font-bold text-slate-400 mt-0.5">Credited on {pay.date}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-sm font-black text-slate-800">{pay.amt}</span>
                                        <button className="text-[9px] font-black text-emerald-600 mt-1 flex items-center gap-1 hover:text-emerald-700">
                                            <Download size={10} /> PDF
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans flex flex-col selection:bg-amber-400 selection:text-white">
      <main className="flex-1 w-full max-w-md lg:max-w-2xl mx-auto min-h-screen bg-white shadow-[0_0_40px_rgba(0,0,0,0.02)] relative flex flex-col">
          <HomeHeader />
          {renderContent()}
          {activeTab !== "chat" && (
              <div className="mt-auto pt-6 pb-6 flex flex-col items-center justify-center text-center bg-white">
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
      </main>
    </div>
  );
}
