import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { Profile } from "src/@types/index";

interface ProfileState {
  currentProfile?: Profile | null;
  profiles?: Array<Profile>;
  repos?: Array<any>;
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
    setProfiles: (state, action: PayloadAction<Profile[]>) => {
      state.profiles = action.payload;
    },
    setRepos: (state, action: PayloadAction<any[]>) => {
      state.repos = action.payload;
    },
    removeCurrentProfile: (state) => {
      state.currentProfile = null;
    },
  },
});

export const {
  setCurrentProfile,
  removeCurrentProfile,
  setProfiles,
  setRepos,
} = profileSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCurrentProfile = (state: RootState) =>
  state.profile.currentProfile;

export const selectRepos = (state: RootState) => state.profile.repos;

export const selectProfiles = (state: RootState) => state.profile.profiles;

export default profileSlice.reducer;
