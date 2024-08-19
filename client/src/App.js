import { CssBaseline } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import routes from "./routes/routes";
import LoginPage from "./pages/LoginPage";

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
