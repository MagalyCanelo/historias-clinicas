"use client";

import { useEffect, useState } from "react";
import {
  Vacuna,
  TipoVacuna,
  Mascota,
  Cliente,
  Especie,
} from "@/app/types/types";
import { obtenerTodasVacunas } from "@/actions/vacunaAction";
import { obtenerTodasLasMascotas } from "@/actions/mascotaAction";
import { obtenerTodosLosClientes } from "@/actions/clienteAction";
import { obtenerTodasLasEspecies } from "@/actions/especieAction";
import { FiEdit, FiInfo } from "react-icons/fi";
import { obtenerTodosLosTiposVacuna } from "@/actions/tipoVacunaAction";

function formatDate(value: any): string {
  if (!value) return "";

  let year: number, month: number, day: number;

  if (typeof value === "string") {
    // Caso: "2025-08-17"
    const parts = value.split("-");
    if (parts.length === 3) {
      year = parseInt(parts[0]);
      month = parseInt(parts[1]);
      day = parseInt(parts[2]);
    } else {
      return value;
    }
  } else if (typeof value === "object" && "seconds" in value) {
    const d = new Date(value.seconds * 1000);
    year = d.getFullYear();
    month = d.getMonth() + 1;
    day = d.getDate();
  } else if (value instanceof Date) {
    year = value.getFullYear();
    month = value.getMonth() + 1;
    day = value.getDate();
  } else {
    return "";
  }

  const dd = String(day).padStart(2, "0");
  const mm = String(month).padStart(2, "0");

  return `${dd}/${mm}/${year}`;
}

export default function ListaVacunas() {
  const [vacunas, setVacunas] = useState<Vacuna[]>([]);
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [especies, setEspecies] = useState<Especie[]>([]);
  const [tipoVacuna, setTipoVacuna] = useState<TipoVacuna[]>([]);

  const [search, setSearch] = useState("");
  const [showInfo, setShowInfo] = useState<Vacuna | null>(null);

  useEffect(() => {
    async function fetchData() {
      setVacunas(await obtenerTodasVacunas());
      setMascotas(await obtenerTodasLasMascotas());
      setClientes(await obtenerTodosLosClientes());
      setTipoVacuna(await obtenerTodosLosTiposVacuna());
      setEspecies(await obtenerTodasLasEspecies());
    }
    fetchData();
  }, []);

  const filtered = vacunas.filter((v) =>
    (getMascotaNombre(v.mascotaId) + getTipoVacunaNombre(v.tipoVacuna))
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function getMascotaNombre(id: string) {
    return mascotas.find((m) => m.id === id)?.nombre || "—";
  }

  function getClienteNombre(mascotaId: string) {
    const mascota = mascotas.find((m) => m.id === mascotaId);
    const dueno = clientes.find((c) => c.id === mascota?.duenoId);
    return dueno?.nombreCompleto || "—";
  }

  function getTipoVacunaNombre(tipoId: string) {
    return tipoVacuna.find((tv) => tv.id === tipoId)?.nombre || tipoId;
  }

  function getEspecieNombre(tipoId: string) {
    const tipo = tipoVacuna.find((tv) => tv.id === tipoId);
    const especie = especies.find((e) => e.id === tipo?.especieId);
    return especie?.nombre || "—";
  }

  return (
    <div className="relative text-gray-700 p-2">
      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="🔍 Buscar por mascota o vacuna"
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
              <th className="p-3 text-left">Dueño</th>
              <th className="p-3 text-left">Vacuna</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((v) => (
              <tr
                key={v.id}
                className="hover:bg-[#effdfd] transition-colors text-center"
              >
                <td className="p-3">{getMascotaNombre(v.mascotaId)}</td>
                <td className="p-3">{getClienteNombre(v.mascotaId)}</td>
                <td className="p-3">{getTipoVacunaNombre(v.tipoVacuna)}</td>
                <td className="p-3 flex gap-4 justify-center">
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

      {/* Modal Información */}
      {showInfo && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-20 p-4">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-3">
              Información de la Vacuna
            </h2>
            <div className="mb-2">
              <span className="font-medium">Mascota: </span>
              {getMascotaNombre(showInfo.mascotaId)}
            </div>
            <div className="mb-2">
              <span className="font-medium">Dueño: </span>
              {getClienteNombre(showInfo.mascotaId)}
            </div>
            <div className="mb-2">
              <span className="font-medium">Tipo: </span>
              {getTipoVacunaNombre(showInfo.tipoVacuna)}
            </div>
            <div className="mb-2">
              <span className="font-medium">Especie: </span>
              {getEspecieNombre(showInfo.tipoVacuna)}
            </div>
            <div className="mb-2">
              <span className="font-medium">Fecha Aplicada: </span>
              {formatDate(showInfo.fechaAplicada)}
            </div>
            <div className="mb-2">
              <span className="font-medium">Próxima Dosis: </span>
              {formatDate(showInfo.proximaDosis)}
            </div>

            <div className="mb-2">
              <span className="font-medium">Observaciones: </span>
              {showInfo.observaciones || "—"}
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
