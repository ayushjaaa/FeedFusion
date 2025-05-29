import { createSlice } from "@reduxjs/toolkit";
const initialState ={
    mode:"dark"
}
export const darklightSlice = createSlice({
    name:"global",
    initialState,
    reducers:{
        setMode:(state)=>{
            state.mode = state.mode === "light" ? "dark" : "light";
        }
    }
})

export const {setMode} = darklightSlice.actions;
export default darklightSlice.reducer;