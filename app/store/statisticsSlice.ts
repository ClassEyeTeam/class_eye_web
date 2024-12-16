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

// export const getAttendances = createAsyncThunk(
//   "attendances/getAttendances",
//   async (sessionId: number, { rejectWithValue, dispatch }) => {
//     try {
//       const response = await api.get<Attendance[]>(
//         `/attendances/session/${sessionId}`
//       );
//       dispatch(calculateStatistics(response.data));
//       return response.data;
//     } catch (error) {
//       if (isAxiosError(error)) return rejectWithValue(error.response?.data);
//       throw error;
//     }
//   }
// );

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    resetAttendances: (state) => {
      state.attendances = [];
      state.loading = false;
      state.error = null;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(getAttendances.pending, (state) => {
  //       state.loading = true;
  //     })
  //     .addCase(getAttendances.fulfilled, (state, action) => {
  //       state.attendances = action.payload;
  //       state.loading = false;
  //     })
  //     .addCase(getAttendances.rejected, (state, action) => {
  //       state.error = action.payload as string;
  //       state.loading = false;
  //     });
  // },
});

export const { resetAttendances } = attendanceSlice.actions;
export default attendanceSlice.reducer;
