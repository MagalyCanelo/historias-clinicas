import { db } from "@/lib/firebaseConfig";
import { Pet } from "@/app/types/types";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export async function agregarMascotaNueva(
  mascota: Pet
): Promise<string | null> {
  const ref = doc(db, "mascotas", mascota.id);
  return await setDoc(ref, mascota)
    .then(() => {
      return mascota.id;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
}

export async function obtenerTodasLasMascotas(): Promise<Pet[]> {
  const ref = collection(db, "mascotas");
  const querySnapshot = await getDocs(ref);
  const mascotas: Pet[] = [];
  querySnapshot.forEach((doc) => {
    mascotas.push(doc.data() as Pet);
  });
  return mascotas;
}

export async function actualizarMascota(mascota: Pet): Promise<string | null> {
  const ref = doc(db, "mascotas", mascota.id);
  return await updateDoc(ref, {
    name: mascota.name,
  })
    .then(() => {
      return mascota.id;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
}


export async function listarElementosNoSuspendidos(){
    const ref = collection(db, "mascotas");
    const querySnapshot = await getDocs(ref);
    const mascotas: Pet[] = [];
    querySnapshot.forEach((doc) => {
      const pet = doc.data() as Pet;
      if (!pet.suspend) {
        mascotas.push(pet);
      }
    });
    return mascotas;


}