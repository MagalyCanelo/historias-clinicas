"use client";
import React from "react";

interface ButtonProps {
  texto: string;
  onClick?: (
    e?: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>
  ) => void;
  className?: string;
  type?: "button" | "submit" | "reset"; // <-- agregamos type opcional
}

export default function ButtonComponent({
  texto,
  onClick,
  className,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-md transition-colors ${
        className ? className : "bg-[#5ac6d2] hover:bg-[#4ab0bb] text-white"
      }`}
    >
      {texto}
    </button>
  );
}
