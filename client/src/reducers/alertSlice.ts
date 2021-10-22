import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import uuid from "uuid";

// Define a type for the slice state
interface Alert {
  id: string;
  msg: string;
  alertType: string;
}

interface AlertState {
  alert?: Array<Alert>;
}
// Define the initial state using that type
const initialState = [] as AlertState;

export const alertSlice = createSlice({
  name: "alert",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<Alert>) => {
      action.payload.id = uuid.v4();
      state.alert = [...state.alert!, action.payload];
    },
    removeAlert: (state, action: PayloadAction<string>) => {
      state.alert = state.alert?.filter((alert) => alert.id !== action.payload);
    },
  },
});

export const { setAlert, removeAlert } = alertSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAlerts = (state: RootState) => state.alert.alert;

export default alertSlice.reducer;
