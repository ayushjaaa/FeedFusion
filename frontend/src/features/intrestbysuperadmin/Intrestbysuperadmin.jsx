import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance, refreshAccessToken } from '../../services/axiosInstance';

export const fetchInterests = createAsyncThunk(
  'interests/fetch',
  async ({ url, Token }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`,
        },
      });
      return response.data;
    } catch (error) {
      const originalRequest = error.config;
      if (error?.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const newAccessToken = await refreshAccessToken();
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          const retryResponse = await axiosInstance(originalRequest);
          return retryResponse.data;
        } catch (refreshError) {
          return rejectWithValue('Session expired. Please log in again.');
        }
      }
      return rejectWithValue(error.response?.data || 'An unexpected error occurred');
    }
  }
);

export const submitInterest = createAsyncThunk(
  'interests/submit',
  async ({ url, Token, treeData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(url, treeData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`,
        },
      });
      return response.data.message;
    } catch (error) {
      const originalRequest = error.config;
      if (error?.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const newAccessToken = await refreshAccessToken();
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          const retryResponse = await axiosInstance(originalRequest);
          return retryResponse.data.message;
        } catch (refreshError) {
          return rejectWithValue('Session expired. Please log in again.');
        }
      }
      return rejectWithValue(error.response?.data || 'An unexpected error occurred');
    }
  }
);

const initialState = {
  fetchedInterests: {
    Interests: [],
    status: 'idle',
    fetchLoading: false,
    fetchError: null,
  },
  createInterest: {
    status: 'idle',
    successMessage: null,
    error: null,
    loading: false,
  },
};

const IntrestSlice = createSlice({
  name: 'interests',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInterests.pending, (state) => {
        state.fetchedInterests.fetchLoading = true;
        state.fetchedInterests.status = 'loading';
        state.fetchedInterests.fetchError = null;
      })
      .addCase(fetchInterests.fulfilled, (state, action) => {
        state.fetchedInterests.fetchLoading = false;
        state.fetchedInterests.status = 'succeeded';
        state.fetchedInterests.Interests = action.payload;
      })
      .addCase(fetchInterests.rejected, (state, action) => {
        state.fetchedInterests.fetchLoading = false;
        state.fetchedInterests.status = 'failed';
        state.fetchedInterests.fetchError = action.payload || action.error.message;
      })
      .addCase(submitInterest.pending, (state) => {
        state.createInterest.loading = true;
        state.createInterest.status = 'loading';
        state.createInterest.error = null;
        state.createInterest.successMessage = null;
      })
      .addCase(submitInterest.fulfilled, (state, action) => {
        state.createInterest.loading = false;
        state.createInterest.status = 'succeeded';
        state.createInterest.successMessage = action.payload;
      })
      .addCase(submitInterest.rejected, (state, action) => {
        state.createInterest.loading = false;
        state.createInterest.status = 'failed';
        state.createInterest.error = action.payload || action.error.message;
      });
  },
});

export default IntrestSlice.reducer;
