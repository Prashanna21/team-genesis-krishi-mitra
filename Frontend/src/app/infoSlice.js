import { createSlice, nanoid } from "@reduxjs/toolkit";


const initialState = {
    useInfo : {

    },

    isUserLoggedIn: false,


}

 const infoSlice = createSlice({
    name: 'info',
    initialState,
    reducers : {
        setUserInfo: (state, action) => {
            state.useInfo = action.payload;

        },

        setLoginStatus: (state, action) => {
            state.isUserLoggedIn = action.payload;
        },



    }
})

export const { setUserInfo, setLoginStatus } = infoSlice.actions

export default infoSlice.reducer