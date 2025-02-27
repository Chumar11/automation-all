import AppBar from "@mui/material/AppBar";
import { styled, alpha } from "@mui/material/styles";

const RootStyled = styled(AppBar)(({ theme }) => ({
  // boxShadow: "none",
  top: -1,
  background: theme.palette.background.paper,
  // borderTop: `1px solid ${theme.palette.divider}`,
  // borderBottom: `1px solid ${theme.palette.divider}`,
  borderLeftWidth: 0,
  borderLeftRight: 0,
  position: "relative",
  display: "block",
  "& .toolbar": {
    justifyContent: "space-between",
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
    background: theme.palette.background.paper,
    padding: theme.spacing(0, 3),
  },
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));
export default RootStyled;
