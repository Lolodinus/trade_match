import {
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  deleteField,
  query,
  where
} from "firebase/firestore";
import { app } from "../../config/firebase";

// Types
import { Firestore, DocumentReference, DocumentData, WhereFilterOp } from "firebase/firestore";
import { isError } from "../../utils/objIsType";
type collectionPath= "user/" | "item/" | "type/" | "trader/"


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
	addDocWithId = async (collectionDb: collectionPath, docId: string, docData: any) => {
		try {
		await setDoc(doc(this.db, `${collectionDb}${docId}`), docData);
		} catch (e) {
		console.error("Error adding document: ", e);
		}
	};
	updateDoc = async (
		docRef: DocumentReference<DocumentData>,
		updateData: any
	) => {
		updateDoc(docRef, updateData);
	};
	getDocRef = (fullFilePath: string) => {
		return doc(this.db, fullFilePath);
	};
	getDocById = async (docPath: collectionPath, docId: string) => {
		try {
		const docRef = doc(this.db, `${docPath}${docId}`);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			return {
			id: docSnap.id,
			...docSnap.data()
			};
		} else {
			throw new Error(`Doc with id ${docId} not found: `)
		}
		} catch (error) {
		console.log(error);
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
	getDocsWithWhereCondition = async (tableDb: collectionPath, whereCondition: {field: string; condition: WhereFilterOp; value: any}) => {
		try {
			const q = query(collection(this.db, tableDb.slice(0, -1)), where(whereCondition.field, whereCondition.condition, whereCondition.value));
			const querySnapshot = await getDocs(q);
			let docs = [];
			for (let documentSnapshot of querySnapshot.docs) {
				docs.push({
					id: documentSnapshot.id,
					...documentSnapshot.data()
				});
			}
			return docs;
		} catch (error) {
			if (isError(error)) {
				throw new Error(error.message);
			};
		}
	};
	deleteDocField = async (
		docRef: DocumentReference<DocumentData>,
		field: string
	) => {
		updateDoc(docRef, {
		[field]: deleteField()
		});
	};
	deleteDoc = (docRef: DocumentReference<DocumentData>) => {
		deleteDoc(docRef);
	}
}

const firestoreDb = new FirestoreDB(db);
export default firestoreDb;
