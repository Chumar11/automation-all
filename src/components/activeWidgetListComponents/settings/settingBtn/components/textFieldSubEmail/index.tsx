import { textFieldStyles } from "@/src/components/settingBtn/components/textFieldStyles";
import { themColor } from "@/src/theme/themColor";
import { ChannelSettings, SettingsInterface } from "@/src/types/settings";
import { Box, TextField, Typography } from "@mui/material";
import React from "react";

interface props {
  state: SettingsInterface;
  setState: React.Dispatch<React.SetStateAction<any>>;
  item: ChannelSettings;
}

const TextFiledSubEmail: React.FC<props> = ({ item, state, setState }) => {
  return (
    <>
      {item.channelType === "email" && (
        <Box
          sx={{
            marginBottom: "1.2rem",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: themColor.tertiary,
              fontSize: ".875rem",
              marginBottom: "8px",
            }}
          >
            Mail Subject
          </Typography>
          <TextField
            fullWidth
            placeholder="{title} and {URL} tags are supported"
            sx={{
              ...textFieldStyles,
              "& .MuiOutlinedInput-root": {
                ...textFieldStyles["& .MuiOutlinedInput-root"],
                width: "90%", // Override width to be 100%
              },
              "& .MuiOutlinedInput-input": {
                ...textFieldStyles["& .MuiOutlinedInput-root"],
                fontSize: "0.875rem",
                width: "100%",
                "&::placeholder": {
                  color: themColor.neutral,
                  fontSize: "0.875rem",
                },
              },
            }}
            value={
              state.channels.find((channel: any) => channel.id === item.id)
                ?.mailSubject || ""
            }
            onChange={(e) =>
              setState({
                ...state,
                channels: state.channels.map((ch) =>
                  ch.id === item.id
                    ? { ...ch, mailSubject: e.target.value }
                    : ch
                ),
              })
            }
          />{" "}
        </Box>
      )}
    </>
  );
};

export default TextFiledSubEmail;
