import { Empleado } from "@/lib/types";

export const empleados: Empleado[] = [
  {
    id: "aglaee",
    nombre: "Aglaee Otero Cotto",
    rol: "Supervisora y Propietaria",
    foto: "/empleados/aglaee.jpg",
    especialidades: ["Supervisión", "Gestión", "Calidad", "Atención al Cliente", "Coordinación"],
    servicios: [
      { nombre: "Supervisión de Servicios", duracion: "Todo el horario" },
      { nombre: "Consultas Especiales", duracion: "Variable" },
    ],
    bio: "Supervisora y propietaria de AGLA'S Salón & Beauty Spa Clinic, dedicada a brindar la mejor experiencia de belleza y bienestar.",
    experiencia: "10+ años"
  },
  {
    id: "isamary",
    nombre: "Isamary Castellano Ramos",
    rol: "Esteticista Profesional",
    foto: "/empleados/isamary.jpg",
    especialidades: ["Faciales", "Masajes", "Reducción Corporal", "Reafirmante", "Pedicura", "Manicura", "Maderoterapia", "Drenajes Linfáticos", "Aparatología", "Depilación"],
    servicios: [
      { nombre: "Faciales", duracion: "40min - 1h" },
      { nombre: "Tratamientos Relajantes", duracion: "30 - 40min" },
      { nombre: "Tratamientos Reductores", duracion: "40min" },
      { nombre: "Reafirmante Facial/Corporal", duracion: "40min - 1h" },
      { nombre: "Pedicura", duracion: "40min - 1h" },
      { nombre: "Manicura", duracion: "1h - 2h" },
      { nombre: "Maderoterapia", duracion: "40min - 1h" },
      { nombre: "Drenajes Linfáticos", duracion: "40min - 1h" },
      { nombre: "Aparatología Avanzada", duracion: "Variable" },
      { nombre: "Depilación Cera/Láser", duracion: "Variable" },
    ],
    bio: "Especialista en tratamientos faciales y corporales con amplia experiencia en maderoterapia y drenajes linfáticos.",
    experiencia: "5+ años"
  },
  {
    id: "gleris",
    nombre: "Gleris Pereira Otero",
    rol: "Esteticista",
    foto: "/empleados/gleris.jpg",
    especialidades: ["Pedicura", "Faciales", "Pestañas"],
    servicios: [
      { nombre: "Pedicura", duracion: "1h aprox" },
      { nombre: "Faciales", duracion: "2h" },
      { nombre: "Extensiones de Pestañas", duracion: "3 - 4h" },
    ],
    bio: "Experta en pedicura y faciales, con especialidad en extensiones de pestañas de alta duración.",
    experiencia: "3+ años"
  },
  {
    id: "ericson",
    nombre: "Ericson Gonzalez",
    rol: "Estilista Profesional",
    foto: "/empleados/ericson.jpg",
    especialidades: ["Corte", "Color", "Extensiones", "Trenzas", "Crochet", "Peinados"],
    servicios: [
      { nombre: "Corte de Cabello", duracion: "30 - 45min" },
      { nombre: "Secado Profesional", duracion: "20 - 30min" },
      { nombre: "Decoloración", duracion: "1 - 2h" },
      { nombre: "Extensiones", duracion: "1 - 3h" },
      { nombre: "Peinados", duracion: "30min - 1h" },
      { nombre: "Trenzas", duracion: "1 - 3h" },
      { nombre: "Crochet", duracion: "2 - 3h" },
    ],
    bio: "Especialista en todo tipo de cabello, desde cortes clásicos hasta transformaciones completas con extensiones y trenzas.",
    experiencia: "7+ años"
  }
];
