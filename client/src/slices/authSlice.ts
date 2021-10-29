import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";

// Define a type for the slice state
interface AuthState {
  token?: string | null | undefined;
  isAuthenticated?: boolean;
  user?: null | any;
}

// Define the initial state using that type
const initialState: AuthState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<string>) => {
      localStorage.setItem("token", action.payload);
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    loadUser: (state, action: PayloadAction<Object>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    signUserIn: (state, action: PayloadAction<string>) => {
      localStorage.setItem("token", action.payload);
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    signUserOut: (state) => {
      localStorage.removeItem("token");
      state.token = "";
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { registerUser, loadUser, signUserIn, signUserOut } =
  authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectToken = (state: RootState) => state.auth.token;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
