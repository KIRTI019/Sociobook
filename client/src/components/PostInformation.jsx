import {
  Box,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import UserImage from "./UserImage";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../redux/authSlice";
import { useCallback, useMemo } from "react";
import { backendDomain } from "../common";

const PostInformation = ({ post }) => {
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 750px)");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

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

  const isFriend = useMemo(() => {
    return user.following.some((friend) => friend._id === post.userId);
  }, [user.following, post.userId]);

    const patchFriend = useCallback(async () => {
      try {
        const response = await fetch(`${backendDomain}/users/${user._id}/${post.userId}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        dispatch(setFriends({ following: data }));
      } catch (error) {
        console.error("Failed to update friends:", error);
      }
    }, [user._id, post.userId, token, dispatch]);

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      position="relative"
    >
      <UserImage image={post.userPicturePath} width="40px" height="40px" />
      <Box display="flex" alignItems="center" ml={1} width="60%">
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
            onClick={patchFriend}
            sx={{
              ml: isNonMobileScreens ? 2 : 1,
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            Follow
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default PostInformation;