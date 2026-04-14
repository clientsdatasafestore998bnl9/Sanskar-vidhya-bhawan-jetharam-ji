"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  User,
  BarChart3, 
  CheckSquare, 
  PlusCircle, 
  MessageSquare, 
  Settings,
  Bell,
  Search,
  ChevronRight,
  MoreVertical,
  BookMarked,
  Filter,
  Clock,
  Calendar,
  ClipboardList,
  ChevronLeft,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Download,
  Printer,
  FileText,
  AlertCircle,
  Plus,
  Trash2,
  Save,
  UserCheck,
  UserX,
  UserPlus,
  Eye,
  Info,
  CalendarDays,
  Target
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type TabType = "overview" | "classes" | "attendance" | "diary" | "gradebook" | "inspector" | "register" | "messages";

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [selectedClass, setSelectedClass] = useState("Grade 10-A");
  const [selectedMedium, setSelectedMedium] = useState("English");
  const [selectedDate, setSelectedDate] = useState("2026-04-12");
  const [searchQuery, setSearchQuery] = useState("");

  // --- STATE FOR MODALS/OVERLAYS ---
  const [showAbsenceModal, setShowAbsenceModal] = useState<{show: boolean, studentId: string | null}>({ show: false, studentId: null });
  const [showGradeModal, setShowGradeModal] = useState<{show: boolean, student: any | null}>({ show: false, student: null });
  const [registrationWarning, setRegistrationWarning] = useState(false);

  // --- LIFTED STATES FOR SUB-COMPONENTS (Prevents Hook Order Error on Tab Switch) ---
  const [searchRoll, setSearchRoll] = useState("");
  const [searchClass, setSearchClass] = useState("Grade 10-A");
  const [foundStudent, setFoundStudent] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', roll: '', class: 'Grade 10-A', medium: 'English', date: '' });


  // --- MOCK DATA ---
  const classes = [
    { id: "10A", name: "Grade 10-A", strength: 42, subject: "Mathematics", nextClass: "08:15 AM", medium: "English" },
    { id: "11B", name: "Grade 11-B", strength: 38, subject: "Algebra", nextClass: "10:30 AM", medium: "Hindi" },
    { id: "9C", name: "Grade 9-C", strength: 45, subject: "Geometry", nextClass: "12:15 PM", medium: "English" },
    { id: "12A", name: "Grade 12-A", strength: 35, subject: "Calculus", nextClass: "01:45 PM", medium: "English" }
  ];

  const [students, setStudents] = useState([
    { id: "S001", name: "Aryan Paliwal", roll: 12, status: "P", class: "Grade 10-A", medium: "English", reason: "", marks: 0, admissionDate: "2023-07-15" },
    { id: "S002", name: "Priya Gupta", roll: 24, status: "P", class: "Grade 10-A", medium: "English", reason: "", marks: 0, admissionDate: "2023-07-16" },
    { id: "S003", name: "Rahul Soni", roll: 35, status: "A", class: "Grade 10-A", medium: "English", reason: "Sick", marks: 0, admissionDate: "2023-07-20" },
    { id: "S004", name: "Ankit Jain", roll: 8, status: "P", class: "Grade 11-B", medium: "Hindi", reason: "", marks: 0, admissionDate: "2023-08-01" },
    { id: "S005", name: "Sanya Roy", roll: 19, status: "P", class: "Grade 10-A", medium: "English", reason: "", marks: 0, admissionDate: "2023-07-22" },
    { id: "S006", name: "Swaroop", roll: 41, status: "P", class: "Grade 10-A", medium: "English", reason: "", marks: 0, admissionDate: "2023-07-25" },
  ]);

  const homeworkHistory = [
    { id: 1, class: "Grade 10-A", subject: "Maths", title: "Exercise 5.4", date: "2026-04-12", medium: "English", status: "Active" },
    { id: 2, class: "Grade 11-B", subject: "Algebra", title: "Linear Equations", date: "2026-04-11", medium: "Hindi", status: "Closed" },
  ];

  const leaveRequests = [
    { id: 1, name: "Rahul Soni", req: "Sick Leave", date: "Today", msg: "High fever since morning.", status: "Pending" },
    { id: 2, name: "Sanya Roy", req: "Family Event", date: "Yesterday", msg: "Going out of town for weddings.", status: "Approved" },
  ];

  // --- LOGIC ---
  const filteredStudents = useMemo(() => {
    return students.filter(s => s.class === selectedClass && s.medium === selectedMedium);
  }, [students, selectedClass, selectedMedium]);

  const toggleAttendance = (id: string) => {
    setStudents(prev => prev.map(s => {
      if (s.id === id) {
        const newStatus = s.status === "P" ? "A" : "P";
        if (newStatus === "A") {
            setShowAbsenceModal({ show: true, studentId: id });
        }
        return { ...s, status: newStatus, reason: "" };
      }
      return s;
    }));
  };

  const handleReasonSubmit = (reason: string) => {
    if (showAbsenceModal.studentId) {
        setStudents(prev => prev.map(s => s.id === showAbsenceModal.studentId ? { ...s, reason } : s));
        setShowAbsenceModal({ show: false, studentId: null });
    }
  };

  const checkDuplicate = (roll: number, grade: string) => {
    const exists = students.some(s => s.roll === roll && s.class === grade);
    setRegistrationWarning(exists);
  };

  // --- SUB-COMPONENTS ---

  const Sidebar = () => (
    <aside className="w-80 bg-slate-800/5 backdrop-blur-2xl text-slate-100 hidden lg:flex border-r border-slate-700 flex-col p-10 fixed h-full z-20 shadow-2xl overflow-y-auto scrollbar-hide">
        <div className="flex items-center gap-4 mb-16">
            <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center p-2 shadow-xl shadow-black/40">
                <Image src="/logo.png" alt="Logo" width={40} height={40} />
            </div>
            <div className="flex flex-col">
                <span className="font-black text-sm tracking-tighter leading-tight uppercase">SVB Portal</span>
                <span className="font-bold text-[9px] tracking-[.3em] uppercase text-accent">Faculty Suite</span>
            </div>
        </div>

        <nav className="flex flex-col gap-3">
          {[
            { id: "overview", name: "Dashboard", icon: BarChart3 },
            { id: "classes", name: "My Classes", icon: BookMarked },
            { id: "attendance", name: "Attendance Manager", icon: CheckSquare },
            { id: "diary", name: "Digital Diary", icon: PlusCircle },
            { id: "gradebook", name: "Gradebook portal", icon: ClipboardList },
            { id: "inspector", name: "Student Inspector", icon: Eye },
            { id: "register", name: "Admissions", icon: UserPlus },
            { id: "messages", name: "Requests Hub", icon: MessageSquare },
          ].map((item) => (
            <button
                key={item.id}
                onClick={() => setActiveTab(item.id as TabType)}
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all group ${
                    activeTab === item.id 
                    ? "bg-accent text-primary shadow-2xl shadow-accent/20" 
                    : "text-slate-300 hover:bg-slate-800/10 hover:text-slate-100"
                }`}
            >
                <item.icon size={18} className={activeTab === item.id ? "text-slate-300" : "text-white/50 group-hover:text-white transition-colors"} />
                {item.name}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-slate-700">
             <Link href="/" className="flex items-center gap-4 px-6 py-4 text-slate-300 hover:text-slate-100 transition-colors group">
                <LogOutIcon size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest">Sign Out</span>
            </Link>
        </div>
    </aside>
  );

  
  const MobileNav = () => (
    <div className="lg:hidden fixed bottom-3 left-3 right-3 bg-slate-800 border border-slate-700 rounded-[28px] p-2 flex items-center shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-50 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-1 min-w-max mx-auto px-1">
            {[
                { id: "overview", icon: BarChart3, label: "Home" },
                { id: "attendance", icon: CheckSquare, label: "Call" },
                { id: "gradebook", icon: ClipboardList, label: "Grades" },
                { id: "diary", icon: PlusCircle, label: "Diary" },
                { id: "inspector", icon: Eye, label: "Insights" },
                { id: "register", icon: UserPlus, label: "Admit" },
                { id: "messages", icon: MessageSquare, label: "Hub" },
            ].map((item) => (
                <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as TabType)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all min-w-[70px] ${
                        activeTab === item.id 
                        ? "bg-accent/10 border border-accent/20 text-accent shadow-lg scale-105" 
                        : "text-slate-300 hover:text-slate-100 hover:bg-slate-800"
                    }`}
                >
                    <item.icon size={20} className={activeTab === item.id ? "drop-shadow-[0_0_8px_rgba(var(--accent),0.8)]" : ""} strokeWidth={activeTab === item.id ? 2.5 : 2} />
                    <span className="text-[9px] font-black uppercase tracking-widest">{item.label}</span>
                </button>
            ))}
        </div>
    </div>
  );

  const FormFilters = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 bg-slate-800 p-6 lg:p-8 rounded-[24px] lg:rounded-[32px] border border-slate-700 shadow-xl mb-6 lg:mb-10">
        <div className="flex flex-col gap-1.5 lg:gap-2">
            <label className="text-[9px] font-black uppercase tracking-widest text-slate-300 pl-1">Target Date</label>
            <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3.5 lg:p-4 text-xs font-black uppercase focus:ring-2 focus:ring-accent text-slate-100 shadow-sm outline-none transition-all" style={{ colorScheme: 'light' }} />
        </div>
        <div className="flex flex-col gap-1.5 lg:gap-2">
            <label className="text-[9px] font-black uppercase tracking-widest text-slate-300 pl-1">Medium</label>
            <div className="flex bg-slate-800 border border-slate-700 p-1 rounded-xl h-[46px] lg:h-[50px] shadow-sm">
                {["English", "Hindi"].map(m => (
                    <button key={m} onClick={() => setSelectedMedium(m)} className={`flex-1 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${selectedMedium === m ? "bg-primary text-slate-50 shadow-md" : "text-slate-300 hover:text-slate-300"}`}>{m}</button>
                ))}
            </div>
        </div>
        <div className="flex flex-col gap-1.5 lg:gap-2">
            <label className="text-[9px] font-black uppercase tracking-widest text-slate-300 pl-1">Grade / Class</label>
            <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3.5 lg:p-4 text-xs font-black uppercase tracking-widest focus:ring-2 focus:ring-accent text-slate-100 shadow-sm outline-none transition-all">
                {classes.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
        </div>
    </div>
  );

  const DashboardOverview = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
                { label: "Strength", value: "184", icon: Users, color: "text-blue-500", bg: "bg-blue-500/5" },
                { label: "Attendance %", value: "94.2%", icon: TrendingUp, color: "text-amber-400", bg: "bg-amber-500/100/5" },
                { label: "Grading", value: "08", icon: ClipboardList, color: "text-orange-400", bg: "bg-orange-500/5" },
                { label: "New Requests", value: "02", icon: Bell, color: "text-red-400", bg: "bg-red-500/5" },
            ].map((s, i) => (
                <div key={i} className="bg-slate-800 p-6 rounded-[35px] border border-slate-700 shadow-2xl shadow-black/40 flex items-center gap-5 hover:shadow-lg transition-all">
                    <div className={`w-12 h-12 ${s.bg} ${s.color} rounded-2xl flex items-center justify-center`}><s.icon size={20} /></div>
                    <div className="flex flex-col"><span className="text-2xl font-black text-slate-100 tracking-tighter">{s.value}</span><span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{s.label}</span></div>
                </div>
            ))}
        </div>
        <div className="bg-slate-800 p-12 rounded-[60px] border border-slate-700 text-slate-100 overflow-hidden relative shadow-xl shadow-black/40">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
             <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
                <div className="flex flex-col gap-4">
                    <h2 className="text-4xl font-black uppercase tracking-tighter leading-tight text-white">Welcome back,<br />Amit Singh!</h2>
                    <p className="text-slate-300 text-[10px] font-black uppercase tracking-[.3em]">Senior Faculty • Math Department</p>
                </div>
                <div className="flex items-center gap-4">
                     <button onClick={() => setActiveTab("register")} className="bg-accent text-slate-900 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all">Add Student</button>
                     <button onClick={() => setActiveTab("attendance")} className="bg-slate-900 border border-slate-700 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all">Live Attendance</button>
                </div>
             </div>
        </div>
    </motion.div>
  );

  const ClassesSection = () => (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-8">
        <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-100">Assigned Classes & Subjects</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-8">
            {classes.map((cls, i) => (
                <div key={i} className="bg-slate-800 p-6 lg:p-10 rounded-[28px] lg:rounded-[50px] border border-slate-700 shadow-xl shadow-black/40 hover:shadow-2xl shadow-black/40 transition-all group relative overflow-hidden">
                    <div className={`absolute left-0 top-0 bottom-0 w-2 ${cls.id === '10A' ? 'bg-primary' : cls.id === '11B' ? 'bg-accent' : cls.id === '9C' ? 'bg-blue-500' : 'bg-amber-500/100'}`} />
                    <div className="flex justify-between items-start mb-6 lg:mb-10 pl-2 lg:pl-0">
                         <div className="flex flex-col gap-1 lg:gap-2">
                             <span className="text-[9px] lg:text-[10px] font-black uppercase tracking-widest text-slate-300">Session: {cls.nextClass}</span>
                             <h4 className="text-xl lg:text-3xl font-black uppercase tracking-tighter text-slate-100 group-hover:text-slate-300 transition-colors">{cls.name}</h4>
                             <span className={`text-[9px] lg:text-[9px] font-black px-2 py-0.5 lg:px-3 lg:py-1 bg-slate-700 rounded-full w-fit uppercase tracking-widest mt-1 ${cls.medium === 'Hindi' ? 'text-orange-400' : 'text-blue-400'}`}>{cls.medium} Medium</span>
                         </div>
                         <div className="w-10 h-10 lg:w-14 lg:h-14 bg-slate-700/50 rounded-xl lg:rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-primary group-hover:text-slate-100 transition-all"><BookMarked size={20} className="lg:w-6 lg:h-6" /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 lg:gap-6 pt-5 lg:pt-10 border-t border-slate-700 pl-2 lg:pl-0">
                        <div className="flex flex-col"><span className="text-[9px] lg:text-[10px] font-bold text-slate-300 uppercase tracking-widest">Strength</span><span className="text-base lg:text-xl font-black text-slate-100">{cls.strength} Students</span></div>
                        <div className="flex flex-col"><span className="text-[9px] lg:text-[10px] font-bold text-slate-300 uppercase tracking-widest">Performance</span><span className="text-base lg:text-xl font-black text-amber-400">82.4%</span></div>
                    </div>
                </div>
            ))}
        </div>
    </motion.div>
  );

  const AttendanceSection = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-2">
        <FormFilters />
        <div className="bg-slate-800 p-6 lg:p-12 rounded-[32px] lg:rounded-[60px] border border-slate-700 shadow-xl shadow-black/40 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 lg:mb-10 pb-5 lg:pb-6 border-b border-slate-700 gap-4">
                <div>
                  <h3 className="text-xl lg:text-2xl font-black uppercase tracking-tighter">Attendance Register</h3>
                  <p className="text-[9px] lg:text-[10px] font-black uppercase tracking-widest text-slate-300 mt-1">Roll Call for {selectedDate}</p>
                </div>
                <div className="flex items-center gap-4">
                     <div className="flex items-center gap-2 bg-amber-500/100/10 border border-amber-500/20 px-4 py-2 rounded-xl"><CheckCircle2 className="text-amber-400" size={16} /><span className="text-[10px] font-black text-amber-400 uppercase">Present</span></div>
                     <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-xl"><XCircle className="text-red-400" size={16} /><span className="text-[10px] font-black text-red-400 uppercase">Absent</span></div>
                </div>
            </div>

            {filteredStudents.length > 0 ? (
                <div className="flex flex-col gap-4 mt-6 w-full">
                    {filteredStudents.map((s) => (
                        <div key={s.id} className={`p-4 lg:p-6 rounded-3xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group ${s.status === 'P' ? "bg-slate-900/40 border-slate-700" : "bg-red-500/10 border border-red-500/20/20 border-red-500/20 shadow-sm"}`}>
                             <div className="flex items-center gap-4 lg:gap-6">
                                <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center font-black text-slate-300 text-[10px] border border-slate-700 shadow-xl">{s.roll}</div>
                                <div className="flex flex-col gap-1">
                                    <h4 className="text-base lg:text-lg font-black text-slate-100 uppercase tracking-tighter leading-none">{s.name}</h4>
                                    {s.status === 'A' && s.reason && (
                                        <span className="text-[9px] font-black text-red-400 uppercase tracking-widest flex items-center gap-1"><Info size={10} /> {s.reason}</span>
                                    )}
                                </div>
                             </div>
                             <div className="flex bg-slate-800 border border-slate-700 rounded-2xl p-1 gap-1 w-full md:w-auto">
                                 <button 
                                     onClick={() => s.status !== 'P' && toggleAttendance(s.id)}
                                     className={`flex-1 md:flex-none px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${s.status === 'P' ? 'bg-amber-500/100 text-slate-900 border-none shadow-xl shadow-amber-500/20' : 'text-slate-300 hover:text-slate-300 hover:bg-slate-800'}`}
                                 >Present</button>
                                 <button 
                                     onClick={() => s.status !== 'A' && toggleAttendance(s.id)}
                                     className={`flex-1 md:flex-none px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${s.status === 'A' ? 'bg-red-500 text-slate-900 border-none shadow-xl shadow-red-500/20' : 'text-slate-300 hover:text-slate-300 hover:bg-slate-800'}`}
                                 >Absent</button>
                             </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="py-20 flex flex-col items-center justify-center text-center">
                    <AlertCircle size={48} className="text-slate-100 mb-4" />
                    <p className="text-sm font-black text-slate-300 uppercase tracking-widest">No students found for this filter selection</p>
                    <button onClick={() => {setSelectedMedium('English'); setSelectedClass('Grade 10-A');}} className="mt-4 text-[10px] font-black uppercase text-accent underline underline-offset-4">Reset Filters</button>
                </div>
            )}
            
            <div className="mt-12 flex justify-end">
                <button className="bg-primary text-slate-50 px-12 py-5 rounded-2xl text-[12px] font-black uppercase tracking-[.3em] shadow-2xl hover:scale-105 transition-all">Submit Final Register</button>
            </div>
        </div>
    </motion.div>
  );

  const DiarySection = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-8">
        <FormFilters />
        <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-12 bg-slate-800 p-12 rounded-[60px] border border-slate-700 shadow-2xl shadow-black/40">
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-10 flex items-center gap-4">
                    <PlusCircle className="text-accent" /> Expert Diary Post ({selectedMedium})
                </h3>
                <div className="grid lg:grid-cols-2 gap-10">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-300 font-JakartaSans underline">Homework Details</label>
                            <input type="text" placeholder="Lesson Title (e.g. Calculus Basics)" className="bg-slate-900 border-none rounded-2xl p-5 text-sm font-black focus:ring-2 focus:ring-accent" />
                        </div>
                        <div className="flex flex-col gap-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-slate-300 font-JakartaSans underline">Subject Matter</label>
                             <input type="text" placeholder="Mathematics" className="bg-slate-900 border-none rounded-2xl p-5 text-sm font-black focus:ring-2 focus:ring-accent" />
                        </div>
                        <div className="flex flex-col gap-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-slate-300 font-JakartaSans underline">Instruction Log</label>
                             <textarea rows={5} placeholder="Write step-by-step instructions for the students..." className="bg-slate-900 border-none rounded-2xl p-5 text-sm font-black focus:ring-2 focus:ring-accent resize-none"></textarea>
                        </div>
                        <button className="w-full mt-6 py-6 rounded-3xl bg-primary text-slate-50 text-xs font-black uppercase tracking-[.4em] shadow-2xl hover:bg-accent hover:text-slate-300 transition-all flex items-center justify-center gap-4">
                             Publish Task <Save size={18} />
                        </button>
                    </div>
                    <div className="bg-slate-900 p-10 rounded-[50px] border border-slate-700">
                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-100 mb-8 pb-4 border-b border-slate-700">Recently Posted History</h4>
                        <div className="flex flex-col gap-4">
                            {homeworkHistory.filter(h => h.medium === selectedMedium).map(hw => (
                                <div key={hw.id} className="p-6 bg-slate-800 rounded-3xl border border-slate-700 flex items-center justify-between group transition-all">
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-[9px] font-black text-accent uppercase tracking-widest">{hw.class}</span>
                                        <h5 className="text-sm font-black text-slate-100 uppercase">{hw.title}</h5>
                                        <span className="text-[9px] font-bold text-slate-300 uppercase">{hw.date}</span>
                                    </div>
                                    <button className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={14} /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </motion.div>
  );

  const GradebookSection = () => (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-2">
        <FormFilters />
        <div className="bg-slate-800 p-12 rounded-[60px] border border-slate-700 shadow-2xl shadow-black/40">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 pb-8 border-b border-slate-700 gap-6">
                <div className="flex flex-col gap-1">
                    <h3 className="text-3xl font-black uppercase tracking-tighter">Professional Gradebook</h3>
                    <div className="flex items-center gap-3 mt-2">
                         <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Internal Assessment Q2</span>
                         <span className="text-[10px] font-black uppercase text-slate-300">{selectedClass} ({selectedMedium})</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                     <button className="flex items-center gap-3 bg-slate-900 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all"><Download size={16} /> Export CSV</button>
                     <button className="bg-primary text-slate-50 px-10 py-5 rounded-2xl text-[11px] font-black uppercase tracking-[.2em] shadow-xl hover:bg-accent hover:text-slate-300 transition-all">Finalize Sheet</button>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                {filteredStudents.map((s) => (
                    <div key={s.id} className="bg-slate-900 p-4 lg:p-5 rounded-[24px] lg:rounded-3xl border border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4 lg:gap-6 hover:border-slate-600 transition-all">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center font-black text-slate-300 text-xs border border-slate-700 shadow-sm">{s.roll}</div>
                            <div className="flex flex-col">
                                <span className="text-sm font-black uppercase tracking-tighter text-slate-100">{s.name}</span>
                                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-300">Student ID • {s.id}</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center justify-between md:justify-end gap-3 lg:gap-6 w-full md:w-auto mt-2 md:mt-0 pt-3 md:pt-0 border-t border-slate-700 md:border-none">
                            <div className="flex flex-wrap items-center gap-3">
                                <label className="text-[9px] font-bold uppercase tracking-widest text-slate-300">Score:</label>
                                <input type="number" defaultValue={s.marks || 88} onChange={(e) => {
                                      const m = parseInt(e.target.value);
                                      setStudents(prev => prev.map(st => st.id === s.id ? {...st, marks: m} : st));
                                }} className="bg-slate-800 border border-slate-700 rounded-xl w-16 p-3 text-center text-xs font-black focus:ring-accent text-slate-100 shadow-sm" />
                                <span className="text-[10px] font-black text-slate-300">/ 100</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="px-3 py-1.5 bg-amber-500/100/10 text-amber-400 border border-amber-500/20 rounded-xl text-[9px] font-black uppercase">A+</span>
                                <button onClick={() => setShowGradeModal({show: true, student: s})} className="bg-primary/10 text-slate-300 hover:bg-primary hover:text-slate-100 transition-all p-3 rounded-xl border border-primary/20"><Plus size={14}/></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {filteredStudents.length === 0 && (
                <div className="py-20 text-center text-slate-300 font-black uppercase text-xs tracking-widest italic">No registration data for this class</div>
            )}
        </div>
    </motion.div>
  );

  const InspectorSection = () => {
    const handleSearch = () => {
       const found = students.find(s => s.roll === parseInt(searchRoll) && s.class === searchClass);
       setFoundStudent(found);
    };

    return (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-6 lg:gap-10">
            <div className="bg-slate-800 p-6 lg:p-8 rounded-[24px] lg:rounded-[32px] border border-slate-700 shadow-xl w-full">
                 <div className="flex items-center gap-3 mb-6 lg:mb-8">
                     <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-slate-300"><Search size={20} /></div>
                     <h3 className="text-xl font-black uppercase tracking-tighter text-slate-100">Inspector Query Form</h3>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                     <div className="flex flex-col gap-1.5">
                         <label className="text-[9px] font-black uppercase text-slate-300 pl-1">Class Target</label>
                         <select value={searchClass} onChange={(e) => setSearchClass(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3.5 text-xs font-black uppercase text-slate-100 shadow-sm outline-none focus:ring-2 focus:ring-accent">
                             {classes.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                         </select>
                     </div>
                     <div className="flex flex-col gap-1.5">
                         <label className="text-[9px] font-black uppercase text-slate-300 pl-1">Target Roll No.</label>
                         <input type="number" value={searchRoll} onChange={(e) => setSearchRoll(e.target.value)} placeholder="e.g. 12" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3.5 text-xs font-black text-slate-100 shadow-sm outline-none focus:ring-2 focus:ring-accent" />
                     </div>
                     <button onClick={handleSearch} className="bg-primary text-slate-50 h-[46px] rounded-xl flex items-center justify-center gap-2 px-6 text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all w-full mt-2 lg:mt-0">
                         <Search size={14} /> Run Query
                     </button>
                     <button onClick={() => setFoundStudent(null)} className="h-[46px] text-slate-300 hover:text-slate-100 text-[9px] font-black uppercase tracking-widest underline underline-offset-4 transition-all w-full mt-2 lg:mt-0">Clear Search</button>
                 </div>
            </div>

            {foundStudent ? (
                <div className="flex flex-col gap-4 lg:gap-6">
                    {/* Header Card */}
                    <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 lg:p-8 rounded-[32px] border border-slate-700 shadow-xl flex flex-col md:flex-row items-center md:items-start gap-6 relative overflow-hidden">
                         <div className="absolute top-0 right-0 p-8 opacity-5 text-slate-100 pointer-events-none"><User size={200} /></div>
                         <div className="w-20 h-20 lg:w-24 lg:h-24 bg-slate-800 rounded-[28px] border-2 border-slate-700 flex items-center justify-center text-3xl font-black text-slate-300 shadow-sm z-10 flex-shrink-0">{foundStudent.name[0]}</div>
                         <div className="flex flex-col text-center md:text-left z-10 w-full">
                              <h4 className="text-2xl lg:text-3xl font-black uppercase tracking-tighter text-slate-100">{foundStudent.name}</h4>
                              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-3">
                                   <span className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-300">Roll: {foundStudent.roll}</span>
                                   <span className="px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-300">{foundStudent.class}</span>
                                   <span className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-300">Medium: {foundStudent.medium}</span>
                                   <span className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-300">ID: {foundStudent.id}</span>
                              </div>
                         </div>
                    </div>
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                         <div className="bg-slate-800 p-5 rounded-[24px] border border-slate-700 flex flex-col gap-2 shadow-sm">
                              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-300">Term Attendance</span>
                              <span className="text-xl lg:text-3xl font-black tracking-tighter text-amber-400">98.4%</span>
                         </div>
                         <div className="bg-slate-800 p-5 rounded-[24px] border border-slate-700 flex flex-col gap-2 shadow-sm">
                              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-300">Current GPA</span>
                              <span className="text-xl lg:text-3xl font-black tracking-tighter text-accent">9.4</span>
                         </div>
                         <div className="bg-slate-800 p-5 rounded-[24px] border border-slate-700 flex flex-col gap-2 shadow-sm">
                              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-300">Behavioral Score</span>
                              <span className="text-xl lg:text-3xl font-black tracking-tighter text-blue-400">A+</span>
                         </div>
                         <div className="bg-slate-800 p-5 rounded-[24px] border border-red-500/20 flex flex-col gap-2 shadow-sm relative overflow-hidden">
                              <div className="absolute top-0 right-0 p-2 text-red-400/20 -translate-y-2"><AlertCircle size={40} /></div>
                              <span className="text-[9px] font-bold uppercase tracking-widest text-red-400 relative z-10">Due Fees</span>
                              <span className="text-xl lg:text-2xl font-black tracking-tighter text-red-400 relative z-10 leading-none mt-1">Contact Admin</span>
                         </div>
                    </div>
                    {/* Activity Feed */}
                    <div className="bg-slate-800 p-6 lg:p-8 rounded-[32px] border border-slate-700 shadow-sm mt-2">
                         <h5 className="text-xs font-black uppercase tracking-widest text-slate-100 mb-6 flex items-center gap-2"><Target size={14} className="text-slate-300"/> Academic Milestones</h5>
                         <div className="flex flex-col gap-3">
                              {[1, 2, 3].map(i => (
                                   <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 lg:p-5 bg-slate-800 rounded-[20px] border border-slate-700">
                                       <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-xs font-black text-slate-300 border border-slate-700 shadow-sm">Q{i}</div>
                                       <div className="flex flex-col gap-1"><span className="text-[11px] lg:text-xs font-black uppercase tracking-tight text-slate-100">Term Assessment Passed</span><span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest leading-none">Score Top 5% • Evaluated 10 April 2026</span></div>
                                       <ChevronRight size={16} className="ml-auto text-slate-300 hidden sm:block" />
                                   </div>
                              ))}
                         </div>
                    </div>
                </div>
            ) : (
                <div className="bg-slate-900 border-2 border-dashed border-slate-700 p-20 rounded-[60px] text-center flex flex-col items-center">
                    <div className="w-20 h-20 bg-slate-800 rounded-3xl shadow-2xl shadow-black/40 flex items-center justify-center text-slate-300 mb-6"><Search size={32} /></div>
                    <p className="text-[11px] font-black uppercase text-slate-300 tracking-[.4em]">Search for a student using Roll & Class to see their expert insights.</p>
                </div>
            )}
        </motion.div>
    );
  };

  const RegistrationSection = () => {
    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        checkDuplicate(parseInt(formData.roll), formData.class);
        if (!registrationWarning) {
            // Logic to add to state
        }
    };

    return (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-6 lg:gap-8">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
                <div className="lg:col-span-7 bg-slate-800 p-6 lg:p-16 rounded-[35px] lg:rounded-[70px] border border-slate-700 shadow-2xl shadow-black/40 relative">
                    <h3 className="text-2xl lg:text-4xl font-black uppercase tracking-tighter mb-8 lg:mb-12">New Admission</h3>
                    <form onSubmit={handleRegister} className="grid grid-cols-2 gap-8">
                         <div className="col-span-2 flex flex-col gap-2">
                             <label className="text-[11px] font-black uppercase text-slate-300 tracking-widest">Full Student Name (on ID)</label>
                             <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. Swaroop Patel" className="bg-slate-900 border-none rounded-3xl p-6 text-sm font-black focus:ring-2 focus:ring-accent" />
                         </div>
                         <div className="flex flex-col gap-2">
                             <label className="text-[11px] font-black uppercase text-slate-300 tracking-widest">Target Grade</label>
                             <select className="bg-slate-900 border-none rounded-3xl p-6 text-sm font-black uppercase" value={formData.class} onChange={(e) => {setFormData({...formData, class: e.target.value}); checkDuplicate(parseInt(formData.roll), e.target.value)}}>
                                 {classes.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                             </select>
                         </div>
                         <div className="flex flex-col gap-2">
                             <label className="text-[11px] font-black uppercase text-slate-300 tracking-widest">Medium</label>
                             <select className="bg-slate-900 border-none rounded-3xl p-6 text-sm font-black uppercase" value={formData.medium} onChange={(e) => setFormData({...formData, medium: e.target.value})}>
                                 <option>English</option>
                                 <option>Hindi</option>
                             </select>
                         </div>
                         <div className="flex flex-col gap-2">
                             <label className="text-[11px] font-black uppercase text-slate-300 tracking-widest">Roll Number</label>
                             <input required type="number" placeholder="Roll No" className="bg-slate-900 border-none rounded-3xl p-6 text-sm font-black" value={formData.roll} onChange={(e) => {setFormData({...formData, roll: e.target.value}); checkDuplicate(parseInt(e.target.value), formData.class)}} />
                         </div>
                         <div className="flex flex-col gap-2">
                             <label className="text-[11px] font-black uppercase text-slate-300 tracking-widest">Admission Date</label>
                             <input required type="date" className="bg-slate-900 border-none rounded-3xl p-6 text-sm font-black" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                         </div>
                         
                         {registrationWarning && (
                             <div className="col-span-2 p-6 bg-red-500 text-slate-900 border-none rounded-3xl text-xs font-black uppercase tracking-[.2em] flex items-center justify-center animate-pulse">
                                 <XCircle className="mr-3" /> Warning: Student with this Roll & Grade already exists!
                             </div>
                         )}

                         <button disabled={registrationWarning} type="submit" className={`col-span-2 py-6 rounded-3xl font-black uppercase tracking-[.4em] text-xs shadow-2xl transition-all flex items-center justify-center gap-4 ${registrationWarning ? 'bg-slate-800 text-slate-300' : 'bg-primary text-slate-50 hover:bg-accent hover:text-slate-300 hover:scale-105'}`}>
                            Confirm Enrollment <UserPlus size={18} />
                         </button>
                    </form>
                </div>
                <div className="lg:col-span-5 flex flex-col gap-8">
                     <div className="bg-slate-800 p-12 rounded-[70px] text-slate-100 flex flex-col justify-between flex-1 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-800 rounded-full blur-2xl" />
                        <div>
                            <h4 className="text-3xl font-black uppercase tracking-tighter mb-4 text-accent">Enrollment Desk</h4>
                            <p className="text-sm font-bold opacity-40 leading-relaxed uppercase tracking-widest">Teachers can manually add students to the digital session who were admitted before the system launch.</p>
                        </div>
                        <div className="flex flex-col gap-6 mt-10">
                            {[1, 2].map(x => (
                                <div key={x} className="flex items-center gap-4 p-5 bg-slate-800 rounded-3xl border border-slate-700">
                                    <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-xs font-black">#0{x}</div>
                                    <div className="flex flex-col"><span className="text-[10px] font-black uppercase tracking-widest text-accent">Latest Enrolled</span><span className="text-xs font-bold leading-none mt-1">Swaroop Patel • Roll 41</span></div>
                                </div>
                            ))}
                        </div>
                     </div>
                </div>
            </div>
        </motion.div>
    );
  };

  const MessageSection = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-slate-800 p-6 lg:p-12 rounded-[32px] lg:rounded-[60px] border border-slate-700 shadow-2xl shadow-black/40">
            <h3 className="text-xl lg:text-2xl font-black uppercase tracking-tighter mb-6 lg:mb-10 text-slate-100">Academic Requests Hub</h3>
            <div className="flex flex-col gap-4 lg:gap-6">
                {leaveRequests.map((req) => (
                    <div key={req.id} className="p-5 lg:p-8 rounded-[24px] lg:rounded-[40px] bg-slate-900 border border-slate-700 hover:border-accent/20 hover:bg-slate-800 hover:shadow-2xl shadow-black/40 transition-all flex flex-col md:flex-row md:items-start justify-between gap-5 lg:gap-6 group">
                         <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 w-full">
                            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-slate-800 rounded-2xl flex items-center justify-center font-black text-lg text-slate-300 shadow-xl border border-slate-700 flex-shrink-0">{req.name[0]}</div>
                            <div className="flex flex-col gap-1 w-full box-border">
                                <div className="flex flex-wrap items-center gap-2 lg:gap-3">
                                    <h4 className="text-lg lg:text-xl font-black text-slate-100 uppercase tracking-tighter truncate max-w-[200px] sm:max-w-none">{req.name}</h4>
                                    <span className={`text-[8px] lg:text-[9px] flex-shrink-0 font-black uppercase tracking-widest px-2 lg:px-3 py-1.5 rounded-full ${req.status === 'Pending' ? 'bg-orange-500/10 border border-orange-500/20 text-orange-400' : 'bg-amber-500/100/10 border border-amber-500/20 text-amber-400'}`}>{req.status}</span>
                                </div>
                                <span className="text-[9px] lg:text-[10px] font-black uppercase text-accent tracking-widest mt-1 whitespace-nowrap overflow-hidden text-ellipsis">{req.req} • {req.date}</span>
                                <p className="text-xs lg:text-sm font-bold text-slate-300 mt-2 italic leading-relaxed bg-slate-900 p-4 rounded-2xl border border-slate-700 w-full break-words">"{req.msg}"</p>
                            </div>
                         </div>
                         <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto mt-2 md:mt-0">
                            <button className="flex-1 md:flex-none md:w-32 py-3 lg:py-4 rounded-xl bg-primary text-slate-50 text-[9px] font-black uppercase tracking-widest shadow-xl hover:bg-amber-500/100 transition-all flex items-center justify-center gap-2"><UserCheck size={14} /> Approve</button>
                            <button className="flex-1 md:flex-none md:w-32 py-3 lg:py-4 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-[9px] font-black uppercase tracking-widest hover:text-red-400 hover:border-red-500 transition-all flex items-center justify-center gap-2"><UserX size={14} /> Reject</button>
                         </div>
                    </div>
                ))}
            </div>
        </div>
        <div className="lg:col-span-4 bg-slate-800 p-12 rounded-[60px] border border-slate-700 text-slate-100 flex flex-col justify-between shadow-xl shadow-black/40 relative overflow-hidden group min-h-[400px]">
             <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
             <div>
                <h3 className="text-4xl font-black uppercase tracking-tighter leading-none mb-6 text-white">Upcoming Meetings</h3>
                <p className="font-black uppercase tracking-widest text-[11px] text-slate-400">Session: 2026-25</p>
             </div>
             <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-700">
                <div className="flex items-center gap-4 mb-4 text-slate-100">
                    <CalendarDays size={24} />
                    <span className="font-black uppercase tracking-tighter text-2xl">15 April, 2026</span>
                </div>
                <p className="text-sm font-bold text-slate-400 leading-relaxed uppercase tracking-widest">Q3 Progress Review Meeting scheduled for Grade 12 Senior Faculty.</p>
             </div>
        </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen text-slate-100 flex font-JakartaSans relative pb-28 lg:pb-0 bg-slate-900" >      <div className="fixed inset-0   z-0 pointer-events-none" />
      {Sidebar()}
      {MobileNav()}

      {/* Main Content */}
      <main className="flex-1 lg:ml-80 p-4 sm:p-6 lg:p-14 relative z-10 overflow-x-hidden">
        
        {/* Mobile App Bar */}
        <div className="flex items-center justify-between lg:hidden mb-6 bg-slate-800 p-3 sm:p-4 rounded-3xl border border-slate-700 shadow-xl">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-800 rounded-xl overflow-hidden shadow-sm border border-slate-700 flex-shrink-0">
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200" alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                    <span className="font-black text-[12px] sm:text-sm tracking-tight leading-none uppercase text-slate-100">Amit Singh</span>
                    <span className="font-bold text-[9px] sm:text-[9px] tracking-[.15em] uppercase text-slate-300 mt-1">Senior Faculty</span>
                </div>
            </div>
            <div className="bg-accent/10 px-3 py-2 rounded-xl text-[9px] font-black text-accent uppercase tracking-widest border border-accent/20 flex-shrink-0">
                SVB
            </div>
        </div>
        
        {/* Dynamic Header */}
        <header className="hidden lg:flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <span className="bg-accent/20 text-accent px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest underline underline-offset-4 decoration-2">Teacher Admin Portal</span>
                    <span className="w-1.5 h-1.5 bg-slate-700 rounded-full" />
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Amit Singh • Senior Faculty • {activeTab.toUpperCase()}</span>
                </div>
                <h1 className="text-4xl lg:text-7xl font-black text-slate-100 uppercase tracking-tighter leading-none">
                     {activeTab === "overview" && "Academic Dashboard"}
                     {activeTab === "classes" && "My Classes"}
                     {activeTab === "attendance" && "Attendance Register"}
                     {activeTab === "diary" && "Digital Diary"}
                     {activeTab === "gradebook" && "Marks Entry"}
                     {activeTab === "inspector" && "Student Inspector"}
                     {activeTab === "register" && "New Registration"}
                     {activeTab === "messages" && "Leave Requests"}
                </h1>
            </div>
            <div className="flex items-center gap-6">
                 <div className="w-16 h-16 bg-slate-800 rounded-3xl p-1 shadow-2xl shadow-black/40 border-2 border-slate-700 flex items-center justify-center overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200" alt="Avatar" className="w-full h-full object-cover rounded-2xl" />
                 </div>
            </div>
        </header>

        {/* Tab Content */}
        <div className="min-h-[600px] relative">
            {activeTab === "overview" && DashboardOverview()}
            {activeTab === "classes" && ClassesSection()}
            {activeTab === "attendance" && AttendanceSection()}
            {activeTab === "diary" && DiarySection()}
            {activeTab === "gradebook" && GradebookSection()}
            {activeTab === "inspector" && InspectorSection()}
            {activeTab === "register" && RegistrationSection()}
            {activeTab === "messages" && MessageSection()}
        </div>

        {/* Mobile Footer Logout */}
        <div className="lg:hidden mt-8 flex justify-center pb-8 border-t border-slate-700 pt-8">
             <Link href="/" className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-red-500/10 text-red-400 text-[11px] font-black uppercase tracking-widest hover:bg-red-500/20 transition-all border border-red-500/20 shadow-xl shadow-red-500/5">
                 <LogOutIcon size={16} /> Secure Sign Out
             </Link>
        </div>
      </main>

      {/* --- MODALS --- */}

      {/* Absence Reason Modal */}
      <AnimatePresence>
        {showAbsenceModal.show && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAbsenceModal({show: false, studentId: null})} className="absolute inset-0 bg-slate-800/60 backdrop-blur-xl" />
                <motion.div initial={{ opacity: 0, scale: 0.9, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 50 }} className="relative bg-slate-800 w-full max-w-md rounded-[50px] shadow-2xl overflow-hidden p-12">
                    <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 text-slate-100">Define Absence Reason</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-8">Marking as Absent for {selectedDate}</p>
                    <div className="flex flex-col gap-6">
                         <textarea id="abs_reason" rows={3} placeholder="Sick / No Application / Family Event..." className="bg-slate-900 border-none rounded-2xl p-5 text-sm font-black focus:ring-2 focus:ring-accent resize-none"></textarea>
                         <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 p-4 rounded-2xl">
                              <input type="checkbox" id="no_app" className="rounded text-red-400 focus:ring-red-300" />
                              <label htmlFor="no_app" className="text-[9px] font-black uppercase text-red-400">No Application Received</label>
                         </div>
                         <button 
                            onClick={() => {
                                const val = (document.getElementById('abs_reason') as HTMLTextAreaElement).value;
                                const isNoApp = (document.getElementById('no_app') as HTMLInputElement).checked;
                                handleReasonSubmit(isNoApp ? `No Application: ${val}` : val);
                            }}
                            className="w-full py-5 rounded-2xl bg-primary text-slate-50 text-[10px] font-black uppercase tracking-widest shadow-xl"
                         >Save Absence Entry</button>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

      {/* Grade Entry Modal */}
      <AnimatePresence>
        {showGradeModal.show && (
             <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowGradeModal({show: false, student: null})} className="absolute inset-0 bg-slate-800/80 backdrop-blur-xl" />
                <motion.div initial={{ opacity: 0, scale: 0.9, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 50 }} className="relative bg-slate-800 w-full max-w-lg rounded-[60px] shadow-2xl overflow-hidden p-14">
                    <h3 className="text-3xl font-black uppercase tracking-tighter mb-2 text-slate-100">Result Insights</h3>
                    <p className="text-[11px] font-black uppercase tracking-widest text-slate-300 mb-10">Entry for {showGradeModal.student?.name} • Roll {showGradeModal.student?.roll}</p>
                    
                    <div className="flex flex-col gap-8">
                         <div className="grid grid-cols-2 gap-6">
                             <div className="flex flex-col gap-2">
                                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-300">Theory Marks</label>
                                 <input type="number" placeholder="0-70" className="bg-slate-900 border-none rounded-2xl p-5 text-sm font-black focus:ring-2 focus:ring-accent" />
                             </div>
                             <div className="flex flex-col gap-2">
                                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-300">Practical Marks</label>
                                 <input type="number" placeholder="0-30" className="bg-slate-900 border-none rounded-2xl p-5 text-sm font-black focus:ring-2 focus:ring-accent" />
                             </div>
                         </div>
                         <div className="flex flex-col gap-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-slate-300">Teacher Remarks</label>
                             <textarea rows={3} placeholder="Strong logic but needs practice in geometry..." className="bg-slate-900 border-none rounded-2xl p-5 text-sm font-black focus:ring-2 focus:ring-accent resize-none"></textarea>
                         </div>
                         <button onClick={() => setShowGradeModal({show: false, student: null})} className="w-full py-5 rounded-2xl bg-primary text-slate-50 text-[10px] font-black uppercase tracking-widest shadow-2xl hover:bg-amber-500/100 transition-all">Submit Student Grades</button>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Simple Helper for Logout Icon to avoid missing import
function LogOutIcon(props: any) {
  return (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
  );
}


