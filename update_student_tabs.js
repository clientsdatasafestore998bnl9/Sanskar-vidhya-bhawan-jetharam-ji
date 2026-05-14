const fs = require('fs');
let content = fs.readFileSync('src/app/dashboard/student/page.tsx', 'utf-8');

const timetableOld =         if (activeTab === "timetable") {
            return (
                <div className="flex flex-col animate-fade-in pb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-black text-slate-800">Show Time Table</h3>
                    </div>
                    <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[24px] p-8 flex flex-col items-center justify-center text-center mt-2">
                        <div className="w-16 h-16 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mb-4">
                            <FileText size={32} />
                        </div>
                        <h4 className="text-base font-black text-slate-800 mb-1">Class 10-A Time Table</h4>
                        <p className="text-[11px] font-bold text-slate-500 mb-8">PDF Document • 1.2 MB</p>
                        <button className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-black text-sm shadow-[0_4px_15px_rgba(37,99,235,0.3)] hover:bg-blue-700 transition-colors flex items-center gap-2">
                            <Download size={18} /> Download PDF
                        </button>
                    </div>
                </div>
            );
        };

const timetableNew =         if (activeTab === "timetable") {
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
        };

const notesOld =         if (activeTab === "notes") {
            return (
                <div className="flex flex-col animate-fade-in pb-8">
                    <h3 className="text-sm font-black text-slate-800 mb-3">Today's Notes</h3>
                    <div className="flex flex-col gap-3 mb-6">
                        <div className="bg-white rounded-[20px] p-4 border border-slate-100 shadow-sm flex flex-col relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>
                            <div className="flex justify-between items-start mb-2 pl-2">
                                <div>
                                    <h4 className="text-sm font-black text-slate-800 leading-tight">Physics: Light Reflection</h4>
                                    <p className="text-[11px] font-bold text-slate-500 mt-1 line-clamp-2 pr-2">Complete class notes covering spherical mirrors and sign conventions. Please read before tomorrow's test.</p>
                                </div>
                                <span className="text-[9px] font-bold text-slate-400 shrink-0">Today</span>
                            </div>
                            <div className="pl-2 mt-2 flex justify-between items-center">
                                <span className="text-[9px] font-bold bg-slate-50 text-slate-500 px-2 py-1 rounded-full border border-slate-100">By Neha Sharma</span>
                                <button className="text-[10px] bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg font-black hover:bg-blue-100 transition-colors flex items-center gap-1">
                                    <Download size={12} /> Download
                                </button>
                            </div>
                        </div>
                    </div>

                    <h3 className="text-sm font-black text-slate-800 mb-3">Past Notes</h3>
                    <div className="flex flex-col gap-3">
                        <div className="bg-white rounded-[20px] p-4 border border-slate-100 shadow-sm flex flex-col relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-300"></div>
                            <div className="flex justify-between items-start mb-2 pl-2">
                                <div>
                                    <h4 className="text-sm font-black text-slate-800 leading-tight">Maths: Quadratic Equations</h4>
                                    <p className="text-[11px] font-bold text-slate-500 mt-1 line-clamp-2 pr-2">Formula sheet and important questions from Chapter 4.</p>
                                </div>
                                <span className="text-[9px] font-bold text-slate-400 shrink-0">12 Nov</span>
                            </div>
                            <div className="pl-2 mt-2 flex justify-between items-center">
                                <span className="text-[9px] font-bold bg-slate-50 text-slate-500 px-2 py-1 rounded-full border border-slate-100">By R.K. Singh</span>
                                <button className="text-[10px] bg-slate-50 text-slate-600 px-3 py-1.5 rounded-lg font-black hover:bg-slate-100 transition-colors flex items-center gap-1 border border-slate-200">
                                    <Download size={12} /> Download
                                </button>
                            </div>
                        </div>
                        <div className="bg-white rounded-[20px] p-4 border border-slate-100 shadow-sm flex flex-col relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-300"></div>
                            <div className="flex justify-between items-start mb-2 pl-2">
                                <div>
                                    <h4 className="text-sm font-black text-slate-800 leading-tight">Hindi: Grammar Rules</h4>
                                    <p className="text-[11px] font-bold text-slate-500 mt-1 line-clamp-2 pr-2">Sandhi and Samas basic rules for revision.</p>
                                </div>
                                <span className="text-[9px] font-bold text-slate-400 shrink-0">10 Nov</span>
                            </div>
                            <div className="pl-2 mt-2 flex justify-between items-center">
                                <span className="text-[9px] font-bold bg-slate-50 text-slate-500 px-2 py-1 rounded-full border border-slate-100">By V. Kumar</span>
                                <button className="text-[10px] bg-slate-50 text-slate-600 px-3 py-1.5 rounded-lg font-black hover:bg-slate-100 transition-colors flex items-center gap-1 border border-slate-200">
                                    <Download size={12} /> Download
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        };

const notesNew =         if (activeTab === "notes") {
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
                                <div className={\bsolute top-0 left-0 w-1.5 h-full \\}></div>
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
        };

const reportCardOld =         if (activeTab === "reportcard") {
             return (
                <div className="flex flex-col animate-fade-in pb-8">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-sm font-black text-slate-800">Term 1 Result</h3>
                    </div>
                    <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-[20px] p-5 text-white shadow-[0_8px_20px_rgba(79,70,229,0.3)] relative overflow-hidden flex flex-col gap-4 mb-5">
                         <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                         <div className="flex justify-between items-center relative z-10">
                             <div className="flex flex-col">
                                 <span className="text-3xl font-black">92.4%</span>
                                 <span className="text-[10px] font-bold text-indigo-200">Total: 462/500</span>
                             </div>
                             <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/30 shadow-inner">
                                 <span className="font-black text-2xl text-white">A+</span>
                             </div>
                         </div>
                         <button className="w-full bg-white text-indigo-600 py-2.5 rounded-xl font-black text-xs shadow-sm flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors relative z-10">
                             Download Full Report <Download size={14} />
                         </button>
                    </div>

                    <h3 className="text-sm font-black text-slate-800 mb-3">Subject Wise Marks</h3>
                    <div className="flex flex-col gap-2">
                         {[
                             { sub: "Mathematics", marks: 95, color: "text-blue-500", bg: "bg-blue-50" },
                             { sub: "Science", marks: 92, color: "text-emerald-500", bg: "bg-emerald-50" },
                             { sub: "English", marks: 88, color: "text-amber-500", bg: "bg-amber-50" },
                             { sub: "Social Science", marks: 94, color: "text-purple-500", bg: "bg-purple-50" },
                             { sub: "Hindi", marks: 93, color: "text-rose-500", bg: "bg-rose-50" },
                         ].map((item, i) => (
                             <div key={i} className="bg-white rounded-[16px] p-3 border border-slate-100 flex items-center justify-between shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                                 <div className="flex items-center gap-3">
                                     <div className={\w-8 h-8 rounded-full flex items-center justify-center \ \ font-black text-[10px]\}>{item.sub[0]}</div>
                                     <span className="text-xs font-black text-slate-700">{item.sub}</span>
                                 </div>
                                 <span className="text-sm font-black text-slate-800">{item.marks}<span className="text-[10px] text-slate-400 font-bold">/100</span></span>
                             </div>
                         ))}
                    </div>
                </div>
             );
        };

const reportCardNew =         if (activeTab === "reportcard") {
            const totalMarksObtained = studentMarks.reduce((acc, m) => acc + (m.marks_obtained || 0), 0);
            const totalMaxMarks = studentMarks.reduce((acc, m) => acc + (m.max_marks || 100), 0);
            const percentage = totalMaxMarks > 0 ? ((totalMarksObtained / totalMaxMarks) * 100).toFixed(1) : 0;
            const grade = percentage >= 90 ? 'A+' : percentage >= 80 ? 'A' : percentage >= 70 ? 'B' : percentage >= 60 ? 'C' : 'D';

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
                                     <div className={\w-8 h-8 rounded-full flex items-center justify-center \ \ font-black text-[10px]\}>{(item.subject || '?')[0]}</div>
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
        };

content = content.replace(timetableOld, timetableNew);
content = content.replace(notesOld, notesNew);
content = content.replace(reportCardOld, reportCardNew);

fs.writeFileSync('src/app/dashboard/student/page.tsx', content);
console.log("Replaced successfully");
