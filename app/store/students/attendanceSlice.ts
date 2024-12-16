import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import api from "~/lib/axios";
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

const API_ENDPOINT = `${import.meta.env.VITE_API_URL_STUDENT}/attendances`;

export const getAttendances = createAsyncThunk(
  "attendances/getAttendances",
  async (sessionId: number, { rejectWithValue }) => {
    try {
      const response = await api.get<Attendance[]>(
        `${API_ENDPOINT}/session/${sessionId}`
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

export const updateAttendance = createAsyncThunk(
  "attendances/updateAttendance",
  async (
    { id, attendance }: { id: number; attendance: Partial<Attendance> },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put<Attendance>(
        `${API_ENDPOINT}/${id}`,
        attendance
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

export const deleteAttendance = createAsyncThunk(
  "attendances/deleteAttendance",
  async (id: number, { rejectWithValue }) => {
    try {
      await api.delete(`${API_ENDPOINT}/${id}`);
      return id;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

const attendanceSlice = createSlice({
  name: "attendances",
  initialState,
  reducers: {
    resetAttendances: (state) => {
      state.attendances = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Attendances
      .addCase(getAttendances.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAttendances.fulfilled,
        (state, action: PayloadAction<Attendance[]>) => {
          state.attendances = action.payload;
          state.loading = false;
        }
      )
      .addCase(getAttendances.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Attendance
      .addCase(updateAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateAttendance.fulfilled,
        (state, action: PayloadAction<Attendance>) => {
          const index = state.attendances.findIndex(
            (a) => a.id === action.payload.id
          );
          if (index !== -1) {
            state.attendances[index] = action.payload;
          }
          state.loading = false;
        }
      )
      .addCase(updateAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete Attendance
      .addCase(deleteAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteAttendance.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.attendances = state.attendances.filter(
            (a) => a.id !== action.payload
          );
          state.loading = false;
        }
      )
      .addCase(deleteAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default attendanceSlice.reducer;
export const { resetAttendances } = attendanceSlice.actions;
