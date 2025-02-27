// import { themColor } from "@/src/theme/themColor";

import { themColor } from "@/src/theme/themColor";

export const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    overflow: "hidden",
    height: "50px",
    width: {
      xs: "100%",
      sm: "90%",
      lg:"250px",
      xl:"250px"
    },

    background: "#fff",
    "& fieldset": {
      borderColor: themColor.ghost,
      transition: "border-color 0.3s ease-in",
    },
    "&:hover fieldset": {
      borderColor: "rgba(0, 124, 251, 0.4)", // Adjusting to a lighter shade for hover effect
    },
    "&.Mui-focused fieldset": {
      border: "2px solid rgba(0, 124, 251, 0.4)", // Adjusting to #007CFB color
    },
    "&.Mui-focused:hover fieldset": {
      border: "1px solid rgba(0, 124, 251, 0.4)", // Adjusting to #007CFB color
    },
  },
  "& .MuiOutlinedInput-input": {
    padding: "12px 16px",
    fontSize: ".875rem",
    fontFamily: "Rubik, sans-serif",
    color: themColor.secondary,
    "&::placeholder": {
      fontSize: ".875rem",
      color: themColor.neutral,
    },
  },
};
