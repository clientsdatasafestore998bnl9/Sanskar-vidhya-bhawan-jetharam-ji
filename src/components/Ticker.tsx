"use client";

import React from "react";
import { motion } from "framer-motion";
import { Megaphone } from "lucide-react";

const announcements = [
  "Admissions Open for Session 2024-25 - Limited Seats Available!",
  "New English Medium Wing Inaugurated with Smart Classes.",
  "Summer Vacation starts from 15th May to 30th June.",
  "Annual Sports Meet scheduled for next month - Register now!",
];

export default function Ticker() {
  return (
    <div className="bg-primary text-white py-2 overflow-hidden border-y border-white/10 relative z-20">
      <div className="max-w-7xl mx-auto px-4 flex items-center">
        {/* Fixed Label */}
        <div className="flex items-center gap-2 bg-accent text-primary px-3 py-1 rounded-md font-bold text-xs uppercase tracking-wider z-10 shadow-lg whitespace-nowrap">
          <Megaphone size={14} className="animate-pulse" />
          Updates
        </div>

        {/* Scrolling Content */}
        <div className="relative flex-1 overflow-hidden ml-4">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "-100%" }}
            transition={{
              repeat: Infinity,
              duration: 25,
              ease: "linear",
            }}
            className="whitespace-nowrap flex gap-12 text-sm font-medium text-white/90"
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
