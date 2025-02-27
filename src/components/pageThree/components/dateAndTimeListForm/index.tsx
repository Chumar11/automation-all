import React, { Dispatch, SetStateAction } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { DeleteOutlineRounded } from "@mui/icons-material";
import TimePickerNew from "../../timePicker";
import TimeZone from "../timeZone";
import { themColor } from "@/src/theme/themColor";
import SelectDays from "../selectDays";
import { DateAndTime, SettingsInterface } from "@/src/types/settings";
import dayjs from "dayjs";

interface RuleFormProps {
  rule: DateAndTime;
  index: string;
  onDelete: (index: string) => void;
  state: SettingsInterface;
  setState: Dispatch<SetStateAction<SettingsInterface>>;
}

const DateAndTimeListForm: React.FC<RuleFormProps> = ({
  rule,
  index,
  state,
  setState,
  onDelete,
}) => {
  // console.log("the new State is", state);

  const handleDateSchedulingChange = (
    id: string | undefined,
    field: string,
    value: string
  ) => {
    setState((prevState): any => {
      // Ensure dateScheduling is an array, or initialize it if undefined
      const updatedDateAndTime = prevState.triggersAndTargeting?.dateAndTime
        ? prevState.triggersAndTargeting.dateAndTime.map((dateTime) =>
            dateTime.id === id ? { ...dateTime, [field]: value } : dateTime
          )
        : [];

      return {
        ...prevState,
        triggersAndTargeting: {
          ...prevState.triggersAndTargeting,
          dateAndTime: updatedDateAndTime,
        },
      };
    });
  };


  
  return (
    <Box
      key={index}
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        border: "1px solid #EAEFF2",
        borderRadius: "5px",
        background: themColor.snow,
        marginBottom: "10px",
        "&:hover": {
          borderColor: themColor.tertiary,
        },
      }}
    >
      <TimeZone
        handleDateSchedulingChange={handleDateSchedulingChange}
        // onTimeZoneChange={(value: string) => onTimeZoneChange(index, value)}
        rule={rule}
        setState={setState}
      />

      <Box
        sx={{
          marginBottom: "30px",
          padding: "20px",
          display: "flex",

          alignItems: "center",
          gap: "10px",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", width: "33.33%" }}>
          <Typography sx={{ fontSize: "15px" }}>Days</Typography>

          <SelectDays
            handleDateSchedulingChange={handleDateSchedulingChange}
            rule={rule}
            setState={setState}
          />
        </Box>
        <Box
          sx={{
            width: "66.66%",
            display: "flex",
            alignItem: "center",
            gap: "10px",
          }}
        >
          <Box>
            <Typography sx={{ fontSize: "15px" }}>Start Time</Typography>
            <TimePickerNew
              rule={rule}
              handleDateSchedulingChange={handleDateSchedulingChange}
              field="startTime"
              value={rule.startTime}
              // onChange={(time: Date | null) => onStartTimeChange(index, time)}
            />
          </Box>
          <Box>
            <Typography sx={{ fontSize: "15px" }}>End Time</Typography>
            <TimePickerNew
              rule={rule}
              handleDateSchedulingChange={handleDateSchedulingChange}
              field="endTime"
              value={rule.endTime}
              // onChange={(time: Date | null) => onStartTimeChange(index, time)}
            />
          </Box>
        </Box>
      </Box>

      <IconButton
        sx={{ position: "absolute", top: "0%", right: "0%" }}
        onClick={() => onDelete(index)}
      >
        <DeleteOutlineRounded />
        </IconButton>
    </Box>
  );
};

export default DateAndTimeListForm;
