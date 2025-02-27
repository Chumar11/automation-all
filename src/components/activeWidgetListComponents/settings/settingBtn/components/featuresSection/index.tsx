import React from "react";
import { Box, Typography } from "@mui/material";
import EnableWidgetSwitch from "@/src/components/settingBtn/components/enableWidgetSwitch";
import { ChannelSettings, SettingsInterface } from "@/src/types/settings";

interface FeaturesSectionProps {
  item: ChannelSettings;
  setState: React.Dispatch<React.SetStateAction<SettingsInterface>>;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  item,
  setState,
}) => {
  return (
    <Box
      sx={{
        marginTop: "20px",
        display: "flex",
        marginBottom: "1rem",
        width: "100%",
      }}
    >
      <Box
        sx={{
          flexDirection: "column",
          display: "flex",
          gap: "1rem",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: "0.6rem" }}>
          Features
        </Typography>
        <EnableWidgetSwitch
          checked={item.sendLeadsToEmail}
          onChange={() =>
            setState((prevState) => ({
              ...prevState,
              channels: prevState.channels.map((ch) =>
                ch.id === item.id
                  ? { ...ch, sendLeadsToEmail: !ch.sendLeadsToEmail }
                  : ch
              ),
            }))
          }
          label={"Save leads to your email"}
        />
        <EnableWidgetSwitch
          checked={item.enableRecaptcha || false}
          onChange={() =>
            setState((prevState) => ({
              ...prevState,
              channels: prevState.channels.map((ch) =>
                ch.id === item.id
                  ? { ...ch, enableRecaptcha: !ch.enableRecaptcha }
                  : ch
              ),
            }))
          }
          label={"Enable reCAPTCHA"}
        />
      </Box>
    </Box>
  );
};

export default FeaturesSection;
