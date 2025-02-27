import React from "react";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Typography,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { themColor } from "@/src/theme/themColor";
import NewModal from "./NewModals";
const AboutHeader = ({ Data, setData }: any) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  // console.log("Data", Data);

  return (
    <Box
      sx={{
        boxSizing: "border-box",
        padding: 0,
        Margin: 0,
        maxWidth: "1380px",
      }}
    >
      <NewModal open={open} setOpen={setOpen} />

      <Box sx={{ padding: "0px 30px" }}>
        <Typography
          sx={{
            fontSize: "2.5rem",
            fontWeight: "600",
            lineHeight: "1.4",
            margin: "5px 0",
            fontFamily: " Rubik, sans-serif",
            color: themColor.primary,
          }}
        >
          Widgets
        </Typography>
      </Box>

      {/* ..... */}

      <Grid
        container
        spacing={2}
        justifyContent="flex-end"
        alignItems="center"
        sx={{
          flexDirection: isSmallScreen ? "column" : "row",
          gap: isSmallScreen ? "16px" : "0",
          padding: "0 70px",
        }}
      >
        <Grid item>
          <FormControl
            variant="outlined"
            size="small"
            sx={{
              width: isSmallScreen ? "100%" : "280px",
              backgroundColor: "#fff",
              borderRadius: "5px",
              height: "50px",
            }}
          >
            <Select
              defaultValue="7days"
              sx={{
                height: "50px",
              }}
            >
              <MenuItem value="Today">Today</MenuItem>
              <MenuItem value="yesterday">Yesterday</MenuItem>
              <MenuItem value="week">This week</MenuItem>
              <MenuItem value="7days">Last 7 days</MenuItem>
              <MenuItem value="month">This month</MenuItem>
              <MenuItem value="30days">Last 30 days</MenuItem>
              <MenuItem value="lastMonth">Last month</MenuItem>
              <MenuItem value="AllTime">All Time</MenuItem>
              <MenuItem value="custom">Custom</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item>
          <Button
            onClick={handleClickOpen}
            sx={{
              background: themColor.primary,
              borderRadius: "8px",
              fontSize: "0.875rem",
              padding: "10px 20px",
              width: isSmallScreen ? "100%" : "auto",
              // height: "48px",
              height: "48px !important",
            }}
            variant="contained"
            color="primary"
            startIcon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                svg-inline=""
                role="presentation"
                focusable="false"
              >
                <path
                  d="M15.833 2.5H4.167c-.92 0-1.667.746-1.667 1.667v11.666c0 .92.746 1.667 1.667 1.667h11.666c.92 0 1.667-.746 1.667-1.667V4.167c0-.92-.746-1.667-1.667-1.667zM10 6.667v6.666M6.667 10h6.666"
                  stroke="currentColor"
                  strokeWidth="1.67"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            }
          >
            New Widget
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutHeader;
