"use client";
import { useState } from "react";
import { FiEdit, FiXCircle } from "react-icons/fi";

interface Especie {
  id: string;
  nombre: string;
}

interface Raza {
  id: string;
  nombre: string;
  especieId: string;
}

interface ButtonProps {
  texto: string;
  onClick: () => void;
  color?: string; // color de fondo opcional
}

const ButtonComponent = ({
  texto,
  onClick,
  color = "#5ac6d2",
}: ButtonProps) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg text-white transition hover:opacity-90`}
    style={{ backgroundColor: color }}
  >
    {texto}
  </button>
);

// Datos de ejemplo
const dataEspecies: Especie[] = [
  { id: "1", nombre: "Perro" },
  { id: "2", nombre: "Gato" },
];

export default function ListaRazas() {
  const [razas, setRazas] = useState<Raza[]>([
    { id: "1", nombre: "Labrador", especieId: "1" },
    { id: "2", nombre: "Golden Retriever", especieId: "1" },
    { id: "3", nombre: "Siamés", especieId: "2" },
    { id: "4", nombre: "Persa", especieId: "2" },
  ]);

  const [search, setSearch] = useState("");
  const [especieFiltro, setEspecieFiltro] = useState("");
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevaEspecie, setNuevaEspecie] = useState("");

  const [razaEditar, setRazaEditar] = useState<Raza | null>(null);
  const [nombreEditar, setNombreEditar] = useState("");
  const [especieEditar, setEspecieEditar] = useState("");
  const [razaEliminar, setRazaEliminar] = useState<Raza | null>(null);

  const filtered = razas.filter((r) => {
    const especieNombre =
      dataEspecies.find((e) => e.id === r.especieId)?.nombre || "";
    return (
      r.nombre.toLowerCase().includes(search.toLowerCase()) &&
      (especieFiltro ? especieNombre === especieFiltro : true)
    );
  });

  const agregarRaza = () => {
    if (!nuevoNombre || !nuevaEspecie) return;
    const nuevaRaza: Raza = {
      id: Date.now().toString(),
      nombre: nuevoNombre,
      especieId: nuevaEspecie,
    };
    setRazas([...razas, nuevaRaza]);
    setNuevoNombre("");
    setNuevaEspecie("");
  };

  const guardarEdicion = () => {
    if (!nombreEditar || !especieEditar) return;
    setRazas(
      razas.map((r) =>
        r.id === razaEditar?.id
          ? { ...r, nombre: nombreEditar, especieId: especieEditar }
          : r
      )
    );
    setRazaEditar(null);
    setNombreEditar("");
    setEspecieEditar("");
  };

  const eliminarRaza = () => {
    if (!razaEliminar) return;
    setRazas(razas.filter((r) => r.id !== razaEliminar.id));
    setRazaEliminar(null);
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
          {dataEspecies.map((e) => (
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
          placeholder="🔍 Buscar por raza"
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
          {dataEspecies.map((e) => (
            <option key={e.id} value={e.nombre}>
              {e.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-[#c4eff3] text-gray-700">
            <tr>
              <th className="p-3 text-left">Raza</th>
              <th className="p-3 text-left">Especie</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => {
              const especieNombre =
                dataEspecies.find((e) => e.id === r.especieId)?.nombre || "";
              return (
                <tr key={r.id} className="hover:bg-[#effdfd] transition-colors">
                  <td className="p-3">{r.nombre}</td>
                  <td className="p-3">{especieNombre}</td>
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

      {/* Modales (Eliminar y Editar) */}
      {razaEliminar && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[350px] text-center border border-gray-200">
            <h3 className="text-lg font-semibold mb-3">
              ¿Estás seguro de eliminar?
            </h3>
            <p className="text-gray-600 mb-4">
              Se eliminará la raza{" "}
              <span className="font-medium">{razaEliminar.nombre}</span>.
            </p>
            <div className="flex justify-center gap-4">
              <ButtonComponent
                texto="Eliminar"
                onClick={eliminarRaza}
                color="#f56565"
              />
              <ButtonComponent
                texto="Cancelar"
                onClick={() => setRazaEliminar(null)}
                color="#a0aec0"
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
              {dataEspecies.map((e) => (
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
                color="#a0aec0"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
