import React, { useState } from "react";
import { Box, ClickAwayListener, Typography } from "@mui/material";
import { ChromePicker, ColorResult } from "react-color";
import { ChannelSettings, SettingsInterface } from "@/src/types/settings";
import { themColor } from "@/src/theme/themColor";

interface IconBackgroundPickerComponentProps {
  Color: string;
  setColor: (color: string) => void;
  bgColor: string;
  state: SettingsInterface;
  setState: React.Dispatch<React.SetStateAction<SettingsInterface>>;
  item: ChannelSettings;
}

const IconBackgroundPickerComponent: React.FC<
  IconBackgroundPickerComponentProps
> = ({ Color, setColor, bgColor, item, setState, state }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleIconClick = () => setShowPicker((prev) => !prev);

  return (
    <Box position="relative">
      <Typography
        variant="body2"
        sx={{
          color: themColor.tertiary,
          fontSize: ".875rem",
          marginBottom: "8px",
        }}
      >
        Icon Background
      </Typography>
      <Box
        sx={{
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          background: item.iconBackground || bgColor,
          cursor: "pointer",
          border: `2px solid bgColor`,
        }}
        onClick={handleIconClick}
      />
      {showPicker && (
        <Box
          sx={{
            position: "absolute",
            top: 20,
            right: -25,
            zIndex: 100,
            marginTop: "10px",
          }}
        >
          <ClickAwayListener onClickAway={() => setShowPicker(false)}>
            <Box>
              <ChromePicker
                color={item.iconBackground}
                onChange={(color) =>
                  setState((prev: any) => ({
                    ...prev,
                    channels: prev.channels.map((channel: any) =>
                      channel.id === item.id
                        ? { ...channel, iconBackground: color.hex }
                        : channel
                    ),
                  }))
                } // Color changes on hover
              />
            </Box>
          </ClickAwayListener>
        </Box>
      )}
    </Box>
  );
};

export default IconBackgroundPickerComponent;
