"use client";

import { Dispatch, SetStateAction, useState } from "react";

interface HistoriasClinicasProps {
  activeMenu: string;
  activeSubmenu: string; // Esta es la sección: "Vacunas", "Control Antiparasitario", etc.
  setActiveSubmenu: Dispatch<SetStateAction<string>>;
}

export default function HistoriasClinicas({
  activeMenu,
  activeSubmenu,
  setActiveSubmenu,
}: HistoriasClinicasProps) {
  const [activeOption, setActiveOption] = useState<"Lista de" | "Agregar">(
    "Lista de"
  );

  // Para mostrar el nombre dinámico según la sección
  const getSectionName = () => {
    switch (activeSubmenu) {
      case "Vacunas":
        return "Vacunas";
      case "Control Antiparasitario":
        return "Control Antiparasitario";
      case "Cirugias":
        return "Cirugías";
      case "Baños & Peluqueria":
        return "Baños & Peluquería";
      default:
        return "";
    }
  };

  return (
    <div className="w-full">
      {/* Submenú centrado */}
      <div className="flex justify-center gap-4 mb-4">
        {["Lista de", "Agregar"].map((option) => (
          <button
            key={option}
            onClick={() => setActiveOption(option as "Lista de" | "Agregar")}
            className={`flex items-center gap-2 px-4 py-[6px] rounded-md font-semibold transition
              ${
                activeOption === option
                  ? "bg-[#5ac6d2] text-white border border-white"
                  : "bg-white text-[#5ac6d2] border border-[#5ac6d2] hover:bg-[#5ac6d2] hover:text-white"
              }`}
          >
            {option} {getSectionName()}
          </button>
        ))}
      </div>

      {/* Contenido según la opción y sección */}
      <div className="w-full">
        {activeOption === "Lista de" && <div>Lista de {getSectionName()}</div>}
        {activeOption === "Agregar" && <div>Agregar {getSectionName()}</div>}
      </div>
    </div>
  );
}
