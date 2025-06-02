import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/axiosInstance";
import { refreshAccessToken } from "../../services/axiosInstance";

export const allpostgata = createAsyncThunk(
  "allpost",
  async ({ RoleInput, Token, url }, { rejectWithValue }) => {
    try {
      // console.log(Token)
      const response = await axiosInstance.post(
        url,
        { role: "admin" },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      // console.log(error)
      // console.log('status',error.response.status)
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest.__retry) {
        originalRequest.__retry = true;
        try {
          const newAccessToken = await refreshAccessToken();
          console.log(newAccessToken);
          
          axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          const retryResponse = await axiosInstance(originalRequest);
          console.log(retryResponse.data.data)
          return retryResponse.data.data;
        } catch (refreshError) {
          console.log(refreshError);
          return rejectWithValue("Session expired. Please log in again.");
        }
      }
      return rejectWithValue("loginfeild");
    }
  }
);

const initialState = {
  posts: [], // Array of objec ts from backend
  loading: false, // For loading spinner
  error: null, // For error handling
};
export const intialPostSlice = createSlice({
  name: "Allpostdatashow",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allpostgata.pending, (state) => {
        state.loading = true;
      })
      .addCase(allpostgata.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.role = action.payload.role;
      });
  },
});
