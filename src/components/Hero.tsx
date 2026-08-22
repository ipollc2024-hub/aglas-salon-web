"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const fadeElements = document.querySelectorAll(".fade-in");
    fadeElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero" />

      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#C9A96E] rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#C9A96E]/50 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Tag */}
        <div className="fade-in inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A96E]/30 text-[#C9A96E] text-sm mb-8">
          <Sparkles size={14} />
          <span>PUERTO RICO · BELLEZA CON PROPÓSITO</span>
        </div>

        {/* Title */}
        <h1 className="fade-in font-playfair text-5xl sm:text-6xl lg:text-8xl text-white font-bold leading-tight mb-6">
          Realza tu belleza.
          <br />
          <span className="text-[#C9A96E]">Vive la experiencia Agla’s.</span>
        </h1>

        {/* Subtitle */}
        <p className="fade-in text-white/70 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          Cabello, uñas, pedicuras y manicuras, faciales, spa, pestañas, tratamientos corporales,
          maderoterapia, drenajes linfáticos, depilación láser y con cera, aparatología y más; con
          atención personalizada y más de 25 años de experiencia. Tu bienestar comienza aquí.
        </p>

        {/* CTA Buttons */}
        <div className="fade-in flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <a
            href="/reservar"
            className="inline-flex items-center gap-2 bg-[#C9A96E] hover:bg-[#B8955A] text-white px-8 py-4 rounded-full text-base font-semibold transition-all hover:shadow-xl hover:shadow-[#C9A96E]/20"
          >
            RESERVAR CITA
            <ArrowRight size={18} />
          </a>
          <a
            href="/#servicios"
            className="inline-flex items-center gap-2 border border-white/20 text-white/90 hover:border-[#C9A96E] hover:text-[#C9A96E] px-8 py-4 rounded-full text-base font-semibold transition-all"
          >
            VER SERVICIOS
          </a>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="fade-in grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {[
            { number: "12K+", label: "CLIENTAS FELICES" },
            { number: "25+", label: "AÑOS DE EXPERIENCIA" },
            { number: "40K+", label: "SERVICIOS REALIZADOS" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-playfair text-3xl lg:text-4xl text-white font-bold mb-1">
                {stat.number}
              </div>
              <div className="text-[#C9A96E]/80 text-xs tracking-widest font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
