import { Box, InputBase, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

const SearchBar = ({ setSearchQuery, onSearch }) => {
  const [query, setQuery] = useState("");
  const isNonMobileScreen = useMediaQuery("(min-width: 850px)");

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(query);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(query);
    }
  }

  return (
    <Box 
      sx={{
        display: "flex",
        border: "1px solid black",
        borderRadius: "20px",
        p: isNonMobileScreen ? "0 1rem" : "0 8px",
        width: isNonMobileScreen ? "auto" : "35%"
      }}
    >
      <SearchIcon 
        sx={{
          mt: "5px",
          mr: isNonMobileScreen ? "0.9rem" : "0.4rem"
        }} 
      />
      <InputBase 
        value={query} 
        onChange={handleChange} 
        onKeyDown={handleKeyDown} 
      />
    </Box>
  )
}

export default SearchBar;
