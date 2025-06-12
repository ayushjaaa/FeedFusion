import React, { act } from 'react'
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import {axiosInstance} from '../../services/axiosInstance'
import axios from 'axios'

export const submitPost = createAsyncThunk(
    'post/submitPost',
    async ({ url,Token, Postcontent }, { rejectWithValue }) => {
      console.log(url,Token,Postcontent)
      console.log(Postcontent)
      try {
        const response = await axiosInstance.post(
          url,
          Postcontent,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Token}`
            }
          }
        );
        console.log(response)
        return response.data;
      } catch (error) {
        console.log(error)
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
submitTrigger: false,
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
},
triggerSubmit: (state) => {
  console.log('triger chala')
  state.submitTrigger = true;
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
export const {intrestchange,updatePostField,addintrest,triggerSubmit} = PostFormSlice.actions;
export default PostFormSlice.reducer



export const PostTitle = (state) => state.counter.FormData.Postcontent.titel;
export const Postcontent = (state) => state.counter.FormData.Postcontent.content;
export const submitTrigger = (state) => state.counter.FormData.submitTrigger;
