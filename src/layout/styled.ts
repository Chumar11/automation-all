import { styled } from "@mui/material/styles";

const RootStyled = styled("div")(({ theme }) => ({
  "& .layout-main": {
    background: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    position: "fixed",
    top: 130,
    right: -1,
    padding: "3px 8px 3px 3px",
    borderRadius: "27px 0 0 27px",
    zIndex: 100,
  },
  "& .layout-children": {
    marginBottom: theme.spacing(0),
  },
  "& .children-height": {
    height: 0,
  },
  "& .fab-btn": {
    background: theme.palette.success.main,
    color: "#fff",
    position: "fixed",
    bottom: 20,
    left: 20,
    zIndex: 100,
    "&.active": {
      right: 20,
    },
    "&:hover": {
      background: theme.palette.success.dark,
    },
    svg: {
      fontSize: 40,
    },
    display: "flex",
  },
  [theme.breakpoints.down("md")]: {
    "& .layout-main": {
      top: 70,
    },
    "& .layout-children": {
      marginBottom: theme.spacing(6),
    },
    "& .children-height": {
      height: 40,
    },
    "& .fab-btn": {
      display: "none",
    },
  },
}));
export default RootStyled;
