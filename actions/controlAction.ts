import { db } from "@/lib/firebaseConfig";
import { ControlAntiparasitario } from "@/app/types/types";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

// Agregar nuevo control antiparasitario
export async function agregarControl(control: ControlAntiparasitario): Promise<string | null> {
  try {
    const ref = doc(db, "controlesAntiparasitarios", control.id);
    await setDoc(ref, control);
    return control.id;
  } catch (error) {
    console.error("Error al agregar control antiparasitario:", error);
    return null;
  }
}

// Obtener todos los controles antiparasitarios
export async function obtenerTodosControles(): Promise<ControlAntiparasitario[]> {
  const ref = collection(db, "controlesAntiparasitarios");
  const querySnapshot = await getDocs(ref);
  const controlesList: ControlAntiparasitario[] = [];
  querySnapshot.forEach((doc) => {
    controlesList.push(doc.data() as ControlAntiparasitario);
  });
  return controlesList;
}

// Actualizar control antiparasitario
export async function actualizarControl(control: ControlAntiparasitario): Promise<boolean> {
  try {
    const ref = doc(db, "controlesAntiparasitarios", control.id);
    await updateDoc(ref, {
      mascotaId: control.mascotaId,
      fechaAplicada: control.fechaAplicada,
      productoUtilizado: control.productoUtilizado,
      proximaAplicacion: control.proximaAplicacion,
      observaciones: control.observaciones,
    });
    return true;
  } catch (error) {
    console.error("Error al actualizar control antiparasitario:", error);
    return false;
  }
}

// Eliminar control antiparasitario
export async function eliminarControl(id: string): Promise<boolean> {
  try {
    const ref = doc(db, "controlesAntiparasitarios", id);
    await deleteDoc(ref);
    return true;
  } catch (error) {
    console.error("Error al eliminar control antiparasitario:", error);
    return false;
  }
}
