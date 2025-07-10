import  {React, useEffect, useState } from "react";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  Chip,
} from "@mui/material";
import {
  HomeOutlined,
  ArticleOutlined,
  PeopleOutline,
  TrendingUpOutlined,
  SettingsOutlined,
  CalendarMonthOutlined,
  CategoryOutlined,
  PublicOutlined,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "../components/FlexBetween";
import { getuserdetails } from "../features/userdetails/userdetailSlice";
import { useDispatch } from "react-redux";
const drawerWidth = 260;

const navItems = [
  { text: "Dashboard", icon: <HomeOutlined /> },
  { text: "allpost", icon: <HomeOutlined /> },
  { text: "Manage Articles", icon: <ArticleOutlined /> },
  { text: "Categories", icon: <CategoryOutlined /> },
  { text: "All Users", icon: <PeopleOutline /> },
  { text: "All Admin", icon: <PeopleOutline /> },
  { text: "Analytics", icon: <TrendingUpOutlined /> },
  { text: "Events", icon: <CalendarMonthOutlined /> },
  { text: "Locations", icon: <PublicOutlined /> },
  { text: "Settings", icon: <SettingsOutlined /> },
];

const Sidebar = ({ isSidebarOpen, setisSidebsarOpen }) => {
  const d = useSelector((state) => state.counter);

  const token = localStorage.getItem("token");

 const  dispatch = useDispatch()

  useEffect(() => {
    
  dispatch(getuserdetails({token:token,url:"user/getdetails"}))
 
   
  }, [token])
  
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const [active, setActive] = useState("");
  // const {auth} = useSelector((state) => state.counter);

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box>
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setisSidebsarOpen(false)}
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.default,
              width: drawerWidth,
              padding: "1rem",
              borderRight: `1px solid ${theme.palette.divider}`,
            },
          }}
        >
          <Box>
            {/* Sidebar Header */}
            <Box p={3} textAlign="center">
              <Typography variant="h4" fontWeight="bold">
                News Admin
              </Typography>
              <Divider sx={{ my: 2 }} />
            </Box>

            {/* Navigation Items */}
            <List>
              {navItems.map(({ text, icon }) => {
                const lcText = "app/"+ text.toLowerCase();
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => navigate(`/${lcText}`)}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.primary.light
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary.main
                            : theme.palette.secondary[200],
                        margin: "0.5rem 0",
                        borderRadius: "0.5rem",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color:
                            active === lcText
                              ? theme.palette.primary.main
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          {/* // dowen section */}
          <Box position="absolute" width='80%' bottom="2rem" justifyContent="center" p="1rem">
            <Divider />
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
              <Box
                component="img"
                alt="profile"

                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              ></Box>
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
name
                </Typography>
                <Typography>
<Chip label="admin"  sx={{ backgroundColor: "purple", color: "white" }}/>
                </Typography>
              </Box>
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
