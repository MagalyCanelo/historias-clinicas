"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { agregarCirugia } from "@/actions/cirugiaAction";
import { obtenerTodosLosTiposCirugia } from "@/actions/tipoCirugiaAction";
import { obtenerTodasLasMascotas } from "@/actions/mascotaAction";
import { obtenerTodosLosClientes } from "@/actions/clienteAction";
import { Cirugia, Mascota, Cliente } from "@/app/types/types";

type AgregarCirugiaProps = {
  setActiveOption: React.Dispatch<
    React.SetStateAction<"Lista de" | "Agregar" | "Tipos">
  >;
};

export default function AgregarCirugia({
  setActiveOption,
}: AgregarCirugiaProps) {
  const [form, setForm] = useState<Cirugia>({
    id: uuidv4(),
    mascotaId: "",
    tipoCirugia: "",
    fecha: "",
    observaciones: "",
    estado: "Programada",
  });

  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [tiposCirugia, setTiposCirugia] = useState<
    { id: string; nombre: string }[]
  >([]);
  const [filtroMascota, setFiltroMascota] = useState("");
  const [loading, setLoading] = useState(false);

  // Cargar datos
  useEffect(() => {
    const fetchData = async () => {
      const [mascotasData, clientesData, tiposData] = await Promise.all([
        obtenerTodasLasMascotas(),
        obtenerTodosLosClientes(),
        obtenerTodosLosTiposCirugia(),
      ]);
      setMascotas(mascotasData);
      setClientes(clientesData);
      setTiposCirugia(tiposData);
    };

    fetchData();
  }, []);

  // Helpers
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMascotaSelect = (mascotaId: string, nombre: string) => {
    setForm({ ...form, mascotaId });
    setFiltroMascota(nombre);
  };

  const getDuenoNombre = (clienteId: string) =>
    clientes.find((c) => c.id === clienteId)?.nombreCompleto || "—";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.mascotaId || !form.tipoCirugia || !form.fecha) {
      alert("Completa todos los campos obligatorios.");
      return;
    }

    setLoading(true);
    const success = await agregarCirugia(form);
    setLoading(false);

    if (success) {
      alert("Cirugía agregada correctamente.");
      setForm({
        id: uuidv4(),
        mascotaId: "",
        tipoCirugia: "",
        fecha: "",
        observaciones: "",
        estado: "Programada",
      });
      setFiltroMascota("");
      setActiveOption("Lista de");
    } else {
      alert("Error al guardar la cirugía.");
    }
  };

  const mascotasFiltradas =
    !form.mascotaId && filtroMascota
      ? mascotas.filter((m) =>
          m.nombre.toLowerCase().includes(filtroMascota.toLowerCase())
        )
      : [];

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 w-full p-2">
      {/* Mascota */}
      <div className="flex-1 min-w-[45%] relative">
        <label className="block mb-1">Mascota</label>
        <input
          type="text"
          value={filtroMascota}
          onChange={(e) => {
            setFiltroMascota(e.target.value);
            if (form.mascotaId) setForm({ ...form, mascotaId: "" });
          }}
          placeholder="Buscar mascota"
          className="w-full p-2 border border-gray-300 rounded focus:ring-[#5ac6d2] focus:outline-none focus:ring-2 transition"
          required
        />
        {mascotasFiltradas.length > 0 && (
          <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded shadow max-h-40 overflow-auto z-10">
            {mascotasFiltradas.map((m) => (
              <li
                key={m.id}
                onClick={() => handleMascotaSelect(m.id, m.nombre)}
                className="p-2 hover:bg-[#e0f7fa] cursor-pointer"
              >
                {m.nombre}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Dueño */}
      {form.mascotaId && (
        <div className="flex-1 min-w-[45%]">
          <label className="block mb-1">Dueño</label>
          <input
            type="text"
            disabled
            value={getDuenoNombre(
              mascotas.find((m) => m.id === form.mascotaId)?.duenoId || ""
            )}
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>
      )}

      {/* Tipo de cirugía */}
      <div className="flex-1 min-w-[45%]">
        <label className="block mb-1">Tipo de Cirugía</label>
        <select
          name="tipoCirugia"
          value={form.tipoCirugia}
          onChange={handleChange}
          className="w-full h-10.5 p-2 border border-gray-300 rounded focus:ring-[#5ac6d2] focus:outline-none focus:ring-2 transition"
          required
        >
          <option value="">Selecciona un tipo</option>
          {tiposCirugia.map((tipo) => (
            <option key={tipo.id} value={tipo.id}>
              {tipo.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Fecha */}
      <div className="flex-1 min-w-[45%]">
        <label className="block mb-1">Fecha</label>
        <input
          type="date"
          name="fecha"
          value={form.fecha}
          onChange={handleChange}
          className="w-full h-10.5 p-2 border border-gray-300 rounded focus:ring-[#5ac6d2] focus:outline-none focus:ring-2 transition"
          required
        />
      </div>

      {/* Estado */}
      <div className="flex-1 min-w-[45%]">
        <label className="block mb-1">Estado</label>
        <select
          name="estado"
          value={form.estado}
          onChange={handleChange}
          className="w-full h-10.5 p-2 border border-gray-300 rounded focus:ring-[#5ac6d2] focus:outline-none focus:ring-2 transition"
        >
          <option value="Programada">Programada</option>
          <option value="Realizada">Realizada</option>
          <option value="Cancelada">Cancelada</option>
        </select>
      </div>

      {/* Observaciones */}
      <div className="w-full">
        <label className="block mb-1">Observaciones</label>
        <input
          type="text"
          name="observaciones"
          value={form.observaciones}
          onChange={handleChange}
          placeholder="Observaciones"
          className="w-full p-2 border border-gray-300 rounded focus:ring-[#5ac6d2] focus:outline-none focus:ring-2 transition"
        />
      </div>

      {/* Botón */}
      <div className="w-full pt-1.5">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#5ac6d2] text-white p-2 rounded hover:bg-[#49b2c1] transition"
        >
          {loading ? "Guardando" : "Agregar Cirugía"}
        </button>
      </div>
    </form>
  );
}
