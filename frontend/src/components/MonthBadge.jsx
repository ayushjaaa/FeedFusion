// import { useTheme } from "@mui/material/styles";
import {
    Box,
    Typography,
    useTheme,
  } from '@mui/material';
import Flexbetween from "../components/FlexBetween";


const MonthBadge = ({ month, count }) => {
  const theme = useTheme();
  const color = theme.palette.monthlyBadge[month];
  console.log(color)
  return (
    // <Box
    //   sx={{
    //     backgroundColor: color.bg,
    //     color: color.text,
    //     px: 2,
    //     py: 1,
    //     borderRadius: "999px",
    //     fontWeight: "bold",
    //     width: 32,
    //     height: 32,
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    //   }}
    // >
    //   {count}
    // </Box>
    <Box sx={{backgroundColor:color.bg,border:"1px solid white" ,borderRadius:"40px",textAlign:"center",m:"2px",p:"0.0.3rem "}}>
<Flexbetween >
<Typography sx={{color:color.text}}>{month}</Typography>
<Typography sx={{color:color.text,backgroundColor:color.bg2,borderRadius:"100%",textAlign:"center",p:"0.02rem 0.3rem"}}>{count}</Typography>
</Flexbetween>
</Box>
  );
};
export default MonthBadge;
