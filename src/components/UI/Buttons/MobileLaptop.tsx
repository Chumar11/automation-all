import { themColor } from "@/src/theme/themColor";
import { Laptop, PhoneAndroid } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";

export default function MobileLaptop({ ...props }) {
  const { showOnDesktop, showOnMobile, Desktop, Mobile } = props;
  return (
    <>
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{
          fontSize: {
            lg: "12px",
            md: "10px",
            sm: "12px",
          },
        }}
      >
        Show on
      </Typography>
      <Box
        sx={{
          display: "flex",
          border: `1px solid ${themColor.neutral}`,
          borderRadius: "4px",
          alignItems: "center",
          height: "30px",
        }}
      >
        <IconButton
          onClick={() => Desktop()}
          sx={{
            height: "100%",
            borderRadius: "2px",
            backgroundColor: !showOnDesktop ? themColor.snow : themColor.white,
          }}
          disableRipple
        >
          <Laptop
            sx={{
              fontSize: {
                lg: "20px",
                md: "16px",
                sm: "18px",
              },
              fill: !showOnDesktop ? themColor.ghost : themColor.primary,
            }}
          />
        </IconButton>
        <Box
          sx={{
            width: "1px",
            height: "100%",
            backgroundColor: themColor.neutral,
          }}
        />
        <IconButton
          onClick={() => Mobile()}
          sx={{
            height: "100%",
            borderRadius: "2px",
            backgroundColor: !showOnMobile ? themColor.snow : themColor.white,
          }}
          disableRipple
        >
          <PhoneAndroid
            sx={{
              fontSize: {
                lg: "20px",
                md: "16px",
                sm: "18px",
              },
              fill: !showOnMobile ? themColor.ghost : themColor.primary,
            }}
          />
        </IconButton>
      </Box>
    </>
  );
}
