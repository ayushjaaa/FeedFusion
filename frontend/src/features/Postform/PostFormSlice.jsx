import React, { act } from 'react'
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import {axiosInstance} from '../../services/axiosInstance'
import axios from 'axios'

export const submitPost = createAsyncThunk(
    'post/submitPost',
    async ({ url,token, postData }, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post(
          url,
          postData,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
const initialState = {
Postcontent:{
  titel:"",
  content:"",
  interests:[]
},
intrestSumit:false,
lodrding:false,
error: null
}
export const PostFormSlice = createSlice({
 name:'userdetails',
 initialState,
 reducers:{
    formdata:(state)=>{
state.Postcontent
    },
intrestchange:(state) =>{
    state.intrestSumit = !state.intrestSumit
},
updatePostField:(state,action)=>{
    const {field,value} = action.payload
    state.Postcontent[field] = value;
     },
addintrest:(state,action)=>{
   const incoming =  action.payload;
   const current = state.Postcontent.interests;
   const unique = incoming.filter((item)=>!current.includes(item))
   state.Postcontent.interests.push(...unique);
}

 },

 extraReducers:(builder)=>{
    builder
    .addCase(submitPost.pending, (state) => {
      state.loading = true;
    })
    .addCase(submitPost.fulfilled, (state, action) => {
      state.loading = false;
      state.intrestSumit = true;
    })
    .addCase(submitPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
 }
})
export const {intrestchange,updatePostField,addintrest} = PostFormSlice.actions;
export default PostFormSlice.reducer