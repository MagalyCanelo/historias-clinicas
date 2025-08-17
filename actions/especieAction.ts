import { db } from "@/lib/firebaseConfig";
import { Especie } from "@/app/types/types";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export async function agregarEspecieNueva(
  especie: Especie
): Promise<string | null> {
  try {
    const ref = doc(db, "especies", especie.id); 
    await setDoc(ref, especie);
    return especie.id;
  } catch (error) {
    console.error("Error al agregar especie:", error);
    return null;
  }
}

export async function obtenerTodasLasEspecies(): Promise<Especie[]> {
  const ref = collection(db, "especies");
  const querySnapshot = await getDocs(ref);
  const especies: Especie[] = [];
  querySnapshot.forEach((doc) => {
    especies.push(doc.data() as Especie);
  });
  return especies;
}

export async function actualizarEspecieFirebase(especie: Especie): Promise<boolean> {
  try {
    const ref = doc(db, "especies", especie.id);
    await updateDoc(ref, { nombre: especie.nombre });
    return true;
  } catch (error) {
    console.error("Error al actualizar especie:", error);
    return false;
  }
}

export async function eliminarEspecieFirebase(id: string): Promise<boolean> {
  try {
    const ref = doc(db, "especies", id);
    await deleteDoc(ref);
    return true;
  } catch (error) {
    console.error("Error al eliminar especie:", error);
    return false;
  }
}