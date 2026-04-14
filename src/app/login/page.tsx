"use client";

import React, { useState } from "react";

import { User, ShieldCheck, GraduationCap, Lock, Mail, Eye, EyeOff, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Role = "student" | "teacher" | "admin";

export default function LoginPage() {
  const [role, setRole] = useState<Role>("student");
  const [showPassword, setShowPassword] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRoleChange = (newRole: Role) => {
    setRole(newRole);
    // Clear inputs when switching roles
    setId("");
    setPassword("");
  };

  const handleLogin = (e?: React.FormEvent | React.TouchEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    if (!id || !password) return; // Must fill fields
    
    // Hard routing push
    if (role === "admin") {
      router.push("/dashboard/admin");
    } else if (role === "teacher") {
      router.push("/dashboard/teacher");
    } else {
      router.push("/dashboard/student");
    }
  };
  
  const roleConfig = {
    student: {
      title: "Student Portal",
      subtitle: "Access your grades, attendance & more",
      icon: GraduationCap,
      color: "bg-accent",
      gradient: "from-accent to-[#e68e00]",
    },
    teacher: {
      title: "Teacher Portal",
      subtitle: "Manage classes & student performance",
      icon: User,
      color: "bg-primary",
      gradient: "from-primary to-[#004d3d]",
    },
    admin: {
      title: "Admin Suite",
      subtitle: "Full school management control",
      icon: ShieldCheck,
      color: "bg-gray-900",
      gradient: "from-gray-900 to-black",
    },
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Orbs - Enforced Pointer Events None so they NEVER block clicks */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none z-0" />

      <div 
        className="max-w-5xl w-full bg-white rounded-[40px] shadow-premium overflow-hidden grid lg:grid-cols-2 relative z-50 min-h-[600px] animate-in fade-in zoom-in-95 duration-500 ease-out pointer-events-auto"
      >
        {/* Left Side: Visual/Context */}
        <div className={`relative hidden lg:flex flex-col justify-between p-12 text-white bg-gradient-to-br ${roleConfig[role].gradient} transition-all duration-700`}>
          <Link href="/" className="flex items-center gap-2 group text-white/80 hover:text-white transition-colors">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold uppercase tracking-widest text-xs">Back to Website</span>
          </Link>

          <div className="flex flex-col gap-6">
            <div className="animate-in slide-in-from-left-4 fade-in duration-700 ease-out fill-mode-both">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                {role === "student" && <GraduationCap size={32} />}
                {role === "teacher" && <User size={32} />}
                {role === "admin" && <ShieldCheck size={32} />}
              </div>
              <h1 className="text-5xl font-black uppercase tracking-tighter leading-none mb-4">
                {roleConfig[role].title}
              </h1>
              <p className="text-white/70 text-lg font-medium max-w-sm leading-relaxed">
                {roleConfig[role].subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1">
               <Image src="/logo.png" alt="Logo" width={32} height={32} />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-sm tracking-tighter">SANSKAR VIDYA</span>
              <span className="font-bold text-[10px] tracking-widest uppercase opacity-60">BHAWAN PORTAL</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-6 sm:p-8 lg:p-16 flex flex-col justify-center relative">
          
          {/* Mobile Upper Area (Matches Laptop Context) */}
          <div className="mb-8 lg:hidden flex flex-col gap-6 w-full animate-in fade-in duration-500">
            <div className="flex items-center justify-between w-full">
              <Link href="/" className="flex items-center gap-2 group text-primary/60 hover:text-primary transition-colors">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-bold uppercase tracking-widest text-[10px]">Back</span>
              </Link>
              <div className="flex items-center gap-2">
                <Image src="/logo.png" alt="Logo" width={24} height={24} className="object-contain" />
                <div className="flex flex-col text-right">
                  <span className="font-black text-[10px] tracking-tighter text-primary leading-none">SANSKAR VIDYA</span>
                  <span className="font-bold text-[8px] tracking-widest uppercase opacity-60 text-primary">PORTAL</span>
                </div>
              </div>
            </div>

            <div className={`w-full rounded-[2rem] p-6 sm:p-8 text-white bg-gradient-to-br ${roleConfig[role].gradient} transition-all duration-700 flex flex-col items-center justify-center shadow-lg relative overflow-hidden`}>
              {/* Decorative Orbs inside Mobile Card */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
              
              <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 relative z-10 animate-in zoom-in-95 duration-500">
                {role === "student" && <GraduationCap size={28} />}
                {role === "teacher" && <User size={28} />}
                {role === "admin" && <ShieldCheck size={28} />}
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tighter leading-none mb-2 relative z-10 text-center animate-in slide-in-from-bottom-2 duration-500">
                {roleConfig[role].title}
              </h2>
              <p className="text-white/80 text-sm font-medium px-2 relative z-10 text-center leading-relaxed animate-in slide-in-from-bottom-2 duration-700 delay-100">
                {roleConfig[role].subtitle}
              </p>
            </div>
          </div>

          {/* Role Selector Tabs */}
          <div className="bg-soft-grey p-1.5 rounded-2xl flex items-center gap-1 mb-10">
            {(["student", "teacher", "admin"] as Role[]).map((r) => (
              <label
                key={r}
                className={`flex-1 py-3 text-center rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer relative z-[100] block ${
                  role === r ? "bg-white text-primary shadow-sm" : "text-primary/40 hover:text-primary/60 hover:bg-white/50"
                }`}
              >
                <input 
                  type="radio" 
                  name="portalRole" 
                  value={r} 
                  checked={role === r} 
                  onChange={() => handleRoleChange(r)} 
                  className="hidden" 
                />
                {r}
              </label>
            ))}
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-[.2em] text-primary/40 ml-4">
                Email / Username
              </label>
              <div className="relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/30" size={18} />
                <input 
                  type="text" 
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder={`Enter ${role} ID`}
                  className="w-full bg-soft-grey border-none rounded-2xl pl-14 pr-6 py-4 text-sm font-bold text-primary focus:ring-2 focus:ring-accent transition-all outline-none"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-[.2em] text-primary/40 ml-4">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/30" size={18} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-soft-grey border-none rounded-2xl pl-14 pr-14 py-4 text-sm font-bold text-primary focus:ring-2 focus:ring-accent transition-all outline-none"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-primary/30 hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between px-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent transition-all" />
                <span className="text-xs font-bold text-primary/50 group-hover:text-primary transition-colors">Remember me</span>
              </label>
              <button type="button" className="text-xs font-black text-accent uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
                Forgot?
              </button>
            </div>

            <Link
              href={role === "admin" ? "/dashboard/admin" : role === "teacher" ? "/dashboard/teacher" : "/dashboard/student"}
              className={`w-full py-5 text-center mt-2 rounded-2xl block text-white font-black uppercase tracking-[.3em] text-xs shadow-xl transition-all hover:-translate-y-1 cursor-pointer relative z-[100] ${
                role === "student" ? "bg-accent" : role === "teacher" ? "bg-primary" : "bg-gray-900"
              }`}
            >
              Sign In To Portal
            </Link>
          </div>

          <p className="mt-10 text-center text-xs font-bold text-primary/40">
            Don't have access? <span className="text-accent underline decoration-2 cursor-pointer">Contact Administration</span>
          </p>
        </div>
      </div>
    </main>
  );
}
