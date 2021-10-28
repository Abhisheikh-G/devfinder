import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";

interface ProfileState {
  currentProfile?: Object | null;
  profiles?: Array<Object>;
  repos?: Array<Object>;
}

// Define the initial state using that type
const initialState: ProfileState = {
  currentProfile: null,
  profiles: [],
  repos: [],
};
export const alertSlice = createSlice({
  name: "alerts",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCurrentProfile: (state, action: PayloadAction<Object>) => {
      state.currentProfile = action.payload;
    },
    removeAlert: (state, action: PayloadAction<string>) => {},
  },
});

export const { setCurrentProfile, removeAlert } = alertSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCurrentProfile = (state: RootState) =>
  state.profile.currentProfile;

export default alertSlice.reducer;
