"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
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
  type: "text" | "select" | "date"; 
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

const PremiumCalendar = ({ value, onChange, label }: { value: string, onChange: (v: string) => void, label: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(new Date(value || new Date()));
  
  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();
  
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const handleDateSelect = (day: number) => {
      const d = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
      onChange(d.toISOString().split('T')[0]);
      setIsOpen(false);
  };

  const formatDate = (val: string) => {
      if (!val) return "";
      const [y, m, d] = val.split('-');
      return `${d}-${m}-${y}`;
  };

  const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - 30 + i);

  return (
    <div className="relative flex flex-col gap-2.5 group">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1 ml-1 group-focus-within:text-indigo-400 transition-colors">{label}</label>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-5 py-4 text-sm font-bold text-white flex items-center justify-between cursor-pointer hover:border-indigo-500/50 transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)] group-hover:bg-slate-900"
      >
        <span className={value ? "text-white" : "text-slate-600"}>{value ? formatDate(value) : "Select Date"}</span>
        <Calendar className="text-slate-600 transition-colors group-hover:text-indigo-400" size={16} />
      </div>
      
      <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-full left-0 mt-2 z-[9999] bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-[280px] backdrop-blur-2xl overflow-hidden"
            >
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500" />
               
               <div className="flex items-center justify-between mb-4">
                  <button onClick={() => setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() - 1)))} className="p-2 hover:bg-slate-800 rounded-xl text-slate-400"><ChevronRight className="rotate-180" size={16} /></button>
                  <div className="flex gap-2">
                      <select value={viewDate.getMonth()} onChange={(e) => setViewDate(new Date(viewDate.setMonth(parseInt(e.target.value))))} className="bg-slate-950 text-white text-[10px] font-bold uppercase tracking-widest border border-slate-700 rounded p-1 outline-none">
                         {months.map((m, i) => <option key={m} value={i} className="bg-slate-950">{m}</option>)}
                      </select>
                      <select value={viewDate.getFullYear()} onChange={(e) => setViewDate(new Date(viewDate.setFullYear(parseInt(e.target.value))))} className="bg-slate-950 text-white text-[10px] font-bold uppercase tracking-widest border border-slate-700 rounded p-1 outline-none">
                         {years.map(y => <option key={y} value={y} className="bg-slate-950">{y}</option>)}
                      </select>
                  </div>
                  <button onClick={() => setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() + 1)))} className="p-2 hover:bg-slate-800 rounded-xl text-slate-400"><ChevronRight size={16} /></button>
               </div>

               <div className="grid grid-cols-7 gap-1 mb-2 text-center">
                  {["S", "M", "T", "W", "T", "F", "S"].map(d => <span key={d} className="text-[8px] font-black text-slate-600 uppercase">{d}</span>)}
               </div>

               <div className="grid grid-cols-7 gap-1 text-center">
                  {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                      const day = i + 1;
                      const isSelected = value && new Date(value).getDate() === day && new Date(value).getMonth() === viewDate.getMonth();
                      return (
                          <button 
                              key={day} 
                              onClick={() => handleDateSelect(day)}
                              className={`h-8 w-8 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center ${isSelected ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                          >
                              {day}
                          </button>
                      );
                  })}
               </div>

               <div className="mt-4 pt-4 border-t border-slate-800 flex justify-center">
                  <button onClick={() => { onChange(new Date().toISOString().split('T')[0]); setIsOpen(false); }} className="text-[9px] font-black uppercase tracking-widest text-indigo-400 hover:text-indigo-300 transition-colors">Select Today</button>
               </div>
            </motion.div>
          )}
      </AnimatePresence>
    </div>
  );
};

const PrintLayout = ({ data, student }: { data?: any, student?: any }) => {
  const info = data || student;
  return (
      <div id="svb-print-hub" className="hidden print:flex absolute left-0 top-0 z-[999999] bg-white text-slate-900 font-sans flex-col m-0 p-0 box-border border-none" style={{ width: '210mm', height: '297mm' }}>
          {/* Header Banner - Plane Design */}
          <div className="w-full bg-[#2A3B8C] text-white py-6 px-12 flex items-center justify-between m-0">
              <div className="flex items-center gap-6">
                 {/* Real Logo Plane */}
                 <div className="w-24 h-24 bg-white flex items-center justify-center border-2 border-white">
                    <img src="/logo.png" alt="SVB Logo" className="w-full h-full object-contain" />
                 </div>
                 <div className="flex flex-col">
                     <h1 className="text-3xl font-black uppercase tracking-wide leading-tight mb-2">Sanskar Vidya Bhawan</h1>
                     <h2 className="text-sm font-bold tracking-[0.3em] uppercase bg-white text-[#2A3B8C] w-max px-4 py-1">Admission Form</h2>
                 </div>
              </div>
              <div className="w-32 h-40 border-2 border-dashed border-white flex items-center justify-center text-center opacity-80 p-2">
                 <span className="text-xs font-bold uppercase tracking-widest">Affix Recent<br/>Passport Size<br/>Photo</span>
              </div>
          </div>

          {/* Form Body - Dotted Grid */}
          <div className="flex-1 px-12 py-10 flex flex-col gap-8">
              {/* Personal Details */}
              <div className="flex flex-col gap-6">
                  <div className="flex border-b-[2px] border-dotted border-gray-400 pb-2">
                      <span className="w-48 text-sm font-bold text-gray-700 capitalize">Student's Name :</span>
                      <span className="flex-1 text-sm font-black text-black uppercase tracking-wider">{info?.["Student Full Name"] || "___________________"}</span>
                  </div>
                  <div className="flex border-b-[2px] border-dotted border-gray-400 pb-2">
                      <span className="w-48 text-sm font-bold text-gray-700 capitalize">Father's Name :</span>
                      <span className="flex-1 text-sm font-black text-black uppercase tracking-wider">{info?.["Father's Name"] || "___________________"}</span>
                  </div>
                  <div className="flex border-b-[2px] border-dotted border-gray-400 pb-2">
                      <span className="w-48 text-sm font-bold text-gray-700 capitalize">Mother's Name :</span>
                      <span className="flex-1 text-sm font-black text-black uppercase tracking-wider">{info?.["Mother's Name"] || "___________________"}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-10">
                      <div className="flex border-b-[2px] border-dotted border-gray-400 pb-2">
                          <span className="w-32 text-sm font-bold text-gray-700 capitalize">Birth Date :</span>
                          <span className="flex-1 text-sm font-black text-black uppercase tracking-wider">{info?.["Date of Birth"] ? info["Date of Birth"].split('-').reverse().join('-') : "____/____/______"}</span>
                      </div>
                      <div className="flex border-b-[2px] border-dotted border-gray-400 pb-2 items-center gap-4">
                          <span className="w-24 text-sm font-bold text-gray-700 capitalize">Gender :</span>
                          <div className="flex items-center gap-6">
                              <label className="flex items-center gap-2 text-sm font-bold"><input type="radio" checked={info?.Gender === "Male"} readOnly className="w-4 h-4" /> Male</label>
                              <label className="flex items-center gap-2 text-sm font-bold"><input type="radio" checked={info?.Gender === "Female"} readOnly className="w-4 h-4" /> Female</label>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Admission Specifics */}
              <div className="border-[2px] border-dashed border-gray-300 p-6 rounded-xl relative mt-4">
                  <span className="absolute -top-3 left-6 bg-white px-3 text-sm font-black text-gray-500 uppercase tracking-widest">Admission specifics</span>
                  <div className="grid grid-cols-2 gap-10">
                      <div className="flex border-b-[2px] border-dotted border-gray-400 pb-2">
                          <span className="w-32 text-sm font-bold text-gray-700 capitalize">Class (Admitted) :</span>
                          <span className="flex-1 text-sm font-black text-black uppercase tracking-wider">{info?.["Class Enrollment"] || "___________________"}</span>
                      </div>
                      <div className="flex border-b-[2px] border-dotted border-gray-400 pb-2">
                          <span className="w-32 text-sm font-bold text-gray-700 capitalize">Category :</span>
                          <span className="flex-1 text-sm font-black text-black uppercase tracking-wider">{info?.Category || "___________________"}</span>
                      </div>
                      <div className="flex border-b-[2px] border-dotted border-gray-400 pb-2">
                          <span className="w-32 text-sm font-bold text-gray-700 capitalize">Language Medium :</span>
                          <span className="flex-1 text-sm font-black text-black uppercase tracking-wider">{info?.["Medium Preference"] || "___________________"}</span>
                      </div>
                      <div className="flex border-b-[2px] border-dotted border-gray-400 pb-2">
                          <span className="w-32 text-sm font-bold text-gray-700 capitalize">SR / Reg Number :</span>
                          <span className="flex-1 text-sm font-black text-black uppercase tracking-wider">{info?.["SR Number"] || "___________________"}</span>
                      </div>
                  </div>
              </div>

              {/* Other Info */}
              <div className="grid grid-cols-2 gap-x-10 gap-y-6 mt-4">
                  <div className="flex border-b-[2px] border-dotted border-gray-400 pb-2">
                      <span className="w-32 text-sm font-bold text-gray-700 capitalize">Phone Number :</span>
                      <span className="flex-1 text-sm font-black text-black uppercase tracking-wider">{info?.["Contact Number"] || "___________________"}</span>
                  </div>
                  <div className="flex border-b-[2px] border-dotted border-gray-400 pb-2">
                      <span className="w-32 text-sm font-bold text-gray-700 capitalize">Aadhar Number :</span>
                      <span className="flex-1 text-sm font-black text-black uppercase tracking-wider">{info?.["Aadhar Number"] || "___________________"}</span>
                  </div>
                  <div className="flex border-b-[2px] border-dotted border-gray-400 pb-2">
                      <span className="w-32 text-sm font-bold text-gray-700 capitalize">Father Occup. :</span>
                      <span className="flex-1 text-sm font-black text-black uppercase tracking-wider">{info?.["Father's Occupation"] || "___________________"}</span>
                  </div>
                  <div className="flex border-b-[2px] border-dotted border-gray-400 pb-2">
                      <span className="w-32 text-sm font-bold text-gray-700 capitalize">Agreed Fee (₹) :</span>
                      <span className="flex-1 text-sm font-black text-black uppercase tracking-wider">{info?.["Calculated Fee"] || "___________________"}</span>
                  </div>
              </div>

              {/* Declaration & Signatures Wrapper */}
              <div className="mt-auto flex flex-col w-full px-4 pb-8">
                  <div className="mb-12">
                      <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-2 text-center">Declaration</h4>
                      <p className="text-[11px] leading-relaxed text-gray-600 font-medium text-justify">
                          I hereby, declaring that I will obey all the rules and regulations of the institution. All the information provided above is true to the best of my knowledge. I will be fully responsible for violating any disciplinary rules of Sanskar Vidya Bhawan. I also agree to the financial terms and the committed fee schedule for the current session.
                      </p>
                  </div>
                  
                  <div className="flex justify-between items-end w-full">
                      <div className="flex flex-col items-center gap-2">
                          <div className="w-48 h-[2px] bg-slate-800"></div>
                          <span className="text-xs font-bold text-gray-800 uppercase tracking-widest">Parent / Guardian Sign</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                          <div className="w-48 h-[2px] bg-slate-800"></div>
                          <span className="text-xs font-bold text-gray-800 uppercase tracking-widest">Principal / Admin Sign</span>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
};

const FormView = ({ title, fields }: { title: string, fields: FieldType[] }) => {
  const [formData, setFormData] = useState<any>({});
  
  // Auto-Fee Sync Logic
  React.useEffect(() => {
      if (formData["Class Enrollment"]) {
          const classKey = formData["Class Enrollment"].split('-')[0];
          setFormData((prev: any) => ({ ...prev, "Calculated Fee": CLASS_FEES[classKey] || 6500 }));
      }
  }, [formData["Class Enrollment"]]);

  return (
      <div className="bg-slate-900 p-8 rounded-[40px] border border-slate-800 shadow-premium max-w-7xl mx-auto overflow-hidden relative">
          <div className="flex items-center justify-between mb-10 border-b border-slate-800 pb-8">
              <div className="flex items-center gap-5">
                  <div className="w-16 h-16 bg-indigo-600/10 text-indigo-400 rounded-3xl flex items-center justify-center border border-indigo-500/20 shadow-xl shadow-indigo-500/5 animate-pulse-slow">
                      <FileText size={32} />
                  </div>
                  <div>
                      <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Official {title} Submission</h3>
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.3em] mt-1 italic">Institutional Quality Record • SR-v2 Protocol</p>
                  </div>
              </div>
              <div className="flex items-center gap-3">
                  <span className="hidden md:inline-flex px-4 py-1.5 bg-amber-500/10 text-amber-500/100 rounded-full text-[10px] font-black uppercase border border-amber-500/100/30">System Ready</span>
              </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 mb-12">
              {fields.map((field, x) => (
                  <div key={x} className="flex flex-col gap-1">
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
                                  type={field.label.toLowerCase().includes("contact") ? "tel" : "text"}
                                  value={formData[field.label] || ""}
                                  onChange={(e) => setFormData({...formData, [field.label]: e.target.value})}
                                  pattern={field.label.toLowerCase().includes("contact") ? "[6789][0-9]{9}" : undefined}
                                  maxLength={field.label.toLowerCase().includes("contact") ? 10 : undefined}
                                  placeholder={field.label.toLowerCase().includes("contact") ? "10-digit Phone No" : `Enter ${field.label}...`}
                                  className="bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4.5 text-sm font-bold text-white focus:bg-slate-900 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-800 outline-none" 
                              />
                              {field.label.toLowerCase().includes("contact") && formData[field.label] && !/^[6789][0-9]{9}$/.test(formData[field.label]) && (
                                  <span className="text-[9px] font-bold text-rose-500 uppercase tracking-widest mt-1 ml-1">Invalid Indian Format</span>
                              )}
                          </div>
                      )}
                  </div>
              ))}
          </div>

          <div className="bg-slate-950/50 p-8 rounded-[32px] border-2 border-slate-800 border-dashed flex flex-col xl:flex-row items-center justify-between gap-8 mt-4">
              <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center border border-amber-500/20">
                      <CreditCard className="text-amber-400" size={24} />
                  </div>
                  <div className="flex flex-col gap-2 relative group w-56">
                      <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1 ml-1 group-focus-within:text-amber-400 transition-colors">Final Agreed Fee (₹)</label>
                      <input 
                          type="number"
                          value={formData["Calculated Fee"] || ""}
                          onChange={(e) => setFormData({...formData, "Calculated Fee": e.target.value})}
                          className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4.5 text-2xl font-black text-white focus:bg-slate-900 focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500/100 transition-all outline-none" 
                      />
                  </div>
              </div>
              <div className="flex gap-4 w-full xl:w-auto">
                  <motion.button 
                      whileTap={{ scale: 0.95 }}
                      onClick={() => window.print()}
                      className="flex-1 md:flex-none px-10 py-5 bg-slate-900 border border-slate-800 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
                  >
                      <Download size={18} /> Print A4 Receipt
                  </motion.button>
                  <motion.button 
                      whileHover={{ y: -4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => alert(`Admission Finalized for ${formData["Class Enrollment"] || "Class"}! Fee: ₹${formData["Calculated Fee"] || "0"}`)}
                      className="flex-1 md:flex-none px-14 py-5 bg-indigo-600 rounded-2xl text-[11px] font-black uppercase tracking-widest text-white shadow-[0_20px_40px_rgba(79,70,229,0.3)] hover:bg-indigo-700 transition-all flex items-center justify-center gap-4 border border-indigo-400/30"
                  >
                      Commit Registration <ShieldCheck size={20} />
                  </motion.button>
              </div>
          </div>
          
          <PrintLayout data={formData} />
      </div>
  );
};

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

  const studentsData = [
    { 
      id: "SVB001", name: "Rajesh Sharma", class: "10-A", fee: "Paid", attendance: "98%", idNo: "SR-2024-001", medium: "English", rollNo: "01", imageUrl: null,
      totalFee: 15500,
      payments: [
        { month: "April", amount: 5000, date: "2024-04-12" },
        { month: "August", amount: 10500, date: "2024-08-05" }
      ],
      remaining: 0
    },
    { 
      id: "SVB002", name: "Mamta Paliwal", class: "10-B", fee: "Pending", attendance: "91%", idNo: "SR-2024-002", medium: "Hindi", rollNo: "05", imageUrl: null,
      totalFee: 15500,
      payments: [
        { month: "April", amount: 4500, date: "2024-04-10" }
      ],
      remaining: 11000
    },
    { 
        id: "SVB003", name: "Suresh Choudhary", class: "8-A", fee: "Paid", attendance: "92%", idNo: "SR-2024-003", medium: "Hindi", rollNo: "12", imageUrl: null,
        totalFee: 12000,
        payments: [{ month: "April", amount: 12000, date: "2024-03-15" }],
        remaining: 0
    },
    { 
        id: "SVB004", name: "Aryan Prajapat", class: "9-C", fee: "Overdue", attendance: "88%", idNo: "SR-2024-004", medium: "English", rollNo: "08", imageUrl: null,
        totalFee: 14000,
        payments: [{ month: "April", amount: 3000, date: "2024-04-01" }],
        remaining: 11000
    },
  ];

  const staffData = [
    { 
        id: "TCH001", name: "Amit Singh", designatedClass: "10-A", subject: "Maths, Science", role: "Sr. Teacher",
        qualifications: "B.Sc, B.Ed", dob: "12-05-1988", address: "Ganesh Chowk, City", phone: "+91-9876543210", 
        joinDate: "05-04-2018", baseSalary: 22000, paidThisMonth: 22000, paidLastMonth: 22000, pendingSalary: 0, 
        absentDays: 0, status: "Active"
    },
    { 
        id: "TCH002", name: "Mamta Jain", designatedClass: "8-B", subject: "Hindi, Sanskrit", role: "Sr. Teacher",
        qualifications: "M.A (Hindi), B.Ed", dob: "24-08-1990", address: "Station Road, City", phone: "+91-8765432109", 
        joinDate: "15-07-2020", baseSalary: 18000, paidThisMonth: 10000, paidLastMonth: 18000, pendingSalary: 8000, 
        absentDays: 2, status: "Active"
    },
    { 
        id: "TCH003", name: "Rahul Sen", designatedClass: "N/A", subject: "Physical Education", role: "PTI",
        qualifications: "B.P.Ed", dob: "10-11-1992", address: "Ramdev Nagar, City", phone: "+91-7654321098", 
        joinDate: "01-08-2021", baseSalary: 15000, paidThisMonth: 15000, paidLastMonth: 15000, pendingSalary: 0, 
        absentDays: 1, status: "Active"
    },
    { 
        id: "TCH004", name: "Sonia Rajput", designatedClass: "N/A", subject: "Office Admin", role: "Clerk",
        qualifications: "B.Com, Basic Comp", dob: "05-03-1995", address: "Nehru Park, City", phone: "+91-6543210987", 
        joinDate: "10-09-2022", baseSalary: 12000, paidThisMonth: 0, paidLastMonth: 12000, pendingSalary: 12000, 
        absentDays: 4, status: "Active"
    },
  ];

  const accountsData = [
    { id: "REC-24001", date: "12-Apr-2026", type: "INCOME", category: "Tuition Fee", fromTo: "Rajesh Sharma (10-A)", amount: 15500, mode: "UPI", desc: "April Installment" },
    { id: "VOU-24001", date: "10-Apr-2026", type: "EXPENSE", category: "Utility Bill", fromTo: "AVVNL Electric Board", amount: 4200, mode: "Bank Transfer", desc: "March Electricity Bill" },
    { id: "REC-24002", date: "08-Apr-2026", type: "INCOME", category: "Admission Fee", fromTo: "Suresh Choudhary (8-A)", amount: 12000, mode: "Cash", desc: "New Admission 2026" },
    { id: "VOU-24002", date: "05-Apr-2026", type: "EXPENSE", category: "Maintenance", fromTo: "Ramesh Hardware", amount: 1800, mode: "Cash", desc: "Classroom Paint & Brush" },
    { id: "VOU-24003", date: "01-Apr-2026", type: "EXPENSE", category: "Salary", fromTo: "Amit Singh", amount: 22000, mode: "Bank Transfer", desc: "March 2026 Salary" },
  ];

  const routineData: Record<string, any[]>  = {
    "10-A": [
      { day: "Monday", periods: ["Maths (Amit S.)", "Science (Amit S.)", "English (Priya)", "Hindi (Mamta)", "LUNCH", "SST (Ritu)", "Computers", "P.E. (Rahul)"] },
      { day: "Tuesday", periods: ["Science (Amit S.)", "Maths (Amit S.)", "English (Priya)", "Hindi (Mamta)", "LUNCH", "SST (Ritu)", "Computers", "Library"] },
      { day: "Wednesday", periods: ["Maths (Amit S.)", "Science (Amit S.)", "English (Priya)", "Sanskrit (Mamta)", "LUNCH", "SST (Ritu)", "P.E. (Rahul)", "Games"] },
      { day: "Thursday", periods: ["Science (Amit S.)", "Maths (Amit S.)", "English (Priya)", "Hindi (Mamta)", "LUNCH", "SST (Ritu)", "Music", "Art"] },
      { day: "Friday", periods: ["Maths (Amit S.)", "Science (Amit S.)", "English (Priya)", "Sanskrit (Mamta)", "LUNCH", "SST (Ritu)", "Computers", "Games"] },
      { day: "Saturday", periods: ["Maths (Amit S.)", "Science (Amit S.)", "Activity", "Activity", "LUNCH", "Clubs", "Clubs", "Dispersal"] }
    ]
  };

  const examData = [
    { class: "10-A", subject: "Mathematics", date: "15-Apr-2026", avgScore: 82, highest: 98, status: "Evaluated" },
    { class: "10-A", subject: "Science", date: "17-Apr-2026", avgScore: 75, highest: 92, status: "Evaluated" },
    { class: "9-B", subject: "English", date: "16-Apr-2026", avgScore: 0, highest: 0, status: "Pending Evaluation" },
    { class: "8-A", subject: "Hindi", date: "12-Apr-2026", avgScore: 88, highest: 100, status: "Evaluated" },
  ];

  const noticeData = [
    { id: "NOT-01", date: "12-Apr-2026", title: "Upcoming Half-Yearly Examinations", audience: "All Students & Staff", type: "Urgent", severity: "high" },
    { id: "NOT-02", date: "10-Apr-2026", title: "Staff Meeting Regarding Annual Function", audience: "Staff Only", type: "Meeting", severity: "medium" },
    { id: "NOT-03", date: "09-Apr-2026", title: "New Transport Guidelines Issued", audience: "Parents & Students", type: "Info", severity: "low" },
  ];

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

  const DashboardOverview = () => (
    <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mt-2">
            <div>
                <h2 className="text-xl font-black text-white tracking-tight underline underline-offset-8 decoration-indigo-500/30 uppercase font-JakartaSans">Institutional Audit</h2>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2">{isMounted ? new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) : "Loading..."}</p>
            </div>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <button 
                    onClick={() => { setActiveTab("students"); setActiveSubView("analytics"); }}
                    className="px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-black uppercase tracking-widest text-slate-400 shadow-sm hover:bg-slate-800 transition-colors"
                >
                    Annual Reports
                </button>
                <button
                    onClick={() => { setActiveTab("account"); setActiveSubView("entry"); }}
                    className="px-4 py-2.5 bg-indigo-600 rounded-xl text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all flex items-center gap-2"
                >
                    <Plus size={14} /> Quick Fee Entry
                </button>
            </div>
        </div>

        {/* 5-Card High Density Stat Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
                { label: "Total Students", val: "1,280", icon: Users, color: "text-blue-400", bg: "bg-blue-500/10" },
                { label: "Total Faculty", val: "85", icon: UserSquare2, color: "text-purple-400", bg: "bg-purple-500/10" },
                { label: "Total Revenue", val: "₹1.42Cr", icon: CreditCard, color: "text-amber-400", bg: "bg-amber-500/10" },
                { label: "Fees Pending", val: "₹8.4L", icon: AlertCircle, color: "text-rose-400", bg: "bg-rose-500/10" },
                { label: "Faculty Salary", val: "0 Pending", icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10" },
            ].map((s, i) => (
                <div key={i} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-sm flex flex-col gap-4 group hover:border-indigo-500/30 transition-all relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/5 to-transparent -mr-8 -mt-8 rounded-full blur-2xl" />
                    <div className={`w-10 h-10 ${s.bg} ${s.color} rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110`}><s.icon size={18} /></div>
                    <div className="flex flex-col relative z-10">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1.5">{s.label}</span>
                        <span className="text-2xl font-black text-white tracking-tighter leading-none">{s.val}</span>
                    </div>
                </div>
            ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 flex flex-col gap-6">
                {/* Recent Admissions Ledger */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-slate-950/20">
                        <h3 className="text-[10px] font-black text-white uppercase tracking-widest">New Recent Admission</h3>
                        <button onClick={() => setActiveTab("students")} className="text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:underline">View Registry</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-950/50 border-y border-slate-800">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Student Details</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Class / Roll</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Medium</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Fee Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50">
                                {studentsData.slice(0, 5).map((s, i) => (
                                    <tr key={i} className="hover:bg-indigo-500/5 transition-colors border-b border-slate-800/10">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-xs font-black text-indigo-400 border border-slate-700">{s.name[0]}</div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-black text-white uppercase tracking-tight">{s.name}</span>
                                                    <span className="text-[10px] font-bold text-slate-500 uppercase">{s.idNo}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-xs font-black text-slate-400 bg-slate-800 px-2 py-1 rounded-md">CLASS {s.class} • #{s.rollNo}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-xs font-black text-slate-500 uppercase">{s.medium}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase shadow-lg ${s.fee === 'Paid' ? 'bg-amber-500/10 text-amber-500/100 border border-amber-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>{s.fee}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-1 flex flex-col gap-6 font-JakartaSans">
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xs font-black text-white uppercase tracking-widest">Revenue Forecast</h3>
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-500/10 rounded-full">
                            <span className="w-1.5 h-1.5 bg-amber-500/100 rounded-full animate-pulse" />
                            <span className="text-[9px] font-black text-amber-500/100 uppercase tracking-widest">System Live</span>
                        </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col gap-5">
                        <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 -mr-12 -mt-12 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-all" />
                           <div className="flex justify-between items-center mb-2">
                              <span className="text-3xl font-black tracking-tighter text-white">₹1.42Cr</span>
                              <div className="flex items-center gap-1 text-amber-500/100">
                                 <TrendingUp size={12} />
                                 <span className="text-[10px] font-black uppercase">+12.4%</span>
                              </div>
                           </div>
                           <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Overall Realization Index</span>
                        </div>

                        <div className="p-5 border border-slate-800 rounded-2xl bg-slate-900/50">
                           <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Collection Accuracy</h4>
                           <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                              <motion.div initial={{ width: 0 }} animate={{ width: '82%' }} className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                           </div>
                           <div className="flex justify-between mt-3">
                              <span className="text-[10px] font-black text-slate-400">Target: ₹1.6Cr</span>
                              <span className="text-[10px] font-black text-indigo-400">82.5% Complete</span>
                           </div>
                        </div>

                        <button 
                            onClick={() => setActiveTab("account")}
                            className="mt-2 w-full py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-black uppercase tracking-widest text-slate-300 transition-all flex items-center justify-center gap-2"
                        >
                            Open Financial Dashboard <ChevronRight size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );

  type FieldType = { 
    label: string; 
    type: "text" | "select" | "date"; 
    options?: string[]; 
    value?: string;
    onChange?: (val: string) => void;
  };

  const InspectorView = () => {
    const [findId, setFindId] = useState("");
    const [findClass, setFindClass] = useState("");
    const [findMedium, setFindMedium] = useState("English");
    const [isEditing, setIsEditing] = useState(false);
    
    // Group selection states
    const [groupClass, setGroupClass] = useState("All");
    const [groupMedium, setGroupMedium] = useState("English");

    const searchStudent = () => {
      if (activeTab === "teachers") {
          const found = staffData.find(s => s.name.toLowerCase().includes(findId.toLowerCase()) || s.id.toLowerCase() === findId.toLowerCase());
          if (found) setSelectedStudent(found);
          return;
      }
      const found = studentsData.find(s => 
        (s.rollNo === findId || s.idNo === findId) && 
        s.class.includes(findClass) && 
        s.medium.toLowerCase() === findMedium.toLowerCase()
      );
      if (found) setSelectedStudent(found);
    };

    const groupedStudents = studentsData.filter(s => 
        (groupClass === "All" || s.class.startsWith(groupClass)) && 
        s.medium === groupMedium
    );

    return (
      <div className="flex flex-col gap-8 max-w-6xl mx-auto">
          {!selectedStudent ? (
            <div className="flex flex-col gap-8">
                {activeTab === "teachers" ? (
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 -mr-32 -mt-32 rounded-full blur-3xl" />
                        <div className="relative z-10">
                            <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-2 flex items-center gap-3">
                                <Search size={24} className="text-indigo-400" /> Staff Directory Search
                            </h3>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-8">Search by Staff Name or Teacher ID to view Full Profile</p>
                            
                            <div className="flex flex-col md:flex-row gap-4 mb-10">
                                <input 
                                    type="text" 
                                    value={findId}
                                    onChange={(e) => setFindId(e.target.value)}
                                    placeholder="Enter Staff Name (e.g. Amit Singh) or ID"
                                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-6 py-4 text-sm font-bold text-white focus:ring-2 focus:ring-indigo-500/20 outline-none"
                                />
                                <button 
                                    onClick={searchStudent}
                                    className="px-10 py-4 bg-indigo-600 rounded-xl text-xs font-black uppercase tracking-widest text-white hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20 flex gap-2 items-center"
                                >
                                    Search Profile <ArrowUpRight size={16}/>
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {staffData.map((s, idx) => (
                                    <button 
                                        key={idx}
                                        onClick={() => setSelectedStudent(s)}
                                        className="bg-slate-950/50 border border-slate-800/50 p-5 rounded-2xl flex flex-col items-center gap-3 group hover:border-indigo-500/30 transition-all hover:bg-indigo-600/5"
                                    >
                                        <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-indigo-400 border border-slate-800 shadow-md group-hover:scale-105 transition-transform font-black">
                                            {s.name[0]}
                                        </div>
                                        <div className="flex flex-col gap-0.5 text-center">
                                            <span className="text-[11px] font-black text-white uppercase tracking-tight group-hover:text-indigo-300 transition-colors">{s.name}</span>
                                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{s.role}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Group Master Selection Area */}
                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 -mr-32 -mt-32 rounded-full blur-3xl" />
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                                        <Users size={16} className="text-indigo-400" /> Discover Student Groups
                                    </h3>
                                    <div className="flex gap-4">
                                        <select 
                                            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-[10px] font-black text-white uppercase tracking-widest outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                            value={groupClass}
                                            onChange={(e) => setGroupClass(e.target.value)}
                                        >
                                            <option value="All">All Classes</option>
                                            {["Nursery", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"].map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                        <select 
                                            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-[10px] font-black text-white uppercase tracking-widest outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                            value={groupMedium}
                                            onChange={(e) => setGroupMedium(e.target.value)}
                                        >
                                            <option value="English">English Medium</option>
                                            <option value="Hindi">Hindi Medium</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {groupedStudents.map((s, idx) => (
                                        <button 
                                            key={idx}
                                            onClick={() => setSelectedStudent(s)}
                                            className="bg-slate-950/50 border border-slate-800/50 p-6 rounded-3xl flex items-center gap-5 group hover:border-indigo-500/30 transition-all hover:bg-indigo-600/5 text-left"
                                        >
                                            <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-indigo-400 border border-slate-800 shadow-xl group-hover:scale-105 transition-transform">
                                                <UserCircle size={32} />
                                            </div>
                                            <div className="flex flex-col gap-0.5">
                                                <span className="text-xs font-black text-white uppercase tracking-tight group-hover:text-indigo-300 transition-colors">{s.name}</span>
                                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{s.idNo}</span>
                                                <span className="text-[9px] font-black text-indigo-500 uppercase mt-1">Class {s.class}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Direct ID Search at Bottom */}
                        <div className="bg-slate-900/50 border border-slate-800/50 rounded-3xl p-6 flex flex-col md:flex-row items-center gap-6">
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 text-center md:text-left">Roll Number Search</label>
                                    <input 
                                        type="text" 
                                        value={findId}
                                        onChange={(e) => setFindId(e.target.value)}
                                        placeholder="e.g. 05"
                                        className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-bold text-white focus:ring-2 focus:ring-indigo-500/20 outline-none text-center md:text-left"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 text-center md:text-left">Direct Class Search</label>
                                    <input 
                                        type="text" 
                                        value={findClass}
                                        onChange={(e) => setFindClass(e.target.value)}
                                        placeholder="e.g. 10-A"
                                        className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-bold text-white focus:ring-2 focus:ring-indigo-500/20 outline-none text-center md:text-left"
                                    />
                                </div>
                            </div>
                            <button 
                                onClick={searchStudent}
                                className="w-full md:w-auto px-10 py-4 bg-slate-800 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-slate-700 transition-all flex items-center justify-center gap-3 border border-slate-700/50"
                            >
                                Intelligent Scan <Search size={14} />
                            </button>
                        </div>
                    </>
                )}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-8">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => setSelectedStudent(null)}
                        className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-500 hover:text-indigo-400 transition-colors shadow-lg"
                    >
                        <ChevronDown size={20} className="rotate-90" />
                    </button>
                    <div>
                        <h3 className="text-xl font-black text-white uppercase tracking-tighter">Student Discovery Ledger</h3>
                        <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Digital Verification • Institutional Analytics</p>
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-premium relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 -mr-32 -mt-32 rounded-full blur-3xl" />
                    <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                        <div className="relative group">
                            <div className="w-32 h-32 bg-slate-800 rounded-3xl flex items-center justify-center border-4 border-slate-950 shadow-2xl relative overflow-hidden">
                                {selectedStudent.imageUrl ? (
                                    <img src={selectedStudent.imageUrl} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <UserCircle size={64} className="text-slate-600" />
                                )}
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-amber-500/100 rounded-xl border-4 border-slate-900 flex items-center justify-center">
                                    <ShieldCheck size={14} className="text-white" />
                                </div>
                            </div>
                            {isEditing && (
                                <button 
                                    onClick={() => alert("Launching Secure Portal for DP Selection...")}
                                    className="absolute inset-0 bg-indigo-600/40 rounded-3xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]"
                                >
                                    <Plus size={24} className="text-white drop-shadow-lg" />
                                </button>
                            )}
                        </div>

                        {activeTab === "teachers" ? (
                            <div className="flex-1 flex flex-col gap-4 w-full">
                                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                                    <div>
                                        <h2 className="text-3xl font-black text-white tracking-tighter uppercase">{selectedStudent.name}</h2>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
                                            {selectedStudent.role} • {selectedStudent.qualifications}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <motion.button 
                                          whileTap={{ scale: 0.95 }}
                                          onClick={() => setIsEditing(!isEditing)}
                                          className={`px-5 py-2.5 border rounded-xl text-[10px] font-black uppercase transition-all ${isEditing ? 'bg-amber-500/100 border-amber-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'}`}
                                        >
                                          {isEditing ? 'Save Changes' : 'Edit Profile'}
                                        </motion.button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[
                                        { label: "Phone", val: selectedStudent.phone },
                                        { label: "DOB", val: selectedStudent.dob },
                                        { label: "Subjects", val: selectedStudent.subject },
                                        { label: "Class Teacher", val: selectedStudent.designatedClass === "N/A" ? "None" : `Class ${selectedStudent.designatedClass}` },
                                    ].map((d, i) => (
                                        <div key={i} className="bg-slate-950 border border-slate-800/50 p-4 rounded-2xl flex flex-col items-center text-center justify-center">
                                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{d.label}</span>
                                            <span className="text-[11px] font-bold text-white uppercase mt-1">{d.val}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="w-full bg-slate-950 border border-slate-800/50 p-4 rounded-2xl">
                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-1">Residential Address</span>
                                    <span className="text-xs font-bold text-slate-300 uppercase">{selectedStudent.address}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-3xl font-black text-white tracking-tighter uppercase">{selectedStudent.name}</h2>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Institutional ID: {selectedStudent.idNo} • {selectedStudent.medium} MEDIUM</p>
                                </div>
                                <div className="flex gap-2">
                                    <motion.button 
                                      whileTap={{ scale: 0.95 }}
                                      onClick={() => setIsEditing(!isEditing)}
                                      className={`px-5 py-2.5 border rounded-xl text-[10px] font-black uppercase transition-all ${isEditing ? 'bg-amber-500/100 border-amber-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'}`}
                                    >
                                      {isEditing ? 'Save Changes' : 'Edit Profile'}
                                    </motion.button>
                                    <motion.button 
                                        whileTap={{ scale: 0.95 }} 
                                        onClick={() => window.print()}
                                        className="px-5 py-2.5 bg-indigo-600 rounded-xl text-[10px] font-black uppercase text-white shadow-xl shadow-indigo-600/20"
                                    >
                                        Print History
                                    </motion.button>
                                </div>
                            </div>
                            
                            {isEditing ? (
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                                  {["Name", "Class", "Roll No", "Medium", "Aadhar", "Category"].map((f) => (
                                    <div key={f} className="flex flex-col gap-1">
                                      <label className="text-[8px] font-black text-slate-600 uppercase tracking-widest ml-1">{f}</label>
                                      <input 
                                        type="text" 
                                        defaultValue={selectedStudent[f.toLowerCase().replace(" ", "")] || ""}
                                        className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-white focus:ring-1 focus:ring-indigo-500 outline-none"
                                      />
                                    </div>
                                  ))}
                              </div>
                            ) : (
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                                  {[
                                      { label: "Institutional Total", val: `₹${selectedStudent.totalFee?.toLocaleString()}` },
                                      { label: "Amount Paid", val: `₹${selectedStudent.payments?.reduce((acc: number, p: any) => acc + p.amount, 0).toLocaleString()}`, color: "text-amber-400" },
                                      { label: "Pending Balance", val: `₹${(selectedStudent.totalFee - selectedStudent.payments?.reduce((acc: number, p: any) => acc + p.amount, 0)).toLocaleString()}`, color: "text-rose-400" },
                                      { label: "Attendance", val: selectedStudent.attendance },
                                  ].map((d, i) => (
                                      <div key={i} className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800/50">
                                          <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">{d.label}</span>
                                          <p className={`text-sm font-black mt-1 uppercase tracking-tight ${d.color || "text-white"}`}>{d.val}</p>
                                      </div>
                                  ))}
                              </div>
                            )}
                        </div>
                        )}
                    </div>
                </div>

                {activeTab === "teachers" ? (
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col">
                            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 border-b border-slate-800 pb-4">
                                Salary Disbursement Overview
                            </h3>
                            <div className="flex flex-col gap-4 flex-1 justify-center">
                                <div className="flex justify-between items-center bg-slate-950 border border-slate-800 p-4 rounded-xl">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Base Salary</span>
                                    <span className="text-lg font-black text-white">₹{selectedStudent.baseSalary?.toLocaleString() || "0"}</span>
                                </div>
                                <div className="flex justify-between items-center bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-xl">
                                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Paid (This Month)</span>
                                    <span className="text-lg font-black text-indigo-400">₹{selectedStudent.paidThisMonth?.toLocaleString() || "0"}</span>
                                </div>
                                <div className="flex justify-between items-center bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl">
                                    <span className="text-[10px] font-black text-amber-500/100 uppercase tracking-widest">Paid (Last Month)</span>
                                    <span className="text-lg font-black text-amber-400">₹{selectedStudent.paidLastMonth?.toLocaleString() || "0"}</span>
                                </div>
                                <div className="flex justify-between items-center bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl">
                                    <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Pending Amount</span>
                                    <span className="text-lg font-black text-rose-400">₹{selectedStudent.pendingSalary?.toLocaleString() || "0"}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm">
                            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 border-b border-slate-800 pb-4">
                                Monthly Attendance Record
                            </h3>
                            <div className="flex items-center justify-center p-8">
                                <div className="relative w-40 h-40 flex items-center justify-center">
                                    <div className="absolute inset-0 rounded-full border-[12px] border-slate-800"></div>
                                    <div className="absolute inset-0 rounded-full border-[12px] border-amber-500/100" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0)', transform: `rotate(${(selectedStudent.absentDays * 12)}deg)` }}></div>
                                    <div className="absolute inset-0 rounded-full border-[12px] border-rose-500" style={{ clipPath: `polygon(50% 50%, 50% 0%, ${50 + Math.sin(selectedStudent.absentDays/30 * Math.PI*2)*50}% ${50 - Math.cos(selectedStudent.absentDays/30 * Math.PI*2)*50}%, 100% 0, 100% 100%, 0 100%, 0 0)` }}></div>
                                    
                                    <div className="flex flex-col items-center">
                                        <span className="text-4xl font-black text-white">{30 - (selectedStudent.absentDays || 0)}</span>
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Present Days</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center bg-rose-500/5 p-4 rounded-xl border border-rose-500/10 mt-2">
                                <div className="flex items-center gap-2">
                                    <AlertCircle size={16} className="text-rose-500" />
                                    <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Total Absent</span>
                                </div>
                                <span className="text-lg font-black text-rose-400">{selectedStudent.absentDays || 0} Days</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm">
                            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 border-b border-slate-800 pb-4 flex justify-between items-center">
                                Financial Ledger History
                                {isEditing && <button className="text-[8px] bg-slate-800 px-2 py-1 rounded text-indigo-400">Add Entry</button>}
                            </h3>
                            <div className="flex flex-col gap-4">
                                {selectedStudent.payments?.map((f: any, i: number) => (
                                    <div key={i} className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${isEditing ? 'bg-slate-950 border-indigo-500/20' : 'bg-slate-950 border-slate-800/50'}`}>
                                        <div className="flex items-center gap-4 flex-1">
                                            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-amber-500/10 text-amber-500/100 font-black text-[10px]">
                                                {f.month.substring(0, 1)}
                                            </div>
                                            {isEditing ? (
                                                <div className="flex flex-col gap-1 w-full mr-4">
                                                    <input type="text" defaultValue={f.month} className="bg-transparent text-xs font-black text-white uppercase outline-none focus:text-indigo-400" />
                                                    <input type="text" defaultValue={f.date} className="bg-transparent text-[9px] font-bold text-slate-600 uppercase outline-none" />
                                                </div>
                                            ) : (
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-black text-white uppercase tracking-tight">{f.month} Fee Installment</span>
                                                    <span className="text-[9px] font-bold text-slate-600 uppercase">{f.date}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="text-right">
                                            {isEditing ? (
                                                <div className="flex flex-col items-end gap-1">
                                                    <div className="flex items-center gap-1">
                                                       <span className="text-slate-600 text-[10px]">₹</span>
                                                       <input type="number" defaultValue={f.amount} className="w-20 bg-transparent text-sm font-black text-white text-right outline-none focus:text-indigo-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                                    </div>
                                                    <span className="text-[8px] font-black uppercase text-amber-500/100">SET PAID</span>
                                                </div>
                                            ) : (
                                                <>
                                                    <span className="text-sm font-black text-white block">₹{f.amount.toLocaleString()}</span>
                                                    <span className="text-[8px] font-black uppercase text-amber-500/100">PAID</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {isEditing && (
                                    <div className="border-t border-slate-800 pt-6 mt-2">
                                         <div className="flex flex-col gap-2">
                                             <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-1">Total Yearly Liability</label>
                                             <div className="flex items-center gap-3">
                                                <span className="text-xl font-bold text-slate-700">₹</span>
                                                <input 
                                                    type="number" 
                                                    defaultValue={selectedStudent.totalFee}
                                                    className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-lg font-black text-white focus:border-indigo-500 outline-none w-full"
                                                />
                                             </div>
                                         </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm">
                            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 border-b border-slate-800 pb-4">Academic Progression</h3>
                            <div className="h-48 flex items-end gap-2 px-2 mb-6">
                                {[85, 78, 92, 88, 74, 95].map((h, i) => (
                                    <div key={i} className="flex-1 bg-slate-800 rounded-t-lg relative group">
                                        <motion.div initial={{ height: 0 }} animate={{ height: `${h}%` }} className="absolute bottom-0 left-0 right-0 bg-indigo-500 rounded-t-lg group-hover:bg-indigo-400 transition-all" />
                                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-indigo-600 text-[10px] font-black text-white px-2 py-0.5 rounded transition-opacity">{h}%</div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                                    <span>Overall Rank: 04/42</span>
                                    <span>Attendance: 96%</span>
                                </div>
                                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-indigo-500 h-full w-[88%]" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>
          )}
      </div>
    );
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
                  <span className="text-lg font-black text-white">742 <span className="text-[10px] text-slate-400 font-bold ml-1">STUDENTS</span></span>
              </div>
              <div className="p-4 flex flex-col gap-1">
                  <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">English Medium Total</span>
                  <span className="text-lg font-black text-white">538 <span className="text-[10px] text-slate-400 font-bold ml-1">STUDENTS</span></span>
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
                  <span className="text-xs font-black text-amber-500/100 uppercase tracking-tighter">12 New Admissions Today</span>
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
                          <div className="w-10 h-10 bg-indigo-600/10 rounded-xl flex items-center justify-center text-indigo-400 font-black text-xs border border-indigo-500/10">{s.name[0]}</div>
                          <div className="flex flex-col">
                              <span className="text-[11px] font-black text-white uppercase tracking-tight truncate w-40">{s.name}</span>
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
                    {data.filter((s:any) => classFilter === "All" || s.class.startsWith(classFilter)).map((item:any, i:number) => (
                        <tr key={i} className="hover:bg-indigo-500/5 transition-colors group border-b border-slate-800/20">
                            <td className="px-6 py-5">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center font-black text-xs text-indigo-400 border border-slate-700 shadow-sm">{item.name[0]}</div>
                                    <div className="flex flex-col">
                                        <span className="text-[13px] font-black text-white leading-none mb-1.5 uppercase tracking-tight group-hover:text-indigo-300 transition-colors">{item.name}</span>
                                        <span className="text-[10px] font-bold text-slate-500 tracking-tighter uppercase">{item.idNo} • {item.medium} MEDIUM</span>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-5 text-center">
                                <span className="text-[11px] font-black text-slate-300 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700/50 uppercase tracking-tighter">Class {item.class} • #{item.rollNo}</span>
                            </td>
                            <td className="px-6 py-5">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full shadow-[0_0_8px] ${item.fee === "Paid" ? "bg-amber-500/100 shadow-amber-500/100" : "bg-rose-500 shadow-rose-500/50"}`} />
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${item.fee === "Paid" ? "text-amber-500/100" : "text-rose-500"}`}>{item.fee}</span>
                                </div>
                            </td>
                            <td className="px-6 py-5 text-right">
                                    <span className="text-sm font-black text-slate-400 tracking-tight">{item.attendance}</span>
                            </td>
                            <td className="px-6 py-5 text-center">
                                 <button 
                                   onClick={() => { setSelectedStudent(item); setActiveSubView("analytics"); }}
                                   className="text-slate-600 hover:text-indigo-400 transition-all p-2 rounded-xl hover:bg-indigo-500/10 border border-transparent hover:border-indigo-500/20"
                                 >
                                    <ArrowUpRight size={18} />
                                 </button>
                            </td>
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
                                    <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center font-black text-xs text-indigo-400 border border-slate-700 shadow-sm">{item.name[0]}</div>
                                    <div className="flex flex-col">
                                        <span className="text-[13px] font-black text-white leading-none mb-1.5 uppercase tracking-tight group-hover:text-indigo-300 transition-colors">{item.name}</span>
                                        <span className="text-[10px] font-bold text-slate-500 tracking-tighter uppercase">{item.role}</span>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-5 text-center">
                                <span className={`text-[11px] font-black px-3 py-1.5 rounded-lg border uppercase tracking-tighter ${item.designatedClass !== "N/A" ? "text-indigo-300 bg-indigo-500/10 border-indigo-700/50" : "text-slate-500 bg-slate-800/20 border-slate-700/30"}`}>
                                  {item.designatedClass !== "N/A" ? `Class ${item.designatedClass}` : "No Class Assigned"}
                                </span>
                            </td>
                            <td className="px-6 py-5">
                                <span className="text-[11px] font-black text-slate-400 uppercase">{item.subject}</span>
                            </td>
                            <td className="px-6 py-5 text-center">
                                 <button 
                                   onClick={() => { setSelectedStudent(item); setActiveSubView("analytics"); }}
                                   className="text-slate-600 hover:text-indigo-400 transition-all p-2 rounded-xl hover:bg-indigo-500/10 border border-transparent hover:border-indigo-500/20"
                                 >
                                    <ArrowUpRight size={18} />
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
                                            {item.type === "INCOME" ? "+" : "-"}₹{item.amount.toLocaleString()}
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
      const [localClass, setLocalClass] = useState<string>("10-A");

      return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col gap-6 shadow-2xl overflow-x-auto">
          <div className="flex justify-between items-center border-b border-slate-800 pb-6 min-w-max">
              <div>
                  <h3 className="text-xl font-black text-white uppercase tracking-wider">Class Schedule & Timetable</h3>
                  <p className="text-xs text-slate-500 font-bold mt-1 uppercase tracking-widest">Active Academic Routine</p>
              </div>
              <div className="flex items-center gap-3">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Filter By Class:</label>
                  <select 
                      value={localClass} 
                      onChange={(e) => setLocalClass(e.target.value)}
                      className="bg-slate-950 border border-slate-700 text-sm font-bold text-white px-4 py-2.5 rounded-xl outline-none focus:border-indigo-500 transition-all cursor-pointer"
                  >
                      {Object.keys(routineData).map(c => <option key={c} value={c}>{c}</option>)}
                      <option value="9-A">9-A (No Data)</option>
                  </select>
              </div>
          </div>
          
          {!routineData[localClass] ? (
              <div className="bg-slate-950/50 rounded-2xl border border-slate-800 p-8 flex flex-col items-center justify-center text-center py-20 border-dashed">
                 <Calendar size={48} className="text-slate-700 mb-4" />
                 <h4 className="text-lg font-black text-slate-300 uppercase tracking-widest mb-2">No Routine Found</h4>
                 <p className="text-sm text-slate-500 font-bold max-w-sm">No scheduled periods for Class {localClass}. Use 'Assign Routine' to create one.</p>
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
                          {routineData[localClass].map((row, i) => (
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

  const ExamDashboard = () => (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col gap-6 shadow-2xl overflow-x-auto">
          <div className="flex justify-between items-center border-b border-slate-800 pb-6 min-w-max">
              <div>
                  <h3 className="text-xl font-black text-white uppercase tracking-wider">Exam Dashboard & Transcripts</h3>
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
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Target Class</th>
                          <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest">Subject</th>
                          <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest">Evaluation Date</th>
                          <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest">Avg Score</th>
                          <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest">Highest</th>
                          <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest">Status / Action</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                      {examData.map((ex, i) => (
                          <tr key={i} className="hover:bg-slate-800/20 transition-all cursor-pointer">
                              <td className="px-6 py-5 border-r border-slate-800/50">
                                  <span className="text-xs font-black text-white px-3 py-1 bg-slate-950 border border-slate-700 rounded-lg">{ex.class}</span>
                              </td>
                              <td className="px-4 py-5"><span className="text-sm font-bold text-slate-300">{ex.subject}</span></td>
                              <td className="px-4 py-5"><span className="text-xs font-bold text-slate-400 tracking-wider uppercase">{ex.date}</span></td>
                              <td className="px-4 py-5">
                                  {ex.avgScore > 0 ? (
                                      <div className="flex items-center gap-2">
                                          <div className={`w-2 h-2 rounded-full ${ex.avgScore >= 80 ? 'bg-amber-500/100' : 'bg-amber-500'}`} />
                                          <span className="text-sm font-black text-white">{ex.avgScore}%</span>
                                      </div>
                                  ) : (
                                      <span className="text-xs font-bold text-slate-600">-</span>
                                  )}
                              </td>
                              <td className="px-4 py-5 font-black text-indigo-400">{ex.highest > 0 ? `${ex.highest}pts` : "-"}</td>
                              <td className="px-4 py-5">
                                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${ex.status === "Evaluated" ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                                      {ex.status === "Evaluated" ? <ShieldCheck size={12} /> : <Clock size={12} />} {ex.status}
                                  </div>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>
  );

  const NoticeDashboard = () => (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col gap-6 shadow-2xl">
          <div className="flex justify-between items-center border-b border-slate-800 pb-6">
              <div>
                  <h3 className="text-xl font-black text-white uppercase tracking-wider">Institution Notice Board</h3>
                  <p className="text-xs text-slate-500 font-bold mt-1 uppercase tracking-widest">Active Bulletins & Announcements</p>
              </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {noticeData.map((notice, i) => (
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
          { id: "entry", label: "Marks Entry", icon: Plus },
          { id: "analytics", label: "Student Transcript", icon: FileText }
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
      body * { visibility: hidden !important; }
      #svb-print-hub, #svb-print-hub * { visibility: visible !important; }
      #svb-print-hub { 
        position: absolute !important; 
        left: 0 !important; 
        top: 0 !important; 
        width: 210mm !important; 
        height: 297mm !important; 
        background: white !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      aside, header, nav, .print\\:hidden { display: none !important; }
    }
  `;

  return (
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
                            {activeSubView === "entry" && <FormView title="Student Admission" fields={[
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
                            ]} />}
                            {activeSubView === "analytics" && <InspectorView />}
                        </>
                    )}

                    {activeTab === "teachers" && (
                        <>
                            {activeSubView === "registry" && RegistryView("Staff Info", staffData)}
                            {activeSubView === "entry" && <FormView title="Add New Staff" fields={[
                                { label: "Full Name", type: "text" },
                                { label: "Residential Address", type: "text" },
                                { label: "Date of Birth", type: "date" },
                                { label: "Educational Qualifications", type: "text" },
                                { label: "Subjects Assigned", type: "text" },
                                { label: "Designated Classes", type: "text" },
                                { label: "Contact Number", type: "text" },
                                { label: "Joining Date", type: "date" },
                                { label: "Base Salary (₹)", type: "text" }
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
                            {activeSubView === "entry" && <GenericComingSoon title="Assign Routine" desc="Intelligent scheduling tool to map periods with minimal clashes." icon={Calendar} />}
                            {activeSubView === "analytics" && <GenericComingSoon title="Teacher Workload View" desc="Analyze individual faculty workload to balance operations efficiently." icon={PieChart} />}
                        </>
                    )}

                    {activeTab === "exam" && (
                        <>
                            {(activeSubView === "default" || activeSubView === "registry") && <ExamDashboard />}
                            {activeSubView === "entry" && <GenericComingSoon title="Student Marks Entry" desc="Bulk subject marks input portal for swift evaluations." icon={CheckSquare} />}
                            {activeSubView === "analytics" && <GenericComingSoon title="Generate Transcript" desc="Issue professional, printable report cards based on recent inputs." icon={FileText} />}
                        </>
                    )}

                    {activeTab === "notice" && (
                        <>
                            {(activeSubView === "default" || activeSubView === "registry") && <NoticeDashboard />}
                            {activeSubView === "entry" && <GenericComingSoon title="Publish Notice" desc="Draft urgent bulletins and select your intended audience." icon={BookOpen} />}
                            {activeSubView === "analytics" && <GenericComingSoon title="Communication Logs" desc="History of all past announcements across the institution." icon={FileBox} />}
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
  );
}
