import React from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { SettingsInterface, SelectCountry } from "@/src/types/settings";
import { themColor } from "@/src/theme/themColor";
import NewToolTip from "@/src/components/newToolTip";
import { NewSvg } from "@/src/components/svg";
import SelectCountryBox from "../selectCountryBox";

interface CountryTargetingProps {
  state: SettingsInterface;
  setState: React.Dispatch<React.SetStateAction<SettingsInterface>>;
}

export default function CountryTargeting({
  state,
  setState,
}: CountryTargetingProps) {
  const addBox = () => {
    const newBox: SelectCountry = {
      id: (state?.triggersAndTargeting?.selectCountry?.length ?? 0).toString(),
      country: "Select country",
    };

    setState((prevState): any => ({
      ...prevState,
      triggersAndTargeting: {
        ...prevState.triggersAndTargeting,
        selectCountry: [
          ...(prevState?.triggersAndTargeting?.selectCountry ?? []),
          newBox,
        ],
      },
    }));
  };

  const selectCountryBoxes = state?.triggersAndTargeting?.selectCountry ?? [];

  return (
    <Box sx={{ marginLeft: "10px" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          sx={{
            fontWeight: "500",
            fontSize: "14px",
            marginTop: "10px",
            color: themColor.blueGray,
          }}
        >
          Country Targeting
        </Typography>
        <NewToolTip
          placement="top"
          tooltext="Target your widget to specific countries."
          width="160px"
        >
          <IconButton>
            <NewSvg />
          </IconButton>
        </NewToolTip>
      </Box>

      {selectCountryBoxes.map((box, index) => (
        <SelectCountryBox
          key={box.id}
          index={index}
          box={box}
          state={state}
          setState={setState}
        />
      ))}

      <Button
        size="small"
        onClick={addBox}
        sx={{
          border: "1px solid",
          borderColor: themColor.blueGray,
          fontSize: "12px",
          paddingX: "10px",
          height: "26px !important",
          color: themColor.blueGray,
          borderRadius: "7px",
          fontWeight: "500",
          marginBottom: "20px",
        }}
      >
        Add Rule
      </Button>
    </Box>
  );
}
