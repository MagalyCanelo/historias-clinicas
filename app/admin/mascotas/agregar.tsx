"use client";

export default function AgregarMascota() {
  return (
    <form className="space-y-4 max-w-lg mx-auto">
      <div>
        <label className="block mb-1 font-semibold">Nombre</label>
        <input type="text" className="border rounded px-3 py-2 w-full" />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Especie</label>
        <input type="text" className="border rounded px-3 py-2 w-full" />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Raza</label>
        <input type="text" className="border rounded px-3 py-2 w-full" />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Edad</label>
        <input type="number" className="border rounded px-3 py-2 w-full" />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Dueño</label>
        <input type="text" className="border rounded px-3 py-2 w-full" />
      </div>

      <button
        type="submit"
        className="bg-[#5ac6d2] text-white px-4 py-2 rounded hover:bg-[#4cb1bc]"
      >
        Guardar Mascota
      </button>
    </form>
  );
}
