import { Box, Button, Divider, Paper, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PostsWidget from "../components/PostsWidget";
import Sidebar from "../components/Sidebar";
import UserImage from "../components/UserImage";
import { backendDomain } from "../common";
import Navbar from "../components/Navbar";
import Logo from "../components/Logo";
import Searchbar from "../components/Searchbar";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const posts = useSelector((state) => state.posts);
  const isNonMobileScreens = useMediaQuery("(min-width: 750px)");

  const getUser = async () => {
    const response = await fetch(`${backendDomain}/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) return null;

  const isoDate = user.createdAt;

  function isoDateToMonthYear(isoDate) {
    const date = new Date(isoDate);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${month} ${year}`;
  }

  const formattedDate = isoDateToMonthYear(isoDate);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isNonMobileScreens ? "row" : "column",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {isNonMobileScreens && (
        <Box
          sx={{
            width: "20%",
            minWidth: "200px",
            borderRight: "1px solid #ddd",
          }}
        >
          <Sidebar />
        </Box>
      )}

      {!isNonMobileScreens && (
      <Paper sx={{ display: "flex", justifyContent: "space-between", p: "3% 5%" }}>
        <Logo />
        <Searchbar />
      </Paper>
    )}

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: isNonMobileScreens ? "5% 20%" : "5% 10%",
          overflowY: "auto",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "20px", paddingBottom: 2 }}>
          <UserImage image={user.picturePath} width={isNonMobileScreens ? "150px" : "100px"} height={isNonMobileScreens ? "150px" : "100px"} />
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Typography variant="h5">{user.displayName}</Typography>
              <Button
                sx={{
                  mt: "2%",
                  "&:hover": { backgroundColor: "transparent" },
                }}
                onClick={() => navigate("/edit-profile")}
              >
                Edit Profile
              </Button>
            </Box>
            <Box sx={{ display: "flex", gap: "15px", paddingTop: 1 }}>
              <Typography>{posts.length} Posts</Typography>
              <Typography
                onClick={() => navigate("/follower")}
                sx={{ cursor: "pointer" }}
              >
                {user.following.length} Following
              </Typography>
              <Typography>{user.follower.length} Followers</Typography>
            </Box>
            <Typography variant="subtitle1">
              Member since: {formattedDate}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ paddingBottom: 2 }}>
          <Typography sx={{ fontWeight: "600", textAlign: "center" }}>POSTS</Typography>
          <Divider sx={{ marginBottom: 2 }} />
          <PostsWidget userId={userId} isProfile={true} />
        </Box>
      </Box>

      {!isNonMobileScreens && (
        <Box sx={{ width: "100%" }}>
          <Navbar />
        </Box>
      )}
    </Box>
  );
};

export default ProfilePage;
