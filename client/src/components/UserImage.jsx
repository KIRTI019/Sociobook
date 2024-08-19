import { Box, Avatar } from "@mui/material";

const UserImage = ({ image, width, height }) => {
  return (
    <Box width={width} height={height}>
      <Avatar sx={{
        width: {width},
        height: {height}
      }}
        alt="user"
        src={`${image}`}
      />
    </Box>
  );
};

export default UserImage;