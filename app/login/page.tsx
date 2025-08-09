"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "@/public/logo.jpg";
import EmailInput from "../Components/InputComponent";
import PasswordInput from "../Components/PasswordInput";
import Link from "next/link";
import ActionButton from "../Components/ActionButton";
import { FcGoogle } from "react-icons/fc";
import images from "@/public/inicio.jpg";
import { useSearchParams } from "next/navigation";
import { auth } from "@/lib/auth";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Login con email y password
  const handleEmailLogin = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userEmail = userCredential.user.email;

      if (userEmail === "magalycanelo@gmail.com") {
        router.push("/admin"); // Redirige a la página del administrador
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  // Login con Google popup
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const userEmail = result.user.email;

      if (userEmail === "magalycanelo@gmail.com") {
        router.push("/admin"); // Redirige a la página del administrador
      } else {
        router.push("/inicio"); // Redirige al inicio normal
      }
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión con Google");
    } finally {
      setLoading(false);
    }
  };

  // Obtención del mensaje desde los parámetros de búsqueda
  const searchParams = useSearchParams();
  const msg = searchParams.get("msg");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-dvh">
      <Image
        src={images}
        alt="Imagen del login"
        className="col-span-1 h-screen object-cover"
        fetchPriority="high"
        priority
      />
      <section className="bg-stone-50 col-span-1 h-full flex flex-col items-center justify-center px-6 lg:px-32">
        <Image src={logo} alt="logo" className="w-36 mx-auto mt-2 mb-4" />
        <div className="flex flex-col items-center justify-center gap-2 mb-4">
          <h1 className="text-[56px] font-bol text-[#45b0be] leading-tight tracking-wide title">
            BIENVENIDO
          </h1>
          <p className="text-stone-600 font-semibold pb-3 text-lg">
            Inicia Sesión
          </p>
        </div>

        {/* Mostrar mensaje de registro exitoso si existe */}
        {msg && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-6 w-full max-w-md text-center">
            <p className="font-semibold">{msg}</p>
          </div>
        )}

        {/* Mostrar mensaje de error de autenticación */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-6 w-full max-w-md text-center">
            <p className="font-semibold">Los datos ingresados no son válidos</p>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;
            handleEmailLogin(email, password);
          }}
          className="flex flex-col w-full max-w-md gap-6"
        >
          <EmailInput name="email" />
          <PasswordInput name="password" />

          <div className="flex justify-end items-center">
            <Link
              href="/passrecovery"
              className="text-stone-500 font-semibold text-sm"
            >
              Olvidé mi contraseña
            </Link>
          </div>

          <ActionButton
            type="submit"
            title={loading ? "Iniciar Sesión" : "Iniciar Sesión"}
            disabled={loading}
            className="w-full"
            tipo="primary"
          />
        </form>

        <div className="border-t-2 border-stone-300 relative w-full max-w-md mt-8">
          <p className="text-center text-stone-500 font-bold absolute -top-3 bg-stone-50 px-8 left-1/2 -translate-x-1/2 w-fit">
            O
          </p>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="border border-stone-200 text-black w-fit p-4 rounded-lg shadow-md flex items-center gap-2 mx-auto mt-9 mb-4 hover:bg-stone-50 transition disabled:opacity-50"
        >
          <FcGoogle size={32} />
        </button>

        <Link
          href="/register"
          className="text-stone-500 font-semibold w-full text-center mt-3 mb-2"
        >
          ¿No tienes cuenta?{" "}
          <span className="font-bold text-black">Regístrate ahora</span>
        </Link>
      </section>
    </div>
  );
}

export default Page;
