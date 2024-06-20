import fs from "fs";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  getStorage,
  deleteObject,
} from "firebase/storage";
import {
  collection,
  addDoc,
  serverTimestamp,
  getFirestore,
  updateDoc,
  doc,
} from "firebase/firestore";
import app from "../init";

const firestore = getFirestore(app);
const storage = getStorage(app);

export async function uploadImageBefore(fileObject) {
  const fileName =
    fileObject.originalFilename || fileObject.newFilename || fileObject.name;
  const storageRef = ref(storage, `Kaizen/${fileName}`);
  const fileBuffer = fs.readFileSync(fileObject.filepath);
  await uploadBytes(storageRef, fileBuffer);
  const downloadURL = await getDownloadURL(storageRef);

  const docRef = await addDoc(collection(firestore, "suggestionData"), {
    imageBefore: {
      name: fileName,
      url: downloadURL,
      uploadedAt: serverTimestamp(),
    },
  });
  return { id: docRef.id, url: downloadURL };
}

export async function uploadImageAfter(fileObject, lastDocId) {
  const fileName =
    fileObject.originalFilename || fileObject.newFilename || fileObject.name;
  const storageRef = ref(storage, `Kaizen/${fileName}`);
  const fileBuffer = fs.readFileSync(fileObject.filepath);
  await uploadBytes(storageRef, fileBuffer);
  const downloadURL = await getDownloadURL(storageRef);

  await updateDoc(doc(firestore, "suggestionData", lastDocId), {
    imageAfter: {
      name: fileName,
      url: downloadURL,
      uploadedAt: serverTimestamp(),
    },
  });

  return { url: downloadURL };
}

export async function deleteImage(filePath) {
  const fileRef = ref(storage, filePath);
  try {
    await deleteObject(fileRef);
  } catch (error) {
    console.error(`Error deleting file at ${filePath}:`, error);
    throw error;
  }
}
