import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { intrestchange,addintrest } from "../../features/Postform/PostFormSlice";
import {fetchInterests,selectAllInterests,selectFetchStatus} from '../../features/intrestbysuperadmin/Intrestbysuperadmin'
import { useTheme } from "@emotion/react";
import { useSelector } from "react-redux";
import {submitPost} from '../../features/Postform/PostFormSlice'
import { Box, Typography, Button, Chip, Stack, CircularProgress } from "@mui/material";




// const BasicTreeView = () => {
// const {Postcontent} = useSelector((state)=>state.counter.FormData)
// const token = useSelector((state) => state.counter.auth.token);
// const [isLastNodeClicked, setIsLastNodeClicked] = useState(false); 
// const dispatch = useDispatch();
// const interestData = useSelector((state)=>state.counter.Intrest
// )
// // console.log(d)






// // Recursive finder function
// const findItemById = (items, id) => {
//   for (let item of items) {
//     if (item.id === id) return item;
//     if (item.children) {
//       const found = findItemById(item.children, id);
//       if (found) return found;
//     }
//   }
//   return null;
// };


// useEffect(() => {
//  const url ="/commanroutes/fetchintrest";
//   const Token = token;
//   dispatch(fetchInterests({url,Token})).unwrap().then((result)=>
//   console.log(result))
//   .catch((error)=>console.log(error))

// }, [])



//   const theme = useTheme()
//   const [intrest, setintrest] = useState([]);
//   // console.log(intrest)
//   const navigate = useNavigate();
//   const { id } = useParams();

// const url = "/admin/post"
//   function SubmitIntrest(e) {
//     alert("Submit logic can go here")
//     // console.log(Postcontent)
  
//     dispatch(submitPost(token,Postcontent,url))
//     navigate('/superadmin/createpost')

//   }
//   dispatch(addintrest(intrest))
  

//   let currentItems = Array.isArray(interestData) ? interestData : [];

//   if (id) {
//     const found = findItemById(interestData, id);
  
//     if (found?.children && found.children.length === 0) {
//       dispatch(intrestchange());
//       setIsLastNodeClicked(true);
//     } else {
//       setIsLastNodeClicked(false);
//     }
  
//     if (found?.children && Array.isArray(found.children)) {
//       currentItems = found.children;
//     } else {
//       currentItems = [];
//     }
//   }
  

//   const getNavigate = (id) => {
//     setintrest([...intrest, id]);
//     navigate(`/app/interests/${id}`);
//   };

//   const tagColors = [
//     "bg-pink-300",
//     "bg-blue-300",
//     "bg-green-300",
//     "bg-yellow-400",
//     "bg-orange-300",
//     "bg-purple-300",
//     "bg-pink-400",
//     "bg-purple-400",
//     "bg-sky-300",
//   ];

//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center p-10 box-border ">
//       <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
//         {id
//           ? currentItems.length > 0
//             ? `Sub Interests of "${id}"`
//             : `No more sub-interests.`
//           : "Explore Your Interests"}
//       </h2>

//       {isLastNodeClicked && currentItems.length === 0 ? (
//         <button
//           onClick={() => SubmitIntrest()}
//           className="px-7 py-3 bg-green-600 text-white rounded-lg text-lg font-semibold cursor-pointer transition-colors duration-300 hover:bg-green-700 focus:outline-none"
//         >
//           Submit Now
//         </button>
//       ) : (
//         <div className="flex flex-wrap justify-center gap-4 max-w-5xl">
//           {currentItems.map((elem, index) => (
//             <div
//               key={elem.id}
//               onClick={() => getNavigate(elem.id)}
//               className={`${tagColors[index % tagColors.length]} px-6 py-3 rounded-full cursor-pointer font-semibold text-gray-800 shadow-md transform transition-transform duration-200 hover:scale-105 select-none`}
//             >
//               {elem.label}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BasicTreeView;



const BasicTreeView = () => {
  const dispatch = useDispatch();
  const Token = useSelector((state) => state.counter.auth.token);
  const theme = useTheme();

  const interests = useSelector(selectAllInterests);
  const [path, setPath] = useState([]);
  const [loading, setLoading] = useState(false);

  const currentParentId = path.length > 0 ? path[path.length - 1] : null;

  const filteredInterests = interests.filter(
    (item) => item.parentId === currentParentId
  );

  const interestColorsArray = Object.values(theme.palette.interestColors || {});

  useEffect(() => {
    setLoading(true);
    dispatch(fetchInterests({ url: "/commanroutes/fetchintrest", Token }))
      .unwrap()
      .then(() => setLoading(false))
      .catch((error) => {
        console.log("Error while fetching intrest:", error);
        setLoading(false);
      });
  }, [dispatch, Token]);

  const goBack = () => {
    setPath((prev) => prev.slice(0, -1));
  };

  const handleInterestClick = (id) => {
    setPath((prev) => [...prev, id]);
  };

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 4 },
        maxWidth: "800px",
        mx: "auto",
        mt: { xs: 4, sm: 6 },
      }}
    >
{
  filteredInterests.length > 0 ?      <Typography
  variant="h4"
  fontWeight="bold"
  gutterBottom
  textAlign="center"
  fontSize={{ xs: "1.6rem", sm: "2rem" }}
>
  Select Your Interests
</Typography> : <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          mt={2}
          sx={{ fontSize: "1.4rem",    }}
        >
          All  Interests Are Done
        </Typography>
}

      {path.length > 0 && (
        <Button
          variant="outlined"
          onClick={goBack}
          sx={{ mb: 2,backgroundColor:"#BDBDBD", "&:hover": {
            backgroundColor: "#E0E0E0",
          } }}

        >
          ⬅️ Go Back
        </Button>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Stack
            direction="row"
            flexWrap="wrap"
            spacing={1.5}
            useFlexGap
            justifyContent={{ xs: "center", sm: "flex-start" }}
          >
            {filteredInterests.length > 0 ? (
              filteredInterests.map((elem, index) => {
                const color =
                  interestColorsArray[index % interestColorsArray.length] || {
                    main: "#333",
                    light: "#eee",
                  };

                return (
                  <Chip
                    key={elem._id}
                    label={elem.name}
                    onClick={() => handleInterestClick(elem._id)}
                    sx={{
                      backgroundColor: color.light,
                      color: color.main,
                      fontWeight: 500,
                      px: 1.5,
                      py: 0.5,
                      fontSize: "0.9rem",
                      borderRadius: "8px",
                      cursor: "pointer",
                      transition: "0.3s",
                      "&:hover": {
                        backgroundColor: color.main,
                        color: "#fff",
                      },
                    }}
                  />
                );
              })
            ) : (
             null  
            )}
          </Stack>

          {/* Save button when no more nested interests */}
          {filteredInterests.length === 0 && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Button
                variant="contained"
                color="primary"
                sx={{ fontSize: "1rem", px: 4, py: 1.5, borderRadius: "8px" }}
                onClick={() => {
                  console.log("Selected Path:", path);
                  dispatch(addintrest(path)); // optional if you want to save path
                  // dispatch(submitPost()) // optional if you want to submit post now
                }}
              >
                save
              </Button>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default BasicTreeView;







