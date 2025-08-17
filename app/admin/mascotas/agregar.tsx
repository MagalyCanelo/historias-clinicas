"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { agregarMascotaNueva } from "@/actions/mascotaAction";
import { Mascota, Especie, Raza, Cliente } from "@/app/types/types";
import { obtenerTodasLasEspecies } from "@/actions/especieAction";
import { obtenerTodasLasRazas } from "@/actions/razaAction";
import { obtenerTodosLosClientes } from "@/actions/clienteAction";

interface Props {
  setActiveSubmenu: (value: string) => void; // Función recibida del padre
}

export default function AgregarMascota({ setActiveSubmenu }: Props) {
  const [nombre, setNombre] = useState("");
  const [especieId, setEspecieId] = useState("");
  const [razaId, setRazaId] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [color, setColor] = useState("");
  const [dueñoId, setDueñoId] = useState("");
  const [estado, setEstado] = useState(true);
  const [loading, setLoading] = useState(false);

  // listas para selects
  const [especies, setEspecies] = useState<Especie[]>([]);
  const [razas, setRazas] = useState<Raza[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setEspecies(await obtenerTodasLasEspecies());
      setRazas(await obtenerTodasLasRazas());
      setClientes(await obtenerTodosLosClientes());
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const nuevaMascota: Mascota = {
      id: uuidv4(),
      nombre,
      especieId,
      razaId,
      fechaNacimiento,
      color,
      dueñoId,
      estado,
    };

    const result = await agregarMascotaNueva(nuevaMascota);

    setLoading(false);

    if (result) {
      setActiveSubmenu("Lista Mascotas"); // volvemos al listado
    } else {
      console.error("Error al agregar mascota");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 w-full">
      {/* Nombre */}
      <div className="w-full">
        <label className="block mb-1">Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5ac6d2] transition"
          required
        />
      </div>

      {/* Especie y Raza */}
      <div className="flex-1 min-w-[45%]">
        <label className="block mb-1">Especie</label>
        <select
          value={especieId}
          onChange={(e) => setEspecieId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded h-10.5 focus:outline-none focus:ring-2 focus:ring-[#5ac6d2] transition"
          required
        >
          <option value="">Seleccionar especie</option>
          {especies.map((esp) => (
            <option key={esp.id} value={esp.id}>
              {esp.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 min-w-[45%]">
        <label className="block mb-1">Raza</label>
        <select
          value={razaId}
          onChange={(e) => setRazaId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded h-10.5 focus:outline-none focus:ring-2 focus:ring-[#5ac6d2] transition"
          required
        >
          <option value="">Seleccionar raza</option>
          {razas
            .filter((rz) => rz.especieId === especieId)
            .map((rz) => (
              <option key={rz.id} value={rz.id}>
                {rz.nombre}
              </option>
            ))}
        </select>
      </div>

      {/* Fecha nacimiento y Color */}
      <div className="flex-1 min-w-[45%]">
        <label className="block mb-1">Fecha de nacimiento</label>
        <input
          type="date"
          value={fechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5ac6d2] transition"
          required
        />
      </div>

      <div className="flex-1 min-w-[45%]">
        <label className="block mb-1">Color</label>
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5ac6d2] transition"
          required
        />
      </div>

      {/* Dueño y Estado */}
      <div className="flex-1 min-w-[45%]">
        <label className="block mb-1">Dueño</label>
        <select
          value={dueñoId}
          onChange={(e) => setDueñoId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded h-10.5 focus:outline-none focus:ring-2 focus:ring-[#5ac6d2] transition"
          required
        >
          <option value="">Seleccionar dueño</option>
          {clientes.map((cl) => (
            <option key={cl.id} value={cl.id}>
              {cl.nombreCompleto}
            </option>
          ))}
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
