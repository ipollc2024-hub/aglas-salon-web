"use client";

import { Check, Crown, Star, Sparkles } from "lucide-react";

const planes = [
  {
    nombre: "Bronze",
    precio: 49,
    color: "from-amber-600 to-amber-400",
    beneficios: ["10% descuento en servicios", "Prioridad en reservas", "1 facial básico gratis al año"],
    destacado: false,
    icon: Star,
  },
  {
    nombre: "Silver",
    precio: 99,
    color: "from-gray-400 to-gray-300",
    beneficios: ["15% descuento en servicios", "Prioridad en reservas", "2 faciales básicos gratis al año", "1 masaje 30min gratis al mes", "10% en productos"],
    destacado: false,
    icon: Sparkles,
  },
  {
    nombre: "Gold",
    precio: 179,
    color: "from-[#C9A96E] to-amber-300",
    beneficios: ["20% descuento en servicios", "Reserva VIP exclusiva", "4 faciales avanzados al año", "2 masajes 45min gratis al mes", "15% en productos", "1 tratamiento capilar gratis", "Cita mensual garantizada"],
    destacado: true,
    icon: Crown,
  },
  {
    nombre: "VIP Queen",
    precio: 349,
    color: "from-gray-900 to-gray-700",
    beneficios: ["25% descuento en servicios", "Reserva VIP 24/7", "Faciales ilimitados", "Masajes ilimitados", "20% en productos", "Todos los tratamientos capilares", "Cita semanal garantizada", "Traslado cortesía", "Welcome gift exclusivo"],
    destacado: false,
    icon: Crown,
  },
];

export default function Membresias() {
  return (
    <section id="membresias" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#C9A96E] text-sm tracking-[0.2em] font-medium uppercase">
            Membership
          </span>
          <h2 className="font-playfair text-4xl lg:text-5xl text-[#1A1A1A] font-bold mt-4 mb-4">
            The circle of beauty.
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Month-to-month memberships with curated perks, priority access, and exclusive pricing for the women who make us part of their ritual.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {planes.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.nombre}
                className={`relative rounded-2xl p-6 border transition-all hover:-translate-y-1 ${
                  plan.destacado
                    ? "border-[#C9A96E] shadow-xl shadow-[#C9A96E]/10"
                    : "border-gray-100"
                }`}
              >
                {plan.destacado && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C9A96E] text-white text-xs font-bold px-4 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}

                <div className="text-center mb-6">
                  <Icon
                    size={28}
                    className={`mx-auto mb-3 ${plan.destacado ? "text-[#C9A96E]" : "text-gray-400"}`}
                  />
                  <h3 className="font-playfair text-xl font-bold text-[#1A1A1A]">
                    {plan.nombre}
                  </h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold text-[#1A1A1A]">${plan.precio}</span>
                    <span className="text-gray-400 text-sm">/mes</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.beneficios.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check size={16} className="mt-0.5 text-[#C9A96E] shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-full text-sm font-semibold transition-all ${
                    plan.destacado
                      ? "bg-[#C9A96E] text-white hover:bg-[#B8955A]"
                      : "border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white"
                  }`}
                >
                  {plan.destacado ? "GET GOLD" : "CHOOSE PLAN"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
