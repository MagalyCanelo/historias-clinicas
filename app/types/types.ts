export type Especie = {
  id: string;
  nombre: string;
};

export type Raza = {
  id: string;
  nombre: string;
  especieId: string; 
};

export type Personal = {
  id: string;
  nombre: string;
  celular: string;
  correo: string;
  rol: string;
  estado: boolean; // true = Activo, false = Inactivo
};

export type Cliente = {
  id: string;
  nombreCompleto: string;
  dni: string;
  celular: string;
  correo: string;
  genero: string;
  estado: boolean;
};

export interface Mascota {
  id: string;
  nombre: string;
  especieId: string;
  razaId: string;
  fechaNacimiento: string;
  color: string;
  duenoId: string;
  estado: boolean;
}

export interface Vacuna {
  id: string;
  mascotaId: string;
  tipoVacuna: string;
  fechaAplicada: string;
  proximaDosis: string;
  observaciones: string;
}

export interface TipoVacuna {
  id: string;          
  nombre: string;      
  especieId: string;  
}

export interface ControlAntiparasitario {
  id: string;
  mascotaId: string;
  fechaAplicada: string;
  productoUtilizado: string;
  proximaAplicacion: string;
  observaciones: string;
}

export interface Cirugia {
  id: string;
  mascotaId: string;
  tipoCirugia: string;
  fecha: string;
  observaciones: string;
  estado: string; // "Programada", "Realizada", "Cancelada"
}

export interface TipoCirugia {
  id: string;
  nombre: string;
}

export interface Peluqueria {
  id: string;
  mascotaId: string;
  tipoServicio: string;
  fecha: string;
  observaciones: string;
}