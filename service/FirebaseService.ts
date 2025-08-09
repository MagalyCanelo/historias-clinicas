import { doc, setDoc, getFirestore } from "firebase/firestore";
import { app } from "@/lib/firebaseConfig"; // Usa ruta absoluta si config está en lib

const db = getFirestore(app);

export async function createUserDoc(email: string, role: string) {
  if (!email) return;

  const userRef = doc(db, "users", email);
  await setDoc(userRef, {
    email,
    role,
    createdAt: new Date(),
  });
}