import { Dispatch, SetStateAction, useEffect, useState } from "react";

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

type Opcion = "Lista de" | "Agregar" | "Tipos";

// Opciones por cada submenú
const submenuOptionsMap: Record<string, Opcion[]> = {
  Vacunas: ["Lista de", "Agregar", "Tipos"],
  Control: ["Lista de", "Agregar", "Tipos"],
  Baños: ["Lista de", "Agregar", "Tipos"],
  Cirugias: ["Lista de", "Agregar", "Tipos"],
};

export default function HistoriasClinicas({
  activeMenu,
  activeSubmenu,
  setActiveSubmenu,
}: HistoriasClinicasProps) {
  const options = submenuOptionsMap[activeSubmenu] || [];
  const [activeOption, setActiveOption] = useState<Opcion>(options[0]);

  // Reset option si cambia el submenu
  useEffect(() => {
    setActiveOption(submenuOptionsMap[activeSubmenu]?.[0] ?? "Lista de");
  }, [activeSubmenu]);

  const renderTiposPlaceholder = (nombre: string) => (
    <div className="text-center text-gray-600 mt-4">
      Aquí puedes mostrar los tipos de <strong>{nombre}</strong>.
    </div>
  );

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
        }
        break;

      case "Control":
        switch (activeOption) {
          case "Lista de":
            return <ListaControl />;
          case "Agregar":
            return <AgregarControl setActiveOption={setActiveOption} />;
          case "Tipos":
            return renderTiposPlaceholder("controles antiparasitarios");
        }
        break;

      case "Baños":
        switch (activeOption) {
          case "Lista de":
            return <ListaPeluqueria />;
          case "Agregar":
            return <AgregarPeluqueria setActiveOption={setActiveOption} />;
          case "Tipos":
            return renderTiposPlaceholder("baños y peluquería");
        }
        break;

      case "Cirugias":
        switch (activeOption) {
          case "Lista de":
            return <ListaCirugia />;
          case "Agregar":
            return <AgregarCirugia setActiveOption={setActiveOption} />;
          case "Tipos":
            return <TiposCirugia />;
        }
        break;
    }

    return (
      <div className="text-center text-red-500">
        No se encontró contenido para este submenú.
      </div>
    );
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
