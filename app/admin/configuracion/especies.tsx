"use client";
import { useState } from "react";
import { FiEdit, FiXCircle } from "react-icons/fi";
import ButtonComponent from "../Components/ButtonComponent";
import InputComponent from "../Components/InputComponent";

interface Especie {
  id: number;
  nombre: string;
}

export default function ListaEspecies() {
  const [especies, setEspecies] = useState<Especie[]>([
    { id: 1, nombre: "Canino" },
    { id: 2, nombre: "Felino" },
  ]);

  const [nuevaEspecie, setNuevaEspecie] = useState("");
  const [search, setSearch] = useState("");
  const [especieEliminar, setEspecieEliminar] = useState<Especie | null>(null);
  const [especieEditar, setEspecieEditar] = useState<Especie | null>(null);
  const [nombreEditar, setNombreEditar] = useState("");

  const agregarEspecie = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nuevaEspecie.trim()) return;
    setEspecies([
      ...especies,
      { id: especies.length + 1, nombre: nuevaEspecie },
    ]);
    setNuevaEspecie("");
  };

  const eliminarEspecie = () => {
    if (especieEliminar) {
      setEspecies(especies.filter((e) => e.id !== especieEliminar.id));
      setEspecieEliminar(null);
    }
  };

  const guardarEdicion = () => {
    if (especieEditar) {
      setEspecies(
        especies.map((e) =>
          e.id === especieEditar.id ? { ...e, nombre: nombreEditar } : e
        )
      );
      setEspecieEditar(null);
      setNombreEditar("");
    }
  };

  const filtered = especies.filter((e) =>
    e.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="text-gray-700">
      <form onSubmit={agregarEspecie} className="flex gap-2 mb-4 items-center">
        <InputComponent
          value={nuevaEspecie}
          onChange={(e) => setNuevaEspecie(e.target.value)}
          placeholder="➕ Nueva especie"
        />
        <ButtonComponent texto="Agregar" type="submit" />
      </form>

      <InputComponent
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="🔍 Buscar especie"
      />

      <div className="overflow-x-auto mt-4">
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden table-fixed">
          <thead className="bg-[#c4eff3] text-gray-700">
            <tr>
              <th className="p-3 text-left w-3/4 truncate">Nombre</th>
              <th className="p-3 text-center w-1/4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((e) => (
              <tr key={e.id} className="hover:bg-[#effdfd] transition-colors">
                <td className="p-3 truncate" title={e.nombre}>
                  {e.nombre}
                </td>
                <td className="p-3 flex gap-5 justify-center">
                  <FiEdit
                    className="text-xl cursor-pointer text-[#5ac6d2] hover:text-[#4ab0bb]"
                    onClick={() => {
                      setEspecieEditar(e);
                      setNombreEditar(e.nombre);
                    }}
                  />
                  <FiXCircle
                    className="text-xl cursor-pointer text-red-500 hover:text-red-600"
                    onClick={() => setEspecieEliminar(e)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal eliminar */}
      {especieEliminar && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[350px] text-center border border-gray-200">
            <h3 className="text-lg font-semibold mb-3">
              ¿Estás seguro de eliminar?
            </h3>
            <p className="text-gray-600 mb-4">
              Se eliminará la especie{" "}
              <span className="font-medium">{especieEliminar.nombre}</span>.
            </p>
            <div className="flex justify-center gap-4">
              <ButtonComponent
                texto="Eliminar"
                onClick={eliminarEspecie}
                className="bg-red-500 hover:bg-red-600 text-white"
              />
              <ButtonComponent
                texto="Cancelar"
                onClick={() => setEspecieEliminar(null)}
                className="bg-gray-200 hover:bg-gray-300"
              />
            </div>
          </div>
        </div>
      )}

      {/* Modal editar */}
      {especieEditar && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[400px] text-center border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">
              Editar especie #{especieEditar.id}
            </h3>
            <InputComponent
              value={nombreEditar}
              onChange={(e) => setNombreEditar(e.target.value)}
            />
            <div className="flex justify-center gap-4 mt-2">
              <ButtonComponent
                texto="Guardar"
                onClick={guardarEdicion}
                className="bg-[#5ac6d2] hover:bg-[#4ab0bb] text-white"
              />
              <ButtonComponent
                texto="Cancelar"
                onClick={() => setEspecieEditar(null)}
                className="bg-gray-200 hover:bg-gray-300"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
