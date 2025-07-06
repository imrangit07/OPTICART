import { createSlice } from "@reduxjs/toolkit";
import {Zoom, toast } from 'react-toastify';

const cartSlice = createSlice({
    name: "productCart",
    initialState: {
        products: [],
    },
    reducers: {
        addToProduct: (state, action) => {

            const existingProductIndex = state.products.findIndex(
                product => product.id === action.payload.id
            );

            if (existingProductIndex >= 0) {
                toast.info("Already in cart! 🛒", {transition:Zoom, style: { fontSize: '16px', } });

            } else {
                state.products.push({ ...action.payload, quantity: action.payload.quantity });
                toast.success("Added to Crt! 🛒", {transition:Zoom, style: { fontSize: '16px', } });

            }
        },

        incrementQuiantity: (state, action) => {
            const { id } = action.payload;
            const productIndex = state.products.findIndex(
                product => product.id === id
            )
            if (productIndex >= 0) {
                state.products[productIndex].quantity += 1;
            }
        },

        decrementQuiantity: (state, action) => {
            const { id } = action.payload;
            const productIndex = state.products.findIndex(
                product => product.id === id
            )
            if (productIndex >= 0) {
                if (state.products[productIndex].quantity <= 1) {
                    toast.info("Quantity is less than 1! 🛒", {transition:Zoom, style: { fontSize: '16px', } })
                } else {
                    state.products[productIndex].quantity -= 1;
                }
            }
        },

          removeProduct: (state, action) => {
            const {id} = action.payload;
            const initialLength = state.products.length;
            state.products = state.products.filter(product => product.id !== id);
            if(state.products.length < initialLength){
                 toast.success("Product removed from cart! 🗑️", {transition:Zoom,style: { fontSize: '16px' }});
            }
          }

    },
});

export const {
    addToProduct,
    incrementQuiantity,
    decrementQuiantity,
    removeProduct
} = cartSlice.actions;
export default cartSlice.reducer;
