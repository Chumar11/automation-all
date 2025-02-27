import { Box, FormControl, MenuItem, Select } from "@mui/material";
import { DateAndTime, SettingsInterface } from "@/src/types/settings";
import { Dispatch, SetStateAction } from "react";

interface SelectDaysProps {
  handleDateSchedulingChange: (
    id: string | undefined,
    field: string,
    valueDateAndTime: string
  ) => void;
  rule?: DateAndTime;
  setState: Dispatch<SetStateAction<SettingsInterface>>;
}

const SelectDays = ({
  handleDateSchedulingChange,
  rule,
  setState,
}: SelectDaysProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
      }}
    >
      <FormControl fullWidth>
        <Select
          sx={{
            height: "40px",
            width: "auto",
            fontWeight: 500,
            fontSize: "12px",
          }}
          labelId="days-label"
          value={rule?.selectDays || "select-days"}
          onChange={(event) =>
            handleDateSchedulingChange(
              rule?.id,
              "selectDays",
              event.target.value as string
            )
          }
        >
          <MenuItem value="select-days">Select Days</MenuItem>
          <MenuItem value="monday">Monday</MenuItem>
          <MenuItem value="tuesday">Tuesday</MenuItem>
          <MenuItem value="wednesday">Wednesday</MenuItem>
          <MenuItem value="thursday">Thursday</MenuItem>
          <MenuItem value="friday">Friday</MenuItem>
          <MenuItem value="saturday">Saturday</MenuItem>
          <MenuItem value="sunday">Sunday</MenuItem>
          <MenuItem value="weekdays">Weekdays</MenuItem>
          <MenuItem value="weekends">Weekends</MenuItem>
          <MenuItem value="all">All Days</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectDays;
