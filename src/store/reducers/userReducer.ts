import { createSlice } from "@reduxjs/toolkit";

// Type
import { PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../interface/tradeMatch/user";
import { authentication } from "./ActionCreators";

interface IUserState {
    user: IUser | undefined;
}

const initialState: IUserState = {
    user: undefined,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload;
        },
        resetUser(state) {
            state.user = undefined;
        }
    }
})

export default userSlice.reducer;