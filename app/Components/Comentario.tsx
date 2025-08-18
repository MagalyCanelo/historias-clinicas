"use client";

import { useEffect, useMemo, useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { FaStar } from "react-icons/fa";
import Image from "next/image";

type Comentario = {
  comentario: string;
  nombre: string;
  foto: string;
  estrellas: number;
  cliente: string;
};

const comentarios: Comentario[] = [
  {
    comentario:
      "Excelente atención, muy profesionales y siempre cuidan a mi mascota como si fuera suya.",
    nombre: "María Pérez",
    cliente: "Cliente",
    foto: "/servicios/cirugia.jpg",
    estrellas: 5,
  },
  {
    comentario: "Muy buena experiencia, recomendaría la clínica a todos.",
    nombre: "Carlos Gómez",
    cliente: "Cliente",
    foto: "/servicios/cirugia.jpg",
    estrellas: 4,
  },
  {
    comentario:
      "La peluquería canina es excelente, dejaron hermoso a mi perrito.",
    nombre: "Ana López",
    cliente: "Cliente",
    foto: "/servicios/cirugia.jpg",
    estrellas: 5,
  },
  {
    comentario:
      "Atención rápida y con mucha calidez. Mi gato se recuperó muy bien.",
    nombre: "Luis Fernández",
    cliente: "Cliente",
    foto: "/servicios/cirugia.jpg",
    estrellas: 5,
  },
];

export default function ComentariosCarousel() {
  const [start, setStart] = useState(0);
  const [perPage, setPerPage] = useState(3);

  const total = comentarios.length;

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      setPerPage(w >= 1024 ? 3 : w >= 768 ? 2 : 1);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const next = () => setStart((s) => (s + 1) % total);
  const prev = () => setStart((s) => (s - 1 + total) % total);

  const visibles = useMemo(() => {
    return Array.from({ length: perPage }, (_, i) => {
      const idx = (start + i) % total;
      return comentarios[idx];
    });
  }, [start, perPage]);

  const renderStars = (count: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`w-5 h-5 ${i < count ? "text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <section className="relative w-full bg-stone-50 py-10">
      <div className="mx-auto max-w-6xl px-2">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-celeste tracking-tight">
            Comentarios de Nuestros Clientes
          </h2>
          <div className="mt-2 w-50 h-1 bg-celeste mx-auto rounded-full"></div>
        </div>

        <div className="relative">
          <button
            onClick={prev}
            aria-label="Comentarios anteriores"
            className="absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 h-11 w-11 rounded-full bg-celeste bg-celeste-hover text-white shadow-lg active:scale-95 transition grid place-items-center"
          >
            <LuChevronLeft className="h-6 w-6" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 select-none">
            {visibles.map((c, i) => (
              <div
                key={`${c.nombre}-${i}`}
                className="flex flex-col justify-between bg-white rounded-xl shadow-md p-6 h-full text-left"
              >
                <div className="flex gap-1 text-lg mb-3">
                  {renderStars(c.estrellas)}
                </div>
                <p className="text-base text-gray-800 mb-4 leading-relaxed">
                  “{c.comentario}”
                </p>
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-200">
                  <Image
                    src={c.foto}
                    alt={c.nombre}
                    width={50}
                    height={50}
                    className="rounded-full object-cover w-12 h-12"
                  />
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      {c.nombre}
                    </h3>
                    <p className="text-sm text-stone-600">{c.cliente}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Más comentarios"
            className="absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 z-10 h-11 w-11 rounded-full bg-celeste bg-celeste-hover text-white shadow-lg active:scale-95 transition grid place-items-center"
          >
            <LuChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
