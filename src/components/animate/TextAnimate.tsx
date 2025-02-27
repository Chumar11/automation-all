import { motion } from "framer-motion";
import PropTypes from "prop-types";
// material
import { Typography } from "@mui/material";
//
import { varFadeInUp } from "./variants";

// ----------------------------------------------------------------------

TextAnimate.propTypes = {
  text: PropTypes.string,
  variants: PropTypes.object,
  sx: PropTypes.object,
};

export default function TextAnimate({ ...props }) {
  const { text, variants, sx, ...other } = props;
  return (
    <Typography
      component={motion.h1}
      sx={{
        typography: "h1",
        overflow: "hidden",
        display: "inline-flex",
        ...sx,
      }}
      {...other}
    >
      {text.split("").map((letter: any, index: any) => (
        <motion.span key={index} variants={variants || varFadeInUp}>
          {letter}
        </motion.span>
      ))}
    </Typography>
  );
}
