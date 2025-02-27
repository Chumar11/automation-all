import { createSlice } from "@reduxjs/toolkit";

// ----------------------------------------------------------------------
interface initialStateProps {
  currency: string;
  symbol: string;
  unitRate: null | number;
  themeMode: string;
  themeColor: string;
}

// initial state
const initialState: initialStateProps = {
  currency: "USD",
  symbol: "US$",
  unitRate: null,
  themeMode: "light",
  themeColor: "default",
};

// slice
const slice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setThemeMode(state, action) {
      state.themeMode = action.payload;
    },
    setThemeColor(state, action) {
      state.themeColor = action.payload;
    },
    setCurrency(state, action) {
      state.currency = action.payload.prefix;
      state.symbol = action.payload.symbol;
    },
    setUnitRate(state, action) {
      state.unitRate = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { setThemeMode, setThemeColor, setCurrency, setUnitRate } =
  slice.actions;

// ----------------------------------------------------------------------
