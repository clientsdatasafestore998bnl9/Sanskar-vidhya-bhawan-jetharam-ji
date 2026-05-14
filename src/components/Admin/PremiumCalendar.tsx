"use client";
import React, { useState } from "react";
import { Calendar, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const PremiumCalendar = ({ value, onChange, label }: { value: string, onChange: (v: string) => void, label: string }) => {
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
                  {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <span key={i} className="text-[8px] font-black text-slate-600 uppercase">{d}</span>)}
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