import Image from "next/image";
import cirugia from "@/public/servicios/cirugia.jpg";
import baño from "@/public/servicios/baño.jpg";

const servicios = [
  { nombre: "Consultas", location: "Veterinaria", image: cirugia },
  { nombre: "Tratamiento", location: "Veterinaria", image: cirugia },
  { nombre: "Farmacia", location: "Veterinaria", image: cirugia },
  { nombre: "Desparasitación", location: "Veterinaria", image: cirugia },
  { nombre: "Vacuna", location: "Veterinaria", image: cirugia },
  { nombre: "Cirugía", location: "Veterinaria", image: cirugia },
  { nombre: "Baños Medicados", location: "Veterinaria", image: baño },
  { nombre: "Peluquería Canina", location: "Veterinaria", image: cirugia },
  { nombre: "Comida y Accesorios", location: "Veterinaria", image: cirugia },
];

export default function Galeria() {
  return (
    <section className="bg-stone-50 py-10 px-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-celeste">
        Nuestros Servicios
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {servicios.map((servicio, i) => (
          <div
            key={i}
            className="relative group overflow-hidden rounded-2xl shadow-md"
          >
            <Image
              src={servicio.image}
              alt={servicio.nombre}
              className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/10 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <h3 className="text-lg font-semibold text-white">
                {servicio.nombre}
              </h3>
              <p className="text-sm text-gray-200">{servicio.location}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
