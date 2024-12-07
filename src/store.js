import { configureStore } from "@reduxjs/toolkit";

import bookingReducer from "./features/bookingSlice";
import userReducer from "./features/userSlice";

export const store = configureStore({
    reducer:{
        bookingState: bookingReducer,
        userState: userReducer
    }
})