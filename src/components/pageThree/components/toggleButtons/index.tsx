import React from "react";
import { Box } from "@mui/material";
import ToggleButton from "../../target/ToggleButton";

interface ToggleButtonsProps {
  selected: boolean;
  onShowClick: () => void;
  onDontShowClick: () => void;
}

const ToggleButtons: React.FC<ToggleButtonsProps> = ({
  selected,
  onShowClick,
  onDontShowClick,
}) => {
  return (
    <Box
      sx={{
        padding: "3px 3px 3px 3px",
        // position:"fixed",
        backgroundColor: "#e7eff1",
        height: "45px",
        borderRadius: "8px",
      }}
    >
      <ToggleButton label="Show" selected={selected} onClick={onShowClick}/>
      <ToggleButton
        label="Don't show"
        selected={!selected}
        onClick={onDontShowClick}
      />
    </Box>
  );
};

export default ToggleButtons;
