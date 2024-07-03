import { Box, Button, Divider, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PostsWidget from "../components/PostsWidget";
import Sidebar from "../components/Sidebar";
import UserImage from "../components/UserImage";
import { backendDomain } from "../common";

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
    <Box>
      <Box sx={{ m: isNonMobileScreens ? "5% 0 0 20%" : "", display: "flex" }}>
        <UserImage image={user.picturePath} width="150px" height="150px" />
        <Box sx={{ display: "flex" }}>
          <Box sx={{ display: "flex" }}>
            <Typography>{user.displayName}</Typography>
            <Button>Edit Profile</Button>
          </Box>
          <Typography>Joined {formattedDate}</Typography>
          <Box sx={{ display: "flex" }}>
            <Typography>{posts.length} Post</Typography>
            <Typography
              onClick={() => navigate("/follower")}
              sx={{
                cursor: "pointer",
              }}
            >
              {user.following.length} Following
            </Typography>
            <Typography>{user.follower.length} Followers</Typography>
          </Box>
        </Box>
      </Box>
      <Box>
        <Typography>
          POST
        </Typography>
        <PostsWidget userId={user._id} isProfile={true} />
      </Box>
    </Box>
  );
};

export default ProfilePage;
