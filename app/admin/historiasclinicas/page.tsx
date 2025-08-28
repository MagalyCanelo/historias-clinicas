import { Dispatch, SetStateAction, useState } from "react";

// Importa componentes reales
import ListaVacunas from "./vacunas/lista";
import AgregarVacuna from "./vacunas/agregar";
import Vacunas from "./vacunas/vacunas";

import ListaControl from "./control/lista";
import AgregarControl from "./control/agregar";

import ListaPeluqueria from "./peluqueria/lista";
import AgregarPeluqueria from "./peluqueria/agregar";

import ListaCirugia from "./cirugia/lista";
import AgregarCirugia from "./cirugia/agregar";
import TiposCirugia from "./cirugia/cirugias";

interface HistoriasClinicasProps {
  activeMenu: string;
  activeSubmenu: string;
  setActiveSubmenu: Dispatch<SetStateAction<string>>;
}

// Tipos
type OpcionVacunasCirugias = "Lista de" | "Agregar" | "Tipos";
type OpcionControlPeluqueria = "Lista de" | "Agregar";

// Configuración por submenu
const submenuOptionsMap: Record<
  string,
  Array<"Lista de" | "Agregar" | "Tipos">
> = {
  Vacunas: ["Lista de", "Agregar", "Tipos"],
  Control: ["Lista de", "Agregar"],
  Peluqueria: ["Lista de", "Agregar"],
  Cirugias: ["Lista de", "Agregar", "Tipos"],
};

export default function HistoriasClinicas({
  activeMenu,
  activeSubmenu,
  setActiveSubmenu,
}: HistoriasClinicasProps) {
  const options = submenuOptionsMap[activeSubmenu] || [];

  // Tipado general para activeOption
  const [activeOption, setActiveOption] = useState<
    OpcionVacunasCirugias | OpcionControlPeluqueria
  >(options[0]);

  const renderContent = () => {
    switch (activeSubmenu) {
      case "Vacunas":
        switch (activeOption) {
          case "Lista de":
            return <ListaVacunas />;
          case "Agregar":
            return (
              <AgregarVacuna
                setActiveOption={
                  setActiveOption as Dispatch<
                    SetStateAction<OpcionVacunasCirugias>
                  >
                }
              />
            );
          case "Tipos":
            return <Vacunas />;
        }
        break;

      case "Control":
        switch (activeOption) {
          case "Lista de":
            return <ListaControl />;
          case "Agregar":
            return (
              <AgregarControl
                setActiveOption={
                  setActiveOption as Dispatch<
                    SetStateAction<OpcionControlPeluqueria>
                  >
                }
              />
            );
        }
        break;

      case "Peluquería":
        switch (activeOption) {
          case "Lista de":
            return <ListaPeluqueria />;
          case "Agregar":
            return <AgregarPeluqueria />;
        }
        break;

      case "Cirugias":
        switch (activeOption) {
          case "Lista de":
            return <ListaCirugia />;
          case "Agregar":
            return (
              <AgregarCirugia
                setActiveOption={
                  setActiveOption as Dispatch<
                    SetStateAction<OpcionVacunasCirugias>
                  >
                }
              />
            );
          case "Tipos":
            return <TiposCirugia />;
        }
        break;
    }

    return null;
  };

  return (
    <div className="w-full">
      {/* Botones dinámicos */}
      <div className="flex justify-center gap-4 mb-4">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => setActiveOption(option)}
            className={`flex items-center gap-2 px-4 py-[6px] rounded-md font-semibold transition
              ${
                activeOption === option
                  ? "bg-[#5ac6d2] text-white border border-white"
                  : "bg-white text-[#5ac6d2] border border-[#5ac6d2] hover:bg-[#5ac6d2] hover:text-white"
              }`}
          >
            {option} {activeSubmenu}
          </button>
        ))}
      </div>

      {/* Contenido dinámico */}
      <div className="w-full">{renderContent()}</div>
    </div>
  );
}
