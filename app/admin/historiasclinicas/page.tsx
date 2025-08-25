import { Dispatch, SetStateAction, useState } from "react";

// Importa tus componentes reales aquí
import ListaVacunas from "./vacunas/lista";
import AgregarVacuna from "./vacunas/agregar";
import Vacunas from "./vacunas/vacunas";

interface HistoriasClinicasProps {
  activeMenu: string;
  activeSubmenu: string;
  setActiveSubmenu: Dispatch<SetStateAction<string>>;
}

export default function HistoriasClinicas({
  activeMenu,
  activeSubmenu,
  setActiveSubmenu,
}: HistoriasClinicasProps) {
  const [activeOption, setActiveOption] = useState<
    "Lista de" | "Agregar" | "Tipos"
  >("Lista de");

  const getSectionName = () => {
    switch (activeSubmenu) {
      case "Vacunas":
        return "Vacunas";
      default:
        return "";
    }
  };

  const renderContent = () => {
    switch (activeSubmenu) {
      case "Vacunas":
        switch (activeOption) {
          case "Lista de":
            return <ListaVacunas />;
          case "Agregar":
            return <AgregarVacuna setActiveOption={setActiveOption} />;
          case "Tipos":
            return <Vacunas />;
          default:
            return null;
        }
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-center gap-4 mb-4">
        {["Lista de", "Agregar", "Tipos"].map((option) => (
          <button
            key={option}
            onClick={() =>
              setActiveOption(option as "Lista de" | "Agregar" | "Tipos")
            }
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

      <div className="w-full">{renderContent()}</div>
    </div>
  );
}
