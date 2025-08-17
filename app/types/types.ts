export type Pet = {
  id: string;
  name: string;
  breed: string;
  age: string;
  weight: string;
  color: string;
  gender: string;
  vaccinated: boolean;
  microchipped: boolean;
  description: string;
  suspend?: boolean;
};

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
