import { Box, Paper, useMediaQuery } from "@mui/material";
import { useState } from "react";
import Logo from "../components/Logo";
import SearchBar from "../components/Searchbar";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { backendDomain } from "../common";

const SearchPage = () => {
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 750px)");
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    try {
      const response = await fetch(`${backendDomain}/users/search?query=${encodeURIComponent(searchQuery)}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <Box
      sx={{ display: isNonMobileScreens ? "flex" : "block", height: "100vh", position: 'relative' }}
    >
    {!isNonMobileScreens && (
      <Paper sx={{ display: "flex", justifyContent: "space-between", p: "3% 5%" }}>
        <Logo />
        <SearchBar  />
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

      <Box sx={{ p: isNonMobileScreens ? "5% 20%" : "", flexGrow: 1 }}>
        <SearchBar onSearch={handleSearch} setSearchQuery={setSearchQuery} />
      </Box>

      {!isNonMobileScreens && (
        <Navbar open={open} setOpen={setOpen} />
      )}
    </Box>
  );
}

export default SearchPage;
