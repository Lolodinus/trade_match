import firebaseStorage from "./FirebaseStorage";
import firestoreDb from "./FirebaseDatabase";
import firebaseAuth from "./FirebaseAuth";
import { firebaseSingInError, firebaseCreateUserError } from "./FirebaseAuthErrorValidation";


const firebaseError = {
    firebaseSingInError,
    firebaseCreateUserError
}

export { 
    firestoreDb,
    firebaseStorage,
    firebaseAuth,
    firebaseError
};
