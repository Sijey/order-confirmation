import {styled} from "@mui/system";
import {Box, Button} from "@mui/material";

export const Wrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  maxWidth: "900px",
  padding: "0 25px",
  margin: "25px auto"
});

export const ButtonsWrap = styled(Box)<{ ismobile }>(
  ({ ismobile }) => {
    return {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      borderBottom: "1px solid rgb(228, 228, 228)",
      flexDirection: ismobile ? "column" : "row"
    }
});

export const TextWrap = styled(Box)({
  textAlign: "start",
  marginTop: "50px",
  cursor: "pointer",
  padding: "10px",
  ":hover": {
    backgroundColor: "lightgray"
  }
});

export const BlockWrap = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  width: "100%"
});

export const CustomButton = styled(Button)<{ bgcolor: string }>(
  ({ bgcolor }) => {
    return {
      backgroundColor: bgcolor,
    };
  }
);
