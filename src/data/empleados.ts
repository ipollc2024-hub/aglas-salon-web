import { Empleado } from "@/lib/types";

export const empleados: Empleado[] = [
  {
    id: "aglaee",
    nombre: "Aglaee Otero Cotto",
    rol: "Fundadora y Directora",
    foto: "/empleados/aglaee.jpg",
    especialidades: ["Todos los servicios", "Cabello", "Uñas", "Pestañas", "Faciales", "Masajes", "Depilación"],
    servicios: [
      { nombre: "Supervisión de Servicios", duracion: "Todo el horario" },
      { nombre: "Consultas Especiales", duracion: "Variable" },
    ],
    bio: "Fundadora y directora de AGLA'S Salón & Beauty Spa Clinic, con más de 25 años dedicados a la belleza y el bienestar.",
    experiencia: "Más de 25 años",
    horario: {
      lunes: { inicio: "10:30", fin: "18:00" },
      martes: { inicio: "10:30", fin: "18:00" },
      miercoles: null, // Cerrado
      jueves: { inicio: "10:30", fin: "18:00" },
      viernes: { inicio: "10:30", fin: "17:00" },
      sabado: { inicio: "10:00", fin: "19:00" },
      domingo: null, // Cerrado
    }
  },
  {
    id: "gleris",
    nombre: "Gleris Pereira Otero",
    rol: "Esteticista",
    foto: "/empleados/gleris.jpg",
    especialidades: ["Pedicura", "Faciales", "Pestañas", "Corporales", "Masajes", "Maderoterapia", "Drenajes Linfáticos", "Depilación", "Depilación láser", "Depilación con cera"],
    servicios: [
      { nombre: "Pedicura", duracion: "1h aprox" },
      { nombre: "Faciales", duracion: "2h" },
      { nombre: "Extensiones de Pestañas", duracion: "3 - 4h" },
      { nombre: "Tratamientos Corporales", duracion: "Variable" },
      { nombre: "Depilación Láser y con Cera", duracion: "Según área" },
    ],
    bio: "Experta en pedicura y faciales, con especialidad en extensiones de pestañas de alta duración.",
    experiencia: "3+ años",
    horario: {
      lunes: null,
      martes: null,
      miercoles: null,
      jueves: { inicio: "09:00", fin: "11:00" },
      viernes: { inicio: "13:00", fin: "17:00" },
      sabado: { inicio: "10:00", fin: "19:00" },
      domingo: null,
    }
  },
  {
    id: "ericson",
    nombre: "Ericson González",
    rol: "Estilista Profesional",
    foto: "/empleados/ericson.jpg",
    especialidades: ["Cabello", "Tratamientos de cabello", "Cambios de imagen", "Balayage", "Cabello rizado", "Corte", "Color", "Secado", "Extensiones", "Trenzas", "Crochet", "Peinados"],
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
    experiencia: "7+ años",
    horario: {
      lunes: null,
      martes: null,
      miercoles: null,
      jueves: null,
      viernes: null,
      sabado: { inicio: "11:00", fin: "17:30" },
      domingo: null,
    }
  },
  {
    id: "yaromis",
    nombre: "Yaromis Báez Santos",
    rol: "Estilista Profesional",
    foto: "/empleados/yaromis.jpg",
    especialidades: ["Cabello", "Corte", "Color", "Secado", "Blower", "Tratamientos de cabello", "Cambios de imagen", "Balayage", "Peinados", "Extensiones", "Trenzas"],
    servicios: [
      { nombre: "Corte y Estilizado", duracion: "Variable" },
      { nombre: "Blower / Secado Profesional", duracion: "20 - 30min" },
      { nombre: "Coloración y Decoloración", duracion: "1 - 3h" },
      { nombre: "Tratamientos Capilares", duracion: "30min - 2h" },
      { nombre: "Peinados", duracion: "30min - 2h" },
    ],
    bio: "Estilista dedicada a realzar la belleza de cada clienta mediante servicios personalizados de cabello, color y estilizado.",
    experiencia: "",
    horario: {
      lunes: { inicio: "10:00", fin: "17:30" },
      martes: { inicio: "10:00", fin: "17:30" },
      miercoles: null,
      jueves: { inicio: "10:00", fin: "17:30" },
      viernes: { inicio: "10:00", fin: "17:30" },
      sabado: { inicio: "10:00", fin: "17:30" },
      domingo: null,
    }
  },
  {
    id: "johana",
    nombre: "Johana I. Báez Santos",
    rol: "Estilista Profesional",
    foto: "/empleados/johana.jpg",
    especialidades: ["Cabello", "Corte", "Color", "Secado", "Blower", "Tratamientos de cabello", "Cambios de imagen", "Balayage", "Peinados", "Extensiones", "Trenzas"],
    servicios: [
      { nombre: "Corte y Estilizado", duracion: "Variable" },
      { nombre: "Blower / Secado Profesional", duracion: "20 - 30min" },
      { nombre: "Coloración y Decoloración", duracion: "1 - 3h" },
      { nombre: "Tratamientos Capilares", duracion: "30min - 2h" },
      { nombre: "Peinados", duracion: "30min - 2h" },
    ],
    bio: "Estilista enfocada en ofrecer atención personalizada y resultados hermosos en cada servicio de cabello.",
    experiencia: "",
    horario: {
      lunes: { inicio: "10:00", fin: "17:30" },
      martes: { inicio: "10:00", fin: "17:30" },
      miercoles: null,
      jueves: { inicio: "10:00", fin: "17:30" },
      viernes: { inicio: "10:00", fin: "17:30" },
      sabado: { inicio: "10:00", fin: "17:30" },
      domingo: null,
    }
  }
];
