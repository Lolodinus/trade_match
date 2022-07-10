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
  where,
  orderBy,
  limit
} from "firebase/firestore";
import { app } from "../../config/firebase";

// Types
import { Firestore, DocumentReference, DocumentData, WhereFilterOp, QuerySnapshot, Query } from "firebase/firestore";
import { isError } from "../../utils/objIsType";
type collectionPath= "user/" | "item/" | "type/" | "trader/"


const db = getFirestore(app);

class FirestoreDB {
	db: Firestore;
	constructor(db: Firestore) {
		this.db = db;
	}

	addDoc = async (docPath: collectionPath, docData: any) => {
		try {
			return await addDoc(collection(this.db, docPath), docData);
		} catch (error) {
			if(isError(error)) {
				throw new Error(`Error adding document: ${error.message}`);
			};
		}
	};

	addDocWithId = async (collectionDb: collectionPath, docId: string, docData: any) => {
		try {
			await setDoc(doc(this.db, `${collectionDb}${docId}`), docData);
		} catch (e) {
			throw new Error(`Error adding document: ${e}`);
		}
	};

	updateDoc = async (
		docRef: DocumentReference<DocumentData>,
		updateData: any
	) => {
		try {
			await updateDoc(docRef, updateData);
		} catch (error) {
			if(isError(error)) throw new Error(error.message);
		}
	};

	getDocRef = (collectionDb: collectionPath, docId: string) => {
		return doc(this.db, `${collectionDb}${docId}`);
	};

	getDocsRef = (collectionDb: collectionPath) => {
		return collection(this.db, collectionDb);
	};

	getDoc = async (docRef: DocumentReference<DocumentData>) => {
		try {
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				return {
					id: docSnap.id,
					...docSnap.data()
				};
			} else {
				throw new Error(`Doc with id ${docSnap.id} not found`)
			}
		} catch (error) {
			if(isError(error)) throw new Error(error.message);
		}
	};

	getDocs = async (
		collectionDb: collectionPath, 
		options?: {
			sortBy?: string;
			docLimit?: number
		}) => {
		try {
			const docsRef = this.getDocsRef(collectionDb);
			let q: Query<DocumentData> | undefined = undefined;
			if(options?.sortBy && options?.docLimit) {
				q = query(docsRef, orderBy(options.sortBy, "desc"), limit(options.docLimit));
			} else if (options?.sortBy) {
				q = query(docsRef, orderBy(options.sortBy, "desc"));
			} else if (options?.docLimit) {
				q = query(docsRef, limit(options.docLimit));
			}
			const querySnapshot = await getDocs(q ? q : docsRef);
			let docs = [];
			for (let documentSnapshot of querySnapshot.docs) {
				docs.push({
					id: documentSnapshot.id,
					...documentSnapshot.data()
				});
			}
			return docs;
		} catch (error) {
			if(isError(error)) throw new Error(error.message);
		}
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
			if (isError(error)) throw new Error(error.message);
		}
	};
	deleteDocField = async (
		docRef: DocumentReference<DocumentData>,
		field: string
	) => {
		try {
			await updateDoc(docRef, {
				[field]: deleteField()
			});
		} catch (error) {
			throw new Error("Failed to delete document field");
		}
	};
	deleteDoc = async (docRef: DocumentReference<DocumentData>) => {
		try {
			await deleteDoc(docRef);
		} catch (error) {
			throw new Error("Failed to delete document");
		}
	}
}

const firestoreDb = new FirestoreDB(db);
export default firestoreDb;

