import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
const initialState = {
    step:1,
    formData:{
        image:"",
        description:""
    },
    intrest:null
    
}
export const PostSlice = ({
name:"postsetform",
reducer:{
    nextStep:(state) =>{state.step += 1},
    prevStep:(state)=>{state.state -= 1},
    updateform:(state,action) =>{
console.log(action)
    }
}

})