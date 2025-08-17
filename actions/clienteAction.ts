import { db } from "@/lib/firebaseConfig";
import { Cliente } from "@/app/types/types";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

// Agregar un cliente nuevo
export async function agregarClienteNuevo(cliente: Cliente): Promise<string | null> {
  try {
    const ref = doc(db, "clientes", cliente.id);
    await setDoc(ref, cliente);
    return cliente.id;
  } catch (error) {
    console.error("Error al agregar cliente:", error);
    return null;
  }
}

// Obtener todos los clientes
export async function obtenerTodosLosClientes(): Promise<Cliente[]> {
  const ref = collection(db, "clientes");
  const querySnapshot = await getDocs(ref);
  const clientesList: Cliente[] = [];
  querySnapshot.forEach((doc) => {
    clientesList.push(doc.data() as Cliente);
  });
  return clientesList;
}

// Actualizar un cliente existente
export async function actualizarClienteFirebase(cliente: Cliente): Promise<boolean> {
  try {
    const ref = doc(db, "clientes", cliente.id);
    await updateDoc(ref, {
      nombreCompleto: cliente.nombreCompleto,
      dni: cliente.dni,
      celular: cliente.celular,
      genero: cliente.genero,
      estado: cliente.estado,
    });
    return true;
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
    return false;
  }
}

// Eliminar un cliente
export async function eliminarClienteFirebase(id: string): Promise<boolean> {
  try {
    const ref = doc(db, "clientes", id);
    await deleteDoc(ref);
    return true;
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    return false;
  }
}
