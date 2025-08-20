"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { agregarPersonalNuevo } from "@/actions/personalAction";
import { Personal } from "@/app/types/types";

interface Props {
  setActiveSubmenu: (value: string) => void; // Recibimos la función del padre
}

export default function AgregarPersonal({ setActiveSubmenu }: Props) {
  const [nombre, setNombre] = useState("");
  const [celular, setCelular] = useState("");
  const [correo, setCorreo] = useState("");
  const [rol, setRol] = useState("");
  const [estado, setEstado] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (celular.length !== 9) {
      alert("El número de celular debe tener 9 dígitos");
      return;
    }

    setLoading(true);

    const nuevoPersonal: Personal = {
      id: uuidv4(),
      nombre,
      celular,
      correo,
      rol,
      estado,
    };

    const result = await agregarPersonalNuevo(nuevoPersonal);

    setLoading(false);

    if (result) {
      // Redirigimos a la lista de personal usando la función del padre
      setActiveSubmenu("Lista Personal");
    } else {
      console.error("Error al agregar personal");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 w-full">
      {/* Nombre completo solo */}
      <div className="w-full">
        <label className="block mb-1">Nombre completo</label>
        <input
          type="text"
          value={nombre}
          placeholder="Nombre completo"
          onChange={(e) => setNombre(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5ac6d2] transition"
          required
        />
      </div>

      {/* Celular y Correo 2x2 */}
      <div className="flex-1 min-w-[45%]">
        <label className="block mb-1">Celular</label>
        <input
          type="text"
          value={celular}
          onChange={(e) => setCelular(e.target.value.replace(/\D/g, ""))}
          maxLength={9}
          minLength={9}
          placeholder="Celular (9 dígitos)"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5ac6d2] transition"
          required
        />
      </div>

      <div className="flex-1 min-w-[45%]">
        <label className="block mb-1">Correo</label>
        <input
          type="email"
          value={correo}
          placeholder="Correo electrónico"
          onChange={(e) => setCorreo(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5ac6d2] transition"
          required
        />
      </div>

      {/* Rol y Estado 2x2 */}
      <div className="flex-1 min-w-[45%]">
        <label className="block mb-1">Rol</label>
        <select
          value={rol}
          onChange={(e) => setRol(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded h-10.5 focus:outline-none focus:ring-2 focus:ring-[#5ac6d2] transition"
          required
        >
          <option value="">Selecciona un rol</option>
          <option value="Administrador">Administrador</option>
          <option value="Asistente">Asistente</option>
          <option value="Veterinaria">Veterinaria</option>
        </select>
      </div>

      <div className="flex-1 min-w-[45%]">
        <label className="block mb-1">Estado</label>
        <select
          value={estado ? "Activo" : "Inactivo"}
          onChange={(e) => setEstado(e.target.value === "Activo")}
          className="w-full p-2 border border-gray-300 rounded h-10.5 focus:outline-none focus:ring-2 focus:ring-[#5ac6d2] transition"
          required
        >
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
      </div>

      {/* Botón al final */}
      <div className="w-full pt-1.5">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#5ac6d2] text-white p-2 rounded hover:bg-[#4bb0bc] transition"
        >
          {loading ? "Guardando" : "Agregar"}
        </button>
      </div>
    </form>
  );
}
