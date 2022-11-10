import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import * as api from "../api"

export const login = createAsyncThunk("auth/login", async({formValue, navigate, toast}, {rejectWithValue}) => {
    try{
        const response = await api.signIn(formValue)
        toast.success("Login Successful");
        navigate("/")
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})

export const register = createAsyncThunk("auth/register", async({formValue, navigate, toast}, {rejectWithValue}) => {
    try{
        const response = await api.signUp(formValue)
        toast.success("Register Successful");
        navigate("/")
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})


const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        error: "",
        loading: false,
    },

    //Set user, Not logout functionality
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLogout: (state, action) => {
            localStorage.clear();
            state.user = null;
        },
    },
    extraReducers: {

        // Login Pending, fullfiled and rejected status
        [login.pending]: (state, action) => {
            state.loading = true;
        },
        [login.fulfilled]: (state, action) => {
            state.loading = false;
            localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
            state.user = action.payload
        },
        [login.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },

        // Register Pending, fullfiled and rejected status
        [register.pending]: (state, action) => {
            state.loading = true;
        },
        [register.fulfilled]: (state, action) => {
            state.loading = false;
            localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
            state.user = action.payload
        },
        [register.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
    }
})

export const {setUser, setLogout} = authSlice.actions;

export default authSlice.reducer