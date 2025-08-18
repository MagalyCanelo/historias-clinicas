"use client";

import { useEffect, useMemo, useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import Image from "next/image";
import cirugia from "@/public/Servicios/cirugia.jpg";
import baño from "@/public/Servicios/baño.jpg";

type servicio = { nombre: string; imagen: string };

const servicios = [
  {
    nombre: "Consultas",
    location: "Veterinaria",
    image: cirugia,
  },
  {
    nombre: "Tratamiento",
    location: "Veterinaria",
    image: cirugia,
  },
  {
    nombre: "Farmacia",
    location: "Veterinaria",
    image: cirugia,
  },
  {
    nombre: "Desparasitación",
    location: "Veterinaria",
    image: cirugia,
  },
  {
    nombre: "Vacuna",
    location: "Veterinaria",
    image: cirugia,
  },
  {
    nombre: "Cirugía",
    location: "Veterinaria",
    image: cirugia,
  },
  {
    nombre: "Baños Medicados",
    location: "Veterinaria",
    image: baño,
  },
  {
    nombre: "Peluquería Canina",
    location: "Veterinaria",
    image: cirugia,
  },
  {
    nombre: "Comida y Accesorios",
    location: "Veterinaria",
    image: cirugia,
  },
  {
    nombre: "Hospedaje",
    location: "Veterinaria",
    image: cirugia,
  },
];

export default function ServiciosCarousel() {
  // índice del primer item visible
  const [start, setStart] = useState(0);
  // items por vista según breakpoint
  const [perPage, setPerPage] = useState(3);

  const total = servicios.length;

  // Detecta breakpoints para 1/2/3 en sm/md/lg
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      setPerPage(w >= 1024 ? 3 : w >= 768 ? 2 : 1);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // Siguiente/anterior (loop infinito)
  const next = () => setStart((s) => (s + 1) % total);
  const prev = () => setStart((s) => (s - 1 + total) % total);

  // Toma perPage elementos en orden circular desde start
  const visibles = useMemo(() => {
    return Array.from({ length: perPage }, (_, i) => {
      const idx = (start + i) % total;
      return servicios[idx];
    });
  }, [start, perPage]);

  return (
    <section className="relative w-full bg-stone-50 py-8">
      <div className="mx-auto max-w-6xl px-2">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#3fbdcb] tracking-tight">
            Nuestros Servicios
          </h2>
          <div className="mt-2 w-24 h-1 bg-celeste mx-auto rounded-full"></div>
        </div>

        <div className="relative">
          <button
            onClick={prev}
            aria-label="Servicios anteriores"
            className="absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 h-11 w-11 rounded-full bg-celeste text-white shadow-lg bg-celeste-hover active:scale-95 transition grid place-items-center"
          >
            <LuChevronLeft className="h-6 w-6" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 select-none">
            {visibles.map((s, i) => (
              <article
                key={`${s.nombre}-${i}`}
                className="rounded-2xl overflow-hidden shadow-md bg-white"
              >
                <div className="relative h-64 md:h-72">
                  <Image
                    src={s.image}
                    alt={s.nombre}
                    fill
                    priority={i === 0}
                    className="object-cover"
                    sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" />
                  <div className="absolute bottom-3 left-3">
                    <span className="inline-block rounded-full bg-white px-4 py-1 text-sm font-semibold text-celeste shadow">
                      {s.nombre}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Más servicios"
            className="absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 z-10 h-11 w-11 rounded-full bg-celeste text-white shadow-lg bg-celeste-hover active:scale-95 transition grid place-items-center"
          >
            <LuChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
