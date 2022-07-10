import { AppDispatch } from "../../store";
import { userSlice } from "./UserReducer";
import firebaseAuth from "../../../services/firebase/firebaseAuth";

// Type
import { IFirebaseModelCreateUser, IFirebaseModelSingIn } from "../../../interface/firestoreModel/IFirebaseModelUser";
import { isError } from "../../../utils/objIsType";


export const regisrtation = (userData: IFirebaseModelCreateUser) => async (dispatch: AppDispatch) => {
    try {
        const user = await firebaseAuth.createUser(userData);
        if (!user) return;
        dispatch(userSlice.actions.setUser(user));
    } catch (error) {
        if(isError(error)) {
            throw new Error(error.message)
        }
    }
}

export const login = (userData: IFirebaseModelSingIn) => async (dispatch: AppDispatch) => {
    try {
        const user = await firebaseAuth.singIn(userData);
        if (!user) return;
        dispatch(userSlice.actions.setUser(user));
    } catch (error) {
        if(isError(error)) {
            throw new Error(error.message)
        }
    }
}

export const authentication = () => (dispatch: AppDispatch) => {
    firebaseAuth.authState((user) => dispatch(userSlice.actions.setUser(user)));
}

export const logout = () => async (dispatch: AppDispatch) => {
    try {
        await firebaseAuth.singOut();
        dispatch(userSlice.actions.resetUser());
    } catch (error) {
        if(isError(error)) {
            throw new Error(error.message)
        }
    }
}