import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/axiosInstance";

export const allpostgata = createAsyncThunk("allpost", async ({ RoleInput, Token, url }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(url, { role: 'admin' }, {
      headers: {
        Authorization: `Bearer ${Token}`,
      }
    });

    return response.data;
  } catch (error) {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axiosInstance.post("/api/auth/refresh-token");
        const newAccessToken = refreshResponse.data.accessToken;

        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        const retriedResponse = await axiosInstance(originalRequest);
        return retriedResponse.data;
      } catch (refreshError) {
        return rejectWithValue("Login failed");
      }
    }

    return rejectWithValue("Request failed");
  }
});

const initialState = {
  posts: [],
  loading: false,
  error: null
};

export const intialPostSlice = createSlice({
  name: "Allpostdatashow",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allpostgata.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allpostgata.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(allpostgata.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unknown error";
      });
  }
});
