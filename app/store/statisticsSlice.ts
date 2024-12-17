import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import { endOfWeek, startOfWeek } from "date-fns";
import api from "~/lib/axios";
import { AttendanceStatistics, PresentDayDto } from "~/lib/types";

export interface StatisticsState {
  dateRange: [number, number];
  attendanceData: PresentDayDto[];
  statistics: AttendanceStatistics | null;
  loading: boolean;
  error: string | null;
}

// const initialDateRange: [Date, Date] = (() => {
//   const now = new Date();
//   return [startOfWeek(now), endOfWeek(now)];
// })();
const initialDateRange: [number, number] = (() => {
  const now = new Date();
  return [startOfWeek(now).getTime(), endOfWeek(now).getTime()];
})();
const initialState: StatisticsState = {
  dateRange: initialDateRange,
  attendanceData: [],
  statistics: null,
  loading: false,
  error: null,
};

const API_ENDPOINT = `${import.meta.env.VITE_API_URL_STUDENT}/dashboard`;

export const getStatistics = createAsyncThunk(
  "statistics/getStatistics",
  async (
    params: {
      studentId?: number;
      optionId?: number;
    },
    { getState, rejectWithValue }
  ) => {
    try {
      const queryParams = new URLSearchParams();
      const state = getState() as { statistics: StatisticsState };
      const { dateRange } = state.statistics;
      // Add optional parameters to the query string
      if (params.studentId)
        queryParams.append("studentId", params.studentId.toString());
      if (params.optionId)
        queryParams.append("optionId", params.optionId.toString());
      queryParams.append("startDate", new Date(dateRange[0]).toISOString());
      queryParams.append("endDate", new Date(dateRange[1]).toISOString());

      const response = await api.get(
        `${API_ENDPOINT}/statistics?${queryParams.toString()}`
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

const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    setDateRange(state, action: PayloadAction<[number, number]>) {
      state.dateRange = action.payload;
    },
  },

  extraReducers: (builder) => {
    // builder.addCase(getStatistics.fulfilled, (state, action) => {});
    builder.addCase(getStatistics.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      getStatistics.fulfilled,
      (state, action: PayloadAction<AttendanceStatistics>) => {
        state.statistics = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(getStatistics.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "An error occurred.";
    });
  },
});

// Export actions
export const { setDateRange } = statisticsSlice.actions;

// Export reducer
export default statisticsSlice.reducer;
