import { Box, Typography, useMediaQuery } from '@mui/material';

const Logo = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 850px)");

  return (
    <Box sx={{ cursor: "pointer" }}>
      <Typography fontWeight="700" fontSize={isNonMobileScreens ? "1.8rem" : "150%"} sx={{ color: "#2196f3" }}>
        Sociobook
      </Typography>
    </Box>
  );
};

export default Logo;
