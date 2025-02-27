import React, { Dispatch, SetStateAction } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { DeleteOutlineRounded } from "@mui/icons-material";
import DatePickerNew from "../../datePicker";
import TimePickerNew from "../../timePicker";
import TimeZone from "../timeZone";
import { themColor } from "@/src/theme/themColor";
import { DateScheduling, SettingsInterface } from "@/src/types/settings";
import dayjs from "dayjs";

interface SchedulingListFormProps {
  rule: DateScheduling;
  index: string;
  // onTimeZoneChange: (index: number, value: string) => void;
  // onStartDateChange: (index: number, date: Date | null) => void;
  // onEndDateChange: (index: number, date: Date | null) => void;
  // onStartTimeChange: (index: number, time: Date | null) => void;
  // onEndTimeChange: (index: number, time: Date | null) => void;
  onDelete: (index: string) => void;
  state: SettingsInterface;

  setState: Dispatch<SetStateAction<SettingsInterface>>;
}

const SchedulingListForm: React.FC<SchedulingListFormProps> = ({
  state,
  setState,
  rule,
  index,
  // onTimeZoneChange,
  // onStartDateChange,
  // onEndDateChange,
  // onStartTimeChange,

  // onEndTimeChange,
  onDelete,
}) => {
  console.log("the new State is", state);

  const handleDateSchedulingChange = (
    id: string | undefined,
    field: string,
    value: string
  ) => {
    setState((prevState): any => {
      // Ensure dateScheduling is an array, or initialize it if undefined
      const updatedDateScheduling = prevState.triggersAndTargeting
        ?.dateScheduling
        ? prevState.triggersAndTargeting.dateScheduling.map((schedule) =>
            schedule.id === id ? { ...schedule, [field]: value } : schedule
          )
        : [];

      return {
        ...prevState,
        triggersAndTargeting: {
          ...prevState.triggersAndTargeting,
          dateScheduling: updatedDateScheduling,
        },
      };
    });
  };

  console.log("rules", rule);

  return (
    <Box
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
          padding: "20px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "30px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Box>
            <Typography sx={{ fontSize: "15px" }}>Start Date</Typography>
            <DatePickerNew
              handleDateSchedulingChange={handleDateSchedulingChange}
              value={rule.startDate}
              rule={rule}
              // onChange={(date: Date | null) => onStartDateChange(index, date)}
              field="startDate"
            />
          </Box>
          <Box>
            <Typography sx={{ fontSize: "15px" }}>End Date</Typography>
            <DatePickerNew
              handleDateSchedulingChange={handleDateSchedulingChange}
              value={rule.endDate}
              rule={rule}
              // onChange={(date: Date | null) => onEndDateChange(index, date)}
              field="endDate"
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
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
              value={rule.endTime} // onChange={(time: Date | null) => onEndTimeChange(index, time)}
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

export default SchedulingListForm;
