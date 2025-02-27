import { themColor } from "@/src/theme/themColor";
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

function LinkedInSettings() {
  return (
    <Box display="flex" alignItems="center">
      <Typography
        sx={{
          marginRight: "50px",
          color: themColor.secondary,
          fontSize: "0.75rem",
        }}
      >
        LinkedIn
      </Typography>

      <RadioGroup row>
        <Box display="flex" alignItems="center"sx={{flexDirection:{
          xs:"column",
          sm:"row",
          md:"row",
          lg:"row",
          xl:"row"

        }}}>
          <FormControlLabel
            value="personal"
            control={
              <Radio
                sx={{
                  "&.Mui-checked": {
                    color: themColor.primary,
                  },
                  "&:hover": {
                    background: "none",
                  },
                }}
              />
            }
            label="Personal"
            sx={{ marginRight: "20px", transition: "all .3s ease" }}
            // You can adjust the margin as needed
          />
          <FormControlLabel
            value="company"
            control={
              <Radio
                sx={{
                  "&.Mui-checked": { color: themColor.primary },
                  "&:hover": {
                    background: "none",
                  },
                }}
              />
            }
            label="Company"
          />
        </Box>
      </RadioGroup>
    </Box>
  );
}

export default LinkedInSettings;
