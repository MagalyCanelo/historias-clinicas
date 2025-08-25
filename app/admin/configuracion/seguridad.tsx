"use client";

import { useEffect, useState } from "react";
import { FiEdit, FiXCircle } from "react-icons/fi";
import { obtenerTodoElPersonal } from "@/actions/personalAction";
import ButtonComponent from "../Components/ButtonComponent";

interface Persona {
  id: string;
  nombre: string;
  rol: string;
}

interface Personal {
  id: string;
  nombre: string;
  celular?: string;
  correo?: string;
  rol?: string;
  estado?: string;
}

interface ButtonProps {
  texto: string;
  onClick: () => void;
  color?: string;
}

const roles = ["Solo Ver", "Editar"];

export default function ListaRoles() {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [search, setSearch] = useState("");
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoRol, setNuevoRol] = useState("");

  const [personaEditar, setPersonaEditar] = useState<Persona | null>(null);
  const [nombreEditar, setNombreEditar] = useState("");
  const [rolEditar, setRolEditar] = useState("");
  const [personaEliminar, setPersonaEliminar] = useState<Persona | null>(null);

  // Para autocompletado
  const [personalDb, setPersonalDb] = useState<Personal[]>([]);
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);

  // Cargar personal de Firebase al iniciar
  useEffect(() => {
    async function fetchPersonal() {
      const data = await obtenerTodoElPersonal();

      // Convertimos estado boolean a string
      const personalConEstadoString = data.map((p) => ({
        ...p,
        estado:
          typeof p.estado === "boolean"
            ? p.estado
              ? "activo"
              : "inactivo"
            : p.estado || "inactivo",
      }));

      setPersonalDb(personalConEstadoString);
    }
    fetchPersonal();
  }, []);

  // Filtrado para mostrar sugerencias (que contengan el texto escrito)
  const sugerencias = personalDb.filter((p) =>
    p.nombre.toLowerCase().includes(nuevoNombre.toLowerCase())
  );

  // Filtrar la tabla por búsqueda normal
  const filtered = personas.filter((p) =>
    p.nombre.toLowerCase().includes(search.toLowerCase())
  );

  const agregarPersona = () => {
    if (!nuevoNombre || !nuevoRol) return;

    // Opcional: si quieres evitar nombres duplicados en personas, lo puedes checar aquí

    const nuevaPersona: Persona = {
      id: Date.now().toString(),
      nombre: nuevoNombre,
      rol: nuevoRol,
    };
    setPersonas([...personas, nuevaPersona]);
    setNuevoNombre("");
    setNuevoRol("");
    setMostrarSugerencias(false);
  };

  const guardarEdicion = () => {
    if (!nombreEditar || !rolEditar) return;
    setPersonas(
      personas.map((p) =>
        p.id === personaEditar?.id
          ? { ...p, nombre: nombreEditar, rol: rolEditar }
          : p
      )
    );
    setPersonaEditar(null);
    setNombreEditar("");
    setRolEditar("");
  };

  const eliminarPersona = () => {
    if (!personaEliminar) return;
    setPersonas(personas.filter((p) => p.id !== personaEliminar.id));
    setPersonaEliminar(null);
  };

  // Función para seleccionar sugerencia y ocultar lista
  const seleccionarSugerencia = (nombre: string) => {
    setNuevoNombre(nombre);
    setMostrarSugerencias(false);
  };

  return (
    <div className="text-gray-700 relative">
      {/* Formulario agregar */}
      <div className="mb-4 flex gap-2 flex-wrap relative">
        <div className="flex-1 min-w-[150px] relative">
          <input
            type="text"
            placeholder="Nombre de la persona"
            value={nuevoNombre}
            onChange={(e) => {
              setNuevoNombre(e.target.value);
              setMostrarSugerencias(true);
            }}
            onBlur={() => {
              // Esperar un poco para que click en sugerencia funcione antes de ocultar
              setTimeout(() => setMostrarSugerencias(false), 100);
            }}
            onFocus={() => {
              if (nuevoNombre.length > 0) setMostrarSugerencias(true);
            }}
            className="p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ac6d2] w-full"
            autoComplete="off"
          />
          {mostrarSugerencias && sugerencias.length > 0 && (
            <ul className="absolute z-50 bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-auto w-full shadow-lg">
              {sugerencias.map((p) => (
                <li
                  key={p.id}
                  onMouseDown={() => seleccionarSugerencia(p.nombre)}
                  className="p-2 cursor-pointer hover:bg-[#5ac6d2] hover:text-white"
                >
                  {p.nombre}
                </li>
              ))}
            </ul>
          )}
        </div>

        <select
          value={nuevoRol}
          onChange={(e) => setNuevoRol(e.target.value)}
          className="p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ac6d2]"
        >
          <option value="">Selecciona rol</option>
          {roles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <ButtonComponent texto="Agregar" onClick={agregarPersona} />
      </div>

      {/* Filtro por búsqueda */}
      <div className="mb-4 flex gap-2 items-center">
        <input
          type="text"
          placeholder="🔍 Buscar por nombre"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ac6d2] transition"
        />
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-[#c4eff3] text-gray-700">
            <tr>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Rol</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-[#effdfd] transition-colors">
                <td className="p-3">{p.nombre}</td>
                <td className="p-3">{p.rol}</td>
                <td className="p-3 flex gap-5 justify-center">
                  <FiEdit
                    className="text-xl cursor-pointer text-celeste hover:text-celeste-hover"
                    onClick={() => {
                      setPersonaEditar(p);
                      setNombreEditar(p.nombre);
                      setRolEditar(p.rol);
                    }}
                  />
                  <FiXCircle
                    className="text-xl cursor-pointer text-red-600 hover:text-red-700"
                    onClick={() => setPersonaEliminar(p)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modales */}
      {personaEliminar && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[350px] text-center border border-gray-200">
            <h3 className="text-lg font-semibold mb-3">
              ¿Estás seguro de eliminar?
            </h3>
            <p className="text-gray-600 mb-4">
              Se eliminará la persona{" "}
              <span className="font-medium">{personaEliminar.nombre}</span>.
            </p>
            <div className="flex justify-center gap-4">
              <ButtonComponent
                texto="Eliminar"
                onClick={eliminarPersona}
                className="bg-red-500 hover:bg-red-600 text-white"
              />
              <ButtonComponent
                texto="Cancelar"
                onClick={() => setPersonaEliminar(null)}
                className="bg-gray-200 hover:bg-gray-300"
              />
            </div>
          </div>
        </div>
      )}

      {personaEditar && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[400px] text-center border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Editar persona</h3>
            <input
              type="text"
              value={nombreEditar}
              onChange={(e) => setNombreEditar(e.target.value)}
              placeholder="Nombre de la persona"
              className="w-full mb-4 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ac6d2]"
            />
            <select
              value={rolEditar}
              onChange={(e) => setRolEditar(e.target.value)}
              className="w-full mb-4 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ac6d2]"
            >
              <option value="">Selecciona rol</option>
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <div className="flex justify-center gap-4">
              <ButtonComponent texto="Guardar" onClick={guardarEdicion} />
              <ButtonComponent
                texto="Cancelar"
                onClick={() => setPersonaEditar(null)}
                className="bg-gray-200 hover:bg-gray-300"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
