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
