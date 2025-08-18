import perfil_cristo from "@/public/Hero/perfil_cristo.jpg";
import gato1 from "@/public/Hero/gato1.jpg";
import gato2 from "@/public/Hero/gato2.jpg";

import { create } from "zustand";
import type { StaticImageData } from "next/image";

interface Image {
  src: StaticImageData;
  title: string;
  location: string;
}

interface ImageStore {
  images: Image[];
  isLoading: boolean;
  error: string | null;
  fetchImages: () => void;
}

export const useImageStore = create<ImageStore>((set) => ({
  images: [
    {
      src: gato1,
      title: "Lancha Moderna",
      location: "Pisco - Perú",
    },
    {
      src: gato2,
      title: "Islas Ballestas",
      location: "Pisco - Perú",
    },
  ],
  isLoading: false,
  error: null,
  fetchImages: () => {
    set({ isLoading: false, error: null });
  },
}));
