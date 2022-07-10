import firestoreDb from "./firestoreDatabase";
import firebaseStorage from "./firebaseStorage";
import { firebaseSingInError, firebaseCreateUserError } from "./firebaseAuthErrorValidation";


const firebaseError = {
    firebaseSingInError,
    firebaseCreateUserError
}

export { 
    firestoreDb, 
    firebaseStorage,
    firebaseError
};
