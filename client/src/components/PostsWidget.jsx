import { Box, useMediaQuery } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../redux/authSlice";
import PostWidget from "./PostWidget";
import { backendDomain } from "../common/index";

const PostsWidget = ({ userId, isProfile, width }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 750px)");

  const getPosts = async () => {
    const response = await fetch(`${backendDomain}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(`${backendDomain}/posts/user/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, [isProfile, userId]);

  return (
    <Box sx={{
        height: "100vh",
        overflow: isProfile ? "hidden" : "auto",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        msOverflowStyle: "none",
        scrollbarWidth: "none",
        p: isNonMobileScreens ? "10%" : "10% 15%"
      }}
    >
      {posts.map((item, index) => (
        <PostWidget key={index} post={item} width={width} />
      ))}
    </Box>
  );
};

export default PostsWidget;
