"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { Vacuna, Mascota, Cliente, Especie } from "@/app/types/types";
import { agregarVacuna } from "@/actions/vacunaAction";
import { obtenerTodasLasMascotas } from "@/actions/mascotaAction";
import { obtenerTodosLosClientes } from "@/actions/clienteAction";
import { obtenerTodosLosTiposVacuna } from "@/actions/tipoVacunaAction";
import { obtenerTodasLasEspecies } from "@/actions/especieAction";

export default function AgregarVacuna() {
  const router = useRouter();

  const [form, setForm] = useState<Vacuna>({
    id: uuidv4(),
    mascotaId: "",
    tipoVacuna: "",
    fechaAplicada: "",
    proximaDosis: "",
    observaciones: "",
  });

  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [especies, setEspecies] = useState<Especie[]>([]); // Cambié el tipo a Especie

  const [tiposVacuna, setTiposVacuna] = useState<
    { id: string; nombre: string; especieId: string }[]
  >([]); // Agregar especieId
  const [filtroMascota, setFiltroMascota] = useState("");
  const [loading, setLoading] = useState(false);
  const [especieSeleccionada, setEspecieSeleccionada] = useState<string>("");

  // Cargar mascotas
  useEffect(() => {
    const fetchMascotas = async () => {
      const data = await obtenerTodasLasMascotas();
      setMascotas(data);
    };
    fetchMascotas();
  }, []);

  // Cargar clientes
  useEffect(() => {
    const fetchClientes = async () => {
      const data = await obtenerTodosLosClientes();
      setClientes(data);
    };
    fetchClientes();
  }, []);

  // Cargar especies
  useEffect(() => {
    const fetchEspecies = async () => {
      const data = await obtenerTodasLasEspecies();
      setEspecies(data);
    };
    fetchEspecies();
  }, []);

  // Cargar tipos de vacuna
  useEffect(() => {
    const fetchVacunas = async () => {
      const data = await obtenerTodosLosTiposVacuna();
      setTiposVacuna(data);
    };
    fetchVacunas();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMascotaSelect = (mascotaId: string, nombre: string) => {
    setForm({ ...form, mascotaId });
    setFiltroMascota(nombre);
  };

  const handleTipoVacunaSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tipoId = e.target.value;
    setForm({ ...form, tipoVacuna: tipoId });

    // Obtener especie asociada al tipo de vacuna seleccionado
    const tipoVacuna = tiposVacuna.find((tv) => tv.id === tipoId);
    if (tipoVacuna) {
      setEspecieSeleccionada(tipoVacuna.especieId); // Establecer la especie seleccionada
    }
  };

  const getDuenoNombre = (clienteId: string) =>
    clientes.find((c) => c.id === clienteId)?.nombreCompleto || "—";

  const getEspecieNombre = (especieId: string) =>
    especies.find((m) => m.id === especieId)?.nombre || "—";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.mascotaId) {
      alert("Selecciona una mascota válida");
      return;
    }
    setLoading(true);
    await agregarVacuna(form);
    alert("Vacuna agregada!");
    setForm({
      id: uuidv4(),
      mascotaId: "",
      tipoVacuna: "",
      fechaAplicada: "",
      proximaDosis: "",
      observaciones: "",
    });
    setFiltroMascota("");
    setLoading(false);

    router.push("/historias-clinicas/vacunas/lista");
  };

  // Filtrar mascotas mientras se escribe
  const mascotasFiltradas =
    !form.mascotaId && filtroMascota
      ? mascotas.filter((m) =>
          m.nombre.toLowerCase().includes(filtroMascota.toLowerCase())
        )
      : [];

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap gap-4 w-full p-4 border rounded-md shadow"
    >
      <h2 className="w-full text-lg font-bold mb-2">Agregar Vacuna</h2>

      {/* Selección de Mascota */}
      <div className="flex-1 min-w-[45%] relative">
        <label className="block mb-1">Mascota</label>
        <input
          type="text"
          value={filtroMascota}
          onChange={(e) => {
            setFiltroMascota(e.target.value);
            if (form.mascotaId) setForm({ ...form, mascotaId: "" });
          }}
          placeholder="Escribe el nombre de la mascota"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5ac6d2] transition"
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

      {/* Dueño al costado */}
      {form.mascotaId && (
        <div className="flex-1 min-w-[45%]">
          <label className="block mb-1">Dueño</label>
          <input
            type="text"
            value={getDuenoNombre(
              mascotas.find((m) => m.id === form.mascotaId)?.duenoId || ""
            )}
            disabled
            className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-700"
          />
        </div>
      )}

      {/* Tipo de vacuna (desde BD) */}
      <div className="flex-1 min-w-[45%]">
        <label className="block mb-1">Tipo de Vacuna</label>
        <select
          name="tipoVacuna"
          value={form.tipoVacuna}
          onChange={handleTipoVacunaSelect} // Cambié aquí para que maneje el cambio de tipo de vacuna
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5ac6d2] transition"
          required
        >
          <option value="">Selecciona un tipo</option>
          {tiposVacuna.map((tv) => (
            <option key={tv.id} value={tv.id}>
              {tv.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Mostrar el campo de especie solo cuando se haya seleccionado un tipo de vacuna */}
      {especieSeleccionada && (
        <div className="flex-1 min-w-[45%]">
          <label className="block mb-1">Especie</label>
          <input
            type="text"
            value={getEspecieNombre(especieSeleccionada)} // Mostrar el nombre de la especie
            disabled
            className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-700"
          />
        </div>
      )}

      {/* Fechas */}
      <div className="flex flex-1 gap-4 min-w-[45%]">
        <div className="flex-1">
          <label className="block mb-1">Fecha Aplicada</label>
          <input
            type="date"
            name="fechaAplicada"
            value={form.fechaAplicada}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5ac6d2] transition"
            required
          />
        </div>

        <div className="flex-1">
          <label className="block mb-1">Próxima Dosis</label>
          <input
            type="date"
            name="proximaDosis"
            value={form.proximaDosis}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5ac6d2] transition"
            required
          />
        </div>
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
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5ac6d2] transition"
        />
      </div>

      {/* Botón */}
      <div className="w-full pt-1.5">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#5ac6d2] text-white p-2 rounded hover:bg-[#49b2c1] transition"
        >
          {loading ? "Guardando" : "Agregar Vacuna"}
        </button>
      </div>
    </form>
  );
}
