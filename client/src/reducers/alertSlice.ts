import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { v4 as uuid } from "uuid";

// Define a type for the slice state
interface Alert {
  id?: string;
  msg?: string;
  alertType?: string;
}
interface AlertState {
  alerts: Alert[];
}

// Define the initial state using that type
const initialState: AlertState = {
  alerts: [],
};
export const alertSlice = createSlice({
  name: "alerts",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<Alert>) => {
      action.payload.id = uuid();
      state.alerts = [...state.alerts, action.payload];
    },
    removeAlert: (state, action: PayloadAction<string>) => {
      state.alerts = state.alerts?.filter(
        (alert: Alert) => alert.id !== action.payload
      );
    },
  },
});

export const { setAlert, removeAlert } = alertSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAlerts = (state: RootState) => state.alert.alerts;

export default alertSlice.reducer;
