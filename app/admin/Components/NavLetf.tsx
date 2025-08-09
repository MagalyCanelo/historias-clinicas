import React from "react";

interface NavLeftProps {
  activeMenu: string;
  onSelectMenu: (menu: string) => void;
}

export default function NavLeft({ activeMenu, onSelectMenu }: NavLeftProps) {
  const menus = [
    "Inicio",
    "Gestión de Tours",
    "Gestión de Reservas",
    "Cancelaciones",
    "Ajustes",
  ];

  return (
    <aside className="w-64 bg-[#a1c45a] text-white flex flex-col p-4 min-h-screen">
      <h2 className="text-lg font-bold mb-6">Panel Admin</h2>
      <nav className="flex flex-col gap-2">
        {menus.map((menu) => (
          <button
            key={menu}
            onClick={() => onSelectMenu(menu)}
            className={`px-4 py-2 text-left rounded-md transition ${
              activeMenu === menu
                ? "bg-[#6a8e2d] text-white"
                : "hover:bg-[#7fa84a]"
            }`}
          >
            {menu}
          </button>
        ))}
      </nav>
    </aside>
  );
}
