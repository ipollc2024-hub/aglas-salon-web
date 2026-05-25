"use client";

import { useState } from "react";
import { Sparkles, Scissors, Eye, Droplets, Wind } from "lucide-react";

const filters = [
  { label: "Todo", icon: null, category: "all" },
  { label: "Cabello", icon: Scissors, category: "hair" },
  { label: "Uñas", icon: Sparkles, category: "nails" },
  { label: "Pestañas", icon: Eye, category: "lashes" },
  { label: "Facial", icon: Droplets, category: "skin" },
  { label: "Spa", icon: Wind, category: "spa" },
];

const galleryItems = [
  { category: "nails", foto: "/galeria/uñas-01.jpg" },
  { category: "nails", foto: "/galeria/uñas-02.jpg" },
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
              <img
                src={item.foto}
                alt="Servicio"
                className="w-full h-auto block"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
