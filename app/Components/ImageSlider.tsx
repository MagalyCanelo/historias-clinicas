"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useImageStore } from "../vet/Images";

const ImageSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const imageStore = useImageStore((s) => s.images);
  const images = imageStore.map((img) => ({
    src: img.src,
    title: img.title,
    location: img.location,
  }));

  useEffect(() => {
    if (images.length < 2) return;

    const iv = setInterval(() => {
      setPrev(current);
      setCurrent((c) => (c + 1) % images.length);
    }, 5000);
    return () => clearInterval(iv);
  }, [images.length, current]);

  const currImg = images[current];
  const prevImg = prev !== null ? images[prev] : null;

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      <style>
        {`
          @keyframes scaleUp {
            from { transform: scale(1); }
            to { transform: scale(1.08); }
          }
        `}
      </style>
      {prevImg && (
        <Image
          key={`prev-${prev}`}
          src={prevImg.src}
          alt={prevImg.title}
          fill
          priority
          style={{
            transform: "scale(1.08)",
            animation: "scaleUp 9s linear infinite",
            filter: "brightness(0.9)", // darkens the image
          }}
          className="absolute inset-0 object-cover transition-opacity duration-1000 animate-fade-out scaleUp"
        />
      )}
      <Image
        key={`curr-${current}`}
        src={currImg.src}
        alt={currImg.title}
        fill
        priority
        style={{
          transform: "scale(1.08)",
          animation: "scaleUp 9s linear infinite",
          filter: "brightness(0.9)", // darkens the image
        }}
        className="absolute inset-0 object-cover transition-opacity duration-1000 animate-fade-in scaleUp"
      />
    </div>
  );
};
export default ImageSlider;
