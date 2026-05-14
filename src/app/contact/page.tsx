"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, MapPin, Phone, Send, MessageSquareText, ShieldCheck, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    address: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const { error } = await supabase.from("contact_messages").insert([
      {
        full_name: formData.full_name.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        message: formData.message.trim(),
      },
    ]);

    if (error) {
      console.error("Supabase error:", error);
      setStatus("error");
    } else {
      setStatus("success");
      setFormData({ full_name: "", phone: "", address: "", message: "" });
    }
  };

  return (
    <main className="relative min-h-[100svh] bg-[#f8fafc]">
      <Navbar />
      <div className="h-16 lg:h-24 bg-primary" />

      {/* Hero */}
      <section className="bg-primary pt-8 pb-12 lg:pt-12 lg:pb-20 px-4 relative overflow-hidden">
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
            We are always here to answer your questions, resolve your queries, and guide you through your journey with Sanskar Vidya Bhavan.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 -mt-8 lg:-mt-12 pb-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Left: Contact Info */}
          <div className="lg:col-span-5 flex flex-col gap-4 lg:gap-6">
            {[
              {
                icon: MapPin,
                label: "Visit Us",
                title: "Our Campus",
                content: "X7VJ+5PX, Plot No. 23, Krishna Colony, Shyaam Nagar, Jaswantpura Road, Bhinmal, Rajasthan 343029",
                link: null,
              },
              {
                icon: Phone,
                label: "Call Us",
                title: "Phone Support",
                content: "We are available from 8 AM to 2 PM, Monday to Saturday.",
                link: { href: "tel:+919784802941", text: "+91 97848 02941" },
              },
              {
                icon: Mail,
                label: "Email Us",
                title: "Online Queries",
                content: "Send us an email anytime and we will respond within 24 hours.",
                link: { href: "mailto:info@sanskarvidyabhavan.com", text: "info@sanskarvidyabhavan.com" },
              },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 lg:p-8 rounded-[2rem] border border-primary/5 shadow-xl hover:shadow-2xl transition-all group flex items-start gap-6">
                <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-accent transition-colors flex-shrink-0">
                  <item.icon size={24} />
                </div>
                <div>
                  <h3 className="text-accent font-black text-xs uppercase tracking-widest mb-1">{item.label}</h3>
                  <h4 className="text-xl font-black text-primary mb-2 leading-none">{item.title}</h4>
                  <p className="text-primary/60 text-xs lg:text-sm font-medium leading-relaxed mb-2">{item.content}</p>
                  {item.link && (
                    <a href={item.link.href} className="text-primary font-black text-xs lg:text-base hover:text-accent transition-colors break-all">
                      {item.link.text}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-7" id="send-message">
            <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-2xl border border-primary/5 relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

              {status === "success" ? (
                <div className="flex flex-col items-center justify-center gap-6 py-16">
                  <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  </div>
                  <div className="text-center">
                    <h2 className="text-2xl font-black text-primary uppercase tracking-tighter mb-2">Message Received!</h2>
                    <p className="text-primary/60 text-sm font-medium">
                      Humne aapka message receive kar liya hai. Jald hi contact karenge. 🙏
                    </p>
                  </div>
                  <button
                    onClick={() => setStatus("idle")}
                    className="bg-primary text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-accent transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <div className="relative z-10 mb-8">
                    <h2 className="text-2xl lg:text-4xl font-black text-primary uppercase tracking-tighter mb-2">
                      Send us a <span className="text-accent underline decoration-primary/20 underline-offset-8">Message</span>
                    </h2>
                    <p className="text-primary/60 font-medium text-xs lg:text-sm">
                      Fill out the form below and our administration team will get back to you promptly.
                    </p>
                  </div>

                  {status === "error" && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-bold">
                      Something went wrong. Please try again.
                    </div>
                  )}

                  <form className="relative z-10 flex flex-col gap-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-[10px] lg:text-xs font-black text-primary uppercase tracking-widest ml-1">Full Name</label>
                        <input
                          type="text"
                          name="full_name"
                          value={formData.full_name}
                          onChange={handleChange}
                          placeholder="Enter your name"
                          className="w-full bg-[#f8fafc] border border-primary/10 rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent font-medium transition-all"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] lg:text-xs font-black text-primary uppercase tracking-widest ml-1">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
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
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter your address"
                        className="w-full bg-[#f8fafc] border border-primary/10 rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent font-medium transition-all"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] lg:text-xs font-black text-primary uppercase tracking-widest ml-1">Your Message</label>
                      <textarea
                        rows={4}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        className="w-full bg-[#f8fafc] border border-primary/10 rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent font-medium transition-all resize-none"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full bg-primary text-white hover:bg-accent rounded-xl py-4 mt-2 font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl group disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps */}
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
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
