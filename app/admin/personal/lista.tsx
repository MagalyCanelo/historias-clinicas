"use client";
import { useEffect, useState } from "react";
import { FiEdit, FiXCircle, FiInfo } from "react-icons/fi";
import { db } from "@/lib/firebaseConfig";
import { Personal } from "@/app/types/types";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export default function ListaPersonal() {
  const [personal, setPersonal] = useState<Personal[]>([]);
  const [search, setSearch] = useState("");
  const [showEdit, setShowEdit] = useState<Personal | null>(null);
  const [showSuspend, setShowSuspend] = useState<Personal | null>(null);
  const [showInfo, setShowInfo] = useState<Personal | null>(null);

  const fetchPersonal = async () => {
    const querySnapshot = await getDocs(collection(db, "personal"));
    const lista: Personal[] = [];
    querySnapshot.forEach((doc) => {
      lista.push(doc.data() as Personal);
    });
    setPersonal(lista);
  };

  useEffect(() => {
    fetchPersonal();
  }, []);

  const filtered = personal.filter(
    (p) =>
      p.nombre.toLowerCase().includes(search.toLowerCase()) ||
      p.rol.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (a.estado && !b.estado) return -1;
    if (!a.estado && b.estado) return 1;

    return a.nombre.localeCompare(b.nombre);
  });

  const camposOrden = ["nombre", "celular", "correo", "rol", "estado"];

  const handleSuspend = async (p: Personal) => {
    if (!p.id) return;
    const ref = doc(db, "personal", p.id);
    await updateDoc(ref, { estado: false });
    setShowSuspend(null);
    fetchPersonal();
  };

  const handleUpdate = async (p: Personal) => {
    if (!p.id) return;
    const ref = doc(db, "personal", p.id);
    await updateDoc(ref, {
      nombre: p.nombre,
      rol: p.rol,
      celular: p.celular,
      correo: p.correo,
      estado: p.estado,
    });
    setShowEdit(null);
    fetchPersonal();
  };

  return (
    <div className="relative text-gray-700 p-4">
      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="🔍 Buscar por nombre o rol"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ac6d2] transition"
      />

      {/* Contenedor de la tabla para centrar modales */}
      <div className="relative">
        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-[#c4eff3] text-gray-700">
              <tr>
                <th className="p-3 text-left">Nombre</th>
                <th className="p-3 text-left">Rol</th>
                <th className="p-3 text-left">Celular</th>
                <th className="p-3 text-left">Estado</th>
                <th className="p-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((p) => (
                <tr key={p.id} className="hover:bg-[#effdfd] transition-colors">
                  <td className="p-3">{p.nombre}</td>
                  <td className="p-3">{p.rol}</td>
                  <td className="p-3">{p.celular}</td>
                  <td className="p-3">{p.estado ? "Activo" : "Suspendido"}</td>
                  <td className="p-3 flex gap-5 justify-center">
                    <FiEdit
                      className="text-xl cursor-pointer text-celeste hover:text-celeste-hover"
                      onClick={() => setShowEdit(p)}
                    />
                    <FiXCircle
                      className="text-xl cursor-pointer text-red-500 hover:text-red-600"
                      onClick={() => setShowSuspend(p)}
                    />
                    <FiInfo
                      className="text-xl cursor-pointer text-neutral-700 hover:text-neutral-900"
                      onClick={() => setShowInfo(p)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Modal Editar */}
        {showEdit && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-lg w-96 z-10">
            <h2 className="text-lg font-semibold mb-4">Editar Personal</h2>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-600">
                Nombre
              </label>
              <input
                type="text"
                value={showEdit.nombre}
                onChange={(e) =>
                  setShowEdit({
                    ...showEdit,
                    nombre: e.target.value,
                  } as Personal)
                }
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ac6d2]"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-600">
                Rol
              </label>
              <select
                value={showEdit.rol}
                onChange={(e) =>
                  setShowEdit({ ...showEdit, rol: e.target.value } as Personal)
                }
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ac6d2]"
              >
                <option value="admin">Administrador</option>
                <option value="personal">Personal</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-600">
                Celular
              </label>
              <input
                type="text"
                value={showEdit.celular}
                maxLength={9}
                minLength={9}
                onChange={(e) => {
                  // Solo permitir números
                  const value = e.target.value.replace(/\D/g, "");
                  if (value.length <= 9) {
                    setShowEdit({
                      ...showEdit,
                      celular: value,
                    } as Personal);
                  }
                }}
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ac6d2]"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-600">
                Correo
              </label>
              <input
                type="text"
                value={showEdit.correo}
                onChange={(e) =>
                  setShowEdit({
                    ...showEdit,
                    correo: e.target.value,
                  } as Personal)
                }
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ac6d2]"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-600">
                Estado
              </label>
              <select
                value={showEdit.estado ? "true" : "false"}
                onChange={(e) =>
                  setShowEdit({
                    ...showEdit,
                    estado: e.target.value === "true",
                  } as Personal)
                }
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ac6d2]"
              >
                <option value="true">Activo</option>
                <option value="false">Suspendido</option>
              </select>
            </div>
            <div className="flex justify-center gap-3 mt-4">
              <button
                className="px-4 py-2 bg-[#5ac6d2] hover:bg-[#4ab0bb] text-white rounded-lg"
                onClick={() => handleUpdate(showEdit)}
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
        )}
        {/* Modal Suspender */}
        {showSuspend && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-lg w-80 text-center z-10">
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
        )}
        {/* Modal Información */}
        {showInfo && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-lg w-96 z-10">
            <h2 className="text-lg font-semibold mb-3">
              Información del Personal
            </h2>
            {camposOrden.map((key) => {
              if (!showInfo[key as keyof typeof showInfo]) return null; // evitar undefined
              const value = showInfo[key as keyof typeof showInfo];
              return (
                <div key={key} className="mb-2">
                  <span className="font-medium capitalize">
                    {key === "nombre"
                      ? "Nombre copo"
                      : key.charAt(0).toUpperCase() + key.slice(1)}
                    :{" "}
                  </span>
                  <span>
                    {key === "estado"
                      ? value
                        ? "Activo"
                        : "Suspendido"
                      : String(value)}
                  </span>
                </div>
              );
            })}
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                onClick={() => setShowInfo(null)}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
