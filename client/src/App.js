import { Box, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import routes from "./routes/routes";
import LoginPage from "./pages/LoginPage";
import themeConfigs from "./configs/theme.config";
import Sidebar from "./components/Sidebar";

function App() {
  const { themeMode } = useSelector((state) => state.themeMode);
  const isAuth = Boolean(useSelector((state) => state.token));
  const isNonMobileScreens = useMediaQuery("(min-width: 750px)");

  return (
    <BrowserRouter>
      <ThemeProvider theme={themeConfigs.custom({ themeMode })}>
        <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            {routes.map((menu, index) => (
              <Route
                key={index}
                path={menu.path}
                element={isAuth ? menu.element : <Navigate to="/" />}
              />
            ))}
          </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
