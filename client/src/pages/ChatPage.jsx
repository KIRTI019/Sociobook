import {
  Box,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MainLayout from "../components/MainLayout";
import { useState } from "react";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import Member from "../components/Member";
import UserChat from "../components/UserChat";
import { backendDomain } from "../common/index";

const ChatPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 850px)");
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const token = useSelector((state) => state.token);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `${backendDomain}/users/search?search=${searchQuery}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setSearchResults(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <MainLayout>
      <Box
        sx={{ display: "flex", position: "relative", ml: isNonMobileScreens ? "-14%" : "" }}
      >
        <Member setOpenSearch={setOpenSearch} setUser={setSelectedUser} member={selectedUser} />
        {selectedUser && <UserChat friend={selectedUser} /> }
        {openSearch && (
          <Paper
            sx={{
              position: "absolute",
              zIndex: 1005,
              backgroundColor: "white",
              m: "15% 30%",
              width: "40%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                p: "5% 5% 2% 5%",
                justifyContent: "space-between",
              }}
            >
              <Typography>New Message</Typography>
              <IconButton
                sx={{ mt: "-1.5%" }}
                onClick={() => setOpenSearch(false)}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <Divider />

            <Box sx={{ display: "flex", p: "2% 5%" }}>
              <Typography sx={{ mt: "0.5%" }}>To: </Typography>
              <InputBase
                sx={{ ml: "5%" }}
                placeholder="Search..."
                value={searchQuery}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
            </Box>
          </Paper>
        )}
      </Box>
    </MainLayout>
  );
};

export default ChatPage;
