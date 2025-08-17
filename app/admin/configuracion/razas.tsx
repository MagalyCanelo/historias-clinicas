"use client";
import { useState, useEffect } from "react";
import { FiEdit, FiXCircle } from "react-icons/fi";
import { db } from "@/lib/firebaseConfig";
import ButtonComponent from "../Components/ButtonComponent";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { actualizarRazaFirebase } from "@/actions/razaAction";

interface Especie {
  id: string;
  nombre: string;
}

interface Raza {
  id: string;
  nombre: string;
  especieId: string;
}

export default function ListaRazas() {
  const [razas, setRazas] = useState<Raza[]>([]);
  const [especies, setEspecies] = useState<Especie[]>([]);

  const [search, setSearch] = useState("");
  const [especieFiltro, setEspecieFiltro] = useState("");
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevaEspecie, setNuevaEspecie] = useState("");

  const [razaEditar, setRazaEditar] = useState<Raza | null>(null);
  const [nombreEditar, setNombreEditar] = useState("");
  const [especieEditar, setEspecieEditar] = useState("");
  const [razaEliminar, setRazaEliminar] = useState<Raza | null>(null);

  // Cargar razas y especies desde Firebase
  useEffect(() => {
    const fetchData = async () => {
      // Especies
      const especieSnap = await getDocs(collection(db, "especies"));
      const especiesData: Especie[] = especieSnap.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Especie, "id">),
      }));
      setEspecies(especiesData);

      // Razas
      const razaSnap = await getDocs(collection(db, "razas"));
      const razasData: Raza[] = razaSnap.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Raza, "id">),
      }));
      setRazas(razasData);
    };
    fetchData();
  }, []);

  // Filtrar por raza o especie
  const filtered = razas
    .filter((r) => {
      const especieNombre =
        especies.find((e) => e.id === r.especieId)?.nombre || "";
      const searchLower = search.toLowerCase();
      return (
        r.nombre.toLowerCase().includes(searchLower) ||
        especieNombre.toLowerCase().includes(searchLower)
      );
    })
    // Ordenar por especie alfabéticamente y luego por raza alfabéticamente
    .sort((a, b) => {
      const especieA = especies.find((e) => e.id === a.especieId)?.nombre || "";
      const especieB = especies.find((e) => e.id === b.especieId)?.nombre || "";

      if (especieA.toLowerCase() < especieB.toLowerCase()) return -1;
      if (especieA.toLowerCase() > especieB.toLowerCase()) return 1;

      // Si la especie es igual, ordenar por nombre de raza
      if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) return -1;
      if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) return 1;

      return 0;
    });

  const agregarRaza = async () => {
    if (!nuevoNombre || !nuevaEspecie) return;

    const id = Date.now().toString();
    const nuevaRaza: Raza = {
      id,
      nombre: nuevoNombre,
      especieId: nuevaEspecie,
    };

    try {
      await setDoc(doc(db, "razas", id), nuevaRaza);
      setRazas([...razas, nuevaRaza]);
      setNuevoNombre("");
      setNuevaEspecie("");
    } catch (error) {
      console.error("Error al agregar raza:", error);
    }
  };

  const guardarEdicion = async () => {
    if (razaEditar) {
      const razaActualizada: Raza = {
        ...razaEditar,
        nombre: nombreEditar,
        especieId: especieEditar,
      };

      const exito = await actualizarRazaFirebase(razaActualizada);
      if (exito) {
        setRazas(
          razas.map((r) => (r.id === razaEditar.id ? razaActualizada : r))
        );
        setRazaEditar(null);
      }
    }
  };

  const eliminarRaza = async () => {
    if (!razaEliminar) return;

    try {
      await deleteDoc(doc(db, "razas", razaEliminar.id));
      setRazas(razas.filter((r) => r.id !== razaEliminar.id));
      setRazaEliminar(null);
    } catch (error) {
      console.error("Error al eliminar raza:", error);
    }
  };

  return (
    <div className="text-gray-700">
      {/* Formulario agregar */}
      <div className="mb-4 flex gap-2 flex-wrap">
        <input
          type="text"
          placeholder="Nombre de la raza"
          value={nuevoNombre}
          onChange={(e) => setNuevoNombre(e.target.value)}
          className="p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ac6d2] flex-1 min-w-[150px]"
        />
        <select
          value={nuevaEspecie}
          onChange={(e) => setNuevaEspecie(e.target.value)}
          className="p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ac6d2]"
        >
          <option value="">Selecciona especie</option>
          {especies.map((e) => (
            <option key={e.id} value={e.id}>
              {e.nombre}
            </option>
          ))}
        </select>
        <ButtonComponent texto="Agregar" onClick={agregarRaza} />
      </div>

      {/* Filtros */}
      <div className="mb-4 flex gap-2 items-center">
        <input
          type="text"
          placeholder="🔍 Buscar por raza o especie"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ac6d2] transition"
        />
        <select
          value={especieFiltro}
          onChange={(e) => setEspecieFiltro(e.target.value)}
          className="p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ac6d2] h-10.5"
        >
          <option value="">Todas las especies</option>
          {especies.map((e) => (
            <option key={e.id} value={e.nombre}>
              {e.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto w-full">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden table-fixed">
          <thead className="bg-[#c4eff3] text-gray-700">
            <tr>
              <th className="p-3 text-left truncate ">Raza</th>
              <th className="p-3 text-left truncate ">Especie</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => {
              const especieNombre =
                especies.find((e) => e.id === r.especieId)?.nombre || "";
              return (
                <tr key={r.id} className="hover:bg-[#effdfd] transition-colors">
                  <td className="p-3 truncate">{r.nombre}</td>
                  <td className="p-3 truncate">{especieNombre}</td>
                  <td className="p-3 flex gap-5 justify-center">
                    <FiEdit
                      className="text-xl cursor-pointer text-celeste hover:text-celeste-hover"
                      onClick={() => {
                        setRazaEditar(r);
                        setNombreEditar(r.nombre);
                        setEspecieEditar(r.especieId);
                      }}
                    />
                    <FiXCircle
                      className="text-xl cursor-pointer text-red-600 hover:text-red-700"
                      onClick={() => setRazaEliminar(r)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modales */}
      {razaEliminar && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[350px] text-center border border-gray-200">
            <h3 className="text-lg font-semibold mb-3">
              ¿Estás seguro de eliminar?
            </h3>
            <p className="text-gray-600 mb-4">
              Se eliminará la raza
              <span className="font-medium">{razaEliminar.nombre}</span>.
            </p>
            <div className="flex justify-center gap-4">
              <ButtonComponent
                texto="Eliminar"
                onClick={eliminarRaza}
                className="bg-red-500 hover:bg-red-600 text-white"
              />
              <ButtonComponent
                texto="Cancelar"
                onClick={() => setRazaEliminar(null)}
                className="bg-gray-200 hover:bg-gray-300"
              />
            </div>
          </div>
        </div>
      )}

      {razaEditar && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[400px] text-center border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">
              Editar raza #{razaEditar.id}
            </h3>
            <input
              type="text"
              value={nombreEditar}
              onChange={(e) => setNombreEditar(e.target.value)}
              placeholder="Nombre de la raza"
              className="w-full mb-4 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ac6d2]"
            />
            <select
              value={especieEditar}
              onChange={(e) => setEspecieEditar(e.target.value)}
              className="w-full mb-4 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ac6d2]"
            >
              <option value="">Selecciona especie</option>
              {especies.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.nombre}
                </option>
              ))}
            </select>
            <div className="flex justify-center gap-4">
              <ButtonComponent texto="Guardar" onClick={guardarEdicion} />
              <ButtonComponent
                texto="Cancelar"
                onClick={() => setRazaEditar(null)}
                className="bg-gray-200 hover:bg-gray-300"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
