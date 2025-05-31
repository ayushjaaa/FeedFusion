 import React from 'react'
 import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
 import {axiosInstancePublic} from '../../services/axiosInstance'
import axios from 'axios'
 
 export const getuserdetails = createAsyncThunk('user/details',async({token,url},{rejectWithValue})=>{
  console.log(token)
  try{
const response = await axios.post("http://localhost:3000/user/getdetails",{},{
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
userdetails:{}
}
export const userdetailsSlice = createSlice({
  name:'userdetails',
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
    builder.addCase(getuserdetails.pending,(state)=>{
      state.lodrding = true
    })
  .addCase(getuserdetails.fulfilled,(state,action)=>{
    console.log(action.payload)
  })
  }
})