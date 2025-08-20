"use client";

import { useEffect, useState } from "react";
import { Vacuna } from "@/app/types/types";
import { obtenerTodasVacunas } from "@/actions/vacunaAction";
import { FiEdit, FiXCircle, FiInfo } from "react-icons/fi";

export default function ListaVacunas() {
  const [vacunas, setVacunas] = useState<Vacuna[]>([]);
  const [search, setSearch] = useState("");
  const [showEdit, setShowEdit] = useState<Vacuna | null>(null);
  const [showInfo, setShowInfo] = useState<Vacuna | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await obtenerTodasVacunas();
      setVacunas(data);
    }
    fetchData();
  }, []);

  const filtered = vacunas.filter(
    (v) =>
      v.mascotaId.toLowerCase().includes(search.toLowerCase()) ||
      v.tipoVacuna.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative text-gray-700 p-4">
      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="🔍 Buscar por mascota o tipo de vacuna"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ac6d2] transition"
      />

      {/* Tabla */}
      <div className="relative overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-[#c4eff3] text-gray-700">
            <tr>
              <th className="p-3 text-left">Mascota</th>
              <th className="p-3 text-left">Tipo</th>
              <th className="p-3 text-left">Fecha Aplicada</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((v) => (
              <tr
                key={v.id}
                className="hover:bg-[#effdfd] transition-colors text-center"
              >
                <td className="p-3">{v.mascotaId}</td>
                <td className="p-3">{v.tipoVacuna}</td>
                <td className="p-3">{v.fechaAplicada}</td>

                <td className="p-3 flex gap-4 justify-center">
                  <FiEdit
                    className="text-xl cursor-pointer text-celeste hover:text-celeste-hover"
                    onClick={() => setShowEdit(v)}
                  />
                  <FiInfo
                    className="text-xl cursor-pointer text-neutral-700 hover:text-neutral-900"
                    onClick={() => setShowInfo(v)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Editar */}
      {showEdit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-20 p-4">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Editar Vacuna</h2>
            {/* Aquí agregarías inputs para editar cada campo de `showEdit` */}
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-[#5ac6d2] hover:bg-[#4ab0bb] text-white rounded-lg"
                onClick={() => setShowEdit(null)}
              >
                Guardar
              </button>
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                onClick={() => setShowEdit(null)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Información */}
      {showInfo && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-20 p-4">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-3">
              Información de la Vacuna
            </h2>
            <div className="mb-2">
              <span className="font-medium">ID: </span>
              {showInfo.id}
            </div>
            <div className="mb-2">
              <span className="font-medium">Mascota: </span>
              {showInfo.mascotaId}
            </div>
            <div className="mb-2">
              <span className="font-medium">Tipo: </span>
              {showInfo.tipoVacuna}
            </div>
            <div className="mb-2">
              <span className="font-medium">Fecha Aplicada: </span>
              {showInfo.fechaAplicada}
            </div>
            <div className="mb-2">
              <span className="font-medium">Próxima Dosis: </span>
              {showInfo.proximaDosis}
            </div>
            <div className="mb-2">
              <span className="font-medium">Observaciones: </span>
              {showInfo.observaciones}
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                onClick={() => setShowInfo(null)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
