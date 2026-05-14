"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail, ArrowRight, Home, Info, Plus, ImageIcon, BookOpen, UserCircle, ShieldCheck, Users, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Academics", href: "/academics" },
  { name: "Admissions", href: "/admissions" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
  { name: "About Us", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Bar - Dark Green */}
      <div className="bg-primary text-white/90 py-3 hidden lg:block border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-[13px] font-medium">
          <div className="flex gap-8 items-center">
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-accent" />
              <span>+91 97848 02941</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-accent" />
              <span>sanskarvidhyabhavan1986@gmail.com</span>
            </div>
          </div>
          <div className="flex gap-6 items-center">
             <div className="flex gap-4 border-r border-white/10 pr-6 mr-6">
                <span className="hover:text-accent cursor-pointer transition-colors">Facebook</span>
                <span className="hover:text-accent cursor-pointer transition-colors">Instagram</span>
             </div>
             <Link href="/login" className="hover:text-accent transition-colors">Portal Login</Link>
          </div>
        </div>
      </div>

      {/* Main Header - Dark Theme */}
      <div className={cn(
        "transition-all duration-300 py-3",
        scrolled ? "bg-primary shadow-premium" : "bg-primary/95 backdrop-blur-sm"
      )}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative w-14 h-14 bg-white rounded-lg flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
              <Image 
                src="/logo.png" 
                alt="Sanskar Vidya Bhavan Logo" 
                width={56} 
                height={56}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black text-[22px] lg:text-2xl tracking-tighter text-white group-hover:text-accent transition-colors whitespace-nowrap">
                SANSKAR VIDYA BHAVAN
              </span>
              <span className="font-bold text-xs lg:text-sm tracking-[.1em] uppercase text-accent">
                BHINMAL
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-bold text-[14px] text-white hover:text-accent transition-all relative group uppercase tracking-wide"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="hidden lg:block">
            <Link
               href="/admissions"
               className="bg-accent text-primary px-8 py-3.5 rounded-full font-black text-sm shadow-xl hover:-translate-y-1 transition-all uppercase tracking-widest border-2 border-accent hover:bg-transparent hover:text-white"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile UI Spacer to balance logo without hamburger menu */}
          <div className="w-8 lg:hidden" />
        </div>
      </div>

      </nav>

      {/* Pure CSS Premium Slide-Out Sidebar Drawer - Root Level Guarantee */}
      {/* Backdrop Blur Overlay */}
      <div 
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-primary/40 backdrop-blur-sm z-[9998] lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />
      
      {/* Sliding Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-white z-[9999] lg:hidden shadow-[-20px_0_40px_rgba(0,0,0,0.1)] flex flex-col transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-6 border-b border-primary/5 bg-primary/5">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
            <span className="font-heading font-black text-primary uppercase tracking-tighter text-lg leading-none">
              Sanskar Vidya Bhavan<br/>Bhinmal
            </span>
          </div>
          <button 
            type="button"
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-sm active:scale-90 transition-transform"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Links - Restricted Portals */}
        <div className="flex-1 overflow-y-auto py-8 px-4 flex flex-col gap-4">
          <h3 className="text-[10px] font-black text-primary/40 uppercase tracking-widest pl-2 mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Secure Portals
          </h3>
          


          {/* Teacher Portal */}
          <Link href="/dashboard/teacher" onClick={() => setIsOpen(false)} className="bg-white border border-primary/10 text-primary p-4 rounded-2xl flex items-center justify-between group shadow-sm hover:shadow-md hover:border-primary/20 transition-all">
              <div className="flex items-center gap-4">
                  <div className="bg-primary/5 p-2.5 rounded-xl"><Users size={22} /></div>
                  <span className="font-black text-base uppercase tracking-wide">Teacher Portal</span>
              </div>
              <ArrowRight className="text-primary/30 group-hover:text-primary group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Student Portal */}
          <Link href="/dashboard/student" onClick={() => setIsOpen(false)} className="bg-white border border-primary/10 text-primary p-4 rounded-2xl flex items-center justify-between group shadow-sm hover:shadow-md hover:border-primary/20 transition-all">
              <div className="flex items-center gap-4">
                  <div className="bg-primary/5 p-2.5 rounded-xl"><GraduationCap size={22} /></div>
                  <span className="font-black text-base uppercase tracking-wide">Student Portal</span>
              </div>
              <ArrowRight className="text-primary/30 group-hover:text-primary group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Drawer Footer CTA */}
        <div className="p-6 border-t border-primary/5 mt-auto">
          <Link
            href="/admissions"
            onClick={() => setIsOpen(false)}
            className="block w-full bg-accent text-primary text-center py-4 rounded-xl font-black shadow-xl shadow-accent/20 uppercase tracking-widest text-sm"
          >
            Apply Online 2024-25
          </Link>
        </div>
      </div>

    {/* Premium Locked Mobile Bottom Navbar */}
    <div className="fixed bottom-0 left-0 right-0 z-[100] lg:hidden pb-safe">
      <div className="bg-white/95 backdrop-blur-xl shadow-[0_-15px_40px_rgba(0,0,0,0.1)] border-t border-primary/10 px-2 py-3 flex justify-between items-center rounded-t-[2.5rem]">
        {navLinks.map((link) => {
           let Icon = Home;
           if (link.name === "Academics") Icon = BookOpen;
           if (link.name === "Admissions") Icon = Plus;
           if (link.name === "Gallery") Icon = ImageIcon;
           if (link.name === "Contact") Icon = Phone;
           if (link.name === "About Us") Icon = Info;
           
           const isActive = pathname === link.href;
           
           return (
            <Link key={link.name} href={link.href} className="flex flex-col items-center justify-between transition-all active:scale-90 w-[16%] gap-1">
              <div className={cn(
                  "p-2 rounded-2xl flex items-center justify-center transition-all duration-300",
                  isActive ? "bg-accent/20 text-accent shadow-sm" : "bg-transparent text-primary/40 hover:bg-black/5"
              )}>
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={cn(
                 "text-[7px] uppercase tracking-widest leading-none text-center truncate w-full transition-all",
                 isActive ? "font-black text-primary" : "font-semibold text-primary/40"
              )}>
                 {link.name === "About Us" ? "About" : link.name}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
    </>
  );
}
