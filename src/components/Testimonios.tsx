"use client";

import { Star } from "lucide-react";
import { useState } from "react";

interface Review {
  nombre: string;
  texto: string;
  rating: number;
  tipo: string;
  foto?: string;
}

const reviews: Review[] = [
  {
    nombre: "María Rodríguez",
    texto: "¡El mejor salón de Cidra! Desde que fui la primera vez no he ido a otro lugar. Isamary hace magia con los faciales y el ambiente es súper relajante.",
    rating: 5,
    tipo: "Facial",
  },
  {
    nombre: "Ana G.",
    texto: "Ericson es un artista con el cabello. Me hizo un balayage espectacular y mi pelo quedó súper saludable. 100% recomendado.",
    rating: 5,
    tipo: "Cabello",
  },
  {
    nombre: "Laura M.",
    texto: "Las uñas me quedaron preciosas y la pedicura spa es otro nivel. El lugar es hermoso, se siente como un spa de verdad.",
    rating: 5,
    tipo: "Uñas",
  },
];

export default function Testimonios() {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  return (
    <>
      <section id="resenas" className="py-24 bg-[#FFF8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#C9A96E] text-sm tracking-[0.2em] font-medium uppercase">
              Reseñas
            </span>
            <h2 className="font-playfair text-4xl lg:text-5xl text-[#1A1A1A] font-bold mt-4 mb-4">
              Lo que dicen ellas.
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Resultados reales de clientas reales. Cada historia nos llena de orgullo.
            </p>
          </div>

          {/* Reviews Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {reviews.map((r, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden group cursor-pointer hover:shadow-lg transition-all"
                onClick={() => setSelectedReview(r)}
              >
                {/* Foto del resultado */}
                <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-100 flex items-center justify-center overflow-hidden">
                  {r.foto ? (
                    <img
                      src={r.foto}
                      alt={r.nombre}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="text-center p-4">
                      <Star size={32} className="text-[#C9A96E] mx-auto mb-2" />
                      <span className="text-gray-400 text-sm">Foto próximamente</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} size={14} className="text-[#C9A96E] fill-[#C9A96E]" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 italic line-clamp-3">
                    &ldquo;{r.texto}&rdquo;
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-[#1A1A1A]">{r.nombre}</span>
                    <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full">{r.tipo}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal de review */}
      {selectedReview && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setSelectedReview(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedReview.foto && (
              <div className="aspect-[4/3] bg-gray-100">
                <img
                  src={selectedReview.foto}
                  alt={selectedReview.nombre}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: selectedReview.rating }).map((_, i) => (
                  <Star key={i} size={16} className="text-[#C9A96E] fill-[#C9A96E]" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                &ldquo;{selectedReview.texto}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#1A1A1A]">{selectedReview.nombre}</span>
                <span className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full">{selectedReview.tipo}</span>
              </div>
              <button
                onClick={() => setSelectedReview(null)}
                className="mt-6 w-full py-2 bg-[#1A1A1A] text-white rounded-xl text-sm hover:bg-[#2A2A2A] transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
