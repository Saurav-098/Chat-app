import { configureStore } from "@reduxjs/toolkit";
import userSlice from './reducer/UserSlice'
import messageSlice from './reducer/MessageSlice'


export const store = configureStore({
    reducer:{
        user: userSlice,
        message: messageSlice
    }
})

