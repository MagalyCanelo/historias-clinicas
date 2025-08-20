import { db } from "@/lib/firebaseConfig";
import { Vacuna } from "@/app/types/types";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

// Agregar nueva vacuna
export async function agregarVacuna(vacuna: Vacuna): Promise<string | null> {
  try {
    const ref = doc(db, "vacunas", vacuna.id);
    await setDoc(ref, vacuna);
    return vacuna.id;
  } catch (error) {
    console.error("Error al agregar vacuna:", error);
    return null;
  }
}

// Obtener todas las vacunas
export async function obtenerTodasVacunas(): Promise<Vacuna[]> {
  const ref = collection(db, "vacunas");
  const querySnapshot = await getDocs(ref);
  const vacunasList: Vacuna[] = [];
  querySnapshot.forEach((doc) => {
    vacunasList.push(doc.data() as Vacuna);
  });
  return vacunasList;
}

// Actualizar vacuna
export async function actualizarVacuna(vacuna: Vacuna): Promise<boolean> {
  try {
    const ref = doc(db, "vacunas", vacuna.id);
    await updateDoc(ref, {
      mascotaId: vacuna.mascotaId,
      tipoVacuna: vacuna.tipoVacuna,
      fechaAplicada: vacuna.fechaAplicada,
      proximaDosis: vacuna.proximaDosis,
      observaciones: vacuna.observaciones,
    });
    return true;
  } catch (error) {
    console.error("Error al actualizar vacuna:", error);
    return false;
  }
}

// Eliminar vacuna
export async function eliminarVacuna(id: string): Promise<boolean> {
  try {
    const ref = doc(db, "vacunas", id);
    await deleteDoc(ref);
    return true;
  } catch (error) {
    console.error("Error al eliminar vacuna:", error);
    return false;
  }
}
