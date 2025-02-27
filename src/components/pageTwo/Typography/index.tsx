// import { themColor } from "@/src/theme/themColor";
import { themColor } from "@/src/theme/themColor";
import { Typography } from "@mui/material";
import React from "react";
interface TypoProps {
  tittle: string;
}

export const Typo: React.FC<TypoProps> = ({ tittle }) => {
  return (
    <Typography
      sx={{
        marginTop: "24px",
        fontSize: ".875rem",
        lineHeight: "32px",
        color: themColor.tertiary,
        marginBottom: "8px",
      }}
    >
      {tittle}
    </Typography>
  );
};
