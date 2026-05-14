import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Globe2, Camera, ArrowRight, ExternalLink, UserCircle } from 'lucide-react';
import Image from 'next/image';

const Node1SchoolInfo = () => (
  <div className="flex flex-col gap-2 lg:gap-8 pr-2 lg:border-none lg:pr-0">
    <Link href="/" className="flex items-center gap-1.5 lg:gap-4 group">
      <div className="w-10 h-10 lg:w-16 lg:h-16 bg-white rounded-xl lg:rounded-2xl flex items-center justify-center p-1.5 lg:p-2 group-hover:scale-105 transition-transform">
        <Image src="/logo.png" alt="SVB Logo" width={60} height={60} className="object-contain" />
      </div>
      <div className="flex flex-col">
        <span className="font-heading font-black text-xs lg:text-2xl tracking-tighter text-white leading-none">
          SANSKAR
        </span>
        <span className="font-bold text-[7px] lg:text-sm tracking-[.1em] uppercase text-accent mt-0.5">
          VIDYA BHAWAN
        </span>
      </div>
    </Link>
    
    <p className="text-white/60 text-[9px] lg:text-sm leading-tight lg:leading-relaxed text-left w-full text-justify">
      Dedicated to quality education with strong cultural values in Bhinmal. Fostering excellence and holistic growth for every student.
    </p>
  </div>
);

const Node2QuickLinks = () => (
  <div className="flex flex-col gap-2 lg:gap-8 items-end lg:items-start pl-2 lg:pl-0">
    <h4 className="font-black text-[10px] lg:text-xl uppercase tracking-widest text-white decoration-accent decoration-2 lg:decoration-4 underline-offset-4 lg:underline-offset-8 underline text-right lg:text-left">
      Quick Links
    </h4>
    <ul className="flex flex-col gap-1.5 lg:gap-4 lg:mb-0 w-full">
      {['Home', 'About Us', 'Academics', 'Gallery', 'Contact'].map((item) => (
        <li key={item} className="flex justify-end lg:justify-start">
          <Link 
            href={item === "About Us" ? "/about" : `/${item.toLowerCase().replace(' ', '-')}`} 
            className="text-white/60 hover:text-accent transition-colors flex items-center gap-1 lg:gap-2 group text-[10px] lg:text-sm font-bold flex-row-reverse lg:flex-row justify-end lg:justify-start"
          >
            <ArrowRight size={10} className="lg:w-3.5 lg:h-3.5 opacity-0 group-hover:opacity-100 translate-x-2 lg:-translate-x-2 group-hover:translate-x-0 transition-all font-black transform scale-x-[-1] lg:scale-x-100" />
            <span>{item}</span>
          </Link>
        </li>
      ))}
    </ul>

    <div className="flex justify-end lg:justify-start gap-2 lg:gap-4 mt-1 w-full">
      <a 
        href="https://facebook.com/Sanskar-Vidya-Bhwan-Bhinmal" 
        target="_blank" 
        className="w-7 h-7 lg:w-10 lg:h-10 bg-white/5 rounded-lg lg:rounded-xl flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all shadow-md"
        title="Facebook"
      >
        <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24" className="lg:w-5 lg:h-5">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </a>
      <a 
        href="https://www.instagram.com/official_svb_school86_bhinmal?igsh=MTBmY25pNHdkOHNldw==" 
        target="_blank" 
        className="w-7 h-7 lg:w-10 lg:h-10 bg-white/5 rounded-lg lg:rounded-xl flex items-center justify-center hover:bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:text-white transition-all shadow-md"
        title="Instagram"
      >
        <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24" className="lg:w-5 lg:h-5">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      </a>
      <a 
        href="#" 
        target="_blank" 
        className="w-7 h-7 lg:w-10 lg:h-10 bg-white/5 rounded-lg lg:rounded-xl flex items-center justify-center hover:bg-[#FF0000] hover:text-white transition-all shadow-md"
        title="YouTube"
      >
        <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24" className="lg:w-5 lg:h-5">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      </a>
      <a 
        href="#" 
        target="_blank" 
        className="w-7 h-7 lg:w-10 lg:h-10 bg-white/5 rounded-lg lg:rounded-xl flex items-center justify-center hover:bg-[#0077b5] hover:text-white transition-all shadow-md"
        title="LinkedIn"
      >
        <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24" className="lg:w-5 lg:h-5">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      </a>
      <Link 
        href="/login" 
        className="w-7 h-7 lg:w-10 lg:h-10 bg-white/5 rounded-lg lg:rounded-xl flex items-center justify-center hover:bg-white hover:text-primary transition-all shadow-md group"
        title="Portal Login"
      >
        <UserCircle size={14} strokeWidth={2.5} className="lg:w-5 lg:h-5 text-current" />
      </Link>
    </div>
  </div>
);

const Node3Contact = () => (
  <div className="flex flex-col gap-1.5 lg:gap-8 pr-2 lg:border-none lg:pr-0">
    <h4 className="font-black text-[10px] lg:text-xl uppercase tracking-widest text-white decoration-accent decoration-2 lg:decoration-4 underline-offset-4 lg:underline-offset-8 underline text-left">
      Contact Us
    </h4>
    <div className="flex flex-col gap-2 lg:gap-6 w-full">
      <div className="flex gap-2 lg:gap-4 items-center group justify-start w-full">
        <div className="w-5 h-5 lg:w-10 lg:h-10 bg-accent/10 rounded-sm lg:rounded-xl flex items-center justify-center text-accent flex-shrink-0 group-hover:bg-accent group-hover:text-primary transition-all">
          <Phone size={10} className="lg:w-[18px] lg:h-[18px]" />
        </div>
        <div className="flex flex-col w-full text-left">
          <span className="hidden lg:block text-[10px] font-black uppercase tracking-widest text-accent">Phone</span>
          <p className="text-white text-[9px] lg:text-sm font-bold tracking-wide">
            +91 97848 02941
          </p>
        </div>
      </div>
      <div className="flex gap-2 lg:gap-4 items-center group justify-start w-full">
        <div className="w-5 h-5 lg:w-10 lg:h-10 bg-accent/10 rounded-sm lg:rounded-xl flex items-center justify-center text-accent flex-shrink-0 group-hover:bg-accent group-hover:text-primary transition-all">
          <MapPin size={10} className="lg:w-[18px] lg:h-[18px]" />
        </div>
        <div className="flex flex-col w-full text-left">
          <span className="hidden lg:block text-[10px] font-black uppercase tracking-widest text-accent">Address</span>
          <p className="text-white/70 text-[8px] lg:text-sm leading-tight lg:leading-relaxed">
            X7VJ+5PX, Plot No. 23, Krishna Colony, Shyaam Nagar, Jaswantpura Road, Bhinmal, Rajasthan 343029
          </p>
        </div>
      </div>
    </div>
  </div>
);

const Node4Map = () => (
  <div className="flex flex-col gap-2 lg:gap-8 items-start lg:items-start pl-0 lg:pl-0 w-full mt-2 lg:mt-0">
    <h4 className="font-black text-[10px] lg:text-xl uppercase tracking-widest text-white decoration-accent decoration-2 lg:decoration-4 underline-offset-4 lg:underline-offset-8 underline text-left lg:text-left w-full">
      Location
    </h4>
    <div className="w-full h-32 lg:aspect-video bg-white/5 rounded-xl lg:rounded-3xl overflow-hidden relative group border border-white/10 flex-shrink-0 mt-0">
       <iframe 
         src="https://maps.google.com/maps?q=Sanskar%20Vidya%20bhavan%20bhinmal&t=&z=15&ie=UTF8&iwloc=&output=embed" 
         width="100%" 
         height="100%" 
         style={{ border: 0 }} 
         allowFullScreen 
         loading="lazy" 
         referrerPolicy="no-referrer-when-downgrade"
         className="transition-all duration-700 hover:scale-110"
       ></iframe>
    </div>
  </div>
);

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-4 lg:pt-24 pb-4 lg:pb-12 overflow-hidden relative">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none lg:block hidden" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* MOBILE LAYOUT: Independent Flex Columns (Solves Grid Row Height Issues entirely) */}
        <div className="flex lg:hidden flex-col w-full gap-4 mb-6 border-b border-white/5 pb-4">
           {/* Top 2 columns */}
           <div className="flex w-full gap-2">
             {/* Left Flex Stack: Info & Contact seamlessly flow under each other without CSS Grid forces */}
             <div className="flex flex-col w-[55%] gap-6 border-r border-white/5 pr-2">
                <Node1SchoolInfo />
                <Node3Contact />
             </div>
             
             {/* Right Flex Stack: Quick Links stay pinned to the right natively */}
             <div className="flex flex-col w-[45%] gap-6 pl-1">
                <Node2QuickLinks />
             </div>
           </div>
           
           {/* Full Width Map block spanning across footer bottom */}
           <div className="w-full mt-2 border-t border-white/5 pt-4">
              <Node4Map />
           </div>
        </div>

        {/* DESKTOP LAYOUT: Strictly Preserved CSS 4-Column Grid Pattern */}
        <div className="hidden lg:grid grid-cols-4 gap-16 mb-20 items-start">
           <div className="border-r border-white/5 pr-4 flex h-full">
             <Node1SchoolInfo />
           </div>
           <div className="pl-2 flex h-full">
             <Node2QuickLinks />
           </div>
           <div className="border-r border-white/5 pr-4 pl-4 flex h-full">
             <Node3Contact />
           </div>
           <div className="pl-2 flex h-full">
             <Node4Map />
           </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-2 lg:pt-12 flex flex-col items-center justify-center gap-1.5 text-[8px] lg:text-xs">
          <p className="text-white/40 font-medium text-center">
            © {new Date().getFullYear()} Sanskar Vidya Bhavan Bhinmal. All Rights Reserved.
          </p>
          <div className="flex items-center gap-1">
            <span className="text-white/40 font-medium tracking-tight">
              Developed with ❤️ by <a href="https://technodhaam.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors font-bold underline decoration-blue-400/30 hover:decoration-blue-300 underline-offset-2">TechnoDhaam Web Solutions</a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
