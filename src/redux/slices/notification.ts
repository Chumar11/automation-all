import { createSlice } from "@reduxjs/toolkit";

// ----------------------------------------------------------------------
interface initialStateProps {
  // type error
  notifications: any;
}
const initialState: initialStateProps = {
  notifications: null,
};

// slice
const slice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotifications(state, action) {
      state.notifications = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { setNotifications } = slice.actions;

// ----------------------------------------------------------------------
