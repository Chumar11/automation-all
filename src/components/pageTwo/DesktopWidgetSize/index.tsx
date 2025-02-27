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
  selectedButton3: string;
  setSelectedButton3: React.Dispatch<React.SetStateAction<string>>;
  setClick1: React.Dispatch<React.SetStateAction<boolean>>;
  state: any;
  setState: React.Dispatch<React.SetStateAction<any>>;
}
export const SizeButton: React.FC<SizeProps> = ({
  setState,
  state,
  click1,
  setClick1,
  selectedButton3,
  setSelectedButton3,
}) => {
  console.log("selectedButton3", selectedButton3);
  const handleButtonClick = (btn: string) => {
    setClick1(false);
    if (btn === "Custom") {
      setClick1(true);
    }
    setSelectedButton3(btn);
    setState({
      ...state,
      widgetcustomization: {
        ...state.widgetcustomization,
        widgetSize: btn,
      },
    });
  };

  const SizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value.trim()); // Get the trimmed value
    // Set customSize to 0.5 if the value is empty or equal to "0", otherwise convert to a number
    const customSize = Math.min(Math.max(value, 38), 70);

    setState({
      ...state,
      widgetcustomization: {
        ...state.widgetcustomization,
        customSize: customSize,
      },
    });
  };

  const Size = state?.widgetcustomization?.customSize;
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typo tittle={"Desktop Size"} />

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
          selected={selectedButton3 === "S"}
          onClick={() => handleButtonClick("S")}
        >
          S
        </StyledButton>

        <StyledButton
          selected={selectedButton3 === "M"}
          onClick={() => handleButtonClick("M")}
        >
          M
        </StyledButton>
        <StyledButton
          selected={selectedButton3 === "L"}
          onClick={() => handleButtonClick("L")}
        >
          L
        </StyledButton>
        <StyledButton
          selected={selectedButton3 === "Custom"}
          onClick={() => handleButtonClick("Custom")}
        >
          Custom
        </StyledButton>
      </Box>
      <Box
        sx={{
          display: `${selectedButton3 === "Custom" ? "Block" : "none"}`,
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
                defaultValue={Size}
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
