import { NextRequest, NextResponse } from "next/server";

const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK_URL;
const DISCORD_CHANNEL_ID = "1493261436842152158";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.servicio || !data.empleado || !data.fecha || !data.hora || !data.nombre || !data.telefono) {
      return NextResponse.json({ error: "Faltan datos requeridos" }, { status: 400 });
    }

    // Armar el ID del calendario para link .ics
    const fechaParts = data.fecha.split("-");
    const horaParts = data.hora.match(/(\d+):(\d+)\s*(AM|PM)/i);
    let hora24 = 12;
    if (horaParts) {
      let h = parseInt(horaParts[1]);
      const m = horaParts[2];
      const ampm = horaParts[3].toUpperCase();
      if (ampm === "PM" && h !== 12) h += 12;
      if (ampm === "AM" && h === 12) h = 0;
      hora24 = h;
    }
    const startStr = `${fechaParts[0]}${fechaParts[1]}${fechaParts[2]}T${String(hora24).padStart(2, "0")}0000`;
    const endH = hora24 + 2; // default 2 horas
    const endStr = `${fechaParts[0]}${fechaParts[1]}${fechaParts[2]}T${String(endH).padStart(2, "0")}0000`;

    // Construir evento de calendario
    const title = `📅 ${data.servicio} - ${data.nombre}`;
    const description = `Cliente: ${data.nombre}\nTel: ${data.telefono}\nEmail: ${data.email || "No especificado"}\nServicio: ${data.servicio}\nEspecialista: ${data.empleado}\nTotal: $${data.total || 0}`;
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//AGLAS Salon//ES",
      "BEGIN:VEVENT",
      `DTSTART:${startStr}`,
      `DTEND:${endStr}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description.replace(/\n/g, "\\n")}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    // Notificar a Discord si el webhook está configurado
    if (DISCORD_WEBHOOK) {
      const empleadoNombre = data.empleado || "No asignado";
      const categoria = data.categoria || "General";

      const embed = {
        embeds: [{
          title: `📅 Nueva Reserva - ${data.servicio}`,
          color: 0xC9A96E,
          fields: [
            { name: "👤 Cliente", value: data.nombre, inline: true },
            { name: "📱 Teléfono", value: data.telefono, inline: true },
            { name: "📧 Email", value: data.email || "No especificado", inline: true },
            { name: "💇‍♀️ Servicio", value: data.servicio, inline: true },
            { name: "👩‍🎨 Especialista", value: empleadoNombre, inline: true },
            { name: "📂 Categoría", value: categoria, inline: true },
            { name: "📅 Fecha", value: data.fecha, inline: true },
            { name: "⏰ Hora", value: data.hora, inline: true },
            { name: "💰 Total", value: `$${data.total || 0}`, inline: true },
            { name: "💳 Pago", value: data.metodoPago === "ath" ? "ATH Móvil" : "Tarjeta", inline: true },
          ],
          footer: { text: "AGLA'S SALÓN & BEAUTY SPA CLINIC" },
          timestamp: new Date().toISOString(),
        }],
      };

      if (data.upsells?.length > 0) {
        embed.embeds[0].fields.push({
          name: "✨ Extras",
          value: data.upsells.join(", "),
          inline: false,
        });
      }

      try {
        await fetch(DISCORD_WEBHOOK, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(embed),
        });
      } catch (e) {
        console.error("Error enviando a Discord:", e);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Reserva recibida correctamente. Te contactaremos pronto.",
      ics: icsContent,
      reserva: data,
    });
  } catch (err) {
    console.error("Error al procesar reserva:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
