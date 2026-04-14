"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  UserSquare2, 
  BadgeIndianRupee, 
  MessageSquareQuote, 
  BellRing, 
  PieChart, 
  Settings2,
  ExternalLink,
  Search,
  CheckCircle2,
  Clock,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#fcfcfc] flex">
      {/* Sidebar - Desktop */}
      <aside className="w-64 bg-slate-950 text-white hidden lg:flex flex-col p-8 fixed h-full z-20">
        <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-1">
                <Image src="/logo.png" alt="Logo" width={32} height={32} />
            </div>
            <div className="flex flex-col">
                <span className="font-black text-xs tracking-tighter">SANSKAR ADMIN</span>
                <span className="font-bold text-[8px] tracking-widest uppercase opacity-40">Command Center</span>
            </div>
        </div>

        <nav className="flex flex-col gap-1.5 flex-1">
          {[
            { name: "Overview", icon: PieChart, active: true },
            { name: "Students", icon: Users },
            { name: "Teachers", icon: UserSquare2 },
            { name: "Admissions", icon: MessageSquareQuote },
            { name: "Fees & Ledger", icon: BadgeIndianRupee },
            { name: "Notifications", icon: BellRing },
          ].map((item) => (
            <button
                key={item.name}
                className={`flex items-center gap-4 px-5 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
                    item.active ? "bg-accent text-primary shadow-lg" : "text-white/30 hover:bg-white/5 hover:text-white"
                }`}
            >
                <item.icon size={16} />
                {item.name}
            </button>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-4">
             <button className="flex items-center gap-4 px-5 py-3.5 text-white/30 hover:text-white transition-colors">
                <Settings2 size={18} />
                <span className="text-[11px] font-black uppercase tracking-widest">Controls</span>
            </button>
            <Link href="/" className="flex items-center gap-4 px-5 py-3.5 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                <ExternalLink size={18} />
                <span className="text-[11px] font-black uppercase tracking-widest">Logout</span>
            </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 p-6 lg:p-10">
        {/* Top Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-8 border-b border-slate-100">
            <div className="flex flex-col">
                <h1 className="text-3xl font-black text-slate-950 uppercase tracking-tighter">School Management Summary</h1>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Reports for session 2024-25</p>
            </div>
            <div className="flex items-center gap-3">
                <div className="relative hidden sm:block">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                    <input 
                        type="text" 
                        placeholder="Quick search student..." 
                        className="bg-slate-50 border-slate-100 rounded-xl pl-12 pr-6 py-2.5 text-xs font-bold focus:ring-2 focus:ring-accent w-56 transition-all"
                    />
                </div>
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-100 relative">
                    <BellRing size={16} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
                </div>
                <div className="w-10 h-10 bg-primary/10 rounded-xl overflow-hidden shadow-sm">
                    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100" alt="Admin" className="w-full h-full object-cover" />
                </div>
            </div>
        </header>

        {/* Global Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
                { label: "Active Students", value: "1,248", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10", trend: "+12%" },
                { label: "Faculty Members", value: "82", icon: UserSquare2, color: "text-emerald-500", bg: "bg-emerald-500/10", trend: "Full" },
                { label: "Collection (Monthly)", value: "₹4.2M", icon: BadgeIndianRupee, color: "text-accent", bg: "bg-accent/10", trend: "On Track" },
                { label: "New Inquiries", value: "14", icon: MessageSquareQuote, color: "text-indigo-500", bg: "bg-indigo-500/10", trend: "Today" },
            ].map((stat, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white p-6 rounded-[30px] border border-slate-100 shadow-sm flex flex-col gap-4 group hover:-translate-y-1 transition-all"
                >
                    <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <stat.icon size={20} />
                        </div>
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-50">
                            <TrendingUp size={10} className="text-emerald-500" />
                            <span className="text-[9px] font-black uppercase text-emerald-500">{stat.trend}</span>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-2xl font-black text-slate-950 tracking-tighter">{stat.value}</h4>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-0.5">{stat.label}</p>
                    </div>
                </motion.div>
            ))}
        </div>

        {/* Action Detail Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
            
            {/* Recent Enquiries / Admissions */}
            <div className="lg:col-span-8 flex flex-col gap-6">
                <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                         <div className="flex flex-col gap-1">
                            <h3 className="text-lg font-black uppercase tracking-tighter text-slate-950">Recent Admissions Inquiries</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Real-time submissions from contact form</p>
                         </div>
                         <button className="text-[10px] font-black text-accent uppercase tracking-widest hover:underline decoration-2">Export Data</button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-50">
                                    <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Parent Name</th>
                                    <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Class</th>
                                    <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                                    <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {[
                                    { name: "Suresh Meena", class: "Grade 11", status: "Follow-up", color: "text-indigo-500 bg-indigo-50", date: "12:30 PM" },
                                    { name: "Anita Devi", class: "Nursery", status: "Joined", color: "text-emerald-500 bg-emerald-50", date: "11:45 AM" },
                                    { name: "Vikas Rajpurohit", class: "Grade 5", status: "Pending", color: "text-orange-500 bg-orange-50", date: "Yesterday" },
                                    { name: "Priya Soni", class: "Grade 1", status: "Follow-up", color: "text-indigo-500 bg-indigo-50", date: "Yesterday" },
                                    { name: "Rahul Saini", class: "Grade 9", status: "Cancelled", color: "text-slate-400 bg-slate-50", date: "10 April" },
                                ].map((row, i) => (
                                    <tr key={i} className="group hover:bg-slate-50/50 transition-colors cursor-pointer">
                                        <td className="py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                                                    {row.name[0]}
                                                </div>
                                                <span className="text-xs font-black text-slate-900">{row.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 text-xs font-bold text-slate-500">{row.class}</td>
                                        <td className="py-4">
                                            <span className={`px-2.5 py-1 rounded-md text-[8px] font-black uppercase tracking-widest ${row.color}`}>
                                                {row.status}
                                            </span>
                                        </td>
                                        <td className="py-4 text-xs font-bold text-slate-400 text-right">{row.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Management Hub */}
            <div className="lg:col-span-4 flex flex-col gap-6">
                {/* Urgent Alerts */}
                <div className="bg-slate-950 rounded-[40px] p-8 text-white flex flex-col gap-6 shadow-2xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <div className="flex items-center gap-3">
                        <AlertCircle className="text-accent" size={20} />
                        <h3 className="text-sm font-black uppercase tracking-widest">Urgent Actions</h3>
                    </div>
                    <div className="flex flex-col gap-4">
                        {[
                            { title: "Staff Payroll Update", cat: "Accounts" },
                            { title: "Electricity Bill Due", cat: "Utilities" },
                        ].map((alert, i) => (
                            <div key={i} className="bg-white/5 border border-white/5 p-4 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-accent mb-0.5">{alert.cat}</span>
                                    <span className="text-xs font-bold">{alert.title}</span>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40">
                                    <Clock size={14} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Audit Logs */}
                <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm flex-1">
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-950 mb-6 flex items-center justify-between">
                         System Logs
                        <CheckCircle2 size={16} className="text-emerald-500" />
                    </h3>
                    <div className="flex flex-col gap-5">
                         {[
                            { user: "Admin", action: "Updated Gallery", time: "2 min ago" },
                            { user: "Mr. Singh", action: "Posted Homework", time: "15 min ago" },
                            { user: "System", action: "DB Backup Success", time: "1 hour ago" },
                            { user: "Portal", action: "New Inquiry Rec.", time: "2 hours ago" },
                         ].map((log, i) => (
                             <div key={i} className="flex gap-4 items-start relative group">
                                 {i < 3 && <div className="absolute left-[7px] top-6 w-[2px] h-6 bg-slate-50 group-hover:bg-accent/20 transition-colors" />}
                                 <div className="w-4 h-4 rounded-full border-2 border-slate-100 bg-white z-10 mt-1 group-hover:border-accent transition-colors" />
                                 <div className="flex flex-col">
                                    <p className="text-[11px] font-bold text-slate-900">{log.user} <span className="text-slate-400 ml-1 font-medium">{log.action}</span></p>
                                    <span className="text-[9px] font-black text-slate-300 uppercase mt-0.5">{log.time}</span>
                                 </div>
                             </div>
                         ))}
                    </div>
                </div>
            </div>

        </div>
      </main>
    </div>
  );
}
