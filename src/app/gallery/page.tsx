"use client";

import React, { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Camera, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

// ============================================================
// GALLERY DATA — Add/remove images here easily
// ============================================================
const gallerySections = [
  {
    category: "Independence Day",
    emoji: "🇮🇳",
    images: [
      { id: 1,  src: "/g1.jpg",       alt: "March Past & Parade"          },
      { id: 2,  src: "/g2.jpg",       alt: "Patriotic Performance"         },
    ],
  },
  {
    category: "Republic Day",
    emoji: "🎖️",
    images: [
      { id: 3,  src: "/g3.jpg",       alt: "Flag Hoisting Ceremony"        },
    ],
  },
  {
    category: "Classroom",
    emoji: "📚",
    images: [
      { id: 4,  src: "/g6.jpg",       alt: "Interactive Learning Session"  },
      { id: 5,  src: "/students.jpg", alt: "Students in Class"             },
    ],
  },
  {
    category: "Campus",
    emoji: "🏫",
    images: [
      { id: 6,  src: "/hero.jpg",     alt: "Front Architecture"            },
      { id: 7,  src: "/hero2.jpg",    alt: "Campus Environment"            },
      { id: 8,  src: "/build1.jpeg",  alt: "School Building Wing A"        },
      { id: 9,  src: "/build2.jpeg",  alt: "School Building Wing B"        },
      { id: 10, src: "/build3.jpeg",  alt: "School Building Wing C"        },
    ],
  },
  {
    category: "Raksha Bandhan",
    emoji: "🪡",
    images: [
      { id: 11, src: "/g5.jpg",       alt: "Rakhi Celebration"             },
    ],
  },
  {
    category: "Festivals & Events",
    emoji: "🎉",
    images: [
      { id: 12, src: "/about1.jpg",   alt: "Cultural Festival"             },
      { id: 13, src: "/about2.jpg",   alt: "School Annual Event"           },
    ],
  },
  {
    category: "Sports",
    emoji: "🏆",
    images: [
      { id: 14, src: "/g4.jpg",       alt: "Annual Sports Meet"            },
    ],
  },
];

// Flat list for lightbox navigation
const allImages = gallerySections.flatMap((s) => s.images);

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({
    open: false,
    index: 0,
  });

  const openLightbox = (globalIndex: number) => {
    setLightbox({ open: true, index: globalIndex });
  };

  const closeLightbox = () => setLightbox({ open: false, index: 0 });

  const prev = () =>
    setLightbox((l) => ({ ...l, index: (l.index - 1 + allImages.length) % allImages.length }));

  const next = () =>
    setLightbox((l) => ({ ...l, index: (l.index + 1) % allImages.length }));

  // Handle keyboard navigation
  React.useEffect(() => {
    if (!lightbox.open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "Escape")     closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox.open, lightbox.index]);

  // Build a map: image.id → globalIndex in allImages
  const idToIndex: Record<number, number> = {};
  allImages.forEach((img, i) => { idToIndex[img.id] = i; });

  return (
    <main className="relative min-h-[100svh] bg-[#f8fafc]">
      <Navbar />
      <div className="h-16 lg:h-24 bg-primary" />

      {/* Hero */}
      <section className="bg-primary pt-6 pb-10 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="max-w-7xl mx-auto relative z-10 text-center flex flex-col items-center">
          <div className="inline-flex w-16 h-16 bg-accent/20 rounded-full items-center justify-center mb-6 text-accent border border-accent/30 shadow-[0_0_30px_rgba(255,200,0,0.15)]">
            <Camera size={32} />
          </div>
          <h1 className="text-4xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-4">
            Our <span className="text-accent">Gallery</span>
          </h1>
          <p className="text-white/60 font-medium text-xs lg:text-base max-w-2xl mt-4 leading-relaxed">
            A visual journey through the vibrant life, academic excellence, and memorable moments at Sanskar Vidya Bhavan.
          </p>
          {/* Stats row */}
          <div className="flex items-center gap-6 mt-8">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black text-accent">{allImages.length}+</span>
              <span className="text-white/40 text-[9px] font-bold uppercase tracking-widest">Photos</span>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black text-accent">{gallerySections.length}</span>
              <span className="text-white/40 text-[9px] font-bold uppercase tracking-widest">Categories</span>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black text-accent">2024</span>
              <span className="text-white/40 text-[9px] font-bold uppercase tracking-widest">Session</span>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Sections */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 mt-10 lg:mt-16 pb-24">
        <div className="flex flex-col gap-14 lg:gap-20">
          {gallerySections.map((section) => (
            <div key={section.category}>
              {/* Section Header */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-2xl">{section.emoji}</span>
                <h2 className="text-lg lg:text-2xl font-black text-primary uppercase tracking-widest whitespace-nowrap">
                  {section.category}
                </h2>
                <div className="h-[2px] w-full bg-gradient-to-r from-primary/15 to-transparent rounded-full" />
                <span className="text-[10px] font-black text-primary/30 uppercase tracking-widest whitespace-nowrap shrink-0">
                  {section.images.length} photo{section.images.length > 1 ? "s" : ""}
                </span>
              </div>

              {/* Image Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 lg:gap-4">
                {section.images.map((img) => (
                  <div
                    key={img.id}
                    onClick={() => openLightbox(idToIndex[img.id])}
                    className="relative rounded-2xl overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-500 bg-white border border-primary/5 cursor-pointer aspect-square"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center gap-2">
                      <ZoomIn className="text-accent w-6 h-6 scale-75 group-hover:scale-100 transition-transform duration-300" />
                      <h3 className="text-white font-black text-[9px] sm:text-[10px] uppercase tracking-wide leading-tight">
                        {img.alt}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-primary/5 py-16 lg:py-24 border-t border-primary/10">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-2xl lg:text-4xl font-black text-primary uppercase tracking-tighter mb-4">
            Want to see <span className="text-accent underline decoration-primary/20 underline-offset-8">more?</span>
          </h2>
          <p className="text-primary/70 text-sm lg:text-base font-medium mb-8">
            Schedule a physical campus tour today and explore our world-class facilities in person.
          </p>
          <Link
            href="/contact#send-message"
            className="inline-block bg-primary text-white hover:bg-accent rounded-full px-8 py-4 font-black text-sm uppercase tracking-widest transition-all shadow-xl hover:shadow-accent/30 hover:-translate-y-1"
          >
            Book Campus Tour
          </Link>
        </div>
      </section>

      <Footer />

      {/* ============ LIGHTBOX ============ */}
      {lightbox.open && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Counter */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
            <span className="text-white text-xs font-black uppercase tracking-widest">
              {lightbox.index + 1} / {allImages.length}
            </span>
          </div>

          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 z-20 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all"
          >
            <X size={22} />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-3 lg:left-8 z-20 w-12 h-12 bg-white/10 hover:bg-accent rounded-full flex items-center justify-center text-white transition-all hover:text-primary"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Image */}
          <div
            className="relative max-w-5xl w-full max-h-[80vh] rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={allImages[lightbox.index].src}
              alt={allImages[lightbox.index].alt}
              className="w-full h-full object-contain max-h-[78vh]"
            />
            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-6 py-5">
              <p className="text-white font-black text-sm uppercase tracking-widest">
                {allImages[lightbox.index].alt}
              </p>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-3 lg:right-8 z-20 w-12 h-12 bg-white/10 hover:bg-accent rounded-full flex items-center justify-center text-white transition-all hover:text-primary"
          >
            <ChevronRight size={24} />
          </button>

          {/* Thumbnail strip */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 px-4 overflow-x-auto">
            {allImages.map((img, i) => (
              <button
                key={img.id}
                onClick={(e) => { e.stopPropagation(); setLightbox({ open: true, index: i }); }}
                className={`w-10 h-10 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                  i === lightbox.index ? "border-accent scale-110" : "border-transparent opacity-50 hover:opacity-80"
                }`}
              >
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
