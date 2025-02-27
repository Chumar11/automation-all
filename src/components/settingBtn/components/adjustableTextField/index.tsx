import React from "react";
import { TextField } from "@mui/material";
import { textFieldStyles } from "../textFieldStyles";
import { themColor } from "@/src/theme/themColor";
// import { themColor } from "@/src/theme/themColor";

interface AdjustableTextFieldProps {
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const AdjustableTextField: React.FC<AdjustableTextFieldProps> = ({
  value,
  onChange,
  placeholder,
}) => (
  <TextField
    fullWidth
    placeholder={placeholder}
    multiline
    minRows={5}
    maxRows={6}
    sx={{
      ...textFieldStyles,
      "& .MuiOutlinedInput-root": {
        fontSize: ".95rems",

        ...textFieldStyles["& .MuiOutlinedInput-root"],

        "& fieldset": {
          borderColor: themColor.ghost,
          transition: "border-color 0.3s ease-in",
        },
        "&:hover fieldset": {
          borderColor: "rgba(0, 124, 251, 0.15)",
        },
        "&.Mui-focused fieldset": {
          border: "2px solid rgba(0, 124, 251, 0.15)",
        },
        "&.Mui-focused:hover fieldset": {
          border: "1px solid rgba(0, 124, 251, 0.15)",
        },
      },
      "& .MuiOutlinedInput-input": {
        padding: "0",
        paddingLeft: "2px",
      },
      "& .MuiInputBase-root": {
        width: {
          xs: "100%",
          sm: "72%",
        },

        height: "auto",
        minHeight: 140,
      },
    }}
    value={value}
    onChange={onChange}
  />
);

export default AdjustableTextField;
