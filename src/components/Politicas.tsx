import { CalendarCheck, Clock3, CreditCard, Footprints, Users, AlertCircle } from "lucide-react";

const politicas = [
  { icon: CreditCard, titulo: "Depósito de 15%", texto: "Todo servicio requiere un depósito del 15% para reservar. Se acepta ATH Móvil o tarjeta. El depósito no es reembolsable." },
  { icon: CalendarCheck, titulo: "Cancelaciones y cambios", texto: "Si cancela con 24 horas o más de anticipación y reagenda dentro de los próximos 15 días, el depósito se transfiere una sola vez. Sin aviso, se pierde el depósito." },
  { icon: Clock3, titulo: "Tardanzas", texto: "Ofrecemos 15 minutos de tolerancia. Después de ese tiempo, atenderemos según disponibilidad. Las emergencias genuinas serán evaluadas por el salón." },
  { icon: AlertCircle, titulo: "Tiempos de servicio", texto: "Los tiempos son estimados. Algunos servicios pueden extenderse y ocasionar una espera por la condición del cabello, piel, uñas o por el trabajo requerido." },
  { icon: Users, titulo: "Acompañantes", texto: "No se permiten acompañantes, salvo autorización previa del salón." },
  { icon: Footprints, titulo: "Área de servicio", texto: "No se entra con zapatos al área de servicio. El salón provee zapatillas desechables para su comodidad e higiene." },
];

export default function Politicas() {
  return (
    <section id="politicas" className="py-24 bg-[#1A1A1A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-[#C9A96E] text-sm tracking-[0.2em] font-medium uppercase">Antes de reservar</span>
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold mt-4 mb-4">Políticas de citas.</h2>
          <p className="text-white/60 max-w-2xl mx-auto">Queremos ofrecerle una experiencia organizada, cómoda y puntual.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {politicas.map(({ icon: Icon, titulo, texto }) => (
            <article key={titulo} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <Icon className="text-[#C9A96E] mb-4" size={24} />
              <h3 className="font-playfair text-xl font-bold mb-2">{titulo}</h3>
              <p className="text-white/65 text-sm leading-relaxed">{texto}</p>
            </article>
          ))}
        </div>
        <p className="text-center text-white/45 text-xs mt-8">Las citas para el mismo día están disponibles cuando haya espacio en agenda.</p>
      </div>
    </section>
  );
}
