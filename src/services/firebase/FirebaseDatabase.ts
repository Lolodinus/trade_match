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
import { 
    Firestore, 
    DocumentSnapshot, 
    QueryDocumentSnapshot, 
    DocumentReference, 
    DocumentData, 
    CollectionReference, 
    WhereFilterOp, 
    Query } from "firebase/firestore";
import { isError } from "../../utils/objIsType";


type collectionPath= "user/" | "item/" | "type/" | "trader/"
  
const db = getFirestore(app);
  
class FirestoreDB {
    db: Firestore;

    constructor(db: Firestore) {
        this.db = db;
    }

    // TRANSFORM DOCS
    getDocWithId = (snapshot: DocumentSnapshot<DocumentData>) => {
        return {
            id: snapshot.id,
            ...snapshot.data()
        };
    }
    getDocsWithId = (documentsQuerySnapshot: QueryDocumentSnapshot<DocumentData>[]) => {
        let docs = [];
        for (let documentSnapshot of documentsQuerySnapshot) {
            docs.push(this.getDocWithId(documentSnapshot));
        }
        return docs;
    }

    // GET REFERENCE
	getDocRef = (collectionDb: collectionPath, docId: string) => {
		return doc(this.db, `${collectionDb}${docId}`);
	};

	getCollectionRef = (collectionDb: collectionPath) => {
		return collection(this.db, collectionDb);
	};

    // READ DOC
    getDoc = async (docRef: DocumentReference<DocumentData>) => {
		try {
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
                return this.getDocWithId(docSnap);
			} else {
				throw new Error(`Doc with id ${docSnap.id} not found`)
			}
		} catch (error) {
			if(isError(error)) throw new Error(error.message);
		}
	};
    getAllDocs = async (
		collectionRef: CollectionReference<DocumentData>,
	) => {
		try {
			const querySnapshot = await getDocs(collectionRef);
			return this.getDocsWithId(querySnapshot.docs);
		} catch (error) {
			if(isError(error)) throw new Error(error.message);
		}
	};
    getSortedDocs = async (
        collectionRef: CollectionReference<DocumentData>,
        sortedBy: string,
        quantity?: number,
    ) => {
        try {
            let q: Query<DocumentData>;
            if(quantity) {
                q = query(collectionRef, 
                    orderBy(sortedBy, "desc"), 
                    limit(quantity)
                );
            } else {
                q = query(collectionRef, 
                    orderBy(sortedBy, "desc")
                );
            }
            const querySnapshot = await getDocs(q);
			return this.getDocsWithId(querySnapshot.docs);
        } catch (error) {
			if(isError(error)) throw new Error(error.message);
        }
    }
    getFiltreddDocs = async <T>(
        collectionRef: CollectionReference<DocumentData>,
        field: keyof T,
        condition: WhereFilterOp, 
        value: T[keyof T],
        quantity?: number,
    ) => {
        try {
            let q: Query<DocumentData>;
            if(quantity) {
                q = query(collectionRef, 
                    where(String(field), condition, value), 
                    limit(quantity)
                );
            } else {
                q = query(collectionRef, 
                    where(String(field), condition, value),
                );
            }
            const querySnapshot = await getDocs(q);
			return this.getDocsWithId(querySnapshot.docs);
        } catch (error) {
			if(isError(error)) throw new Error(error.message);
        }
    }
    getSortedAndFiltredDocs = async<T>(
        collectionRef: CollectionReference<DocumentData>,
        sortedBy: string,
        filtredBy: {
            field: keyof T,
            condition: WhereFilterOp, 
            value: T[keyof T],
        },
        quantity?: number,
    ) => {
        try {
            let q: Query<DocumentData>;
            if(quantity) {
                q = query(collectionRef,
                    where(String(filtredBy.field), filtredBy.condition, filtredBy.value), 
                    orderBy(sortedBy, "desc"), 
                    limit(quantity)
                );
            } else {
                q = query(collectionRef,
                    where(String(filtredBy.field), filtredBy.condition, filtredBy.value), 
                    orderBy(sortedBy, "desc"), 
                );
            }
            const querySnapshot = await getDocs(q);
			return this.getDocsWithId(querySnapshot.docs);
        } catch (error) {
			if(isError(error)) throw new Error(error.message);
        }
    }

    // CREATE DOC
	addDoc = async (collectionRef: CollectionReference<DocumentData>, docData: any) => {
		try {
			return await addDoc(collectionRef, docData);
		} catch (error) {
			if(isError(error)) throw new Error(`Error adding document: ${error.message}`);
		}
	};
	addDocWithId = async (docRef: DocumentReference<DocumentData>, docData: any) => {
		try {
			return await setDoc(docRef, docData);
		} catch (error) {
			if(isError(error)) throw new Error(`Error adding document: ${error.message}`);
		}
	};

    // UPDATE DOC/FIELD
    updateDoc = async <T>(
		docRef: DocumentReference<DocumentData>,
		updateData: T
	) => {
		try {
			return await updateDoc(docRef, updateData);
		} catch (error) {
			if(isError(error)) throw new Error(error.message);
		}
	};

    // DELETE DOC/FIELD
	deleteDoc = async (docRef: DocumentReference<DocumentData>) => {
		try {
			return await deleteDoc(docRef);
		} catch (error) {
			throw new Error("Failed to delete document");
		}
	}
	deleteDocField = async <T>(
		docRef: DocumentReference<DocumentData>,
		field: keyof T
	) => {
		try {
			await updateDoc(docRef, {
				[field]: deleteField()
			});
		} catch (error) {
			throw new Error("Failed to delete document field");
		}
	};


}

const firestoreDb = new FirestoreDB(db);
export default firestoreDb;
  