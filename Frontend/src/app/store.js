import { configureStore } from "@reduxjs/toolkit";
import infoReducer from "./infoSlice";

export const store = configureStore({
    reducer : infoReducer
})