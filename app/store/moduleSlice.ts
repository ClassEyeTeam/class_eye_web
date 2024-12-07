import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Module } from "~/lib/types";

export interface ModulesState {
  modules: Module[];
  loading: boolean;
  error: string | null;
}

const API_ENDPOINT = `${import.meta.env.VITE_API_URL}/modules`;
// Async thunk to get modules
export const getModules = createAsyncThunk(
  "modules/getModules",
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

// Async thunk to add a module
export const addModule = createAsyncThunk(
  "modules/addModule",
  async (module: Partial<Module>, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_ENDPOINT, module);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

// Async thunk to update a module
export const updateModule = createAsyncThunk(
  "modules/updateModule",
  async (updatedModule: Module, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_ENDPOINT}/${updatedModule.id}`,
        updatedModule
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

// Async thunk to delete a module
export const deleteModule = createAsyncThunk(
  "modules/deleteModule",
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

const modulesSlice = createSlice({
  name: "modules",
  initialState: {
    modules: [] as Module[],
    loading: false,
    error: null,
  } as ModulesState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getModules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getModules.fulfilled, (state, action) => {
        state.loading = false;
        state.modules = action.payload;
      })
      .addCase(getModules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addModule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addModule.fulfilled, (state, action) => {
        state.loading = false;
        state.modules.push(action.payload);
      })
      .addCase(addModule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateModule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateModule.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.modules.findIndex(
          (module) => module.id === action.payload.id
        );
        if (index !== -1) {
          state.modules[index] = action.payload;
        }
      })
      .addCase(updateModule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteModule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteModule.fulfilled, (state, action) => {
        state.loading = false;
        state.modules = state.modules.filter(
          (module) => module.id !== action.payload
        );
      })
      .addCase(deleteModule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default modulesSlice.reducer;
