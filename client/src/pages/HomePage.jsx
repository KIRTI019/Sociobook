import MainLayout from "../components/MainLayout";
import PostsWidget from "../components/PostsWidget";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";

const HomePage = () => {
  const { _id } = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 850px)");

  return (
    <MainLayout>
      <PostsWidget userId={_id} isProfile={false} width={isNonMobileScreens ? "60%" : "100%"} />
    </MainLayout>
  );
};

export default HomePage;
