import { db } from "@/lib/firebaseConfig";
import { Personal } from "@/app/types/types";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export async function agregarPersonalNuevo(
  personal: Personal
): Promise<string | null> {
  try {
    const ref = doc(db, "personal", personal.id);
    await setDoc(ref, personal);
    return personal.id;
  } catch (error) {
    console.error("Error al agregar personal:", error);
    return null;
  }
}

export async function obtenerTodoElPersonal(): Promise<Personal[]> {
  const ref = collection(db, "personal");
  const querySnapshot = await getDocs(ref);
  const personalList: Personal[] = [];
  querySnapshot.forEach((doc) => {
    personalList.push(doc.data() as Personal);
  });
  return personalList;
}

export async function actualizarPersonalFirebase(personal: Personal): Promise<boolean> {
  try {
    const ref = doc(db, "personal", personal.id);
    await updateDoc(ref, {
      nombre: personal.nombre,
      celular: personal.celular,
      correo: personal.correo,
      rol: personal.rol,
      estado: personal.estado,
    });
    return true;
  } catch (error) {
    console.error("Error al actualizar personal:", error);
    return false;
  }
}

export async function eliminarPersonalFirebase(id: string): Promise<boolean> {
  try {
    const ref = doc(db, "personal", id);
    await deleteDoc(ref);
    return true;
  } catch (error) {
    console.error("Error al eliminar personal:", error);
    return false;
  }
}
