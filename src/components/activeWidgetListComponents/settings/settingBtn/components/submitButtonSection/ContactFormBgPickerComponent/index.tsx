import React, { useState } from "react";
import { Box, ClickAwayListener, Typography } from "@mui/material";
import { ChromePicker, ColorResult } from "react-color";
import { ChannelSettings, SettingsInterface } from "@/src/types/settings";
import { themColor } from "@/src/theme/themColor";

interface IconBackgroundPickerComponentProps {
  setState: React.Dispatch<React.SetStateAction<SettingsInterface>>;
  item: ChannelSettings;
}

const IconBackgroundPickerComponent: React.FC<
  IconBackgroundPickerComponentProps
> = ({ item, setState }) => {
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
        Background Color
      </Typography>
      <Box
        sx={{
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          background: item.submitButton?.backgroundColor,
          cursor: "pointer",
        }}
        onClick={handleIconClick}
      />
      {showPicker && (
        <Box
          sx={{
            position: "absolute",
            top: 20,
            right: -18,
            zIndex: 100,
            marginTop: "10px",
          }}
        >
          <ClickAwayListener onClickAway={() => setShowPicker(false)}>
            <Box>
              <ChromePicker
                color={item.submitButton?.backgroundColor}
                onChange={(color) =>
                  setState((prev: any) => ({
                    ...prev,
                    channels: prev.channels.map((channel: any) =>
                      channel.channelType === item.channelType
                        ? {
                            ...channel,
                            submitButton: {
                              ...channel.submitButton,
                              backgroundColor: color.hex,
                            },
                          }
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
