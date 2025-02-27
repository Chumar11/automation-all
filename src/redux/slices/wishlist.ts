import { createSlice } from "@reduxjs/toolkit";

// ----------------------------------------------------------------------
interface initialStateProps {
  // type error
  wishlist: any;
}
const initialState: initialStateProps = {
  wishlist: null,
};

const slice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setWishlist(state, action) {
      state.wishlist = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { setWishlist } = slice.actions;

// ----------------------------------------------------------------------
