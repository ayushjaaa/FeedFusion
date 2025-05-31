import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { allpostgata } from './allpostSlice';
import {
    Box,
    Typography,
    Grid,
    Button,
    Card,
    CardContent,
    Avatar,
    Chip,
    IconButton,
    Stack,
    useTheme,
    Collapse,
  } from '@mui/material';
  import CustomButton from '../../components/components/CustomButton';
  import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
  import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
  import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
  import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
  import CardActions from '@mui/material/CardActions';
  import Flexbetween from '../../components/FlexBetween';
  import Header from '../../components/Header';
  import MonthBadge from '../../components/MonthBadge';


  const Posts = [
    {
      title: "AI Revolutionizes Newsrooms",
      category: "Tech News",
      author: "Jane Doe",
      date: "May 21, 2025",
      avatar: "https://i.pravatar.cc/150?img=1",
      excerpt: "Artificial Intelligence is transforming the way newsrooms work...",
      tags: ["AI", "Tech"],
      likes: 128,
      saves: 34,
      reports: 6,
      badge: "AI",
    },
    {
      title: "Elections: What Changed in 2025",
      category: "Global Politics",
      author: "John Smith",
      date: "May 18, 2025",
      avatar: "https://i.pravatar.cc/150?img=2",
      excerpt: "A deep dive into the election results and the impact...",
      tags: ["Elections", "Politics"],
      likes: 45,
      saves: 12,
      reports: 2,
      badge: "Politics",
    },
    {
      title: "Mental Health Awareness Month",
      category: "Health",
      author: "Emily Clark",
      date: "May 15, 2025",
      avatar: "https://i.pravatar.cc/150?img=3",
      excerpt: "Focusing on the importance of mental health...",
      tags: ["Health", "Awareness"],
      likes: 67,
      saves: 20,
      reports: 1,
      badge: "Wellness",
    },
  ];

const Post = ({title,category,author,date,avatar,excerpt,tags,likes,saves,reports,badge})=>{
 const theme = useTheme();
//  console.log(theme)
const [expanded, setexpanded] = useState(false)
// console.log(tags)
return(
    <Grid item xs={12} sm={6} md={4}>
    <Card sx={{ p: 2, borderRadius: 3,backgroundColor:theme.palette.background.default }}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={1} mb={1}>
          <Avatar src={avatar} alt={author} />
          <Box>
            <Typography fontWeight={600} color="primary">{category}</Typography>
            <Typography variant="body2" color="text.secondary">
              By {author} • {date}
            </Typography>
          </Box>
        </Stack>

        <Typography variant="h6" fontWeight={700} gutterBottom noWrap>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {excerpt}
        </Typography>

        <Stack direction="row" spacing={2} mt={2}>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <FavoriteBorderIcon fontSize="small" sx={{color:"#ff4d6c"}} />
            <Typography>{likes}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <BookmarkBorderIcon fontSize="small" sx={{color:"#ffffb3"}} />
            <Typography>{saves}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <FlagOutlinedIcon fontSize="small" sx={{color:"#b3b3ff"}} />
            <Typography>{reports}</Typography>
          </Stack>
        </Stack>

        <Stack direction="row" spacing={1} mt={2} mb={2} flexWrap="wrap">
          {tags.map((tag, i) => (
            <Chip key={i} label={tag} size="small" color="primary" variant="outlined" />
          ))}
        </Stack>

       <CardActions>
       <Button onClick={()=>setexpanded(!expanded)} startIcon={<CalendarMonthIcon />} variant="outlined" size="small">
       {expanded?"Hide":"Show"} Monthly Stats
          
        </Button>
       </CardActions>

       <Collapse in ={expanded}  timeout="auto"
        unmountOnExit sx={{color:theme.palette.secondary[400]}} >
<CardContent>
    <Typography>
        <Flexbetween sx={{gap:"1rem",width:"20rem"}}>
            <Header title={"Monthly Stats"} subtitle={"Montly Stats For The Same Intest"} />
            <CalendarMonthIcon></CalendarMonthIcon>
        </Flexbetween>
    </Typography>
    <Box sx={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"0.3rem"}}>



<MonthBadge month={"jan"} count={12}></MonthBadge>  
<MonthBadge month={"feb"} count={12}></MonthBadge>
<MonthBadge month={"mar"} count={12}></MonthBadge>
<MonthBadge month={"apr"} count={12}></MonthBadge>
<MonthBadge month={"may"} count={12}></MonthBadge>
<MonthBadge month={"jun"} count={12}></MonthBadge>
<MonthBadge month={"feb"} count={12}></MonthBadge>
<MonthBadge month={"feb"} count={12}></MonthBadge>


    </Box>
</CardContent>
       </Collapse>
      </CardContent>
    </Card>
  </Grid>
)
}

const Allposts = () => {
  const dispatch = useDispatch()
  const {role,token} = useSelector((state)=>state.counter.auth )
 const Token = token
 console.log(Token)
  const RoleInput = role
  useEffect(() => {
    if (!Token || !RoleInput) return;
  
    dispatch(allpostgata({ RoleInput, Token, url: "/superadmin/allpost" }))
      .unwrap()
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
        
      });
  }, [Token, RoleInput]);
  
  return (
    <div>
  <Box sx={{ p: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h5" fontWeight={700}>All News Posts</Typography>
        {/* <Button variant="contained" color="primary">+ Add New Post</Button> */}
        <CustomButton text={"add more"} role={"admin"} ></CustomButton>
      </Box>

      <Grid container spacing={3}>
     {Posts.map(({title,category,author,date,avatar,excerpt,tags,likes,saves,reports,badge}, idx)=>(
    <Post
    key={idx}
    title={title}
    category={category}
    author={author}
    date={date}
    avatar={avatar}
    excerpt={excerpt}
    tags={tags}
    likes={likes}
    saves={saves}
    reports={reports}
    badge={badge}
    />
     ))}
      </Grid>
    </Box>
    </div>
  )
}

export default Allposts
