import Image from "next/image";
import cirugia from "@/public/servicios/cirugia.jpg";
import baño from "@/public/servicios/baño.jpg";

const servicios = [
  { nombre: "Consultas", image: cirugia },
  { nombre: "Tratamiento", image: cirugia },
  { nombre: "Farmacia", image: cirugia },
  { nombre: "Desparasitación", image: cirugia },
  { nombre: "Vacuna", image: cirugia },
  { nombre: "Cirugía", image: cirugia },
];

export default function Galeria() {
  return (
    <section className="bg-stone-50 py-10 px-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-celeste tracking-tight">
          Galeria de Fotos
        </h2>
        <div className="mt-2 w-24 h-1 bg-celeste mx-auto rounded-full"></div>
      </div>
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
            <div className="absolute inset-0  bg-black/10 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <h3 className="text-lg font-semibold text-white">
                {servicio.nombre}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
