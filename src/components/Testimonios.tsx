"use client";

import { Star } from "lucide-react";

const testimonios = [
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
  return (
    <section className="py-24 bg-[#FFF8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#C9A96E] text-sm tracking-[0.2em] font-medium uppercase">
            Testimonials
          </span>
          <h2 className="font-playfair text-4xl lg:text-5xl text-[#1A1A1A] font-bold mt-4 mb-4">
            What they say.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonios.map((t, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-gray-100"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} className="text-[#C9A96E] fill-[#C9A96E]" />
                ))}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
                &ldquo;{t.texto}&rdquo;
              </p>

              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-[#1A1A1A]">{t.nombre}</span>
                <span className="text-xs text-gray-400">{t.tipo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
