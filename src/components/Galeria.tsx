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
  { category: "hair", foto: "/galeria/servicio-01.jpg", label: "Balayage" },
  { category: "hair", foto: "/galeria/servicio-02.jpg", label: "Color" },
  { category: "hair", foto: "/galeria/servicio-03.jpg", label: "Peinado" },
  { category: "hair", foto: "/galeria/servicio-04.jpg", label: "Trenzas" },
  { category: "hair", foto: "/galeria/servicio-05.jpg", label: "Corte" },
  { category: "hair", foto: "/galeria/servicio-06.jpg", label: "Crochet" },
  { category: "hair", foto: "/galeria/servicio-07.jpg", label: "Extensiones" },
  { category: "hair", foto: "/galeria/servicio-08.jpg", label: "Decoloración" },
  { category: "nails", foto: "/galeria/servicio-09.jpg", label: "Manicura" },
  { category: "nails", foto: "/galeria/servicio-10.jpg", label: "Pedicura" },
  { category: "nails", foto: "/galeria/servicio-11.jpg", label: "Uñas Acrílicas" },
  { category: "nails", foto: "/galeria/servicio-12.jpg", label: "Diseño" },
  { category: "nails", foto: "/galeria/servicio-13.jpg", label: "Manicura" },
  { category: "nails", foto: "/galeria/servicio-14.jpg", label: "Esmaltado" },
  { category: "lashes", foto: "/galeria/servicio-15.jpg", label: "Extensiones" },
  { category: "lashes", foto: "/galeria/servicio-16.jpg", label: "Pestañas" },
  { category: "lashes", foto: "/galeria/servicio-17.jpg", label: "Lifting" },
  { category: "skin", foto: "/galeria/servicio-18.jpg", label: "Limpieza Facial" },
  { category: "skin", foto: "/galeria/servicio-19.jpg", label: "Dermaplaning" },
  { category: "skin", foto: "/galeria/servicio-20.jpg", label: "Tratamiento" },
  { category: "skin", foto: "/galeria/servicio-21.jpg", label: "Facial" },
  { category: "skin", foto: "/galeria/servicio-22.jpg", label: "Mascarilla" },
  { category: "spa", foto: "/galeria/servicio-23.jpg", label: "Masaje" },
  { category: "spa", foto: "/galeria/servicio-24.jpg", label: "Maderoterapia" },
  { category: "spa", foto: "/galeria/servicio-25.jpg", label: "Drenaje Linfático" },
  { category: "spa", foto: "/galeria/servicio-26.jpg", label: "Corporal" },
  { category: "spa", foto: "/galeria/servicio-27.jpg", label: "Aparatología" },
  { category: "spa", foto: "/galeria/servicio-28.jpg", label: "Reducción" },
  { category: "hair", foto: "/galeria/servicio-29.jpg", label: "Trenzas" },
  { category: "hair", foto: "/galeria/servicio-30.jpg", label: "Peinado" },
  { category: "nails", foto: "/galeria/servicio-31.jpg", label: "Uñas" },
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
            Resultados Reales.
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
        <div className="columns-2 md:columns-4 gap-4 space-y-4">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className="break-inside-avoid rounded-2xl overflow-hidden group cursor-pointer relative"
            >
              <img
                src={item.foto}
                alt={item.label}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-end p-4">
                <span className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
