import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { OptionModuleTeacher, OptionModuleTeacherRequest } from "~/lib/types";

export interface OptionModuleTeachersState {
  optionModuleTeachers: OptionModuleTeacher[];
  loading: boolean;
  error: string | null;
}

const API_ENDPOINT = `${import.meta.env.VITE_API_URL}/module-options`;

// Async thunk to get optionModuleTeachers
export const getOptionModuleTeachers = createAsyncThunk(
  "optionModuleTeachers/getOptionModuleTeachers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_ENDPOINT);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

// Async thunk to add an optionModuleTeacher
export const addOptionModuleTeacher = createAsyncThunk(
  "optionModuleTeachers/addOptionModuleTeacher",
  async (
    optionModuleTeacher: Partial<OptionModuleTeacherRequest>,
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(API_ENDPOINT, optionModuleTeacher);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

// Async thunk to update an optionModuleTeacher
export const updateOptionModuleTeacher = createAsyncThunk(
  "optionModuleTeachers/updateOptionModuleTeacher",
  async (
    updatedOptionModuleTeacher: OptionModuleTeacherRequest,
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${API_ENDPOINT}/${updatedOptionModuleTeacher.id}`,
        updatedOptionModuleTeacher
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

// Async thunk to delete an optionModuleTeacher
export const deleteOptionModuleTeacher = createAsyncThunk(
  "optionModuleTeachers/deleteOptionModuleTeacher",
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_ENDPOINT}/${id}`);
      return id;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

const optionModuleTeachersSlice = createSlice({
  name: "optionModuleTeachers",
  initialState: {
    optionModuleTeachers: [] as OptionModuleTeacher[],
    loading: false,
    error: null,
  } as OptionModuleTeachersState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOptionModuleTeachers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOptionModuleTeachers.fulfilled, (state, action) => {
        state.loading = false;
        state.optionModuleTeachers = action.payload;
      })
      .addCase(getOptionModuleTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addOptionModuleTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addOptionModuleTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.optionModuleTeachers.push(action.payload);
      })
      .addCase(addOptionModuleTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateOptionModuleTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOptionModuleTeacher.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.optionModuleTeachers.findIndex(
          (optionModuleTeacher) => optionModuleTeacher.id === action.payload.id
        );
        if (index !== -1) {
          state.optionModuleTeachers[index] = action.payload;
        }
      })
      .addCase(updateOptionModuleTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteOptionModuleTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOptionModuleTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.optionModuleTeachers = state.optionModuleTeachers.filter(
          (optionModuleTeacher) => optionModuleTeacher.id !== action.payload
        );
      })
      .addCase(deleteOptionModuleTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default optionModuleTeachersSlice.reducer;
