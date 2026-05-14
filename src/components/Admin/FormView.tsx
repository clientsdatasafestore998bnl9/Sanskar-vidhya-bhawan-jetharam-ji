"use client";
import React, { useState } from "react";
import { FileText, UserCircle, FileBox, CreditCard, ShieldCheck, ChevronDown, Download } from "lucide-react";
import { PremiumCalendar } from "./PremiumCalendar";
import { supabase } from "@/lib/supabase";
import { PrintLayout } from "./PrintLayout";
import { motion, AnimatePresence } from "framer-motion";

type FieldType = { 
  label: string; 
  type: "text" | "select" | "date" | "file"; 
  options?: string[]; 
  value?: string;
  onChange?: (val: string) => void;
};

const CLASS_FEES: Record<string, number> = {
  "Nursery": 6500, "LKG": 6800, "UKG": 7000,
  "1st": 8500, "2nd": 8800, "3rd": 9000, "4th": 9500, "5th": 10000,
  "6th": 11000, "7th": 11500, "8th": 12000, "9th": 14000, "10th": 15500
};

export const FormView = ({ title, fields, onSuccess, onRefresh }: { title: string, fields: FieldType[], onSuccess?: () => void, onRefresh?: () => void }) => {
  const [formData, setFormData] = useState<any>({});
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [welcomeSlip, setWelcomeSlip] = useState<any>(null);
  
  // Auto-Fee Sync Logic
  React.useEffect(() => {
      if (formData["Class Enrollment"]) {
          const classKey = formData["Class Enrollment"].split('-')[0];
          setFormData((prev: any) => ({ ...prev, "Calculated Fee": CLASS_FEES[classKey] || 6500 }));
      }
  }, [formData["Class Enrollment"]]);

  return (
      <div className="bg-slate-900 p-8 rounded-[40px] border border-slate-800 shadow-premium max-w-7xl mx-auto overflow-hidden relative">
          <div className="flex items-center justify-between mb-10 border-b border-slate-800 pb-8 print:hidden">
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 mb-12 print:hidden">
              {fields.map((field, x) => (
                  <div key={x} className="flex flex-col gap-1">
                      {field.type === "date" ? (
                          <PremiumCalendar 
                              label={field.label}
                              value={formData[field.label] || ""}
                              onChange={(val) => setFormData({...formData, [field.label]: val})}
                          />
                      ) : field.type === "file" ? (
                          <div className="flex flex-col gap-2.5 group col-span-full">
                              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1 ml-1">{field.label}</label>
                              <div className="flex items-center gap-5">
                                {/* Live Photo Preview */}
                                <div className="relative flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden bg-slate-800 border-2 border-dashed border-slate-700 flex items-center justify-center">
                                  {photoFile ? (
                                    <>
                                      <img src={URL.createObjectURL(photoFile)} alt="Preview" className="w-full h-full object-cover" />
                                      <button type="button" onClick={() => { setPhotoFile(null); setFormData({...formData, [field.label]: ""}); }} className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] font-black hover:bg-red-600 transition-all z-10" title="Remove">✕</button>
                                    </>
                                  ) : (
                                    <UserCircle className="text-slate-600" size={36} />
                                  )}
                                </div>
                                {/* Upload Box */}
                                <div className="relative flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 flex items-center justify-between group-hover:border-indigo-500/50 transition-all cursor-pointer overflow-hidden">
                                    <input type="file" accept="image/*" onChange={(e) => { if (e.target.files && e.target.files[0]) { setPhotoFile(e.target.files[0]); setFormData({...formData, [field.label]: e.target.files[0].name}); } }} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                    <div className="flex flex-col z-0">
                                      <span className="text-sm font-bold text-white">{photoFile ? "✅ " + photoFile.name.substring(0,22) + (photoFile.name.length>22?"...":"") : "Click to upload photo"}</span>
                                      <span className="text-[10px] text-slate-500 mt-0.5">{photoFile ? "Click to change photo" : "JPG, PNG — Max 5MB"}</span>
                                    </div>
                                    <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 z-0"><FileBox size={18} /></div>
                                </div>
                              </div>
                          </div>
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

          <div className="bg-slate-950/50 p-8 rounded-[32px] border-2 border-slate-800 border-dashed flex flex-col xl:flex-row items-center justify-between gap-8 mt-4 print:hidden">
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
                      onClick={async () => {
                        const isStaff = title.toLowerCase().includes('staff');
                        setIsSubmitting(true);
                        let saveError = null;

                        let uploadedPhotoUrl = null;
                        if (photoFile) {
                            const fileExt = photoFile.name.split('.').pop();
                            const fileName = `${isStaff ? 'TCH' : 'SVB'}_${Date.now()}.${fileExt}`;
                            const bucketName = isStaff ? 'teacher-photos' : 'student-photos';
                            const { error: uploadError, data } = await supabase.storage.from(bucketName).upload(fileName, photoFile);
                            if (!uploadError && data) {
                                const { data: urlData } = supabase.storage.from(bucketName).getPublicUrl(fileName);
                                uploadedPhotoUrl = urlData.publicUrl;
                            }
                        }

                        if (isStaff) {
                          const login_pin = Math.floor(100000 + Math.random() * 900000).toString();
                          const employee_id = `TCH${Math.floor(1000 + Math.random() * 9000)}`;

                          const { error } = await supabase.from('teachers').insert([{
                            full_name: formData["Full Name"] || "",
                            address: formData["Residential Address"] || "",
                            dob: formData["Date of Birth"] || null,
                            qualifications: formData["Educational Qualifications"] || "",
                            subject: formData["Subjects Assigned"] || "",
                            designated_class: formData["Designated Classes"] || "",
                            phone: formData["Contact Number"] || "",
                            join_date: formData["Joining Date"] || null,
                            base_salary: Number(formData["Base Salary (₹)"]) || 0,
                            pending_salary: Number(formData["Base Salary (₹)"]) || 0,
                            status: 'Active',
                            photo_url: uploadedPhotoUrl,
                            employee_id: employee_id,
                            login_pin: login_pin
                          }]);
                          saveError = error;
                          if (!error) { 
                              setWelcomeSlip({ name: formData["Full Name"], id: employee_id, pin: login_pin, type: 'Teacher' });
                              // WhatsApp Welcome Message to Staff
                              const teacherPhone = formData["Contact Number"];
                              if (teacherPhone && teacherPhone.length === 10) {
                                  const tMsg = encodeURIComponent(
                                    `🎉 *Sanskar Vidya Bhavan - Staff Welcome!*\n\nPriya ${formData["Full Name"]} ji,\n\nAapka SVB parivar mein swagat hai! 🏫\n\n📋 *Login Details:*\n• Employee ID: ${employee_id}\n• Login PIN: ${login_pin}\n\n✅ Staff Portal: https://sanskar-vidya-bhavan.vercel.app/login\n\n🙏 Shubh kamnayen!\n*Sanskar Vidya Bhavan*`
                                  );
                                  window.open(`https://wa.me/91${teacherPhone}?text=${tMsg}`, '_blank');
                              }
                              onSuccess?.(); 
                              onRefresh?.();
                          }
                        } else {
                          const classEnrollment = (formData["Class Enrollment"] || "").split('-')[0] || "";
                          
                          // Auto Roll Number
                          const { count } = await supabase.from('students').select('*', { count: 'exact', head: true }).eq('class', classEnrollment);
                          const roll_number = ((count || 0) + 1).toString().padStart(2, '0');
                          const login_pin = Math.floor(100000 + Math.random() * 900000).toString();

                          const { error } = await supabase.from('students').insert([{
                            full_name: formData["Student Full Name"] || "",
                            father_name: formData["Father's Name"] || "",
                            mother_name: formData["Mother's Name"] || "",
                            dob: formData["Date of Birth"] || null,
                            gender: formData["Gender"] || null,
                            class: classEnrollment,
                            medium: formData["Medium Preference"] || "",
                            category: formData["Category"] || "General",
                            sr_number: formData["SR Number"] || null,
                            contact_number: formData["Contact Number"] || "",
                            aadhar_number: formData["Aadhar Number"] || "",
                            father_occupation: formData["Father's Occupation"] || "",
                            total_fee: Number(formData["Calculated Fee"]) || 0,
                            fee_status: 'Pending',
                            photo_url: uploadedPhotoUrl,
                            roll_number: roll_number,
                            login_pin: login_pin
                          }]);
                          saveError = error;
                          if (!error) { 
                              setWelcomeSlip({ name: formData["Student Full Name"], rollNo: roll_number, className: classEnrollment, pin: login_pin, type: 'Student', srNo: formData["SR Number"] });
                              // WhatsApp Welcome Message to Parents
                              const phone = formData["Contact Number"];
                              if (phone && phone.length === 10) {
                                  const msg = encodeURIComponent(
                                    `🎉 *Sanskar Vidya Bhavan - Admission Confirmed!*\n\nPriya aabhivavak,\n\nAapke bachche *${formData["Student Full Name"]}* ka SVB mein swagat hai! 🏫\n\n📋 *Login Details:*\n• Roll No: ${roll_number}\n• Class: ${classEnrollment}\n• Login PIN: ${login_pin}\n\n✅ Portal: https://sanskar-vidya-bhavan.vercel.app/login\n\nKisi bhi jaankari ke liye school se sampark karein.\n\n🙏 Dhanyawad!\n*Sanskar Vidya Bhavan*`
                                  );
                                  window.open(`https://wa.me/91${phone}?text=${msg}`, '_blank');
                              }
              onSuccess?.();
              onRefresh?.();
                          }
                        }
                        setIsSubmitting(false);
                        if (saveError) alert('Error: ' + saveError.message);
                      }}
                      disabled={isSubmitting}
                      className="flex-1 md:flex-none px-14 py-5 bg-indigo-600 rounded-2xl text-[11px] font-black uppercase tracking-widest text-white shadow-[0_20px_40px_rgba(79,70,229,0.3)] hover:bg-indigo-700 transition-all flex items-center justify-center gap-4 border border-indigo-400/30 disabled:opacity-50"
                  >
                      {isSubmitting ? 'Processing...' : 'Commit Registration'} <ShieldCheck size={20} />
                  </motion.button>
              </div>
          </div>

          <PrintLayout data={formData} photoFile={photoFile} />

          <AnimatePresence>
            {welcomeSlip && (
                <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 print:hidden">
                    <motion.div 
                       initial={{ scale: 0.9, opacity: 0 }}
                       animate={{ scale: 1, opacity: 1 }}
                       exit={{ scale: 0.9, opacity: 0 }}
                       className="bg-white rounded-3xl p-8 max-w-sm w-full text-slate-900 shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600"></div>
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                <ShieldCheck className="text-green-600" size={32} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Registration Successful!</h3>
                                <p className="text-sm text-slate-500 mt-1">Save these credentials carefully</p>
                            </div>
                            <div className="w-full bg-slate-50 rounded-2xl p-6 border border-slate-200 text-left flex flex-col gap-3">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Name</p>
                                    <p className="text-base font-black text-slate-900 mt-0.5">{welcomeSlip.name}</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{welcomeSlip.type === 'Teacher' ? 'Employee ID' : 'Roll No.'}</p>
                                        <p className="text-lg font-black text-indigo-600 mt-0.5 tracking-wider">{welcomeSlip.type === 'Teacher' ? welcomeSlip.id : welcomeSlip.rollNo}</p>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Login PIN</p>
                                        <p className="text-lg font-black text-indigo-600 mt-0.5 tracking-[0.3em]">{welcomeSlip.pin}</p>
                                    </div>
                                </div>
                                {welcomeSlip.type === 'Student' && (
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Class</p>
                                            <p className="text-base font-black text-slate-900 mt-0.5">{welcomeSlip.className}</p>
                                        </div>
                                        {welcomeSlip.srNo && (
                                            <div className="flex-1">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">SR Number</p>
                                                <p className="text-base font-black text-slate-900 mt-0.5">{welcomeSlip.srNo}</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-3 w-full">
                                <button onClick={() => window.print()} className="flex-1 py-3 bg-slate-100 rounded-xl text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
                                    <Download size={14} /> Print Slip
                                </button>
                                <button onClick={() => setWelcomeSlip(null)} className="flex-1 py-3 bg-indigo-600 rounded-xl text-xs font-black uppercase tracking-widest text-white hover:bg-indigo-700 transition-all">
                                    Done
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
          </AnimatePresence>
      </div>
  );
};