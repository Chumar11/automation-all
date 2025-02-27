import { Box, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import React, { useEffect } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Typo } from "../Typography";
import { StyledButton } from "@/src/utils/StyledButton";
// import { themColor } from "@/src/theme/themColor";
import NewToolTip from "../../newToolTip";
import { NewSvg } from "../../svg";
import { themColor } from "@/src/theme/themColor";
interface SizeProps {
  click1: boolean;
  selectedMobileButton3: string;
  setSelectedMobileButton3: React.Dispatch<React.SetStateAction<string>>;
  setClick1: React.Dispatch<React.SetStateAction<boolean>>;
  state: any;
  setState: React.Dispatch<React.SetStateAction<any>>;
}
export const MobileWidgetSize: React.FC<SizeProps> = ({
  setState,
  state,
  click1,
  setClick1,
  selectedMobileButton3,
  setSelectedMobileButton3,
}) => {
  console.log("selectedMobileButton3", selectedMobileButton3);
  const handleButtonClick = (btn: string) => {
    setClick1(false);
    if (btn === "Custom") {
      setClick1(true);
    }
    setSelectedMobileButton3(btn);
    setState({
      ...state,
      widgetcustomization: {
        ...state.widgetcustomization,
        MobileWidgetSize: btn,
      },
    });
  };

  const SizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value.trim()); // Get the trimmed value
    // Set customSize to 0.5 if the value is empty or equal to "0", otherwise convert to a number
    // const customSize = value === "" || value === "0" ? 0.5 : Number(value);
    const customSize = Math.min(Math.max(value, 33), 65);
    console.log("🚀 ~ SizeChange ~ customSize:", customSize);

    setState({
      ...state,
      widgetcustomization: {
        ...state.widgetcustomization,
        customMobileSize: customSize,
      },
    });
  };

  const Size = state?.widgetcustomization?.customMobileSize;
  console.log("🚀 ~ Size:", Size);

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typo tittle={"Mobile Size"} />

        <NewToolTip
          tooltext={
            "Add an eye-catching effect to your widget. Adding an attention effect will increase your click rate and increase the visibility of your Ichonic widget. Select one of the available attention effect: Bounce, Waggle, Sheen, Spin, Fade, Shockwave, Blink, and Pulse which can be seen below"
          }
          width="160px"
          placement="top"
        >
          <IconButton
            sx={{
              mt: 1.2,
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <NewSvg />
          </IconButton>
        </NewToolTip>
      </Box>

      <Box
        sx={{
          backgroundColor: themColor.ghost,
          color: themColor.secondary,
          display: "inline-block",
          borderRadius: "6px",
          padding: "4px",
        }}
      >
        <StyledButton
          selected={selectedMobileButton3 === "S"}
          onClick={() => handleButtonClick("S")}
        >
          S
        </StyledButton>

        <StyledButton
          selected={selectedMobileButton3 === "M"}
          onClick={() => handleButtonClick("M")}
        >
          M
        </StyledButton>
        <StyledButton
          selected={selectedMobileButton3 === "L"}
          onClick={() => handleButtonClick("L")}
        >
          L
        </StyledButton>
        <StyledButton
          selected={selectedMobileButton3 === "Custom"}
          onClick={() => handleButtonClick("Custom")}
        >
          Custom
        </StyledButton>
      </Box>
      <Box
        sx={{
          display: `${selectedMobileButton3 === "Custom" ? "Block" : "none"}`,
        }}
      >
        <Box
          sx={{
            backgroundColor: "#f9fafb",
            borderRadius: "8px",
            border: `1px solid ${themColor.ghost}`,
            marginTop: "10px",
            padding: "20px",
            display: "flex",
          }}
        >
          <Box sx={{ marginLeft: "28px" }}>
            <Typography
              sx={{
                fontSize: ".875rem",
                lineHeight: "32px",
                color: themColor.tertiary,
                marginBottom: "8px",
              }}
            >
              Choose Size
            </Typography>
            <Box
              sx={{
                display: "flex",
              }}
            >
              <TextField
                type="number"
                sx={{
                  width: "48px",
                  "& .MuiInputBase-root": {
                    height: "45px",
                    outline: "none",
                  },
                  fontSize: "1rem",
                  color: themColor.secondary,
                  display: "inline-block",
                }}
                // value={click1 ? SizeChange : ""}
                onChange={SizeChange}
                defaultValue={33}
              />
              <Typography
                sx={{
                  fontSize: ".875rem",
                  lineHeight: "32px",
                  color: themColor.tertiary,
                  marginLeft: "5px",
                  marginTop: "10px",
                }}
              >
                px
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
