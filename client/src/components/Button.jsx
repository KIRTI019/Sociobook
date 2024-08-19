import { Button as MUIButton } from "@mui/material";

const CustomButton = ({ text, click, width, type }) => {

  return (
    <MUIButton
    type={type}
    sx={{
      backgroundColor: "black",
      color: "white",
      width: {width},
      p: "10px",
      "&: hover": { backgroundColor: "black" }
    }}
      onClick={click}
    >
      {text}
    </MUIButton>
  );
};

export default CustomButton;
