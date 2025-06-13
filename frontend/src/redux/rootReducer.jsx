import authReducer from '../features/auth/authSlice'
import {combineReducers} from 'redux'
import darklightmode from '../features/darklightmode/darkloight'
import  PostFormReducer from '../features/Postform/PostFormSlice'
import IntrestReducer from '../features/intrestbysuperadmin/Intrestbysuperadmin'
import allposts from '../features/dashboard/allpostSlice'
export const rootReducer = combineReducers({
    auth: authReducer,
darklimode:darklightmode,
FormData:PostFormReducer,
Intrest:IntrestReducer,
AllPost:allposts
})
