import { Typography, useMediaQuery, useTheme } from '@mui/material';

const Logo = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 750px)");

  return (
    <Typography fontWeight="700" fontSize={isNonMobileScreens ? "1.8rem" : "0.8rem"} sx={{ color: theme.palette.primary.main }}>
      Sociobook
    </Typography>
  );
};

export default Logo;