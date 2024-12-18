import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import api from "~/lib/axios";
import { Block } from "~/lib/types";

export interface BlocksState {
  blocks: Block[];
  loading: boolean;
  error: string | null;
}

const API_ENDPOINT = `${import.meta.env.VITE_API_URL_CLASS}/blocks`;

export const fetchBlocks = createAsyncThunk(
  "blocks/fetchBlocks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<Block[]>(API_ENDPOINT);
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

export const addBlock = createAsyncThunk(
  "blocks/addBlock",
  async (block: Partial<Block>, { rejectWithValue }) => {
    try {
      const response = await api.post<Block>(API_ENDPOINT, block);
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

export const updateBlock = createAsyncThunk(
  "blocks/updateBlock",
  async (block: Block, { rejectWithValue }) => {
    try {
      const response = await api.put<Block>(
        `${API_ENDPOINT}/${block.id}`,
        block
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

export const deleteBlock = createAsyncThunk(
  "blocks/deleteBlock",
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

const blockSlice = createSlice({
  name: "blocks",
  initialState: {
    blocks: [] as Block[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlocks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlocks.fulfilled, (state, action) => {
        state.loading = false;
        state.blocks = action.payload;
      })
      .addCase(fetchBlocks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(addBlock.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBlock.fulfilled, (state, action) => {
        state.loading = false;
        state.blocks.push(action.payload);
      })
      .addCase(addBlock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateBlock.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBlock.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.blocks.findIndex(
          (block) => block.id === action.payload.id
        );
        if (index !== -1) {
          state.blocks[index] = action.payload;
        }
      })
      .addCase(updateBlock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(deleteBlock.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBlock.fulfilled, (state, action) => {
        state.loading = false;
        state.blocks = state.blocks.filter(
          (block) => block.id !== action.payload
        );
      })
      .addCase(deleteBlock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default blockSlice.reducer;
