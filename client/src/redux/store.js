import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authslice";
import ItemReducer from "./features/itemSlice"

export default configureStore({
    reducer: {
        auth: AuthReducer,
        item: ItemReducer,
        
    },
});