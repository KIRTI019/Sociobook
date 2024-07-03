import {
  Box,
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ExploreIcon from "@mui/icons-material/Explore";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UserImage from "./UserImage";

const main = [
  {
    display: "home",
    path: "/home",
    icon: <HomeOutlinedIcon />,
    state: "home",
    device: "mobile"
  },
  {
    display: "search",
    path: "/search",
    icon: <SearchOutlinedIcon />,
    state: "search",
    device: "laptop"
  },
  {
    display: "explore",
    path: "/explore",
    icon: <ExploreIcon />,
    state: "explore",
    device: "mobile"
  },
  {
    display: "message",
    path: "/message",
    icon: <MailOutlineOutlinedIcon />,
    state: "message",
    device: "mobile"
  },
  {
    display: "notification",
    path: "/notification",
    icon: <NotificationsNoneOutlinedIcon />,
    state: "notification",
    device: "mobile"
  },
  {
    display: "create",
    path: "/create",
    icon: <AddBoxOutlinedIcon />,
    state: "create",
    device: "mobile"
  },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box>
      <Paper sx={{ height: "100vh", p: "5%", display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
                <ListItemButton key={index} onClick={() => navigate(item.path)}>
                  <ListItemIcon sx={{ color: "black" }}>{item.icon}</ListItemIcon>
                  <ListItemText sx={{ textTransform: "uppercase", ml: isNonMobileScreens ? "" : "-15%" }}>
                    {item.display}
                  </ListItemText>
                </ListItemButton>
              ))}
              <ListItemButton onClick={() => navigate(`/${user._id}`)}>
                <ListItemIcon>
                  <UserImage image={user.picturePath} width="25px" height="25px" />
                </ListItemIcon>
                <ListItemText sx={{ textTransform: "uppercase", ml: isNonMobileScreens ? "" : "-15%" }}>Profile</ListItemText>
              </ListItemButton>
            </Stack>
          </List>
        </Box>
        <Box sx={{ mt: 'auto' }}>
          <ListItemButton>
            <ListItemIcon sx={{ color: "black" }}>
              <ExpandMoreIcon />
            </ListItemIcon>
            <ListItemText sx={{ textTransform: "uppercase", ml: isNonMobileScreens ? "" : "-15%" }}>
              More
            </ListItemText>
          </ListItemButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default Sidebar;
