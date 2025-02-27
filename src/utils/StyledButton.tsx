import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { themColor } from "../theme/themColor";
// import { themColor } from "../theme/themColor";

export const StyledButton = styled(Button)<{ selected?: boolean }>(
  ({ selected }) => ({
    color: selected ? themColor.primary : themColor.secondary,
    backgroundColor: selected ? "white" : "transparent",
    border: "none",
    fontSize: "16px",
    fontWeight: "500",
    // transition:'0.8s ease',
    "&:hover": {
      backgroundColor: selected ? "white" : "transparent",
    },
  })
);
