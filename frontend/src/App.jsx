import React from 'react'
import LoginRoute from './routes/PublicRoute/authoritarianRoute/authroutes'
import { Link } from 'react-router-dom'
import { useMemo } from 'react'
// import AppRoutes from './routes/appRoutes.jsx/appRoutes'
//mui//
import { CssBaseline,ThemeProvider,createTheme} from '@mui/material'
// import createTheme from '@mui/material'
import { themeSettings } from '../theme'



// redux//

import { useSelector } from 'react-redux'

import AppRoutes from '../src/routes/AppRoutes/AppRoutes'
const App = () => {
  const {darklimode} = useSelector((state) => state.counter)
  // console.log(darklimode)
  const theme = useMemo(() => createTheme(themeSettings(darklimode.mode)), [darklimode.mode])
  // const theme = createTheme(themeSettings(mode))
  return (
    <div>


<ThemeProvider theme={theme}> 
  <CssBaseline/>
  {/* // rest all the css// */}
<AppRoutes/>
</ThemeProvider>

    </div>
  )
}

export default App
