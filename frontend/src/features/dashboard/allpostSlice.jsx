import React from "react";
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

export const allpostgata = createAsyncThunk("allpost",async({RoleInput,Token,url},{rejectWithValue})=>{
    try{
        console.log(Token)
const response = await axiosInstance.post(url,{role:'admin'},{
    headers: {
        Authorization: `Bearer ${Token}`,
      }
})
console.log(response)
return response
    }catch(error){
console.log(error)
return rejectWithValue("loginfeild")
    }
})

const initialState ={
    posts: [],        // Array of objects from backend
  loading: false,   // For loading spinner
  error: null       // For error handling
}
export const intialPostSlice = createSlice({
    name:"Allpostdatashow",
    initialState,
    reducers:{
    },
    extraReducers:(builder)=>{
        builder
        .addCase(allpostgata.pending,(state)=>{
            state.loading = true
        })
        .addCase(allpostgata.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.loading = false
            state.role = action.payload.role
        })
    }
})