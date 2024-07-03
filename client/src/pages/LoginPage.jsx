import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Logo from "../components/Logo";
import Form from "../components/Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 750px)");

  return (
    <Box
      backgroundColor={theme.palette.background.alt}
      width={isNonMobileScreens ? "50%" : "93%"}
      p="1rem 6%"
      textAlign="center"
      m="6rem auto"
      borderRadius="10px"
    >
      <Logo />
      <Box m="1.5rem 0">
        <Typography fontWeight="500" variant="h7">
          Welcome to Socipedia, the Social Media for Sociopaths!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
