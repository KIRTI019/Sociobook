import { Box, Typography, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

const Message = ({ messages }) => {
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 850px)");

  return (
    <Box
      sx={{
        flexGrow: 1,
        overflowY: "scroll",
        p: 2,
        zIndex: 1000,
        height: isNonMobileScreens ? "75%" : "55%",
        position: "absolute",
        width: isNonMobileScreens ? "67%" : "100%",
        right: 0, 
        mt: isNonMobileScreens ? "5%" : "0"
      }}
    >
      {messages.map((msg, index) => {
        const isSender = msg.sender === user._id;

        return (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: isSender ? "flex-end" : "flex-start",
              mb: 2,
            }}
          >
            <Box
              sx={{
                maxWidth: "60%",
                p: 2,
                borderRadius: "8px",
                backgroundColor: isSender ? "skyblue" : "lightgray",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ mb: 1 }}>{msg.content}</Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default Message;
