"use client";
import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function InputPersonalizado({ label, ...props }: Props) {
  return (
    <div className="flex flex-col w-full">
      {label && <span className="mb-1 text-gray-700">{label}</span>}
      <input
        {...props}
        className="p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ac6d2] transition w-full"
      />
    </div>
  );
}
