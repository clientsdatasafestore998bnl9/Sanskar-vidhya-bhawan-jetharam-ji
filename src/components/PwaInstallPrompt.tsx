"use client";
import React, { useState, useEffect } from "react";
import { Download, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Ensure the prompt always visually appears for the user (even on testing http or iOS)
    const timer = setTimeout(() => setIsVisible(true), 2500);

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsVisible(false);
      }
      setDeferredPrompt(null);
    } else {
      // Fallback for iOS / Safari / Local HTTP Testing where API is blocked
      alert("Native Installation Required:\n\n📱 iPhone/iPad: Tap the 'Share' button at the bottom of Safari, then tap 'Add to Home Screen'.\n\n🤖 Android / PC: Tap the Browser Menu (3 dots) and select 'Install App' or 'Add to Home Screen'.");
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-4 left-4 right-4 z-[99999] lg:hidden pointer-events-none"
      >
        <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-4 flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-lg border border-indigo-500/50">SVB</div>
            <div className="flex flex-col">
              <span className="text-sm font-black text-white leading-none mb-1">Install SVB App</span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Fast & Native Experience</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleInstallClick} 
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors shadow-lg shadow-indigo-600/30 flex items-center gap-2"
            >
              <Download size={14} /> Install
            </button>
            <button onClick={() => setIsVisible(false)} className="text-slate-500 hover:text-white transition-colors bg-slate-800 p-1.5 rounded-lg border border-slate-700">
              <X size={14} />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
