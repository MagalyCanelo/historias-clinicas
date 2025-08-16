"use client";
import Link from "next/link";
import { FiList, FiPlus } from "react-icons/fi";
import { ReactNode, useState } from "react";
import NavLeft from "./Components/NavLeft";
import ListaMascotas from "./mascotas/lista";
import Especies from "./configuracion/especies";
import Razas from "./configuracion/razas";
import Seguridad from "./configuracion/seguridad";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [activeMenu, setActiveMenu] = useState("Inicio");
  const [activeSubmenu, setActiveSubmenu] = useState<string>("");

  const handleMenuSelect = (menu: string) => {
    setActiveMenu(menu);
    switch (menu) {
      case "Mascotas":
        setActiveSubmenu("Lista Mascotas");
        break;
      case "Historias Clínicas":
        setActiveSubmenu("Ver Historias");
        break;
      case "Clientes":
        setActiveSubmenu("Lista Clientes");
        break;
      case "Personal":
        setActiveSubmenu("Lista Personal");
        break;
      case "Configuración":
        setActiveSubmenu("Especies");
        break;
      default:
        setActiveSubmenu("");
    }
  };

  const linkClass =
    "flex items-center gap-2 bg-white hover:bg-gray-100 text-[#5ac6d2] px-4 py-[6px] rounded-md transition font-semibold";

  // 🔹 Header dinámico
  const renderHeaderLinks = () => {
    switch (activeMenu) {
      case "Mascotas":
        return (
          <>
            <button
              onClick={() => setActiveSubmenu("Lista Mascotas")}
              className={linkClass}
            >
              <FiList size={18} /> Lista de Mascotas
            </button>
            <button
              onClick={() => setActiveSubmenu("Agregar")}
              className={linkClass}
            >
              <FiPlus size={18} /> Agregar Mascota
            </button>
          </>
        );
      case "Historias Clínicas":
        return (
          <>
            <button
              onClick={() => setActiveSubmenu("Ver Historias")}
              className={linkClass}
            >
              Ver Historias Clínicas
            </button>
            <button
              onClick={() => setActiveSubmenu("Nueva Historia")}
              className={linkClass}
            >
              Nueva Historia
            </button>
          </>
        );
      case "Clientes":
        return (
          <>
            <button
              onClick={() => setActiveSubmenu("Lista Clientes")}
              className={linkClass}
            >
              Lista de Clientes
            </button>
            <button
              onClick={() => setActiveSubmenu("Agregar Cliente")}
              className={linkClass}
            >
              Agregar Cliente
            </button>
          </>
        );
      case "Personal":
        return (
          <>
            <button
              onClick={() => setActiveSubmenu("Lista Personal")}
              className={linkClass}
            >
              Lista de Personal
            </button>
            <button
              onClick={() => setActiveSubmenu("Agregar Personal")}
              className={linkClass}
            >
              Agregar Personal
            </button>
          </>
        );
      case "Configuración":
        return (
          <>
            <button
              onClick={() => setActiveSubmenu("Especies")}
              className={linkClass}
            >
              Especies
            </button>
            <button
              onClick={() => setActiveSubmenu("Razas")}
              className={linkClass}
            >
              Razas
            </button>
            <button
              onClick={() => setActiveSubmenu("Seguridad")}
              className={linkClass}
            >
              Seguridad
            </button>
          </>
        );
      default:
        return (
          <Link href={"/admin/"} className={linkClass}>
            Inicio
          </Link>
        );
    }
  };

  // 🔹 Contenido dinámico
  const renderContent = () => {
    if (activeMenu === "Mascotas") {
      if (activeSubmenu === "Lista Mascotas") return <ListaMascotas />;
      if (activeSubmenu === "Agregar")
        return <div>Formulario para agregar mascota</div>;
    }
    if (activeMenu === "Historias Clínicas") {
      if (activeSubmenu === "Ver Historias")
        return <div>Tabla de Historias Clínicas</div>;
      if (activeSubmenu === "Nueva Historia")
        return <div>Formulario Nueva Historia</div>;
    }
    if (activeMenu === "Clientes") {
      if (activeSubmenu === "Lista Clientes")
        return <div>Tabla de Clientes</div>;
      if (activeSubmenu === "Agregar Cliente")
        return <div>Formulario Nuevo Cliente</div>;
    }
    if (activeMenu === "Personal") {
      if (activeSubmenu === "Lista Personal")
        return <div>Tabla de Personal</div>;
      if (activeSubmenu === "Agregar Personal")
        return <div>Formulario Nuevo Personal</div>;
    }
    if (activeMenu === "Configuración") {
      if (activeSubmenu === "Especies") return <Especies />;
      if (activeSubmenu === "Razas") return <Razas />;
      if (activeSubmenu === "Seguridad") return <Seguridad />;
    }
    return <div>Selecciona una opción</div>;
  };

  return (
    <div className="flex min-h-screen bg-stone-50">
      {/* Menú lateral */}
      <NavLeft activeMenu={activeMenu} onSelectMenu={handleMenuSelect} />

      {/* Contenido */}
      <div className="flex-1 flex flex-col p-4">
        {/* 🔹 Header en celeste */}
        <header className="bg-[#5ac6d2] border-b-4 border-[#45b0be] flex gap-4 items-center justify-center p-4 rounded-lg shadow">
          {renderHeaderLinks()}
        </header>

        {/* 🔹 Contenido dinámico */}
        <section className="bg-white border border-gray-200 mt-4 p-6 rounded-lg shadow text-gray-700">
          {renderContent()}
        </section>
      </div>
    </div>
  );
}
