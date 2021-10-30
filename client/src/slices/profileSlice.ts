import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { Profile } from "src/@types/index";

interface ProfileState {
  currentProfile?: Profile | null;
  profiles?: Array<Object>;
  repos?: Array<Object>;
}

// Define the initial state using that type
const initialState: ProfileState = {
  currentProfile: null,
  profiles: [],
  repos: [],
};
export const profileSlice = createSlice({
  name: "profile",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCurrentProfile: (state, action: PayloadAction<Profile>) => {
      state.currentProfile = action.payload;
    },
    removeCurrentProfile: (state) => {
      state.currentProfile = null;
    },
  },
});

export const { setCurrentProfile, removeCurrentProfile } = profileSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCurrentProfile = (state: RootState) =>
  state.profile.currentProfile;

export default profileSlice.reducer;
