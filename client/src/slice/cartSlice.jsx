import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "productCart",
    initialState: {
        products: [],
    },
    reducers: {
        addToProduct: (state, action) => {
            // check if product in cart or not
            const existingProductIndex = state.products.findIndex(
                product => product._id === action.payload._id
            );
            if (existingProductIndex >= 0) {
                alert("Product is Allready in Cart");

            } else {
                console.log("This is actions: ", action.payload);
                state.products.push(action.payload);
            }


        }
    },
});

export const {
    addToProduct
} = cartSlice.actions;
export default cartSlice.reducer;
