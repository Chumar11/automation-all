import { themColor } from "@/src/theme/themColor";
import { Button, ButtonProps } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";

const StyledButton = styled(Button)<{ selected?: boolean }>(({ selected }) => ({
  color: selected ? themColor.primary : themColor.secondary,
  backgroundColor: selected ? "white" : "transparent",
  border: "1px solid transparent",
  fontWeight: "500",
  minHeight: "10px",
  padding: "2px 0px 2px 0px",
  "&:hover": {
    backgroundColor: selected ? "white" : "transparent",
    boxShadow: "none",
  },
}));

interface ToggleButtonProps extends ButtonProps {
  label: string;
  selected?: boolean;
  onClick: () => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  label,
  selected,
  onClick,
}) => {
  return (
    <StyledButton
      sx={{ fontSize: "12px", p: 2 }}
      selected={selected}
      onClick={onClick}
    >
      {label}
    </StyledButton>
  );
};
export default ToggleButton;
