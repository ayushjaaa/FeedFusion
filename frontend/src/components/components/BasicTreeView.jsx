import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { intrestchange,addintrest } from "../../features/Postform/PostFormSlice";
import {fetchInterests,selectAllInterests,selectFetchStatus,selectContent} from '../../features/intrestbysuperadmin/Intrestbysuperadmin'
import { useTheme } from "@emotion/react";
import { ToastContainer, toast } from 'react-toastify'

import { useSelector } from "react-redux";
import {submitPost} from '../../features/Postform/PostFormSlice'
import { submitTrigger,triggerSubmit } from "../../features/Postform/PostFormSlice";
import { Box, Typography, Button, Chip, Stack, CircularProgress } from "@mui/material";






const BasicTreeView = () => {
  const dispatch = useDispatch();
  const Postcontent = useSelector((state)=>state.counter.FormData.Postcontent)
  console.log(Postcontent)
  const Token =  useSelector((state)=>state.counter.auth.token)
  const interests = useSelector(selectAllInterests);
  const [path, setPath] = useState([]);

  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const shouldSubmit = useSelector(submitTrigger);
  const Navigate = useNavigate()
  // console.log(d)
 
  useEffect(() => {   
    setLoading(true);
    dispatch(fetchInterests({ url: "/commanroutes/fetchintrest", Token }))
      .unwrap()
      .then((data) => setLoading(false))
      .catch((error) => {
        console.log("Error while fetching intrest:", error);
        setLoading(false);
      });
  }, [dispatch, Token]);



  useEffect(() => {
    if (shouldSubmit) {
      console.log("data jane ke liye ready")
      dispatch(submitPost({ url: "/superadmin/createpost", Token, Postcontent })).unwrap().then((result)=>{
        toast.success("post created successfully")
        Navigate("/app/admin-dashboard")
      }).catch((error)=>{
        if(error){
  toast.error("plz login");
          Navigate("/login")
          
        }
      })
    }
  }, [shouldSubmit]);
  

  console.log(interests)

  const currentParentId = path.length > 0 ? path[path.length - 1] : null;

  const filteredInterests = interests.filter(
    (item) => item.parentId === currentParentId
  );

  const interestColorsArray = Object.values(theme.palette.interestColors || {});



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
                   // optional if you want to save path
  
dispatch(addintrest(path))
dispatch(triggerSubmit())

                  // dispatch(submitPost({url:"/superadmin/createpost",Token,Postcontent})) // optional if you want to submit post now
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







