"use client";

import { Star } from "lucide-react";
import { useState } from "react";

interface Review {
  nombre: string;
  texto: string;
  rating: number;
  foto: string;
}

const reviews: Review[] = [
  { nombre: "Clienta", texto: "Excelente servicio, súper recomendado. Salí hermosa 💕", rating: 5, foto: "/resenas/review-09.jpg" },
  { nombre: "Clienta", texto: "Me encantó el resultado. Volveré sin duda.", rating: 5, foto: "/resenas/review-10.jpg" },
  { nombre: "Clienta", texto: "Atención increíble y un trabajo espectacular. 10/10.", rating: 5, foto: "/resenas/review-11.jpg" },
  { nombre: "Clienta", texto: "Salió mejor de lo que esperaba. Muy feliz con el servicio.", rating: 5, foto: "/resenas/review-12.jpg" },
  { nombre: "Clienta", texto: "Mano firme y detalles hermosos. Quedé enamorada.", rating: 5, foto: "/resenas/review-13.jpg" },
  { nombre: "Clienta", texto: "Súper profesional y el ambiente bien relajante. Me encantó.", rating: 5, foto: "/resenas/review-14.jpg" },
  { nombre: "Clienta", texto: "Resultado hermoso y atención de primera. Recomendado 100%.", rating: 5, foto: "/resenas/review-15.jpg" },
  { nombre: "Clienta", texto: "Quedé fascinada con el trabajo. Gracias por tanto talento.", rating: 5, foto: "/resenas/review-16.jpg" },
  { nombre: "Clienta", texto: "Me sentí como en casa. Servicio de calidad y detalle único.", rating: 5, foto: "/resenas/review-17.jpg" },
  { nombre: "Clienta", texto: "Hermoso trabajo, superó mis expectativas. Repetiré pronto.", rating: 5, foto: "/resenas/review-18.jpg" },
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {reviews.map((r, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden group cursor-pointer hover:shadow-lg transition-all"
                onClick={() => setSelectedReview(r)}
              >
                <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                  <img
                    src={r.foto}
                    alt={`Reseña de ${r.nombre}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} size={14} className="text-[#C9A96E] fill-[#C9A96E]" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 italic line-clamp-3">
                    &ldquo;{r.texto}&rdquo;
                  </p>
                  <span className="font-semibold text-sm text-[#1A1A1A]">{r.nombre}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedReview && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setSelectedReview(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-[4/3] bg-gray-100">
              <img
                src={selectedReview.foto}
                alt={`Reseña de ${selectedReview.nombre}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: selectedReview.rating }).map((_, i) => (
                  <Star key={i} size={16} className="text-[#C9A96E] fill-[#C9A96E]" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                &ldquo;{selectedReview.texto}&rdquo;
              </p>
              <span className="font-semibold text-[#1A1A1A]">{selectedReview.nombre}</span>
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
