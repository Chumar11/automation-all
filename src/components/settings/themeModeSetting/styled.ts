import RadioGroup from "@mui/material/RadioGroup";
import { styled } from "@mui/material/styles";

const RootStyled = styled(RadioGroup)(({ theme }) => ({
  "& .main-paper": {
    width: "100%",
    zIndex: 0,
    overflow: "hidden",
    position: "relative",
    "& .button": {
      display: "block",
      height: 94,
      "& .MuiButton-startIcon": {
        margin: "0 auto",
      },
    },
    "& .label": {
      top: 0,
      margin: 0,
      left: 0,
      width: "100%",
      height: "100%",
      position: "absolute",
      cursor: "pointer",
      "&.active": {
        cursor: "initial",
      },
    },
  },
}));
export default RootStyled;
