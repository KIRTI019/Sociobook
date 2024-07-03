import {
  Box,
  Typography,
  Button,
  IconButton,
  Paper,
  Stack,
  Divider,
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
    <Box display="flex" width="50%">
      <UserImage image={post.userPicturePath} width="40px" height="40px" />
      <Box display="flex">
        <Typography
          onClick={() => navigate(`/${post.userId}`)}
          sx={{ cursor: "pointer", fontWeight: "700", m: isFriend ? "4%" :"3%" }}
        >
          {post.displayName}
        </Typography>
        <FiberManualRecordIcon
          sx={{ width: "5px", height: "5px", m: isFriend ? "13% 4%" :"8% 2%" }}
        />
        <Typography sx={{ m: isFriend ? "4%" :"3%" }}>{formattedDate}</Typography>

        {!isFriend && (
          <Box sx={{ display: "flex" }}>
            <FiberManualRecordIcon
              sx={{ width: "5px", height: "5px", m: "18% 2%" }}
            />
            <Button
              onClick={() => patchFriend()}
              sx={{
                m: "0 0 5% 3%",
                "&: hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              Follow
            </Button>
          </Box>
        )}
      </Box>

      {isFriend ? (
        <Box sx={{ ml: "27%", position: "absolute" }}>
          <IconButton
            sx={{
              "&:hover": {
                backgroundColor: "transparent",
              },
              color: "black"
            }}
          >
            <MoreHorizIcon />
          </IconButton>
        </Box>
      ) : (
        <Box sx={{ ml: "27%", position: "absolute" }}>
          <IconButton
            sx={{
              "&:hover": {
                backgroundColor: "transparent",
              },
              color: "black"
            }}
          >
            <MoreHorizIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default PostInformation;
