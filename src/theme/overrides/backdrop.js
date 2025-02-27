import { alpha } from "@mui/material/styles";
export default function Backdrop(theme) {
  return {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
          backgroundColor: alpha(theme.palette.background.paper, 0.72),
          "&.MuiBackdrop-invisible": {
            background: "transparent",
          },
        },
      },
    },
  };
}
