import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Building2, 
  GraduationCap, 
  Globe2, 
  Phone, 
  Target, 
  Eye, 
  Quote, 
  ShieldCheck, 
  Award, 
  Users, 
  Lightbulb 
} from "lucide-react";

export default function AboutPage() {
  return (
    <main className="relative min-h-[100svh] bg-[#f8fafc]">
      <Navbar />

      {/* Spacer for Navbar */}
      <div className="h-16 lg:h-24 bg-primary" />

      {/* 1. Hero Section */}
      <section className="relative min-h-[30vh] lg:min-h-[40vh] py-16 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/about1.jpg"
            alt="Sanskar Vidya Bhawan Campus"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-primary/80 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <div className="px-4 py-1.5 bg-accent/20 border border-accent/50 rounded-full text-accent text-[10px] lg:text-xs font-black uppercase tracking-widest mb-4 md:mb-6 backdrop-blur-md">
            Established in 2023
          </div>
          <h1 className="text-4xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-tight drop-shadow-2xl">
            About <span className="text-accent underline decoration-white/20 underline-offset-8">Sanskar Vidya Bhawan</span>
          </h1>
          <p className="mt-4 lg:mt-6 text-white/80 font-medium max-w-2xl text-xs lg:text-lg leading-relaxed">
            Dedicated to academic excellence and cultural integrity.
          </p>
        </div>
      </section>

      {/* 2. Introduction & Features */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Text Content */}
          <div className="flex flex-col">
            <h3 className="text-accent font-black text-xs uppercase tracking-widest mb-2">About Us</h3>
            <h2 className="text-3xl lg:text-5xl font-black text-primary uppercase tracking-tighter leading-tight mb-6">
              Our Education System <span className="text-accent">Inspires You More.</span>
            </h2>
            <p className="text-primary/70 text-sm lg:text-base font-medium leading-relaxed mb-8">
              Sanskar Vidya Bhawan Bhinmal follows the Rajasthan Board (RBSE) syllabus, but we provide a world-class environment for both English and Hindi mediums. We are committed to fostering academic excellence, equipping students with essential global skills and deeply rooted values.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 lg:gap-12 pl-4 border-l-4 border-accent">
              <div className="flex flex-col">
                <h4 className="text-primary font-black text-lg mb-1 flex items-center gap-2">
                  <GraduationCap className="text-accent w-5 h-5 flex-shrink-0" /> Education Services
                </h4>
                <p className="text-primary/60 text-xs font-medium">Comprehensive curriculum designed for modern growth.</p>
              </div>
              <div className="flex flex-col">
                <h4 className="text-primary font-black text-lg mb-1 flex items-center gap-2">
                  <Globe2 className="text-accent w-5 h-5 flex-shrink-0" /> International Hubs
                </h4>
                <p className="text-primary/60 text-xs font-medium">Equipping students with global skills and values.</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-primary/10 flex flex-row items-center gap-3 lg:gap-6 w-full">
              <a href="/contact" className="bg-primary text-white hover:bg-accent hover:text-primary rounded-full px-5 lg:px-8 py-3 lg:py-4 font-black text-[10px] lg:text-xs uppercase tracking-widest transition-all shadow-xl hover:-translate-y-1 whitespace-nowrap shrink-0">
                Discover More
              </a>
              <div className="flex items-center gap-2 lg:gap-3 shrink-0">
                <div className="w-8 h-8 lg:w-12 lg:h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                  <Phone size={16} className="lg:w-5 lg:h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] lg:text-[10px] font-black uppercase text-primary/40 tracking-widest">Call Now</span>
                  <a href="tel:+919784802941" className="text-primary font-black text-xs lg:text-sm hover:text-accent transition-colors whitespace-nowrap">+91 97848 02941</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Images & Stats Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-4">
                <div className="bg-white rounded-3xl p-6 shadow-xl border border-primary/5 flex flex-col items-center justify-center text-center aspect-square transform hover:scale-105 transition-transform">
                   <div className="text-4xl lg:text-5xl font-black text-accent mb-2">2023</div>
                   <p className="text-primary font-black text-xs uppercase tracking-wider">Years of Quality Service</p>
                </div>
                <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-xl">
                  <Image src="/about2.jpg" alt="Students Activity" fill className="object-cover" />
                  <div className="absolute inset-0 bg-primary/40 flex items-end p-4">
                     <span className="text-white font-black text-xs uppercase tracking-widest backdrop-blur-sm bg-white/10 px-3 py-1 rounded-full">Campus Life</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 lg:mt-12">
                <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-xl">
                  <Image src="/about3.jpg" alt="Campus Life" fill className="object-cover" />
                  <div className="absolute inset-0 bg-primary/40 flex items-end p-4">
                     <span className="text-white font-black text-xs uppercase tracking-widest backdrop-blur-sm bg-white/10 px-3 py-1 rounded-full">Students Activity</span>
                  </div>
                </div>
                <div className="bg-primary rounded-3xl p-6 shadow-xl text-center aspect-square flex items-center justify-center transform hover:scale-105 transition-transform">
                   <Building2 className="w-16 h-16 text-accent opacity-50" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Vision & Mission Block */}
      <section className="bg-primary py-10 lg:py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              
              {/* Mission Card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-8 hover:bg-white/10 transition-colors group flex items-start gap-4">
                 <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-lg shadow-accent/20 shrink-0">
                    <Target size={24} />
                 </div>
                 <div>
                   <h2 className="text-xl lg:text-2xl font-black text-white uppercase tracking-tighter mb-1.5">
                     Our Mission
                   </h2>
                   <p className="text-white/70 text-xs lg:text-sm font-medium leading-relaxed">
                     To provide a nurturing environment where students achieve their full potential through high-quality education and character building.
                   </p>
                 </div>
              </div>

              {/* Vision Card */}
              <div className="bg-accent border border-accent/20 rounded-2xl p-5 lg:p-8 hover:shadow-2xl hover:shadow-accent/20 transition-all group flex items-start gap-4">
                 <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-lg shadow-primary/20 shrink-0">
                    <Eye size={24} />
                 </div>
                 <div>
                   <h2 className="text-xl lg:text-2xl font-black text-primary uppercase tracking-tighter mb-1.5">
                     Our Vision
                   </h2>
                   <p className="text-primary/70 text-xs lg:text-sm font-medium leading-relaxed">
                     To be a leading educational institution that inspires students to become global citizens while staying rooted in our cultural values.
                   </p>
                 </div>
              </div>

           </div>
        </div>
      </section>

      {/* 4. Principal's Message */}
      <section className="py-10 lg:py-16 max-w-7xl mx-auto px-4 overflow-hidden">
        <h3 className="text-accent font-black text-xs uppercase tracking-widest mb-1 text-center">Leadership Message</h3>
        <h2 className="text-2xl lg:text-4xl font-black text-primary uppercase tracking-tighter leading-tight mb-8 lg:mb-12 text-center">
          Words from <span className="text-accent">our Principal.</span>
        </h2>

        <div className="bg-white rounded-3xl border border-primary/5 shadow-xl p-5 lg:p-8 relative">
           <Quote className="absolute top-4 right-6 w-16 h-16 text-primary/5 rotate-12" />
           
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
              {/* Image Side */}
              <div className="lg:col-span-3 flex justify-center lg:justify-end">
                 <div className="relative w-40 h-40 lg:w-48 lg:h-48">
                    {/* Decorative Frame */}
                    <div className="absolute inset-0 border-[3px] border-accent rounded-full translate-x-2 translate-y-2" />
                    <div className="absolute inset-0 bg-primary rounded-full overflow-hidden shadow-lg border-2 border-white">
                       <Image 
                         src="/jr-gaur.jpg.png" 
                         alt="Principal JR GAUR" 
                         fill 
                         sizes="(max-width: 768px) 100vw, 33vw"
                         className="object-cover object-top hover:scale-110 transition-transform duration-700" 
                       />
                    </div>
                 </div>
              </div>

              {/* Message Side */}
              <div className="lg:col-span-9 relative z-10 flex flex-col justify-center text-center lg:text-left">
                 <div className="mb-4">
                   <p className="text-primary/80 font-medium text-xs lg:text-sm leading-relaxed italic mb-3">
                     "Education is not just about books, but about the holistic development of an individual. At Sanskar Vidya Bhawan, we strive to create an environment where every child feels valued and inspired to learn."
                   </p>
                   {/* Hindi section */}
                   <p className="text-primary/70 font-medium text-xs lg:text-sm leading-relaxed lg:pl-3 lg:border-l-[3px] lg:border-accent">
                     "हमारा लक्ष्य शिक्षा के साथ-साथ विद्यार्थी का सर्वांगीण विकास हो ताकि वह आत्मनिर्भर, चरित्रवान और समाज के लिए एक जिम्मेदार नागरिक बन सकें! ये केवल ज्ञान देना नहीं बल्कि जीवन जीने की कला, सकारात्मक सोच और रचनात्मकता विकसित करना है।"
                   </p>
                 </div>
                 
                 <div>
                   <h4 className="text-lg lg:text-xl font-black text-primary tracking-tight">JR GAUR</h4>
                   <p className="text-accent font-black text-[10px] uppercase tracking-widest mt-0.5">
                     Managing Director & Principal
                   </p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 5. Core Values */}
      <section className="bg-[#f1f5f9] py-10 lg:py-16 border-t border-primary/5 pb-24">
        <div className="max-w-7xl mx-auto px-4">
           <div className="text-center mb-8 lg:mb-12">
              <h2 className="text-2xl lg:text-4xl font-black text-primary uppercase tracking-tighter">
                Our Core <span className="text-accent">Values</span>
              </h2>
           </div>

           <div className="grid grid-cols-2 gap-3 lg:gap-6">
              
              {/* Value 1 */}
              <div className="bg-white p-4 lg:p-8 rounded-2xl shadow-sm hover:shadow-lg border border-primary/5 text-center group hover:-translate-y-1 transition-all duration-300 flex flex-col items-center">
                 <div className="w-10 h-10 lg:w-14 lg:h-14 bg-primary/5 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors mb-3 lg:mb-4 shrink-0">
                    <ShieldCheck size={20} className="lg:w-7 lg:h-7" />
                 </div>
                 <h3 className="text-xs lg:text-lg font-black text-primary mb-1">Integrity</h3>
                 <p className="text-primary/60 text-[9px] lg:text-sm font-medium leading-tight">Doing the right thing always.</p>
              </div>

              {/* Value 2 */}
              <div className="bg-white p-4 lg:p-8 rounded-2xl shadow-sm hover:shadow-lg border border-primary/5 text-center group hover:-translate-y-1 transition-all duration-300 flex flex-col items-center">
                 <div className="w-10 h-10 lg:w-14 lg:h-14 bg-accent/20 rounded-full flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-colors mb-3 lg:mb-4 shrink-0">
                    <Award size={20} className="lg:w-7 lg:h-7" />
                 </div>
                 <h3 className="text-xs lg:text-lg font-black text-primary mb-1">Excellence</h3>
                 <p className="text-primary/60 text-[9px] lg:text-sm font-medium leading-tight">Striving for the best in all.</p>
              </div>

              {/* Value 3 */}
              <div className="bg-white p-4 lg:p-8 rounded-2xl shadow-sm hover:shadow-lg border border-primary/5 text-center group hover:-translate-y-1 transition-all duration-300 flex flex-col items-center">
                 <div className="w-10 h-10 lg:w-14 lg:h-14 bg-primary/5 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors mb-3 lg:mb-4 shrink-0">
                    <Users size={20} className="lg:w-7 lg:h-7" />
                 </div>
                 <h3 className="text-xs lg:text-lg font-black text-primary mb-1">Inclusion</h3>
                 <p className="text-primary/60 text-[9px] lg:text-sm font-medium leading-tight">Every child is important.</p>
              </div>

              {/* Value 4 */}
              <div className="bg-white p-4 lg:p-8 rounded-2xl shadow-sm hover:shadow-lg border border-primary/5 text-center group hover:-translate-y-1 transition-all duration-300 flex flex-col items-center">
                 <div className="w-10 h-10 lg:w-14 lg:h-14 bg-accent/20 rounded-full flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-colors mb-3 lg:mb-4 shrink-0">
                    <Lightbulb size={20} className="lg:w-7 lg:h-7" />
                 </div>
                 <h3 className="text-xs lg:text-lg font-black text-primary mb-1">Innovation</h3>
                 <p className="text-primary/60 text-[9px] lg:text-sm font-medium leading-tight">Modern ways of learning.</p>
              </div>

           </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
