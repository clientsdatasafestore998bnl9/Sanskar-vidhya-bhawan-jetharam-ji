"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Megaphone } from "lucide-react";
import { supabase } from "@/lib/supabase";

const defaultAnnouncements = [
  "Admissions Open for Session 2026-27 - Register Your Interest Now!",
  "New High-Tech Computer Lab Inaugurated with Latest Systems.",
  "Sanskar Vidya Bhavan tops the district in RBSE Board Results again!",
  "Enroll now for English Medium Wing - Nursery to 8th Class.",
  "Hindi Medium Wing Admissions open for 1st to 10th Class.",
];

export default function Ticker() {
  const [announcements, setAnnouncements] = useState<string[]>(defaultAnnouncements);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const { data, error } = await supabase
          .from('notices')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);
        
        if (!error && data && data.length > 0) {
          const fetchedNotices = data.map((n: any) => n.title || n.message || "Important Update from School");
          setAnnouncements(fetchedNotices);
        }
      } catch (err) {
        console.error("Error fetching notices:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  if (loading) return <div className="bg-primary text-white py-2 overflow-hidden border-y border-white/10 relative z-20"><div className="h-5"></div></div>;

  return (
    <div className="bg-primary text-white py-2 overflow-hidden border-y border-white/10 relative z-20">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-3">
        {/* Animated Megaphone Icon */}
        <div className="flex-shrink-0 z-30 bg-primary pr-2 hidden sm:flex items-center gap-2 text-accent">
          <motion.div
            animate={{ rotate: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
          >
            <Megaphone size={16} className="fill-accent/20" />
          </motion.div>
          <span className="text-[10px] font-black uppercase tracking-widest hidden lg:block">Latest:</span>
        </div>

        {/* Scrolling Content */}
        <div className="relative flex-1 overflow-hidden mask-edges-horizontal">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "-100%" }}
            transition={{
              repeat: Infinity,
              duration: announcements.length * 6, // dynamic duration based on count
              ease: "linear",
            }}
            className="whitespace-nowrap flex gap-12 text-[12px] lg:text-sm font-bold text-white/90"
          >
            {announcements.map((text, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                {text}
              </span>
            ))}
            {/* Duplicate for seamless looping */}
            {announcements.map((text, i) => (
              <span key={`dup-${i}`} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                {text}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
