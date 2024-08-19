import MainLayout from "../components/MainLayout";
import PostsWidget from "../components/PostsWidget";
import {
  Box,
  Typography,
  useMediaQuery,
  Divider,
  Dialog,
  DialogContent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import UserImage from "../components/UserImage";
import { backendDomain } from "../common";
import Button from "../components/Button";
import { setFriends, setLogout } from "../redux/authSlice";
import EditProfile from "../components/EditProfile";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const posts = useSelector((state) => state.posts);
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 850px)");

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`${backendDomain}/users/${userId}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    getUser();
  }, [userId, token]);

  const isFollowing = user?.following.some(
    (followingUserId) => followingUserId._id === userId
  );

  const isoDateToMonthYear = (isoDate) => {
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
    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  };

  const formattedDate =
    profile?.createdAt && isoDateToMonthYear(profile.createdAt);

  const patchFriend = async () => {
    try {
      const response = await fetch(
        `${backendDomain}/users/${user._id}/${userId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      dispatch(setFriends({ following: data }));
    } catch (error) {
      console.error("Failed to update friends:", error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(setLogout())
  };

  return (
    <MainLayout>
      <Box
        sx={{
          flex: 1,
          padding: isNonMobileScreens ? "5% 20%" : "5%",
          overflowY: "auto",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            paddingBottom: 2,
          }}
        >
          <UserImage
            image={profile?.picturePath}
            width={isNonMobileScreens ? "150px" : "100px"}
            height={isNonMobileScreens ? "150px" : "100px"}
          />
          <Box sx={{ flex: 1, zIndex: 1000 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Typography variant="h5">{profile?.displayName}</Typography>
              {user._id === userId ? (
                <Button click={handleOpen} text="Edit Profile" width="130px" />
              ) : (
                <Button
                  click={patchFriend}
                  text={isFollowing ? "Following" : "Follow"}
                  width="100px"
                />
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "15px",
                paddingTop: 1,
                justifyContent: "space-between",
                width: "80%",
              }}
            >
              <Typography>Posts</Typography>
              <Typography
                onClick={() => navigate("/follower")}
                sx={{ cursor: "pointer" }}
              >
                Following
              </Typography>
              <Typography>Followers</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: "15px",
                paddingTop: 1,
                justifyContent: "space-between",
                width: "80%",
              }}
            >
              <Typography>{posts.length}</Typography>
              <Typography
                onClick={() => navigate("/follower")}
                sx={{ cursor: "pointer" }}
              >
                {profile?.following?.length || 0}
              </Typography>
              <Typography>{profile?.follower?.length || 0}</Typography>
            </Box>
            <Typography variant="subtitle1">
              Member since: {formattedDate || "Loading..."}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ marginBottom: 2, zIndex: 1000 }} />
        <Typography
          sx={{ fontWeight: "600", textAlign: "center", marginBottom: 2 }}
        >
          POSTS
        </Typography>
        <Box sx={{ width: isNonMobileScreens ? "90%" : "100%" }}>
          <PostsWidget userId={userId} isProfile={true} width="100%" />
        </Box>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Box sx={{ cursor: "pointer" }}>
            <Typography>Edit Profile</Typography>
            <Divider sx={{ width: "100%" }} />
            <Typography onClick={handleLogout}>Logout</Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default ProfilePage;
