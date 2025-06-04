import { getFirestore, collection, getDocs, doc, getDoc, addDoc, updateDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";



/**
 * This is a TEST function to get one item from the "students" collection.
 * It retrieves the document with ID "0" and logs its data.
 * @returns one item from the "students" collection
 */
export async function getOneItemTest(){
    const docRef = doc(db, "students", "0");
    try {
        const docSnap = await getDoc(docRef);
        console.log("Document data:", docSnap.data());
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            console.error("No such document!");
            return null;
        }
    } catch (error) {
        console.error("DATA_FETCH_DB: Error getting document.\n", error);
    } 
}

export async function getServerData(collectionName, isTest = false) {
  const querySnapshot = await getDocs(collection(db, collectionName));
  let data = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  if (isTest) {
    console.log(
      "DATA_FETCH_DB: Data fetched from collection:",
      collectionName,
      "\n",
      data
    );
  }
  return data;
}

export async function addNewDocument(object, collectionName, isTest = false) {
    const docRef = await addDoc(collection(db, collectionName), object);
    if (isTest) {
        console.log("DATA_FETCH_DB: Document written with ID.\n", docRef.id);
    }
}


export async function updateDocument(objectId, updatedFields, isTest = false) {
  const docRef = doc(db, "students", objectId);
  /*Original code from firebase documentation to update a document

  const updateDoc = await updateDoc(docRef, {
    capital: true
  });

    */
  try {
    await updateDoc(docRef, updatedFields);
    if (isTest) {
      console.log("Document updated with ID: ", objectId);
    }
  } catch (error) {
    console.error("DATA_FETCH_DB: Error updating document.\n", error);
  }
  
}


export async function overwriteDocument(objectId, collection, newObject, isTest = false) {
  const docRef = doc(db, collection, objectId);
  try {
    await setDoc(docRef, newObject);
    if (isTest) {
      console.log("Document with ID is overwritten: ", objectId);
    }
  } catch (error) {
    console.error("DATA_FETCH_DB:Error overwriting document.\n", error);
  }
}

export async function deleteDocument(objectId, collection, isTest = false) {
  const docRef = doc(db, collection, objectId);
  try {
    await deleteDoc(docRef);
    if (isTest) {
      console.log("Document with ID deleted: ", objectId);
    }
  } catch (error) {
    console.error("DATA_FETCH_DB: Error deleting document.\n", error);
  }
}
