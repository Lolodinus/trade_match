import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteField
} from "firebase/firestore";
import { app } from "../../config/firebase";

// Types
import { Firestore, DocumentReference, DocumentData } from "firebase/firestore";

const db = getFirestore(app);

class FirestoreDB {
  db: Firestore;
  constructor(db: Firestore) {
    this.db = db;
  }
  addDoc = async (tableDb: string, docData: any) => {
    try {
      const docRef = await addDoc(collection(this.db, tableDb), docData);
      return docRef;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  updateDoc = async (
    docRef: DocumentReference<DocumentData>,
    updateData: any
  ) => {
    console.log(updateData);
    updateDoc(docRef, updateData);
  };
  getDocRef = (fullFilePath: string) => {
    return doc(this.db, fullFilePath);
  };
  getDocById = async (docPath: string, docId: string) => {
    try {
      const docRef = doc(this.db, `${docPath}${docId}`);
      const docSnap = await getDoc(docRef);
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } catch (error) {
      console.error("Error update document: ", error);
    }
  };
  getDocs = async (tableDb: string) => {
    const querySnapshot = await getDocs(collection(this.db, tableDb));
    let docs = [];
    for (let documentSnapshot of querySnapshot.docs) {
      docs.push({
        id: documentSnapshot.id,
        ...documentSnapshot.data()
      });
    }
    return docs;
  };
  deleteDocField = async (
    docRef: DocumentReference<DocumentData>,
    field: string
  ) => {
    updateDoc(docRef, {
      [field]: deleteField()
    });
  };
}

const firestoreDb = new FirestoreDB(db);
export default firestoreDb;
