import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Camera, Image as ImageIcon, PlayCircle, Star } from "lucide-react";

const gallerySections = [
  {
    category: "Independence Day",
    images: [
      { id: 1, src: "/g1.jpg", alt: "March Past & Parade" },
      { id: 2, src: "/g2.jpg", alt: "Patriotic Performance" }
    ]
  },
  {
    category: "Republic Day",
    images: [
      { id: 3, src: "/g3.jpg", alt: "Flag Hoisting Ceremony" }
    ]
  },
  {
    category: "Class Room",
    images: [
      { id: 4, src: "/g6.jpg", alt: "Interactive Learning Session" },
      { id: 5, src: "/students.jpg", alt: "Library & Study" }
    ]
  },
  {
    category: "Campus",
    images: [
      { id: 6, src: "/hero.jpg", alt: "Front Architecture" },
      { id: 7, src: "/hero2.jpg", alt: "Campus Environment" }
    ]
  },
  {
    category: "Raksha Bandhan",
    images: [
      { id: 8, src: "/g5.jpg", alt: "Rakhi Celebration & Traditions" }
    ]
  },
  {
    category: "Festivals",
    images: [
      { id: 9, src: "/about1.jpg", alt: "Cultural Festival Celebrations" }
    ]
  },
  {
    category: "Sports",
    images: [
      { id: 10, src: "/g4.jpg", alt: "Annual Sports Meet & Activities" }
    ]
  }
];

export default function GalleryPage() {
  return (
    <main className="relative min-h-[100svh] bg-[#f8fafc]">
      <Navbar />

      {/* Spacer for Navbar */}
      <div className="h-16 lg:h-24 bg-primary" />

      {/* 1. Hero Section */}
      <section className="bg-primary pt-6 pb-10 px-4 relative overflow-hidden">
        {/* Abstract shapes for premium feel */}
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
            A visual journey through the vibrant life, academic excellence, and memorable moments at Sanskar Vidya Bhawan.
          </p>
        </div>
      </section>

      {/* 2. Gallery Masonry Grid */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 mt-8 lg:mt-12 pb-24">
        
        {/* Fragmented Categories Grid */}
        <div className="flex flex-col gap-12 lg:gap-16">
          {gallerySections.map((section, idx) => (
             <div key={idx}>
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6">
                   <h2 className="text-lg lg:text-2xl font-black text-primary uppercase tracking-widest whitespace-nowrap">
                     {section.category}
                   </h2>
                   <div className="h-[2px] w-full bg-gradient-to-r from-primary/10 to-transparent"></div>
                </div>

                {/* Dense Small Image Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 lg:gap-4">
                  {section.images.map((img) => (
                    <div 
                      key={img.id} 
                      className="relative rounded-[1rem] overflow-hidden group shadow-md hover:shadow-xl transition-all duration-500 bg-white border border-primary/5 cursor-pointer aspect-square"
                    >
                      <img 
                        src={img.src} 
                        alt={img.alt} 
                        loading="lazy"
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                      />
                      
                      {/* Glassmorphic Caption restricted to smaller box sizes */}
                      <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3 text-center">
                         <div className="scale-90 group-hover:scale-100 transition-transform duration-300">
                           <h3 className="text-white font-black text-[10px] sm:text-xs uppercase tracking-wide leading-tight px-2">
                             {img.alt}
                           </h3>
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
          ))}
        </div>
      </section>

      {/* 3. Call to Action Banner inside Gallery */}
      <section className="bg-primary/5 py-16 lg:py-24 border-t border-primary/10">
         <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-2xl lg:text-4xl font-black text-primary uppercase tracking-tighter mb-4">
              Want to see <span className="text-accent underline decoration-primary/20 underline-offset-8">more?</span>
            </h2>
            <p className="text-primary/70 text-sm lg:text-base font-medium mb-8">
              Schedule a physical campus tour today and explore our world-class facilities in person.
            </p>
            <a href="/contact" className="inline-block bg-primary text-white hover:bg-accent rounded-full px-8 py-4 font-black text-sm uppercase tracking-widest transition-all shadow-xl hover:shadow-accent/30 hover:-translate-y-1">
              Book Campus Tour
            </a>
         </div>
      </section>

      <Footer />
    </main>
  );
}
