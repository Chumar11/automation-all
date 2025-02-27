import { textFieldStyles } from "@/src/components/settingBtn/components/textFieldStyles";
import { themColor } from "@/src/theme/themColor";
import { ChannelSettings, SettingsInterface } from "@/src/types/settings";
import { Box, TextField, Typography } from "@mui/material";

interface TextInputComponentProps {
  imgName: string;
  state: any;
  setState: any;
  item: ChannelSettings;
}

const TextInputComponent: React.FC<TextInputComponentProps> = ({
  imgName,
  state,
  setState,
  item,
}) => {
  console.log("hover", item.hoverText);
  console.log("state", state);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box>
        <Typography
          variant="body2"
          sx={{
            color: themColor.tertiary,
            fontSize: ".875rem",
            marginBottom: "8px",
          }}
        >
          On Hover Text
        </Typography>
        <TextField
          placeholder="Hover text"
          sx={{
            ...textFieldStyles,
            "& .MuiOutlinedInput-root": {
              ...textFieldStyles["& .MuiOutlinedInput-root"],
              width: "120%", // Override width to be 100%
            },
          }}
          value={
            state.channels.find((channel: any) => channel.id === item.id)
              ?.hoverText || ""
          }
          onChange={(e) => {
            setState((prev: any) => ({
              ...prev,
              channels: prev.channels.map((channel: any) =>
                channel.id === item.id
                  ? { ...channel, hoverText: e.target.value }
                  : channel
              ),
            }));
          }}
        />
      </Box>
    </Box>
  );
};

export default TextInputComponent;
