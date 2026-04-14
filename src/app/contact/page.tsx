"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, MapPin, Phone, Send, MessageSquareText, ShieldCheck } from "lucide-react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate network delay
    setTimeout(() => {
      setStatus("sent");
      // Reset after 3 seconds
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <main className="relative min-h-[100svh] bg-[#f8fafc]">
      <Navbar />

      {/* Spacer for Navbar */}
      <div className="h-16 lg:h-24 bg-primary" />

      {/* 1. Hero Section */}
      <section className="bg-primary pt-8 pb-12 lg:pt-12 lg:pb-20 px-4 relative overflow-hidden">
        {/* Abstract shapes for premium feel */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center flex flex-col items-center">
          <div className="inline-flex w-16 h-16 bg-accent/20 rounded-full items-center justify-center mb-4 lg:mb-6 text-accent border border-accent/30">
            <MessageSquareText size={32} />
          </div>
          <h1 className="text-4xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-4">
            Get In <span className="text-accent underline decoration-white/20 underline-offset-8">Touch</span>
          </h1>
          <p className="text-white/60 font-medium text-xs lg:text-base max-w-2xl mt-4 leading-relaxed">
            We are always here to answer your questions, resolve your queries, and guide you through your journey with Sanskar Vidya Bhawan.
          </p>
        </div>
      </section>

      {/* 2. Contact Details & Form Section */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 -mt-8 lg:-mt-12 pb-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
           
           {/* Left Column: Contact Methods Grid */}
           <div className="lg:col-span-5 flex flex-col gap-4 lg:gap-6">
              
              <div className="bg-white p-6 lg:p-8 rounded-[2rem] border border-primary/5 shadow-xl hover:shadow-2xl transition-all group flex items-start gap-6">
                 <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-accent transition-colors flex-shrink-0">
                    <MapPin size={24} />
                 </div>
                 <div>
                    <h3 className="text-accent font-black text-xs uppercase tracking-widest mb-1">Visit Us</h3>
                    <h4 className="text-xl font-black text-primary mb-2 leading-none">Our Campus</h4>
                    <p className="text-primary/60 text-xs lg:text-sm font-medium leading-relaxed">
                      X7VJ+5PX, Shyaam Nagar, Jaswantpura Road, <br/>Bhinmal, Rajasthan 343029
                    </p>
                 </div>
              </div>

              <div className="bg-white p-6 lg:p-8 rounded-[2rem] border border-primary/5 shadow-xl hover:shadow-2xl transition-all group flex items-start gap-6">
                 <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-accent transition-colors flex-shrink-0">
                    <Phone size={24} />
                 </div>
                 <div>
                    <h3 className="text-accent font-black text-xs uppercase tracking-widest mb-1">Call Us</h3>
                    <h4 className="text-xl font-black text-primary mb-2 leading-none">Phone Support</h4>
                    <p className="text-primary/60 text-xs lg:text-sm font-medium leading-relaxed mb-2">
                       We are available from 8 AM to 2 PM, Monday to Saturday.
                    </p>
                    <a href="tel:+919784802941" className="text-primary font-black text-lg hover:text-accent transition-colors">
                      +91 97848 02941
                    </a>
                 </div>
              </div>

              <div className="bg-white p-6 lg:p-8 rounded-[2rem] border border-primary/5 shadow-xl hover:shadow-2xl transition-all group flex items-start gap-6">
                 <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-accent transition-colors flex-shrink-0">
                    <Mail size={24} />
                 </div>
                 <div>
                    <h3 className="text-accent font-black text-xs uppercase tracking-widest mb-1">Email Us</h3>
                    <h4 className="text-xl font-black text-primary mb-2 leading-none">Online Queries</h4>
                    <p className="text-primary/60 text-xs lg:text-sm font-medium leading-relaxed mb-2">
                       Send us an email anytime and we will respond within 24 hours.
                    </p>
                    <a href="mailto:info@sanskarvidyabhawan.com" className="text-primary font-black text-xs lg:text-base hover:text-accent transition-colors break-all">
                      info@sanskarvidyabhawan.com
                    </a>
                 </div>
              </div>

           </div>

           {/* Right Column: Contact Form */}
           <div className="lg:col-span-7">
              <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-2xl border border-primary/5 relative overflow-hidden">
                 {/* Decorative */}
                 <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
                 
                 <div className="relative z-10 mb-8">
                   <h2 className="text-2xl lg:text-4xl font-black text-primary uppercase tracking-tighter mb-2">
                     Send us a <span className="text-accent underline decoration-primary/20 underline-offset-8">Message</span>
                   </h2>
                   <p className="text-primary/60 font-medium text-xs lg:text-sm">
                     Fill out the form below and our administration team will get back to you promptly.
                   </p>
                 </div>

                 <form className="relative z-10 flex flex-col gap-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                       <div className="space-y-1.5">
                         <label className="text-[10px] lg:text-xs font-black text-primary uppercase tracking-widest ml-1">Full Name</label>
                         <input 
                           type="text" 
                           placeholder="Enter your name"
                           className="w-full bg-[#f8fafc] border border-primary/10 rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent font-medium transition-all"
                           required
                         />
                       </div>
                       <div className="space-y-1.5">
                         <label className="text-[10px] lg:text-xs font-black text-primary uppercase tracking-widest ml-1">Phone Number</label>
                         <input 
                           type="tel" 
                           placeholder="+91"
                           className="w-full bg-[#f8fafc] border border-primary/10 rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent font-medium transition-all"
                           required
                         />
                       </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] lg:text-xs font-black text-primary uppercase tracking-widest ml-1">Address</label>
                      <input 
                        type="text" 
                        placeholder="Enter your address"
                        className="w-full bg-[#f8fafc] border border-primary/10 rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent font-medium transition-all"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] lg:text-xs font-black text-primary uppercase tracking-widest ml-1">Your Message</label>
                      <textarea 
                        rows={4}
                        placeholder="How can we help you?"
                        className="w-full bg-[#f8fafc] border border-primary/10 rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent font-medium transition-all resize-none"
                        required
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      disabled={status !== "idle"}
                      className={`w-full text-white rounded-xl py-4 mt-2 font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                        status === "sent" 
                          ? "bg-green-500 hover:bg-green-600" 
                          : "bg-primary hover:bg-accent group"
                      }`}
                      style={{ backgroundColor: status === "sent" ? "#22c55e" : "" }}
                    >
                      {status === "idle" && (
                        <>
                          Send Message
                          <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                      {status === "sending" && (
                        <span className="flex items-center gap-2">
                           <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                           Sending...
                        </span>
                      )}
                      {status === "sent" && (
                        <span className="flex items-center gap-2">
                           Message Sent Successfully <ShieldCheck size={18} />
                        </span>
                      )}
                    </button>
                 </form>

              </div>
           </div>

        </div>
      </section>

      {/* 3. Google Maps Integration */}
      <section className="bg-white border-t border-primary/5 p-4 lg:p-8">
         <div className="max-w-7xl mx-auto flex flex-col items-center">
            <h2 className="text-xl lg:text-3xl font-black text-primary uppercase tracking-tighter mb-8 text-center">
              Find Us On <span className="text-accent underline decoration-primary/20 underline-offset-8">Google Maps</span>
            </h2>
            <div className="w-full h-[400px] lg:h-[600px] rounded-[2rem] overflow-hidden shadow-2xl border border-primary/5 bg-primary/5">
              <iframe 
                src="https://maps.google.com/maps?q=Sanskar%20Vidya%20bhavan%20bhinmal&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"
              ></iframe>
            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}
