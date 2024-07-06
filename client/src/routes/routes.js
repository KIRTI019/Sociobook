import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";

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
];

export default routes;
