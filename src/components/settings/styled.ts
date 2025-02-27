import { styled } from "@mui/material/styles";

const RootStyled = styled("div")(({ theme }) => ({
  "& .motion-wrapper": {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    width: 300,
    zIndex: 100000,
    height: "100%",
    overflow: "auto",
    borderLeft: `1px solid ${theme.palette.divider}`,
    background: theme.palette.background.default,
    "& .language-wrapper": {
      gap: "12px",
      display: "none",
    },
    "& .mode-wrapper": {
      marginTop: "0px!important",
    },
    "& .logout-wrapper": {
      marginTop: theme.spacing(2),
      "& .MuiButton-startIcon": {
        transform:
          theme.direction === "rtl" ? "rotate(180deg)" : "rotate(0deg)",
        margin: theme.direction === "ltr" ? "0 10px 0 0px" : "0 0 0 10px",
      },
    },
  },
  [theme.breakpoints.down("md")]: {
    "& .language-wrapper": {
      display: "flex",
    },
    "& .mode-wrapper": {
      marginTop: "0px!important",
    },
  },
}));
export default RootStyled;
