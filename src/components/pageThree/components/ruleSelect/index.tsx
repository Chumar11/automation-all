import React from "react";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

interface RuleSelectProps {
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
}

const RuleSelect: React.FC<RuleSelectProps> = ({ value, onChange }) => {
  return (
    <Box sx={{ minWidth: 150 }}>
      <FormControl sx={{ maxHeight: "64px" }}>
        <Typography sx={{ color: "#999EAB" }}>Select Rule</Typography>
        <Select
          value={value}
          onChange={onChange}
          displayEmpty
          sx={{
            height: "40px",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "1px solid -ghost",
            },
            "& .MuiSelect-select": {
              padding: "8px 14px",
              fontSize: "14px",
              background: "#fff",
            },
          }}
        >
          <MenuItem value="" disabled>
            Select Rule
          </MenuItem>
          <MenuItem value={"pages that contain"}>pages that contain</MenuItem>
          <MenuItem value={"a specific page"}>a specific page</MenuItem>
          <MenuItem value={"pages starting with"}>pages starting with</MenuItem>
          <MenuItem value={"pages ending with"}>pages ending with</MenuItem>
          <MenuItem value={"Homepage"}>Homepage</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default RuleSelect;
