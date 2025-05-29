import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../services/axiosInstance";

export const login = createAsyncThunk('auth/login',async({email,password,RoleInput,url},{rejectWithValue})=>{
    try{
        const response = await axiosInstance.post(url,{
            email:email,password:password,role:RoleInput
        })
      console.log(response)
        return response.data
        
    }catch(error){
        console.log(error)
        return rejectWithValue(error.response?.data?.message || "Login failed");
    }
})


export const register = createAsyncThunk('auth/register',async({username,email,password,RoleInput,url})=>{
try{
    
    const response = await axiosInstance.post(url,{
        username:username,email:email,password:password,role:RoleInput

    })
    console.log(response)
    return response.data
    

}catch(error){
    console.log("❌ Register Error:", error.response?.data);
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Registration failed");
}
})

const  initialState = {
    token: localStorage.getItem('token') ||  null,
    loading: false,
    error: null,
    role:null
}
export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(login.pending,(state)=>{
            state.loading = true
        })
        .addCase(login.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.loading = false
            state.token = action.payload.accessToken
            state.role = action.payload.role
            state.error = ''
            localStorage.setItem("token", action.payload.accessToken);
        })
        .addCase(login.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload || "somthing went wrong"
        })
    }
})
export default authSlice.reducer



