"use client";

import React, { useState } from "react";
import { User, ShieldCheck, GraduationCap, Lock, Mail, Eye, EyeOff, ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Role = "student" | "teacher" | "admin";

export default function LoginPage() {
  const [role, setRole]           = useState<Role>("student");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const router = useRouter();

  const handleRoleChange = (newRole: Role) => {
    setRole(newRole);
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email aur password dono bharo.");
      return;
    }

    setLoading(true);

    // Admin: Real Supabase Auth
    if (role === "admin") {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      setLoading(false);

      if (authError) {
        if (authError.message.includes("Email not confirmed")) {
          setError("Pehle apna email confirm karo (Supabase se mail aayi hogi).");
        } else if (authError.message.includes("Invalid login credentials")) {
          setError("Email ya password galat hai. Dobara check karo.");
        } else {
          setError("Login failed: " + authError.message);
        }
        return;
      }

      // Full page reload so middleware picks up the new session cookie
      window.location.href = "/dashboard/admin";
      return;
    }

    if (role === "student") {
      // Try SR Number first, then Roll Number as fallback
      let finalData: any = null;
      let { data: d1, error: e1 } = await supabase
        .from('students')
        .select('*')
        .eq('sr_number', email.trim())
        .eq('login_pin', password.trim())
        .single();
      if (!e1 && d1) finalData = d1;

      if (!finalData) {
        const { data: d2, error: e2 } = await supabase
          .from('students')
          .select('*')
          .eq('roll_number', email.trim())
          .eq('login_pin', password.trim())
          .single();
        if (!e2 && d2) finalData = d2;
      }

      setLoading(false);
      if (!finalData) {
        setError("Invalid Roll/SR Number or PIN. Check your admission slip.");
        return;
      }
      localStorage.setItem('svb_student_session', JSON.stringify({ id: finalData.id, sr_number: finalData.sr_number, full_name: finalData.full_name, class: finalData.class }));
      document.cookie = `svb_student_id=${finalData.id}; path=/`;
      router.push("/dashboard/student");
      return;
    }

    if (role === "teacher") {
      const { data, error: tchError } = await supabase
        .from('teachers')
        .select('*')
        .eq('employee_id', email.trim().toUpperCase())
        .eq('login_pin', password.trim())
        .single();
        
      setLoading(false);
      
      if (tchError || !data) {
         setError("Invalid Employee ID or PIN.");
         return;
      }
      
      localStorage.setItem('svb_teacher_session', JSON.stringify({ id: data.id, employee_id: data.employee_id, full_name: data.full_name, designated_class: data.designated_class }));
      document.cookie = `svb_teacher_id=${data.id}; path=/`;
      router.push("/dashboard/teacher");
      return;
    }
  };

  const roleConfig = {
    student: {
      title: "Student Portal",
      subtitle: "Access your grades, attendance & more",
      icon: GraduationCap,
      gradient: "from-accent to-[#e68e00]",
      placeholder: "Student ID / Email",
    },
    teacher: {
      title: "Teacher Portal",
      subtitle: "Manage classes & student performance",
      icon: User,
      gradient: "from-primary to-[#004d3d]",
      placeholder: "Teacher ID / Email",
    },
    admin: {
      title: "Admin Suite",
      subtitle: "Full school management control",
      icon: ShieldCheck,
      gradient: "from-gray-900 to-black",
      placeholder: "Admin Email",
    },
  };

  const cfg = roleConfig[role];

  return (
    <main className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none z-0" />

      <div className="max-w-5xl w-full bg-white rounded-[40px] shadow-2xl overflow-hidden grid lg:grid-cols-2 relative z-50 min-h-[600px]">

        {/* Left Side: Visual */}
        <div className={`relative hidden lg:flex flex-col justify-between p-12 text-white bg-gradient-to-br ${cfg.gradient} transition-all duration-700`}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <Link href="/" className="flex items-center gap-2 group text-white/70 hover:text-white transition-colors z-10">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold uppercase tracking-widest text-xs">Back to Website</span>
          </Link>

          <div className="flex flex-col gap-6 z-10">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-2">
              <cfg.icon size={32} />
            </div>
            <h1 className="text-5xl font-black uppercase tracking-tighter leading-none">
              {cfg.title}
            </h1>
            <p className="text-white/70 text-lg font-medium max-w-sm leading-relaxed">
              {cfg.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-4 z-10">
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
        <div className="p-6 sm:p-8 lg:p-16 flex flex-col justify-center">

          {/* Mobile Header */}
          <div className="mb-6 lg:hidden flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-primary/60 hover:text-primary transition-colors">
              <ArrowLeft size={16} />
              <span className="font-bold uppercase tracking-widest text-[10px]">Back</span>
            </Link>
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="Logo" width={24} height={24} />
              <span className="font-black text-[11px] text-primary tracking-tighter">SANSKAR ADMIN</span>
            </div>
          </div>

          {/* Mobile Role Visual */}
          <div className={`lg:hidden rounded-[2rem] p-6 text-white bg-gradient-to-br ${cfg.gradient} transition-all duration-700 flex flex-col items-center justify-center shadow-lg mb-6 relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-3 relative z-10">
              <cfg.icon size={28} />
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tighter leading-none mb-1 relative z-10 text-center">{cfg.title}</h2>
            <p className="text-white/80 text-sm font-medium px-2 relative z-10 text-center leading-relaxed">{cfg.subtitle}</p>
          </div>

          {/* Role Selector Tabs */}
          <div className="bg-[#f1f5f9] p-1.5 rounded-2xl flex items-center gap-1 mb-8">
            {(["student", "teacher", "admin"] as Role[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => handleRoleChange(r)}
                className={`flex-1 py-3 text-center rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  role === r ? "bg-white text-primary shadow-sm" : "text-primary/40 hover:text-primary/60 hover:bg-white/50"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-2xl p-4 mb-5">
              <AlertCircle className="text-red-500 shrink-0 w-4 h-4 mt-0.5" />
              <p className="text-red-600 text-xs font-bold leading-relaxed">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-[.2em] text-primary/40 ml-4">
                {role === "admin" ? "Admin Email" : "ID / Email"}
              </label>
              <div className="relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/30" size={18} />
                <input
                  type={role === "admin" ? "email" : "text"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={cfg.placeholder}
                  className="w-full bg-[#f8fafc] border border-primary/10 rounded-2xl pl-14 pr-6 py-4 text-sm font-bold text-primary focus:ring-2 focus:ring-accent transition-all outline-none"
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
                  className="w-full bg-[#f8fafc] border border-primary/10 rounded-2xl pl-14 pr-14 py-4 text-sm font-bold text-primary focus:ring-2 focus:ring-accent transition-all outline-none"
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

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-5 mt-2 rounded-2xl text-white font-black uppercase tracking-[.3em] text-xs shadow-xl transition-all hover:-translate-y-0.5 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed ${
                role === "student" ? "bg-accent" : role === "teacher" ? "bg-primary" : "bg-gray-900"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Signing In...
                </>
              ) : (
                `Sign In to ${cfg.title}`
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs font-bold text-primary/40">
            Don&apos;t have access?{" "}
            <a
              href="https://wa.me/919784802941?text=Namaste%2C%20I%20need%20portal%20access%20for%20Sanskar%20Vidya%20Bhawan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline decoration-2 cursor-pointer hover:text-green-600 transition-colors"
            >Contact Administration</a>
          </p>
        </div>
      </div>
    </main>
  );
}
