import React,{useState} from 'react'
import { Box,useMediaQuery } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import { flexGrow, width } from '@mui/system'

// import navbar im
const Layout = () => {
    const isNonMobile = useMediaQuery('(min-width:600px)')
    const [isSidebarOpen, setisSidebsarOpen] = useState(true)
  return (
<Box>
<Box sx={{width:"100%"}}>
<Sidebar  isNonMobile ={isNonMobile} drawerWidth="250px" isSidebarOpen={isSidebarOpen} setisSidebsarOpen={setisSidebsarOpen} >
    
</Sidebar>

<Box>
 <Navbar setisSidebsarOpen={setisSidebsarOpen}  isSidebarOpen={isSidebarOpen} sx={{flexGrow:1}}/>

 <Outlet/>
</Box>
   </Box>
</Box>
  )
}

export default Layout
