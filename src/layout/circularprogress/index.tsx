import * as React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Typography } from "@mui/material";
import { themColor } from "@/src/theme/themColor";
// import { themColor } from "@/src/theme/themColor";

interface CircularProgressProps {
  currentStep: number;
}

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        {...props}
        sx={{
          color: themColor.primary,
          borderRadius: "50%",
        }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          background: "#f9f6fd",
          margin: "1px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{
            color: themColor.secondary,
          }}
        >
          {`${props.currentStep}/4`}
        </Typography>
      </Box>
    </Box>
  );
}

export default function CircularDeterminate({ page }: { page: string }) {
  const [progress, setProgress] = React.useState(0);
  const stepMap = {
    pageone: 1,
    pagetwo: 2,
    pagethree: 3,
    pagefour: 4,
  };
  const steps = [
    "Select Channel",
    "Widget Customization",
    "Triggers and Targeting",
    "Add Live Chat",
  ];
  const currentStep = stepMap[page as keyof typeof stepMap] || 1;

  React.useEffect(() => {
    setProgress((currentStep / 4) * 100);
    console.log("curren", currentStep);

    return () => {};
  }, [currentStep]);

  return (
    <Stack
      spacing={2}
      direction="row"
      sx={{
        position: "fixed",
        top: "18px",
        zIndex: 9999,
        width: "10%",
        alignItems: "center",
        left: "56px",
      }}
    >
      <CircularProgressWithLabel value={progress} currentStep={currentStep} />
      <Typography
        sx={{
          color: themColor.primary,
          display: {
            xs: "none",
            sm: "block",
            md: "",
            lg: "",
          },
          zIndex: {
            sm: -9999,
          },
        }}
      >
        {steps[currentStep - 1]}
      </Typography>
    </Stack>
  );
}
