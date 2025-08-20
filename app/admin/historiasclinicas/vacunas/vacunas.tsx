import { useState, useEffect } from "react";
import { FiEdit, FiXCircle } from "react-icons/fi";
import { db } from "@/lib/firebaseConfig";
import ButtonComponent from "../../Components/ButtonComponent";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

interface Especie {
  id: string;
  nombre: string;
}

interface Vacuna {
  id: string; // Aquí ya sabemos que el id será un UUID generado con uuidv4
  nombre: string;
  especieId: string;
}

export default function ListaVacunas() {
  const [vacunas, setVacunas] = useState<Vacuna[]>([]);
  const [especies, setEspecies] = useState<Especie[]>([]);

  const [search, setSearch] = useState("");
  const [especieFiltro, setEspecieFiltro] = useState("");
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevaEspecie, setNuevaEspecie] = useState("");

  const [vacunaEditar, setVacunaEditar] = useState<Vacuna | null>(null);
  const [nombreEditar, setNombreEditar] = useState("");
  const [especieEditar, setEspecieEditar] = useState("");
  const [vacunaEliminar, setVacunaEliminar] = useState<Vacuna | null>(null);

  // Cargar vacunas y especies desde Firebase
  useEffect(() => {
    const fetchData = async () => {
      // Especies
      const especieSnap = await getDocs(collection(db, "especies"));
      const especiesData: Especie[] = especieSnap.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Especie, "id">),
      }));
      setEspecies(especiesData);

      // Vacunas
      const vacunaSnap = await getDocs(collection(db, "tiposVacuna"));
      const vacunasData: Vacuna[] = vacunaSnap.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Vacuna, "id">),
      }));
      setVacunas(vacunasData);
    };
    fetchData();
  }, []);

  // Filtrar por vacuna o especie
  const filtered = vacunas
    .filter((v) => {
      const especieNombre =
        especies.find((e) => e.id === v.especieId)?.nombre || "";
      const searchLower = search.toLowerCase();
      return (
        v.nombre.toLowerCase().includes(searchLower) ||
        especieNombre.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      const especieA = especies.find((e) => e.id === a.especieId)?.nombre || "";
      const especieB = especies.find((e) => e.id === b.especieId)?.nombre || "";

      if (especieA.toLowerCase() < especieB.toLowerCase()) return -1;
      if (especieA.toLowerCase() > especieB.toLowerCase()) return 1;

      if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) return -1;
      if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) return 1;

      return 0;
    });

  // Agregar nueva vacuna
  const agregarVacuna = async () => {
    if (!nuevoNombre || !nuevaEspecie) return;

    const id = uuidv4(); // Generar UUID único

    const nuevaVacuna: Vacuna = {
      id, // El ID único generado
      nombre: nuevoNombre, // Nombre de la vacuna
      especieId: nuevaEspecie, // ID de la especie
    };

    try {
      // Guardar la nueva vacuna en Firestore
      await setDoc(doc(db, "tiposVacuna", id), {
        id: nuevaVacuna.id, // Guardar el ID
        nombre: nuevaVacuna.nombre, // Guardar el nombre
        especieId: nuevaVacuna.especieId, // Guardar el especieId
      });
      setVacunas([...vacunas, nuevaVacuna]);
      setNuevoNombre("");
      setNuevaEspecie("");
    } catch (error) {
      console.error("Error al agregar vacuna:", error);
    }
  };

  // Eliminar vacuna
  const eliminarVacuna = async () => {
    if (!vacunaEliminar) return;

    try {
      await deleteDoc(doc(db, "tiposVacuna", vacunaEliminar.id));
      setVacunas(vacunas.filter((v) => v.id !== vacunaEliminar.id));
      setVacunaEliminar(null);
    } catch (error) {
      console.error("Error al eliminar vacuna:", error);
    }
  };

  // Guardar edición de vacuna
  const guardarEdicion = async () => {
    if (vacunaEditar) {
      const vacunaActualizada: Vacuna = {
        ...vacunaEditar,
        nombre: nombreEditar,
        especieId: especieEditar,
      };

      try {
        await updateDoc(doc(db, "tiposVacuna", vacunaEditar.id), {
          nombre: vacunaActualizada.nombre,
          especieId: vacunaActualizada.especieId,
        });
        setVacunas(
          vacunas.map((v) => (v.id === vacunaEditar.id ? vacunaActualizada : v))
        );
        setVacunaEditar(null);
      } catch (error) {
        console.error("Error al actualizar vacuna:", error);
      }
    }
  };

  return (
    <div className="text-gray-700">
      {/* Formulario agregar */}
      <div className="mb-4 flex gap-2 flex-wrap">
        <input
          type="text"
          placeholder="Nombre de la vacuna"
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
        <ButtonComponent texto="Agregar" onClick={agregarVacuna} />
      </div>

      {/* Filtros */}
      <div className="mb-4 flex gap-2 items-center">
        <input
          type="text"
          placeholder="🔍 Buscar por vacuna o especie"
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
              <th className="p-3 text-left truncate ">Vacuna</th>
              <th className="p-3 text-left truncate ">Especie</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((v) => {
              const especieNombre =
                especies.find((e) => e.id === v.especieId)?.nombre || "";
              return (
                <tr key={v.id} className="hover:bg-[#effdfd] transition-colors">
                  <td className="p-3 truncate">{v.nombre}</td>
                  <td className="p-3 truncate">{especieNombre}</td>
                  <td className="p-3 flex gap-5 justify-center">
                    <FiEdit
                      className="text-xl cursor-pointer text-celeste hover:text-celeste-hover"
                      onClick={() => {
                        setVacunaEditar(v);
                        setNombreEditar(v.nombre);
                        setEspecieEditar(v.especieId);
                      }}
                    />
                    <FiXCircle
                      className="text-xl cursor-pointer text-red-600 hover:text-red-700"
                      onClick={() => setVacunaEliminar(v)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modales */}
      {vacunaEliminar && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-20 p-4">
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-[350px] text-center border border-gray-200">
              <h3 className="text-lg font-semibold mb-3">
                ¿Estás seguro de eliminar?
              </h3>
              <p className="text-gray-600 mb-4">
                Se eliminará la vacuna{" "}
                <span className="font-medium">{vacunaEliminar.nombre}</span>.
              </p>
              <div className="flex justify-center gap-4">
                <ButtonComponent
                  texto="Eliminar"
                  onClick={eliminarVacuna}
                  className="bg-red-500 hover:bg-red-600 text-white"
                />
                <ButtonComponent
                  texto="Cancelar"
                  onClick={() => setVacunaEliminar(null)}
                  className="bg-gray-200 hover:bg-gray-300"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {vacunaEditar && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-20 p-4">
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-[400px] text-center border border-gray-200">
              <h3 className="text-lg font-semibold mb-4">
                Editar vacuna #{vacunaEditar.id}
              </h3>
              <input
                type="text"
                value={nombreEditar}
                onChange={(e) => setNombreEditar(e.target.value)}
                placeholder="Nombre de la vacuna"
                className="w-full mb-4 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ac6d2]"
              />
              <select
                value={especieEditar}
                onChange={(e) => setEspecieEditar(e.target.value)}
                className="w-full mb-4 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ac6d2] h-10.5"
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
                  onClick={() => setVacunaEditar(null)}
                  className="bg-gray-200 hover:bg-gray-300"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
