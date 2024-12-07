import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Department } from "~/lib/types";

export interface DepartmentsState {
  departments: Department[];
  loading: boolean;
  error: string | null;
}

const API_ENDPOINT = `${import.meta.env.VITE_API_URL}/modules`;
// Async thunk to add a department
export const addDepartment = createAsyncThunk(
  "departments/addDepartment",
  async (department: { name: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_ENDPOINT, department);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

// Async thunk to get departments
export const getDepartments = createAsyncThunk(
  "departments/getDepartments",
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

// Async thunk to update a department
export const updateDepartment = createAsyncThunk(
  "departments/updateDepartment",
  async (department: Department, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_ENDPOINT}/${department.id}`,
        department
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

// Async thunk to delete a department
export const deleteDepartment = createAsyncThunk(
  "departments/deleteDepartment",
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

// Create a slice for departments
const departmentsSlice = createSlice({
  name: "departments",
  initialState: {
    departments: [] as Department[],
    loading: false,
    error: null as string | null,
  } as DepartmentsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.departments.push(action.payload);
      })
      .addCase(addDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getDepartments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDepartments.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = action.payload;
      })
      .addCase(getDepartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDepartment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.departments.findIndex(
          (dept) => dept.id === action.payload.id
        );
        if (index !== -1) {
          state.departments[index] = action.payload;
        }
      })
      .addCase(updateDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(deleteDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = state.departments.filter(
          (dept) => dept.id !== action.payload
        );
      })
      .addCase(deleteDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default departmentsSlice.reducer;
