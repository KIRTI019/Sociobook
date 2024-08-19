import React from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  useMediaQuery,
} from "@mui/material";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Logo from "./Logo";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserImage from "./UserImage";

const main = [
  {
    display: "home",
    path: "/home",
    icon: <HomeOutlinedIcon />,
    state: "home",
  },
  {
    display: "search",
    path: "/search",
    icon: <SearchOutlinedIcon />,
    state: "search",
  },
  {
    display: "message",
    path: "/message",
    icon: <MailOutlineOutlinedIcon />,
    state: "message",
  },
  {
    display: "create",
    path: null,
    icon: <AddBoxOutlinedIcon />,
    state: "create",
  },
];

const Sidebar = ({ open, setOpen }) => {
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const navigate = useNavigate();

  const handleCreateClick = () => {
    setOpen(true);
  };

  return (
    <Box>
      <Paper
        sx={{
          height: "100vh",
          p: "5%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              m: "0 0 5% 0",
            }}
          >
            <Logo />
          </Box>
          <List>
            <Stack spacing={2}>
              {main.map((item, index) => (
                <ListItemButton
                  key={index}
                  onClick={() =>
                    item.path ? navigate(item.path) : handleCreateClick()
                  }
                >
                  <ListItemIcon sx={{ color: "black" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      textTransform: "uppercase",
                      m: isNonMobileScreens ? "" : "0 5% 0 -15%",
                    }}
                  >
                    {item.display}
                  </ListItemText>
                </ListItemButton>
              ))}
              <ListItemButton onClick={() => navigate(`/${user._id}`)}>
                <ListItemIcon>
                  <UserImage
                    image={user.picturePath}
                    width="25px"
                    height="25px"
                  />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    textTransform: "uppercase",
                    ml: isNonMobileScreens ? "" : "-15%",
                  }}
                >
                  Profile
                </ListItemText>
              </ListItemButton>
            </Stack>
          </List>
        </Box>
      </Paper>
    </Box>
  );
};

export default Sidebar;
