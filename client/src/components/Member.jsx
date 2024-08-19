import {
  Box,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { backendDomain } from "../common";
import { useEffect, useState } from "react";
import UserImage from "./UserImage";

const Member = ({ setOpenSearch, setUser, member }) => {
  const [users, setUsers] = useState([]);
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 850px)");

  const fetchUser = async () => {
    try {
      const response = await fetch(`${backendDomain}/users`, {
        method: "GET",
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const isUser = (userId) => {
    return userId === user._id;
  };

  return (
    <Box 
      sx={{ 
        position: "fixed", 
        width: isNonMobileScreens ? "25%" : "100%", 
        height: "100vh", 
        display: !isNonMobileScreens && member ? "none" : "block" 
      }}
    >
      <Paper
        sx={{
          display: "flex",
          p: isNonMobileScreens ? "10%" : "5%",
          justifyContent: "space-between",
          mb: "1%",
        }}
      >
        <Typography sx={{ fontSize: "20px", fontWeight: "550" }}>
          {user.displayName}
        </Typography>
        <IconButton sx={{ mt: "-2%" }} onClick={() => setOpenSearch(true)}>
          <SearchIcon />
        </IconButton>
      </Paper>

      <Box
        sx={{
          height: isNonMobileScreens ? "calc(90vh - 64px)" : "calc(75vh - 64px)", 
          overflowY: "auto", 
          px: 2,
          py: 1,
        }}
      >
        {users.map((item) => (
          <Box key={item._id}>
            {!isUser(item._id) && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginY: 2,
                  cursor: "pointer",
                }}
                onClick={() => setUser(item)}
              >
                <UserImage
                  image={item.picturePath}
                  width="60px"
                  height="60px"
                />
                <Typography>{item.userName}</Typography>
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Member;
