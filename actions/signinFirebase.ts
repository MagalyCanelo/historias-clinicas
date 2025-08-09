import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/auth";

export async function signInWithFirebase(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}
