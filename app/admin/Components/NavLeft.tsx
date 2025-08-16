import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "@/public/logo.jpg";

// Importar íconos de react-icons
import {
  FaHome,
  FaDog,
  FaNotesMedical,
  FaUsers,
  FaUserTie,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

interface NavLeftProps {
  activeMenu: string;
  onSelectMenu: (menu: string) => void;
}

export default function NavLeft({ activeMenu, onSelectMenu }: NavLeftProps) {
  const menus = [
    { name: "Inicio", icon: <FaHome /> },
    { name: "Mascotas", icon: <FaDog /> },
    { name: "Historias Clínicas", icon: <FaNotesMedical /> },
    { name: "Clientes", icon: <FaUsers /> },
    { name: "Personal", icon: <FaUserTie /> },
    { name: "Configuración", icon: <FaCog /> },
  ];

  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.clear();

    router.push("/"); // redirige al inicio/login
  };

  return (
    <aside className="w-64 bg-[#5ac6d2] text-white flex flex-col justify-between py-4 px-2 min-h-screen">
      {/* Logo y Menú */}
      <div>
        <div className="flex justify-center mb-6">
          <Image
            src={logo}
            alt="Logo de la empresa"
            className="w-16 lg:w-20 h-auto"
            height={1800}
            width={1800}
          />
        </div>

        <nav className="flex flex-col gap-2">
          {menus.map((menu) => (
            <button
              key={menu.name}
              onClick={() => onSelectMenu(menu.name)}
              className={`flex items-center gap-3 px-4 py-2 text-left rounded-md transition ${
                activeMenu === menu.name
                  ? "bg-[#45b0be] text-white font-semibold"
                  : "hover:bg-[#45b0be]"
              }`}
            >
              {menu.icon} {menu.name}
            </button>
          ))}
        </nav>
      </div>
      {/* Botón de salir separado */}
      <div className="mt-6 border-t border-white/30 pt-4">
        <button
          onClick={() => setShowConfirm(true)}
          className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-md bg-[#5ac6d2] text-white font-semibold hover:bg-[#45b0be] transition"
        >
          <FaSignOutAlt /> Salir
        </button>
      </div>
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-gray-800 pointer-events-auto">
            <h2 className="text-lg font-semibold mb-4 text-center">
              ¿Estás seguro de salir?
            </h2>
            <div className="flex justify-center gap-3">
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
              >
                Salir
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
