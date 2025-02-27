import React from "react";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function index({ ...props }) {
  const { state } = props;
  return (
    <Stack mb={3}>
      <Card
        sx={{
          display: "flex",
          // bgcolor: alpha(theme.palette.error.main, 0.1),
          borderColor: "secondary.dark",
          borderWidth: 1,
          p: 2,
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardContent sx={{ flex: "1 0 auto", textAlign: "center" }}>
            <CardMedia
              component="img"
              sx={{ height: 180, width: 180, mx: "auto" }}
              image="/images/link-icon.svg"
              alt="Live from space album cover"
            />
            <Typography component="div" variant="h2" color="lime">
              Connect Domain
            </Typography>
            <Typography
              variant="h3"
              color="text.primary"
              component="div"
              fontWeight={400}
            >
              Please connect your domain first to add the {state.widgetType}{" "}
              widget to your Wix Store.
            </Typography>
            <Stack
              direction="row"
              gap={1}
              alignItems="center"
              mt={1}
              justifyContent="center"
            ></Stack>
          </CardContent>
        </Box>
      </Card>
    </Stack>
  );
}
