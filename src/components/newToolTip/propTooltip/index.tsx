import React, { ReactElement } from "react";
import { Tooltip, Box } from "@mui/material";
import { themColor } from "@/src/theme/themColor";

interface PropToolTipProps {
  tooltext?: string;
  width?: string;
  placement?:
    | "right"
    | "left"
    | "bottom-end"
    | "bottom-start"
    | "left-end"
    | "left-start"
    | "right-end"
    | "right-start"
    | "top-end"
    | "top-start";
  open?: boolean;
  state: any;
  cursor?: string;
  children: ReactElement<any, any>;
  // width: string;
  // placement:
  //   | "right"
  //   | "top"
  //   | "bottom"
  //   | "left"
  //   | "top-start"
  //   | "top-end"
  //   | "bottom-start"
  //   | "bottom-end"
  //   | "right-start"
  //   | "right-end"
  //   | "left-start"
  //   | "left-end"
  //   | undefined;
  // open?: boolean;
  // state: any;
  handleOnClose: () => void;
}

const PropToolTip = ({
  tooltext,
  children,
  width,
  placement,
  open,
  state,
  cursor,
  handleOnClose,
}: PropToolTipProps) => {
  const closebutton = () => {
    handleOnClose();
  };
  return (
    <Box>
      <Tooltip
        title={
          <span
            style={{
              display: "block",
              fontSize: ".875rem",
              width: `${width}`,
              color:
                state?.widgetcustomization?.callToActionTextColor || "black",
              lineHeight: "140%",
              cursor: `${cursor} `,
            }}
            onClick={closebutton}
          >
            {tooltext}
          </span>
        }
        arrow
        placement={placement}
        open={open}
        componentsProps={{
          tooltip: {
            sx: {
              display: {
                sx: "none",
                sm: "none",
                md: "block",
                lg: "block",
              },
              backgroundColor:
                state?.widgetcustomization?.callToActionTextBackground ||
                themColor.white,
              color: themColor.black,
              maxWidth: "none",
              padding: "5px 15px",
              left: "0",
              boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
            },
          },
          arrow: {
            sx: {
              color: state?.widgetcustomization?.callToActionTextBackground,
            },
          },
        }}
      >
        {children}
      </Tooltip>
    </Box>
  );
};

export default PropToolTip;
