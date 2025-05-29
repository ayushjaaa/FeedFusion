import authReducer from '../features/auth/authSlice'
import {combineReducers} from 'redux'
import darklightmode from '../features/darklightmode/darkloight'
import  PostFormReducer from '../features/Postform/PostFormSlice'
export const rootReducer = combineReducers({
    auth: authReducer,
darklimode:darklightmode,
FormData:PostFormReducer
})
