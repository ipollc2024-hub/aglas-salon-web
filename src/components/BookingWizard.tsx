"use client";

import { useState, useCallback } from "react";
import { Check, ChevronLeft, ChevronRight, Clock, DollarSign, Plus } from "lucide-react";
import { servicios, categorias } from "@/data/servicios";
import { empleados } from "@/data/empleados";

const steps = ["Servicio", "Empleada", "Fecha & Hora", "Tus Datos", "Pago"];

const upsells: Record<string, { id: string; nombre: string; precio: number; descripcion: string }[]> = {
  default: [
    { id: "express-facial", nombre: "Facial Express 15min", precio: 25, descripcion: "Limpieza rápida + hidratación" },
    { id: "masaje-cuello", nombre: "Masaje de Cuello y Hombros 10min", precio: 20, descripcion: "Relajación adicional" },
    { id: "brillo-labial", nombre: "Brillo Labial Profesional", precio: 15, descripcion: "Hidratación y brillo natural" },
    { id: "exfoliacion-manos", nombre: "Exfoliación de Manos", precio: 18, descripcion: "Suavidad y renovación" },
    { id: "mascarilla-capilar", nombre: "Mascarilla Capilar Express", precio: 22, descripcion: "Hidratación intensiva" },
    { id: "aromatherapy", nombre: "Aromaterapia (Difusor + Aceite)", precio: 12, descripcion: "Experiencia sensorial adicional" },
  ],
};

type FormData = {
  servicio: string;
  empleado: string;
  fecha: string;
  hora: string;
  nombre: string;
  telefono: string;
  email: string;
  metodoPago: "ath" | "tarjeta" | null;
  upsells: string[];
};

export default function BookingWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>({
    servicio: "",
    empleado: "",
    fecha: "",
    hora: "",
    nombre: "",
    telefono: "",
    email: "",
    metodoPago: null,
    upsells: [],
  });
  const [confirmed, setConfirmed] = useState(false);

  const selectedServicio = servicios.find((s) => s.id === form.servicio);
  const selectedEmpleado = empleados.find((e) => e.id === form.empleado);

  const update = (field: keyof FormData, value: string | string[]) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleUpsell = (upsellId: string) => {
    setForm((prev) => ({
      ...prev,
      upsells: prev.upsells.includes(upsellId)
        ? prev.upsells.filter((id) => id !== upsellId)
        : [...prev.upsells, upsellId],
    }));
  };

  const selectedUpsells = (upsells.default || []).filter((u) => form.upsells.includes(u.id));
  const upsellsTotal = selectedUpsells.reduce((sum, u) => sum + u.precio, 0);
  const servicioTotal = selectedServicio ? selectedServicio.precioDesde : 0;
  const grandTotal = servicioTotal + upsellsTotal;

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const canProceed = () => {
    switch (step) {
      case 0: return !!form.servicio;
      case 1: return !!form.empleado;
      case 2: return !!form.fecha && !!form.hora;
      case 3: return !!form.nombre && !!form.telefono && !!form.email;
      case 4: return !!form.metodoPago;
      default: return false;
    }
  };

  const handleConfirm = () => {
    setConfirmed(true);
  };

  const today = new Date().toISOString().split("T")[0];

  if (confirmed) {
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <Check size={32} className="text-green-600" />
        </div>
        <h2 className="font-playfair text-3xl font-bold text-[#1A1A1A] mb-4">
          ¡Reserva Confirmada!
        </h2>
        <p className="text-gray-500 mb-8">
          Te hemos enviado un resumen a <strong>{form.email}</strong>. Te contactaremos para confirmar los detalles.
        </p>
        <div className="bg-gray-50 rounded-2xl p-6 text-left mb-8">
          <div className="space-y-3">
            <div className="flex justify-between text-sm"><span className="text-gray-400">Servicio</span><span className="font-medium">{selectedServicio?.nombre}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-400">Especialista</span><span className="font-medium">{selectedEmpleado?.nombre}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-400">Fecha</span><span className="font-medium">{form.fecha} — {form.hora}</span></div>
            {selectedUpsells.length > 0 && (
              <div className="flex justify-between text-sm"><span className="text-gray-400">Extras</span><span className="font-medium">+${upsellsTotal}</span></div>
            )}
            <div className="border-t pt-2 flex justify-between font-bold"><span>Total</span><span className="text-[#C9A96E]">${grandTotal}</span></div>
          </div>
        </div>
        <a href="/" className="text-[#C9A96E] hover:text-[#B8955A] text-sm font-semibold">Volver al inicio</a>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          {steps.map((s, idx) => (
            <div key={idx} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  idx <= step
                    ? "bg-[#C9A96E] text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                {idx < step ? <Check size={14} /> : idx + 1}
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`w-12 sm:w-20 h-0.5 mx-1 sm:mx-2 transition-all ${
                    idx < step ? "bg-[#C9A96E]" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 font-medium">{steps[step]}</p>
      </div>

      {/* Step 0: Service */}
      {step === 0 && (
        <div>
          <h3 className="font-playfair text-2xl font-bold text-[#1A1A1A] mb-6 text-center">
            Elige tu servicio
          </h3>
          <div className="space-y-8 max-h-[60vh] overflow-y-auto pr-2">
            {categorias.map((cat) => {
              const catServicios = servicios.filter((s) => s.categoria === cat);
              return (
                <div key={cat}>
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    {cat}
                  </h4>
                  <div className="space-y-2">
                    {catServicios.map((svc) => (
                      <button
                        key={svc.id}
                        onClick={() => { update("servicio", svc.id); }}
                        className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all ${
                          form.servicio === svc.id
                            ? "border-[#C9A96E] bg-[#FFF8F0]"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div>
                          <div className="font-medium text-sm text-[#1A1A1A]">{svc.nombre}</div>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="flex items-center gap-1 text-xs text-gray-400">
                              <Clock size={12} /> {svc.duracion}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-[#C9A96E]">${svc.precioDesde}</div>
                          {svc.depositoPorcentaje > 0 && (
                            <div className="text-xs text-gray-400">depósito ${Math.round(svc.precioDesde * (svc.depositoPorcentaje / 100))}</div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 1: Employee */}
      {step === 1 && (
        <div>
          <h3 className="font-playfair text-2xl font-bold text-[#1A1A1A] mb-6 text-center">
            Elige tu especialista
          </h3>
          <div className="grid gap-4">
            {empleados.map((emp) => (
              <button
                key={emp.id}
                onClick={() => update("empleado", emp.id)}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                  form.empleado === emp.id
                    ? "border-[#C9A96E] bg-[#FFF8F0]"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="w-14 h-14 rounded-full gradient-dark overflow-hidden shrink-0">
                  <img
                    src={emp.foto}
                    alt={emp.nombre}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        const span = document.createElement('span');
                        span.className = 'font-playfair text-lg text-[#C9A96E] font-bold flex items-center justify-center w-full h-full';
                        span.textContent = `${emp.nombre.split(' ')[0][0]}${emp.nombre.split(' ')[1][0]}`;
                        parent.appendChild(span);
                      }
                    }}
                  />
                </div>
                <div className="text-left">
                  <div className="font-medium text-sm text-[#1A1A1A]">{emp.nombre}</div>
                  <div className="text-xs text-gray-400">{emp.rol}</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {emp.especialidades.slice(0, 3).map((e) => (
                      <span key={e} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                        {e}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Date & Time */}
      {step === 2 && (
        <div>
          <h3 className="font-playfair text-2xl font-bold text-[#1A1A1A] mb-6 text-center">
            Elige fecha y hora
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500 mb-2 block">Fecha</label>
              <input
                type="date"
                min={today}
                value={form.fecha}
                onChange={(e) => update("fecha", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 mb-2 block">Hora</label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"].map((h) => (
                  <button
                    key={h}
                    onClick={() => update("hora", h)}
                    className={`py-2 rounded-xl text-sm border transition-all ${
                      form.hora === h
                        ? "border-[#C9A96E] bg-[#FFF8F0] text-[#C9A96E] font-semibold"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Customer Data + UPSELLS */}
      {step === 3 && (
        <div>
          <h3 className="font-playfair text-2xl font-bold text-[#1A1A1A] mb-6 text-center">
            Tus datos
          </h3>
          <div className="space-y-4 mb-8">
            <input
              type="text"
              placeholder="Nombre completo"
              value={form.nombre}
              onChange={(e) => update("nombre", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] outline-none text-sm"
            />
            <input
              type="tel"
              placeholder="Teléfono"
              value={form.telefono}
              onChange={(e) => update("telefono", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] outline-none text-sm"
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] outline-none text-sm"
            />
          </div>

          {/* UPSELLS */}
          <div className="border-t pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Plus size={16} className="text-[#C9A96E]" />
              <h4 className="font-semibold text-sm text-[#1A1A1A]">¿Algo extra? Mejora tu experiencia</h4>
            </div>
            <p className="text-xs text-gray-400 mb-4">Agrega mini servicios para complementar tu tratamiento principal.</p>
            <div className="grid gap-2">
              {(upsells.default || []).map((u) => (
                <button
                  key={u.id}
                  onClick={() => toggleUpsell(u.id)}
                  className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                    form.upsells.includes(u.id)
                      ? "border-[#C9A96E] bg-[#FFF8F0]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      form.upsells.includes(u.id) ? "border-[#C9A96E] bg-[#C9A96E]" : "border-gray-300"
                    }`}>
                      {form.upsells.includes(u.id) && <Check size={12} className="text-white" />}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[#1A1A1A]">{u.nombre}</div>
                      <div className="text-xs text-gray-400">{u.descripcion}</div>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-[#C9A96E]">+${u.precio}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Payment */}
      {step === 4 && (
        <div>
          <h3 className="font-playfair text-2xl font-bold text-[#1A1A1A] mb-6 text-center">
            Método de pago
          </h3>

          {selectedServicio && (
            <div className="bg-[#FFF8F0] p-4 rounded-xl mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Servicio:</span>
                <span className="font-medium">{selectedServicio.nombre}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Especialista:</span>
                <span className="font-medium">{selectedEmpleado?.nombre}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Fecha:</span>
                <span className="font-medium">{form.fecha} — {form.hora}</span>
              </div>
              {selectedUpsells.length > 0 && (
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Extras ({selectedUpsells.length}):</span>
                    <span className="font-medium text-[#C9A96E]">+${upsellsTotal}</span>
                  </div>
                  <div className="text-xs text-gray-400 space-y-1">
                    {selectedUpsells.map((u) => (
                      <div key={u.id} className="flex justify-between pl-2">
                        <span>{u.nombre}</span>
                        <span>${u.precio}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between text-sm font-bold">
                <span>Total:</span>
                <span className="text-[#C9A96E] text-lg">${grandTotal}</span>
              </div>
              {selectedServicio.depositoPorcentaje > 0 && (
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Depósito requerido ({selectedServicio.depositoPorcentaje}%):</span>
                  <span>${Math.round(grandTotal * selectedServicio.depositoPorcentaje / 100)}</span>
                </div>
              )}
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={() => update("metodoPago", "ath")}
              className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all ${
                form.metodoPago === "ath"
                  ? "border-[#C9A96E] bg-[#FFF8F0]"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div>
                <div className="font-medium text-sm text-[#1A1A1A]">ATH Móvil Business</div>
                <div className="text-xs text-gray-400 mt-1">Paga con ATH Móvil y sube tu comprobante</div>
              </div>
              <div className="text-xs font-bold text-[#C9A96E]">RECOMENDADO</div>
            </button>

            <button
              onClick={() => update("metodoPago", "tarjeta")}
              className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all ${
                form.metodoPago === "tarjeta"
                  ? "border-[#C9A96E] bg-[#FFF8F0]"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div>
                <div className="font-medium text-sm text-[#1A1A1A]">Tarjeta de Crédito/Débito</div>
                <div className="text-xs text-gray-400 mt-1">Pago seguro con Stripe</div>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-10">
        {step > 0 ? (
          <button
            onClick={prev}
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#1A1A1A] transition-colors"
          >
            <ChevronLeft size={18} /> Atrás
          </button>
        ) : (
          <div />
        )}

        {step < steps.length - 1 ? (
          <button
            onClick={next}
            disabled={!canProceed()}
            className="flex items-center gap-2 bg-[#C9A96E] hover:bg-[#B8955A] disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-full text-sm font-semibold transition-all"
          >
            Siguiente <ChevronRight size={18} />
          </button>
        ) : (
          <button
            onClick={handleConfirm}
            disabled={!canProceed()}
            className="bg-[#C9A96E] hover:bg-[#B8955A] disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-full text-sm font-semibold transition-all"
          >
            CONFIRMAR RESERVA
          </button>
        )}
      </div>
    </div>
  );
}
