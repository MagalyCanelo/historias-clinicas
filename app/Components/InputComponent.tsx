"use client";
import React, { InputHTMLAttributes, useEffect, useState } from "react";
import { IoMailOutline } from "react-icons/io5";

interface EmailInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
}

const EmailInput: React.FC<EmailInputProps> = ({
  label = "Correo",
  error,
  containerClassName = "",
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className={`flex flex-col relative text-black ${containerClassName}`}>
      <label
        htmlFor="email"
        className={`absolute text-base transition-all duration-200 ${
          isFocused || props.value?.toString() !== ""
            ? "text-celeste font-bold -top-3 bg-stone-50 px-2 left-3 "
            : "text-gray-700 top-3 left-12"
        }`}
      >
        {label}
      </label>

      <div
        className={`px-4 py-3 border-2 rounded-md focus:outline-none  ${
          error ? "border-red-500 " : "border-[#45b0be]"
        } transition-all duration-200 flex flex-row items-center gap-2`}
      >
        <IoMailOutline />
        <input
          id="email"
          name="email"
          type="email"
          className="outline-none w-full"
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            isValidEmail(props.value?.toString() || "")
              ? ""
              : "Invalid email format";
          }}
          {...props}
        />
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default EmailInput;
