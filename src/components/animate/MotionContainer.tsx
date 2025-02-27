import { motion } from "framer-motion";
// material
import { Box } from "@mui/material";
//
import { varWrapEnter } from "./variants";

// ----------------------------------------------------------------------

export default function MotionContainer({ ...props }) {
  const { open, children, ...other } = props;
  return (
    <Box
      component={motion.div}
      initial={false}
      animate={open ? "animate" : "exit"}
      variants={varWrapEnter}
      {...other}
    >
      {children}
    </Box>
  );
}
