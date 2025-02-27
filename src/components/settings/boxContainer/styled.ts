import { styled, alpha } from "@mui/material/styles";

const BoxContainer = styled("div")(({ theme }) => ({
  margin: "0 auto",
  maxWidth: "1200px",
  gap: "20px",

  // width: "100%",
  "& .motion-": {
    // Add any additional styles for .motion- class here
  },
}));

export default BoxContainer;
