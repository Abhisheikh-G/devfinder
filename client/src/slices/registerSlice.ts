import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";

// Define a type for the slice state
interface AuthState {
  token: string | null | undefined;
  isAuthenticated?: boolean | null;
  user?: null | any;
}

// Define the initial state using that type
const initialState: AuthState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  user: null,
};

export const registerSlice = createSlice({
  name: "register",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<string>) => {
      localStorage.setItem("token", action.payload);
      state.token = action.payload;
      state.isAuthenticated = true;
    },
  },
});

export const { registerUser } = registerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectToken = (state: RootState) => state.register.token;

export default registerSlice.reducer;
