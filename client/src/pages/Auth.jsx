import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Logo from "../components/Logo";
import Form from "../components/Form";

const Auth = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box
    width={isNonMobileScreens ? "600px" : "93%"}
    backgroundColor={theme.palette.background.alt}
    p="1rem 6%"
    textAlign="center"
    m="6rem auto"
    borderRadius="10px"
    >
      <Box>
        <Logo />
      </Box>
      <Box m="1.5rem 0">
        <Typography fontWeight="500" variant="h7" color="white">
        Welcome to Socipedia, the Social Media for Sociopaths!
        </Typography>
      </Box>
      <Form />
    </Box>
  )
}

export default Auth