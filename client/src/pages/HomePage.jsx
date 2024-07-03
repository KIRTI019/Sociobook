import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import PostsWidget from "../components/PostsWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 750px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <Box sx={{ m: isNonMobileScreens ? "5% 0 0 20%" : "" }}>
        <PostsWidget userId={_id} isProfile={false} />
      </Box>
    </Box>
  );
};

export default HomePage;
