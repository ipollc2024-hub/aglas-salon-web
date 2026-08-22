"use client";

import { useState } from "react";
import { Calendar, DollarSign, User, Check, X, Clock } from "lucide-react";

// Mock data — will connect to Notion later
const mockCitas = [
  { id: "1", cliente: "María Rodríguez", servicio: "Balayage / Iluminaciones", empleado: "Ericson Gonzalez", fecha: "2026-05-25", hora: "10:00 AM", estado: "pendiente", metodoPago: "ath", depositoPagado: false, montoDeposito: 26 },
  { id: "2", cliente: "Ana G.", servicio: "Facial Profundo", empleado: "Gleris Pereira Otero", fecha: "2026-05-25", hora: "2:00 PM", estado: "confirmada", metodoPago: "tarjeta", depositoPagado: true, montoDeposito: 10 },
  { id: "3", cliente: "Laura M.", servicio: "Pedicura Spa", empleado: "Gleris Pereira Otero", fecha: "2026-05-26", hora: "11:00 AM", estado: "pendiente", metodoPago: "ath", depositoPagado: true, montoDeposito: 13 },
];

export default function AdminPage() {
  const [citas, setCitas] = useState(mockCitas);

  const toggleEstado = (id: string, nuevoEstado: string) => {
    setCitas((prev) =>
      prev.map((c) => (c.id === id ? { ...c, estado: nuevoEstado as any } : c))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="font-playfair text-3xl font-bold text-[#1A1A1A]">Panel Admin</h1>
          <p className="text-gray-500 text-sm mt-2">Gestiona citas, pagos y más</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Citas Hoy", value: "5", icon: Calendar, color: "text-blue-600" },
            { label: "Pendientes", value: citas.filter((c) => c.estado === "pendiente").length.toString(), icon: Clock, color: "text-amber-600" },
            { label: "Confirmadas", value: citas.filter((c) => c.estado === "confirmada").length.toString(), icon: Check, color: "text-green-600" },
            { label: "Depósitos", value: citas.filter((c) => c.metodoPago === "ath").length.toString(), icon: DollarSign, color: "text-[#C9A96E]" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-xl p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">{stat.label}</span>
                  <Icon size={18} className={stat.color} />
                </div>
                <div className="text-2xl font-bold text-[#1A1A1A]">{stat.value}</div>
              </div>
            );
          })}
        </div>

        {/* Citas Table */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="font-playfair text-lg font-bold text-[#1A1A1A]">Citas Recientes</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-gray-400 uppercase tracking-wider">
                  <th className="px-6 py-4">Cliente</th>
                  <th className="px-6 py-4">Servicio</th>
                  <th className="px-6 py-4">Empleado</th>
                  <th className="px-6 py-4">Fecha</th>
                  <th className="px-6 py-4">Hora</th>
                  <th className="px-6 py-4">Pago</th>
                  <th className="px-6 py-4">Estado</th>
                  <th className="px-6 py-4">Acción</th>
                </tr>
              </thead>
              <tbody>
                {citas.map((cita) => (
                  <tr key={cita.id} className="border-t border-gray-50 text-sm">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-gray-300" />
                        <span className="font-medium">{cita.cliente}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{cita.servicio}</td>
                    <td className="px-6 py-4 text-gray-600">{cita.empleado}</td>
                    <td className="px-6 py-4">{cita.fecha}</td>
                    <td className="px-6 py-4">{cita.hora}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium ${cita.metodoPago === "ath" ? "text-[#C9A96E]" : "text-blue-500"}`}>
                        {cita.metodoPago === "ath" ? "ATH Móvil" : "Tarjeta"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        cita.estado === "confirmada" ? "bg-green-100 text-green-700" :
                        cita.estado === "pendiente" ? "bg-amber-100 text-amber-700" :
                        "bg-gray-100 text-gray-500"
                      }`}>
                        {cita.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {cita.estado === "pendiente" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => toggleEstado(cita.id, "confirmada")}
                            className="p-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                          >
                            <Check size={14} />
                          </button>
                          <button
                            onClick={() => toggleEstado(cita.id, "cancelada")}
                            className="p-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
