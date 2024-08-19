import { Box, Button, IconButton, Typography, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Dropzone from "react-dropzone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { backendDomain } from "../common";
import { useSelector } from "react-redux";
import uploadImageToCloudinary from "../helper/uploadImage.js";
import { useState } from "react";

const CreateForm = ({ open, setOpen }) => {
  const [data, setData] = useState({
    userId: "",
    displayName: "",
    picturePath: [],
    userPicturePath: "",
    description: "",
  });
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const pictureUrl = await uploadImageToCloudinary(data.picture);

      const postData = {
        userId: user._id,
        description: data.description,
        picturePath: pictureUrl.url,
      };

      const response = await fetch(`${backendDomain}/posts/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create post");
      }

      const result = await response.json();
      setData({
        userId: "",
        displayName: "",
        picturePath: [],
        userPicturePath: "",
        description: "",
      });
      handleClose();
    } catch (error) {
      console.error("Failed to create post", error);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: "1rem",
          }}
        >
          <Typography variant="h6">Create Post</Typography>
          <IconButton onClick={handleClose} sx={{ mt: "-2%" }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box border={`1px solid`} borderRadius="5px" p="1rem" sx={{ mb: 2 }}>
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png,.mp4,.mov,.avi"
            multiple={false}
            onDrop={(acceptedFiles) => {
              setData((prevData) => ({
                ...prevData,
                picture: acceptedFiles[0],
              }));
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <Box
                {...getRootProps()}
                border={`2px dashed`}
                p="1rem"
                sx={{ "&:hover": { cursor: "pointer" } }}
              >
                <input {...getInputProps()} />
                {!data.picture ? (
                  <Typography>Add Picture Here</Typography>
                ) : (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography>{data.picture.name}</Typography>
                    <EditOutlinedIcon />
                  </Box>
                )}
              </Box>
            )}
          </Dropzone>
        </Box>
        <TextField
          name="description"
          placeholder="Description"
          value={data.description}
          onChange={handleOnChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default CreateForm;
