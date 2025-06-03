import React from 'react'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../services/axiosInstance'
import { refreshAccessToken } from "../../services/axiosInstance"
export const submitInterest = createAsyncThunk(
  'post/submitPost',
  async ({ url, Token, treeData }, { rejectWithValue }) => {

    // console.log(url)
    try {
      const response = await axiosInstance.post(
        url,
        treeData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Token}`
          }
        }
      );
      return response.data.message;

    } catch (error) {
      const originalRequest = error.config
      if (error?.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const newAccessToken = await refreshAccessToken()
          console.log(newAccessToken)
          axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
          const retryResponse = await axiosInstance(originalRequest)
          // console.log(retryResponse.data.message)
          return retryResponse.data.message;
        } catch (refreshError) {
          console.log(refreshError);
          return rejectWithValue("Session expired. Please log in again.");
        }
      }
      return rejectWithValue(error.response?.data || "An unexpected error occurred");
    }
  }
);

const initialState = {
  interests: null,
  loading: false,
  error: null,
}
export const IntrestSlice = createSlice({
  name: 'interestsCreated',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitInterest.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitInterest.fulfilled, (state, action) => {
        state.loading = false;
        state.interests = action.payload;
      })
      .addCase(submitInterest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
})

export default IntrestSlice.reducer