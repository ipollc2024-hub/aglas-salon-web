const propietarios = [
  {
    nombre: "Aglaee Otero",
    cargo: "Fundadora y Directora",
    foto: "/empleados/aglaee-fundadora.jpg",
    texto:
      "Fundadora de un espacio creado para ofrecer atención personalizada mediante técnicas actualizadas, protocolos estructurados y productos de alta gama que brindan seguridad y resultados visibles.",
  },
  {
    nombre: "Ian Pereira",
    cargo: "Cofundador",
    foto: "/empleados/ian-cofundador.jpg",
    texto:
      "Lidera la planificación estratégica y la experiencia del cliente, fortaleciendo una operación sólida, organizada y orientada a la excelencia, la calidad y el profesionalismo.",
  },
];

export default function Historia() {
  return (
    <section id="nosotros" className="bg-[#111] py-24 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="text-sm font-medium uppercase tracking-[0.24em] text-[#C9A96E]">
            Desde 1999
          </span>
          <h2 className="mt-4 font-playfair text-4xl font-bold lg:text-5xl">
            Belleza, bienestar y excelencia
          </h2>
          <p className="mt-5 leading-7 text-white/65">
            Conozca el propósito que nos guía y a quienes convirtieron esta visión en un espacio dedicado a usted.
          </p>
        </div>

        <div className="mb-20 grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-[#C9A96E]/25 bg-white/[0.04] p-8 lg:p-10">
            <h3 className="font-playfair text-3xl text-[#E2C486]">Misión</h3>
            <p className="mt-4 leading-7 text-white/75">
              Brindar servicios de belleza, estética y bienestar con atención personalizada, técnicas actualizadas y productos de alta calidad, en un ambiente seguro, cálido y profesional que realce la belleza y confianza de cada cliente.
            </p>
          </article>
          <article className="rounded-3xl border border-[#C9A96E]/25 bg-white/[0.04] p-8 lg:p-10">
            <h3 className="font-playfair text-3xl text-[#E2C486]">Visión</h3>
            <p className="mt-4 leading-7 text-white/75">
              Ser el salón y spa de referencia en Puerto Rico por nuestra excelencia, innovación y trato humano, creando experiencias memorables y resultados que inspiren confianza, bienestar y fidelidad.
            </p>
          </article>
        </div>

        <div className="mb-10 text-center">
          <span className="text-sm font-medium uppercase tracking-[0.24em] text-[#C9A96E]">
            Liderazgo
          </span>
          <h2 className="mt-3 font-playfair text-4xl font-bold">Nuestros propietarios</h2>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
          {propietarios.map((persona) => (
            <article
              key={persona.nombre}
              className="overflow-hidden rounded-[2rem] border border-[#C9A96E]/30 bg-white/[0.05] shadow-2xl"
            >
              <div className="aspect-[4/3] overflow-hidden bg-black">
                <img
                  src={persona.foto}
                  alt={`${persona.nombre}, ${persona.cargo} de Agla's Salón`}
                  className="h-full w-full object-cover object-top transition duration-500 hover:scale-[1.02]"
                />
              </div>
              <div className="p-7 lg:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A96E]">
                  {persona.cargo}
                </p>
                <h3 className="mt-2 font-playfair text-3xl font-bold">{persona.nombre}</h3>
                <p className="mt-4 leading-7 text-white/70">{persona.texto}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
