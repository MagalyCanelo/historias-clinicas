// register/page.tsx
"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "@/public/logo.jpg";
import EmailInput from "../Components/InputComponent";
import PasswordInput from "../Components/PasswordInput";
import Link from "next/link";
import ActionButton from "../Components/ActionButton";
import { FcGoogle } from "react-icons/fc";
import images from "@/public/registro.jpg";
import { signInWithFirebase } from "@/actions/signinFirebase";
import { useRouter } from "next/navigation";
import { createUserDoc } from "../../service/FirebaseService";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/lib/auth";

function RegisterPage() {
  const [onError, setOnError] = useState<string | null>(null);
  const router = useRouter(); // Necesitamos este hook para redirigir después de un registro exitoso

  const handleSubmit = async (email: string, password: string) => {
    try {
      // Crear usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Crear documento del usuario en Firestore
      await createUserDoc(user.email ?? email, "client");

      // También iniciar sesión directamente (opcional)
      await signInWithFirebase(email, password);

      // Redireccionar al login con un mensaje
      router.push("/login?msg=Registro exitoso, por favor inicia sesión"); // Esto redirige a la página de login
    } catch (error: any) {
      console.error("Error en registro:", error);
      if (error.code === "auth/email-already-in-use") {
        setOnError("El correo ya está en uso");
      } else if (error.code === "auth/invalid-email") {
        setOnError("Correo inválido");
      } else if (error.code === "auth/weak-password") {
        setOnError("La contraseña es muy débil");
      } else {
        setOnError("Error al registrar el usuario");
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-dvh">
      <Image
        src={images}
        alt="registro"
        className="col-span-1 h-full object-cover"
      />
      <section className="bg-stone-50 col-span-1 h-full flex flex-col items-center justify-center">
        <Image
          src={logo}
          alt="Logo"
          className="w-36 mx-auto mt-2 mb-4"
          priority
        />

        <div className="flex flex-col items-center gap-2 mb-4">
          <h1 className="text-[56px] font-bol text-[#45b0be] leading-tight tracking-wide title">
            BIENVENIDO
          </h1>
          <p className="text-stone-600 font-semibold pb-3 text-lg">
            Regístrate
          </p>
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setOnError(null);
            const formData = new FormData(e.target as HTMLFormElement);
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;
            const confirmPassword = formData.get("confirmpassword") as string;

            if (password !== confirmPassword) {
              setOnError("Las contraseñas no coinciden");
              return;
            }

            await handleSubmit(email, password);
          }}
          className="flex flex-col w-full gap-0 lg:px-32 px-6"
        >
          <div className="flex flex-col gap-8">
            <EmailInput name="email" />
            <PasswordInput name="password" />
            <PasswordInput
              name="confirmpassword"
              label="Confirmar contraseña"
            />
          </div>

          {onError && (
            <p className="text-red-500 font-semibold text-sm mt-5 text-center">
              {onError}
            </p>
          )}

          <div className="flex flex-col w-full justify-center mt-6 mb-8 gap-6">
            <ActionButton
              type="submit"
              tipo="primary"
              title="Registrarse"
              className="w-full font-semibold"
            />
          </div>

          <div className="border-t-2 border-stone-300 relative w-full mb-2">
            <p className="text-center text-stone-500 font-bold absolute -top-3 bg-stone-50 px-8 mx-auto left-0 right-0 w-fit">
              O
            </p>
          </div>

          <div
            className="border border-stone-200 text-black w-fit p-4 rounded-lg shadow-md flex items-center gap-2 mx-auto mt-6 mb-4 hover:bg-stone-50 transition cursor-pointer"
            onClick={async () => {
              try {
                const provider = new GoogleAuthProvider();
                const result = await signInWithPopup(auth, provider);
                const user = result.user;

                await createUserDoc(user.email ?? "", "client");
                router.push("/login"); // Redirige a login después de autenticarse con Google
              } catch (error) {
                console.error("Error con login Google:", error);
                setOnError("Error al iniciar sesión con Google.");
              }
            }}
          >
            <FcGoogle size={32} />
          </div>

          <Link
            href="/login"
            className="text-stone-500 font-semibold w-full text-center mt-2 mb-6"
          >
            ¿Ya tienes una cuenta?
            <span className="font-bold text-black"> Inicia sesión</span>
          </Link>
        </form>
      </section>
    </div>
  );
}

export default RegisterPage;
