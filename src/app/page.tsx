"use client";

import React, { useRef, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, Users, Award, BookOpen, Phone, ImageIcon, Play, X } from "lucide-react";

// ==========================================
// WALL OF FAME DATA CONFIGURATION
// ==========================================
// To update students, simply change the names, scores, and image paths below.
// Ensure your images are saved in the 'public/students/' folder.
// Example image path: "/students/bhumika.jpg" (if file is public/students/bhumika.jpg)

const class10Achievers = [
  { name: "अरुण सुथार", score: "91.33%", image: "/students/10_1.jpg" },
  { name: "गिरिराज पचौरी", score: "87.67%", image: "/students/10_2.jpg" },
  { name: "शिवराज पचौरी", score: "84.33%", image: "/students/10_3.jpg" },
  { name: "रविन्द्र कुमार", score: "83.50%", image: "/students/10_4.jpg" },
  { name: "किरण कुमार", score: "81.17%", image: "/students/10_5.jpg" },
  { name: "भूमिका कुमारी", score: "68.17%", image: "/students/10_6.jpg" },
  { name: "इदरीश खान", score: "65.83%", image: "/students/10_7.jpg" },
  { name: "भवानी कंवर", score: "65.50%", image: "/students/10_8.jpg" },
  { name: "नीता चौधरी ", score: "63.17%", image: "/students/10_9.jpg" },
  { name: "असनूर कुरैशी", score: "63.00%", image: "/students/10_10.jpg" },
  { name: "शिल्पा कुमारी", score: "60.67%", image: "/students/10_11.jpg" },
];

const class8Achievers = [
  { name: "उर्वशी राजपुरोहित", score: "A Grade", image: "/students/8_1.jpg" },
  { name: "अंजली कुमारी", score: "A Grade", image: "/students/8_2.jpg" },
  { name: "भरत माली", score: "A Grade", image: "/students/8_3.jpg" },
  { name: "नकुल कुमार", score: "A Grade", image: "/students/8_4.jpg" },
  { name: "हिमांशु सुथार", score: "A Grade", image: "/students/8_5.jpg" },
  { name: "सरस्वती सुथार", score: "A Grade", image: "/students/8_6.jpg" },
  { name: "फेजल ख़ान", score: "A Grade", image: "/students/8_7.jpg" },
  { name: "प्रिती कंवर", score: "A Grade", image: "/students/8_8.jpg" },
  { name: "वरुण कुमार", score: "A Grade", image: "/students/8_9.jpg" },
  { name: "किंजल कंवर", score: "A Grade", image: "/students/8_10.jpg" },
  { name: "परशुराम राजपुरोहित", score: "A Grade", image: "/students/8_11.jpg" },
  { name: "अर्जुन राजपुरोहित", score: "A Grade", image: "/students/8_12.jpg" },
];

const class5Achievers = [
  { name: "यशराज पुरोहित", score: "A Grade", image: "/students/5_1.jpg" },
  { name: "राजकुमार सुथार", score: "A Grade", image: "/students/5_2.jpg" },
  { name: "परी सुथार", score: "A Grade", image: "/students/5_3.jpg" },
  { name: "खुशबू सेन", score: "A Grade", image: "/students/5_4.jpg" },
  { name: "वंश कुमार", score: "A Grade", image: "/students/5_5.jpg" },
];

// Helper to multiply the arrays for a completely safe, massive seamless infinite loop on ultra-wide screens.
// We MUST multiply by an EVEN number (e.g., 4x or 10x) so `translateX(-50%)` jumps exactly at the correct duplicate point.
const infiniteClass10 = [...class10Achievers, ...class10Achievers, ...class10Achievers, ...class10Achievers]; // 4x (44 items)
const infiniteClass8 = [...class8Achievers, ...class8Achievers, ...class8Achievers, ...class8Achievers]; // 4x (48 items)
const infiniteClass5 = [
  ...class5Achievers, ...class5Achievers, ...class5Achievers, ...class5Achievers, ...class5Achievers, 
  ...class5Achievers, ...class5Achievers, ...class5Achievers, ...class5Achievers, ...class5Achievers
]; // 10x (50 items)

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Force play attempt on mount to bypass strict mobile browser blocks
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(console.warn);
    }
  }, []);

  return (
    <main className="relative min-h-[100svh] bg-white overflow-hidden">
      <Navbar />

      {/* Spacer for Navbar */}
      <div className="h-16 lg:h-24" />

      {/* ... [Hero Section remains unchanged] ... */}
      <section className="relative min-h-[70vh] lg:min-h-[85vh] flex items-center justify-center overflow-hidden pt-20 lg:pt-0">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.jpg"
            alt="Sanskar Vidya Bhawan Campus"
            fill
            className="object-cover object-[75%_center] lg:object-top"
            priority
          />
          <div className="absolute inset-0 bg-primary/70 backdrop-blur-[2px]" />
        </div>

        {/* MOBILE ONLY: Absolute Top Welcome Line */}
        <div className="absolute top-8 left-0 right-0 z-20 flex lg:hidden items-center justify-center gap-2 text-accent px-4 w-full">
          <div className="h-[2px] w-4 bg-accent" />
          <span className="font-black uppercase tracking-wider text-[9px] whitespace-nowrap shadow-black drop-shadow-xl">Welcome to Sanskar Vidya Bhawan</span>
          <div className="h-[2px] w-4 bg-accent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center pt-0 pb-32 lg:pt-20 lg:pb-48">
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="hidden lg:flex items-center justify-center gap-3 text-accent mb-2 w-full">
              <div className="h-[2px] w-8 bg-accent" />
              <span className="font-black uppercase tracking-[.3em] text-sm whitespace-nowrap">Welcome to Sanskar Vidya Bhawan</span>
              <div className="h-[2px] w-8 bg-accent" />
            </div>

            <h1 className="text-4xl lg:text-7xl font-black text-white leading-tight max-w-4xl uppercase tracking-tighter">
              Start Your <span className="text-accent underline decoration-white/20 underline-offset-8">Beautiful</span> <br className="hidden lg:block" /> And Bright Future
            </h1>

            <p className="text-white/70 text-sm lg:text-xl max-w-2xl leading-relaxed font-medium px-4 lg:px-0">
              Sanskar Vidya Bhawan provides a world-class educational environment in Bhinmal, fostering academic excellence and holistic growth since 2023.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full sm:w-auto px-4 lg:px-0">
              <button className="w-full sm:w-auto bg-accent text-primary px-10 py-4 lg:py-5 rounded-full font-black text-[11px] lg:text-sm shadow-2xl hover:bg-white transition-all uppercase tracking-widest flex items-center justify-center gap-3">
                About More
                <ArrowRight size={18} />
              </button>
              <button className="w-full sm:w-auto border-2 border-white/20 text-white px-10 py-4 lg:py-5 rounded-full font-black text-[11px] lg:text-sm backdrop-blur-md hover:bg-white hover:text-primary transition-all uppercase tracking-widest">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>

        {/* Hero Bottom Decorative (Optional Wave or Gradient) */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-1" />
      </section>

      {/* Floating Feature Cards */}
      <section className="relative z-20 -mt-24 lg:-mt-32 pb-6 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          {/* DESKTOP GRID (Static & Numbered) */}
          <div className="hidden lg:grid grid-cols-4 gap-6">
            {[
              { id: "01", title: "Scholarship Facility", desc: "We provide merit-based scholarships to help bright students achieve their dreams.", icon: Award },
              { id: "02", title: "Skilled Lecturers", desc: "Our faculty consists of experienced educators dedicated to student success.", icon: Users },
              { id: "03", title: "Book Library & Store", desc: "A well-equipped resource center with thousands of books and learning materials.", icon: BookOpen },
              { id: "04", title: "Affordable Price", desc: "Quality education accessible to everyone with a flexible and transparent fee structure.", icon: BookOpen },
            ].map((feature, i) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white p-10 rounded-3xl shadow-premium border border-primary/5 flex flex-col gap-4 group hover:bg-primary transition-all duration-500 transform hover:-translate-y-4 relative overflow-hidden"
              >
                {/* Number Background */}
                <span className="absolute -top-4 -right-2 text-8xl font-black text-primary/5 group-hover:text-white/5 transition-colors">
                  {feature.id}
                </span>

                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center group-hover:bg-accent transition-colors relative z-10">
                  <feature.icon className="text-primary w-8 h-8" />
                </div>

                <div className="flex flex-col gap-2 relative z-10">
                  <h3 className="font-heading font-black text-xl text-primary group-hover:text-white transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-primary/60 group-hover:text-white/70 transition-colors leading-relaxed">
                    {feature.desc}
                  </p>
                </div>

                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-accent font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                    Read Details <ArrowRight size={14} />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* MOBILE AUTOSCROLL MARQUEE (Small, fast, unnumbered) */}
          <div className="lg:hidden w-[100vw] relative -mx-4 px-0 overflow-hidden py-2">
            <div className="animate-custom-marquee gap-3 pr-3" style={{ animationDuration: '10s' }}>
              {[
                { title: "Scholarships", desc: "Merit-based support", icon: Award },
                { title: "Top Lecturers", desc: "Expert educators", icon: Users },
                { title: "Book Library", desc: "Thousands of books", icon: BookOpen },
                { title: "Affordable Price", desc: "Flexible structures", icon: BookOpen },
                { title: "Scholarships", desc: "Merit-based support", icon: Award },
                { title: "Top Lecturers", desc: "Expert educators", icon: Users },
                { title: "Book Library", desc: "Thousands of books", icon: BookOpen },
                { title: "Affordable Price", desc: "Flexible structures", icon: BookOpen },
              ].map((feature, i) => (
                <div key={i} className="min-w-[200px] bg-white p-3 rounded-[18px] shadow-sm border border-primary/5 flex items-center gap-3">
                  <div className="w-10 h-10 flex-shrink-0 bg-accent/10 rounded-xl flex items-center justify-center text-primary">
                    <feature.icon size={18} />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-heading font-black text-[12px] text-primary">{feature.title}</h3>
                    <p className="text-[9px] text-primary/60 leading-tight line-clamp-1">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Campus Video Tour Section */}
      <section className="pt-6 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center flex flex-col items-center gap-8">
          <div className="flex flex-col gap-4 items-center">
            <div className="flex items-center gap-3 text-accent">
              <div className="h-[2px] w-6 bg-accent" />
              <span className="font-black uppercase tracking-[.4em] text-[10px] lg:text-xs">Take A Tour</span>
              <div className="h-[2px] w-6 bg-accent" />
            </div>
            <h2 className="text-3xl lg:text-6xl font-black text-primary leading-tight uppercase tracking-tighter">
              Welcome to our <span className="text-accent">Campus</span>
            </h2>
            <p className="text-primary/70 max-w-2xl text-sm lg:text-lg leading-relaxed font-bold">
              Experience the world-class infrastructure and vibrant student life at Sanskar Vidya Bhawan.
              Watch our exclusive campus tour to see where bright futures begin.
            </p>
          </div>

          <button
            onClick={() => setShowVideoModal(true)}
            className="bg-red-600 text-white px-10 py-5 rounded-full font-black text-sm lg:text-lg shadow-premium hover:bg-red-700 transition-all uppercase tracking-widest flex items-center gap-4 group"
          >
            <Play className="group-hover:scale-125 transition-transform" fill="currentColor" />
            360° Campus Tour
          </button>
        </div>
      </section>

      {/* Wall of Fame / Academic Excellence */}
      <section className="py-8 lg:py-10 bg-soft-grey relative overflow-hidden shadow-inner flex flex-col justify-center min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4 text-center mb-6 relative z-10 flex flex-col items-center gap-2">
          <div className="flex items-center gap-3 text-primary">
            <div className="h-[2px] w-6 bg-primary" />
            <span className="font-black uppercase tracking-[.4em] text-[10px] lg:text-xs">Academic Excellence</span>
            <div className="h-[2px] w-6 bg-primary" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-primary uppercase tracking-tighter">
            Wall Of Achievers
          </h2>
        </div>

        {/* 10th Class Marquee - Scrolls Left */}
        <div className="w-full overflow-hidden py-1 mb-3">
          <div className="max-w-[95%] lg:max-w-7xl mx-auto mb-2 flex justify-center">
            <div className="bg-primary text-white shadow-md px-4 py-1.5 rounded-full flex items-center gap-2">
              <Award size={14} className="text-accent" />
              <span className="font-black uppercase tracking-wider text-[10px] lg:text-[11px]">RBSE 10th - Session 2025-26</span>
            </div>
          </div>

          <div className="animate-custom-marquee gap-3 px-2 hover:[animation-play-state:paused]" style={{ animationDuration: '55s' }}>
            {infiniteClass10.map((student, i) => (
              <div key={`10th-${i}`} className="bg-white p-2 pr-4 rounded-full shadow border-t-2 border-primary border flex items-center gap-3 min-w-[200px] group hover:-translate-y-1 transition-transform cursor-pointer">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-primary/5 border border-accent relative shrink-0">
                  <Image src={student.image} alt={student.name} fill className="object-cover group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex flex-col items-start w-full">
                  <span className="font-black text-primary text-xs leading-tight uppercase line-clamp-1 w-full truncate">{student.name}</span>
                  <span className="text-accent font-black text-[10px] bg-accent/10 px-2 py-[2px] rounded mt-0.5 shadow-sm">{student.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 8th Class Marquee - Scrolls Right */}
        <div className="w-full overflow-hidden py-1 mb-3">
          <div className="max-w-[95%] lg:max-w-7xl mx-auto mb-2 flex justify-center">
            <div className="bg-secondary text-white shadow-md px-4 py-1.5 rounded-full flex items-center gap-2">
              <Star size={14} className="text-accent" />
              <span className="font-black uppercase tracking-wider text-[10px] lg:text-[11px]">Class 8th - A Grade Students</span>
            </div>
          </div>

          <div className="animate-custom-marquee-reverse gap-3 px-2 hover:[animation-play-state:paused]" style={{ animationDuration: '60s' }}>
            {infiniteClass8.map((student, i) => (
              <div key={`8th-${i}`} className="bg-white p-2 pl-4 rounded-full shadow border-t-2 border-secondary flex items-center gap-3 min-w-[200px] group hover:-translate-y-1 transition-transform cursor-pointer text-left">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-secondary/10 border border-secondary relative shrink-0">
                  <Image src={student.image} alt={student.name} fill className="object-cover group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex flex-col items-start w-full">
                  <span className="font-black text-primary text-xs leading-tight uppercase line-clamp-1 w-full truncate">{student.name}</span>
                  <span className="text-secondary font-black text-[10px] bg-secondary/10 px-2 py-[2px] rounded mt-0.5 shadow-sm">{student.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5th Class Marquee - Scrolls Left */}
        <div className="w-full overflow-hidden py-1">
          <div className="max-w-[95%] lg:max-w-7xl mx-auto mb-2 flex justify-center">
            <div className="bg-accent text-primary shadow-md px-4 py-1.5 rounded-full flex items-center gap-2">
              <Award size={14} />
              <span className="font-black uppercase tracking-wider text-[10px] lg:text-[11px]">Class 5th - A Grade Students</span>
            </div>
          </div>

          <div className="animate-custom-marquee gap-3 px-2 hover:[animation-play-state:paused]" style={{ animationDuration: '63s' }}>
            {infiniteClass5.map((student, i) => (
              <div key={`5th-${i}`} className="bg-white p-2 pr-4 rounded-full shadow border-t-2 border-primary flex items-center gap-3 min-w-[200px] group hover:-translate-y-1 transition-transform cursor-pointer">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-accent/10 border border-primary relative shrink-0">
                  <Image src={student.image} alt={student.name} fill className="object-cover group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex flex-col items-start w-full">
                  <span className="font-black text-primary text-xs leading-tight uppercase line-clamp-1 w-full truncate">{student.name}</span>
                  <span className="text-primary font-black text-[10px] bg-primary/10 px-2 py-[2px] rounded mt-0.5 shadow-sm">{student.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admissions CTA ADS Banner with Video Background */}
      <section className="border-t-[10px] border-accent py-16 lg:py-24 relative overflow-hidden text-center flex items-center justify-center">

        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full z-0 bg-primary">
          <div className="absolute inset-0 bg-primary/80 mix-blend-multiply z-10" />
          {/* Standard HTML5 tag with JS Force Play */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover opacity-50"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/campus-video.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="max-w-5xl mx-auto px-4 relative z-20 flex flex-col items-center gap-6">

          <div
            className="inline-block text-white font-black uppercase tracking-widest text-2xl lg:text-5xl drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] mb-2"
          >
            Admissions Open <span className="text-accent underline decoration-white/40 underline-offset-8 block mt-3 lg:inline lg:mt-0 lg:ml-4">2026-27</span>
          </div>

          <h2 className="text-4xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-tight drop-shadow-2xl">
            Ready to shape a <br className="hidden lg:block" /> <span className="text-accent font-black underline decoration-white/20 underline-offset-8 drop-shadow-sm">bright future?</span>
          </h2>

          <Link
            href="/admissions"
            className="bg-white text-primary px-10 py-4 rounded-full font-black text-sm lg:text-lg shadow-2xl hover:bg-accent transition-all uppercase tracking-widest mt-4 group flex items-center gap-4"
          >
            Apply Online Now
            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </Link>

        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-6 lg:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">

          {/* Mobile Auto-Scrolling Marquee (Ultra Compact) */}
          <div className="lg:hidden flex overflow-hidden w-[100vw] relative -mx-4 px-0 mask-edges py-2">
            <div className="animate-custom-marquee gap-4 px-4 hover:[animation-play-state:paused]">
              {[
                { label: "Total Courses", value: "500+", icon: BookOpen },
                { label: "Our Students", value: "1900+", icon: Users },
                { label: "Skilled Lecturers", value: "750+", icon: Award },
                { label: "Win Awards", value: "30+", icon: Star },
                { label: "Total Courses", value: "500+", icon: BookOpen },
                { label: "Our Students", value: "1900+", icon: Users },
                { label: "Skilled Lecturers", value: "750+", icon: Award },
                { label: "Win Awards", value: "30+", icon: Star },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-3 bg-white border border-primary/10 shadow-sm px-4 py-3 rounded-[20px] w-48 shrink-0">
                  <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary shrink-0">
                    <stat.icon size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-black text-primary leading-none tracking-tighter">{stat.value}</span>
                    <span className="text-[8px] font-bold uppercase tracking-widest text-primary/50 mt-1">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Classic Grid */}
          <div className="hidden lg:grid grid-cols-4 gap-12 pb-0">
            {[
              { label: "Total Courses", value: "500+", icon: BookOpen },
              { label: "Our Students", value: "1900+", icon: Users },
              { label: "Skilled Lecturers", value: "750+", icon: Award },
              { label: "Win Awards", value: "30+", icon: Star },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-4 text-primary text-center group">
                <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center text-primary mb-2 group-hover:scale-110 transition-transform">
                  <stat.icon size={32} />
                </div>
                <div className="flex flex-col">
                  <span className="text-5xl font-black tracking-tighter">{stat.value}</span>
                  <span className="text-xs font-bold uppercase tracking-[.3em] text-primary/50">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* YouTube Campus Tour Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
          <button
            onClick={() => setShowVideoModal(false)}
            className="absolute top-6 right-6 lg:top-10 lg:right-10 text-white/50 hover:text-white transition-colors p-2 bg-white/10 rounded-full"
          >
            <X size={32} />
          </button>

          <div className="w-full max-w-6xl aspect-video rounded-3xl lg:rounded-[40px] overflow-hidden shadow-premium border-2 border-white/10 bg-black relative">
            <div className="absolute inset-0 flex items-center justify-center -z-10">
              <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
            {/* Note: Change the src link below to your actual YouTube link embed! */}
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="School Campus Tour"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="relative z-10"
            />
          </div>
        </div>
      )}
    </main>
  );
}


