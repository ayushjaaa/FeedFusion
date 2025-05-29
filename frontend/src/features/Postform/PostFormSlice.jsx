import React from 'react'
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../services/axiosInstance'
import axios from 'axios'

export const submitPost = createAsyncThunk('user/details',async({token,url},{rejectWithValue})=>{
 console.log(token)
 try{
const response = await axios.post("http://localhost:3000/user/post",{},{
 headers: {
   "Content-Type": "application/json",
   Authorization: `Bearer ${token}`,
 },
})
console.log(response)
 }catch(error){
   console.log(error)
 }
})

const initialState = {
Postcontent:{
  titel:"",
  content:"",
  interests:""
},
intrestSumit:false
}
export const PostFormSlice = createSlice({
 name:'userdetails',
 initialState,
 reducers:{
intrestchange:(state) =>{
    state.intrestSumit = !state.intrestSumit
}
 },
//  extraReducers:(builder)=>{
//    builder.addCase(getuserdetails.pending,(state)=>{
//      state.lodrding = true
//    })
//  .addCase(getuserdetails.fulfilled,(state,action)=>{
//    console.log(action.payload)
//  })
//  }
})
export const {intrestchange} = PostFormSlice.actions;
export default PostFormSlice.reducer