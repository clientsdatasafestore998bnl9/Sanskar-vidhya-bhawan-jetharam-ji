"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Only show splash screen once per session to ensure fast internal navigation
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    if (hasSeenSplash) {
      setShow(false);
      return;
    }

    // Only show splash screen if the app is running in Standalone (PWA) mode.
    // This prevents showing a 2.5s splash every time someone opens the web browser version.
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    
    // For pure debugging, you might remove this check, but best practice is standalone only.
    if (!isStandalone && process.env.NODE_ENV !== "development") {
      setShow(false);
      return;
    }

    const timer = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("hasSeenSplash", "true");
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
           initial={{ opacity: 1 }}
           exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
           className="fixed inset-0 z-[999999] bg-[#020617] flex flex-col items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center gap-6"
          >
            <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-[2rem] bg-indigo-600/20 border-2 border-indigo-500/30 flex items-center justify-center relative overflow-hidden backdrop-blur-xl shadow-[0_0_80px_rgba(79,70,229,0.3)]">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20" />
              <img src="/logo.png" alt="SVB Logo" className="w-16 h-16 lg:w-20 lg:h-20 object-contain relative z-10" />
            </div>

            <div className="flex flex-col items-center">
              <motion.h1 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                className="text-2xl lg:text-4xl font-black text-white uppercase tracking-widest text-center"
              >
                Sanskar Vidya <span className="text-indigo-400">Bhavan</span>
              </motion.h1>
              <motion.div 
                initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ delay: 0.6, duration: 0.8, ease: "circOut" }}
                className="h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent mt-4"
              />
              <motion.p
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.5 }}
                className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mt-3"
              >
                Education Hub
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
