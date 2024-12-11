import { configureStore } from "@reduxjs/toolkit";
import departmentSlice from "~/store/departmentSlice";
import blockSlice from "./infrastructure/blockSlice";
import roomsSlice from "./infrastructure/roomSlice";
import { rtkQueryErrorLogger } from "./middleware";
import moduleOptionSlice from "./moduleOptionSlice";
import moduleSlice from "./moduleSlice";
import optionSlice from "./optionSlice";
import studentSlice from "./students/studentSlice";
import teacherSlice from "./teacherSlice";
// ...

export const store = configureStore({
  reducer: {
    departments: departmentSlice,
    teachers: teacherSlice,
    options: optionSlice,
    modules: moduleSlice,
    moduleOption: moduleOptionSlice,
    students: studentSlice,
    blocks: blockSlice,
    rooms: roomsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rtkQueryErrorLogger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
