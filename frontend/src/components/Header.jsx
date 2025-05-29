import { useTheme } from '@emotion/react'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const Header = ({title,subtitle}) => {
   const theme =  useTheme()
  return (
    <div>
      <Box>
        <Typography variant='h2' color={theme.palette.secondary[100]} fontWeight="bold" sx={{mb:"5px"}}>
{title}
        </Typography>
        <Typography variant='h5' color={theme.palette.secondary[3000]}>
{subtitle}
        </Typography>
      </Box>
    </div>
  )
}

export default Header
