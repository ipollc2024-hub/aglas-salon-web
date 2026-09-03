import BookingWizard from "@/components/BookingWizard";

export default function ReservarPage() {
  return (
    <div className="min-h-screen bg-[#FFF8F0] pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="font-playfair text-4xl lg:text-5xl text-[#1A1A1A] font-bold mb-4">
            Reserva tu Cita
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Selecciona tu servicio, elige tu especialista, escoge tu horario — y déjanos el resto.
          </p>
          <p className="mt-4 inline-block rounded-full border border-[#C9A96E]/30 bg-white px-5 py-2 text-sm font-semibold text-[#9A7845]">
            Se requiere un depósito del 15% del costo del servicio para separar la cita.
          </p>
        </div>
        <BookingWizard />
      </div>
    </div>
  );
}
