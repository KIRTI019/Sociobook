import { useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import {
  Box,
  IconButton,
  Typography,
  InputBase,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../redux/authSlice";
import { backendDomain } from "../common/index";
import PostInformation from "./PostInformation";

const PostWidget = ({ post, width }) => {
  const isNonMobileScreens = useMediaQuery("(min-width: 850px)");
  const [isComments, setIsComments] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);

  // Track local state for likes and comments
  const [localPost, setLocalPost] = useState(post);

  useEffect(() => {
    setLocalPost(post);
  }, [post]);

  const patchLike = async () => {
      const response = await fetch(
        `${backendDomain}/posts/${localPost._id}/like`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user._id }),
        }
      );
      const updatedPost = await response.json();
      dispatch(setPost({ posts: updatedPost }));
      setLocalPost(updatedPost); 
  };

  const commentOnPost = async () => {
    const response = await fetch(`${backendDomain}/posts/${localPost._id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment: commentValue }),
    });
    if (!response.ok) {
      throw new Error("Failed to comment on the post");
    }
    const updatedPost = await response.json();
    dispatch(setPost({ posts: updatedPost }));
    setLocalPost(updatedPost);
  };

  const isLiked = Boolean(localPost.likes[user._id]);
  const likeCount = Object.keys(localPost.likes).length;
  const commentCount = Object.keys(localPost.comments).length;

  const changeComment = (e) => {
    setCommentValue(e.target.value);
  };

  return (
    <Box
      sx={{
        width: { width },
        mb: 2,
      }}
    >
      <PostInformation post={localPost} />
      <Box sx={{ mt: isNonMobileScreens ? "3%" : "5%" }}>
        <Typography sx={{ mr: isNonMobileScreens ? "10%" : "" }}>
          {localPost.description}
        </Typography>
        {localPost.picturePath && (
          <img
            alt={localPost.displayName}
            width="100%"
            height={isNonMobileScreens ? "450px" : "300px"}
            src={localPost.picturePath}
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

      {isComments &&
        localPost.comments.map((item, index) => (
          <Typography key={index}>{item}</Typography>
        ))}
    </Box>
  );
};

export default PostWidget;
