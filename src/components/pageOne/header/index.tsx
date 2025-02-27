import React from "react";
import { Box, Typography } from "@mui/material";
import { themColor } from "@/src/theme/themColor";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => (
  <Box
    sx={{
      opacity: 1,
      padding: "15px 30px",
      borderBottom: `1px solid ${themColor.ghost}`,
      backgroundColor: "#fff",
      position: "sticky",
      top: 0,
      zIndex: 2,
    }}
  >
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Typography
        color={themColor.secondary}
        sx={{
          fontSize: {
            xs: "1rem",
            sm: "1.5rem",
          },
          fontWeight: "400",
        }}
      >
        <strong>Step 1:</strong> {title}
      </Typography>
    </Box>
  </Box>
);

export default Header;
