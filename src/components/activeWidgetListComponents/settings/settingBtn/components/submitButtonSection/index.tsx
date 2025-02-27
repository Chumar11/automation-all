import React from "react";
import { Box, Typography, TextField } from "@mui/material";
import { themColor } from "@/src/theme/themColor";
import { textFieldStyles } from "@/src/components/settingBtn/components/textFieldStyles";
import { ChannelSettings, SettingsInterface } from "@/src/types/settings";
import ContactFormTextPickerComponent from "./ContactFormTextPickerComponent";
import ContactFormBgPickerComponent from "./ContactFormBgPickerComponent";
interface SubmitButtonSectionProps {
  item: ChannelSettings;
  setState: React.Dispatch<React.SetStateAction<SettingsInterface>>;
  state:SettingsInterface
}

const SubmitButtonSection: React.FC<SubmitButtonSectionProps> = ({
  item,
  setState,
  state,
}) => {
  return (
    <Box>
      <hr style={{ margin: "10px 0" }} />
      <Typography
        variant="h5"
        sx={{ fontSize: "18px", fontWeight: "500", margin: "1rem 0" }}
      >
        Submit Button
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-start", gap: "20px" }}>
        <Box>
          <ContactFormTextPickerComponent item={item} setState={setState} />
        </Box>
        <Box>
          <ContactFormBgPickerComponent item={item} setState={setState} />
        </Box>
      </Box>
      <Box sx={{ marginTop: "20px" }}>
        <Typography
          variant="body2"
          sx={{
            color: themColor.tertiary,
            fontSize: ".875rem",
            marginBottom: "8px",
          }}
        >
          Button Text
        </Typography>
        <TextField
          fullWidth
          placeholder="Button Text"
          sx={{
            ...textFieldStyles,
            "& .MuiOutlinedInput-root": {
              ...textFieldStyles["& .MuiOutlinedInput-root"],
              width: "60%",
            },
          }}
          // value={item.submitButton?.buttonText || ""}

          value={
            state.channels.find((channel: any) => channel.id === item.id)
              ?.submitButton?.buttonText || ""
          }
          onChange={(e) => {
            const newButtonText = e.target.value;
            setState((prevState) => ({
              ...prevState,
              channels: prevState.channels.map((ch) =>
                ch.id === item.id
                  ? {
                      ...ch,
                      submitButton: {
                        ...ch.submitButton,
                        buttonText: newButtonText,
                      },
                    }
                  : ch
              ),
            }));
          }}
        />
      </Box>
    </Box>
  );
};

export default SubmitButtonSection;
