import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc
} from "firebase/firestore";
import { app } from "../../config/firebase";

// Types
import { Firestore } from "firebase/firestore";

const db = getFirestore(app);

class FirestoreDB {
  db: Firestore;
  constructor(db: Firestore) {
    this.db = db;
  }
  addDoc = async (tableDb: string, docData: any) => {
    try {
      const docRef = await addDoc(collection(this.db, tableDb), docData);
      return docRef.id;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  updateDoc = async (docId: string, updareData: any) => {
    try {
      const docRef = doc(this.db, docId);
      await updateDoc(docRef, updareData);
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
}

const firestoreDb = new FirestoreDB(db);
export default firestoreDb;
