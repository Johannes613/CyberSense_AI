import { db, auth } from "../firebase";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";

export const savePasswordStrength = async (strengthScore) => {
  if (!auth.currentUser) return;

  const ref = doc(
    collection(db, "users", auth.currentUser.uid, "securityMetrics")
  );

  const data = {
    strengthScore,
    timestamp: serverTimestamp(),
  };

  try {
    await setDoc(ref, data);
    console.log("Password strength saved.");
  } catch (error) {
    console.error("Error saving password strength:", error);
    throw error;
  }
};
