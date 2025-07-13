import { createSlice } from "@reduxjs/toolkit";
import { Zoom, toast } from 'react-toastify';

const cartSlice = createSlice({
    name: "productCart",
    initialState: {
        products: [],
        wishList: [],
    },
    reducers: {

        addToProduct: (state, action) => {
            // Defensive fallback for safety
            // if (!state.wishList) {
            //     state.wishList = [];
            // }
            const existingProductIndex = state.products.findIndex(
                product => product.id === action.payload.id
            );

            if (existingProductIndex >= 0) {
                toast.info("Already in cart! 🛒", { transition: Zoom, style: { fontSize: '16px', } });

            } else {
                state.products.push({ ...action.payload, quantity: action.payload.quantity });
                toast.success("Added to Crt! 🛒", { transition: Zoom, style: { fontSize: '16px', } });

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
                    toast.info("Quantity is less than 1! 🛒", { transition: Zoom, style: { fontSize: '16px', } })
                } else {
                    state.products[productIndex].quantity -= 1;
                }
            }
        },

        removeProduct: (state, action) => {
            const { id } = action.payload;
            const initialLength = state.products.length;
            state.products = state.products.filter(product => product.id !== id);
            if (state.products.length < initialLength) {
                toast.success("Product removed from cart! 🗑️", { transition: Zoom, style: { fontSize: '16px' } });
            }
        },

        //This is for WhishList

        addToWishList: (state, action) => {
            console.log(action.payload);

            const existingProductIndex = state.wishList.findIndex(
                product => product.id === action.payload.id
            );
            console.log(existingProductIndex);


            if (existingProductIndex >= 0) {
                toast.info("Already in WishList! 🛒", { transition: Zoom, style: { fontSize: '16px', } });

            } else {
                state.wishList.push({ ...action.payload, quantity: action.payload.quantity });
                toast.success("Added to WishList! 🛒", { transition: Zoom, style: { fontSize: '16px', } });

            }
        },


        RemoveWishList: (state, action) => {
            const { id } = action.payload;
            // console.log("removewishlist:",id);
            
            const initialLength = state.wishList.length;
            state.wishList = state.wishList.filter(product => product.id !== id);
            if (state.wishList.length < initialLength) {
                toast.success("Product removed from wishlist! 🗑️", { transition: Zoom, style: { fontSize: '16px' } });
            }
        },

    },
});

export const {
    addToProduct,
    incrementQuiantity,
    decrementQuiantity,
    removeProduct,
    addToWishList,
    RemoveWishList
} = cartSlice.actions;
export default cartSlice.reducer;
