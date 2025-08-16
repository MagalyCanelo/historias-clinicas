"use client";
import { useState } from "react";
import { FiList, FiPlus } from "react-icons/fi";
import ListaMascotas from "./lista";
import AgregarMascota from "./agregar";

export default function MascotasPage() {
  const [activeTab, setActiveTab] = useState<"lista" | "agregar">("lista");

  const linkClass =
    "flex items-center gap-2 bg-white hover:bg-gray-100 text-[#5ac6d2] px-4 py-[6px] rounded-md transition font-semibold";

  return (
    <div className="flex flex-col h-full">
      {/* NAV SUPERIOR */}
      <div className="bg-[#5ac6d2] p-3 flex gap-4 shadow-md">
        <button onClick={() => setActiveTab("lista")} className={linkClass}>
          <FiList size={18} />
          Lista de Mascotas
        </button>
        <button onClick={() => setActiveTab("agregar")} className={linkClass}>
          <FiPlus size={18} />
          Agregar Mascota
        </button>
      </div>

      {/* CONTENIDO INFERIOR */}
      <div className="flex-1 bg-gray-100 p-6">
        <div className="bg-gray-200 rounded-xl shadow-md p-4 min-h-[400px]">
          {activeTab === "lista" && <ListaMascotas />}
          {activeTab === "agregar" && <AgregarMascota />}
        </div>
      </div>
    </div>
  );
}
