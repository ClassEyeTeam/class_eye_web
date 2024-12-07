import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Option, OptionRequest } from "~/lib/types";

export interface OptionsState {
  options: Option[];
  loading: boolean;
  error: string | null;
}

const API_ENDPOINT = `${import.meta.env.VITE_API_URL}/options`;

// Async thunk to get options
export const getOptions = createAsyncThunk(
  "options/getOptions",
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

// Async thunk to add an option
export const addOption = createAsyncThunk(
  "options/addOption",
  async (option: Partial<Option>, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_ENDPOINT, option);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

// Async thunk to update an option
export const updateOption = createAsyncThunk(
  "options/updateOption",
  async (updatedOption: OptionRequest, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_ENDPOINT}/${updatedOption.id}`,
        updatedOption
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

// Async thunk to delete an option
export const deleteOption = createAsyncThunk(
  "options/deleteOption",
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

const optionsSlice = createSlice({
  name: "options",
  initialState: {
    options: [] as Option[],
    loading: false,
    error: null,
  } as OptionsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOptions.fulfilled, (state, action) => {
        state.loading = false;
        state.options = action.payload;
      })
      .addCase(getOptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addOption.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addOption.fulfilled, (state, action) => {
        state.loading = false;
        state.options.push(action.payload);
      })
      .addCase(addOption.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateOption.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOption.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.options.findIndex(
          (option) => option.id === action.payload.id
        );
        if (index !== -1) {
          state.options[index] = action.payload;
        }
      })
      .addCase(updateOption.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteOption.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOption.fulfilled, (state, action) => {
        state.loading = false;
        state.options = state.options.filter(
          (option) => option.id !== action.payload
        );
      })
      .addCase(deleteOption.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default optionsSlice.reducer;
