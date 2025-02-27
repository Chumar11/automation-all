import { styled, Switch, SwitchProps } from "@mui/material";
import React from "react";
import { themColor } from "../theme/themColor";
import { SettingsInterface } from "../types/settings";

interface IoProps extends SwitchProps {
  state: SettingsInterface;
  setState: React.Dispatch<React.SetStateAction<any>>;
  handleNew?: boolean;
  conditionType: "customCss" | "closeButton" |"googleanalytical" |"attention"; // Add a new prop to specify the condition type
}

export const IOSSwitch: React.FC<IoProps> = ({
  state,
  setState,
  handleNew,
  conditionType,
  ...props
}) => {
  const handleChange = () => {
    if (typeof handleNew === "boolean") {
      if (conditionType === "customCss") {
        setState({
          ...state,
          widgetcustomization: {
            ...state.widgetcustomization,
            customCss: !handleNew,
          },
        });
      } else if (conditionType === "closeButton") {
        setState({
          ...state,
          widgetcustomization: {
            ...state.widgetcustomization,
            closeButton: !handleNew,
          }
        });
      }  else if(conditionType === "googleanalytical") {

        setState({
          ...state,
          widgetcustomization: {
            ...state.widgetcustomization,
            googleAnalytics: !handleNew,
          }
        });
            
      } else if(conditionType === "attention") {
        setState({
          ...state,
          widgetcustomization: {
            ...state.widgetcustomization,
            animationCustom: !handleNew,
          }
        });
            
      }
    }
  };

  console.log("button", handleNew);
  const CustomSwitch = styled(Switch)(({ theme }) => ({
    width: 40,
    height: 22.5,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 3.4,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor: themColor.primary,
          opacity: 1,
          border: 0,
          ...theme.applyStyles("dark", {
            backgroundColor: themColor.vibrantGreen,
          }),
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: themColor.freshGreen,
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color: theme.palette.grey[100],
        ...theme.applyStyles("dark", {
          color: theme.palette.grey[600],
        }),
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.7,
        ...theme.applyStyles("dark", {
          opacity: 0.3,
        }),
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 16,
      height: 16,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: themColor.lightGray,
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
      ...theme.applyStyles("dark", {
        backgroundColor: themColor.darkGray,
      }),
    },
  }));

  return (
    <CustomSwitch {...props} checked={handleNew} onChange={handleChange} />
  );
};
