export interface Servicio {
  id: string;
  nombre: string;
  descripcion: string;
  precioDesde: number;
  duracion: string;
  categoria: string;
  imagen?: string;
  depositoPorcentaje: number;
}

export interface Empleado {
  id: string;
  nombre: string;
  rol: string;
  foto: string;
  especialidades: string[];
  servicios: { nombre: string; duracion: string }[];
  bio: string;
  experiencia: string;
}

export interface Membresia {
  id: string;
  nombre: string;
  precio: number;
  servicios: string[];
  destacado: boolean;
  color: string;
}

export interface Testimonio {
  nombre: string;
  texto: string;
  rating: number;
  tipo: string;
}

export interface Cita {
  id: string;
  cliente: string;
  telefono: string;
  email: string;
  servicio: string;
  empleado: string;
  fecha: string;
  hora: string;
  estado: 'pendiente' | 'confirmada' | 'completada' | 'cancelada';
  metodoPago: 'ath' | 'tarjeta';
  depositoPagado: boolean;
  montoDeposito: number;
  comprobanteUrl?: string;
  notas?: string;
  createdAt: string;
}

export interface NotionConfig {
  apiKey: string;
  databaseId: string;
}
