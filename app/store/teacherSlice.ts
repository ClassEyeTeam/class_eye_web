import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Teacher, TeacherRequest } from "~/lib/types";

export interface TeachersState {
  teachers: Teacher[];
  loading: boolean;
  error: string | null;
}

const API_ENDPOINT = `${import.meta.env.VITE_API_URL_UNIVERSITY}/teachers`;

// Async thunk to get teachers
export const getTeachers = createAsyncThunk(
  "teachers/getTeachers",
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

// Async thunk to add a teacher
export const addTeacher = createAsyncThunk(
  "teachers/addTeacher",
  async (teacher: Partial<Teacher>, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_ENDPOINT, teacher);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

// Async thunk to update a teacher
export const updateTeacher = createAsyncThunk(
  "teachers/updateTeacher",
  async (updatedTeacher: TeacherRequest, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_ENDPOINT}/${updatedTeacher.id}`,
        updatedTeacher
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

// Async thunk to delete a teacher
export const deleteTeacher = createAsyncThunk(
  "teachers/deleteTeacher",
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

const teachersSlice = createSlice({
  name: "teachers",
  initialState: {
    teachers: [] as Teacher[],
    loading: false,
    error: null,
  } as TeachersState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTeachers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeachers.fulfilled, (state, action) => {
        state.loading = false;
        state.teachers = action.payload;
      })
      .addCase(getTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.teachers.push(action.payload);
      })
      .addCase(addTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTeacher.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.teachers.findIndex(
          (teacher) => teacher.id === action.payload.id
        );
        if (index !== -1) {
          state.teachers[index] = action.payload;
        }
      })
      .addCase(updateTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.teachers = state.teachers.filter(
          (teacher) => teacher.id !== action.payload
        );
      })
      .addCase(deleteTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default teachersSlice.reducer;
