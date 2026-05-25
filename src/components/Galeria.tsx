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
  { category: "hair", color: "from-amber-900 to-amber-700", label: "Balayage" },
  { category: "hair", color: "from-stone-900 to-stone-600", label: "Corte" },
  { category: "nails", color: "from-rose-300 to-rose-200", label: "Manicura" },
  { category: "lashes", color: "from-gray-900 to-gray-700", label: "Pestañas" },
  { category: "skin", color: "from-amber-100 to-amber-50", label: "Facial" },
  { category: "spa", color: "from-emerald-900 to-emerald-700", label: "Masaje" },
  { category: "hair", color: "from-stone-800 to-stone-500", label: "Trenzas" },
  { category: "nails", color: "from-pink-400 to-pink-200", label: "Pedicura" },
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
            Arte en cada detalle.
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Un diario visual de nuestro trabajo — cada detalle intencional, cada acabado impecable.
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl overflow-hidden aspect-square bg-gradient-to-br ${item.color} flex items-center justify-center group cursor-pointer ${
                idx === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <span className="font-playfair text-white/80 text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                {item.label}
              </span>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
