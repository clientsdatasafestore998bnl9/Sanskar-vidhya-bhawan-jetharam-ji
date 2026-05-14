"use client";

import React, { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Clock, CalendarDays, CheckCircle2, FileCheck, UserPlus, FileText, Send, Paperclip, Loader2, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AdmissionsPage() {
  const [medium, setMedium] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [formData, setFormData] = useState({
    student_name: "",
    father_name: "",
    mobile: "",
    dob: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'mobile') {
      // Only allow digits, max 10
      const digits = value.replace(/\D/g, '').slice(0, 10);
      setFormData((prev) => ({ ...prev, mobile: digits }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleMediumChange = (val: string) => {
    setMedium(val);
    setClassLevel("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!medium) { setErrorMsg("Please select a medium (Hindi / English)."); return; }
    if (!classLevel) { setErrorMsg("Please select a class."); return; }

    setStatus("loading");

    const { error } = await supabase.from("admissions_inquiries").insert([
      {
        student_name: formData.student_name.trim(),
        father_name: formData.father_name.trim(),
        mobile: formData.mobile.trim(),
        dob: formData.dob,
        medium: medium,
        class_level: classLevel,
        status: "pending",
      },
    ]);

    if (error) {
      console.error("Supabase error:", error);
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    } else {
      setStatus("success");
      setFormData({ student_name: "", father_name: "", mobile: "", dob: "" });
      setMedium("");
      setClassLevel("");
    }
  };

  return (
    <main className="relative min-h-[100svh] bg-[#f8fafc]">
      <Navbar />

      {/* Spacer for Navbar */}
      <div className="h-16 lg:h-24 bg-primary" />

      {/* 1. Hero Section */}
      <section className="relative min-h-[40vh] lg:min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.jpg"
            alt="Admissions open at Sanskar Vidya Bhavan"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-primary/70 backdrop-blur-[1px]" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <div className="px-4 py-1.5 bg-accent/20 border border-accent/50 rounded-full text-accent text-[10px] lg:text-xs font-black uppercase tracking-widest mb-4 md:mb-6 backdrop-blur-md">
            Session 2026 - 2027
          </div>
          <h1 className="text-4xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-tight drop-shadow-2xl">
            Join The <span className="text-accent underline decoration-white/20 underline-offset-8">Sanskar</span> Family
          </h1>
          <p className="mt-4 lg:mt-6 text-white/80 font-medium max-w-2xl text-xs lg:text-lg leading-relaxed">
            Take the first step towards a bright, disciplined, and excellent future for your child. Admissions are now open.
          </p>
        </div>
      </section>

      {/* Quick Info Bar */}
      <div className="bg-primary border-t border-white/10 shadow-2xl relative z-20">
        <div className="max-w-7xl mx-auto px-4 py-4 lg:py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8 divide-x divide-white/10">
            <div className="flex flex-col items-center text-center lg:flex-row lg:text-left gap-2 lg:gap-4 justify-center px-2">
              <Clock className="text-accent w-5 h-5 lg:w-8 lg:h-8" />
              <div>
                <p className="text-white/50 text-[9px] lg:text-xs font-bold uppercase tracking-wider mb-0.5">Office Hours</p>
                <p className="text-white font-black text-xs lg:text-sm">08:00 AM - 02:00 PM</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center lg:flex-row lg:text-left gap-2 lg:gap-4 justify-center px-2">
              <CalendarDays className="text-accent w-5 h-5 lg:w-8 lg:h-8" />
              <div>
                <p className="text-white/50 text-[9px] lg:text-xs font-bold uppercase tracking-wider mb-0.5">Admission Period</p>
                <p className="text-white font-black text-xs lg:text-sm">March 2026 - July 2026</p>
              </div>
            </div>
            <div className="col-span-2 md:col-span-2 flex items-center justify-center pl-4 lg:pl-8">
               <h2 className="text-lg lg:text-2xl font-black text-white italic tracking-tight text-center md:text-left leading-tight">
                 &quot;Your Child&apos;s Success <span className="text-accent">Starts Here.</span>&quot;
               </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <section className="py-12 lg:py-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Process & Documents */}
          <div className="lg:col-span-7 flex flex-col gap-12 lg:gap-16">
            
            {/* Step by Step Process */}
            <div>
              <div className="mb-8">
                <h3 className="text-accent font-black text-xs uppercase tracking-widest mb-1">Step-by-Step Guide</h3>
                <h2 className="text-3xl lg:text-4xl font-black text-primary uppercase tracking-tighter">
                  Admissions Process
                </h2>
              </div>

              <div className="flex flex-col gap-4">
                {[
                  { num: "01", title: "Submit Form", desc: "Collect the admission form from the school office or fill the inquiry online." },
                  { num: "02", title: "Document Review", desc: "Submit the required documents for verification by our administrative team." },
                  { num: "03", title: "Interaction", desc: "A brief interaction session with the student and parents for orientation." },
                  { num: "04", title: "Registration", desc: "Complete the fee payment to finalize the registration and secure the seat." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-4 p-4 lg:p-6 bg-white rounded-2xl border border-primary/5 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="text-accent font-black text-3xl lg:text-5xl opacity-30 group-hover:opacity-100 transition-opacity">
                      {step.num}
                    </div>
                    <div className="flex-1 pt-1">
                      <h4 className="text-lg lg:text-xl font-black text-primary uppercase tracking-wide leading-none mb-2">
                        {step.title}
                      </h4>
                      <p className="text-primary/70 text-xs lg:text-sm font-medium leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Required Documentation */}
            <div className="bg-primary text-white rounded-3xl p-6 lg:p-10 relative overflow-hidden shadow-2xl">
              <FileCheck className="absolute -right-10 -bottom-10 w-64 h-64 text-white/5 rotate-[-15deg]" />
              <div className="relative z-10">
                <h3 className="text-accent font-black text-xs uppercase tracking-widest mb-1">Keep Your Papers Ready</h3>
                <h2 className="text-2xl lg:text-3xl font-black uppercase tracking-tighter mb-4">
                  Required Documentation
                </h2>
                <p className="text-white/70 text-xs lg:text-sm mb-8 max-w-md font-medium leading-relaxed">
                  To make the admission process smooth, please ensure you have the following documents scanned or ready in physical copies.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                  {[
                    "Birth Certificate (Original)",
                    "Previous School Report Card",
                    "Transfer Certificate (TC)",
                    "Passport Size Photos (4)",
                    "Aadhar Card of Student",
                    "Address Proof of Parents",
                    "Jan Aadhar Card"
                  ].map((doc, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm lg:text-base font-bold bg-white/5 p-3 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                      <Paperclip className="w-5 h-5 text-accent shrink-0" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Online Inquiry Form */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="bg-white rounded-[2rem] p-6 text-center border border-primary/5 shadow-2xl relative overflow-hidden">
              
              {/* SUCCESS STATE */}
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center gap-6 py-12 px-4">
                  <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-black text-primary uppercase tracking-tighter">Inquiry Submitted!</h2>
                    <p className="text-primary/60 text-sm font-medium">
                      Humne aapki inquiry receive kar li hai. Hamare counselor aapko jald hi contact karenge. 🎉
                    </p>
                  </div>
                  <button
                    onClick={() => setStatus("idle")}
                    className="bg-primary text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-accent transition-all"
                  >
                    New Inquiry Submit Karo
                  </button>
                </div>
              ) : (
                <>
                  {/* Form Header */}
                  <div className="text-center mb-8 relative z-10">
                    <div className="inline-flex w-16 h-16 bg-accent/20 rounded-full items-center justify-center mb-4 text-accent">
                      <UserPlus size={28} className="ml-1" />
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-black text-primary uppercase tracking-tighter">
                      Apply Now <span className="text-accent">Online</span>
                    </h2>
                    <p className="text-primary/60 text-xs lg:text-sm font-medium mt-2">
                      Submit your details below and our admission counselor will contact you shortly.
                    </p>
                  </div>

                  {/* Error Message */}
                  {errorMsg && (
                    <div className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-xl p-3 mb-4 text-left">
                      <AlertCircle className="text-red-500 shrink-0 w-4 h-4" />
                      <p className="text-red-600 text-xs font-bold">{errorMsg}</p>
                    </div>
                  )}

                  {/* The Form */}
                  <form className="relative z-10 flex flex-col gap-4 text-left" onSubmit={handleSubmit}>
                    <div className="space-y-1">
                      <label className="text-[10px] lg:text-xs font-black text-primary uppercase tracking-widest ml-1">Student&apos;s Full Name</label>
                      <input
                        type="text"
                        name="student_name"
                        value={formData.student_name}
                        onChange={handleChange}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full bg-[#f8fafc] border border-primary/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent font-medium transition-all"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] lg:text-xs font-black text-primary uppercase tracking-widest ml-1">Father Name</label>
                      <input
                        type="text"
                        name="father_name"
                        value={formData.father_name}
                        onChange={handleChange}
                        placeholder="e.g. Ramesh Sharma"
                        className="w-full bg-[#f8fafc] border border-primary/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent font-medium transition-all"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] lg:text-xs font-black text-primary uppercase tracking-widest ml-1">Mobile Number</label>
                        <input
                          type="tel"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleChange}
                          placeholder="10-digit Mobile Number"
                          pattern="[6-9][0-9]{9}"
                          maxLength={10}
                          className="w-full bg-[#f8fafc] border border-primary/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent font-medium transition-all"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] lg:text-xs font-black text-primary uppercase tracking-widest ml-1">Date of Birth</label>
                        <input
                          type="date"
                          name="dob"
                          value={formData.dob}
                          onChange={handleChange}
                          className="w-full bg-[#f8fafc] border border-primary/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent font-medium transition-all text-primary/70"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] lg:text-xs font-black text-primary uppercase tracking-widest ml-1">Select Medium</label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => handleMediumChange("hindi")}
                            className={`py-[10px] rounded-xl border text-[10px] lg:text-xs font-black uppercase tracking-widest transition-all ${medium === 'hindi' ? 'bg-accent text-primary border-accent shadow-md' : 'bg-[#f8fafc] border-primary/10 text-primary/40 hover:bg-primary/5'}`}
                          >
                            Hindi
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMediumChange("english")}
                            className={`py-[10px] rounded-xl border text-[10px] lg:text-xs font-black uppercase tracking-widest transition-all ${medium === 'english' ? 'bg-accent text-primary border-accent shadow-md' : 'bg-[#f8fafc] border-primary/10 text-primary/40 hover:bg-primary/5'}`}
                          >
                            English
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1 relative">
                        <label className="text-[10px] lg:text-xs font-black text-primary uppercase tracking-widest ml-1">Applying For Class</label>

                        {medium === "" && (
                          <select className="w-full bg-[#f8fafc] border border-primary/10 rounded-xl px-4 py-3 text-sm font-medium opacity-50 text-primary/40">
                            <option>Select Medium First</option>
                          </select>
                        )}

                        {medium === "hindi" && (
                          <select
                            className="w-full bg-[#f8fafc] border border-primary/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent font-medium transition-all text-primary/70"
                            value={classLevel}
                            onChange={(e) => setClassLevel(e.target.value)}
                            required
                          >
                            <option value="">Select Class</option>
                            {["1","2","3","4","5","6","7","8","9","10"].map(c => (
                              <option key={c} value={c}>Class {c}th</option>
                            ))}
                          </select>
                        )}

                        {medium === "english" && (
                          <select
                            className="w-full bg-[#f8fafc] border border-primary/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent font-medium transition-all text-primary/70"
                            value={classLevel}
                            onChange={(e) => setClassLevel(e.target.value)}
                            required
                          >
                            <option value="">Select Class</option>
                            <option value="nursery">Nursery</option>
                            <option value="lkg">LKG</option>
                            <option value="ukg">UKG</option>
                            {["1","2","3","4","5","6","7","8"].map(c => (
                              <option key={c} value={c}>Class {c}th</option>
                            ))}
                          </select>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full bg-primary text-white hover:bg-accent rounded-xl py-4 mt-2 font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl hover:shadow-accent/30 group disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Inquiry
                          <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>

                  <p className="text-[10px] text-primary/40 text-center font-medium mt-6">
                    By submitting this form, you agree to our privacy policy and consent to being contacted by our academy.
                  </p>
                </>
              )}
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
