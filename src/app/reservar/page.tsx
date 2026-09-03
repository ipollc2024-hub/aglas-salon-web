export default function ReservarPage() {
  return (
    <div className="min-h-screen bg-[#FFF8F0] pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="font-playfair text-4xl lg:text-5xl text-[#1A1A1A] font-bold mb-4">
            Reserva tu Cita
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Consulta los horarios disponibles y confirma tu cita de forma segura en Booksy.
          </p>
          <p className="mt-4 inline-block rounded-full border border-[#C9A96E]/30 bg-white px-5 py-2 text-sm font-semibold text-[#9A7845]">
            Se requiere un depósito del 15% del costo del servicio para separar la cita.
          </p>
        </div>
        <div className="mx-auto max-w-xl rounded-3xl border border-[#C9A96E]/20 bg-white p-8 text-center shadow-sm">
          <h2 className="font-playfair text-2xl font-bold text-[#1A1A1A]">Agenda oficial de AGLA&apos;S</h2>
          <p className="mt-3 text-sm leading-6 text-gray-500">
            Booksy muestra la disponibilidad actualizada y evita que dos clientas reserven el mismo espacio.
          </p>
          <a
            href="https://aglassalonbeautyspaclinic.booksy.com/s/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex rounded-full bg-[#C9A96E] px-8 py-3 text-sm font-bold tracking-wide text-white transition-colors hover:bg-[#B8955A]"
          >
            VER HORARIOS Y RESERVAR
          </a>
          <p className="mt-5 text-xs leading-5 text-gray-400">
            Para ayuda con su cita, escríbanos por WhatsApp al (787) 907-8229.
          </p>
        </div>
      </div>
    </div>
  );
}
