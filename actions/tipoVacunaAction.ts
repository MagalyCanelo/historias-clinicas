import { db } from "@/lib/firebaseConfig";
import { TipoVacuna } from "@/app/types/types";
import { collection, doc, setDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";

// Agregar nuevo tipo de vacuna
export async function agregarTipoVacunaNuevo(tipoVacuna: TipoVacuna): Promise<string | null> {
  try {
    const ref = doc(db, "tiposVacuna", tipoVacuna.id); // Referencia del documento en Firestore
    await setDoc(ref, tipoVacuna as any); // Convertimos el objeto de tipo TipoVacuna en un documento de Firestore
    return tipoVacuna.id; // Retornamos el ID del tipo de vacuna agregado
  } catch (error) {
    console.error("Error al agregar tipo de vacuna:", error);
    return null; // En caso de error, retornamos null
  }
}

// Obtener todos los tipos de vacuna
export async function obtenerTodosLosTiposVacuna(): Promise<TipoVacuna[]> {
  try {
    const snapshot = await getDocs(collection(db, "tiposVacuna")); // Obtenemos todos los documentos de la colección
    return snapshot.docs.map((doc) => doc.data() as TipoVacuna); // Mapeamos los documentos a objetos TipoVacuna
  } catch (error) {
    console.error("Error al obtener tipos de vacuna:", error);
    return []; // Retornamos un arreglo vacío en caso de error
  }
}

// Editar tipo de vacuna
export async function actualizarTipoVacunaFirebase(tipoVacuna: TipoVacuna): Promise<boolean> {
  try {
    const ref = doc(db, "tiposVacuna", tipoVacuna.id); // Referencia al documento a actualizar
    await updateDoc(ref, {
      nombre: tipoVacuna.nombre,    // Actualizamos el nombre
      especieId: tipoVacuna.especieId, // Actualizamos el ID de la especie
    });
    return true; // Si la operación es exitosa, retornamos true
  } catch (error) {
    console.error("Error al actualizar tipo de vacuna:", error);
    return false; // En caso de error, retornamos false
  }
}

// Eliminar tipo de vacuna
export async function eliminarTipoVacuna(id: string): Promise<boolean> {
  try {
    const ref = doc(db, "tiposVacuna", id); // Referencia al documento a eliminar
    await deleteDoc(ref); // Eliminamos el documento
    return true; // Si la operación es exitosa, retornamos true
  } catch (error) {
    console.error("Error al eliminar tipo de vacuna:", error);
    return false; // En caso de error, retornamos false
  }
}
