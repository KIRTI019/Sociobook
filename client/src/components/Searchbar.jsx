import { Box, InputBase, useMediaQuery } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const SearchBar = ({ setSearchQuery, onSearch }) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const isNonMobileScreen = useMediaQuery("(min-width: 850px)");

  const handleChange = (e) => {
    setQuery(e.target.value);
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(query);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    setQuery("");
    setOpen(false);
    e.stopPropagation();
  };

  return (
    <Box
      sx={{
        display: "flex",
        border: "1px solid black",
        borderRadius: "20px",
        p: isNonMobileScreen ? "0 1rem" : "0 20px",
        width: isNonMobileScreen ? "auto" : "35%",
        alignItems: "center",
      }}
      onClick={handleOpen}
    >
      {!open && (
        <SearchIcon
          sx={{
            m: isNonMobileScreen ? "5px 0.5rem" : "5px 0.4rem 5px -10px",
            cursor: "pointer"
          }}
        />
      )}
      <InputBase
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        sx={{ flex: 1 }}
      />
      {open && (
        <Box onClick={handleClose} sx={{ m: isNonMobileScreen ? "5px 0.5rem 0 0" : "5px 0.4rem 0 -10px", cursor: "pointer" }}>
          <CloseIcon />
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;
