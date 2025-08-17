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
