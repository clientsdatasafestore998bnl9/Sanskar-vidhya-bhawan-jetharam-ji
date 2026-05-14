"use client";
import React, { useState, useEffect } from "react";
import { Download, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Only show if the app is NOT running in Standalone (PWA) mode!
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    if (isStandalone) return;

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

  // ONLY show on main website root (/), nowhere else
  if (pathname !== '/' || !isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[99999] pointer-events-none w-[90%] max-w-[340px]"
      >
        <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.3)] p-2 pl-3 flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden border border-slate-200">
                <img src="/logo.png" alt="App Logo" className="w-5 h-5 object-contain" />
             </div>
             <div className="flex flex-col justify-center">
                <span className="text-[14px] font-black text-white leading-none tracking-tight">SVB App</span>
             </div>
          </div>
          
          <div className="flex items-center gap-1.5 pr-1">
             <button 
               onClick={handleInstallClick} 
               className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-1.5"
             >
                <Download size={12} /> Install
             </button>
             <button onClick={() => setIsVisible(false)} className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-white rounded-full transition-colors bg-slate-800">
                <X size={12} strokeWidth={3} />
             </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
