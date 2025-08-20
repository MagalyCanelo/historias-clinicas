"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoMenu } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { usePathname, useRouter } from "next/navigation";
import logo from "@/public/logo.jpg";
import ActionButton from "./ActionButton";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/auth";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userLogged, setUserLogged] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Detectar si el usuario ha iniciado sesión
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserLogged(!!user);
    });
    return () => unsubscribe();
  }, []);

  // Cerrar sesión
  const handleLogout = async () => {
    await signOut(auth);
    setDropdownOpen(false);
    router.push("/login");
  };

  return (
    <header className="w-full bg-stone-50 text-black z-50 shadow-md ease-in-out">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-4">
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

        {/* Botones lado derecho */}
        <div className="hidden lg:flex items-center space-x-4 relative">
          {userLogged ? (
            <>
              <Link href="/mismascotas">
                <ActionButton tipo="primary" title="Mis Mascotas" />
              </Link>
              <div className="relative">
                <FaRegUser
                  size={25}
                  className="cursor-pointer text-[#45b0be]"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />
                {dropdownOpen && (
                  <div className="absolute right-0 w-40 mt-4 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <Link
                      href="/perfil"
                      className="block px-4 py-2 text-center hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Mi Perfil
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-center hover:bg-gray-100"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link href="/login">
                <ActionButton tipo="primary" title="Iniciar Sesión" />
              </Link>
              <Link href="/register">
                <ActionButton tipo="secondary" title="Regístrate" />
              </Link>
            </>
          )}
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

          {userLogged ? (
            <>
              <Link
                href="/mismascotas"
                onClick={() => setMenuOpen(false)}
                className="block"
              >
                <ActionButton
                  tipo="primary"
                  title="Mis Mascotas"
                  className="w-full mt-2"
                />
              </Link>
              <Link
                href="/perfil"
                onClick={() => setMenuOpen(false)}
                className="block"
              >
                <ActionButton
                  tipo="secondary"
                  title="Mi Perfil"
                  className="w-full mt-2"
                />
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 bg-red-50 text-red-600 mt-2 rounded-md"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
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
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="block"
              >
                <ActionButton
                  tipo="secondary"
                  title="Regístrate"
                  className="w-full"
                />
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
