import { Box, Paper, Typography, useMediaQuery } from "@mui/material";
import Logo from "../components/Logo";
import Form from "../components/Form";

const LoginPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 850px)");

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center", 
        backgroundColor: "#f0f0f0", 
        minHeight: "100vh"
      }}
    >
      <Paper
        sx={{
          width: isNonMobileScreens ? "50%" : "93%",
          p: "1rem 6%",
          textAlign: "center",
          borderRadius: "10px",
          mt: "5%"
        }}
        elevation={3}
      >
        <Logo />
        <Box m="1.5rem 0">
          <Typography fontWeight="500" variant="h6">
            Welcome to Socipedia, the Social Media for Sociopaths!
          </Typography>
          <Form />
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
