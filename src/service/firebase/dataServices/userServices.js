import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import app from "../init";

const firestore = getFirestore(app);

export async function addUser(name, nik, departemen, jabatan, role) {
  try {
    const docRef = collection(firestore, "users");
    const snapshot = await addDoc(docRef, {
      name: name,
      nik: nik,
      departemen: departemen,
      jabatan: jabatan,
      role: role,
      point: 0,
    });
    return snapshot;
  } catch (error) {
    console.error("Error adding document subcollection to Firestore:", error);
    throw new Error("Failed to add document subcollection to Firestore");
  }
}

export async function getAllUsers() {
  try {
    const docRef = collection(firestore, "users");
    const snapshot = await getDocs(docRef);
    const subUserData = [];
    snapshot.forEach((doc) => {
      subUserData.push({ id: doc.id, ...doc.data() });
    });
    return subUserData;
  } catch (error) {
    console.error("Error fetching document data:", error);
    throw new Error("Failed to fetch document data from Firestore");
  }
}

export async function getUserByNik(userNik) {
  try {
    const docRef = collection(firestore, "users");
    const q = query(docRef, where("nik", "==", userNik));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.log(`No user found with NIK: ${userNik}`);
      return null;
    }

    const userDoc = snapshot.docs[0];
    return { id: userDoc.id, ...userDoc.data() };
  } catch (error) {
    console.error("Error fetching document data:", error);
    throw new Error("Failed to fetch document data from Firestore");
  }
}

export async function getUserById(docId) {
  try {
    const docRef = doc(firestore, "users", docId);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
    } else {
      throw new Error("document does not exist");
    }
  } catch (error) {
    console.error("Error fetching document ID:", error);
    throw new Error("Failed to fetch document ID from Firestore");
  }
}

export async function updateUser(docId, name, nik, departemen, jabatan, role) {
  try {
    const docRef = doc(firestore, "users", docId);
    const snapshot = await updateDoc(docRef, {
      name: name,
      nik: nik,
      departemen: departemen,
      jabatan: jabatan,
      role: role,
    });
    return snapshot;
  } catch (error) {
    console.error("Error updating document:", error);
    throw new Error("Failed to add document subcollection to Firestore");
  }
}

export async function deleteUser(docId) {
  try {
    const docRef = doc(firestore, "users", docId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting data:", error);
    throw new Error("Failed to delete data");
  }
}
