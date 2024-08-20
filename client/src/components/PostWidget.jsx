import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  InputBase,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../redux/authSlice";
import { backendDomain } from "../common/index";
import PostInformation from "./PostInformation";
import { useNavigate } from "react-router-dom";

const PostWidget = ({ post, width }) => {
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 850px)");
  const [isComments, setIsComments] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const posts = useSelector((state) => state.posts);
  const comment = useSelector((state) => state.comment);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(post.likes[loggedInUserId]);
  const likeCount = Object.keys(post.likes).length;
  const commentCount = Object.keys(post.comments).length;

  const patchLike = async () => {
    const response = await fetch(`${backendDomain}/posts/${post._id}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const commentOnPost = async () => {
    const response = await fetch(`${backendDomain}/posts/${post._id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment: commentValue }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  }

  const changeComment = (e) => {
    setCommentValue(e.target.value);
  };

  return (
    <Box
      sx={{
        width: {width},
        mb: 2,
      }}
    >
      <PostInformation post={post} />
      <Box sx={{ mt: isNonMobileScreens ? "3%" : "5%" }}>
        <Typography sx={{ mr: isNonMobileScreens ? "10%" : "" }}>{post.description}</Typography>
        {post.picturePath && (
            <img
            width="100%"
            height={isNonMobileScreens ? "450px" : "300px"}
            src={post.picturePath}
          />
        )}
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ display: "flex" }}>
          <IconButton onClick={patchLike}>
            {isLiked ? (
              <FavoriteIcon sx={{ color: "red" }} />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          <Typography fontSize="15px" sx={{ mt: "20%" }}>
            {likeCount}
          </Typography>
        </Box>

        <Box display="flex" sx={{ mt: "0.5%" }}>
          <IconButton onClick={() => setIsComments(!isComments)}>
            <ChatBubbleOutlineIcon />
          </IconButton>
          <Typography fontSize="15px" sx={{ mt: "15%" }}>
            {commentCount}
          </Typography>
        </Box>
      </Box>
      <InputBase
        placeholder="Add a comment"
        value={commentValue}
        onChange={changeComment}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            commentOnPost();
            setCommentValue("");
          }
        }}
        sx={{ m: "0 0 2% 2%" }}
      />

      {isComments && post.comments.map((item, index) => (
        <Typography key={index}>{item}</Typography>
      ))}
    </Box>
  );
};

export default PostWidget;
