import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import counterReducer from "src/reducers/counterSlice";
import alertReducer from "src/reducers/alertSlice";

// import { composeWithDevTools } from "redux-devtools-extension";
// ...

const middleware = [thunk];
// const composedEnhancer = composeWithDevTools(applyMiddleware(thunk))

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    alert: alertReducer,
  },
  middleware,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
