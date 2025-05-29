import React from 'react'
import { Button ,Box} from '@mui/material'
import Flexbetween from '../../components/FlexBetween'
import { useNavigate } from 'react-router-dom'

const CustomButton = ({ color, text,role }) => {
const navigate = useNavigate()
  return (
    <div>
  <Box sx={{gap:"1rem"}}>
  <Flexbetween sx={{gap:"2rem"}}>
     <Button variant="contained"   color={color} onClick={()=>console.log('add post')}>
        {text}
      </Button>
      {role === "admin"? <Button variant='contained' color={color} onClick={()=>navigate('/app/addpost')} >creat intrest</Button>:null}
     </Flexbetween>
  </Box>
    </div>
  )
}

export default CustomButton
