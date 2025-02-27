import Button from "@mui/material/Button";
import { Box, Grid, Typography } from "@mui/material";
import { themColor } from "@/src/theme/themColor";
import { useState } from "react";
import CustomizedDialogs from "../aboutpageComponents/NewModals";

export default function EmptyWidgetList() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <CustomizedDialogs open={open} setOpen={setOpen} />

      <Box
        sx={{
          position: "absolute",
          top: "145px",
          left: "50%",
          zIndex: "9",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          style={{
            maxWidth: "300px",
            display: "block",
          }}
          src="https://go.chaty.app/img/home.png"
          alt=""
        />

        <Typography
          sx={{
            textAlign: "center",
            maxWidth: "280px",
            fontSize: "1rem",
            lineHeight: 1.6,
            margin: "10px 0",
            fontWeight: 400,
          }}
        >
          Your dashboard sure looks lonely. Time to look for people to chat
          with!
        </Typography>

        <Grid item>
          <Button
            onClick={handleClickOpen}
            sx={{
              background: themColor.primary,
              borderRadius: "8px",
              fontSize: "0.875rem",
              padding: "10px 20px",
              width: "auto",
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
            Create Widget
          </Button>
        </Grid>
      </Box>
    </>
  );
}
