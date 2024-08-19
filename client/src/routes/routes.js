import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import SearchPage from "../pages/SearchPage";
import ChatPage from "../pages/ChatPage";

const routes = [
  {
    path: "/home",
    element: <HomePage />,
    state: "home",
  },
  {
    path: "/:userId",
    element: <ProfilePage />,
    state: "profile",
  },
  {
    path: "/search",
    element: <SearchPage />,
    state: "search",
  },
  {
    path: "/message",
    element: <ChatPage />,
    state: "chat",
  },
];

export default routes;
