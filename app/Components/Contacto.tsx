"use client";

import React, { useState } from "react";

const ContactoVeterinaria: React.FC = () => {
  const [servicio, setServicio] = useState("");

  const handleWhatsAppRedirect = () => {
    const mensaje = `Hola, quisiera más información sobre: ${servicio}`;
    const numero = "51975341049"; // número de WhatsApp de la veterinaria

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };

  return (
    <section className="pt-9 pb-15 px-4 bg-[#effdfd] text-center">
      <div className="text-center mb-5">
        <h2 className="text-2xl md:text-3xl font-extrabold text-celeste tracking-tight">
          ¿Tienes alguna duda?
        </h2>
        <div className="mt-2 w-30 h-1 bg-celeste mx-auto rounded-full"></div>
      </div>
      <p className="text-gray-700 max-w-xl mx-auto mb-4 sm:mb-6 text-[15px] sm:text-base">
        Si tienes alguna pregunta o deseas más información sobre nuestros
        servicios, envíanos el servicio que te interesa.
      </p>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Servicio de interés"
          value={servicio}
          onChange={(e) => setServicio(e.target.value)}
          className="w-full sm:w-auto flex-1 px-5 py-3 shadow-sm bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ac6d2]"
        />

        <button
          onClick={handleWhatsAppRedirect}
          className="bg-celeste bg-celeste-hover text-white font-semibold px-6 py-3 rounded-lg transition duration-300"
        >
          Consultar por WhatsApp
        </button>
      </div>
    </section>
  );
};

export default ContactoVeterinaria;
