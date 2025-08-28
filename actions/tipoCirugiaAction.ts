import { db } from "@/lib/firebaseConfig";
import { TipoCirugia } from "@/app/types/types";  // Ajusta la ruta si es diferente
import { collection, doc, setDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";

// Agregar nuevo tipo de cirugía
export async function agregarTipoCirugiaNuevo(tipoCirugia: TipoCirugia): Promise<string | null> {
  try {
    const ref = doc(db, "tiposCirugia", tipoCirugia.id); // Referencia del documento en Firestore
    await setDoc(ref, tipoCirugia as any); // Guardar el objeto en Firestore
    return tipoCirugia.id; // Retornar el ID
  } catch (error) {
    console.error("Error al agregar tipo de cirugía:", error);
    return null;
  }
}

// Obtener todos los tipos de cirugía
export async function obtenerTodosLosTiposCirugia(): Promise<TipoCirugia[]> {
  try {
    const snapshot = await getDocs(collection(db, "tiposCirugia")); // Obtener todos los documentos
    return snapshot.docs.map((doc) => doc.data() as TipoCirugia);
  } catch (error) {
    console.error("Error al obtener tipos de cirugía:", error);
    return [];
  }
}

// Actualizar tipo de cirugía
export async function actualizarTipoCirugiaFirebase(tipoCirugia: TipoCirugia): Promise<boolean> {
  try {
    const ref = doc(db, "tiposCirugia", tipoCirugia.id);
    await updateDoc(ref, {
      nombre: tipoCirugia.nombre,
    });
    return true;
  } catch (error) {
    console.error("Error al actualizar tipo de cirugía:", error);
    return false;
  }
}

// Eliminar tipo de cirugía
export async function eliminarTipoCirugia(id: string): Promise<boolean> {
  try {
    const ref = doc(db, "tiposCirugia", id);
    await deleteDoc(ref);
    return true;
  } catch (error) {
    console.error("Error al eliminar tipo de cirugía:", error);
    return false;
  }
}
