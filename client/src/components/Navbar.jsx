import { Box, IconButton } from "@mui/material";
import ExploreIcon from "@mui/icons-material/Explore";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserImage from "./UserImage";

const main = [
  {
    path: "/home",
    icon: <HomeOutlinedIcon />,
    state: "home",
  },
  {
    path: "/explore",
    icon: <ExploreIcon />,
    state: "explore",
  },
  {
    icon: <AddBoxOutlinedIcon />,
    state: "create",
  },
  {
    path: "/message",
    icon: <MailOutlineOutlinedIcon />,
    state: "message",
  },
  {
    path: "/notification",
    icon: <NotificationsNoneOutlinedIcon />,
    state: "notification",
  },
];

const Navbar = ({ open, setOpen }) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    const handleCreateClick = () => {
      setOpen(true);
    };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        width: "100%",
        zIndex: 1000,
        position: "fixed",
        bottom: 0,
        backgroundColor: "white",
        borderTop: "1px solid #e0e0e0",
        padding: "10px 0",
      }}
    >
      {main.map((item, index) => (
        <Box key={index}>
          <IconButton sx={{ color: "black" }} onClick={() => item.path ? navigate(item.path) : handleCreateClick()}>{item.icon}</IconButton>
        </Box>
      ))}
      <IconButton onClick={() => navigate(`/${user._id}`)}>
        <UserImage image={user.picturePath} height="25px" width="25px" />
      </IconButton>
    </Box>
  );
};

export default Navbar;
