import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, Languages, ShieldCheck, Microscope, Users, MonitorPlay, FileText, CheckCircle2, ArrowRight } from "lucide-react";

export default function AcademicsPage() {
  return (
    <main className="relative min-h-[100svh] bg-[#f8fafc] overflow-hidden">
      <Navbar />

      {/* Spacer for Navbar */}
      <div className="h-16 lg:h-24 bg-primary" />

      {/* 1. Hero Section */}
      <section className="relative min-h-[40vh] lg:min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero2.jpg"
            alt="Students studying in classroom"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-primary/40" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <div className="flex items-center gap-3 text-accent mb-4">
            <div className="h-[2px] w-6 lg:w-10 bg-accent" />
            <span className="font-black uppercase tracking-[.2em] text-[10px] lg:text-sm">Sanskar Vidya Bhavan</span>
            <div className="h-[2px] w-6 lg:w-10 bg-accent" />
          </div>
          <h1 className="text-4xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-tight drop-shadow-xl">
            Academic <span className="text-accent underline decoration-white/20 underline-offset-8">Excellence</span>
          </h1>
          <p className="mt-4 text-white/80 font-medium max-w-2xl text-sm lg:text-lg leading-relaxed">
            Building a strong foundation for the future through modern teaching methodologies, cultural values, and rigorous academic standards.
          </p>
        </div>
      </section>

      {/* 2. Curriculum & Affiliation */}
      <section className="py-12 lg:py-20 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-black text-primary uppercase tracking-tighter">
            Our Curriculum &<br className="lg:hidden" /> Affiliation
          </h2>
          <div className="w-20 h-1.5 bg-accent mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-3 gap-2 lg:gap-8">
          {/* Affiliation Card */}
          <div className="bg-white rounded-2xl p-3 lg:p-8 shadow-premium border-t-4 border-primary flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300">
            <div className="w-8 h-8 lg:w-16 lg:h-16 bg-primary/5 rounded-xl lg:rounded-2xl flex items-center justify-center text-primary mb-2 lg:mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
              <ShieldCheck className="w-5 h-5 lg:w-8 lg:h-8" />
            </div>
            <h3 className="text-[9px] lg:text-xl font-black text-primary mb-1 lg:mb-3 leading-tight">RBSE Affiliated</h3>
            <p className="hidden lg:block text-primary/70 text-sm leading-relaxed font-medium">
              We highly conform to the strict academic guidelines and modern curriculum prescribed by the Rajasthan Board of Secondary Education.
            </p>
          </div>

          {/* Hindi Medium */}
          <div className="bg-white rounded-2xl p-3 lg:p-8 shadow-premium border-t-4 border-accent flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300">
            <div className="w-8 h-8 lg:w-16 lg:h-16 bg-accent/10 rounded-xl lg:rounded-2xl flex items-center justify-center text-accent mb-2 lg:mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
              <Languages className="w-5 h-5 lg:w-8 lg:h-8" />
            </div>
            <h3 className="text-[9px] lg:text-xl font-black text-primary mb-1 lg:mb-3 leading-tight">Hindi Medium</h3>
            <p className="hidden lg:block text-primary/70 text-sm leading-relaxed font-medium">
              Comprehensive and deeply-rooted education delivered in the vernacular language to ensure concepts are grasped thoroughly.
            </p>
          </div>

          {/* English Medium */}
          <div className="bg-white rounded-2xl p-3 lg:p-8 shadow-premium border-t-4 border-secondary flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300">
            <div className="w-8 h-8 lg:w-16 lg:h-16 bg-secondary/10 rounded-xl lg:rounded-2xl flex items-center justify-center text-secondary mb-2 lg:mb-6 group-hover:bg-secondary group-hover:text-white transition-colors">
              <BookOpen className="w-5 h-5 lg:w-8 lg:h-8" />
            </div>
            <h3 className="text-[9px] lg:text-xl font-black text-primary mb-1 lg:mb-3 leading-tight">English Medium</h3>
            <p className="hidden lg:block text-primary/70 text-sm leading-relaxed font-medium">
              Global standard education focusing on high fluency and competitive professional readiness in the English language.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Academic Stages */}
      <section className="py-12 lg:py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-8 lg:mb-16">
            <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter">
              Academic <span className="text-accent underline decoration-white/20 underline-offset-8">Stages</span>
            </h2>
            <p className="mt-4 text-white/60 text-sm lg:text-base max-w-2xl mx-auto">
              A structured, step-by-step educational journey ensuring holistic development.
            </p>
          </div>

          <div className="flex flex-col gap-4 max-w-3xl mx-auto">
            {[
              {
                stage: "Primary",
                classes: "Class 1st to 5th",
                desc: "Focusing on fundamental literacy, numeration, and creative exploration."
              },
              {
                stage: "Middle",
                classes: "Class 6th to 8th",
                desc: "Transitioning towards deeper subject focus, critical thinking, practical knowledge."
              },
              {
                stage: "Secondary",
                classes: "Class 9th & 10th",
                desc: "Rigorous board exam preparation and intensive doubt-solving sessions."
              }
            ].map((st, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 lg:p-6 hover:bg-white/10 transition-colors flex flex-row items-center gap-4">
                <div className="w-12 h-12 lg:w-16 lg:h-16 shrink-0 bg-accent text-primary rounded-xl flex items-center justify-center font-black text-xl lg:text-2xl shadow-lg">
                  {i + 1}
                </div>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full gap-2 lg:gap-8">
                  <div className="min-w-[120px]">
                    <h3 className="text-lg lg:text-2xl font-black uppercase tracking-wide leading-none mb-1">{st.stage}</h3>
                    <span className="text-accent font-bold text-[10px] lg:text-xs uppercase tracking-widest">{st.classes}</span>
                  </div>
                  <p className="text-white/70 text-[10px] lg:text-sm leading-snug font-medium flex-1">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3.5 Medium & Class Information */}
      <section className="py-8 lg:py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Hindi Medium Card */}
            <div className="bg-gradient-to-br from-orange-50 to-white p-5 rounded-2xl border border-orange-100 shadow-sm group hover:shadow-md transition-all duration-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-500 text-white rounded-xl flex items-center justify-center shadow-md shadow-orange-200 group-hover:rotate-6 transition-transform">
                  <Languages size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-primary uppercase tracking-tighter">Hindi Medium</h3>
                  <p className="text-orange-600 font-black text-[10px] uppercase tracking-widest">RBSE Curriculum</p>
                </div>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl font-black text-primary">1st to 10th</span>
                <span className="text-primary/40 font-bold uppercase text-[10px]">Class</span>
              </div>
              <p className="text-primary/60 text-xs font-medium leading-relaxed">
                Complete education in Hindi medium following the Rajasthan Board syllabus with a focus on deep conceptual understanding and cultural values.
              </p>
            </div>

            {/* English Medium Card */}
            <div className="bg-gradient-to-br from-sky-50 to-white p-5 rounded-2xl border border-sky-100 shadow-sm group hover:shadow-md transition-all duration-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-sky-500 text-white rounded-xl flex items-center justify-center shadow-md shadow-sky-200 group-hover:-rotate-6 transition-transform">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-primary uppercase tracking-tighter">English Medium</h3>
                  <p className="text-sky-600 font-black text-[10px] uppercase tracking-widest">Modern Curriculum</p>
                </div>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl font-black text-primary">Nursery to 8th</span>
                <span className="text-primary/40 font-bold uppercase text-[10px]">Class</span>
              </div>
              <p className="text-primary/60 text-xs font-medium leading-relaxed">
                High-quality English medium education starting from foundation years to middle school, ensuring global fluency and academic excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Teaching Methodology */}
      <section className="py-12 lg:py-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl lg:text-5xl font-black text-primary uppercase tracking-tighter leading-tight">
              Our Teaching <br className="hidden lg:block" />
              <span className="text-accent underline decoration-primary/10 underline-offset-8">Methodology</span>
            </h2>
            <p className="text-primary/70 text-sm lg:text-base font-medium leading-relaxed">
              We blend traditional ethics with modern technological advancements to create a highly engaging and highly retentive learning atmosphere.
            </p>
            
            <div className="grid grid-cols-4 gap-2 mt-4">
              {[
                { title: "Smart Class", desc: "Interactive digital boards.", icon: MonitorPlay },
                { title: "Attention", desc: "Low student-teacher ratio.", icon: Users },
                { title: "Concepts", desc: "Understanding beyond rote.", icon: BookOpen },
                { title: "Holistic Growth", desc: "Overall development focus.", icon: CheckCircle2 },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-1 bg-white p-2 rounded-xl shadow-sm border border-primary/5 hover:-translate-y-1 transition-transform">
                  <div className="w-7 h-7 lg:w-10 lg:h-10 bg-primary/5 text-primary rounded-lg flex items-center justify-center mb-1">
                    <item.icon className="w-4 h-4 lg:w-5 lg:h-5" strokeWidth={2.5} />
                  </div>
                  <h4 className="font-black text-primary text-[7px] lg:text-sm uppercase tracking-wide leading-tight">{item.title}</h4>
                  <p className="hidden lg:block text-primary/60 text-xs font-medium leading-relaxed mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-square w-full max-w-md mx-auto">
            {/* Abstract decorative grid instead of image to save space, or use another image. */}
            <div className="absolute inset-0 bg-secondary rounded-[3rem] rotate-3 opacity-10" />
            <div className="absolute inset-0 bg-primary rounded-[3rem] -rotate-3 overflow-hidden shadow-2xl flex items-center justify-center">
               <Image src="/hero.jpg" alt="Modern Education" fill className="object-cover opacity-60 mix-blend-overlay" />
               <div className="text-white text-center p-8 relative z-10">
                  <BookOpen size={80} className="text-accent mx-auto mb-6 opacity-30 blur-[2px] absolute inset-0 m-auto -z-1" />
                  <h3 className="text-3xl font-black uppercase mb-1 drop-shadow-lg">Modern</h3>
                  <h3 className="text-3xl font-black text-accent uppercase drop-shadow-lg">Education</h3>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Exams, Assessment & Feedback */}
      <section className="py-12 lg:py-24 bg-white border-t border-primary/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
             <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/20 text-accent rounded-full mb-6">
                <FileText size={32} />
             </div>
            <h2 className="text-3xl lg:text-5xl font-black text-primary uppercase tracking-tighter">
              Assessment & <span className="text-accent">Feedback</span>
            </h2>
            <p className="mt-4 text-primary/60 text-sm max-w-2xl mx-auto font-medium">
              We believe continuous evaluation is the key to consistent growth. 
            </p>
          </div>

          <div className="grid grid-cols-4 lg:flex lg:flex-row items-start lg:items-center justify-center gap-2 lg:gap-8 max-w-5xl mx-auto">
            {[
              { title: "Daily H.W.", desc: "Daily tracking & parental feedback." },
              { title: "Class Tests", desc: "Weekly concept evaluation." },
              { title: "Half-Yearly", desc: "Mid-session review." },
              { title: "Yearly Exams", desc: "Final board-pattern assessment." }
            ].map((step, i) => (
              <React.Fragment key={i}>
                <div className="flex-1 bg-primary/5 hover:bg-primary/10 transition-colors w-full rounded-xl lg:rounded-3xl p-2 lg:p-6 text-center border border-primary/5 relative group pb-4 lg:pb-6">
                  {i < 3 && (
                    <div className="absolute top-1/2 -right-2 lg:hidden -translate-y-1/2 z-10 text-primary/30">
                      <ArrowRight size={10} />
                    </div>
                  )}
                  <div className="absolute -top-2 -right-2 lg:-top-3 lg:-right-3 w-5 h-5 lg:w-8 lg:h-8 bg-accent text-primary rounded-full flex items-center justify-center shadow-lg font-black text-[8px] lg:text-xs z-20">
                    {i+1}
                  </div>
                  <CheckCircle2 className="w-4 h-4 lg:w-6 lg:h-6 text-primary mx-auto mb-1 lg:mb-3 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                  <h4 className="font-black text-primary uppercase text-[8px] lg:text-sm mb-1 lg:mb-2 leading-none lg:leading-tight">{step.title}</h4>
                  <p className="hidden lg:block text-primary/60 text-[11px] leading-tight font-medium">{step.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden lg:block text-primary/20 shrink-0">
                    <ArrowRight size={24} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
