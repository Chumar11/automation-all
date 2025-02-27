import RadioGroup from "@mui/material/RadioGroup";
import { styled, alpha } from "@mui/material/styles";

const RootStyled = styled(RadioGroup)(({ theme }) => ({
  "& .color-paper": {
    borderRadius: "50%",
    width: "52px",
    height: "52px!important",
    border: `solid 2px transparent`,
  },
  "& .action-box": {
    height: 48,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& .color-box": {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      transform: "rotate(-45deg)",
      transition: theme.transitions.create("all", {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter,
      }),
    },
  },
  "& .label": {
    top: 0,
    margin: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
  },
}));
export default RootStyled;
