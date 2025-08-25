"use client";
import { useEffect, useState } from "react";
import { FiEdit, FiXCircle, FiInfo } from "react-icons/fi";
import { db } from "@/lib/firebaseConfig";
import { Cliente } from "@/app/types/types";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export default function ListaClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [search, setSearch] = useState("");
  const [showEdit, setShowEdit] = useState<Cliente | null>(null);
  const [showSuspend, setShowSuspend] = useState<Cliente | null>(null);
  const [showInfo, setShowInfo] = useState<Cliente | null>(null);

  const fetchClientes = async () => {
    const querySnapshot = await getDocs(collection(db, "clientes"));
    const lista: Cliente[] = [];
    querySnapshot.forEach((doc) => {
      lista.push(doc.data() as Cliente);
    });
    setClientes(lista);
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const filtered = clientes.filter(
    (c) =>
      c.nombreCompleto.toLowerCase().includes(search.toLowerCase()) ||
      c.dni.includes(search)
  );

  const sorted = [...filtered].sort((a, b) => {
    if (a.estado && !b.estado) return -1;
    if (!a.estado && b.estado) return 1;
    return a.nombreCompleto.localeCompare(b.nombreCompleto);
  });

  const camposOrden = [
    "dni",
    "nombreCompleto",
    "celular",
    "correo",
    "genero",
    "estado",
  ];

  const handleSuspend = async (c: Cliente) => {
    if (!c.id) return;
    const ref = doc(db, "clientes", c.id);
    await updateDoc(ref, { estado: false });
    setShowSuspend(null);
    fetchClientes();
  };

  const handleUpdate = async (c: Cliente) => {
    if (!c.id) return;

    // Validación de celular
    if (c.celular.length < 9) {
      alert("El número de celular debe tener 9 dígitos.");
      return;
    }

    const ref = doc(db, "clientes", c.id);
    await updateDoc(ref, {
      nombreCompleto: c.nombreCompleto,
      dni: c.dni,
      celular: c.celular,
      correo: c.correo,
      genero: c.genero,
      estado: c.estado,
    });
    setShowEdit(null);
    fetchClientes();
  };

  return (
    <div className="relative text-gray-700 p-4">
      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="🔍 Buscar por DNI o nombre"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ac6d2] transition"
      />

      {/* Tabla */}
      <div className="relative overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-[#c4eff3] text-gray-700">
            <tr>
              <th className="p-3 text-left">DNI</th>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Celular</th>
              <th className="p-3 text-left">Estado</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((c) => (
              <tr key={c.id} className="hover:bg-[#effdfd] transition-colors">
                <td className="p-3">{c.dni}</td>
                <td className="p-3">{c.nombreCompleto}</td>
                <td className="p-3">{c.celular}</td>
                <td
                  className={`p-3 font-medium ${
                    c.estado ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {c.estado ? "Activo" : "Suspendido"}
                </td>
                <td className="p-3 flex gap-5 justify-center">
                  <FiEdit
                    className="text-xl cursor-pointer text-celeste hover:text-celeste-hover"
                    onClick={() => setShowEdit(c)}
                  />
                  <FiXCircle
                    className="text-xl cursor-pointer text-red-500 hover:text-red-600"
                    onClick={() => setShowSuspend(c)}
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
      </div>

      {/* Modal Editar */}
      {showEdit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-20 p-4">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Editar Cliente</h2>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-600">
                DNI
              </label>
              <input
                type="text"
                value={showEdit.dni}
                onChange={(e) =>
                  setShowEdit({
                    ...showEdit,
                    dni: e.target.value.replace(/\D/g, ""),
                  })
                }
                maxLength={8}
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ac6d2]"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-600">
                Nombre completo
              </label>
              <input
                type="text"
                value={showEdit.nombreCompleto}
                onChange={(e) =>
                  setShowEdit({ ...showEdit, nombreCompleto: e.target.value })
                }
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ac6d2]"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-600">
                Celular
              </label>
              <input
                type="text"
                value={showEdit.celular}
                onChange={(e) =>
                  setShowEdit({
                    ...showEdit,
                    celular: e.target.value.replace(/\D/g, ""),
                  })
                }
                maxLength={9}
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ac6d2]"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-600">
                Correo
              </label>
              <input
                type="email"
                value={showEdit.correo || ""}
                onChange={(e) =>
                  setShowEdit({
                    ...showEdit,
                    correo: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ac6d2]"
                required
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-600">
                Género
              </label>
              <select
                value={showEdit.genero}
                onChange={(e) =>
                  setShowEdit({
                    ...showEdit,
                    genero: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ac6d2]"
              >
                <option value="">Selecciona un género</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

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

            <div className="flex justify-center gap-3 mt-4">
              <button
                className="px-4 py-2 bg-[#5ac6d2] hover:bg-[#4ab0bb] text-white rounded-lg"
                onClick={() => {
                  if (showEdit.celular.length < 9) {
                    alert("El número de celular debe tener 9 dígitos.");
                    return;
                  }
                  if (showEdit.dni.length < 8) {
                    alert("El DNI debe tener 8 dígitos.");
                    return;
                  }
                  handleUpdate(showEdit);
                }}
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
              Se suspenderá a <strong>{showSuspend.nombreCompleto}</strong>
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
              Información del Cliente
            </h2>
            {camposOrden.map((key) => {
              if (!showInfo[key as keyof Cliente]) return null;
              const value = showInfo[key as keyof Cliente];
              return (
                <div key={key} className="mb-2">
                  <span className="font-medium capitalize">
                    {key === "nombreCompleto"
                      ? "Nombre"
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
        </div>
      )}
    </div>
  );
}
