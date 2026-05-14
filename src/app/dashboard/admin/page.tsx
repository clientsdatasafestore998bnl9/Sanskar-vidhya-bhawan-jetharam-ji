"use client";

import { supabase } from "@/lib/supabase";
import { createClient } from '@supabase/supabase-js';

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PremiumCalendar } from "@/components/Admin/PremiumCalendar";
import { FormView } from "@/components/Admin/FormView";
import { InspectorView } from "@/components/Admin/InspectorView";
import { DashboardOverview } from "@/components/Admin/DashboardOverview";
import { PrintLayout } from "@/components/Admin/PrintLayout";
import { AdminProvider } from "./context/AdminContext";
import { 
  Users, Trash2,
  
  UserSquare2, 
  Library, 
  UserCircle, 
  Layout, 
  BookOpen, 
  Calendar, 
  CheckSquare, 
  ClipboardList, 
  Bell, 
  Bus, 
  Home, 
  Search, 
  MoreVertical, 
  ChevronDown, 
  ChevronRight, 
  Trophy, 
  FileText, 
  Settings, 
  LogOut,
  Menu,
  X,
  Plus,
  Download,
  Star,
  Zap,
  TrendingUp,
  CreditCard,
  AlertCircle,
  FileBox,
  Clock,
  Filter,
  ArrowUpRight,
  ShieldCheck,
  Table as TableIcon,
  PieChart,
  TrendingDown,
  Scale,
  ScrollText,
  Receipt
} from "lucide-react";

// --- TYPES ---
type TabType = "dashboard" | "students" | "teachers" | "account" | "routine" | "attendance" | "exam" | "notice" | "transport" | "hostel";
type SubView = "registry" | "entry" | "analytics" | "default";

type FieldType = { 
  label: string; 
  type: "text" | "select" | "date" | "file"; 
  options?: string[]; 
  value?: string;
  onChange?: (val: string) => void;
};

// --- CONSTANTS ---
const CLASS_FEES: Record<string, number> = {
  "Nursery": 6500, "LKG": 6800, "UKG": 7000,
  "1st": 8500, "2nd": 8800, "3rd": 9000, "4th": 9500, "5th": 10000,
  "6th": 11000, "7th": 11500, "8th": 12000, "9th": 14000, "10th": 15500
};

// --- EXPERT INSTITUTIONAL COMPONENTS ---


// --- UTILITIES ---
const formatDate = (date: string) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [activeSubView, setActiveSubView] = useState<SubView>("default");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Dynamic Form & Filter States
  const [selectedMedium, setSelectedMedium] = useState("English");
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [admissionType, setAdmissionType] = useState("New");
  const [inspectorQuery, setInspectorQuery] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [parentType, setParentType] = useState("Father"); // For Inspector toggle
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  
  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    const savedTab = localStorage.getItem("svb_v2_tab");
    const savedSub = localStorage.getItem("svb_v2_subView");
    if (savedTab) setActiveTab(savedTab as TabType);
    if (savedSub) setActiveSubView(savedSub as SubView);
    if (typeof window !== "undefined") {
      if (window.innerWidth < 1024) setIsSidebarOpen(false);
      const resize = () => { if(window.innerWidth < 1024) { setIsSidebarOpen(false); } else { setIsSidebarOpen(true); } };
      window.addEventListener("resize", resize);
      return () => window.removeEventListener("resize", resize);
    }
  }, []);

  React.useEffect(() => {
    if (isMounted) {
      localStorage.setItem("svb_v2_tab", activeTab);
      localStorage.setItem("svb_v2_subView", activeSubView);
    }
  }, [activeTab, activeSubView, isMounted]);

  // --- EXPANDED MOCK DATA & CONSTANTS ---
  const classFees: Record<string, number> = {
    "Nursery": 6500, "LKG": 6800, "UKG": 7000,
    "1st": 8500, "2nd": 8800, "3rd": 9000, "4th": 9500, "5th": 10000,
    "6th": 11000, "7th": 11500, "8th": 12000, "9th": 14000, "10th": 15500
  };

  const [dbStudents, setDbStudents] = useState<any[]>([]);
  const [dbTeachers, setDbTeachers] = useState<any[]>([]);
  const [dbAccounts, setDbAccounts] = useState<any[]>([]);
  const [dbNotices, setDbNotices] = useState<any[]>([]);
  const [dbExams, setDbExams] = useState<any[]>([]);
  const [dbRoutine, setDbRoutine] = useState<Record<string,any[]>>({});
  const [dbAdmissions, setDbAdmissions] = useState<any[]>([]);
  const [dbMessages, setDbMessages] = useState<any[]>([]);

  const studentsData = dbStudents;
  const staffData = dbTeachers;
  const noticesData = dbNotices;
  const examsData = dbExams;
  const routineData = dbRoutine;
  const accountsData = dbAccounts;
  const admissionsData = dbAdmissions;
  const messagesData = dbMessages;

    const refreshData = async () => {
        try {
            // Create an unauthenticated client for public tables to bypass RLS issues
            const supabasePublic = supabase; // Fallback
            const publicOpts = { auth: { persistSession: false, autoRefreshToken: false } };
            const supabaseAnon = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, publicOpts);

            const [
                { data: students },
                { data: teachers },
                { data: fees },
                { data: inquiries },
                { data: messages },
                { data: notices },
                { data: exams },
                { data: routine }
            ] = await Promise.all([
                supabase.from('students').select('*').order('created_at', { ascending: false }),
                supabase.from('teachers').select('*').order('created_at', { ascending: false }),
                supabase.from('fees').select('*').order('created_at', { ascending: false }),
                supabaseAnon.from('admissions_inquiries').select('*').order('created_at', { ascending: false }),
                supabaseAnon.from('contact_messages').select('*').order('created_at', { ascending: false }),
                supabase.from('notices').select('*').order('created_at', { ascending: false }),
                supabase.from('exams').select('*').order('created_at', { ascending: false }),
                supabase.from('routine').select('*')
            ]);

            if (students) setDbStudents(students);
            if (teachers) setDbTeachers(teachers);
            if (fees) setDbAccounts(fees);
            if (inquiries) { console.log('Admissions:', inquiries); setDbAdmissions(inquiries); }
            if (messages) { console.log('Messages:', messages); setDbMessages(messages); }
            if (notices) setDbNotices(notices);
            if (exams) setDbExams(exams);
            if (routine) {
                // Convert flat routine rows → { ClassName: [{day,periods}] } format
                const grouped: any = {};
                routine.forEach((r: any) => {
                    if (!grouped[r.class]) grouped[r.class] = [];
                    grouped[r.class].push(r);
                });
                setDbRoutine(grouped);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    React.useEffect(() => {
        refreshData();
    }, []);


  // noticeData comes from Supabase via noticesData = dbNotices
  const handleDeleteStudent = async (id: string) => {
    if (!confirm('Are you sure? This student will be permanently deleted.')) return;
    const { error } = await supabase.from('students').delete().eq('id', id);
    if (error) alert('Delete failed: ' + error.message);
    else { refreshData(); }
  };

  const handleDeleteTeacher = async (id: string) => {
    if (!confirm('Are you sure? This staff member will be permanently deleted.')) return;
    const { error } = await supabase.from('teachers').delete().eq('id', id);
    if (error) alert('Delete failed: ' + error.message);
    else { refreshData(); }
  };

  // --- REFINED SUB-COMPONENTS (COMPACT MODE) ---

  const Sidebar = () => {
    const menuItems = [
      { id: "dashboard", name: "Overview", icon: Layout },
      { id: "students", name: "Students", icon: Users },
      { id: "teachers", name: "Staff", icon: UserSquare2 },
      { id: "account", name: "Accounts", icon: CreditCard },
      { id: "routine", name: "Routine", icon: Calendar },
      { id: "exam", name: "Exams", icon: ClipboardList },
      { id: "notice", name: "Notices", icon: Bell },
      { id: "transport", name: "Transport", icon: Bus },
    ];

    return (
      <>
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden" 
            onClick={() => setIsSidebarOpen(false)} 
          />
        )}
        <aside className={`fixed top-0 left-0 bottom-0 ${isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0 lg:w-20"} bg-slate-900 border-r border-slate-800 transition-all duration-300 z-50 flex flex-col shadow-2xl`}>
        <div className="p-6 flex items-center gap-3 border-b border-slate-800/50">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Zap size={20} className="text-white fill-white" />
            </div>
            <h1 className={`text-xl font-black text-white tracking-tighter ${!isSidebarOpen && "hidden"}`}>SVB Admin</h1>
        </div>
        
        <nav className="flex-1 p-4 flex flex-col gap-1.5 mt-4">
          {menuItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => {
                  setActiveTab(item.id as TabType);
                  // Set default subview based on tab
                  if (["students", "teachers", "account"].includes(item.id)) {
                    setActiveSubView("registry");
                  } else {
                    setActiveSubView("default");
                  }
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${
                  activeTab === item.id 
                  ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20" 
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={18} className={activeTab === item.id ? "text-white" : "text-slate-500 group-hover:text-slate-300"} />
                  <span className={`text-sm font-bold tracking-tight ${!isSidebarOpen && "hidden"}`}>{item.name}</span>
                </div>
              </button>
            </div>
          ))}
        </nav>

        <div className={`p-6 ${!isSidebarOpen && "hidden"}`}>
           <button className="w-full bg-slate-800/50 text-slate-400 py-3 rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-red-500/10 hover:text-red-500 transition-all border border-slate-700/50">
             <LogOut size={14} /> Logout Session
           </button>
        </div>
      </aside>
      </>
    );
  };

  const Header = () => (
    <header className="h-16 md:h-20 bg-slate-950/80 backdrop-blur-md sticky top-0 px-4 md:px-8 flex items-center justify-between border-b border-slate-900 z-40">
        <div className="flex items-center gap-6">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="hidden lg:block p-2 text-slate-400 hover:bg-slate-900 rounded-xl transition-colors"><Menu size={20} /></button>
            <div className="relative group hidden md:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-indigo-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Universal search..." 
                  className="bg-slate-900/50 border border-slate-800 w-80 rounded-xl pl-12 pr-4 py-2.5 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-600"
                />
            </div>
        </div>

        <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
                <button className="p-2.5 text-slate-400 hover:bg-slate-900 rounded-xl relative transition-colors">
                    <Bell size={18} />
                    <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-slate-950" />
                </button>
                <button className="p-2.5 text-slate-400 hover:bg-slate-900 rounded-xl transition-colors"><Settings size={18} /></button>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 pl-3 sm:pl-4 border-l border-slate-800">
                <div className="text-right hidden sm:block">
                    <p className="text-[10px] font-black text-indigo-400 leading-none mb-1 tracking-widest">PRINCIPAL CORE</p>
                    <p className="text-sm font-black text-white tracking-tight leading-none uppercase">JR Gaud</p>
                </div>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-xs shadow-lg shadow-indigo-600/20 border border-indigo-400/20">JG</div>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="block lg:hidden p-2 text-indigo-400 hover:bg-slate-800 rounded-xl transition-colors"><Menu size={24} /></button>
            </div>
        </div>
    </header>
  );

  // --- COMPACT MODULES ---


  type FieldType = { 
    label: string; 
    type: "text" | "select" | "date" | "file"; 
    options?: string[]; 
    value?: string;
    onChange?: (val: string) => void;
  };


  const AnalyticsView = (title: string, metrics: { label: string; value: string; trend: string; data: number[] }[]) => (
    <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {metrics.map((m, i) => (
                <div key={i} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm group hover:border-indigo-500/20 transition-all relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 -mr-12 -mt-12 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-all" />
                    <div className="flex justify-between items-center mb-8 relative z-10">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{m.label}</span>
                        <div className="flex items-center gap-1.5 bg-amber-500/10 px-2 py-0.5 rounded-full">
                            <TrendingUp size={12} className="text-amber-500/100" />
                            <span className="text-[9px] font-black text-amber-500/100 uppercase">{m.trend}</span>
                        </div>
                    </div>
                    <div className="flex items-end gap-1.5 h-32 mb-6 px-1 relative z-10">
                        {m.data.map((h, j) => (
                            <motion.div 
                                key={j} 
                                initial={{ height: 0 }} 
                                animate={{ height: `${h}%` }} 
                                className="flex-1 bg-indigo-500/10 group-hover:bg-indigo-500/30 transition-all rounded-t-md relative overflow-hidden"
                            >
                                {j === m.data.length - 1 && <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />}
                            </motion.div>
                        ))}
                    </div>
                    <h4 className="text-3xl font-black text-white tracking-tighter relative z-10">{m.value}</h4>
                </div>
            ))}
        </div>
        
        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-sm flex items-center justify-between group hover:border-indigo-500/30 transition-all">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <Library className="text-indigo-400" size={16} />
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Administrative Intelligence Report</span>
                </div>
                <p className="text-xs font-bold text-slate-400 max-w-lg">Institutional health metrics are synthesized from real-time dynamic academic and financial ledgers for Session 2024-25.</p>
            </div>
            <button className="px-8 py-3.5 bg-slate-950 border border-slate-800 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2 hover:bg-indigo-600 hover:border-indigo-500 transition-all group/btn">
                Download Comprehensive Audit <Download size={14} className="group-hover/btn:translate-y-0.5 transition-transform" />
            </button>
        </div>
    </div>
  );

  const RegistryView = (title: string, data: any[]) => (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-premium overflow-hidden">
        {/* Medium-wise Quick Stats */}
        {activeTab === "students" && (
          <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-slate-800 divide-x divide-slate-800 bg-slate-950/50">
              <div className="p-4 flex flex-col gap-1">
                  <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Hindi Medium Total</span>
                  <span className="text-lg font-black text-white">{dbStudents.filter(s=>s.medium==='Hindi').length} <span className="text-[10px] text-slate-400 font-bold ml-1">STUDENTS</span></span>
              </div>
              <div className="p-4 flex flex-col gap-1">
                  <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">English Medium Total</span>
                  <span className="text-lg font-black text-white">{dbStudents.filter(s=>s.medium==='English').length} <span className="text-[10px] text-slate-400 font-bold ml-1">STUDENTS</span></span>
              </div>
              <div className="p-4 flex flex-col gap-1">
                  <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Class Management</span>
                  <select 
                    value={classFilter} 
                    onChange={(e) => setClassFilter(e.target.value)}
                    className="bg-transparent border-none p-0 text-sm font-black text-indigo-400 focus:ring-0 cursor-pointer uppercase appearance-none"
                  >
                      <option>All Classes</option>
                      {["Nursery", "LKG", "UKG", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
              </div>
              <div className="p-4 flex flex-col gap-1">
                  <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Status Tracking</span>
                  <span className="text-xs font-black text-amber-500/100 uppercase tracking-tighter">{dbStudents.filter(s=>s.created_at&&s.created_at.startsWith(new Date().toISOString().split('T')[0])).length} New Today</span>
              </div>
          </div>
        )}

        <div className="p-5 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/50">
            <div className="flex flex-col">
                <h3 className="text-sm font-black text-white uppercase tracking-tight">{title} Ledger</h3>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Session 2024-25 • Institutional Records</p>
            </div>
            <div className="flex flex-wrap gap-2 relative z-[99] pointer-events-auto w-full sm:w-auto mt-2 sm:mt-0">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => alert("Secure Batch Export Initialized for Session 2024-25.")}
                  className="px-6 py-2 bg-indigo-600 rounded-xl text-[10px] font-black text-white uppercase tracking-widest shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all border border-indigo-400/20 block pointer-events-auto"
                >
                  Batch Export
                </motion.button>
            </div>
        </div>

        {activeTab === "students" && (
          <div className="px-6 py-5 border-b border-slate-800 bg-slate-950/20">
              <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Star size={12} className="text-yellow-500 fill-yellow-500" /> Recent Institutional Admissions
                  </span>
                  <button className="text-[9px] font-black text-indigo-400 uppercase hover:underline">View All</button>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {studentsData.slice(0, 5).map((s, idx) => (
                      <div key={idx} className="flex-shrink-0 bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-3 w-72 group hover:border-indigo-500/30 transition-all relative">
                          <div className="w-10 h-10 bg-indigo-600/10 rounded-xl flex items-center justify-center text-indigo-400 font-black text-xs border border-indigo-500/10">{(s.full_name||s.name||"?")[0]}</div>
                          <div className="flex flex-col">
                              <span className="text-[11px] font-black text-white uppercase tracking-tight truncate w-40">{s.full_name||s.name||"—"}</span>
                              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Class {s.class} • {s.medium}</span>
                          </div>
                          <div className="absolute top-4 right-4 text-amber-500/100">
                             <TrendingUp size={12} />
                          </div>
                      </div>
                  ))}
              </div>
          </div>
        )}

        <div className="overflow-x-auto">
          {activeTab === "students" && (
            <table className="w-full text-left border-collapse">
                <thead className="bg-slate-950/50 border-y border-slate-800 text-slate-500">
                    <tr>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Student Profile / Ledger ID</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-center">Class / Roll No</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Financial Status</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-right">Attendance</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-center">Inspector</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                    {data.filter((s:any) => classFilter === "All" || (s.class||'').startsWith(classFilter)).map((item:any, i:number) => (
                        <tr key={i} className="hover:bg-indigo-500/5 transition-colors group border-b border-slate-800/20">
                            <td className="px-6 py-5">
                                <div className="flex items-center gap-3">
                                    {item.photo_url ? <img src={item.photo_url} alt="" className="w-9 h-9 rounded-xl object-cover border border-slate-700" /> : <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center font-black text-xs text-indigo-400 border border-slate-700">{(item.full_name||item.name||'?')[0]}</div>}
                                    <div className="flex flex-col">
                                        <span className="text-[13px] font-black text-white leading-none mb-1.5 uppercase tracking-tight group-hover:text-indigo-300 transition-colors">{item.full_name||item.name||'—'}</span>
                                        <span className="text-[10px] font-bold text-slate-500 tracking-tighter uppercase">{item.roll_number||item.sr_number||'—'} • {item.medium||'—'} MEDIUM</span>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-5 text-center">
                                <span className="text-[11px] font-black text-slate-300 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700/50 uppercase tracking-tighter">Class {item.class||'—'} • #{item.roll_number||'—'}</span>
                            </td>
                            <td className="px-6 py-5">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${(item.fee_status||item.fee)==='Paid' ? 'bg-amber-500' : 'bg-rose-500'}`} />
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${(item.fee_status||item.fee)==='Paid' ? 'text-amber-500' : 'text-rose-500'}`}>{item.fee_status||item.fee||'Pending'}</span>
                                </div>
                            </td>
                            <td className="px-6 py-5 text-right">
                                <span className="text-sm font-black text-slate-400 tracking-tight">{item.attendance_pct||item.attendance||'—'}</span>
                            </td>
                            <td className="px-6 py-5 text-center">
                                <button onClick={() => { setSelectedStudent(item); setActiveSubView('analytics'); }} className="text-slate-600 hover:text-indigo-400 transition-all p-2 rounded-xl hover:bg-indigo-500/10 border border-transparent hover:border-indigo-500/20">
                                   <ArrowUpRight size={18} />
                                </button>
                            </td>
                                <button onClick={() => handleDeleteStudent(item.id)} title="Delete Student" className="text-slate-700 hover:text-rose-400 transition-all p-2 rounded-xl hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20">
                                   <Trash2 size={15} />
                                </button>
                        </tr>
                    ))}
                </tbody>
            </table>
          )}

          {activeTab === "teachers" && (
            <table className="w-full text-left border-collapse">
                <thead className="bg-slate-950/50 border-y border-slate-800 text-slate-500">
                    <tr>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Faculty Name</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-center">Class Teacher Of</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Subjects Taught</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-center">Profile Inspector</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                    {data.map((item:any, i:number) => (
                        <tr key={i} className="hover:bg-indigo-500/5 transition-colors group border-b border-slate-800/20">
                            <td className="px-6 py-5">
                                <div className="flex items-center gap-3">
                                    {item.photo_url ? <img src={item.photo_url} alt="" className="w-9 h-9 rounded-xl object-cover border border-slate-700" /> : <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center font-black text-xs text-indigo-400 border border-slate-700">{(item.full_name||item.name||'?')[0]}</div>}
                                    <div className="flex flex-col">
                                        <span className="text-[13px] font-black text-white leading-none mb-1.5 uppercase tracking-tight group-hover:text-indigo-300 transition-colors">{item.full_name||item.name||'—'}</span>
                                        <span className="text-[10px] font-bold text-slate-500 tracking-tighter uppercase">{item.employee_id||'—'}</span>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-5 text-center">
                                <span className="text-[11px] font-black text-slate-300 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-lg uppercase tracking-tighter">{item.designated_class||item.designatedClass||'—'}</span>
                            </td>
                            <td className="px-6 py-5">
                                <span className="text-[11px] font-black text-slate-400 uppercase">{item.subjects_assigned||item.subject||'—'}</span>
                            </td>
                            <td className="px-6 py-5 text-center">
                                <button onClick={() => { setSelectedStudent(item); setActiveSubView('analytics'); }} className="text-slate-600 hover:text-indigo-400 transition-all p-2 rounded-xl hover:bg-indigo-500/10 border border-transparent hover:border-indigo-500/20">
                                   <ArrowUpRight size={18} />
                                </button>
                                <button onClick={() => handleDeleteTeacher(item.id)} title="Delete Staff" className="text-slate-700 hover:text-rose-400 transition-all p-2 rounded-xl hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20">
                                   <Trash2 size={15} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          )}
        </div>
    </div>
  );

  const AccountsDashboard = () => {
    const totalIncome = accountsData.filter(d => d.type === "INCOME").reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpense = accountsData.filter(d => d.type === "EXPENSE").reduce((acc, curr) => acc + curr.amount, 0);
    const netBalance = totalIncome - totalExpense;

    return (
        <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm flex items-center justify-between group hover:border-amber-500/100/30 transition-all">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Total Revenue</span>
                        <span className="text-3xl font-black text-amber-400 mt-1">₹{totalIncome.toLocaleString()}</span>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                        <TrendingUp size={24} />
                    </div>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm flex items-center justify-between group hover:border-rose-500/30 transition-all">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Total Expenditure</span>
                        <span className="text-3xl font-black text-rose-400 mt-1">₹{totalExpense.toLocaleString()}</span>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
                        <TrendingDown size={24} />
                    </div>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm flex items-center justify-between group hover:border-indigo-500/30 transition-all">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Net Surplus</span>
                        <span className="text-3xl font-black text-indigo-400 mt-1">₹{netBalance.toLocaleString()}</span>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                        <Scale size={24} />
                    </div>
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                <div className="px-8 py-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                    <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                        <ScrollText size={16} className="text-indigo-400" /> Digital Cashbook Ledger
                    </h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-950/50 border-y border-slate-800 text-slate-500">
                            <tr>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest w-32">Txn ID & Date</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-center">Type</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Description</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-center">Payment Mode</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-right">Amount (₹)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                            {accountsData.map((item, i) => (
                                <tr key={i} className="hover:bg-slate-800/20 transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black text-white">{item.id}</span>
                                            <span className="text-[10px] font-bold text-slate-500 uppercase">{item.date}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <span className={`text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider ${item.type === "INCOME" ? "text-amber-400 bg-amber-500/10 border border-amber-500/20" : "text-rose-400 bg-rose-500/10 border border-rose-500/20"}`}>
                                            {item.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black text-white uppercase tracking-tight">{item.category}</span>
                                            <span className="text-[10px] font-bold text-slate-400 lowercase">{item.desc}</span>
                                            <span className="text-[9px] font-bold text-slate-500 mt-1 uppercase">Ref: {item.fromTo}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.mode}</span>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <span className={`text-sm font-black ${item.type === "INCOME" ? "text-amber-400" : "text-rose-400"}`}>
                                            {item.type === "INCOME" ? "+" : "-"}₹{(item.amount||0).toLocaleString()}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
  };

  const AccountsForm = ({ type }: { type: "INCOME" | "EXPENSE" }) => {
      const [formData, setFormData] = useState<any>({});
      return (
        <div className="bg-slate-900 p-8 rounded-[40px] border border-slate-800 shadow-premium max-w-7xl mx-auto overflow-hidden relative">
            <div className="flex items-center justify-between mb-10 border-b border-slate-800 pb-8">
                <div className="flex items-center gap-5">
                    <div className={`w-16 h-16 ${type === "INCOME" ? "bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-amber-500/10" : "bg-rose-600/10 text-rose-400 border-rose-500/20 shadow-rose-500/5"} rounded-3xl flex items-center justify-center border shadow-xl animate-pulse-slow`}>
                        {type === "INCOME" ? <TrendingUp size={32} /> : <TrendingDown size={32} />}
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
                            {type === "INCOME" ? "Collect Revenue" : "Register Expense"}
                        </h3>
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.3em] mt-1 italic">
                            Official Ledger Entry • Secure Transaction
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 mb-12">
                {[
                    { label: type === "INCOME" ? "Receipt No" : "Voucher No", type: "text" },
                    { label: "Date", type: "date" },
                    { label: type === "INCOME" ? "Received From" : "Paid To", type: "text" },
                    { label: "Amount (₹)", type: "number" },
                    { label: "Category", type: "select", options: type === "INCOME" ? ["Tuition Fee", "Admission Fee", "Misc Receipts", "Transport Fee"] : ["Utility Bill", "Salary", "Maintenance", "Events & Functions", "Stationery"] },
                    { label: "Payment Mode", type: "select", options: ["Cash", "UPI", "Bank Transfer", "Cheque"] },
                    { label: "Remarks", type: "text", fullWidth: true }
                ].map((field, x) => (
                    <div key={x} className={`flex flex-col gap-1 ${field.fullWidth ? "lg:col-span-3 md:col-span-2" : ""}`}>
                       {field.type === "date" ? (
                           <PremiumCalendar 
                               label={field.label}
                               value={formData[field.label] || ""}
                               onChange={(val) => setFormData({...formData, [field.label]: val})}
                           />
                       ) : field.type === "select" ? (
                           <div className="flex flex-col gap-2.5 group">
                               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1 ml-1 group-focus-within:text-indigo-400 transition-colors">{field.label}</label>
                               <div className="relative">
                                   <select 
                                       value={formData[field.label] || ""}
                                       onChange={(e) => setFormData({...formData, [field.label]: e.target.value})}
                                       className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4.5 text-sm font-bold text-white focus:bg-slate-900 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none cursor-pointer outline-none"
                                   >
                                       <option value="" className="bg-slate-950">Select {field.label}</option>
                                       {field.options?.map(opt => <option key={opt} value={opt} className="bg-slate-950">{opt}</option>)}
                                   </select>
                                   <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none group-hover:text-indigo-400 transition-colors" size={18} />
                               </div>
                           </div>
                       ) : (
                           <div className="flex flex-col gap-2.5 group">
                               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1 ml-1 group-focus-within:text-indigo-400 transition-colors">{field.label}</label>
                               <input 
                                   type={field.type}
                                   value={formData[field.label] || ""}
                                   onChange={(e) => setFormData({...formData, [field.label]: e.target.value})}
                                   placeholder={`Enter ${field.label}...`}
                                   className="bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4.5 text-sm font-bold text-white focus:bg-slate-900 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-800 outline-none" 
                               />
                           </div>
                       )}
                    </div>
                ))}
            </div>

            <div className="flex justify-end pt-8 border-t border-slate-800">
                <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => alert(`${type === "INCOME" ? "Receipt" : "Voucher"} Generated Successfully! Amount: ₹${formData["Amount (₹)"] || 0}`)}
                    className={`px-14 py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest text-white shadow-xl transition-all flex items-center justify-center gap-4 border ${type === "INCOME" ? "bg-amber-500 hover:bg-amber-500/100 border-amber-400/30 shadow-amber-500/30" : "bg-rose-600 hover:bg-rose-500 border-rose-400/30 shadow-rose-600/30"}`}
                >
                    {type === "INCOME" ? "Generate Receipt" : "Generate Voucher"} <ShieldCheck size={20} />
                </motion.button>
            </div>
        </div>
      );
  };

  const RoutineDashboard = () => {
      const [routMedium, setRoutMedium] = useState<string>("Hindi");
      const [localClass, setLocalClass] = useState<string>("All");
      const rHindiClasses = ["1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th"];
      const rEnglishClasses = ["Nursery","LKG","UKG","1st","2nd","3rd","4th","5th","6th","7th","8th"];
      const rClassOptions = routMedium === "Hindi" ? rHindiClasses : rEnglishClasses;
      // Filter routine data by medium+class
      const filteredRoutineKeys = Object.keys(routineData).filter(k => {
          if (localClass !== "All" && k !== localClass) return false;
          return true;
      });
      const displayKey = localClass === "All" ? (filteredRoutineKeys[0] || "") : localClass;

      return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col gap-6 shadow-2xl overflow-x-auto">
          <div className="flex justify-between items-center border-b border-slate-800 pb-6 flex-wrap gap-4">
              <div>
                  <h3 className="text-xl font-black text-white uppercase tracking-wider">Class Schedule &amp; Timetable</h3>
                  <p className="text-xs text-slate-500 font-bold mt-1 uppercase tracking-widest">Active Academic Routine</p>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                  {/* Medium first */}
                  <select
                      value={routMedium}
                      onChange={(e) => { setRoutMedium(e.target.value); setLocalClass("All"); }}
                      className="bg-slate-950 border border-indigo-500/40 text-sm font-bold text-indigo-300 px-4 py-2.5 rounded-xl outline-none focus:border-indigo-500 transition-all cursor-pointer"
                  >
                      <option value="Hindi">Hindi Medium</option>
                      <option value="English">English Medium</option>
                  </select>
                  {/* Then class */}
                  <select
                      value={localClass}
                      onChange={(e) => setLocalClass(e.target.value)}
                      className="bg-slate-950 border border-slate-700 text-sm font-bold text-white px-4 py-2.5 rounded-xl outline-none focus:border-indigo-500 transition-all cursor-pointer"
                  >
                      <option value="All">All Classes</option>
                      {rClassOptions.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
              </div>
          </div>
          
          {!(routineData as any)[displayKey] ? (
              <div className="bg-slate-950/50 rounded-2xl border border-slate-800 p-8 flex flex-col items-center justify-center text-center py-20 border-dashed">
                 <Calendar size={48} className="text-slate-700 mb-4" />
                 <h4 className="text-lg font-black text-slate-300 uppercase tracking-widest mb-2">No Routine Found</h4>
                 <p className="text-sm text-slate-500 font-bold max-w-sm">No scheduled periods for {localClass === "All" ? "any class" : `Class ${localClass}`}. Use &apos;Assign Routine&apos; to create one.</p>
              </div>
          ) : (
              <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[800px]">
                      <thead className="bg-slate-950/50 border-y border-slate-800 text-slate-500">
                          <tr>
                              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest border-r border-slate-800 w-32">Day / Period</th>
                              {[1,2,3,4,"LUNCH",5,6,7].map((p, idx) => (
                                  <th key={idx} className={`px-4 py-4 text-[10px] font-black uppercase tracking-widest text-center ${p === "LUNCH" ? "w-16 opacity-50" : "w-32"}`}>
                                      {p === "LUNCH" ? "Break" : `P${p}`}
                                  </th>
                              ))}
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                          {(routineData as any)[displayKey].map((row: any, i: number) => (
                              <tr key={i} className="hover:bg-slate-800/10 transition-colors group">
                                  <td className="px-6 py-5 border-r border-slate-800">
                                      <span className="text-xs font-black text-white uppercase tracking-widest">{row.day}</span>
                                  </td>
                                  {row.periods.map((subject: string, j: number) => (
                                      <td key={j} className="px-3 py-4 text-center border-r border-slate-800/50 last:border-0 relative group-hover:bg-indigo-500/5 transition-all">
                                          {subject === "LUNCH" ? (
                                             <div className="w-full flex justify-center"><div className="w-[2px] h-8 bg-slate-800/80 rounded-full rotate-12"></div></div>
                                          ) : (
                                              <div className="flex flex-col items-center justify-center gap-1">
                                                  <span className={`text-[11px] font-black uppercase tracking-tight leading-tight ${subject.includes('Maths') || subject.includes('Science') ? 'text-indigo-300' : 'text-slate-300'}`}>{subject.split(' (')[0]}</span>
                                                  {subject.includes('(') && (
                                                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest bg-slate-950/50 px-2 py-0.5 rounded-full border border-slate-800/50 shadow-sm">{subject.split('(')[1].replace(')', '')}</span>
                                                  )}
                                              </div>
                                          )}
                                      </td>
                                  ))}
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          )}
      </div>
  );
  };

  const GenericComingSoon = ({ title, desc, icon: Icon }: { title: string, desc: string, icon: any }) => (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col items-center justify-center shadow-2xl py-32 text-center h-[500px]">
          <div className="w-24 h-24 bg-indigo-500/10 rounded-full flex items-center justify-center mb-6 border border-indigo-500/20 animate-pulse-slow">
              <Icon size={40} className="text-indigo-400" />
          </div>
          <h3 className="text-2xl font-black text-white uppercase tracking-wider mb-2">{title}</h3>
          <p className="text-sm text-slate-500 font-bold max-w-md uppercase tracking-widest leading-relaxed">
              {desc}
          </p>
      </div>
  );

  // ============ EXAM SETUP FORM ============
  const ExamSetupForm = () => {
    const [form, setForm] = React.useState({ exam_name: '', exam_type: 'Unit Test', class: '', medium: 'Hindi', subject: '', exam_date: '', syllabus: '', max_marks: '100', duration_mins: '60', status: 'Scheduled' });
    const [saving, setSaving] = React.useState(false);
    const f = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));
    const eHindi = ["1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th"];
    const eEnglish = ["Nursery","LKG","UKG","1st","2nd","3rd","4th","5th","6th","7th","8th"];
    const SUBJECTS = ["Hindi","English","Math","EVS","Sanskrit","Social Sciences","Science","Computer"];
    const submit = async () => {
      if (!form.exam_name || !form.class || !form.subject || !form.exam_date) { alert('Exam name, class, subject aur date required hai.'); return; }
      setSaving(true);
      const { error } = await supabase.from('exams').insert([{ ...form, max_marks: Number(form.max_marks), status: 'Scheduled', created_by: 'Admin' }]);
      setSaving(false);
      if (error) alert('Error: ' + error.message);
      else { alert('✅ Exam scheduled! Students/Teachers ko unke portal mein dikhega.'); setForm({ exam_name: '', exam_type: 'Unit Test', class: '', medium: 'Hindi', subject: '', exam_date: '', syllabus: '', max_marks: '100', duration_mins: '60', status: 'Scheduled' }); refreshData(); }
    };
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-4xl mx-auto flex flex-col gap-6">
        <div className="flex items-center gap-4 border-b border-slate-800 pb-6">
          <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center"><ClipboardList size={24} className="text-amber-400" /></div>
          <div>
            <h3 className="text-lg font-black text-white uppercase tracking-tight">Setup / Schedule Exam</h3>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Exam set karo — students &amp; teachers ke portal mein automatically dikhega</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1 lg:col-span-2">
            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Exam Name *</label>
            <input value={form.exam_name} onChange={e => f('exam_name', e.target.value)} placeholder="e.g. Half Yearly Exam 2025" className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-bold text-white outline-none focus:ring-2 focus:ring-amber-500/20" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Exam Type</label>
            <select value={form.exam_type} onChange={e => f('exam_type', e.target.value)} className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-bold text-white outline-none">
              {['Unit Test','Half Yearly','Annual','Practice Test','Pre-Board'].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Medium *</label>
            <select value={form.medium} onChange={e => { f('medium', e.target.value); f('class', ''); }} className="bg-slate-950 border border-indigo-500/40 rounded-xl px-4 py-3 text-sm font-bold text-indigo-300 outline-none">
              <option value="Hindi">Hindi Medium</option>
              <option value="English">English Medium</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Class *</label>
            <select value={form.class} onChange={e => f('class', e.target.value)} className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-bold text-white outline-none">
              <option value="">Select Class</option>
              {(form.medium === 'Hindi' ? eHindi : eEnglish).map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Subject *</label>
            <select value={form.subject} onChange={e => f('subject', e.target.value)} className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-bold text-white outline-none">
              <option value="">Select Subject</option>
              {SUBJECTS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Exam Date *</label>
            <input type="date" value={form.exam_date} onChange={e => f('exam_date', e.target.value)} className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-bold text-white outline-none focus:ring-1 focus:ring-amber-500" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Max Marks</label>
            <input type="number" value={form.max_marks} onChange={e => f('max_marks', e.target.value)} className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-bold text-white outline-none" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Duration (mins)</label>
            <input type="number" value={form.duration_mins} onChange={e => f('duration_mins', e.target.value)} className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-bold text-white outline-none" />
          </div>
          <div className="flex flex-col gap-1 lg:col-span-3">
            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Syllabus / Topics</label>
            <textarea value={form.syllabus} onChange={e => f('syllabus', e.target.value)} rows={3} placeholder="e.g. Chapter 1-5, Algebra, Fractions..." className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-bold text-white outline-none resize-none" />
          </div>
        </div>
        
        <button onClick={submit} disabled={saving} className="py-4 bg-amber-500 hover:bg-amber-600 rounded-2xl text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-amber-500/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
          {saving ? 'Scheduling...' : <><ClipboardList size={18} /> Schedule Exam</>}
        </button>
      </div>
    );
  };

  const ExamDashboard = () => (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col gap-6 shadow-2xl overflow-x-auto">
          <div className="flex justify-between items-center border-b border-slate-800 pb-6 min-w-max">
              <div>
                  <h3 className="text-xl font-black text-white uppercase tracking-wider">Exam Dashboard &amp; Transcripts</h3>
                  <p className="text-xs text-slate-500 font-bold mt-1 uppercase tracking-widest">Academic Evaluation Center</p>
              </div>
              <div className="flex items-center gap-3">
                  <div className="bg-indigo-500/10 text-indigo-400 px-4 py-2 border border-indigo-500/20 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 cursor-pointer hover:bg-indigo-500/20 transition-colors">
                      <Download size={16} /> Batch Export CSV
                  </div>
              </div>
          </div>
          
          <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead className="bg-slate-950/50 border-y border-slate-800 text-slate-500">
                      <tr>
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Exam Name</th>
                          <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest">Class / Medium</th>
                          <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest">Subject</th>
                          <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest">Date</th>
                          <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest">Max Marks</th>
                          <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest">Status</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                      {examsData.map((ex: any, i: number) => (
                          <tr key={i} className="hover:bg-slate-800/20 transition-all cursor-pointer">
                              <td className="px-6 py-5">
                                <span className="text-sm font-black text-white">{ex.exam_name || ex.subject || '—'}</span>
                                <p className="text-[10px] font-bold text-slate-500 uppercase">{ex.exam_type || '—'}</p>
                              </td>
                              <td className="px-4 py-5">
                                <span className="text-xs font-black text-white px-3 py-1 bg-slate-950 border border-slate-700 rounded-lg">{ex.class || '—'}</span>
                                <span className="ml-2 text-[9px] font-bold text-indigo-400">{ex.medium || ''}</span>
                              </td>
                              <td className="px-4 py-5"><span className="text-sm font-bold text-slate-300">{ex.subject}</span></td>
                              <td className="px-4 py-5"><span className="text-xs font-bold text-slate-400 tracking-wider uppercase">{ex.exam_date || ex.date}</span></td>
                              <td className="px-4 py-5"><span className="text-sm font-black text-white">{ex.max_marks || 100}</span></td>
                              <td className="px-4 py-5">
                                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${ex.status === 'Published' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : ex.status === 'Evaluated' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'}`}>
                                      {ex.status === 'Published' ? <ShieldCheck size={12} /> : <Clock size={12} />} {ex.status || 'Scheduled'}
                                  </div>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>
  );

  // ============ MARKS ENTRY FORM (Full Flow: Medium → Class → Exam → Students → Marks → Publish) ============
  const MarksEntryForm = () => {
    const SUBJECTS = ["Hindi","English","Math","EVS","Sanskrit","Social Sciences","Science","Computer"];
    const [mMedium, setMMedium] = React.useState("Hindi");
    const [mClass, setMClass] = React.useState("");
    const [mExam, setMExam] = React.useState<any>(null);
    const [marks, setMarks] = React.useState<Record<string,string>>({});
    const [saving, setSaving] = React.useState(false);
    const [publishing, setPublishing] = React.useState(false);

    const mHindi = ["1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th"];
    const mEnglish = ["Nursery","LKG","UKG","1st","2nd","3rd","4th","5th","6th","7th","8th"];
    const mClassOptions = mMedium === "Hindi" ? mHindi : mEnglish;

    // Filter exams by selected class
    const classExams = examsData.filter((e: any) => e.class === mClass);
    // Filter students by class + medium
    const classStudents = studentsData.filter((s: any) => s.class === mClass && (s.medium||'').toLowerCase() === mMedium.toLowerCase());

    const saveMarks = async () => {
      if (!mExam || classStudents.length === 0) { alert('Exam aur class select karo.'); return; }
      setSaving(true);
      const entries = classStudents.map((s: any) => ({
        student_id: s.id,
        student_name: s.full_name || s.name || '',
        class: s.class,
        medium: s.medium,
        subject: mExam.subject,
        exam_type: mExam.exam_type || 'Unit Test',
        exam_name: mExam.exam_name || mExam.subject,
        max_marks: mExam.max_marks || 100,
        marks_obtained: Number(marks[s.id] || 0),
        exam_date: mExam.exam_date || mExam.date || '',
        academic_year: '2024-25',
        status: 'Saved'
      }));
      const { error } = await supabase.from('exams').insert(entries);
      setSaving(false);
      if (error) alert('Error: ' + error.message);
      else { alert('✅ Marks saved for all students!'); refreshData(); }
    };

    const publishResults = async () => {
      if (!mExam) { alert('Exam select karo.'); return; }
      setPublishing(true);
      const { error } = await supabase.from('exams').update({ status: 'Published' }).eq('id', mExam.id);
      setPublishing(false);
      if (error) alert('Error: ' + error.message);
      else { alert('📢 Results published! Students ke portal mein ab dikhenge.'); refreshData(); }
    };

    return (
      <div className="flex flex-col gap-8 max-w-5xl mx-auto">
        {/* Step 1: Medium + Class */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col gap-4">
          <h3 className="text-sm font-black text-white uppercase tracking-widest border-b border-slate-800 pb-4 flex items-center gap-2">
            <ClipboardList size={16} className="text-indigo-400" /> Step 1: Select Medium &amp; Class
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Medium</label>
              <select value={mMedium} onChange={e => { setMMedium(e.target.value); setMClass(''); setMExam(null); setMarks({}); }} className="bg-slate-950 border border-indigo-500/40 rounded-xl px-4 py-3 text-sm font-bold text-indigo-300 outline-none">
                <option value="Hindi">Hindi Medium</option>
                <option value="English">English Medium</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Class</label>
              <select value={mClass} onChange={e => { setMClass(e.target.value); setMExam(null); setMarks({}); }} className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-bold text-white outline-none">
                <option value="">Select Class</option>
                {mClassOptions.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          {mClass && <p className="text-[10px] text-slate-500 font-bold uppercase">{classStudents.length} students found in {mMedium} Medium, Class {mClass}</p>}
        </div>

        {/* Step 2: Select Exam */}
        {mClass && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col gap-4">
            <h3 className="text-sm font-black text-white uppercase tracking-widest border-b border-slate-800 pb-4">Step 2: Select Exam / Test</h3>
            {classExams.length === 0 ? (
              <p className="text-slate-500 text-sm font-bold">Is class ke liye koi exam schedule nahi hai. Pehle &apos;Schedule Exam&apos; se exam banao.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {classExams.map((ex: any, i: number) => (
                  <button key={i} onClick={() => setMExam(ex)} className={`text-left p-4 rounded-2xl border transition-all ${mExam?.id === ex.id ? 'bg-indigo-600 border-indigo-400' : 'bg-slate-950 border-slate-800 hover:border-indigo-500/40'}`}>
                    <p className="text-sm font-black text-white">{ex.exam_name || ex.subject}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">{ex.exam_type} • {ex.subject} • {ex.exam_date || ex.date} • Max: {ex.max_marks || 100}</p>
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded mt-1 inline-block ${ex.status === 'Published' ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-400'}`}>{ex.status || 'Scheduled'}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 3: Enter Marks */}
        {mExam && classStudents.length > 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-widest">Step 3: Enter Marks</h3>
                <p className="text-[10px] text-slate-500 font-bold uppercase">{mExam.exam_name || mExam.subject} • Max: {mExam.max_marks || 100}</p>
              </div>
              <span className="text-[10px] font-black text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">{classStudents.length} Students</span>
            </div>
            <div className="flex flex-col gap-3">
              {classStudents.map((s: any, i: number) => (
                <div key={i} className="flex items-center gap-4 bg-slate-950 rounded-2xl p-4 border border-slate-800">
                  <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 font-black text-sm border border-indigo-500/20 flex-shrink-0">
                    {(s.full_name || s.name || '?')[0]}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-black text-white uppercase">{s.full_name || s.name}</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase">Roll #{s.roll_number} • {s.medium}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <input
                      type="number"
                      min="0"
                      max={mExam.max_marks || 100}
                      value={marks[s.id] || ''}
                      onChange={e => setMarks(p => ({ ...p, [s.id]: e.target.value }))}
                      placeholder="0"
                      className="w-20 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm font-black text-white text-center outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
                    />
                    <span className="text-slate-600 text-xs font-bold">/ {mExam.max_marks || 100}</span>
                    {marks[s.id] && (
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded ${Number(marks[s.id]) >= (mExam.max_marks || 100) * 0.4 ? 'text-green-400 bg-green-500/10' : 'text-rose-400 bg-rose-500/10'}`}>
                        {Math.round((Number(marks[s.id]) / (mExam.max_marks || 100)) * 100)}%
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3 pt-4 border-t border-slate-800">
              <button onClick={saveMarks} disabled={saving} className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-2xl text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-indigo-600/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                {saving ? 'Saving...' : <><ShieldCheck size={18} /> Save All Marks</>}
              </button>
              <button onClick={publishResults} disabled={publishing} className="px-8 py-4 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-2xl text-sm font-black uppercase tracking-widest text-amber-400 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                {publishing ? '...' : <><ArrowUpRight size={18} /> Publish Results</>}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ============ TRANSCRIPT VIEW ============
  const TranscriptView = () => {
    const [selId, setSelId] = React.useState('');
    const studentExams = examsData.filter((e: any) => e.student_id === selId || e.student_name === (studentsData.find((s:any)=>s.id===selId)||{}).full_name);
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col gap-6">
        <h3 className="text-lg font-black text-white uppercase tracking-tight">Student Transcript</h3>
        <div className="flex gap-2 flex-wrap">
          {studentsData.map((s:any,i:number)=>(
            <button key={i} onClick={()=>setSelId(s.id)} className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${selId===s.id?'bg-indigo-600 border-indigo-400 text-white':'bg-slate-950 border-slate-800 text-slate-400 hover:border-indigo-500/50'}`}>{s.full_name||s.name}</button>
          ))}
        </div>
        {selId && (studentExams.length === 0 ? <p className="text-slate-500 text-sm font-bold">Is student ke koi marks nahi milein.</p> : (
          <table className="w-full text-left"><thead><tr>{['Subject','Exam','Date','Marks','Max','%','Status'].map(h=><th key={h} className="px-4 py-3 text-[9px] font-black text-slate-500 uppercase tracking-widest">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-slate-800">
              {studentExams.map((e:any,i:number)=>(
                <tr key={i} className="hover:bg-slate-800/20">
                  <td className="px-4 py-3 text-sm font-bold text-white">{e.subject}</td>
                  <td className="px-4 py-3 text-xs font-bold text-slate-400">{e.exam_name || e.exam_type}</td>
                  <td className="px-4 py-3 text-xs font-bold text-slate-400">{e.exam_date||'—'}</td>
                  <td className="px-4 py-3 text-sm font-black text-indigo-400">{e.marks_obtained}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{e.max_marks}</td>
                  <td className="px-4 py-3 text-sm font-black text-amber-400">{e.max_marks?Math.round((e.marks_obtained/e.max_marks)*100)+'%':'—'}</td>
                  <td className="px-4 py-3"><span className={`text-[9px] font-black px-2 py-0.5 rounded border ${e.status==='Published'?'bg-amber-500/10 text-amber-400 border-amber-500/20':'bg-slate-800 text-slate-500 border-slate-700'}`}>{e.status||'Saved'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>
    );
  };
  // ============ ASSIGN ROUTINE FORM (Full Featured) ============
  const AssignRoutineForm = () => {
    const SUBJECTS = ["Hindi","English","Math","EVS","Sanskrit","Social Sciences","Science","Computer","Physical Education","Art & Craft","Moral Science"];
    const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    
    // Period definitions with time slots
    const PERIOD_SLOTS = [
      { period: 1, label: "Period 1", defaultTime: "08:00", defaultEnd: "08:45" },
      { period: 2, label: "Period 2", defaultTime: "08:45", defaultEnd: "09:30" },
      { period: 3, label: "Period 3", defaultTime: "09:30", defaultEnd: "10:15" },
      { period: 4, label: "Period 4", defaultTime: "10:15", defaultEnd: "11:00" },
      { period: "LUNCH", label: "Lunch Break", defaultTime: "11:00", defaultEnd: "11:30" },
      { period: 5, label: "Period 5", defaultTime: "11:30", defaultEnd: "12:15" },
      { period: 6, label: "Period 6", defaultTime: "12:15", defaultEnd: "13:00" },
      { period: 7, label: "Period 7", defaultTime: "13:00", defaultEnd: "13:45" },
    ];

    const [aMedium, setAMedium] = React.useState("Hindi");
    const [form, setForm] = React.useState({ class: '', day: 'Monday', period: '1', subject: '', teacher_name: '', time_start: '08:00', time_end: '08:45' });
    const [saving, setSaving] = React.useState(false);
    const [deleting, setDeleting] = React.useState(false);
    const f = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));
    
    const aHindiClasses = ["1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th"];
    const aEnglishClasses = ["Nursery","LKG","UKG","1st","2nd","3rd","4th","5th","6th","7th","8th"];
    const aClassOptions = aMedium === "Hindi" ? aHindiClasses : aEnglishClasses;
    const teachers = staffData.map((t:any)=>t.full_name||t.name||'');

    // Auto-fill time when period selected
    const handlePeriodChange = (val: string) => {
      const slot = PERIOD_SLOTS.find(s => String(s.period) === val);
      if (slot) { f('period', val); setForm(p => ({ ...p, period: val, time_start: slot.defaultTime, time_end: slot.defaultEnd })); }
      else f('period', val);
    };

    const submit = async () => {
      if (!form.class || !form.subject) { alert('Class aur subject required hai.'); return; }
      setSaving(true);
      const timeSlot = `${form.time_start}-${form.time_end}`;
      const { error } = await supabase.from('routine').upsert([{ class: form.class, day: form.day, period: isNaN(Number(form.period)) ? form.period : Number(form.period), subject: form.subject, teacher_name: form.teacher_name, time_slot: timeSlot }], { onConflict: 'class,day,period' });
      setSaving(false);
      if (error) alert('Error: ' + error.message);
      else { alert('✅ Routine slot saved!'); refreshData(); }
    };

    const deleteSlot = async () => {
      if (!form.class || !form.day || !form.period) { alert('Class, day aur period select karo delete ke liye.'); return; }
      if (!confirm(`Delete: Class ${form.class} - ${form.day} - Period ${form.period}?`)) return;
      setDeleting(true);
      const { error } = await supabase.from('routine').delete().eq('class', form.class).eq('day', form.day).eq('period', isNaN(Number(form.period)) ? form.period : Number(form.period));
      setDeleting(false);
      if (error) alert('Delete failed: ' + error.message);
      else { alert('🗑️ Slot deleted!'); refreshData(); }
    };

    // Mini analog clock display
    const ClockDisplay = ({ time }: { time: string }) => {
      const [h, m] = time.split(':').map(Number);
      const hourDeg = (h % 12) * 30 + m * 0.5;
      const minDeg = m * 6;
      return (
        <div className="relative w-16 h-16 flex-shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="48" fill="#0f172a" stroke="#334155" strokeWidth="2" />
            {[...Array(12)].map((_,i) => {
              const a = (i * 30 - 90) * Math.PI / 180;
              return <line key={i} x1={50 + 40*Math.cos(a)} y1={50 + 40*Math.sin(a)} x2={50 + 44*Math.cos(a)} y2={50 + 44*Math.sin(a)} stroke="#475569" strokeWidth="1.5" />;
            })}
            {/* Hour hand */}
            <line x1="50" y1="50" x2={50 + 26*Math.cos((hourDeg - 90) * Math.PI / 180)} y2={50 + 26*Math.sin((hourDeg - 90) * Math.PI / 180)} stroke="#818cf8" strokeWidth="3" strokeLinecap="round" />
            {/* Minute hand */}
            <line x1="50" y1="50" x2={50 + 35*Math.cos((minDeg - 90) * Math.PI / 180)} y2={50 + 35*Math.sin((minDeg - 90) * Math.PI / 180)} stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
            <circle cx="50" cy="50" r="3" fill="#6366f1" />
          </svg>
        </div>
      );
    };

    // Full timetable view for selected class
    const classTimetable = form.class ? (routineData as any)[form.class] || [] : [];

    return (
      <div className="flex flex-col gap-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col gap-6">
          <div className="flex items-center gap-4 border-b border-slate-800 pb-6">
            <div className="w-12 h-12 bg-rose-500/10 rounded-2xl flex items-center justify-center"><Calendar size={24} className="text-rose-400" /></div>
            <div>
              <h3 className="text-lg font-black text-white uppercase tracking-tight">Assign Routine</h3>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Medium → Class → Period → Subject → Save/Update/Delete</p>
            </div>
          </div>

          {/* Step 1: Medium + Class */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Step 1: Medium</label>
              <select value={aMedium} onChange={e => { setAMedium(e.target.value); f('class', ''); }} className="bg-slate-950 border border-indigo-500/40 rounded-xl px-3 py-3 text-sm font-bold text-indigo-300 outline-none">
                <option value="Hindi">Hindi Medium</option>
                <option value="English">English Medium</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Step 2: Class</label>
              <select value={form.class} onChange={e => f('class', e.target.value)} className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-3 text-sm font-bold text-white outline-none">
                <option value="">Select Class</option>
                {aClassOptions.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Step 2: Day + Period */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Day</label>
              <select value={form.day} onChange={e => f('day', e.target.value)} className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-3 text-sm font-bold text-white outline-none">
                {DAYS.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Period</label>
              <select value={form.period} onChange={e => handlePeriodChange(e.target.value)} className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-3 text-sm font-bold text-white outline-none">
                {PERIOD_SLOTS.map(s => <option key={String(s.period)} value={String(s.period)}>{s.label}</option>)}
              </select>
            </div>
          </div>

          {/* Clock + Time Input */}
          <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 flex items-center gap-6">
            <ClockDisplay time={form.time_start} />
            <div className="flex flex-col gap-3 flex-1">
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Time Slot (Clock se set hoga)</p>
              <div className="flex items-center gap-3">
                <div className="flex flex-col gap-1 flex-1">
                  <label className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Start Time</label>
                  <input type="time" value={form.time_start} onChange={e => f('time_start', e.target.value)} className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-white outline-none focus:ring-1 focus:ring-indigo-500" />
                </div>
                <span className="text-slate-600 font-black mt-4">→</span>
                <div className="flex flex-col gap-1 flex-1">
                  <label className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">End Time</label>
                  <input type="time" value={form.time_end} onChange={e => f('time_end', e.target.value)} className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-white outline-none focus:ring-1 focus:ring-indigo-500" />
                </div>
              </div>
              <p className="text-xs font-black text-white">{form.time_start} – {form.time_end}</p>
            </div>
          </div>

          {/* Subject dropdown + Teacher */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Subject</label>
              <select value={form.subject} onChange={e => f('subject', e.target.value)} className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-3 text-sm font-bold text-white outline-none focus:ring-1 focus:ring-rose-500">
                <option value="">Select Subject</option>
                {SUBJECTS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Assign Teacher</label>
              <select value={form.teacher_name} onChange={e => f('teacher_name', e.target.value)} className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-3 text-sm font-bold text-white outline-none">
                <option value="">Select Teacher</option>
                {teachers.map((t: string, i: number) => <option key={i}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2 border-t border-slate-800">
            <button onClick={submit} disabled={saving} className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-2xl text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-indigo-600/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              {saving ? 'Saving...' : <><Plus size={16} /> Save / Update Slot</>}
            </button>
            <button onClick={deleteSlot} disabled={deleting} className="px-8 py-4 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-2xl text-sm font-black uppercase tracking-widest text-rose-400 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              {deleting ? '...' : <><Trash2 size={16} /> Delete Slot</>}
            </button>
          </div>
        </div>

        {/* Live Full Timetable for selected class */}
        {form.class && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col gap-4">
            <h4 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
              <TableIcon size={16} className="text-indigo-400" /> Full Timetable — Class {form.class}
              <span className="ml-auto text-[9px] font-bold text-slate-500">Live from DB</span>
            </h4>
            {classTimetable.length === 0 ? (
              <p className="text-slate-500 text-sm font-bold text-center py-8">Koi routine assign nahi hai abhi. Upar se add karo.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead className="bg-slate-950/50 border-y border-slate-800">
                    <tr>
                      {["Day","Period","Time","Subject","Teacher","Actions"].map(h => (
                        <th key={h} className="px-4 py-3 text-[9px] font-black text-slate-500 uppercase tracking-widest">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {classTimetable.map((row: any, i: number) => (
                      <tr key={i} className="hover:bg-slate-800/20 transition-colors group">
                        <td className="px-4 py-3 text-xs font-black text-white uppercase">{row.day}</td>
                        <td className="px-4 py-3">
                          <span className="text-[10px] font-black text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                            {typeof row.period === 'number' ? `P${row.period}` : row.period}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs font-bold text-slate-400">{row.time_slot || '—'}</td>
                        <td className="px-4 py-3 text-xs font-black text-white">{row.subject || '—'}</td>
                        <td className="px-4 py-3 text-xs font-bold text-slate-400">{row.teacher_name || '—'}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => setForm({ class: row.class, day: row.day, period: String(row.period), subject: row.subject || '', teacher_name: row.teacher_name || '', time_start: (row.time_slot||'').split('-')[0] || '08:00', time_end: (row.time_slot||'').split('-')[1] || '08:45' })}
                              className="text-[9px] font-black text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-1 rounded-lg hover:bg-indigo-500/20 transition-all"
                            >✏️ Edit</button>
                            <button
                              onClick={async () => {
                                if (!confirm(`Delete ${row.day} P${row.period} from Class ${form.class}?`)) return;
                                await supabase.from('routine').delete().eq('class', row.class).eq('day', row.day).eq('period', row.period);
                                refreshData();
                              }}
                              className="text-[9px] font-black text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-1 rounded-lg hover:bg-rose-500/20 transition-all"
                            >🗑️ Del</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };
  // ============ TEACHER WORKLOAD VIEW ============
  const TeacherWorkloadView = () => (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col gap-6">
      <h3 className="text-lg font-black text-white uppercase tracking-tight">Teacher Workload</h3>
      {staffData.length === 0 ? <p className="text-slate-500 text-sm font-bold">Koi staff registered nahi hai abhi.</p> : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {staffData.map((t:any,i:number)=>{
            const slots = Object.values(routineData).flat().filter((r:any)=>r.teacher_name===(t.full_name||t.name));
            return (
              <div key={i} className="bg-slate-950 border border-slate-800 rounded-2xl p-5">
                <p className="text-sm font-black text-white uppercase mb-1">{t.full_name||t.name||'—'}</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase mb-3">{t.subjects_assigned||t.subject||'—'}</p>
                <p className="text-xs font-bold text-indigo-400">{(slots as any[]).length} periods assigned</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {(slots as any[]).slice(0,6).map((s:any,j:number)=><span key={j} className="text-[9px] bg-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded-md border border-indigo-500/20 font-bold">{s.class} {s.day} P{s.period}</span>)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );


  // ============ PUBLISH NOTICE FORM ============
  const PublishNoticeForm = () => {
    const [form, setForm] = React.useState({ title: '', content: '', audience: 'All', priority: 'Normal' });
    const [saving, setSaving] = React.useState(false);
    const f = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));
    const submit = async () => {
      if (!form.title || !form.content) { alert('Title aur content required hai.'); return; }
      setSaving(true);
      const { error } = await supabase.from('notices').insert([{ ...form, published_by: 'Admin', is_active: true }]);
      setSaving(false);
      if (error) alert('Error: ' + error.message);
      else { alert('✅ Notice published!'); setForm({ title: '', content: '', audience: 'All', priority: 'Normal' }); refreshData(); setActiveSubView('default'); }
    };
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-2xl mx-auto flex flex-col gap-6">
        <div className="flex items-center gap-4 border-b border-slate-800 pb-6">
          <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center"><BookOpen size={24} className="text-amber-400" /></div>
          <div><h3 className="text-lg font-black text-white uppercase tracking-tight">Publish Notice</h3><p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Board par notice post karo</p></div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1"><label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Notice Title *</label><input value={form.title} onChange={e => f('title', e.target.value)} placeholder="e.g. Annual Sports Day — 20 May 2026" className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-bold text-white focus:ring-2 focus:ring-amber-500/20 outline-none" /></div>
          <div className="flex flex-col gap-1"><label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Content / Details *</label><textarea value={form.content} onChange={e => f('content', e.target.value)} rows={4} placeholder="Notice ka pura content likhiye..." className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-bold text-white focus:ring-2 focus:ring-amber-500/20 outline-none resize-none" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1"><label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Audience</label>
              <select value={form.audience} onChange={e => f('audience', e.target.value)} className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-bold text-white outline-none">
                {['All','Students','Teachers','Parents'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1"><label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Priority</label>
              <select value={form.priority} onChange={e => f('priority', e.target.value)} className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-bold text-white outline-none">
                {['Normal','Important','Urgent'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <button onClick={submit} disabled={saving} className="mt-2 w-full py-4 bg-amber-500 hover:bg-amber-600 rounded-2xl text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-amber-500/20 transition-all disabled:opacity-50">
            {saving ? 'Publishing...' : '📌 Publish Notice'}
          </button>
        </div>
      </div>
    );
  };
  const NoticeDashboard = () => (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col gap-6 shadow-2xl">
          <div className="flex justify-between items-center border-b border-slate-800 pb-6">
              <div>
                  <h3 className="text-xl font-black text-white uppercase tracking-wider">Institution Notice Board</h3>
                  <p className="text-xs text-slate-500 font-bold mt-1 uppercase tracking-widest">Active Bulletins & Announcements</p>
              </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {noticesData.map((notice, i) => (
                  <div key={i} className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col hover:border-indigo-500/50 hover:shadow-indigo-500/10 transition-all hover:shadow-2xl">
                      <div className="flex justify-between items-start mb-4">
                          <span className={`px-2 py-1 rounded-[4px] text-[9px] font-black uppercase tracking-widest border ${
                              notice.severity === 'high' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                              notice.severity === 'medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                              'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                          }`}>
                              {notice.type}
                          </span>
                          <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1"><Clock size={12}/> {notice.date}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-200 mb-3 leading-snug">{notice.title}</h4>
                      <div className="mt-auto pt-4 border-t border-slate-800/50 flex align-center gap-2">
                          <Users size={14} className="text-slate-600"/>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{notice.audience}</span>
                      </div>
                  </div>
              ))}
          </div>
      </div>
  );

  const TabNavigation = () => {
    let tabs = [];
    if (activeTab === "account") {
      tabs = [
          { id: "registry", label: "Financial Dashboard", icon: PieChart },
          { id: "entry", label: "Collect Revenue", icon: Plus },
          { id: "analytics", label: "Register Expense", icon: Receipt }
      ];
    } else if (activeTab === "routine") {
      tabs = [
          { id: "registry", label: "Class Schedule", icon: Calendar },
          { id: "entry", label: "Assign Routine", icon: Plus },
          { id: "analytics", label: "Teacher Workload", icon: PieChart }
      ];
    } else if (activeTab === "exam") {
      tabs = [
          { id: "registry", label: "Exam Dashboard", icon: ClipboardList },
          { id: "entry", label: "Schedule Exam", icon: Plus },
          { id: "analytics", label: "Marks Entry & Publish", icon: FileText }
      ];
    } else if (activeTab === "notice") {
      tabs = [
          { id: "registry", label: "Notice Board", icon: Bell },
          { id: "entry", label: "Publish Notice", icon: Plus },
          { id: "analytics", label: "Communication Logs", icon: FileBox }
      ];
    } else {
      tabs = [
          { id: "registry", label: "Registry Ledger", icon: TableIcon },
          { id: "entry", label: activeTab === "teachers" ? "Add New Staff" : "Admission Form", icon: Plus },
          { id: "analytics", label: activeTab === "students" ? "Student Inspector" : "Staff Directory", icon: Search }
      ];
    }

    return (
      <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-2xl md:w-fit max-w-full mb-8 border border-slate-800 shadow-2xl overflow-x-auto scrollbar-hide">
        {tabs.map((sub) => (
        <button
          key={sub.id}
          onClick={() => {
            setActiveSubView(sub.id as SubView);
            setSelectedStudent(null);
            if (sub.id !== "analytics") setInspectorQuery("");
          }}
          className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
            activeSubView === sub.id 
            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
            : "text-slate-500 hover:text-white"
          }`}
        >
          <sub.icon size={14} /> {sub.label}
        </button>
      ))}
      </div>
    );
  };

  const globalStyles = `
    @media print {
      @page { size: A4 portrait; margin: 0; }
      body * { visibility: hidden !important; }
      #svb-print-hub, #svb-print-hub * { visibility: visible !important; }
      #svb-print-hub {
        display: flex !important;
        flex-direction: column !important;
        position: fixed !important;
        left: 0 !important; top: 0 !important;
        width: 210mm !important;
        min-height: 297mm !important; max-height: 297mm !important;
        background: #ffffff !important;
        margin: 0 !important; padding: 0 !important;
        z-index: 999999 !important;
        overflow: hidden !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      aside, header, nav, .print\\:hidden { display: none !important; }
    }
  `;


  const adminContextValue = {
      activeTab, setActiveTab, activeSubView, setActiveSubView,
      dbStudents, setDbStudents, dbTeachers, setDbTeachers,
      dbAccounts, setDbAccounts, dbRoutine, setDbRoutine,
      dbExams, setDbExams, dbNotices, setDbNotices,
      dbAdmissions, setDbAdmissions, dbMessages, setDbMessages,
      isSidebarOpen, setIsSidebarOpen, isMounted, setIsMounted,
      selectedStudent, setSelectedStudent,
      refreshData
  };

  return (
    <AdminProvider value={adminContextValue}>
      <div className="min-h-screen bg-slate-950 selection:bg-indigo-500/20 font-JakartaSans relative overflow-x-hidden text-slate-100">
      <style>{globalStyles}</style>
      <Sidebar />

      {/* Main Viewport */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? "lg:ml-64" : "lg:ml-20"}`}>
        <Header />

        <main className="max-w-7xl mx-auto p-4 lg:p-8 min-h-[calc(100vh-100px)]">
            {/* Inject In-Page Navigation for major modules */}
            {["students", "teachers", "account", "routine", "exam", "notice"].includes(activeTab) && <TabNavigation />}

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab + activeSubView}
                    initial={{ opacity: 0, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.15 }}
                >
                    {activeTab === "dashboard" && <DashboardOverview />}
                    
                    {/* Multi-view Logic for Modules */}
                    {activeTab === "students" && (
                        <>
                            {activeSubView === "registry" && RegistryView("Student Registry", studentsData)}
                            {activeSubView === "entry" && <FormView onRefresh={refreshData} title="Student Admission" fields={[
                                { label: "Admission Type", type: "select", options: ["New", "Transfer"] },
                                { label: "Admission Date", type: "date" },
                                { label: "Student Full Name", type: "text" },
                                { label: "SR Number", type: "text" },
                                { label: "Aadhar Number", type: "text" },
                                { label: "Date of Birth", type: "date" },
                                { label: "Gender", type: "select", options: ["Male", "Female", "Other"] },
                                { label: "Category", type: "select", options: ["General", "OBC", "SC", "ST", "SBC", "RTE"], value: selectedCategory, onChange: setSelectedCategory },
                                { label: "Medium Preference", type: "select", options: ["English", "Hindi"], value: selectedMedium, onChange: setSelectedMedium },
                                { label: "Class Enrollment", type: "select", options: selectedMedium === "English" ? ["Nursery", "LKG", "UKG", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"] : ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"] },
                                { label: "Father's Name", type: "text" },
                                { label: "Father's Occupation", type: "text" },
                                { label: "Mother's Name", type: "text" },
                                { label: "Mother's Occupation", type: "text" },
                                { label: "Contact Number", type: "text" },
                                { label: "Student Photo", type: "file" },
                            ]} />}
                            {activeSubView === "analytics" && <InspectorView />}
                        </>
                    )}

                    {activeTab === "teachers" && (
                        <>
                            {activeSubView === "registry" && RegistryView("Staff Info", staffData)}
                            {activeSubView === "entry" && <FormView onRefresh={refreshData} title="Add New Staff" fields={[
                                { label: "Full Name", type: "text" },
                                { label: "Residential Address", type: "text" },
                                { label: "Date of Birth", type: "date" },
                                { label: "Educational Qualifications", type: "text" },
                                { label: "Subjects Assigned", type: "text" },
                                { label: "Designated Classes", type: "text" },
                                { label: "Contact Number", type: "text" },
                                { label: "Joining Date", type: "date" },
                                { label: "Base Salary (₹)", type: "text" },
                                { label: "Staff Photo", type: "file" }
                            ]} />}
                            {activeSubView === "analytics" && <InspectorView />}
                        </>
                    )}

                    {activeTab === "account" && (
                        <>
                            {(activeSubView === "default" || activeSubView === "registry") && <AccountsDashboard />}
                            {activeSubView === "entry" && <AccountsForm type="INCOME" />}
                            {activeSubView === "analytics" && <AccountsForm type="EXPENSE" />}
                        </>
                    )}

                    {activeTab === "routine" && (
                        <>
                            {(activeSubView === "default" || activeSubView === "registry") && <RoutineDashboard />}
                            {activeSubView === "entry" && <AssignRoutineForm />}
                            {activeSubView === "analytics" && <TeacherWorkloadView />}
                        </>
                    )}

                    {activeTab === "exam" && (
                        <>
                            {(activeSubView === "default" || activeSubView === "registry") && <ExamDashboard />}
                            {activeSubView === "entry" && <ExamSetupForm />}
                            {activeSubView === "analytics" && <MarksEntryForm />}
                        </>
                    )}

                    {activeTab === "notice" && (
                        <>
                            {(activeSubView === "default" || activeSubView === "registry") && <NoticeDashboard />}
                            {activeSubView === "entry" && <PublishNoticeForm />}
                            {activeSubView === "analytics" && (
                              <div className="flex flex-col gap-8 p-6">
                                {/* ADMISSION INQUIRIES */}
                                <div>
                                  <div className="flex items-center justify-between mb-4">
                                    <div>
                                      <h3 className="text-base font-black text-white uppercase tracking-tight">📋 Admission Inquiries</h3>
                                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">From main website — admissions_inquiries table</p>
                                    </div>
                                    <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-[10px] font-black border border-indigo-500/20">{dbAdmissions.length} Total</span>
                                  </div>
                                  {dbAdmissions.length === 0 ? (
                                    <div className="bg-slate-900 rounded-2xl p-8 text-center border border-slate-800">
                                      <p className="text-slate-500 text-sm font-bold">No inquiries yet. They will appear here when someone fills the admission form on the website.</p>
                                    </div>
                                  ) : (
                                    <div className="flex flex-col gap-3">
                                      {dbAdmissions.map((inq: any, i: number) => (
                                        <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-indigo-500/30 transition-all">
                                          <div className="flex flex-col gap-1">
                                            <span className="text-sm font-black text-white">{inq.student_name || inq.name || "—"}</span>
                                            <span className="text-[11px] text-slate-400 font-bold">Class: {inq.class_level || inq.class || "—"} • Medium: {inq.medium || "—"} • Parent: {inq.father_name || inq.parent_name || "—"}</span>
                                            <span className="text-[10px] text-slate-500">📞 {inq.mobile || inq.phone || inq.contact || "—"} • 🕐 {inq.created_at ? new Date(inq.created_at).toLocaleDateString('en-IN') : "—"}</span>
                                          </div>
                                          <div className="flex gap-2">
                                            {(inq.mobile || inq.phone || inq.contact) && (
                                              <a href={"https://wa.me/91" + String(inq.mobile || inq.phone || inq.contact || "").replace(/[^0-9]/g,"")} target="_blank" rel="noreferrer" className="px-3 py-1.5 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl text-[10px] font-black hover:bg-green-500/20 transition-all">WhatsApp</a>
                                            )}
                                            <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black border ${inq.status === 'Contacted' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-amber-500/10 border-amber-500/20 text-amber-400'}`}>{inq.status || "New"}</span>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                                {/* CONTACT MESSAGES */}
                                <div>
                                  <div className="flex items-center justify-between mb-4">
                                    <div>
                                      <h3 className="text-base font-black text-white uppercase tracking-tight">💬 Contact Messages</h3>
                                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">From main website — contact_messages table</p>
                                    </div>
                                    <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-[10px] font-black border border-purple-500/20">{dbMessages.length} Total</span>
                                  </div>
                                  {dbMessages.length === 0 ? (
                                    <div className="bg-slate-900 rounded-2xl p-8 text-center border border-slate-800">
                                      <p className="text-slate-500 text-sm font-bold">No messages yet. They will appear here when someone uses "Send us a message" on the website.</p>
                                    </div>
                                  ) : (
                                    <div className="flex flex-col gap-3">
                                      {dbMessages.map((msg: any, i: number) => (
                                        <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-purple-500/30 transition-all">
                                          <div className="flex items-start justify-between gap-3 mb-2">
                                            <div>
                                              <span className="text-sm font-black text-white">{msg.full_name || msg.name || "—"}</span>
                                              <span className="text-[10px] text-slate-500 ml-3">📞 {msg.phone || msg.contact || "—"} • ✉️ {msg.email || msg.address || "—"}</span>
                                            </div>
                                            <span className="text-[10px] text-slate-500 flex-shrink-0">{msg.created_at ? new Date(msg.created_at).toLocaleDateString('en-IN') : "—"}</span>
                                          </div>
                                          <p className="text-sm text-slate-400 bg-slate-950 rounded-xl p-3 border border-slate-800">{msg.message || msg.body || "—"}</p>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                        </>
                    )}

                    {/* Default View for other tabs */}
                    {!["dashboard", "students", "teachers", "account", "routine", "exam", "notice"].includes(activeTab) && (
                        <div className="flex flex-col items-center justify-center py-20 bg-slate-900 border border-slate-800 rounded-3xl shadow-premium">
                             <div className="w-16 h-16 bg-slate-850 rounded-2xl flex items-center justify-center mb-6 border border-slate-700">
                                 <Zap size={32} className="text-slate-600" />
                             </div>
                             <h3 className="text-lg font-black text-white uppercase tracking-tight">{activeTab} MODULE</h3>
                             <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2">Institutional Component in Development Matrix</p>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </main>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; cursor: default; background: #020617; }

        @media print {
            body { font-family: 'Plus Jakarta Sans', sans-serif; cursor: default; }
        }

        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-pulse-slow { animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        
        .shadow-premium {
          box-shadow: 0 10px 40px -10px rgba(0,0,0,0.5), 0 0 20px -5px rgba(99,102,241,0.1);
        }
      `}</style>
    </div>
    </AdminProvider>
  );
}
