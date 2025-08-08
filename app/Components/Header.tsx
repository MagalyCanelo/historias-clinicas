"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoMenu } from "react-icons/io5";
import { usePathname } from "next/navigation";
import logo from "@/public/logo.jpg";
import ActionButton from "./ActionButton";

const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-stone-50 text-black z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-3 py-2">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src={logo}
            alt="Logo de la empresa"
            className="w-16 lg:w-20 h-auto"
            height={1800}
            width={1800}
          />
        </Link>

        {/* Botón hamburguesa móvil */}
        <div className="lg:hidden">
          <IoMenu
            className="text-3xl text-celeste cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </div>

        {/* Navegación en grande */}
        <nav className="hidden lg:flex flex-1 justify-center space-x-8 text-md font-semibold">
          <Link
            href="/"
            className={`no-underline text-amarillo-hover transition-colors ${
              pathname === "/" ? "text-[#45b0be]" : ""
            }`}
          >
            Inicio
          </Link>
          <Link
            href="/aboutus"
            className={`no-underline text-amarillo-hover transition-colors ${
              pathname === "/aboutus" ? "text-[#45b0be]" : ""
            }`}
          >
            Sobre Nosotros
          </Link>
          <Link
            href="/servicios"
            className={`no-underline text-amarillo-hover transition-colors ${
              pathname === "/servicios" ? "text-[#45b0be]" : ""
            }`}
          >
            Servicios
          </Link>
          <Link
            href="/contacto"
            className={`no-underline text-amarillo-hover transition-colors ${
              pathname === "/contacto" ? "text-[#45b0be]" : ""
            }`}
          >
            Contacto
          </Link>
        </nav>

        {/* Botón Iniciar Sesión en grande */}
        <div className="hidden lg:block">
          <Link href="/login">
            <ActionButton tipo="primary" title="Iniciar Sesión" />
          </Link>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {menuOpen && (
        <div className="lg:hidden px-4 pb-4 space-y-2 text-sm font-semibold">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-celeste"
          >
            Inicio
          </Link>
          <Link
            href="/aboutus"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-celeste"
          >
            Sobre Nosotros
          </Link>
          <Link
            href="/servicios"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-celeste"
          >
            Servicios
          </Link>
          <Link
            href="/contacto"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-celeste"
          >
            Contacto
          </Link>
          <Link
            href="/login"
            onClick={() => setMenuOpen(false)}
            className="block"
          >
            <ActionButton
              tipo="primary"
              title="Iniciar Sesión"
              className="w-full mt-2"
            />
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
