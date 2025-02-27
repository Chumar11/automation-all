// ----------------------------------------------------------------------
import { alpha } from "@mui/material/styles";
export default function Skeleton(theme) {
  return {
    MuiSkeleton: {
      defaultProps: {
        animation: "wave",
      },

      styleOverrides: {
        root: {
          backgroundColor: theme.palette.background.neutral,
          "&::after": {
            backgroundImage: `linear-gradient(90deg, transparent, ${alpha(
              theme.palette.grey[500],
              0.1
            )}, transparent)`,
          },
        },
      },
    },
  };
}
