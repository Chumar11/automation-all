import React from "react";
import { Switch, SwitchProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { themColor } from "@/src/theme/themColor";
// import { themColor } from '@/src/theme/themColor';

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 40,
  height: 24,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        background: themColor.primary,
        opacity: 1,
        border: 0,
        ...(theme.palette.mode === "dark" && {
          backgroundColor: themColor.vibrantGreen,
        }),
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: themColor.freshGreen,
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme.palette.grey[100],
      ...(theme.palette.mode === "dark" && {
        color: theme.palette.grey[600],
      }),
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.7,
      ...(theme.palette.mode === "dark" && {
        opacity: 0.3,
      }),
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    marginTop: "2px",
    marginLeft: "3px",
    width: 15,
    height: 15,
  },
  "& .MuiSwitch-track": {
    borderRadius: 13,
    backgroundColor: themColor.lightGray,
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
    ...(theme.palette.mode === "dark" && {
      backgroundColor: themColor.darkGray,
    }),
  },
}));

export default IOSSwitch;
