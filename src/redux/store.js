import LoginSlice from "pages/Login/LoginSlice";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer:{
        LoginReducer:LoginSlice
    }
})
export default store