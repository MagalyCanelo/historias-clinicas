"use client";
import Link from "next/link";
import { ReactNode, useState } from "react";
import NavLeft from "./Components/NavLeft";
import Mascotas from "./mascotas/lista";
import AgregarMascotas from "./mascotas/agregar";
import Cliente from "./clientes/lista";
import AgregarCliente from "./clientes/agregar";
import Personal from "./personal/lista";
import AgregarPersonal from "./personal/agregar";
import Especies from "./configuracion/especies";
import Razas from "./configuracion/razas";
import Seguridad from "./configuracion/seguridad";
import HistoriasClinicas from "./historiasclinicas/page";

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
        setActiveSubmenu("Control Antiparasitario");
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
              Lista de Mascotas
            </button>
            <button
              onClick={() => setActiveSubmenu("Agregar")}
              className={linkClass}
            >
              Agregar Mascota
            </button>
          </>
        );
      case "Historias Clínicas":
        return (
          <>
            <button
              onClick={() => setActiveSubmenu("Control Antiparasitario")}
              className={linkClass}
            >
              Control Antiparasitario
            </button>
            <button
              onClick={() => setActiveSubmenu("Vacunas")}
              className={linkClass}
            >
              Vacunas
            </button>
            <button
              onClick={() => setActiveSubmenu("Cirugias")}
              className={linkClass}
            >
              Cirugías
            </button>
            <button
              onClick={() => setActiveSubmenu("Baños & Peluqueria")}
              className={linkClass}
            >
              Baños & Peluquería
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
      if (activeSubmenu === "Lista Mascotas") return <Mascotas />;
      if (activeSubmenu === "Agregar")
        return <AgregarMascotas setActiveSubmenu={setActiveSubmenu} />;
    }
    if (activeMenu === "Historias Clínicas") {
      if (
        activeSubmenu === "Control Antiparasitario" ||
        activeSubmenu === "Vacunas" ||
        activeSubmenu === "Cirugias" ||
        activeSubmenu === "Baños & Peluqueria"
      ) {
        return (
          <HistoriasClinicas
            activeMenu={activeMenu}
            activeSubmenu={activeSubmenu}
            setActiveSubmenu={setActiveSubmenu}
          />
        );
      }
    }

    if (activeMenu === "Clientes") {
      if (activeSubmenu === "Lista Clientes") return <Cliente />;
      if (activeSubmenu === "Agregar Cliente")
        return <AgregarCliente setActiveSubmenu={setActiveSubmenu} />;
    }
    if (activeMenu === "Personal") {
      if (activeSubmenu === "Lista Personal") return <Personal />;
      if (activeSubmenu === "Agregar Personal")
        return <AgregarPersonal setActiveSubmenu={setActiveSubmenu} />;
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
