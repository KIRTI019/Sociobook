import { Box, Paper, useMediaQuery } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Logo from "../components/Logo";
import SearchBar from "../components/Searchbar";
import CreateForm from "../components/CreateForm";  
import { useState } from "react";

const MainLayout = ({ children }) => {
  const isNonMobileScreens = useMediaQuery("(min-width: 850px)");
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        display: isNonMobileScreens ? "flex" : "block",
        height: "100vh",
        position: 'relative',
      }}
    >
      {!isNonMobileScreens && (
        <Paper sx={{ display: "flex", justifyContent: "space-between", p: "3% 5%" }}>
          <Logo />
          <SearchBar />
        </Paper>
      )}
      <Box
        sx={{
          width: isNonMobileScreens ? "20%" : "",
          height: "100%",
          display: isNonMobileScreens ? "" : "none",
        }}
      >
        <Sidebar open={open} setOpen={setOpen} />
      </Box>
      <Box sx={{ p: isNonMobileScreens ? "0 0 0 10%" : "", flexGrow: 1 }}>
        {children}
      </Box>
      {!isNonMobileScreens && (
        <Navbar setOpen={setOpen} />
      )}
      {open && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <Box
            sx={{
              width: isNonMobileScreens ? 400 : 300,
              bgcolor: 'background.paper',
              p: 4,
              borderRadius: 2,
              boxShadow: 24,
            }}
          >
            <CreateForm open={open} setOpen={setOpen} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MainLayout;
