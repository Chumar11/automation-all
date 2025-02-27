import React from "react";
import { TextField, Box, Typography } from "@mui/material";

interface LinkInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const LinkInput: React.FC<LinkInputProps> = ({ value, onChange }) => {
  return (
    <Box>
      <Typography sx={{ color: "#000" }}>Link</Typography>
      <TextField
        sx={{
          background: "#fff",
          "& .MuiInputBase-root": {
            height: "40px",
          },
        }}
        id="outlined-basic"
        placeholder="example:/Your Page Route Here"
        variant="outlined"
        value={value}
        onChange={onChange}
      />
    </Box>
  );
};

export default LinkInput;
