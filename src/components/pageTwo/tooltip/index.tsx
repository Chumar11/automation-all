import { Box, IconButton, Tooltip } from "@mui/material";
import React, { ReactElement } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { themColor } from "@/src/theme/themColor";

interface ToolProps {
  tooltext: string;
  children: ReactElement<any, any>;
}
const Tooltipp: React.FC<ToolProps> = ({ tooltext, children }) => {
  return (
    <Box sx={{ marginTop: "7px", position: "relative" }}>
      <Tooltip
        sx={{ zIndex: "5" }}
        placement="top"
        title={
          <span
            style={{
              display: "block",
              fontSize: ".875rem",
              width: "160px",
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
              backgroundColor: "#fff",
              color: "#000",
              maxWidth: "none",
              padding: "5px 15px",
              left: "0",
              boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
            },
          },
          arrow: {
            sx: {
              color: "#fff",
            },
          },
        }}
      >
        {children}
      </Tooltip>
    </Box>
  );
};

export default Tooltipp;
