import "react-international-phone/style.css";
import {
  BaseTextFieldProps,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import {
  CountryIso2,
  defaultCountries,
  FlagImage,
  parseCountry,
  usePhoneInput,
} from "react-international-phone";
import { textFieldStyles } from "../settingBtn/components/textFieldStyles";
import { themColor } from "@/src/theme/themColor";

export interface MUIPhoneProps extends BaseTextFieldProps {
  value: string;
  onChange: (phone: string) => void;
}

export const MuiPhone: React.FC<MUIPhoneProps> = ({
  value,
  onChange,
  ...restProps
}) => {
  const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } =
    usePhoneInput({
      defaultCountry: "us",
      value,
      countries: defaultCountries,
      onChange: (data) => {
        onChange(data.phone);
      },
    });

  return (
    <TextField
      // variant="outlined"
      // color="primary"
      sx={{
        "& .MuiOutlinedInput-root": {
          overflow: "hidden",
          position: "relative",
          // width: {
          //   xs: "100%",
          //   sm: "67%",
          // },

          background: "#fff",
          "& fieldset": {
            borderColor: themColor.ghost,
            transition: "border-color 0.3s ease-in",
          },
          "&:hover fieldset": {
            borderColor: "rgba(0, 124, 251, 0.15)",
          },
          "&.Mui-focused fieldset": {
            border: "2px solid rgba(0, 124, 251, 0.15)",
          },
          "&.Mui-focused:hover fieldset": {
            border: "1px solid rgba(0, 124, 251, 0.15)",
          },
        },
        "& .MuiOutlinedInput-input": {
          padding: "12px 16px",
          fontSize: ".875rem",
          fontFamily: "Rubik, sans-serif",
          color: themColor.secondary,
          "&::placeholder": {
            fontSize: ".875 rem",
          },
        },
      }}
      placeholder="Phone number"
      value={inputValue}
      onChange={handlePhoneValueChange}
      type="tel"
      inputRef={inputRef}
      InputProps={{
        startAdornment: (
          <InputAdornment
            position="start"
            style={{ marginRight: "2px", marginLeft: "-8px" }}
          >
            <Select
              MenuProps={{
                style: {
                  height: "300px",
                  width: "360px",
                  top: "10px",
                  left: "-34px",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
              }}
              sx={{
                width: "max-content",
                fieldset: {
                  display: "none",
                },
                '&.Mui-focused:has(div[aria-expanded="false"])': {
                  fieldset: {
                    display: "block",
                  },
                },
                ".MuiSelect-select": {
                  padding: "8px",
                  paddingRight: "24px !important",
                },
                svg: {
                  right: 0,
                },
              }}
              value={country.iso2}
              onChange={(e) => setCountry(e.target.value as CountryIso2)}
              renderValue={(value) => (
                <FlagImage iso2={value} style={{ display: "flex" }} />
              )}
            >
              {defaultCountries.map((c) => {
                const country = parseCountry(c);
                return (
                  <MenuItem key={country.iso2} value={country.iso2}>
                    <FlagImage
                      iso2={country.iso2}
                      style={{ marginRight: "8px" }}
                    />
                    <Typography marginRight="8px">{country.name}</Typography>
                    <Typography color="gray">+{country.dialCode}</Typography>
                  </MenuItem>
                );
              })}
            </Select>
          </InputAdornment>
        ),
      }}
      {...restProps}
    />
  );
};
