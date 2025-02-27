import { themColor } from "@/src/theme/themColor";
import { SettingsInterface } from "@/src/types/settings";
import { Box, Tooltip } from "@mui/material";
import React, { ReactElement } from "react";

interface NewToolTip {
  tooltext: any;
  children: ReactElement<any, any>;
  width: string;
  placement:
    | "top"
    | "bottom"
    | "right"
    | "left"
    | "top-start"
    | "top-end"
    | "bottom-start"
    | "bottom-end"
    | "right-start"
    | "right-end"
    | "left-start"
    | "left-end";
  open?: boolean;
  state?: SettingsInterface;
}
const NewToolTip: React.FC<NewToolTip> = ({
  tooltext,
  children,
  width,
  placement,
  state,
}) => {
  return (
    <Box sx={{ position: "relative" }}>
      <Tooltip
        sx={{ zIndex: "5" }}
        placement={placement}
        title={
          <span
            style={{
              display: "block",
              fontSize: ".875rem",
              width: `${width}`,
              color: themColor.blueGray,
              lineHeight: "140%",
            }}
          >
            {tooltext}
          </span>
        }
        arrow
        componentsProps={{
          tooltip: {
            sx: {
              backgroundColor: "white",

              color: themColor.black,
              maxWidth: "none",
              padding: "5px 15px",
              left: "0",
              boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
            },
          },
          arrow: {
            sx: {
              color: "white",
            },
          },
        }}
      >
        {children}
      </Tooltip>
    </Box>
  );
};

export default NewToolTip;
