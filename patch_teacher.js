const fs = require('fs');
let content = fs.readFileSync('src/app/dashboard/teacher/page.tsx', 'utf-8');

// 1. ADD STATES AND LOAD DATA
const stateOld = `  // Updates State
  const [updateTarget, setUpdateTarget] = useState("School");`;

const stateNew = `  // Updates State
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
`;

const loadOld = `        if (data.designated_class) {
          setAttClass(data.designated_class);
          setAttMedium(data.medium || 'Hindi');
          loadStudents(data.designated_class);
        }
      }
    };`;

const loadNew = `        if (data.designated_class) {
          setAttClass(data.designated_class);
          setAttMedium(data.medium || 'Hindi');
          setDiaryClass(data.designated_class);
          setNotesClass(data.designated_class);
          setGradesClass(data.designated_class);
          loadStudents(data.designated_class);
        }
        loadDynamicData(data.id, data.designated_class);
      }
    };`;


// 2. DIARY SUBMIT & LIST
const diaryOld = `                            <div className="flex flex-col gap-1.5">
                                <label className="text-[11px] font-bold text-slate-500 pl-1">Subject</label>
                                <select className="bg-slate-50 text-slate-700 text-xs font-bold p-3 rounded-[12px] border border-slate-200 outline-none">
                                    <option>Math</option>
                                    <option>Hindi</option>
                                    <option>English</option>
                                    <option>EVS</option>
                                    <option>Sanskrit</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[11px] font-bold text-slate-500 pl-1">Homework Detail</label>
                                <textarea placeholder="Write detailed homework or diary note here..." rows={4} className="w-full bg-slate-50 text-slate-700 text-xs font-bold p-3 rounded-[12px] border border-slate-200 outline-none"></textarea>
                            </div>
                            <button className="w-full py-3.5 bg-amber-500 text-white rounded-[12px] font-black text-sm shadow-[0_4px_15px_rgba(245,158,11,0.3)] hover:bg-amber-600 transition-colors">
                                Send Diary Note
                            </button>

                            <div className="mt-4 pt-5 border-t border-slate-100">
                                <h4 className="text-[12px] font-black text-slate-800 mb-3 px-1">Recent Homework History</h4>
                                <div className="flex flex-col gap-2 mb-4">
                                    <label className="text-[10px] font-bold text-slate-500 pl-1">Filter by Date</label>
                                    <input type="date" value={diaryDate} onChange={(e) => setDiaryDate(e.target.value)} className="bg-slate-50 text-slate-700 text-xs font-bold p-2.5 rounded-[12px] border border-slate-200 outline-none w-max focus:border-amber-300" />
                                </div>
                                {diaryDate && (
                                    <div className="flex flex-col gap-3 animate-fade-in">
                                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col gap-1">
                                            <div className="flex justify-between items-center">
                                                <span className="text-[11px] font-black text-slate-800">Class 10-A • Math</span>
                                                <span className="text-[9px] font-bold text-slate-400">{diaryDate}</span>
                                            </div>
                                            <p className="text-[10px] font-bold text-slate-500">Complete Ex 4.2 all questions in fair notebook.</p>
                                        </div>
                                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col gap-1">
                                            <div className="flex justify-between items-center">
                                                <span className="text-[11px] font-black text-slate-800">Class 8-B • Science</span>
                                                <span className="text-[9px] font-bold text-slate-400">{diaryDate}</span>
                                            </div>
                                            <p className="text-[10px] font-bold text-slate-500">Draw human digestive system diagram.</p>
                                        </div>
                                    </div>
                                )}
                                {!diaryDate && <p className="text-[10px] text-slate-400 font-bold px-1 italic">Select a date to view homework</p>}
                            </div>`;

const diaryNew = `                            <div className="flex flex-col gap-1.5">
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
                            </div>`;


// 3. NOTES TAB
const notesOld2 = `                            <input type="text" placeholder="Note Title / Chapter Name" className="w-full bg-slate-50 text-slate-700 text-sm font-bold p-3.5 rounded-[12px] border border-slate-200 outline-none focus:border-sky-300" />
                            
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
                                <p className="text-[10px] text-slate-400 font-bold px-1 italic">Select a date to view notes</p>
                            )}`;

const notesNew2 = `                            <input type="text" value={notesTitle} onChange={e => setNotesTitle(e.target.value)} placeholder="Note Title / Chapter Name" className="w-full bg-slate-50 text-slate-700 text-sm font-bold p-3.5 rounded-[12px] border border-slate-200 outline-none focus:border-sky-300" />
                            
                            <div className="border-2 border-dashed border-sky-200 rounded-[16px] p-6 flex flex-col items-center justify-center text-center bg-sky-50/50 cursor-pointer hover:bg-sky-50 transition-colors">
                                <Upload size={24} className="text-sky-500 mb-2" />
                                <span className="text-xs font-black text-slate-600">Upload PDF / Images (Coming Soon)</span>
                                <span className="text-[9px] font-bold text-slate-400 mt-1">Max size 10MB</span>
                            </div>
                            <button disabled={isSubmitting} onClick={async () => {
                                if(!notesTitle) { alert('Enter title'); return; }
                                setIsSubmitting(true);
                                const { data, error } = await supabase.from('notes').insert({
                                    teacher_id: teacher.id,
                                    teacher_name: teacher.full_name,
                                    class: notesClass || teacher.designated_class || 'All',
                                    title: notesTitle,
                                    subject: teacher.subject || 'General'
                                }).select('*').single();
                                setIsSubmitting(false);
                                if(error) alert(error.message);
                                else {
                                    alert('Note shared!');
                                    setNotesTitle('');
                                    setNotesList([data, ...notesList]);
                                }
                            }} className="w-full py-4 bg-sky-500 text-white rounded-[16px] font-black text-sm shadow-[0_8px_20px_rgba(14,165,233,0.3)] hover:bg-sky-600 transition-colors flex items-center justify-center gap-2 mt-2 disabled:opacity-50">
                                <Send size={18} /> {isSubmitting ? 'Sending...' : 'Send Notes'}
                            </button>
                        </div>

                        <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col gap-4 mt-2">
                            <h3 className="text-sm font-black text-slate-800">Previous Notes</h3>
                            <div className="flex flex-col gap-3 animate-fade-in">
                                {notesList.map((n, i) => (
                                    <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-sky-100 text-sky-500 rounded-lg flex items-center justify-center"><FileText size={18} /></div>
                                            <div className="flex flex-col">
                                                <span className="text-[11px] font-black text-slate-800">{n.title}</span>
                                                <span className="text-[9px] font-bold text-slate-400">Class {n.class} • {new Date(n.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <a href={n.pdf_url || '#'} target="_blank" className="text-[10px] font-black text-sky-600 hover:underline">View PDF</a>
                                    </div>
                                ))}
                                {notesList.length === 0 && <p className="text-[10px] text-slate-400 font-bold px-1 italic">No notes uploaded yet</p>}
                            </div>`;


content = content.replace(stateOld, stateNew);
content = content.replace(loadOld, loadNew);
content = content.replace(diaryOld, diaryNew);
content = content.replace(notesOld2, notesNew2);

// FIX GRADES SUBMIT
const gradesSubOld = `<button className="w-full mt-4 py-4 bg-purple-600 text-white rounded-[16px] font-black text-sm shadow-[0_8px_20px_rgba(147,51,234,0.3)] hover:bg-purple-700 transition-colors">
                                    Submit Grades
                                </button>`;

const gradesSubNew = `<button disabled={isSubmitting} onClick={async () => {
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
                                </button>`;

content = content.replace(gradesSubOld, gradesSubNew);

// FIX MARKS INPUT CLASS
const marksInputOld = `<input type="number" placeholder="Marks" className="w-full bg-white text-slate-800 text-center text-sm font-black p-2.5 rounded-[10px] border border-slate-200 outline-none focus:border-purple-400 shadow-sm" />`;
const marksInputNew = `<input type="number" data-id={student.id} data-name={student.name} placeholder="Marks" className="marks-input w-full bg-white text-slate-800 text-center text-sm font-black p-2.5 rounded-[10px] border border-slate-200 outline-none focus:border-purple-400 shadow-sm" />`;

content = content.replace(marksInputOld, marksInputNew);

// TIMETABLE REPLACE
const timetableOld = `                                <div className="w-20 h-20 bg-white/20 rounded-[24px] flex items-center justify-center backdrop-blur-md border border-white/30 shadow-inner mb-5">
                                    <Calendar size={40} className="text-white drop-shadow-md" />
                                </div>
                                <h2 className="text-3xl font-black mb-2 tracking-tight drop-shadow-sm">Master Time Table</h2>
                                <p className="text-xs font-bold text-rose-100 mb-8 max-w-[80%] leading-relaxed">
                                    Access the complete schedule for Class 10-A, 10-B, and 9-A all in one place.
                                </p>
                                <button className="bg-white text-rose-600 px-8 py-4 rounded-full font-black text-sm shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,0,0,0.2)] transition-all duration-300 flex items-center gap-2">
                                    <Download size={18} /> Download HD PDF
                                </button>`;

const timetableNew = `                                <div className="w-20 h-20 bg-white/20 rounded-[24px] flex items-center justify-center backdrop-blur-md border border-white/30 shadow-inner mb-5">
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
                                )}`;

content = content.replace(timetableOld, timetableNew);

fs.writeFileSync('src/app/dashboard/teacher/page.tsx', content);
console.log('Teacher Dashboard cleaned up!');
