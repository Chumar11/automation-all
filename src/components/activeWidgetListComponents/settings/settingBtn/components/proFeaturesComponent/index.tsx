import { Box, Button, Typography } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { themColor } from "@/src/theme/themColor";

const ProFeaturesComponent: React.FC = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center", // Fixed typo: "alignItems" instead of "alignItem"
      paddingX: "20px",
      flexDirection: "column",
      gap: "30px",
    }}
  >
    <Typography
      variant="body1"
      sx={{
        fontSize: ".875rem",
        color: themColor.secondary,
        textAlign: "center",
      }}
    >
      Enjoy this awesome feature and many more with our pro plan
    </Typography>
    <Button sx={upgradeButtonStyles}>
      Upgrade Now
      <ArrowForward />
    </Button>
  </Box>
);

const upgradeButtonStyles = {
  fontWeight: "400",
  height: "28px",
  paddingLeft: "10px",
  paddingRight: "10px",
  backgroundColor: themColor.primary,
  color: themColor.white,
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: "#9565d0",
  },
};

export default ProFeaturesComponent;
