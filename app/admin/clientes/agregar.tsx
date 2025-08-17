"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { agregarClienteNuevo } from "@/actions/clienteAction";
import { Cliente } from "@/app/types/types";

interface Props {
  setActiveSubmenu: (value: string) => void; // Función recibida del padre
}

export default function AgregarCliente({ setActiveSubmenu }: Props) {
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [dni, setDni] = useState("");
  const [celular, setCelular] = useState("");
  const [genero, setGenero] = useState("");
  const [estado, setEstado] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (celular.length !== 9) {
      alert("El número de celular debe tener 9 dígitos");
      return;
    }

    setLoading(true);

    const nuevoCliente: Cliente = {
      id: uuidv4(),
      nombreCompleto,
      dni,
      celular,
      genero,
      estado,
    };

    const result = await agregarClienteNuevo(nuevoCliente);

    setLoading(false);

    if (result) {
      setActiveSubmenu("Lista Clientes");
    } else {
      console.error("Error al agregar cliente");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 w-full">
      {/* Nombre completo */}
      <div className="w-full">
        <label className="block mb-1">Nombre completo</label>
        <input
          type="text"
          value={nombreCompleto}
          onChange={(e) => setNombreCompleto(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5ac6d2] transition"
          required
        />
      </div>

      {/* DNI y Celular 2x2 */}
      <div className="flex-1 min-w-[45%]">
        <label className="block mb-1">DNI</label>
        <input
          type="text"
          value={dni}
          onChange={(e) => setDni(e.target.value.replace(/\D/g, ""))}
          maxLength={8}
          minLength={8}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5ac6d2] transition"
          required
        />
      </div>

      <div className="flex-1 min-w-[45%]">
        <label className="block mb-1">Celular</label>
        <input
          type="text"
          value={celular}
          onChange={(e) => setCelular(e.target.value.replace(/\D/g, ""))}
          maxLength={9}
          minLength={9}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5ac6d2] transition"
          required
        />
      </div>

      {/* Género y Estado 2x2 */}
      <div className="flex-1 min-w-[45%]">
        <label className="block mb-1">Género</label>
        <select
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded h-10.5 focus:outline-none focus:ring-2 focus:ring-[#5ac6d2] transition"
          required
        >
          <option value="">Selecciona un género</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>
      </div>

      <div className="flex-1 min-w-[45%]">
        <label className="block mb-1">Estado</label>
        <select
          value={estado ? "Activo" : "Suspendido"}
          onChange={(e) => setEstado(e.target.value === "Activo")}
          className="w-full p-2 border border-gray-300 rounded h-10.5 focus:outline-none focus:ring-2 focus:ring-[#5ac6d2] transition"
          required
        >
          <option value="Activo">Activo</option>
          <option value="Suspendido">Suspendido</option>
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
