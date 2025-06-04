import authReducer from '../features/auth/authSlice'
import {combineReducers} from 'redux'
import darklightmode from '../features/darklightmode/darkloight'
import  PostFormReducer from '../features/Postform/PostFormSlice'
import IntrestReducer from '../features/intrestbysuperadmin/Intrestbysuperadmin'
export const rootReducer = combineReducers({
    auth: authReducer,
darklimode:darklightmode,
FormData:PostFormReducer,
Intrest:IntrestReducer
})
