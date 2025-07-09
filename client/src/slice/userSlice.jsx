import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuth: false,
};

export const userSlice = createSlice({
    name: "loginUser",
    initialState,
    reducers: {
        saveUser: (state, action) => {
            state.user = action.payload;
            state.isAuth = true;
            console.log("saveUser click");
            
        },
        removeUser: (state, action) => {
            state.user = null;
            state.isAuth = false;
            console.log("removeUser Click");
            
        },
    },
});

// Action creators are generated for each case reducer function
export const { saveUser, removeUser } = userSlice.actions;

export default userSlice.reducer;