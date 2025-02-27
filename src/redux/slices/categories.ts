import { createSlice } from "@reduxjs/toolkit";

// ----------------------------------------------------------------------
interface initialStateProps {
  categories: null | any;
}

// initial state
const initialState: initialStateProps = {
  categories: null,
};

// slice
const slice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { setCategories } = slice.actions;

// ----------------------------------------------------------------------
