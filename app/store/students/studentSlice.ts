import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import api from "~/lib/axios";
import { Student } from "~/lib/types";

export interface StudentState {
  students: Student[];
  loading: boolean;
  error: string | null;
}

const initialState: StudentState = {
  students: [],
  loading: false,
  error: null,
};
const API_ENDPOINT = `${import.meta.env.VITE_API_URL_STUDENT}/students`;
// Async thunks for API calls
export const getStudents = createAsyncThunk(
  "students/getStudents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<Student[]>(API_ENDPOINT);
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

export const getStudentsByOptionId = createAsyncThunk(
  "students/getStudentsByOptionId",
  async (optionId: number, { rejectWithValue }) => {
    try {
      const response = await api.get<Student[]>(
        `${API_ENDPOINT}/option/${optionId}`
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

export const addStudent = createAsyncThunk(
  "students/addStudent",
  async (newStudent: Partial<Student>, { rejectWithValue }) => {
    try {
      const response = await api.post<Student>(API_ENDPOINT, newStudent);
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

export const updateStudent = createAsyncThunk(
  "students/updateStudent",
  async (updatedStudent: Student, { rejectWithValue }) => {
    try {
      const response = await api.put<Student>(
        `${API_ENDPOINT}/${updatedStudent.optionId}`,
        updatedStudent
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

export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (studentId: number, { rejectWithValue }) => {
    try {
      await api.delete(`${API_ENDPOINT}/${studentId}`);
      return studentId;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getStudents.fulfilled,
        (state, action: PayloadAction<Student[]>) => {
          state.students = action.payload;
          state.loading = false;
        }
      )
      .addCase(getStudents.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch students";
      })
      .addCase(getStudentsByOptionId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getStudentsByOptionId.fulfilled,
        (state, action: PayloadAction<Student[]>) => {
          state.students = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        getStudentsByOptionId.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload || "Failed to fetch students";
        }
      )
      .addCase(addStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addStudent.fulfilled,
        (state, action: PayloadAction<Student>) => {
          state.students.push(action.payload);
          state.loading = false;
        }
      )
      .addCase(addStudent.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Failed to add student";
      })
      .addCase(updateStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateStudent.fulfilled,
        (state, action: PayloadAction<Student>) => {
          const index = state.students.findIndex(
            (student) => student.optionId === action.payload.optionId
          );
          if (index !== -1) {
            state.students[index] = action.payload;
          }
          state.loading = false;
        }
      )
      .addCase(updateStudent.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Failed to update student";
      })
      .addCase(deleteStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteStudent.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.students = state.students.filter(
            (student) => student.optionId !== action.payload
          );
          state.loading = false;
        }
      )
      .addCase(deleteStudent.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete student";
      });
  },
});

export default studentSlice.reducer;
