import { alpha, styled } from "@mui/material/styles";
import Card from "@mui/material/Card";

const RootStyled = styled(Card)(({ theme }) => ({
  height: 230,
  "& .MuiButtonBase-root": {
    height: "100%",
    display: "flex",
    alignItems: "start",
  },
}));
export default RootStyled;