import { Box, InputBase, Paper, Typography, IconButton, useMediaQuery } from "@mui/material";
import UserImage from "./UserImage";
import { useEffect, useState } from "react";
import { backendDomain } from "../common";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import uploadImageToCloudinary from "../helper/uploadImage.js";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import SendIcon from "@mui/icons-material/Send";
import io from "socket.io-client";
import Message from "./Message.jsx";

// Initialize the socket connection
const socket = io(backendDomain);

const UserChat = ({ friend }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 850px)");
  const navigate = useNavigate();

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${backendDomain}/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId: user._id,
          receiverId: friend._id,  
        }),
      });
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" && !selectedFile) return;

    let content = newMessage;
    if (selectedFile) {
      content = await uploadImageToCloudinary(selectedFile);
    }

    try {
      const response = await fetch(`${backendDomain}/message/send-message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: user._id,
          receiver: friend._id,
          content,
        }),
      });

      const data = await response.json();

      socket.emit("new message", data);

      setMessages((prevMessages) =>
        Array.isArray(prevMessages) ? [...prevMessages, data] : [data]
      );

      setNewMessage("");
      setSelectedFile(null);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    if (friend) {
      fetchMessages();
      socket.emit("join chat", friend._id); 
    }

    socket.on("message received", (newMessageReceived) => {
      setMessages((prevMessages) =>
        Array.isArray(prevMessages) ? [...prevMessages, newMessageReceived] : [newMessageReceived]
      );
    });

    return () => {
      socket.off("message received");
      socket.emit("leave chat", friend._id); 
    };
  }, [friend, newMessage]);

  return (
    <Box sx={{ height: "100vh", width: "100%" }}>
      {friend && (
        <Box>
          <Paper
            sx={{
              height: "10vh",
              display: "flex",
              p: "2%",
              gap: "20px",
              alignItems: "center",
              right: 0,
              width: isNonMobileScreens ? "68%" : "100%", 
              position: isNonMobileScreens ? "absolute" : "static",
              zIndex: 1005
            }}
          >
            <UserImage image={friend?.picturePath} height="40px" width="40px" />
            <Typography sx={{ textTransform: "uppercase", fontWeight: 550 }} onClick={() => navigate(`/${friend?._id}`)}>
              {friend?.userName}
            </Typography>
          </Paper>

          <Message messages={messages} />

            <Box sx={{ zIndex: 1005, }}>
            <Box
              sx={{
                bottom: isNonMobileScreens ? 20 : 70,
                position: "fixed",
                px: 2,
                width: isNonMobileScreens ? "50%" : "95%",
                border: "1px solid black",
                borderRadius: "20px",
                py: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mx: "2%",
                right: 0
              }}
            >
              <InputBase
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                sx={{ flexGrow: 1 }}
              />

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Dropzone
                  onDrop={(acceptedFiles) => setSelectedFile(acceptedFiles[0])}
                  multiple={false}
                >
                  {({ getRootProps, getInputProps }) => (
                    <Box {...getRootProps()}>
                      <input {...getInputProps()} />
                      <InsertPhotoOutlinedIcon />
                    </Box>
                  )}
                </Dropzone>

                <IconButton onClick={handleSendMessage}>
                  <SendIcon />
                </IconButton>
              </Box>
            </Box>
            </Box>
        </Box>
      )}
    </Box>
  );
};

export default UserChat;
