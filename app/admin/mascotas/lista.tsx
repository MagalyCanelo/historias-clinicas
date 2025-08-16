"use client";
import { useState } from "react";
import { FiEdit, FiXCircle, FiInfo } from "react-icons/fi";

interface Mascota {
  nombre: string;
  especie: string;
  duenio: string;
  estado: "Activo" | "Suspendido";
}

const dataMascotas: Mascota[] = [
  { nombre: "Bobby", especie: "Perro", duenio: "Juan Pérez", estado: "Activo" },
  {
    nombre: "Michi",
    especie: "Gato",
    duenio: "Ana Torres",
    estado: "Suspendido",
  },
  {
    nombre: "Luna",
    especie: "Conejo",
    duenio: "Carlos Gómez",
    estado: "Activo",
  },
];

export default function ListaMascotas() {
  const [search, setSearch] = useState("");

  const filtered = dataMascotas.filter(
    (m) =>
      m.nombre.toLowerCase().includes(search.toLowerCase()) ||
      m.duenio.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="text-gray-700">
      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="🔍 Buscar por nombre o dueño..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ac6d2] transition"
      />

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-sky-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Especie</th>
              <th className="p-3 text-left">Dueño</th>
              <th className="p-3 text-left">Estado</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m, i) => (
              <tr key={i} className="hover:bg-sky-50 transition-colors">
                <td className="p-3">{m.nombre}</td>
                <td className="p-3">{m.especie}</td>
                <td className="p-3">{m.duenio}</td>
                <td
                  className={`p-3 font-medium ${
                    m.estado === "Activo" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {m.estado}
                </td>
                <td className="p-3 flex gap-5 justify-center text-sky-500">
                  <FiEdit className="text-xl cursor-pointer hover:text-sky-700" />
                  <FiXCircle className="text-xl cursor-pointer hover:text-sky-700" />
                  <FiInfo className="text-xl cursor-pointer hover:text-sky-700" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
