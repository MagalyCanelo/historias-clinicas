"use client";

import { useEffect, useState } from "react";
import { FiInfo, FiEdit } from "react-icons/fi";
import {
  obtenerTodasCirugias,
  actualizarCirugia,
} from "@/actions/cirugiaAction";
import { obtenerTodosLosTiposCirugia } from "@/actions/tipoCirugiaAction";
import { obtenerTodasLasMascotas } from "@/actions/mascotaAction";
import { obtenerTodosLosClientes } from "@/actions/clienteAction";
import { Cirugia, Mascota, Cliente } from "@/app/types/types";

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

export default function ListaCirugias() {
  const [cirugias, setCirugias] = useState<Cirugia[]>([]);
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [tiposCirugia, setTiposCirugia] = useState<
    { id: string; nombre: string }[]
  >([]);
  const [search, setSearch] = useState("");
  const [showInfo, setShowInfo] = useState<Cirugia | null>(null);
  const [showEdit, setShowEdit] = useState<Cirugia | null>(null);

  useEffect(() => {
    async function fetchData() {
      setCirugias(await obtenerTodasCirugias());
      setMascotas(await obtenerTodasLasMascotas());
      setClientes(await obtenerTodosLosClientes());
      setTiposCirugia(await obtenerTodosLosTiposCirugia());
    }
    fetchData();
  }, []);

  const filtered = cirugias.filter((c) =>
    `${getMascotaNombre(c.mascotaId)} ${getTipoCirugiaNombre(c.tipoCirugia)}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function getMascotaNombre(id: string) {
    return mascotas.find((m) => m.id === id)?.nombre || "—";
  }

  function getClienteNombre(mascotaId: string) {
    const mascota = mascotas.find((m) => m.id === mascotaId);
    return (
      clientes.find((c) => c.id === mascota?.duenoId)?.nombreCompleto || "—"
    );
  }

  function getTipoCirugiaNombre(tipoId: string) {
    return tiposCirugia.find((t) => t.id === tipoId)?.nombre || tipoId;
  }

  const handleSaveEdit = async () => {
    if (!showEdit) return;
    const success = await actualizarCirugia(showEdit);
    if (success) {
      setCirugias((prev) =>
        prev.map((c) => (c.id === showEdit.id ? showEdit : c))
      );
      setShowEdit(null);
    } else {
      alert("Error al guardar cambios");
    }
  };

  return (
    <div className="relative text-gray-700 p-2">
      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="🔍 Buscar por mascota o tipo de cirugía"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-200 rounded focus:ring-2 focus:ring-[#5ac6d2]"
      />

      {/* Tabla */}
      <table className="w-full border rounded overflow-hidden mb-4">
        <thead className="bg-[#c4eff3]">
          <tr>
            <th className="p-3 text-left">Mascota</th>
            <th className="p-3 text-left">Dueño</th>
            <th className="p-3 text-left">Tipo Cirugía</th>
            <th className="p-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((c) => (
            <tr key={c.id} className="hover:bg-[#effdfd] transition-colors">
              <td className="p-3">{getMascotaNombre(c.mascotaId)}</td>
              <td className="p-3">{getClienteNombre(c.mascotaId)}</td>
              <td className="p-3">{getTipoCirugiaNombre(c.tipoCirugia)}</td>
              <td className="p-3 flex gap-5 justify-center items-center">
                <FiEdit
                  className="text-xl cursor-pointer text-celeste hover:text-celeste-hover"
                  onClick={() => setShowEdit(c)}
                />
                <FiInfo
                  className="text-xl cursor-pointer text-neutral-700 hover:text-neutral-900"
                  onClick={() => setShowInfo(c)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal: Información de Cirugía */}
      {showInfo && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-20 p-4">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-3">
              Información de la Cirugía
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
              <span className="font-medium">Tipo Cirugía: </span>
              {getTipoCirugiaNombre(showInfo.tipoCirugia)}
            </div>
            <div className="mb-2">
              <span className="font-medium">Fecha: </span>
              {formatDate(showInfo.fecha)}
            </div>
            <div className="mb-2">
              <span className="font-medium">Estado: </span>
              {showInfo.estado}
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

      {/* Modal: Editar Cirugía */}
      {showEdit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-20 p-4">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Editar Cirugía</h2>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-600">
                Tipo de Cirugía
              </label>
              <select
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ac6d2]"
                value={showEdit.tipoCirugia}
                onChange={(e) =>
                  setShowEdit({ ...showEdit, tipoCirugia: e.target.value })
                }
              >
                {tiposCirugia.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-600">
                Fecha
              </label>
              <input
                type="date"
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ac6d2]"
                value={showEdit.fecha ? showEdit.fecha.substring(0, 10) : ""}
                onChange={(e) =>
                  setShowEdit({ ...showEdit, fecha: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-600">
                Estado
              </label>
              <select
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ac6d2]"
                value={showEdit.estado}
                onChange={(e) =>
                  setShowEdit({ ...showEdit, estado: e.target.value as any })
                }
              >
                <option value="Programada">Programada</option>
                <option value="Realizada">Realizada</option>
                <option value="Cancelada">Cancelada</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-600">
                Observaciones
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ac6d2]"
                value={showEdit.observaciones}
                onChange={(e) =>
                  setShowEdit({ ...showEdit, observaciones: e.target.value })
                }
              />
            </div>

            <div className="flex justify-center gap-3 mt-4">
              <button
                className="px-4 py-2 bg-[#5ac6d2] hover:bg-[#4ab0bb] text-white rounded-lg"
                onClick={handleSaveEdit}
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
    </div>
  );
}
