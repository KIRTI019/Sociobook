import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 750px)");

  return (
    <Box onClick={() => navigate("/home")} sx={{ cursor: "pointer" }}>
      <Typography fontWeight="700" fontSize={isNonMobileScreens ? "1.8rem" : "150%"} sx={{ color: theme.palette.primary.main }}>
      Sociobook
    </Typography>
    </Box>
  );
};

export default Logo;