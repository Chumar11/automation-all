import { themColor } from "@/src/theme/themColor";
import { SettingsInterface } from "@/src/types/settings";
import { Box, Typography } from "@mui/material";
import { Children } from "react";

interface HoverText {
  state: SettingsInterface;
  handleOnClose: () => void;
}

const index: React.FC<HoverText> = ({ state, handleOnClose }) => {
  const SetPosition = state?.widgetcustomization?.position?.type;
  const CustomPosition =
    state?.widgetcustomization?.position?.custom?.customPosition;

  return (
    <>
      <Box
        component="div"
        sx={{
          display: {
            sx: "none",
            sm: "none",
            md: "block",
            lg: "block",
          },
          backgroundColor:
            state?.widgetcustomization?.callToActionTextBackground ||
            themColor.white,
          color: themColor.white,
          maxWidth: "none",
          // width: "104px",
          height: "30px",
          padding: "5px 15px",
          left: "0",
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.4)",
          borderRadius: "5px",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: "7.2px",
            // bottom: 10,
            // left: "75px",
            left:
              SetPosition !== "custom"
                ? SetPosition === "left"
                  ? "-12px"
                  : "100%"
                : CustomPosition === "left"
                ? "-12px"
                : "100%",

            width: 0,
            height: 0,
            border: "8px solid",
            borderColor: "transparent",

            borderLeftColor:
              SetPosition !== "custom"
                ? SetPosition === "right"
                  ? state?.widgetcustomization?.callToActionTextBackground ||
                    themColor.white
                  : "transparent"
                : CustomPosition === "right"
                ? state?.widgetcustomization?.callToActionTextBackground ||
                  themColor.white
                : "transparent",

            // Show left border color if on the left
            borderRightColor:
              SetPosition !== "custom"
                ? SetPosition === "left"
                  ? state?.widgetcustomization?.callToActionTextBackground ||
                    themColor.white
                  : "transparent"
                : CustomPosition === "left"
                ? state?.widgetcustomization?.callToActionTextBackground ||
                  themColor.white
                : "transparent",
          },
        }}
        onClick={handleOnClose}
      >
        <Typography
          sx={{
            // height: "20px",
            // overflow: "hidden",
            // textOverflow: "ellipsis",
            display: "block",
            fontSize: ".875rem",
            width: "auto",
            color: state?.widgetcustomization?.callToActionTextColor || "black",
            lineHeight: "140%",
            cursor: "pointer",
          }}
        >
          {state?.widgetcustomization?.callToActionText}
        </Typography>
      </Box>
    </>
  );
};

export default index;
