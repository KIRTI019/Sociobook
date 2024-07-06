import {
  Box,
  Button,
  InputBase,
  Paper,
  Typography,
  useTheme,
  IconButton,
  useMediaQuery,
  Divider,
} from "@mui/material";
import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";
import UserImage from "./UserImage";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import { setPosts } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [post, setPost] = useState("");
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [typing, setTyping] = useState(false);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const response = await fetch(`http://localhost:3001/posts`, {
      mode: 'cors',
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: formData,
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
    setImage(null);
    setPost("");
    navigate("/home");
  };

  const handleClose = async () => {
    navigate("/home");
  };
  
  return (
    <Box
      sx={{
        width: "550px",
        backgroundColor: "theme.palette.background.alt",
        m: "6rem auto"
      }}
    >
      <Paper sx={{
        borderRadius: "10px"
      }}>
        <IconButton onClick={handleClose} sx={{
          "&: hover": {
            backgroundColor: "transparent"
          },
          ml: "1.25rem"
        }}>
          <ClearIcon />
        </IconButton>
        <Box display="flex" mt="1rem" ml="1.5rem">
          <UserImage image={picturePath} width="40px" height="40px" />
          <InputBase
            placeholder="What's on your mind..."
            onChange={(e) => setPost(e.target.value)}
            value={post}
            sx={{
              mt: "-0.25rem",
              ml: "1rem",
              width: "450px"
            }}
            multiline= "true"
            maxRows={4}
          />
        </Box>
        {isImage && (
          <Box>
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => (
                <Box>
                  <Box
                    {...getRootProps()}
                    border={`2px dashed black`}
                    p="1rem"
                    width="100%"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!image ? (
                      <p>Add Image Here</p>
                    ) : (
                      <Box>
                        <Typography>{image.name}</Typography>
                        <EditOutlined />
                      </Box>
                    )}
                  </Box>
                  {image && (
                    <IconButton
                      onClick={() => setImage(null)}
                      sx={{ width: "15%" }}
                    >
                      <DeleteOutlined />
                    </IconButton>
                  )}
                </Box>
              )}
            </Dropzone>
          </Box>
        )}
        <Divider sx={{ margin: "1.25rem 0" }} />

        <Box display="flex" gap="0.5rem" ml="1rem">
          <Box onClick={() => setIsImage(!isImage)}>
            <ImageOutlined />
          </Box>
          {isNonMobileScreens ? (
            <>
              <GifBoxOutlined />
              <AttachFileOutlined />
              <MicOutlined />
            </>
          ) : (
            <Box gap="0.25rem">
              <MoreHorizOutlined />
            </Box>
          )}
          <Button
            sx={{
              borderRadius: "3rem",
              ml: "21rem",
              mb: "0.75rem",
            }}
            onClick={handlePost}
          >
            Post
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default Create