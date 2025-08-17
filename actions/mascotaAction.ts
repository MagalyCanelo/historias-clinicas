import { db } from "@/lib/firebaseConfig";
import { Mascota } from "@/app/types/types";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

// Agregar nueva mascota
export async function agregarMascotaNueva(mascota: Mascota): Promise<string | null> {
  try {
    const ref = doc(db, "mascotas", mascota.id);
    await setDoc(ref, mascota);
    return mascota.id;
  } catch (error) {
    console.error("Error al agregar mascota:", error);
    return null;
  }
}

// Obtener todas las mascotas
export async function obtenerTodasLasMascotas(): Promise<Mascota[]> {
  const ref = collection(db, "mascotas");
  const querySnapshot = await getDocs(ref);
  const mascotasList: Mascota[] = [];
  querySnapshot.forEach((doc) => {
    mascotasList.push(doc.data() as Mascota);
  });
  return mascotasList;
}

// Actualizar mascota
export async function actualizarMascotaFirebase(mascota: Mascota): Promise<boolean> {
  try {
    const ref = doc(db, "mascotas", mascota.id);
    await updateDoc(ref, {
      nombre: mascota.nombre,
      especieId: mascota.especieId,       
      razaId: mascota.razaId,           
      fechaNacimiento: mascota.fechaNacimiento,
      color: mascota.color,
      duenoId: mascota.duenoId,  
      estado: mascota.estado,
    });
    return true;
  } catch (error) {
    console.error("Error al actualizar mascota:", error);
    return false;
  }
}

// Eliminar mascota
export async function eliminarMascotaFirebase(id: string): Promise<boolean> {
  try {
    const ref = doc(db, "mascotas", id);
    await deleteDoc(ref);
    return true;
  } catch (error) {
    console.error("Error al eliminar mascota:", error);
    return false;
  }
}
