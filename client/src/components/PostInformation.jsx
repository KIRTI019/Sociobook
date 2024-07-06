import {
  Box,
  Typography,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import UserImage from "./UserImage";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../redux/authSlice";
import { useState } from "react";
import { backendDomain } from "../common";

const PostInformation = ({ post }) => {
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 750px)");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [isSetting, setIsSetting] = useState(false);

  const isoDate = post.createdAt;

  function isoDateToMonthYear(isoDate) {
    const timestamp = new Date(isoDate);
    const now = new Date();

    const diffMillis = now - timestamp;

    const hours = diffMillis / (1000 * 60 * 60);

    if (hours >= 24) {
      const days = Math.floor(hours / 24);
      return `${days}d`;
    } else {
      const roundedHours = Math.floor(Math.abs(hours));
      return `${roundedHours}h`;
    }
  }

  const formattedDate = isoDateToMonthYear(isoDate);

  const isOwnPost = user._id === post.userId;

  const isFriend = Array.isArray(user.following)
    ? user.following.find((friend) => friend._id === post.userId)
    : null;

  const patchFriend = async () => {
    const response = await fetch(
      `${backendDomain}/users/${user._id}/${post.userId}`,
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
  };

  return (
    <Box display="flex" alignItems="center" width={isNonMobileScreens ? "90%" : "100%"} position="relative">
      <UserImage image={post.userPicturePath} width="40px" height="40px" />
      <Box display="flex" alignItems="center" ml={1} flexGrow={1}>
        <Typography
          onClick={() => navigate(`/${post.userId}`)}
          sx={{ cursor: "pointer", fontWeight: "700", mr: 1 }}
        >
          {post.displayName}
        </Typography>
        <FiberManualRecordIcon sx={{ width: "5px", height: "5px", mx: 1 }} />
        <Typography>{formattedDate}</Typography>
        {!isOwnPost && !isFriend && (
          <Button
            onClick={() => patchFriend()}
            sx={{
              ml: 2,
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            Follow
          </Button>
        )}
      </Box>
      <Box sx={{ position: "absolute", right: 0 }}>
        <IconButton
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
            },
            color: "black",
          }}
        >
          <MoreHorizIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default PostInformation;
