import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import alertReducer from "src/slices/alertSlice";
import authReducer from "src/slices/authSlice";

// import { composeWithDevTools } from "redux-devtools-extension";
// ...

const middleware = [thunk];
// const composedEnhancer = composeWithDevTools(applyMiddleware(thunk))

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
