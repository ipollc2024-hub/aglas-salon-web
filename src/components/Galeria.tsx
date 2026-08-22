"use client";

import { useState } from "react";
import { Sparkles, Scissors, Eye, Droplets, Footprints, Waves, Zap, Play } from "lucide-react";

const filters = [
  { label: "Todo", icon: null, category: "all" },
  { label: "Cabello", icon: Scissors, category: "hair" },
  { label: "Uñas", icon: Sparkles, category: "nails" },
  { label: "Pestañas", icon: Eye, category: "lashes" },
  { label: "Facial", icon: Droplets, category: "skin" },
  { label: "Pedicura", icon: Footprints, category: "pedicure" },
  { label: "Cuerpo", icon: Waves, category: "body" },
  { label: "Depilación", icon: Zap, category: "hair-removal" },
  { label: "Videos", icon: Play, category: "videos" },
];

const galleryItems = [
  // Uñas (20)
  { category: "nails", foto: "/galeria/uñas-03.jpg" },
  { category: "nails", foto: "/galeria/uñas-04.jpg" },
  { category: "nails", foto: "/galeria/uñas-05.jpg" },
  { category: "nails", foto: "/galeria/uñas-06.jpg" },
  { category: "nails", foto: "/galeria/uñas-07.jpg" },
  { category: "nails", foto: "/galeria/uñas-08.jpg" },
  { category: "nails", foto: "/galeria/uñas-09.jpg" },
  { category: "nails", foto: "/galeria/uñas-10.jpg" },
  { category: "nails", foto: "/galeria/uñas-11.jpg" },
  { category: "nails", foto: "/galeria/uñas-12.jpg" },
  { category: "nails", foto: "/galeria/uñas-13.jpg" },
  { category: "nails", foto: "/galeria/uñas-14.jpg" },
  { category: "nails", foto: "/galeria/uñas-15.jpg" },
  { category: "nails", foto: "/galeria/uñas-16.jpg" },
  { category: "nails", foto: "/galeria/uñas-17.jpg" },
  { category: "nails", foto: "/galeria/uñas-18.jpg" },
  { category: "nails", foto: "/galeria/uñas-19.jpg" },
  { category: "nails", foto: "/galeria/uñas-20.jpg" },
  // Pestañas (7)
  { category: "lashes", foto: "/galeria/pestañas-01.jpg" },
  { category: "lashes", foto: "/galeria/pestañas-02.jpg" },
  { category: "lashes", foto: "/galeria/pestañas-03.jpg" },
  { category: "lashes", foto: "/galeria/pestañas-04.jpg" },
  { category: "lashes", foto: "/galeria/pestañas-05.jpg" },
  { category: "lashes", foto: "/galeria/pestañas-06.jpg" },
  { category: "lashes", foto: "/galeria/pestañas-07.jpg" },
  // Facial (6)
  { category: "skin", foto: "/galeria/facial-01.jpg" },
  { category: "skin", foto: "/galeria/facial-02.jpg" },
  { category: "skin", foto: "/galeria/facial-03.jpg" },
  { category: "skin", foto: "/galeria/facial-04.jpg" },
  { category: "skin", foto: "/galeria/facial-05.jpg" },
  { category: "skin", foto: "/galeria/facial-06.jpg" },
  // Cabello (7)
  { category: "hair", foto: "/galeria/cabello-01.jpg" },
  { category: "hair", foto: "/galeria/cabello-02.jpg" },
  { category: "hair", foto: "/galeria/cabello-03.jpg" },
  { category: "hair", foto: "/galeria/cabello-04.jpg" },
  { category: "hair", foto: "/galeria/cabello-05.jpg" },
  { category: "hair", foto: "/galeria/cabello-06.jpg" },
  { category: "hair", foto: "/galeria/cabello-07.jpg" },
  // Pedicura
  { category: "pedicure", foto: "/galeria/pedicura-01.png" },
  { category: "pedicure", foto: "/galeria/pedicura-02.jpg" },
  // Drenajes, maderoterapia y tratamientos corporales
  { category: "body", foto: "/galeria/cuerpo-01.jpg" },
  { category: "body", foto: "/galeria/cuerpo-02.jpg" },
  // Depilación láser y con cera
  { category: "hair-removal", foto: "/galeria/depilacion-laser-01.png" },
  { category: "hair-removal", foto: "/galeria/depilacion-cera-01.png" },
  { category: "videos", video: "/videos/pedicura-spa.mp4" },
  { category: "videos", video: "/videos/tratamiento-pies.mp4" },
  { category: "videos", video: "/videos/pedicura-nueva-01.mp4" },
  { category: "videos", video: "/videos/cabello-rubio.mp4" },
  { category: "videos", video: "/videos/corte-bob.mp4" },
];

export default function Galeria() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = activeFilter === "all"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <section id="galeria" className="py-24 bg-[#FFF8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[#C9A96E] text-sm tracking-[0.2em] font-medium uppercase">
            Galería
          </span>
          <h2 className="font-playfair text-4xl lg:text-5xl text-[#1A1A1A] font-bold mt-4 mb-4">
            Nuestro trabajo.
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Fotos reales de servicios realizados en AGLA&apos;S.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((f) => {
            const Icon = f.icon;
            return (
              <button
                key={f.label}
                onClick={() => setActiveFilter(f.category)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${
                  activeFilter === f.category
                    ? "bg-[#1A1A1A] text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {Icon && <Icon size={14} />}
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {filtered.map((item, idx) => (
            <div key={idx} className="break-inside-avoid rounded-2xl overflow-hidden">
              {item.video ? (
                <video controls playsInline preload="metadata" className="w-full h-auto block bg-black">
                  <source src={item.video} type="video/mp4" />
                </video>
              ) : (
                <img src={item.foto} alt="Servicio realizado en AGLA'S" className="w-full h-auto block" loading="lazy" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
