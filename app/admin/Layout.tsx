"use client";
import Link from "next/link";
import { ReactNode, useState } from "react";
import NavLeft from "./Components/NavLetf";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [activeMenu, setActiveMenu] = useState("Inicio");

  const handleMenuSelect = (menu: string) => {
    setActiveMenu(menu);
  };

  const linkClass =
    "flex items-center bg-lime-600 hover:bg-[#d7e99c] text-black px-4 py-[6px] rounded-md transition font-semibold text-white";

  const renderHeaderLinks = () => {
    switch (activeMenu) {
      case "Inicio":
        return (
          <>
            <Link href={"/administrador/"} className={linkClass}>
              Inicio
            </Link>
            <Link href={"/administrador/agregar"} className={linkClass}>
              Agregar sitio turístico
            </Link>
            <Link href={"/administrador/editar"} className={linkClass}>
              Editar sitio turístico
            </Link>
          </>
        );
      case "Gestión de Tours":
        return (
          <>
            <Link
              href={"/administrador/gestiontours/lista"}
              className={linkClass}
            >
              Ver Tours
            </Link>
            <Link
              href={"/administrador/gestiontours/agregar"}
              className={linkClass}
            >
              Agregar Nuevo Tour
            </Link>
          </>
        );
      case "Gestión de Reservas":
        return (
          <>
            <Link href={"/administrador/reservas"} className={linkClass}>
              Ver Reservas
            </Link>
            <Link href={"/administrador/reservas/nueva"} className={linkClass}>
              Crear Reserva
            </Link>
          </>
        );
      case "Cancelaciones":
        return (
          <Link href={"/administrador/cancelaciones"} className={linkClass}>
            Ver Cancelaciones
          </Link>
        );
      case "Ajustes":
        return (
          <>
            <Link href={"/administrador/ajustes"} className={linkClass}>
              Configuraciones
            </Link>
            <Link href={"/administrador/perfil"} className={linkClass}>
              Perfil
            </Link>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Menú lateral */}
      <NavLeft activeMenu={activeMenu} onSelectMenu={handleMenuSelect} />

      {/* Contenido */}
      <div className="flex-1 flex flex-col">
        <header className="bg-[#cbf199] border-b-4 border-[#588f10] flex gap-4 items-center justify-center p-4 rounded-lg rounded-b-none">
          {renderHeaderLinks()}
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
