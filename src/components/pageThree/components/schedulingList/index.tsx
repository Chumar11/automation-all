import React, { Dispatch, SetStateAction } from "react";
import { Box, Button, Typography } from "@mui/material";
import SchedulingListForm from "../schedulingListForm";
import { themColor } from "@/src/theme/themColor";
import { DateScheduling, SettingsInterface } from "@/src/types/settings";

interface SchedulingListProps {
  rules?: DateScheduling[];
  onAddRule: () => void;
  // onTimeZoneChange: (index: number, value: string) => void;
  // onStartDateChange: (index: number, date: Date | null) => void;
  // onEndDateChange: (index: number, date: Date | null) => void;
  // onStartTimeChange: (index: number, time: Date | null) => void;
  // onEndTimeChange: (index: number, time: Date | null) => void;
  onDeleteRule: (index: string) => void;

  state: SettingsInterface;
  setState: Dispatch<SetStateAction<SettingsInterface>>;
}

const SchedulingList: React.FC<SchedulingListProps> = ({
  state,
  setState,
  rules,
  onAddRule,
  // onTimeZoneChange,
  // onStartDateChange,
  // onEndDateChange,
  // onStartTimeChange,
  // onEndTimeChange,
  onDeleteRule,
}) => {
  return (
    <Box
      sx={{
        marginLeft: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "5px",
      }}
    >
      <Typography
        sx={{
          fontWeight: "500",
          fontSize: "14px",
          marginTop: "10px",
          color: themColor.blueGray,
        }}
      >
        Date Scheduling
      </Typography>

      {rules?.map((rule, index) => (
        <SchedulingListForm
          state={state}
          setState={setState}
          key={index}
          rule={rule}
          index={rule.id}
          // onTimeZoneChange={onTimeZoneChange}
          // onStartDateChange={onStartDateChange}
          // onEndDateChange={onEndDateChange}
          // onStartTimeChange={onStartTimeChange}
          // onEndTimeChange={onEndTimeChange}
          onDelete={onDeleteRule}
        />
      ))}

      <Button
        size="small"
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
        onClick={onAddRule}
      >
        Add Rule
      </Button>
    </Box>
  );
};

export default SchedulingList;
