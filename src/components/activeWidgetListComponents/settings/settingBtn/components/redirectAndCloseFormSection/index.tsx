import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import EnableWidgetSwitch from "@/src/components/settingBtn/components/enableWidgetSwitch";
import { textFieldStyles } from "@/src/components/settingBtn/components/textFieldStyles";
import { ChannelSettings, SettingsInterface } from "@/src/types/settings";
import { themColor } from "@/src/theme/themColor";

interface RedirectAndCloseFormSectionProps {
  item: ChannelSettings;
  setState: React.Dispatch<React.SetStateAction<SettingsInterface>>;
  state: SettingsInterface;
}

const RedirectAndCloseFormSection: React.FC<
  RedirectAndCloseFormSectionProps
> = ({ item, setState, state }) => {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          marginY: "1rem",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <EnableWidgetSwitch
          checked={open}
          onChange={() => setOpen(!open)}
          label={"Redirect visitors"}
        />
        {open && (
          <TextField
            placeholder="devsite.com"
            sx={{
              ...textFieldStyles,
              "& .MuiOutlinedInput-root": {
                ...textFieldStyles["& .MuiOutlinedInput-root"],
                width: "59%",
              },
            }}
            // value={item.redirectVisitors || ""}
            value={
              state.channels.find((channel: any) => channel.id === item.id)
                ?.redirectVisitors || ""
            }
            onChange={(e) =>
              setState((prevState) => ({
                ...prevState,
                channels: prevState.channels.map((ch) =>
                  ch.id === item.id
                    ? { ...ch, redirectVisitors: e.target.value }
                    : ch
                ),
              }))
            }
          />
        )}
        <EnableWidgetSwitch
          checked={item.closeFormAutomatically || false}
          onChange={() =>
            setState((prevState) => ({
              ...prevState,
              channels: prevState.channels.map((ch) =>
                ch.id === item.id
                  ? {
                      ...ch,
                      closeFormAutomatically: !ch.closeFormAutomatically,
                    }
                  : ch
              ),
            }))
          }
          label={"Close Form Automatically"}
        />
        <Box
          sx={{
            display: "flex",
            color: themColor.secondary,
            fontSize: "15px",
            gap: "7px",
            alignItems: "center",
          }}
        >
          <label>Close after</label>
          <TextField
            type="number"
            // value={item.closeAfterSeconds || 0}
            value={
              state.channels.find((channel: any) => channel.id === item.id)
                ?.closeAfterSeconds || 0
            }
            onChange={(e) =>
              setState((prevState) => ({
                ...prevState,
                channels: prevState.channels.map((ch) =>
                  ch.id === item.id
                    ? { ...ch, closeAfterSeconds: Number(e.target.value) }
                    : ch
                ),
              }))
            }
            disabled={!item.closeFormAutomatically}
            variant="outlined"
            sx={{
              ...textFieldStyles,
              width: "100px",
              "& .MuiInputBase-root": { width: "100px", height: "40px" },
            }}
          />
          <label>seconds</label>
        </Box>
      </Box>
    </Box>
  );
};

export default RedirectAndCloseFormSection;
