import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../slice/cartSlice"
const store = configureStore({
    reducer:{
        productCart:cartSlice
    }
})

export default store;