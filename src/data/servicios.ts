import { Servicio } from "@/lib/types";

export const servicios: Servicio[] = [
  // CABELLO
  { id: "corte", nombre: "Corte de Cabello", descripcion: "Corte profesional con estilo personalizado", precioDesde: 30, duracion: "30-45 min", categoria: "Cabello", depositoPorcentaje: 20 },
  { id: "corte-rizado", nombre: "Corte Especializado Rizado", descripcion: "Corte especializado para cabello rizado con definición profesional", precioDesde: 45, duracion: "45-60 min", categoria: "Cabello", depositoPorcentaje: 20 },
  { id: "blower", nombre: "Blower / Secado Profesional", descripcion: "Secado y estilizado profesional", precioDesde: 25, duracion: "20-30 min", categoria: "Cabello", depositoPorcentaje: 20 },
  { id: "coloracion", nombre: "Coloración Base", descripcion: "Coloración completa con productos premium", precioDesde: 65, duracion: "1-2 h", categoria: "Cabello", depositoPorcentaje: 20 },
  { id: "balayage", nombre: "Balayage / Iluminaciones", descripcion: "Técnica de iluminación natural con acabado degradado", precioDesde: 130, duracion: "2-3 h", categoria: "Cabello", depositoPorcentaje: 20 },
  { id: "hidratacion", nombre: "Tratamiento Hidratación Profunda", descripcion: "Hidratación intensiva para cabello seco o dañado", precioDesde: 45, duracion: "30-45 min", categoria: "Cabello", depositoPorcentaje: 20 },
  { id: "keratina", nombre: "Alaciados / Keratinas Capilar", descripcion: "Tratamiento de alisado con keratina", precioDesde: 85, duracion: "1-2 h", categoria: "Cabello", depositoPorcentaje: 20 },
  { id: "definicion-rizos", nombre: "Definición Profesional de Rizos", descripcion: "Técnica profesional para definir y estructurar rizos", precioDesde: 85, duracion: "45-60 min", categoria: "Cabello", depositoPorcentaje: 20 },
  { id: "transicion-rizos", nombre: "Transición a Rizo Natural", descripcion: "Asesoría y tratamiento para transición de cabello tratado a rizo natural", precioDesde: 85, duracion: "1-2 h", categoria: "Cabello", depositoPorcentaje: 20 },
  { id: "reparacion-rizos", nombre: "Tratamiento Reparación Rizo", descripcion: "Reparación capilar especializada para cabello rizado", precioDesde: 65, duracion: "30-45 min", categoria: "Cabello", depositoPorcentaje: 20 },
  { id: "extensiones-queratina", nombre: "Extensiones de Queratina", descripcion: "Instalación profesional de extensiones con queratina", precioDesde: 450, duracion: "2-3 h", categoria: "Cabello", depositoPorcentaje: 30 },
  { id: "extensiones-cosidas", nombre: "Extensiones Cosidas", descripcion: "Instalación de extensiones cosidas", precioDesde: 350, duracion: "2-3 h", categoria: "Cabello", depositoPorcentaje: 30 },
  { id: "extensiones-retoque", nombre: "Retoque / Mantenimiento Extensiones", descripcion: "Mantenimiento y retoque de extensiones existentes", precioDesde: 250, duracion: "1-2 h", categoria: "Cabello", depositoPorcentaje: 20 },
  { id: "extensiones-retiro", nombre: "Retiro Profesional de Extensiones", descripcion: "Retiro profesional y seguro de extensiones", precioDesde: 100, duracion: "30-45 min", categoria: "Cabello", depositoPorcentaje: 20 },
  { id: "evaluacion-capilar", nombre: "Evaluación Capilar", descripcion: "Evaluación profesional del estado del cabello", precioDesde: 30, duracion: "15-20 min", categoria: "Cabello", depositoPorcentaje: 0 },
  { id: "trenzas", nombre: "Trenzas Infantiles", descripcion: "Trenzas profesionales para niñas", precioDesde: 65, duracion: "1-2 h", categoria: "Cabello", depositoPorcentaje: 20 },

  // UÑAS
  { id: "manicura-clasica", nombre: "Manicura Clásica", descripcion: "Manicura tradicional con esmaltado regular", precioDesde: 35, duracion: "30-45 min", categoria: "Uñas", depositoPorcentaje: 20 },
  { id: "manicura-rusa", nombre: "Manicura Rusa", descripcion: "Manicura con técnica rusa de cutícula", precioDesde: 45, duracion: "45-60 min", categoria: "Uñas", depositoPorcentaje: 20 },
  { id: "manicura-francesa", nombre: "Manicura Francesa", descripcion: "Manicura con estilo francés en gel", precioDesde: 45, duracion: "45-60 min", categoria: "Uñas", depositoPorcentaje: 20 },
  { id: "manicura-japonesa", nombre: "Manicura Japonesa", descripcion: "Manicura con técnica japonesa de fortalecimiento", precioDesde: 55, duracion: "45-60 min", categoria: "Uñas", depositoPorcentaje: 20 },
  { id: "manicura-brasilena", nombre: "Manicura Brasileña", descripcion: "Manicura con técnica brasileña", precioDesde: 65, duracion: "45-60 min", categoria: "Uñas", depositoPorcentaje: 20 },
  { id: "acrilicas", nombre: "Uñas Acrílicas Completas", descripcion: "Sistema completo de uñas acrílicas", precioDesde: 55, duracion: "1-2 h", categoria: "Uñas", depositoPorcentaje: 20 },
  { id: "retoque-acrilico", nombre: "Retoque Acrílico", descripcion: "Relleno y retoque de uñas acrílicas", precioDesde: 45, duracion: "45-60 min", categoria: "Uñas", depositoPorcentaje: 20 },
  { id: "builder-gel", nombre: "Builder Gel", descripcion: "Sistema de uñas en gel constructor", precioDesde: 45, duracion: "1-2 h", categoria: "Uñas", depositoPorcentaje: 20 },
  { id: "pedicura-basica", nombre: "Pedicura Básica", descripcion: "Pedicura tradicional completa", precioDesde: 45, duracion: "30-45 min", categoria: "Uñas", depositoPorcentaje: 20 },
  { id: "pedicura-spa", nombre: "Pedicura Spa / Gelly Spa", descripcion: "Pedicura con tratamiento spa o gelly spa", precioDesde: 65, duracion: "45-60 min", categoria: "Uñas", depositoPorcentaje: 20 },
  { id: "pedicura-francesa", nombre: "Pedicura Francesa", descripcion: "Pedicura con estilo francés", precioDesde: 65, duracion: "45-60 min", categoria: "Uñas", depositoPorcentaje: 20 },
  { id: "pedicura-rusa", nombre: "Pedicura Rusa en Seco", descripcion: "Pedicura con técnica rusa en seco", precioDesde: 65, duracion: "45-60 min", categoria: "Uñas", depositoPorcentaje: 20 },
  { id: "remocion-gel", nombre: "Remoción de Gel", descripcion: "Remoción profesional de esmaltado en gel", precioDesde: 15, duracion: "15-20 min", categoria: "Uñas", depositoPorcentaje: 0 },

  // PESTAÑAS Y CEJAS
  { id: "pestanas-clasicas", nombre: "Extensiones Clásicas", descripcion: "Extensiones de pestañas clásicas pelo a pelo", precioDesde: 85, duracion: "1-2 h", categoria: "Pestañas y Cejas", depositoPorcentaje: 20 },
  { id: "pestanas-volumen", nombre: "Extensiones Volumen", descripcion: "Extensiones de pestañas con técnica volumen", precioDesde: 100, duracion: "1.5-2 h", categoria: "Pestañas y Cejas", depositoPorcentaje: 20 },
  { id: "retoque-pestanas", nombre: "Retoque de Pestañas", descripcion: "Retoque de extensiones de pestañas existentes", precioDesde: 65, duracion: "45-60 min", categoria: "Pestañas y Cejas", depositoPorcentaje: 20 },
  { id: "lifting-pestanas", nombre: "Lifting de Pestañas", descripcion: "Lifting profesional para realzar pestañas naturales", precioDesde: 70, duracion: "45-60 min", categoria: "Pestañas y Cejas", depositoPorcentaje: 20 },
  { id: "laminado-cejas", nombre: "Laminado de Cejas", descripcion: "Laminado profesional para cejas perfectas", precioDesde: 44, duracion: "30-45 min", categoria: "Pestañas y Cejas", depositoPorcentaje: 20 },
  { id: "perfilado-cejas", nombre: "Perfilado de Cejas", descripcion: "Diseño y perfilado profesional de cejas", precioDesde: 25, duracion: "15-20 min", categoria: "Pestañas y Cejas", depositoPorcentaje: 20 },

  // FACIALES
  { id: "limpieza-facial", nombre: "Limpieza Facial Profunda", descripcion: "Limpieza facial profunda con extracción", precioDesde: 65, duracion: "40-60 min", categoria: "Faciales", depositoPorcentaje: 20 },
  { id: "facial-hidratante", nombre: "Facial Hidratante", descripcion: "Tratamiento facial hidratante intensivo", precioDesde: 75, duracion: "40-60 min", categoria: "Faciales", depositoPorcentaje: 20 },
  { id: "facial-rejuvenecedor", nombre: "Facial Rejuvenecedor", descripcion: "Tratamiento facial rejuvenecedor completo", precioDesde: 110, duracion: "60-75 min", categoria: "Faciales", depositoPorcentaje: 20 },
  { id: "hidrafacial", nombre: "Facial Hidrafacial", descripcion: "Tratamiento de hidradermia facial avanzada", precioDesde: 75, duracion: "40-60 min", categoria: "Faciales", depositoPorcentaje: 20 },
  { id: "microneedling", nombre: "Facial Microneedling", descripcion: "Tratamiento de microagujas facial", precioDesde: 85, duracion: "45-60 min", categoria: "Faciales", depositoPorcentaje: 20 },
  { id: "microdermoabrasion", nombre: "Facial Microdermoabrasión", descripcion: "Microdermoabrasión facial profesional", precioDesde: 85, duracion: "40-60 min", categoria: "Faciales", depositoPorcentaje: 20 },
  { id: "peeling", nombre: "Facial Peeling Químico", descripcion: "Peeling químico facial profesional", precioDesde: 85, duracion: "40-60 min", categoria: "Faciales", depositoPorcentaje: 20 },
  { id: "dermaplaning", nombre: "Facial Dermaplaning", descripcion: "Dermaplaning facial profesional", precioDesde: 85, duracion: "30-45 min", categoria: "Faciales", depositoPorcentaje: 20 },
  { id: "ipl", nombre: "Facial Rejuvenecimiento Laser IPL", descripcion: "Rejuvenecimiento facial con luz pulsada intensa", precioDesde: 130, duracion: "45-60 min", categoria: "Faciales", depositoPorcentaje: 30 },

  // MASAJES
  { id: "masaje-relajante", nombre: "Masaje Relajante (45min)", descripcion: "Masaje relajante de cuerpo completo", precioDesde: 60, duracion: "45 min", categoria: "Masajes y Cuerpo", depositoPorcentaje: 20 },
  { id: "moldeo-corporal", nombre: "Moldeo Corporal", descripcion: "Tratamiento de moldeo corporal manual", precioDesde: 75, duracion: "45-60 min", categoria: "Masajes y Cuerpo", depositoPorcentaje: 20 },
  { id: "maderoterapia", nombre: "Maderoterapia", descripcion: "Maderoterapia corporal profesional", precioDesde: 65, duracion: "40-60 min", categoria: "Masajes y Cuerpo", depositoPorcentaje: 20 },
  { id: "drenaje-linfatico", nombre: "Drenaje Linfático (60min)", descripcion: "Drenaje linfático manual completo", precioDesde: 65, duracion: "60 min", categoria: "Masajes y Cuerpo", depositoPorcentaje: 20 },
  { id: "drenaje-postoperatorio", nombre: "Drenaje Postoperatorio", descripcion: "Drenaje linfático postoperatorio especializado", precioDesde: 75, duracion: "60 min", categoria: "Masajes y Cuerpo", depositoPorcentaje: 20 },
  { id: "paquete-5-sesiones", nombre: "Paquete 5 Sesiones", descripcion: "Paquete de 5 sesiones de maderoterapia o drenaje", precioDesde: 395, duracion: "Por sesión", categoria: "Masajes y Cuerpo", depositoPorcentaje: 30 },
  { id: "paquete-10-sesiones", nombre: "Paquete 10 Sesiones", descripcion: "Paquete de 10 sesiones de maderoterapia o drenaje", precioDesde: 695, duracion: "Por sesión", categoria: "Masajes y Cuerpo", depositoPorcentaje: 30 },

  // DEPILACIÓN
  { id: "depilacion-cejas-cera", nombre: "Depilación de Cejas (Cera)", descripcion: "Depilación profesional de cejas con cera", precioDesde: 25, duracion: "10-15 min", categoria: "Depilación", depositoPorcentaje: 0 },
  { id: "depilacion-bozo-cera", nombre: "Depilación de Bozo (Cera)", descripcion: "Depilación de bozo con cera", precioDesde: 12, duracion: "10 min", categoria: "Depilación", depositoPorcentaje: 0 },
  { id: "depilacion-axilas-cera", nombre: "Depilación de Axilas (Cera)", descripcion: "Depilación de axilas con cera", precioDesde: 25, duracion: "15-20 min", categoria: "Depilación", depositoPorcentaje: 0 },
  { id: "depilacion-media-pierna-cera", nombre: "Depilación Media Pierna (Cera)", descripcion: "Depilación de media pierna con cera", precioDesde: 45, duracion: "20-30 min", categoria: "Depilación", depositoPorcentaje: 20 },
  { id: "depilacion-piernas-cera", nombre: "Depilación Piernas Completas (Cera)", descripcion: "Depilación de piernas completas con cera", precioDesde: 85, duracion: "30-45 min", categoria: "Depilación", depositoPorcentaje: 20 },
  { id: "depilacion-bikini", nombre: "Depilación Bikini (Cera)", descripcion: "Depilación de línea de bikini con cera", precioDesde: 85, duracion: "20-30 min", categoria: "Depilación", depositoPorcentaje: 20 },
  { id: "depilacion-bikini-completo", nombre: "Depilación Bikini Completo (Cera)", descripcion: "Depilación de bikini completo con cera", precioDesde: 120, duracion: "30-45 min", categoria: "Depilación", depositoPorcentaje: 20 },
];

export const categorias = ["Cabello", "Uñas", "Pestañas y Cejas", "Faciales", "Masajes y Cuerpo", "Depilación"];

export const getServiciosPorCategoria = (cat: string) => servicios.filter(s => s.categoria === cat);
