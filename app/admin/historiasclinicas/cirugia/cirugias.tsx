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

interface TipoCirugia {
  id: string;
  nombre: string;
}

export default function ListaTiposCirugia() {
  const [tiposCirugia, setTiposCirugia] = useState<TipoCirugia[]>([]);
  const [search, setSearch] = useState("");
  const [nuevoNombre, setNuevoNombre] = useState("");

  const [cirugiaEditar, setCirugiaEditar] = useState<TipoCirugia | null>(null);
  const [nombreEditar, setNombreEditar] = useState("");
  const [cirugiaEliminar, setCirugiaEliminar] = useState<TipoCirugia | null>(
    null
  );

  // Cargar tipos de cirugía desde Firebase
  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "tiposCirugia"));
      const data: TipoCirugia[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<TipoCirugia, "id">),
      }));
      setTiposCirugia(data);
    };
    fetchData();
  }, []);

  // Filtrar por nombre
  const filtered = tiposCirugia
    .filter((t) => t.nombre.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.nombre.localeCompare(b.nombre));

  // Agregar nuevo tipo de cirugía
  const agregarCirugia = async () => {
    if (!nuevoNombre.trim()) return;

    const id = uuidv4();
    const nuevaCirugia: TipoCirugia = { id, nombre: nuevoNombre.trim() };

    try {
      await setDoc(doc(db, "tiposCirugia", id), nuevaCirugia);
      setTiposCirugia([...tiposCirugia, nuevaCirugia]);
      setNuevoNombre("");
    } catch (error) {
      console.error("Error al agregar tipo de cirugía:", error);
    }
  };

  // Eliminar tipo de cirugía
  const eliminarCirugia = async () => {
    if (!cirugiaEliminar) return;

    try {
      await deleteDoc(doc(db, "tiposCirugia", cirugiaEliminar.id));
      setTiposCirugia(tiposCirugia.filter((t) => t.id !== cirugiaEliminar.id));
      setCirugiaEliminar(null);
    } catch (error) {
      console.error("Error al eliminar tipo de cirugía:", error);
    }
  };

  // Guardar edición de tipo de cirugía
  const guardarEdicion = async () => {
    if (cirugiaEditar) {
      const updatedCirugia: TipoCirugia = {
        ...cirugiaEditar,
        nombre: nombreEditar.trim(),
      };

      try {
        await updateDoc(doc(db, "tiposCirugia", cirugiaEditar.id), {
          nombre: updatedCirugia.nombre,
        });
        setTiposCirugia(
          tiposCirugia.map((t) =>
            t.id === cirugiaEditar.id ? updatedCirugia : t
          )
        );
        setCirugiaEditar(null);
      } catch (error) {
        console.error("Error al actualizar tipo de cirugía:", error);
      }
    }
  };

  return (
    <div className="text-gray-700 p-2">
      {/* Formulario agregar */}
      <div className="mb-4 flex gap-2 flex-wrap">
        <input
          type="text"
          placeholder="Nombre de la cirugía"
          value={nuevoNombre}
          onChange={(e) => setNuevoNombre(e.target.value)}
          className="p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ac6d2] flex-1 min-w-[150px]"
        />
        <ButtonComponent texto="Agregar" onClick={agregarCirugia} />
      </div>

      {/* Filtro búsqueda */}
      <div className="mb-4 flex gap-2 items-center">
        <input
          type="text"
          placeholder="🔍 Buscar tipo de cirugía"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ac6d2] transition"
        />
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto w-full">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden table-fixed">
          <thead className="bg-[#c4eff3] text-gray-700">
            <tr>
              <th className="p-3 text-left truncate">Tipo de cirugía</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr
                key={t.id}
                className="hover:bg-[#effdfd] transition-colors cursor-default"
              >
                <td className="p-3 truncate">{t.nombre}</td>
                <td className="p-3 flex gap-5 justify-center">
                  <FiEdit
                    className="text-xl cursor-pointer text-celeste hover:text-celeste-hover"
                    onClick={() => {
                      setCirugiaEditar(t);
                      setNombreEditar(t.nombre);
                    }}
                  />
                  <FiXCircle
                    className="text-xl cursor-pointer text-red-600 hover:text-red-700"
                    onClick={() => setCirugiaEliminar(t)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal eliminar */}
      {cirugiaEliminar && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-20 p-4">
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-[350px] text-center border border-gray-200">
              <h3 className="text-lg font-semibold mb-3">
                ¿Estás seguro de eliminar?
              </h3>
              <p className="text-gray-600 mb-4">
                Se eliminará el tipo de cirugía{" "}
                <span className="font-medium">{cirugiaEliminar.nombre}</span>.
              </p>
              <div className="flex justify-center gap-4">
                <ButtonComponent
                  texto="Eliminar"
                  onClick={eliminarCirugia}
                  className="bg-red-500 hover:bg-red-600 text-white"
                />
                <ButtonComponent
                  texto="Cancelar"
                  onClick={() => setCirugiaEliminar(null)}
                  className="bg-gray-200 hover:bg-gray-300"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal editar */}
      {cirugiaEditar && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-20 p-4">
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-[400px] text-center border border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Editar cirugía</h3>
              <input
                type="text"
                value={nombreEditar}
                onChange={(e) => setNombreEditar(e.target.value)}
                placeholder="Nombre de la cirugía"
                className="w-full mb-4 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ac6d2]"
              />
              <div className="flex justify-center gap-4">
                <ButtonComponent texto="Guardar" onClick={guardarEdicion} />
                <ButtonComponent
                  texto="Cancelar"
                  onClick={() => setCirugiaEditar(null)}
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
