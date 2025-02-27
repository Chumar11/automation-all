import Button from "@mui/material/Button";
import { styled, alpha } from "@mui/material/styles";

const RootStyled = styled(Button)(({ theme }) => ({
  fontSize: 14,
  "&.active": {
    background: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    ),
  },
  "& .MuiButton-startIcon": {
    transform: theme.direction === "rtl" ? "rotate(180deg)" : "rotate(0deg)",
    margin: theme.direction === "rtl" ? "0 10px 0 0px" : "0 0 0 10px",
  },
}));
export default RootStyled;
