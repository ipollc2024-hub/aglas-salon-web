"use client";

import { useState } from "react";
import { Clock, X } from "lucide-react";
import { empleados } from "@/data/empleados";

export default function Equipo() {
  const [selected, setSelected] = useState<typeof empleados[0] | null>(null);

  return (
    <section id="equipo" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#C9A96E] text-sm tracking-[0.2em] font-medium uppercase">
            Nuestro Equipo
          </span>
          <h2 className="font-playfair text-4xl lg:text-5xl text-[#1A1A1A] font-bold mt-4 mb-4">
            Las manos detrás del brillo.
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Un equipo dedicado, elegido por su talento, calidez y profesionalismo.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {empleados.map((emp) => (
            <div
              key={emp.id}
              onClick={() => setSelected(emp)}
              className="group cursor-pointer text-center"
            >
              {/* Photo */}
              <div className="relative w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden gradient-dark">
                <span className="absolute inset-0 font-playfair text-4xl text-[#C9A96E] font-bold flex items-center justify-center">
                  {emp.nombre.split(" ").slice(0, 2).map((parte) => parte[0]).join("")}
                </span>
                <img
                  src={emp.foto}
                  alt={emp.nombre}
                  className="relative z-10 w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.display = 'none';
                  }}
                />
              </div>

              <h3 className="font-playfair text-xl font-bold text-[#1A1A1A] mb-1">
                {emp.nombre}
              </h3>
              <p className="text-[#C9A96E] text-sm font-medium mb-3">{emp.rol}</p>
              {emp.experiencia && (
                <p className="text-gray-400 text-xs mb-4">{emp.experiencia} de experiencia</p>
              )}

              <div className="flex flex-wrap justify-center gap-2">
                {emp.especialidades.slice(0, 3).map((esp) => (
                  <span
                    key={esp}
                    className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600"
                  >
                    {esp}
                  </span>
                ))}
                {emp.especialidades.length > 3 && (
                  <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-400">
                    +{emp.especialidades.length - 3}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-8 relative max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full gradient-dark overflow-hidden">
                <span className="absolute font-playfair text-2xl text-[#C9A96E] font-bold flex items-center justify-center w-20 h-20">
                  {selected.nombre.split(" ").slice(0, 2).map((parte) => parte[0]).join("")}
                </span>
                <img
                  src={selected.foto}
                  alt={selected.nombre}
                  className="relative z-10 w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
              <h3 className="font-playfair text-xl font-bold">{selected.nombre}</h3>
              <p className="text-[#C9A96E] text-sm">{selected.rol}</p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-gray-400 uppercase tracking-wider">
                Servicios y Duración
              </h4>
              {selected.servicios.map((svc, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                >
                  <span className="text-sm text-[#1A1A1A]">{svc.nombre}</span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock size={12} />
                    {svc.duracion}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 mt-3 border-t border-gray-100">
              <h4 className="font-semibold text-sm text-gray-400 uppercase tracking-wider mb-2">
                Horario
              </h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                {Object.entries(selected.horario || {}).map(([dia, horario]) => (
                  <div key={dia} className="flex justify-between py-1 border-b border-gray-50">
                    <span className="text-gray-500 capitalize">{dia}</span>
                    <span className={horario ? "text-gray-700" : "text-red-300"}>
                      {horario ? horario.inicio + " - " + horario.fin : "Cerrado"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="/reservar"
              className="mt-6 block text-center bg-[#C9A96E] hover:bg-[#B8955A] text-white px-6 py-3 rounded-full text-sm font-semibold transition-all"
            >
              RESERVAR CON {selected.nombre.split(" ")[0].toUpperCase()}
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
