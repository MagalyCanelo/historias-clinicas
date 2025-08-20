import { FaUserMd, FaHeartbeat, FaHome, FaPaw } from "react-icons/fa";

export default function PorQueElegirnos() {
  const puntos = [
    {
      icon: <FaUserMd className="text-celeste text-4xl mb-2" />,
      titulo: "Equipo profesional",
      descripcion: "Apasionados por el cuidado de los animales.",
    },
    {
      icon: <FaHeartbeat className="text-celeste text-4xl mb-2" />,
      titulo: "Atención rápida",
      descripcion: "Personalizada y con dedicación a cada mascota.",
    },
    {
      icon: <FaHome className="text-celeste text-4xl mb-2" />,
      titulo: "Instalaciones seguras",
      descripcion: "Cómodas y pensadas para tu tranquilidad.",
    },
    {
      icon: <FaPaw className="text-celeste text-4xl mb-2" />,
      titulo: "Trato con amor",
      descripcion: "Cada visita es una experiencia positiva.",
    },
  ];

  return (
    <section className="py-4 px-6 bg-gray-50">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-celeste tracking-tight">
          ¿Por qué elegirnos?
        </h2>
        <div className="mt-2 w-35 h-1 bg-celeste mx-auto rounded-full"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {puntos.map((p, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            {p.icon}
            <h3 className="text-lg font-semibold text-gray-700">{p.titulo}</h3>
            <p className="text-gray-500 text-sm mt-2">{p.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
