import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
const RootStyled = styled(Box)(({ theme }) => ({
  color: theme.palette.common.white,
  padding: theme.spacing(3, 1.5),
  textAlign: "center",
  "& .MuiList-root ": {
    "& .list-item": {
      marginBottom: theme.spacing(2),
      "& .MuiButtonBase-root": {
        padding: theme.spacing(1.3, 2),
        borderRadius: "8px",
        "&:hover": {
          background: "rgb(145 158 171 / 35%)",
          borderRadius: "8px",
        },
      },
      "&.active": {
        // borderRight: `4px solid ${theme.palette.primary.main}`,
        // background: theme.palette.primary.main,
        background: "#f0f5fb",
        borderRadius: "8px",
      },
    },
  },
}));
export default RootStyled;
