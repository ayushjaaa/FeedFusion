import authReducer from '../features/auth/authSlice'
import {combineReducers} from 'redux'
import darklightmode from '../features/darklightmode/darkloight'
export const rootReducer = combineReducers({
    auth: authReducer,
darklimode:darklightmode
})
