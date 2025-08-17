import { db } from "@/lib/firebaseConfig";
import { Raza } from "@/app/types/types";
import { collection, doc, setDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";

// Agregar nueva raza
export async function agregarRazaNueva(raza: Raza): Promise<string | null> {
  try {
    const ref = doc(db, "razas", raza.id);
    await setDoc(ref, raza as any); // <-- solucionamos el error de tipo aquí
    return raza.id;
  } catch (error) {
    console.error("Error al agregar raza:", error);
    return null;
  }
}

// Obtener todas las razas
export async function obtenerTodasLasRazas(): Promise<Raza[]> {
  try {
    const snapshot = await getDocs(collection(db, "razas"));
    return snapshot.docs.map((doc) => doc.data() as Raza);
  } catch (error) {
    console.error("Error al obtener razas:", error);
    return [];
  }
}

// Editar raza
export async function actualizarRazaFirebase(raza: Raza): Promise<boolean> {
  try {
    const ref = doc(db, "razas", raza.id);
    await updateDoc(ref, {
      nombre: raza.nombre,
      especieId: raza.especieId,
    });
    return true;
  } catch (error) {
    console.error("Error al actualizar raza:", error);
    return false;
  }
}

// Eliminar raza
export async function eliminarRaza(id: string): Promise<boolean> {
  try {
    const ref = doc(db, "razas", id);
    await deleteDoc(ref);
    return true;
  } catch (error) {
    console.error("Error al eliminar raza:", error);
    return false;
  }
}