import { AttendanceData, generateMockData } from "@/lib/mockData";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import { endOfWeek, startOfWeek } from "date-fns";
import api from "~/lib/axios";
import { AttendanceStatistics } from "~/lib/types";

export interface StatisticsState {
  dateRange: [Date, Date];
  attendanceData: AttendanceData[];
  statistics: AttendanceStatistics | null;
  loading: boolean;
  error: string | null;
}

const initialDateRange: [Date, Date] = (() => {
  const now = new Date();
  return [startOfWeek(now), endOfWeek(now)];
})();

const initialState: StatisticsState = {
  dateRange: initialDateRange,
  attendanceData: generateMockData(initialDateRange[0], initialDateRange[1]),
  statistics: null,
  loading: false,
  error: null,
};

const API_ENDPOINT = `${import.meta.env.VITE_API_URL_STUDENT}/dashboard`;

export const getStatistics = createAsyncThunk(
  "statistics/getStatistics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_ENDPOINT}/statistics`);
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
    setDateRange(state, action: PayloadAction<[Date, Date]>) {
      state.dateRange = action.payload;
      state.attendanceData = generateMockData(
        action.payload[0],
        action.payload[1]
      );
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
        console.log(action.payload);
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
