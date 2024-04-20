import {
  getFirestore,
  collection,
  getDoc,
  getDocs,
  doc,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import bcrypt from "bcrypt";
import app from "./init";

const firestore = getFirestore(app);

export async function retrieveData(collectionName) {
  const snapshot = await getDocs(collection(firestore, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function retrieveDataById(collectionName, id) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();

  return data;
}

export async function retrieveDataByField(collectionName, field, value) {
  const q = query(
    collection(firestore, collectionName),
    where(field, "==", value)
  );

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function signUp(userData, callback) {
  try {
    const docRef = collection(firestore, "users");
    const q = query(docRef, where("nik", "==", userData.nik));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    if (data.length > 0) {
      const userDoc = doc(firestore, "users", data[0].id);
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      await updateDoc(userDoc, {
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
      });
      callback(true);
    } else {
      callback(false);
    }
  } catch (error) {
    console.error(error);
    callback(false);
  }
}

export async function signIn(nik) {
  const docRef = collection(firestore, "users");
  const q = query(docRef, where("nik", "==", nik));
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (data) {
    return data[0];
  } else {
    return null;
  }
}
