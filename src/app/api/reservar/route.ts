import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK_URL;
const DATA_DIR = path.join(process.cwd(), "data");
const RESERVAS_FILE = path.join(DATA_DIR, "reservas.json");

interface ReservaData {
  id: string;
  servicios: string[];
  servicioIds: string[];
  empleado: string;
  empleadoId: string;
  fecha: string;
  hora: string;
  duracionTotal: number;
  nombre: string;
  telefono: string;
  email: string;
  metodoPago: "ath" | "tarjeta" | null;
  upsells: string[];
  total: number;
  categorias: string[];
  createdAt: string;
  estado: string;
}

async function leerReservas(): Promise<ReservaData[]> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const raw = await fs.readFile(RESERVAS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function guardarReserva(reserva: ReservaData): Promise<boolean> {
  try {
    const reservas = await leerReservas();
    reservas.push(reserva);
    await fs.writeFile(RESERVAS_FILE, JSON.stringify(reservas, null, 2), "utf-8");
    return true;
  } catch (e) {
    console.error("Error guardando reserva local:", e);
    return false;
  }
}

function obtenerCitasDeEmpleada(reservas: ReservaData[], empleadaNombre: string): ReservaData[] {
  return reservas.filter((r) => r.empleado === empleadaNombre && r.estado === "pendiente");
}

async function notificarDiscord(data: ReservaData, citasEmpleadas?: Record<string, ReservaData[]>): Promise<boolean> {
  if (!DISCORD_WEBHOOK) return false;
  try {
    const serviciosStr = data.servicios.join(", ");
    const upsellsStr = data.upsells.length > 0 ? data.upsells.join(", ") : "Ninguno";

    const embed: any = {
      embeds: [
        {
          title: `📅 Nueva Reserva`,
          color: 0xc9a96e,
          fields: [
            { name: "👤 Cliente", value: data.nombre, inline: true },
            { name: "📱 Teléfono", value: data.telefono, inline: true },
            { name: "💇‍♀️ Servicios", value: serviciosStr, inline: false },
            { name: "👩‍🎨 Especialista", value: data.empleado, inline: true },
            { name: "📅 Fecha", value: `${data.fecha} — ${data.hora}`, inline: true },
            { name: "⏱ Duración", value: `${data.duracionTotal.toFixed(1)}h`, inline: true },
            { name: "💰 Total", value: `$${data.total}`, inline: true },
            { name: "💳 Pago", value: data.metodoPago === "ath" ? "ATH Móvil" : data.metodoPago === "tarjeta" ? "Tarjeta (Depósito)" : "Por confirmar", inline: true },
          ],
          footer: { text: "AGLA'S SALÓN & BEAUTY SPA CLINIC" },
          timestamp: new Date().toISOString(),
        },
      ],
    };

    if (data.upsells.length > 0) {
      embed.embeds[0].fields.push({ name: "✨ Extras", value: upsellsStr, inline: false });
    }
    if (data.email) {
      embed.embeds[0].fields.push({ name: "📧 Email", value: data.email, inline: true });
    }

    // Enviar notificación de nueva reserva
    const res = await fetch(DISCORD_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(embed),
    });

    // Si hay citas de empleadas, enviar resumen
    if (citasEmpleadas) {
      for (const [empleada, citas] of Object.entries(citasEmpleadas)) {
        if (citas.length === 0) continue;

        let citasTexto = citas
          .map(
            (c, i) =>
              `${i + 1}. **${c.hora}** — ${c.nombre} — ${c.servicios.join(", ")} ${
                c.upsells.length > 0 ? `✨ ${c.upsells.join(", ")}` : ""
              }`
          )
          .join("\n");

        const resumenEmbed = {
          embeds: [
            {
              title: `📋 Tus Citas Pendientes — ${empleada}`,
              color: 0x6366f1,
              description: citasTexto,
              footer: { text: `Total: ${citas.length} cita(s) pendiente(s)` },
              timestamp: new Date().toISOString(),
            },
          ],
        };

        await fetch(DISCORD_WEBHOOK, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(resumenEmbed),
        });
      }
    }

    return res.ok;
  } catch (e) {
    console.error("Error enviando a Discord:", e);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validar campos requeridos
    const errores: string[] = [];
    if (!data.servicios || data.servicios.length === 0) errores.push("servicios");
    if (!data.empleado) errores.push("empleado");
    if (!data.fecha) errores.push("fecha");
    if (!data.hora) errores.push("hora");
    if (!data.nombre || !data.nombre.trim()) errores.push("nombre");
    if (!data.telefono || !data.telefono.trim()) errores.push("telefono");

    if (errores.length > 0) {
      return NextResponse.json(
        { error: `Faltan datos requeridos: ${errores.join(", ")}` },
        { status: 400 }
      );
    }

    // Armar objeto de reserva
    const reserva: ReservaData = {
      id: `res-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      servicios: data.servicios,
      servicioIds: data.servicioIds || [],
      empleado: data.empleado,
      empleadoId: data.empleadoId || "",
      fecha: data.fecha,
      hora: data.hora,
      duracionTotal: data.duracionTotal || 1,
      nombre: data.nombre.trim(),
      telefono: data.telefono.trim(),
      email: data.email ? data.email.trim() : "",
      metodoPago: data.metodoPago || null,
      upsells: data.upsells || [],
      total: data.total || 0,
      categorias: data.categorias || [],
      createdAt: new Date().toISOString(),
      estado: "pendiente",
    };

    // Guardar en archivo local
    await guardarReserva(reserva);

    // Obtener todas las reservas y preparar citas por empleada
    const todasReservas = await leerReservas();
    const empleadasUnicas = [...new Set(todasReservas.map((r) => r.empleado))];
    const citasEmpleadas: Record<string, ReservaData[]> = {};
    for (const emp of empleadasUnicas) {
      citasEmpleadas[emp] = obtenerCitasDeEmpleada(todasReservas, emp);
    }

    // Notificar a Discord
    const discordOk = await notificarDiscord(reserva, citasEmpleadas);

    // Armar evento .ics
    const fechaParts = data.fecha.split("-");
    const horaStr = data.hora;
    const horaParts = horaStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
    let hora24 = 12;
    if (horaParts) {
      let h = parseInt(horaParts[1]);
      const m = parseInt(horaParts[2]);
      const ampm = horaParts[3].toUpperCase();
      if (ampm === "PM" && h !== 12) h += 12;
      if (ampm === "AM" && h === 12) h = 0;
      hora24 = h + m / 60;
    }
    const hStart = Math.floor(hora24);
    const mStart = Math.round((hora24 - hStart) * 60);
    const endMin = Math.round(hora24 * 60 + (data.duracionTotal || 1) * 60);
    const hEnd = Math.floor(endMin / 60);
    const mEnd = endMin % 60;

    const fmt2 = (n: number) => String(n).padStart(2, "0");
    const startStr = `${fechaParts[0]}${fechaParts[1]}${fechaParts[2]}T${fmt2(hStart)}${fmt2(mStart)}00`;
    const endStr = `${fechaParts[0]}${fechaParts[1]}${fechaParts[2]}T${fmt2(hEnd)}${fmt2(mEnd)}00`;

    const serviciosStr = reserva.servicios.join(", ");
    const upsellsStr =
      reserva.upsells.length > 0 ? `\\nExtras: ${reserva.upsells.join(", ")}` : "";
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//AGLAS Salon//ES",
      "BEGIN:VEVENT",
      `DTSTART:${startStr}`,
      `DTEND:${endStr}`,
      `SUMMARY:${serviciosStr} - ${reserva.nombre}`,
      `DESCRIPTION:Cliente: ${reserva.nombre}\\nTel: ${reserva.telefono}\\nEmail: ${reserva.email}\\nServicios: ${serviciosStr}\\nEspecialista: ${reserva.empleado}\\nTotal: $${reserva.total}${upsellsStr}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    return NextResponse.json({
      success: true,
      message: "✅ ¡Reserva recibida! Te contactaremos pronto para confirmar.",
      reservaId: reserva.id,
      discord: discordOk ? "notificada" : "no-configurada",
      ics: icsContent,
    });
  } catch (err) {
    console.error("Error al procesar reserva:", err);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const reservas = await leerReservas();
    const empleadas = [...new Set(reservas.map((r) => r.empleado))];

    const porEmpleada: Record<string, { pendientes: ReservaData[]; completadas: ReservaData[] }> = {};
    for (const e of empleadas) {
      porEmpleada[e] = {
        pendientes: reservas.filter((r) => r.empleado === e && r.estado === "pendiente"),
        completadas: reservas.filter((r) => r.empleado === e && r.estado === "completada"),
      };
    }

    return NextResponse.json({
      total: reservas.length,
      porEmpleada,
      reservas,
    });
  } catch {
    return NextResponse.json({ reservas: [], total: 0 });
  }
}
