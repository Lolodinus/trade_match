import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "firebase/auth";
import { app } from "../../config/firebase";
import { firestoreDb } from "./";
import { isError, isUser } from "../../utils/objIsType";

// Type
import { Auth } from "firebase/auth";
import {
    Roles,
    IFirebaseModelCreateUser, 
    IFirebaseModelSingIn, 
    IFirebaseModelUser 
} from "../../interface/firestoreModel/IFirebaseModelUser";
import { IUser } from "../../interface/tradeMatch/user";

const auth = getAuth(app);

class FirebaseAuth {
    auth: Auth;

    constructor(auth: Auth) {
        this.auth = auth;
    }

    createUser = async (userData: IFirebaseModelCreateUser): Promise<IUser | undefined> => {
        try {
            if (await this.loginAlreadyExist(userData.login)) throw new Error("User whith this login already exist");
            const userCredential = await createUserWithEmailAndPassword(this.auth, userData.email, userData.password);
            const user = userCredential.user;
            if (!user) return;
            const data: IFirebaseModelUser = {
                login: userData.login,
                email: userData.email,
                role: "USER"
            }
            await firestoreDb.addDocWithId("user/", user.uid, data);
            const createUser = await firestoreDb.getDocById("user/", user.uid);
            if(isUser(createUser, ["login", "role"])) { 
                return {
                    login: createUser.login,
                    role: createUser.role
                }
            }
        } catch (error) {
            if(isError(error)) throw new Error(error.message);
        }
    }

    singIn = async (userData: IFirebaseModelSingIn) => {
        try {            
            const userCredential = await signInWithEmailAndPassword(this.auth, userData.email, userData.password);
            const aunthUser = userCredential.user;
            if (!aunthUser) return;
            const user = await firestoreDb.getDocById("user/", aunthUser.uid);
            if(isUser(user, ["login", "role"])) { 
                return {
                    login: user.login,
                    role: user.role
                }
            }
        } catch (error) {
            if(isError(error)) throw new Error(error.message);
        }
    }

    singOut = async () => {
        try {
            await signOut(this.auth)
        } catch (error) {
            if(isError(error)) throw new Error(error.message);
        }
    }

    authState = async(next: (user: { login: string; role: Roles }) => void) => {
        try {
            onAuthStateChanged(this.auth, async(aunthUser) => {
                if(!aunthUser) return;
                const user = await firestoreDb.getDocById("user/", aunthUser.uid);
                if(isUser(user, ["login", "role"])) {
                    next({
                        login: user.login, 
                        role: user.role
                    });
                }
            });
        } catch (error) {
            if(isError(error)) throw new Error(error.message);
        }
    }

    loginAlreadyExist = async(login: string) => {
        try {
            const result = await firestoreDb.getDocsWithWhereCondition("user/", {
                field: "login",
                condition: "==",
                value: login
            });
            if (result && result.length > 0) return true;
            return false;
        } catch (error) {
            if(isError(error)) throw new Error(error.message);
        }
    }
}

const firebaseAuth = new FirebaseAuth(auth);
export default firebaseAuth;