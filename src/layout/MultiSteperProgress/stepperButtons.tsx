import React, { useContext, useEffect, useState } from "react";
import { Button, Box, IconButton } from "@mui/material";
import {
  ArrowBack,
  ArrowForward,
  KeyboardArrowDown,
} from "@mui/icons-material";
import { SaveBtnSvg } from "@/src/components/svg";
import { themColor } from "@/src/theme/themColor";
import { useMutation } from "react-query";
import * as api from "src/services/index";
import toast from "react-hot-toast";
import { AuthContext } from "@/src/contexts/AuthContext";
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from "@mui/material/CircularProgress";

interface StepperButtonsProps {
  page: string;
  steps: string[];
  onPageNumberClick: (step: number) => void;
  state: any;
  setState: any;
}

const StepperButtons: React.FC<StepperButtonsProps> = ({
  page,
  steps,
  state,
  setState,
  onPageNumberClick,
}) => {
  const { user, setDetails }: any = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const stepMap = {
    pageone: 1,
    pagetwo: 2,
    pagethree: 3,
  };

  console.log("state", state);
  console.log("stepper satte", user);
  const { mutate } = useMutation(api.updateWidgetSettings, {
    onSuccess: (data) => {
      setState(data);
      setLoading(false);
      toast.success("Settings updated successfully");
    },
    onError: (error) => {
      console.log("error", error);

      toast.error("Error updating settings");
    },
  });
  const handleSave = () => {
    const channelUrl = state.channels.filter((channel: any) => {
      if (channel.channelType.includes("contact form")) {
        return !channel?.toEmail;
      } else {
        return !channel?.channelUrl;
      }
    });

    if (channelUrl.length > 0) {
      onPageNumberClick(1);
      toast.error("Please Enter Details in all the apps");

      return;
    }

    setLoading(true);
    // Find contact form channels
    const contactFormChannels = state?.channels?.filter(
      (channel: any) => channel.channelType === "contact form"
    );

    // Check if any contact form channels have less than two fields enabled
    const isEnabledCount = contactFormChannels?.every(
      (channel: any) =>
        channel.fields?.filter((field: any) => field.isEnabled).length >= 2
    );
    if (!isEnabledCount) {
      toast.error("Please enable at least two fields in the contact form");
      return;
    } else if (
      state.channels.some((channel: any) => channel.channelUrl === "")
    ) {
      toast.error("Please enter a Details in at least one app");
      return;
    } else {
      mutate({ ...state });
    }
  };

  const currentStep = stepMap[page as keyof typeof stepMap] || 1;

  const handleBack = () => {
    if (currentStep > 1) {
      onPageNumberClick(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      onPageNumberClick(currentStep + 1);
    }
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box sx={{ display: "flex", gap: isMobile ? "4px" : 2, position: "fixed" }}>
      <Button
        variant="outlined"
        sx={{
          color: themColor.primary,
          borderColor: themColor.primary,
          minWidth: "auto",
        }}
        startIcon={
          <ArrowBack
            sx={{
              "&.css-gcc2o7-MuiButton-startIcon": {
                marginLeft: isMobile ? "0px" : "initial",
              },
            }}
          />
        }
        onClick={handleBack}
        disabled={currentStep === 1}
      >
        {isMobile ? "" : "Back"}
      </Button>
      <Button
        variant="outlined"
        sx={{
          color: themColor.primary,
          minWidth: "auto",
          borderColor: themColor.primary,
          "&:hover": {
            color: themColor.primary,
            borderColor: themColor.primary,
          },
          "&:active": {
            color: themColor.primary,
            borderColor: themColor.primary,
          },
        }}
        endIcon={<ArrowForward />}
        onClick={handleNext}
        disabled={currentStep === steps.length}
      >
        {isMobile ? "" : "Next"}
      </Button>

      <Button
        variant="contained"
        sx={{
          fontWeight: "bold",
          color: themColor.white,
          minWidth: "auto",
          backgroundColor: themColor.primary,
          borderColor: themColor.primary,
          display: "flex",
          alignItems: "center",
          padding: "8px 16px",
          borderRadius: "8px",
          position: "relative",
          "&:hover": {
            backgroundColor: themColor.primary,
          },
        }}
        onClick={handleSave}
        startIcon={loading ? null : <SaveBtnSvg />}
      >
        {loading
          ? // <CircularProgress
            //   size={24}
            //   sx={{
            //     color: "green",
            //     position: "absolute",
            //     top: "50%",
            //     left: "50%",
            //     marginTop: "-12px",
            //     marginLeft: "-12px",
            //   }}
            // />
            "...Loading"
          : "Save Widget"}
      </Button>
    </Box>
  );
};

export default StepperButtons;
