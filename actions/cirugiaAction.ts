import { db } from "@/lib/firebaseConfig";
import { Cirugia } from "@/app/types/types";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

// Agregar nueva cirugía
export async function agregarCirugia(cirugia: Cirugia): Promise<string | null> {
  try {
    const ref = doc(db, "cirugias", cirugia.id);
    await setDoc(ref, cirugia);
    return cirugia.id;
  } catch (error) {
    console.error("Error al agregar cirugía:", error);
    return null;
  }
}

// Obtener todas las cirugías
export async function obtenerTodasCirugias(): Promise<Cirugia[]> {
  const ref = collection(db, "cirugias");
  const querySnapshot = await getDocs(ref);
  const cirugiasList: Cirugia[] = [];
  querySnapshot.forEach((doc) => {
    cirugiasList.push(doc.data() as Cirugia);
  });
  return cirugiasList;
}

// Actualizar cirugía
export async function actualizarCirugia(cirugia: Cirugia): Promise<boolean> {
  try {
    const ref = doc(db, "cirugias", cirugia.id);
    await updateDoc(ref, {
      mascotaId: cirugia.mascotaId,
      tipoCirugia: cirugia.tipoCirugia,
      fecha: cirugia.fecha,
      observaciones: cirugia.observaciones,
      estado: cirugia.estado,
    });
    return true;
  } catch (error) {
    console.error("Error al actualizar cirugía:", error);
    return false;
  }
}

// Eliminar cirugía
export async function eliminarCirugia(id: string): Promise<boolean> {
  try {
    const ref = doc(db, "cirugias", id);
    await deleteDoc(ref);
    return true;
  } catch (error) {
    console.error("Error al eliminar cirugía:", error);
    return false;
  }
}
