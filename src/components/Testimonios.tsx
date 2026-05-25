"use client";

export default function Testimonios() {
  const fotos = [
    "/resenas/review-09.jpg",
    "/resenas/review-10.jpg",
    "/resenas/review-11.jpg",
    "/resenas/review-12.jpg",
    "/resenas/review-13.jpg",
    "/resenas/review-14.jpg",
    "/resenas/review-15.jpg",
    "/resenas/review-16.jpg",
    "/resenas/review-17.jpg",
    "/resenas/review-18.jpg",
  ];

  return (
    <section id="resenas" className="py-24 bg-[#FFF8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[#C9A96E] text-sm tracking-[0.2em] font-medium uppercase">
            Reseñas
          </span>
          <h2 className="font-playfair text-4xl lg:text-5xl text-[#1A1A1A] font-bold mt-4 mb-4">
            Lo que dicen ellas.
          </h2>
        </div>

        <div className="columns-2 md:columns-3 gap-4 space-y-4 max-w-5xl mx-auto">
          {fotos.map((foto, idx) => (
            <div key={idx} className="break-inside-avoid rounded-2xl overflow-hidden">
              <img
                src={foto}
                alt={`Reseña de clienta`}
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
