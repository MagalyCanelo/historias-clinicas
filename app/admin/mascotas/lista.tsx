"use client";
import { useEffect, useState } from "react";
import { FiEdit, FiXCircle, FiInfo } from "react-icons/fi";
import { db } from "@/lib/firebaseConfig";
import { Mascota, Especie, Cliente, Raza } from "@/app/types/types";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

type MascotaLocal = Omit<Mascota, "id"> & { id: string };

function toYMD(value: any): string {
  if (!value) return "";
  if (typeof value === "string") return value.slice(0, 10);
  if (typeof value === "object" && "seconds" in value) {
    const d = new Date((value as any).seconds * 1000);
    return d.toISOString().slice(0, 10);
  }
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return "";
}

/** Util: muestra fecha en dd/mm/yyyy sin descontar día */
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
      return value; // si no es formato esperado
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

export default function ListaMascotas() {
  const [mascotas, setMascotas] = useState<MascotaLocal[]>([]);
  const [especies, setEspecies] = useState<Especie[]>([]);
  const [razas, setRazas] = useState<Raza[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [search, setSearch] = useState("");
  const [showEdit, setShowEdit] = useState<MascotaLocal | null>(null);
  const [showSuspend, setShowSuspend] = useState<MascotaLocal | null>(null);
  const [showInfo, setShowInfo] = useState<MascotaLocal | null>(null);

  const fetchData = async () => {
    const especiesSnap = await getDocs(collection(db, "especies"));
    const especiesList: Especie[] = especiesSnap.docs.map((d) => {
      const data = d.data() as any;
      delete data?.id;
      return { ...data, id: d.id } as Especie;
    });

    const razasSnap = await getDocs(collection(db, "razas"));
    const razasList: Raza[] = razasSnap.docs.map((d) => {
      const data = d.data() as any;
      delete data?.id;
      return { ...data, id: d.id } as Raza;
    });

    const clientesSnap = await getDocs(collection(db, "clientes"));
    const clientesList: Cliente[] = clientesSnap.docs.map((d) => {
      const data = d.data() as any;
      delete data?.id;
      return { ...data, id: d.id } as Cliente;
    });

    const mascotasSnap = await getDocs(collection(db, "mascotas"));
    const mascotasList: MascotaLocal[] = mascotasSnap.docs.map((d) => {
      const data = d.data() as any;
      const duenio = data?.["dueñoId"] ?? data?.["duenoId"] ?? "";
      const fecha = toYMD(data?.fechaNacimiento);
      delete data?.id;
      return {
        ...data,
        id: d.id,
        ["dueñoId"]: duenio,
        fechaNacimiento: fecha,
      } as MascotaLocal;
    });

    setEspecies(especiesList);
    setRazas(razasList);
    setClientes(clientesList);
    setMascotas(mascotasList);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getEspecieNombre = (id: string) =>
    especies.find((e) => e.id === id)?.nombre || "—";

  const getRazaNombre = (id: string) =>
    razas.find((r) => r.id === id)?.nombre || "—";

  const getDuenoNombre = (id: string) =>
    clientes.find((c) => c.id === id)?.nombreCompleto || "—";

  const filtered = mascotas.filter((m) => {
    const s = search.toLowerCase();
    return (
      m.nombre.toLowerCase().includes(s) ||
      getDuenoNombre(m["duenoId"]).toLowerCase().includes(s)
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    if (a.estado && !b.estado) return -1;
    if (!a.estado && b.estado) return 1;
    return a.nombre.localeCompare(b.nombre);
  });

  const handleSuspend = async (m: MascotaLocal) => {
    if (!m.id) return;
    const ref = doc(db, "mascotas", m.id);
    await updateDoc(ref, { estado: false });
    setShowSuspend(null);
    fetchData();
  };

  const handleUpdate = async (m: MascotaLocal) => {
    if (!m.id) return;
    const ref = doc(db, "mascotas", m.id);
    await updateDoc(ref, {
      nombre: m.nombre,
      especieId: m.especieId || "",
      razaId: m.razaId || "",
      color: m.color || "",
      fechaNacimiento: toYMD(m.fechaNacimiento),
      duenoId: m["duenoId"] || "",
      ["dueñoId"]: m["duenoId"] || "",
      estado: !!m.estado,
    });
    setShowEdit(null);
    fetchData();
  };

  return (
    <div className="relative text-gray-700 p-4">
      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="🔍 Buscar por nombre o dueño"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ac6d2] transition"
      />

      {/* Tabla */}
      <div className="relative overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-[#c4eff3] text-gray-700">
            <tr>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Especie</th>
              <th className="p-3 text-left">Dueño</th>
              <th className="p-3 text-left">Estado</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((m) => (
              <tr key={m.id} className="hover:bg-[#effdfd] transition-colors">
                <td className="p-3">{m.nombre}</td>
                <td className="p-3">{getEspecieNombre(m.especieId)}</td>
                <td className="p-3">{getDuenoNombre(m["duenoId"])}</td>
                <td
                  className={`p-3 font-medium ${
                    m.estado ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {m.estado ? "Activo" : "Suspendido"}
                </td>
                <td className="p-3 flex gap-5 justify-center items-center">
                  <FiEdit
                    className="text-xl cursor-pointer text-celeste hover:text-celeste-hover"
                    onClick={() => setShowEdit(m)}
                  />
                  <FiXCircle
                    className="text-xl cursor-pointer text-red-500 hover:text-red-600"
                    onClick={() => setShowSuspend(m)}
                  />
                  <FiInfo
                    className="text-xl cursor-pointer text-neutral-700 hover:text-neutral-900"
                    onClick={() => setShowInfo(m)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Editar (7 campos en el orden pedido) */}
      {showEdit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-20 p-4">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Editar Mascota</h2>

            {/* 1) Nombre */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-600">
                Nombre
              </label>
              <input
                type="text"
                value={showEdit.nombre}
                onChange={(e) =>
                  setShowEdit({ ...showEdit, nombre: e.target.value })
                }
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ac6d2]"
              />
            </div>

            {/* 2) Especie */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-600">
                Especie
              </label>
              <select
                value={showEdit.especieId}
                onChange={(e) =>
                  setShowEdit({
                    ...showEdit,
                    especieId: e.target.value,
                    razaId: "", // al cambiar especie, limpiamos raza
                  })
                }
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ac6d2]"
              >
                <option value="">Seleccione especie</option>
                {especies.map((esp) => (
                  <option key={esp.id} value={esp.id}>
                    {esp.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* 3) Raza */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-600">
                Raza
              </label>
              <select
                value={showEdit.razaId}
                onChange={(e) =>
                  setShowEdit({ ...showEdit, razaId: e.target.value })
                }
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ac6d2]"
                disabled={!showEdit.especieId}
              >
                <option value="">Seleccione raza</option>
                {razas
                  .filter((r) => r.especieId === showEdit.especieId)
                  .map((rz) => (
                    <option key={rz.id} value={rz.id}>
                      {rz.nombre}
                    </option>
                  ))}
              </select>
            </div>

            {/* 4) Fecha Nacimiento */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-600">
                Fecha Nacimiento
              </label>
              <input
                type="date"
                value={toYMD(showEdit.fechaNacimiento)}
                onChange={(e) =>
                  setShowEdit({
                    ...showEdit,
                    fechaNacimiento: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ac6d2]"
              />
            </div>

            {/* 5) Color */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-600">
                Color
              </label>
              <input
                type="text"
                value={showEdit.color}
                onChange={(e) =>
                  setShowEdit({ ...showEdit, color: e.target.value })
                }
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ac6d2]"
              />
            </div>

            {/* 6) Dueño */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-600">
                Dueño
              </label>
              <select
                value={showEdit["duenoId"]}
                onChange={(e) =>
                  setShowEdit({ ...showEdit, ["duenoId"]: e.target.value })
                }
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ac6d2]"
              >
                <option value="">Seleccione dueño</option>
                {clientes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nombreCompleto}
                  </option>
                ))}
              </select>
            </div>

            {/* 7) Estado */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-600">
                Estado
              </label>
              <select
                value={showEdit.estado ? "Activo" : "Suspendido"}
                onChange={(e) =>
                  setShowEdit({
                    ...showEdit,
                    estado: e.target.value === "Activo",
                  })
                }
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ac6d2]"
              >
                <option value="Activo">Activo</option>
                <option value="Suspendido">Suspendido</option>
              </select>
            </div>

            {/* Botones */}
            <div className="flex justify-center gap-3 mt-4">
              <button
                className="px-4 py-2 bg-[#5ac6d2] hover:bg-[#4ab0bb] text-white rounded-lg"
                onClick={() => handleUpdate(showEdit as MascotaLocal)}
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

      {/* Modal Suspender */}
      {showSuspend && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-20 p-4">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm text-center">
            <h3 className="text-lg font-semibold mb-3">
              ¿Estás seguro de suspender?
            </h3>
            <p className="mb-4 font-medium">
              Se suspenderá a <strong>{showSuspend.nombre}</strong>
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                onClick={() => handleSuspend(showSuspend)}
              >
                Suspender
              </button>
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                onClick={() => setShowSuspend(null)}
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
              Información de la Mascota
            </h2>

            <div className="mb-2">
              <span className="font-medium">Nombre:</span> {showInfo.nombre}
            </div>
            <div className="mb-2">
              <span className="font-medium">Especie: </span>
              {getEspecieNombre(showInfo.especieId)}
            </div>
            <div className="mb-2">
              <span className="font-medium">Raza: </span>
              {getRazaNombre(showInfo.razaId)}
            </div>
            <div className="mb-2">
              <span className="font-medium">Fecha Nacimiento: </span>
              {formatDate(showInfo.fechaNacimiento)}
            </div>

            <div className="mb-2">
              <span className="font-medium">Color:</span> {showInfo.color}
            </div>
            <div className="mb-2">
              <span className="font-medium">Dueño: </span>
              {getDuenoNombre(showInfo["duenoId"])}
            </div>
            <div className="mb-2">
              <span className="font-medium">Estado: </span>
              {showInfo.estado ? "Activo" : "Suspendido"}
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
