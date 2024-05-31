import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import app from "../init";

const firestore = getFirestore(app);

export async function addSuggestion(
  title,
  currentCondition,
  suggestion,
  userNik,
  userName,
  category,
  status,
  date
) {
  try {
    const docRef = collection(firestore, "suggestionData");
    const snapshot = await addDoc(docRef, {
      title: title,
      currentCondition: currentCondition,
      suggestion: suggestion,
      userNik: userNik,
      userName: userName,
      category: category,
      status: status,
      date: date,
    });
    return snapshot;
  } catch (error) {
    console.error("Error adding document subcollection to Firestore:", error);
    throw new Error("Failed to add document subcollection to Firestore");
  }
}

export async function updateStatus(docId, status) {
  try {
    const docRef = doc(firestore, "suggestionData", docId);
    await updateDoc(docRef, {
      status: status,
    });
  } catch (error) {
    console.error("Error updating document:", error);
    throw new Error("Failed to update document subcollection to Firestore");
  }
}

export async function setUserPoint(userNik) {
  try {
    let point = 0;
    const allSuggestionRef = collection(firestore, "suggestionData");
    const q1 = query(
      allSuggestionRef,
      where("userNik", "==", userNik),
      where("status", "==", "ACC")
    );
    const snapshot = await getDocs(q1);
    const totalSuggestion = snapshot.size;
    point = totalSuggestion * 10;

    const usersRef = collection(firestore, "users");
    const q2 = query(usersRef, where("nik", "==", userNik));
    const querySnapshot = await getDocs(q2);
    querySnapshot.forEach(async (userDoc) => {
      const userDocRef = doc(firestore, "users", userDoc.id);
      await updateDoc(userDocRef, {
        point: point,
      });
    });
  } catch (error) {
    console.log(error);
  }
}

export async function updateSuggestion(
  docId,
  category,
  title,
  currentCondition,
  suggestion
) {
  try {
    const docRef = doc(firestore, "suggestionData", docId);
    const snapshot = await updateDoc(docRef, {
      category: category,
      title: title,
      currentCondition: currentCondition,
      suggestion: suggestion,
    });
    return snapshot;
  } catch (error) {
    console.error("Error updating document:", error);
    throw new Error("Failed to add document subcollection to Firestore");
  }
}

export async function deleteSuggestion(docId) {
  try {
    const docRef = doc(firestore, "suggestionData", docId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting data:", error);
    throw new Error("Failed to delete data");
  }
}

export async function getAllSuggestion() {
  try {
    const docRef = collection(firestore, "suggestionData");
    const snapshot = await getDocs(docRef);
    const subSuggestionData = [];
    snapshot.forEach((doc) => {
      subSuggestionData.push({ id: doc.id, ...doc.data() });
    });
    return subSuggestionData;
  } catch (error) {
    console.error("Error fetching document data:", error);
    throw new Error("Failed to fetch document data from Firestore");
  }
}

export async function getSuggestionByUserName(userNik) {
  try {
    const docRef = collection(firestore, "suggestionData");
    const q = query(docRef, where("userNik", "==", userNik));
    const snapshot = await getDocs(q);
    const subSuggestionData = [];
    snapshot.forEach((doc) => {
      subSuggestionData.push({ id: doc.id, ...doc.data() });
    });
    return subSuggestionData;
  } catch (error) {
    console.error("Error fetching document data:", error);
    throw new Error("Failed to fetch document data from Firestore");
  }
}

export async function getSuggestionById(docId) {
  try {
    const docRef = doc(firestore, "suggestionData", docId);
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
