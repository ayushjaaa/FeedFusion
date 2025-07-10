// import React, { useEffect, useState } from 'react'
// import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
// import { allpostgata } from './allpostSlice';
// import {
//     Box,
//     Typography,
//     Grid,
//     Button,
//     Card,
//     CardContent,
//     Avatar,
//     Chip,
//     IconButton,
//     Stack,
//     useTheme,
//     Collapse,
//   } from '@mui/material';
//   import CustomButton from '../../components/components/CustomButton';
//   import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
//   import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
//   import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
//   import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
//   import CardActions from '@mui/material/CardActions';
//   import Flexbetween from '../../components/FlexBetween';
//   import Header from '../../components/Header';
//   import MonthBadge from '../../components/MonthBadge';


//   const Posts = [
//     {
//       title: "AI Revolutionizes Newsrooms",
//       category: "Tech News",
//       author: "Jane Doe",
//       date: "May 21, 2025",
//       avatar: "https://i.pravatar.cc/150?img=1",
//       excerpt: "Artificial Intelligence is transforming the way newsrooms work...",
//       tags: ["AI", "Tech"],
//       likes: 128,
//       saves: 34,
//       reports: 6,
//       badge: "AI",
//     },
//     {
//       title: "Elections: What Changed in 2025",
//       category: "Global Politics",
//       author: "John Smith",
//       date: "May 18, 2025",
//       avatar: "https://i.pravatar.cc/150?img=2",
//       excerpt: "A deep dive into the election results and the impact...",
//       tags: ["Elections", "Politics"],
//       likes: 45,
//       saves: 12,
//       reports: 2,
//       badge: "Politics",
//     },
//     {
//       title: "Mental Health Awareness Month",
//       category: "Health",
//       author: "Emily Clark",
//       date: "May 15, 2025",
//       avatar: "https://i.pravatar.cc/150?img=3",
//       excerpt: "Focusing on the importance of mental health...",
//       tags: ["Health", "Awareness"],
//       likes: 67,
//       saves: 20,
//       reports: 1,
//       badge: "Wellness",
//     },
//   ];

// const Post = ({title,category,author,date,avatar,excerpt,tags,likes,saves,reports,badge})=>{
//  const theme = useTheme();
// //  console.log(theme)
// const [expanded, setexpanded] = useState(false)
// // console.log(tags)
// return(
//     <Grid item xs={12} sm={6} md={4}>
//     <Card sx={{ p: 2, borderRadius: 3,backgroundColor:theme.palette.background.default }}>
//       <CardContent>
//         <Stack direction="row" alignItems="center" spacing={1} mb={1}>
//           <Avatar src={avatar} alt={author} />
//           <Box>
//             <Typography fontWeight={600} color="primary">{category}</Typography>
//             <Typography variant="body2" color="text.secondary">
//               By {author} • {date}
//             </Typography>
//           </Box>
//         </Stack>

//         <Typography variant="h6" fontWeight={700} gutterBottom noWrap>
//           {title}
//         </Typography>
//         <Typography variant="body2" color="text.secondary" gutterBottom>
//           {excerpt}
//         </Typography>

//         <Stack direction="row" spacing={2} mt={2}>
//           <Stack direction="row" alignItems="center" spacing={0.5}>
//             <FavoriteBorderIcon fontSize="small" sx={{color:"#ff4d6c"}} />
//             <Typography>{likes}</Typography>
//           </Stack>
//           <Stack direction="row" alignItems="center" spacing={0.5}>
//             <BookmarkBorderIcon fontSize="small" sx={{color:"#ffffb3"}} />
//             <Typography>{saves}</Typography>
//           </Stack>
//           <Stack direction="row" alignItems="center" spacing={0.5}>
//             <FlagOutlinedIcon fontSize="small" sx={{color:"#b3b3ff"}} />
//             <Typography>{reports}</Typography>
//           </Stack>
//         </Stack>

//         <Stack direction="row" spacing={1} mt={2} mb={2} flexWrap="wrap">
//           {tags.map((tag, i) => (
//             <Chip key={i} label={tag} size="small" color="primary" variant="outlined" />
//           ))}
//         </Stack>

//        <CardActions>
//        <Button onClick={()=>setexpanded(!expanded)} startIcon={<CalendarMonthIcon />} variant="outlined" size="small">
//        {expanded?"Hide":"Show"} Monthly Stats

//         </Button>
//        </CardActions>

//        <Collapse in ={expanded}  timeout="auto"
//         unmountOnExit sx={{color:theme.palette.secondary[400]}} >
// <CardContent>
//     <Typography>
//         <Flexbetween sx={{gap:"1rem",width:"20rem"}}>
//             <Header title={"Monthly Stats"} subtitle={"Montly Stats For The Same Intest"} />
//             <CalendarMonthIcon></CalendarMonthIcon>
//         </Flexbetween>
//     </Typography>
//     <Box sx={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"0.3rem"}}>



// <MonthBadge month={"jan"} count={12}></MonthBadge>  
// <MonthBadge month={"feb"} count={12}></MonthBadge>
// <MonthBadge month={"mar"} count={12}></MonthBadge>
// <MonthBadge month={"apr"} count={12}></MonthBadge>
// <MonthBadge month={"may"} count={12}></MonthBadge>
// <MonthBadge month={"jun"} count={12}></MonthBadge>
// <MonthBadge month={"feb"} count={12}></MonthBadge>
// <MonthBadge month={"feb"} count={12}></MonthBadge>


//     </Box>
// </CardContent>
//        </Collapse>
//       </CardContent>
//     </Card>
//   </Grid>
// )
// }

// const Allposts = () => {
//   const dispatch = useDispatch()
//   const {role,token} = useSelector((state)=>state.counter.auth )
//   const [allpost, setallpost] = useState(null)
//  const Token = token
//  console.log(Token)
//   const RoleInput = role
//   useEffect(() => {
//     if (!Token || !RoleInput) return;

//     dispatch(allpostgata({ RoleInput, Token, url: "/superadmin/allpost" }))
//       .unwrap()
//       .then((result) => {
//         console.log("Success:", result);
//         setallpost(result)

//       })
//       .catch((error) => {
//         console.error("Error:", error);

//       });
//   }, [Token, RoleInput]);

//   return (
//     <div>
//   <Box sx={{ p: 4 }}>
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
//         <Typography variant="h5" fontWeight={700}>All News Posts</Typography>
//         {/* <Button variant="contained" color="primary">+ Add New Post</Button> */}
//         <CustomButton text={"add more"} role={"admin"} ></CustomButton>
//       </Box>

//       <Grid container spacing={3}>
//      {Posts.map(({title,category,author,date,avatar,excerpt,tags,likes,saves,reports,badge}, idx)=>(
//     <Post
//     key={idx}
//     title={title}
//     category={category}
//     author={author}
//     date={date}
//     avatar={avatar}
//     excerpt={excerpt}
//     tags={tags}
//     likes={likes}
//     saves={saves}
//     reports={reports}
//     badge={badge}
//     />
//      ))}
//       </Grid>
//     </Box>
//     </div>
//   )
// }

// export default Allposts

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { allpostgata } from './allpostSlice';

// import {
//   Box,
//   Typography,
//   Grid,
//   Button,
//   Card,
//   CardContent,
//   Avatar,
//   Chip,
//   IconButton,
//   Stack,
//   useTheme,
//   Collapse,
//   CircularProgress,
// } from '@mui/material';

// import CustomButton from '../../components/components/CustomButton';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
// import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// import CardActions from '@mui/material/CardActions';
// import Flexbetween from '../../components/FlexBetween';
// import Header from '../../components/Header';
// import MonthBadge from '../../components/MonthBadge';

// const Post = ({ title, category, author, date, avatar, excerpt, tags, likes, saves, reports, badge }) => {
//   const theme = useTheme();
//   const [expanded, setExpanded] = useState(false);

//   return (
//     <Grid item xs={12} sm={6} md={4}>
//       <Card sx={{ p: 2, borderRadius: 3, backgroundColor: theme.palette.background.default }}>
//         <CardContent>
//           <Stack direction="row" alignItems="center" spacing={1} mb={1}>
//             <Avatar src={avatar} alt={author} />
//             <Box>
//               <Typography fontWeight={600} color="primary">{category}</Typography>
//               <Typography variant="body2" color="text.secondary">
//                 By {author} • {date}
//               </Typography>
//             </Box>
//           </Stack>

//           <Typography variant="h6" fontWeight={700} gutterBottom noWrap>
//             {title}
//           </Typography>
//           <Typography variant="body2" color="text.secondary" gutterBottom>
//             {excerpt}
//           </Typography>

//           <Stack direction="row" spacing={2} mt={2}>
//             <Stack direction="row" alignItems="center" spacing={0.5}>
//               <FavoriteBorderIcon fontSize="small" sx={{ color: "#ff4d6c" }} />
//               <Typography>{likes}</Typography>
//             </Stack>
//             <Stack direction="row" alignItems="center" spacing={0.5}>
//               <BookmarkBorderIcon fontSize="small" sx={{ color: "#ffffb3" }} />
//               <Typography>{saves}</Typography>
//             </Stack>
//             <Stack direction="row" alignItems="center" spacing={0.5}>
//               <FlagOutlinedIcon fontSize="small" sx={{ color: "#b3b3ff" }} />
//               <Typography>{reports}</Typography>
//             </Stack>
//           </Stack>

//           <Stack direction="row" spacing={1} mt={2} mb={2} flexWrap="wrap">
//             {tags?.map((tag, i) => (
//               <Chip key={i} label={tag} size="small" color="primary" variant="outlined" />
//             ))}
//           </Stack>

//           <CardActions>
//             <Button onClick={() => setExpanded(!expanded)} startIcon={<CalendarMonthIcon />} variant="outlined" size="small">
//               {expanded ? "Hide" : "Show"} Monthly Stats
//             </Button>
//           </CardActions>

//           <Collapse in={expanded} timeout="auto" unmountOnExit sx={{ color: theme.palette.secondary[400] }}>
//             <CardContent>
//               <Typography>
//                 <Flexbetween sx={{ gap: "1rem", width: "20rem" }}>
//                   <Header title={"Monthly Stats"} subtitle={"Monthly Stats For The Same Interest"} />
//                   <CalendarMonthIcon />
//                 </Flexbetween>
//               </Typography>
//               <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0.3rem" }}>
//                 {/* Dummy Monthly Data */}
//                 <MonthBadge month={"Jan"} count={12} />
//                 <MonthBadge month={"Feb"} count={15} />
//                 <MonthBadge month={"Mar"} count={10} />
//                 <MonthBadge month={"Apr"} count={18} />
//                 <MonthBadge month={"May"} count={20} />
//                 <MonthBadge month={"Jun"} count={22} />
//               </Box>
//             </CardContent>
//           </Collapse>
//         </CardContent>
//       </Card>
//     </Grid>
//   );
// };

// const Allposts = () => {
//   const dispatch = useDispatch();
//   const { role, token } = useSelector((state) => state.counter.auth);
//   const [allpost, setAllpost] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const RoleInput = role;
//   const Token = token;

//   useEffect(() => {
//     if (!Token || !RoleInput) return;

//     setLoading(true);
//     dispatch(allpostgata({ RoleInput, Token, url: "/superadmin/allpost" }))
//       .unwrap()
//       .then((result) => {
//         console.log("Fetched posts:", result);
//         setAllpost(result); // Ensure result is an array of post objects
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Fetch error:", error);
//         setLoading(false);
//       });
//   }, [Token, RoleInput]);

//   return (
//     <Box sx={{ p: 4 }}>
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
//         <Typography variant="h5" fontWeight={700}>All News Posts</Typography>
//         <CustomButton text={"Add More"} role={"admin"} />
//       </Box>

//       {loading ? (
//         <Box display="flex" justifyContent="center" mt={6}>
//           <CircularProgress />
//         </Box>
//       ) : allpost?.length > 0 ? (
//         <Grid container spacing={3}>
//           {allpost.map((post, idx) => (
//             <Post
//               key={idx}
//               title={post.title}
//               category={post.category}
//               author={post.author}
//               date={post.date}
//               avatar={post.avatar}
//               excerpt={post.excerpt}
//               tags={post.tags}
//               likes={post.likes}
//               saves={post.saves}
//               reports={post.reports}
//               badge={post.badge}
//             />
//           ))}
//         </Grid>
//       ) : (
//         <Typography textAlign="center" variant="body1" color="text.secondary">
//           No posts found.
//         </Typography>
//       )}
//     </Box>
//   );
// };

// export default Allposts;



import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  CardActions,
} from '@mui/material';
import CustomButton from '../../components/components/CustomButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Flexbetween from '../../components/FlexBetween';
import Header from '../../components/Header';
import MonthBadge from '../../components/MonthBadge';


// 👇 Single Post Card Component
const Post = ({
  title,
  content,
  createdAt,
  likeCount,
  svaecount,
  interests = [],
  index,
  refList
}) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);

  return (
    <Grid item xs={12} sm={6} md={4} >
      <Card ref={(el) => (refList.current[index] = el)} sx={{ p: 2, borderRadius: 3, backgroundColor: theme.palette.background.default }}>
        <CardContent>
          {/* Header */}
          <Stack direction="row" alignItems="center" spacing={1} mb={1}>
            <Avatar src={`https://i.pravatar.cc/150?u=${title}`} alt={title} />
            <Box>
              <Typography fontWeight={600} color="primary">Post</Typography>
              <Typography variant="body2" color="text.secondary">
                Created • {new Date(createdAt).toDateString()}
              </Typography>
            </Box>
          </Stack>

          {/* Title */}
          <Typography variant="h6" fontWeight={700} gutterBottom noWrap>
            {title}
          </Typography>

          {/* Content */}
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {content}
          </Typography>

          {/* Reactions */}
          <Stack direction="row" spacing={2} mt={2}>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <FavoriteBorderIcon fontSize="small" sx={{ color: "#ff4d6c" }} />
              <Typography>{likeCount}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <BookmarkBorderIcon fontSize="small" sx={{ color: "#ffffb3" }} />
              <Typography>{svaecount}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <FlagOutlinedIcon fontSize="small" sx={{ color: "#b3b3ff" }} />
              <Typography>0</Typography>
            </Stack>
          </Stack>

          {/* Interests as Chips */}
          <Stack direction="row" spacing={1} mt={2} mb={2} flexWrap="wrap">
            {interests.map((tag, i) => (
              <Chip
                key={i}
                label={tag.name}
                size="small"
                color="primary"
                variant="outlined"
              />
            ))}
          </Stack>

          {/* Expandable Stats */}
          <CardActions>
            <Button onClick={() => setExpanded(!expanded)} startIcon={<CalendarMonthIcon />} variant="outlined" size="small">
              {expanded ? "Hide" : "Show"} Monthly Stats
            </Button>
          </CardActions>

          <Collapse in={expanded} timeout="auto" unmountOnExit sx={{ color: theme.palette.secondary[400] }}>
            <CardContent>
              <Typography>
                <Flexbetween sx={{ gap: "1rem", width: "20rem" }}>
                  <Header title={"Monthly Stats"} subtitle={"Same Interest Stats"} />
                  <CalendarMonthIcon />
                </Flexbetween>
              </Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0.3rem" }}>
                {/* Dummy Month Data */}
                <MonthBadge month="Jan" count={12} />
                <MonthBadge month="Feb" count={8} />
                <MonthBadge month="Mar" count={6} />
                <MonthBadge month="Apr" count={10} />
                <MonthBadge month="May" count={14} />
              </Box>
            </CardContent>
          </Collapse>
        </CardContent>
      </Card>
    </Grid>
  );
};



// 👇 Main Component: Allposts
const Allposts = () => {
  const dispatch = useDispatch();
  const { role, token } = useSelector((state) => state.counter.auth);
  const [allpost, setAllpost] = useState([]);
  const [page, setpage] = useState(0)
  const [lording, setlording] = useState()
  const limit = 10
  const refList = useRef([])

  useEffect(() => {

    const observer = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        observer.unobserve(entries[0].target);
        callApiHandler()
      }
    },{
      threshold:0.5,
      rootMargin:"-148px",
      root:document.querySelector("scroller-elem")
    })

    if (refList.current.length > 0) {
      const lastElement = refList.current[refList.current.length - 1]
      observer.observe(lastElement)
    }



return()=>{
if(refList.current.length >0){
  // observer.unobserve(lastElement)
}
}

  }, [allpost, refList]);

  const callApiHandler = () => {
    if (!token || !role) return;
    setlording(true)
    const skip = limit * page
    dispatch(allpostgata({ RoleInput: role, Token: token, url: `/superadmin/allpost?skip=${skip}&limit=${limit}` }))
      .unwrap()
      .then((result) => {
        console.log("Fetched posts:", result);
        if (result.length > 0) {
          setAllpost((prev) => [...prev, ...result]);
        }

        setpage((prev) => prev + 1)
        setlording(false)
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setlording(false)
      });
  }


  useEffect(() => {
    callApiHandler()
  }, [token, role]);

  return (
    <Box >
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h5" fontWeight={700}>All News Posts</Typography>
        <CustomButton text="Add More" role="admin" />
      </Box>

      {/* Posts Grid */}
      <div className='overflow-auto h-180 bg-amber-400 scroller-elem'>
        <Grid container spacing={3} sx={{ p: 4 }} >
          {allpost.map((post, idx) => (
            <Post
              key={post._id}
              title={post.title}
              content={post.content}
              createdAt={post.createdAt}
              likeCount={post.likeCount}
              svaecount={post.svaecount}
              interests={post.interests || []} // 🟢 Show interests as chips
              index={idx}
              refList={refList}
            />
          ))}
        </Grid>
      </div>
      <div>{lording && <h1>loring</h1> }</div>
    </Box>
  );
};

export default Allposts;
