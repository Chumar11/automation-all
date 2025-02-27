import React from "react";
import {
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { DeleteOutlineRounded } from "@mui/icons-material";
import { SettingsInterface, SelectCountry } from "@/src/types/settings";
import { themColor } from "@/src/theme/themColor";
import countries from "./countryArray";

interface SelectCountryBoxProps {
  index: number;
  box: SelectCountry;
  state: SettingsInterface;
  setState: React.Dispatch<React.SetStateAction<SettingsInterface>>;
}

export default function SelectCountryBox({
  index,
  box,
  state,
  setState,
}: SelectCountryBoxProps) {
  const removeBox = (index: number) => {
    setState((prevState): any => ({
      ...prevState,
      triggersAndTargeting: {
        ...prevState.triggersAndTargeting,
        selectCountry:
          prevState.triggersAndTargeting?.selectCountry?.filter(
            (_, i) => i !== index
          ) ?? [],
      },
    }));
  };

  const handleCountryChange = (index: number, value: string) => {
    const updatedCountries = [
      ...(state.triggersAndTargeting?.selectCountry ?? []),
    ];
    updatedCountries[index].country = value;
    setState((prevState): any => ({
      ...prevState,
      triggersAndTargeting: {
        ...prevState.triggersAndTargeting,
        selectCountry: updatedCountries,
      },
    }));

    // console.log(state?.triggersAndTargeting?.selectCountry);
  };

  return (
    <Box
      sx={{
        position: "relative",
        padding: "20px",
        paddingBottom: "40px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        border: "1px solid #EAEFF2",
        background: themColor.snow,
        marginTop: "10px",
        marginBottom: "15px",
        borderRadius: "5px",
        width: "100%",
        "&:hover": {
          borderColor: themColor.tertiary,
        },
      }}
    >
      <Typography>Select Countries</Typography>
      <FormControl fullWidth>
        <Select
          sx={{
            height: "40px",
            width: "80%",
            fontWeight: 500,
            fontSize: "15px",
          }}
          value={box.country}
          onChange={(e) => handleCountryChange(index, e.target.value as string)}
        >
          <MenuItem value="Select country">Select country</MenuItem>
          {countries.map((country, i) => (
            <MenuItem key={i} value={country}>
              {country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <IconButton
        onClick={() => removeBox(index)}
        sx={{ position: "absolute", top: "0%", right: "0%" }}
      >
        <DeleteOutlineRounded />
      </IconButton>
    </Box>
  );
}
