"use client";
import Link from "next/link";
import { FiList, FiPlus } from "react-icons/fi";
import { ReactNode, useState } from "react";
import NavLeft from "./Components/NavLeft";
import ListaMascotas from "./mascotas/lista";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [activeMenu, setActiveMenu] = useState("Inicio");
  const [activeSubmenu, setActiveSubmenu] = useState<string>("");

  const handleMenuSelect = (menu: string) => {
    setActiveMenu(menu);
    // 👉 al cambiar de menú, por defecto se muestra la primera opción
    switch (menu) {
      case "Mascotas":
        setActiveSubmenu("Lista");
        break;
      case "Gestión de Tours":
        setActiveSubmenu("Ver Tours");
        break;
      case "Gestión de Reservas":
        setActiveSubmenu("Ver Reservas");
        break;
      case "Cancelaciones":
        setActiveSubmenu("Ver Cancelaciones");
        break;
      case "Ajustes":
        setActiveSubmenu("Configuraciones");
        break;
      default:
        setActiveSubmenu("");
    }
  };

  // 🎨 estilos para los links
  const linkClass =
    "flex items-center gap-2 bg-white hover:bg-gray-100 text-[#5ac6d2] px-4 py-[6px] rounded-md transition font-semibold";

  // 🔹 Menú de arriba
  const renderHeaderLinks = () => {
    switch (activeMenu) {
      case "Mascotas":
        return (
          <>
            <button
              onClick={() => setActiveSubmenu("Lista")}
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
      case "Gestión de Tours":
        return (
          <>
            <button
              onClick={() => setActiveSubmenu("Ver Tours")}
              className={linkClass}
            >
              Ver Tours
            </button>
            <button
              onClick={() => setActiveSubmenu("Agregar Tour")}
              className={linkClass}
            >
              Agregar Nuevo Tour
            </button>
          </>
        );
      case "Gestión de Reservas":
        return (
          <>
            <button
              onClick={() => setActiveSubmenu("Ver Reservas")}
              className={linkClass}
            >
              Ver Reservas
            </button>
            <button
              onClick={() => setActiveSubmenu("Crear Reserva")}
              className={linkClass}
            >
              Crear Reserva
            </button>
          </>
        );
      case "Cancelaciones":
        return (
          <button
            onClick={() => setActiveSubmenu("Ver Cancelaciones")}
            className={linkClass}
          >
            Ver Cancelaciones
          </button>
        );
      case "Ajustes":
        return (
          <>
            <button
              onClick={() => setActiveSubmenu("Configuraciones")}
              className={linkClass}
            >
              Configuraciones
            </button>
            <button
              onClick={() => setActiveSubmenu("Perfil")}
              className={linkClass}
            >
              Perfil
            </button>
          </>
        );
      default:
        return (
          <Link href={"/administrador/"} className={linkClass}>
            Inicio
          </Link>
        );
    }
  };

  // 🔹 Contenido dinámico de abajo
  const renderContent = () => {
    if (activeMenu === "Mascotas") {
      if (activeSubmenu === "Lista") return <ListaMascotas />;
      if (activeSubmenu === "Agregar")
        return <div>Formulario para agregar mascota</div>;
    }
    if (activeMenu === "Gestión de Tours") {
      if (activeSubmenu === "Ver Tours") return <div>Tabla de Tours</div>;
      if (activeSubmenu === "Agregar Tour")
        return <div>Formulario de nuevo tour</div>;
    }
    if (activeMenu === "Gestión de Reservas") {
      if (activeSubmenu === "Ver Reservas") return <div>Tabla de Reservas</div>;
      if (activeSubmenu === "Crear Reserva")
        return <div>Formulario nueva reserva</div>;
    }
    if (activeMenu === "Cancelaciones")
      return <div>Listado de cancelaciones</div>;
    if (activeMenu === "Ajustes") {
      if (activeSubmenu === "Configuraciones")
        return <div>Configuraciones del sistema</div>;
      if (activeSubmenu === "Perfil") return <div>Perfil de usuario</div>;
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

        {/* 🔹 Recuadro blanco para el contenido dinámico */}
        <section className="bg-white border border-gray-200 mt-4 p-6 rounded-lg shadow text-gray-700">
          {renderContent()}
        </section>
      </div>
    </div>
  );
}
