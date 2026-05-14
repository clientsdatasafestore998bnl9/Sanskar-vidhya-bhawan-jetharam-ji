"use client";
import React from "react";
import { motion } from "framer-motion";
import { useAdmin } from "@/app/dashboard/admin/context/AdminContext";
import { Users, UserSquare2, Library, CheckSquare, Bus, Home, Bell, CreditCard, AlertCircle, Clock, Plus, TrendingUp, ChevronRight } from "lucide-react";

export   const DashboardOverview = () => {
    const { dbStudents, dbTeachers, dbAccounts, setActiveTab, setActiveSubView, isMounted } = useAdmin();
    return (
    <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mt-2">
            <div>
                <h2 className="text-xl font-black text-white tracking-tight underline underline-offset-8 decoration-indigo-500/30 uppercase font-JakartaSans">Institutional Audit</h2>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2">{isMounted ? new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) : "Loading..."}</p>
            </div>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <button 
                    onClick={() => { setActiveTab("exam"); setActiveSubView("default"); }}
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
                { label: "Total Students", val: String(dbStudents.length), icon: Users, color: "text-blue-400", bg: "bg-blue-500/10" },
                { label: "Total Faculty", val: String(dbTeachers.length), icon: UserSquare2, color: "text-purple-400", bg: "bg-purple-500/10" },
                { label: "Total Revenue", val: (() => { const total = dbAccounts.reduce((s: any, f: any) => s+(f.amount||0),0); return total >= 1e7 ? "₹" + (total/1e7).toFixed(2) + "Cr" : "₹" + (total/1e3).toFixed(1) + "K"; })(), icon: CreditCard, color: "text-amber-400", bg: "bg-amber-500/10" },
                { label: "Fees Pending", val: (() => { const pending = dbAccounts.filter((f: any) => f.status==="Pending").reduce((s: any, f: any) => s+(f.amount||0),0); return "₹" + (pending/1e5).toFixed(1) + "L"; })(), icon: AlertCircle, color: "text-rose-400", bg: "bg-rose-500/10" },
                { label: "Faculty Salary", val: dbTeachers.filter((t: any) => t.pending_salary>0).length + " Pending", icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10" },
            ].map((s: any, i: number) =>  (
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
                                {dbStudents.slice(0, 5).map((s: any, i: number) =>  (
                                    <tr key={i} className="hover:bg-indigo-500/5 transition-colors border-b border-slate-800/10">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-xs font-black text-indigo-400 border border-slate-700">{(s.full_name||s.name||"?")[0]}</div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-black text-white uppercase tracking-tight">{s.full_name||s.name||"—"}</span>
                                                    <span className="text-[10px] font-bold text-slate-500 uppercase">{s.roll_number||s.id||"—"}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-xs font-black text-slate-400 bg-slate-800 px-2 py-1 rounded-md">CLASS {s.class} • #{s.roll_number}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-xs font-black text-slate-500 uppercase">{s.medium}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase ${(s.fee_status||s.fee||'') === 'Paid' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>{s.fee_status||s.fee||'Pending'}</span>
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
                              <span className="text-3xl font-black tracking-tighter text-white">{(() => { const t = dbAccounts.reduce((s: any, f: any) => s+(Number(f.amount)||Number(f.total_fee)||0),0); return t >= 1e7 ? "₹"+(t/1e7).toFixed(2)+"Cr" : t >= 1e5 ? "₹"+(t/1e5).toFixed(1)+"L" : "₹"+t.toLocaleString('en-IN'); })()}</span>
                              <div className="flex items-center gap-1 text-amber-500/100">
                                 <TrendingUp size={12} />
                                 <span className="text-[10px] font-black uppercase">{(() => { const paid = dbAccounts.filter((f: any) => f.fee_status==="Paid"||f.status==="Paid").length; const total = dbAccounts.length || 1; return Math.round((paid/total)*100) + "% Collected"; })()}</span>
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
                              <span className="text-[10px] font-black text-slate-400">Target: ₹{(dbStudents.length * 10000 / 1e5).toFixed(1)}L (Est.)</span>
                              <span className="text-[10px] font-black text-indigo-400">{dbAccounts.length > 0 ? Math.round((dbAccounts.filter((f: any) => f.fee_status==="Paid"||f.status==="Paid").length/dbAccounts.length)*100) : 0}% Collected</span>
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
};