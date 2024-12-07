import { configureStore } from "@reduxjs/toolkit";
import departmentSlice from "~/store/departmentSlice";
import { rtkQueryErrorLogger } from "./middleware";
import teacherSlice from "./teacherSlice";
import optionSlice from "./optionSlice";
import moduleSlice from "./moduleSlice";
// ...

export const store = configureStore({
  reducer: {
    departments: departmentSlice,
    teachers: teacherSlice,
    options: optionSlice,
    modules: moduleSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rtkQueryErrorLogger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
