"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useAdmin } from "@/app/dashboard/admin/context/AdminContext";
import {
  Users, UserSquare2, Search, Printer, ShieldCheck, Mail, MapPin, Calendar, 
  FileText, ArrowUpRight, Plus, Download, Edit3, Trash2, UserCircle, ChevronDown, AlertCircle
} from "lucide-react";

export   const InspectorView = () => {
    const { activeTab, dbStudents, dbTeachers, dbAdmissions, dbMessages, selectedStudent, setSelectedStudent, refreshData } = useAdmin();
    const staffData = dbTeachers;
    const studentsData = dbStudents;
    const [findId, setFindId] = useState("");
    const [findClass, setFindClass] = useState("");
    const [findMedium, setFindMedium] = useState("English");
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState<any>({});
    const [isSaving, setIsSaving] = useState(false);

    // Group selection states — medium first, then class
    const [groupMedium, setGroupMedium] = useState("Hindi");
    const [groupClass, setGroupClass] = useState("All");

    const hindiClasses = ["1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th"];
    const englishClasses = ["Nursery","LKG","UKG","1st","2nd","3rd","4th","5th","6th","7th","8th"];
    const classOptions = groupMedium === "Hindi" ? hindiClasses : englishClasses;

    const startEdit = () => {
      setEditData({ ...selectedStudent });
      setIsEditing(true);
    };

    const saveEdit = async () => {
      if (!selectedStudent?.id) return;
      setIsSaving(true);
      const table = activeTab === 'teachers' ? 'teachers' : 'students';
      const { error } = await supabase.from(table).update(editData).eq('id', selectedStudent.id);
      if (error) {
        alert('Save failed: ' + error.message);
      } else {
        setSelectedStudent({ ...selectedStudent, ...editData });
        setIsEditing(false);
        refreshData();
        alert('✅ Profile updated successfully!');
      }
      setIsSaving(false);
    };

    const searchStudent = () => {
      if (activeTab === "teachers") {
          const found = staffData.find((s: any) => (s.full_name||s.name||'').toLowerCase().includes(findId.toLowerCase()) || (s.employee_id||'').toLowerCase() === findId.toLowerCase());
          if (found) setSelectedStudent(found);
          else alert('No staff found with that name or ID.');
          return;
      }
      const found = studentsData.find((s: any) =>
        (s.roll_number === findId || s.sr_number === findId) &&
        (findClass === '' || (s.class||'').includes(findClass)) &&
        (findMedium === '' || (s.medium||'').toLowerCase() === findMedium.toLowerCase())
      );
      if (found) setSelectedStudent(found);
      else alert('No student found. Check Roll/SR number, class, and medium.');
    };

    const groupedStudents = studentsData.filter((s: any) =>
        (groupClass === "All" || (s.class||'') === groupClass) &&
        ((s.medium||'').toLowerCase() === groupMedium.toLowerCase())
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
                                {staffData.map((s: any, idx: number) => (
                                    <button 
                                        key={idx}
                                        onClick={() => setSelectedStudent(s)}
                                        className="bg-slate-950/50 border border-slate-800/50 p-5 rounded-2xl flex flex-col items-center gap-3 group hover:border-indigo-500/30 transition-all hover:bg-indigo-600/5"
                                    >
                                        <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-indigo-400 border border-slate-800 shadow-md group-hover:scale-105 transition-transform font-black">
                                            {(s.full_name||s.name||"?")[0]}
                                        </div>
                                        <div className="flex flex-col gap-0.5 text-center">
                                            <span className="text-[11px] font-black text-white uppercase tracking-tight group-hover:text-indigo-300 transition-colors">{s.full_name||s.name||"—"}</span>
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
                                    <div className="flex gap-3 flex-wrap">
                                        {/* 1. Medium First */}
                                        <select
                                            className="bg-slate-950 border border-indigo-500/40 rounded-xl px-4 py-2 text-[10px] font-black text-indigo-300 uppercase tracking-widest outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all"
                                            value={groupMedium}
                                            onChange={(e) => { setGroupMedium(e.target.value); setGroupClass("All"); }}
                                        >
                                            <option value="Hindi">Hindi Medium</option>
                                            <option value="English">English Medium</option>
                                        </select>
                                        {/* 2. Class (based on medium) */}
                                        <select
                                            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-[10px] font-black text-white uppercase tracking-widest outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                            value={groupClass}
                                            onChange={(e) => setGroupClass(e.target.value)}
                                        >
                                            <option value="All">All Classes</option>
                                            {classOptions.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {groupedStudents.map((s: any, idx: number) => (
                                        <button 
                                            key={idx}
                                            onClick={() => setSelectedStudent(s)}
                                            className="bg-slate-950/50 border border-slate-800/50 p-6 rounded-3xl flex items-center gap-5 group hover:border-indigo-500/30 transition-all hover:bg-indigo-600/5 text-left"
                                        >
                                            <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-indigo-400 border border-slate-800 shadow-xl group-hover:scale-105 transition-transform">
                                                <UserCircle size={32} />
                                            </div>
                                            <div className="flex flex-col gap-0.5">
                                                <span className="text-xs font-black text-white uppercase tracking-tight group-hover:text-indigo-300 transition-colors">{s.full_name||s.name||"—"}</span>
                                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{s.roll_number||s.id||"—"}</span>
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
                                {(selectedStudent.photo_url||selectedStudent.imageUrl) ? (
                                    <img src={selectedStudent.photo_url||selectedStudent.imageUrl} alt="Profile" className="w-full h-full object-cover" />
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
                                        <h2 className="text-3xl font-black text-white tracking-tighter uppercase">{selectedStudent.full_name||selectedStudent.name||'—'}</h2>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
                                            {selectedStudent.role||selectedStudent.subjects_assigned||selectedStudent.subject} • {selectedStudent.qualifications}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <motion.button 
                                          whileTap={{ scale: 0.95 }}
                                          onClick={isEditing ? saveEdit : startEdit}
                                          disabled={isSaving}
                                          className={`px-5 py-2.5 border rounded-xl text-[10px] font-black uppercase transition-all ${isEditing ? 'bg-amber-500 border-amber-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'}`}
                                        >
                                          {isSaving ? 'Saving...' : isEditing ? '✅ Save Changes' : '✏️ Edit Profile'}
                                        </motion.button>
                                        {isEditing && <motion.button whileTap={{ scale: 0.95 }} onClick={() => setIsEditing(false)} className="px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-[10px] font-black uppercase text-slate-400 hover:text-white transition-all">Cancel</motion.button>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[
                                        { label: "Phone", val: selectedStudent.phone },
                                        { label: "DOB", val: selectedStudent.dob },
                                        { label: "Subjects", val: selectedStudent.subjects_assigned||selectedStudent.subject },
                                        { label: "Class Teacher Of", val: selectedStudent.designated_class||selectedStudent.designatedClass||'None' },
                                    ].map((d, i) => (
                                        <div key={i} className="bg-slate-950 border border-slate-800/50 p-4 rounded-2xl flex flex-col items-center text-center justify-center">
                                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{d.label}</span>
                                            <span className="text-[11px] font-bold text-white uppercase mt-1">{d.val||'—'}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="w-full bg-slate-950 border border-slate-800/50 p-4 rounded-2xl">
                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-1">Residential Address</span>
                                    <span className="text-xs font-bold text-slate-300 uppercase">{selectedStudent.address||'—'}</span>
                                </div>
                                {isEditing && (
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 p-4 bg-slate-950 rounded-2xl border border-indigo-500/20">
                                    <p className="col-span-full text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">✏️ Edit Staff Details</p>
                                    {[['Full Name','full_name'],['Phone','phone'],['Address','address'],['Subjects','subjects_assigned'],['Designated Class','designated_class'],['Qualifications','qualifications'],['Base Salary','base_salary'],['Status','status']].map(([label, key]) => (
                                      <div key={key} className="flex flex-col gap-1">
                                        <label className="text-[8px] font-black text-slate-500 uppercase tracking-widest ml-1">{label}</label>
                                        <input type="text" value={editData[key]||''} onChange={(e) => setEditData({...editData,[key]:e.target.value})} className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white focus:ring-1 focus:ring-indigo-500 outline-none" />
                                      </div>
                                    ))}
                                  </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-3xl font-black text-white tracking-tighter uppercase">{selectedStudent.full_name||selectedStudent.name||'—'}</h2>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">SR: {selectedStudent.sr_number||'—'} • Roll: {selectedStudent.roll_number||'—'} • {selectedStudent.medium||'—'} MEDIUM</p>
                                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">PIN: {selectedStudent.login_pin||'—'}</p>
                                </div>
                                <div className="flex gap-2">
                                    <motion.button 
                                      whileTap={{ scale: 0.95 }}
                                      onClick={isEditing ? saveEdit : startEdit}
                                      disabled={isSaving}
                                      className={`px-5 py-2.5 border rounded-xl text-[10px] font-black uppercase transition-all ${isEditing ? 'bg-amber-500 border-amber-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'}`}
                                    >
                                      {isSaving ? 'Saving...' : isEditing ? '✅ Save Changes' : '✏️ Edit Profile'}
                                    </motion.button>
                                    {isEditing && <motion.button whileTap={{ scale: 0.95 }} onClick={() => setIsEditing(false)} className="px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-[10px] font-black uppercase text-slate-400">Cancel</motion.button>}
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
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2 p-4 bg-slate-950 rounded-2xl border border-indigo-500/20">
                                <p className="col-span-full text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">✏️ Edit Student Details</p>
                                {[['Full Name','full_name'],['Class','class'],['Roll Number','roll_number'],['Medium','medium'],['Aadhar','aadhar_number'],['Category','category'],['Father Name','father_name'],['Mother Name','mother_name'],['Contact','phone'],['Total Fee','total_fee'],['Fee Status','fee_status'],['SR Number','sr_number']].map(([label,key]) => (
                                  <div key={key} className="flex flex-col gap-1">
                                    <label className="text-[8px] font-black text-slate-500 uppercase tracking-widest ml-1">{label}</label>
                                    <input type="text" value={editData[key]||''} onChange={(e) => setEditData({...editData,[key]:e.target.value})} className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white focus:ring-1 focus:ring-indigo-500 outline-none" />
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                                  {[
                                      { label: "Total Fee", val: `₹${(selectedStudent.total_fee||selectedStudent.totalFee||0).toLocaleString()}` },
                                      { label: "Fee Status", val: selectedStudent.fee_status||selectedStudent.feeStatus||'Pending', color: (selectedStudent.fee_status||'') === 'Paid' ? 'text-amber-400' : 'text-rose-400' },
                                      { label: "Login PIN", val: selectedStudent.login_pin||'—', color: 'text-indigo-400' },
                                      { label: "Attendance", val: selectedStudent.attendance_pct||selectedStudent.attendance||'—' },
                                  ].map((d, i) => (
                                      <div key={i} className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800/50">
                                          <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">{d.label}</span>
                                          <p className={`text-sm font-black mt-1 uppercase tracking-tight ${d.color || 'text-white'}`}>{d.val}</p>
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