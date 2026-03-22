/**eslint-disable */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const fetchSlider = createAsyncThunk(
  "users/fetchSlider",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/slider/fetchSlider");
      if (response.status === 404) {
        return rejectWithValue("Resource not found");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "An unexpected error occurred",
      );
    }
  },
);

export const addSlider = createAsyncThunk(
  "users/addSlider",
  async (newUser, { rejectWithValue }) => {
    try {
      const response = await api.post("/slider/addSlider", newUser, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const updateSlider = createAsyncThunk(
  "users/updateSlider",
  async (editDesignation, { rejectWithValue }) => {
    const { _id, ...userData } = editDesignation;
    try {
      const response = await api.put(`/slider/updateSlider/${_id}`, userData);
      if (response.status === 404) {
        return rejectWithValue("Resource not found");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "An unexpected error occurred",
      );
    }
  },
);

export const deleteSlider = createAsyncThunk(
  "users/deleteSlider",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/slider/deleteSlider/${id}`);
      if (response.status === 404) {
        return rejectWithValue("Resource not found");
      }
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "An unexpected error occurred",
      );
    }
  },
);

const sliderSlice = createSlice({
  name: "users",
  initialState: { users: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSlider.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSlider.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchSlider.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addSlider.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateSlider.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user._id === action.payload._id,
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteSlider.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      });
  },
});

export default sliderSlice.reducer;
