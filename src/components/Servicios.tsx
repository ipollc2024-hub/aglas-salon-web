"use client";

import { useState } from "react";
import { Clock, DollarSign, ArrowRight } from "lucide-react";
import { servicios, categorias, getServiciosPorCategoria } from "@/data/servicios";

export default function Servicios() {
  const [activeCategoria, setActiveCategoria] = useState(categorias[0]);

  const filtered = getServiciosPorCategoria(activeCategoria);

  return (
    <section id="servicios" className="py-24 bg-[#FFF8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#C9A96E] text-sm tracking-[0.2em] font-medium uppercase">
            Servicios
          </span>
          <h2 className="font-playfair text-4xl lg:text-5xl text-[#1A1A1A] font-bold mt-4 mb-4">
            Descubre nuestros servicios.
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Desde el glow diario hasta momentos únicos, cada servicio está diseñado para ti — con técnica, tiempo y detalle.
          </p>
        </div>

        {/* Categorías Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategoria(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategoria === cat
                  ? "bg-[#1A1A1A] text-white"
                  : "bg-white text-[#1A1A1A] hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Servicios Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((servicio) => (
            <div
              key={servicio.id}
              className="group bg-white rounded-2xl p-6 card-hover border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-playfair text-lg font-bold text-[#1A1A1A]">
                  {servicio.nombre}
                </h3>
                <div className="gradient-gold text-white text-sm font-bold px-3 py-1 rounded-full">
                  {servicio.precioDesde === 0 ? "Evaluación" : `$${servicio.precioDesde}`}
                </div>
              </div>

              <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                {servicio.descripcion}
              </p>

              <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {servicio.duracion}
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign size={14} />
                  {servicio.precioDesde === 0 ? "Según evaluación" : `Desde $${servicio.precioDesde}`}
                </span>
              </div>

              <a
                href={`/reservar?servicio=${servicio.id}`}
                className="inline-flex items-center gap-2 text-[#C9A96E] text-sm font-semibold hover:text-[#B8955A] transition-colors"
              >
                RESERVAR <ArrowRight size={14} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
