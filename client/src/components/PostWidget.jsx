import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import { TwitterShareButton } from "react-share";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
  InputBase,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setComment } from "../redux/authSlice";
import { backendDomain } from "../common/index";
import PostInformation from "./PostInformation";

const PostWidget = ({ post }) => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 750px)");
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
    const response = await fetch(`${backendDomain}/posts/${post.postId}/like`, {
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

  const commentOnPost = () => {
    dispatch(setComment(commentValue));
    setCommentValue("");
  };
  const changeComment = (e) => {
    setCommentValue(e.target.value);
  };

  return (
    <Box
      sx={{
        width: isNonMobileScreens ? "50%" : "500px",
        height: isNonMobileScreens ? "700px" : "600px",
        p: isNonMobileScreens ? "" : "10%"
      }}
    >
      <PostInformation post={post} />
      <Box sx={{ mt: isNonMobileScreens ? "3%" : "5%" }}>
        <Typography>{post.description}</Typography>
        {post.picturePath && (
            <img
            width={isNonMobileScreens ? "450px" : "100%"}
            height={isNonMobileScreens ? "500px" : "400px"}
            src={post.picturePath}
          />
        )}
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ display: "flex" }}>
          <IconButton>
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

        <Box>
          <IconButton>
            <ShareIcon>
              <TwitterShareButton>Share on Twitter</TwitterShareButton>
            </ShareIcon>
          </IconButton>
        </Box>
      </Box>
      <InputBase
        placeholder="Add a comment"
        value={commentValue}
        onChange={changeComment}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            commentOnPost();
          }
        }}
        sx={{ mb: "2%" }}
      />
      <Divider orientation="horizontal" sx={{}} />
    </Box>
  );
};

export default PostWidget;
