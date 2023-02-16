import {styled} from "@mui/system";
import {Box} from "@mui/material";

export const Wrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  maxWidth: "900px",
  padding: "0 25px",
  margin: "25px auto"
});

export const ButtonsWrap = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  borderBottom: "1px solid rgb(228, 228, 228)"
});

export const TextWrap = styled(Box)({
  textAlign: "start",
  marginTop: "50px",
  cursor: "pointer",
  ":hover": {
    backgroundColor: "lightgray"
  }
});

export const BlockWrap = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  width: "100%"
});
