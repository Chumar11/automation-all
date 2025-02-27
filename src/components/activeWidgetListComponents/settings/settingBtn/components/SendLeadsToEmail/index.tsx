import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import { ChannelSettings, SettingsInterface } from "@/src/types/settings";
import { themColor } from "@/src/theme/themColor";
import { textFieldStyles } from "@/src/components/settingBtn/components/textFieldStyles";

interface SendLeadsToEmailProps {
  item: ChannelSettings;
  setState: React.Dispatch<React.SetStateAction<SettingsInterface>>;
  state: SettingsInterface;
}

const SendLeadsToEmail: React.FC<SendLeadsToEmailProps> = ({
  item,
  setState,
  state,
}) => {
  return (
    <Box sx={{ marginTop: "20px" }}>
      <Typography
        variant="body2"
        sx={{
          color: themColor.tertiary,
          fontSize: ".875rem",
          marginBottom: "8px",
        }}
      >
        Send Leads to Your gmail
      </Typography>
      <TextField
        placeholder="Ichonic@gmail.com"
        sx={{
          ...textFieldStyles,
          "& .MuiOutlinedInput-root": {
            ...textFieldStyles["& .MuiOutlinedInput-root"],
            width: "120%", // Keep width at 100%
            height: "auto",
            padding: "10px 10px",
            // Height adjusts automatically for multiline
          },
          "& .MuiOutlinedInput-input": {
            fontSize: "0.875rem",
            padding: "0px",
            width: "100%",
            "&::placeholder": {
              color: themColor.neutral,
            },
          },
        }}
        // value={item.toEmail}
        value={
          state.channels.find((channel: any) => channel.id === item.id)
            ?.toEmail || ""
        }
        onChange={(e) =>
          setState((prevState) => ({
            ...prevState,
            channels: prevState.channels.map((ch) =>
              ch.id === item.id ? { ...ch, toEmail: e.target.value } : ch
            ),
          }))
        }
      />
    </Box>
  );
};

export default SendLeadsToEmail;
