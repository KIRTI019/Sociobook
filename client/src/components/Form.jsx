import { useState } from "react";
import {
  Box,
  Button as MUIButton,
  TextField,
  Typography,
  useTheme,
  Stack,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../redux/authSlice.js";
import Dropzone from "react-dropzone";
import { backendDomain } from "../common/index.js";
import uploadImageToCloudinary from "../helper/uploadImage.js";
import Button from "./Button";

const registerSchema = yup.object().shape({
  userName: yup.string().required("required"),
  displayName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  picture: yup.mixed(),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  userName: "",
  displayName: "",
  email: "",
  password: "",
  picture: null,
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    try {
      const pictureUrl = await uploadImageToCloudinary(values.picture);

      const formData = {
        ...values,
        picturePath: pictureUrl.url,
      };

      const savedUserResponse = await fetch(`${backendDomain}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!savedUserResponse.ok) {
        const error = await savedUserResponse.json();
        console.error("Error response from backend:", error);
        throw new Error(error.message);
      }

      const savedUser = await savedUserResponse.json();
      onSubmitProps.resetForm();

      if (savedUser) {
        setPageType("login");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch(`${backendDomain}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!loggedInResponse.ok) {
      const error = await loggedInResponse.json();
      console.error("Error logging in:", error);
      return;
    }

    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      onSubmit={handleFormSubmit}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
          <Box>
            {isRegister && (
              <>
                <Stack spacing={3}>
                  <TextField
                    name="userName"
                    placeholder="User Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.userName}
                    error={
                      Boolean(touched.userName) && Boolean(errors.userName)
                    }
                    helperText={touched.userName && errors.userName}
                  />
                  <TextField
                    name="displayName"
                    placeholder="Display Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.displayName}
                    error={
                      Boolean(touched.displayName) &&
                      Boolean(errors.displayName)
                    }
                    helperText={touched.displayName && errors.displayName}
                  />
                  <TextField
                    name="email"
                    placeholder="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <TextField
                    name="password"
                    placeholder="Password"
                    type="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    error={
                      Boolean(touched.password) && Boolean(errors.password)
                    }
                    helperText={touched.password && errors.password}
                  />
                  <Box
                    gridColumn="span 4"
                    border={`1px solid black`}
                    borderRadius="5px"
                    p="1rem"
                  >
                    <Dropzone
                      acceptedFiles=".jpg,.jpeg,.png"
                      multiple={false}
                      onDrop={(acceptedFiles) =>
                        setFieldValue("picture", acceptedFiles[0])
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          border={`2px dashed ${palette.primary.main}`}
                          p="1rem"
                          sx={{ "&:hover": { cursor: "pointer" } }}
                        >
                          <input {...getInputProps()} />
                          {!values.picture ? (
                            <p>Add Picture Here</p>
                          ) : (
                            <Box>
                              <Typography>{values.picture.name}</Typography>
                              <EditOutlinedIcon />
                            </Box>
                          )}
                        </Box>
                      )}
                    </Dropzone>
                  </Box>
                </Stack>
              </>
            )}
            {isLogin && (
              <>
                <Stack spacing={3}>
                  <TextField
                    name="email"
                    placeholder="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <TextField
                    name="password"
                    placeholder="Password"
                    type="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    error={
                      Boolean(touched.password) && Boolean(errors.password)
                    }
                    helperText={touched.password && errors.password}
                  />
                </Stack>
              </>
            )}
          </Box>

          {/* BUTTONS */}
          <Box sx={{ mt: "5%" }}>
          <Button
            width="100%"
            type="submit"
            text={isLogin ? "Sign In" : "Sign Up"}
          />
          </Box>

          <Typography>
            {isLogin ? "Don't have an account?" : "Already have an account?"}

            <MUIButton
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </MUIButton>
          </Typography>
        </form>
      )}
    </Formik>
  );
};

export default Form;
