import { createSlice } from "@reduxjs/toolkit";
import { Attendance } from "~/lib/types";

export interface AttendanceState {
  attendances: Attendance[];
  loading: boolean;
  error: string | null;
}

const initialState: AttendanceState = {
  attendances: [],
  loading: false,
  error: null,
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {},
});

export default attendanceSlice.reducer;
