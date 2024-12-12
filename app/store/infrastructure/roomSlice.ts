import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Room, RoomRequest } from "~/lib/types";

export interface RoomsState {
  rooms: Room[];
  loading: boolean;
  error: string | null;
}

const API_ENDPOINT = `${import.meta.env.VITE_API_URL_CLASS}/rooms`;

export const fetchRooms = createAsyncThunk(
  "rooms/fetchRooms",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Room[]>(API_ENDPOINT);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

export const addRoom = createAsyncThunk(
  "rooms/addRoom",
  async (room: Omit<RoomRequest, "id">, { rejectWithValue }) => {
    try {
      const response = await axios.post<Room>(API_ENDPOINT, room);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

export const updateRoom = createAsyncThunk(
  "rooms/updateRoom",
  async (room: RoomRequest, { rejectWithValue }) => {
    try {
      const response = await axios.put<Room>(
        `${API_ENDPOINT}/${room.id}`,
        room
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

export const deleteRoom = createAsyncThunk(
  "rooms/deleteRoom",
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

const initialState: RoomsState = {
  rooms: [],
  loading: false,
  error: null,
};
const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Rooms
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Add Room
      .addCase(addRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms.push(action.payload);
      })
      .addCase(addRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Room
      .addCase(updateRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.rooms.findIndex(
          (room) => room.id === action.payload.id
        );
        if (index !== -1) {
          state.rooms[index] = action.payload;
        }
      })
      .addCase(updateRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete Room
      .addCase(deleteRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = state.rooms.filter((room) => room.id !== action.payload);
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export default roomsSlice.reducer;
