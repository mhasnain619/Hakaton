import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../FirebaseConfiq";


export const signupUser = createAsyncThunk('auth/signupUser', async (credentials, { rejectWithValue }) => {
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
        const user = userCredentials.user
        await updateProfile(user, { displayName: credentials.name })
        await setDoc(doc(db, 'users', user.uid), {
            name: credentials.name,
            email: credentials.email,
            role: credentials.role,
            uid: user.uid
        })
        localStorage.setItem('uid', user.uid)
        localStorage.setItem('role', credentials.role)
        return { uid: user.uid, name: credentials.name, email: credentials.email, role: credentials.role };
    } catch (error) {
        return rejectWithValue(error.message)
    }
})
const initialState = {
    user: null,
    isLoading: false,
    isError: false
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(signupUser.pending, (state, action) => {
            state.user = null
            state.isLoading = true
            state.isError = null;
        })
        builder.addCase(signupUser.fulfilled, (state, action) => {
            state.user = action.payload
            state.isLoading = false
            state.isError = null;
        })
        builder.addCase(signupUser.rejected, (state, action) => {
            state.user = null
            state.isLoading = false
            state.isError = action.payload;
        })

    }
})

export default authSlice.reducer