import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  useInfo: {},
  isUserLoggedIn: false,
  cartItems: [],
  reportData: {},
};

const infoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.useInfo = action.payload;
    },
    setLoginStatus: (state, action) => {
      state.isUserLoggedIn = action.payload;
    },
    //cart-market-place
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.cartItems.find((i) => i.name === item.name);

      if (existing) {
        existing.quantity += item.quantity;
      } else {
        state.cartItems.push(item);
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.name !== action.payload
      );
    },

    addReportData: (state, action) => {
      state.reportData = action.payload;
    },
  },
});

export const {
  setUserInfo,
  setLoginStatus,
  addToCart,
  removeFromCart,
  addReportData,
} = infoSlice.actions;

export default infoSlice.reducer;
