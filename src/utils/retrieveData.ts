import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export async function retrieveData(collectionName: string) {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const response = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return response;
}
