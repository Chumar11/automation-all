import React, { Dispatch, SetStateAction } from "react";
import { Box, Button, Typography } from "@mui/material";
import DateAndTimeListForm from "../dateAndTimeListForm";
import { themColor } from "@/src/theme/themColor";
import { DateAndTime, SettingsInterface } from "@/src/types/settings";

interface Rule {
  timeZone: string;
  startTime: Date | null;
  endTime: Date | null;
}

interface RuleListProps {
  rules?: DateAndTime[];
  onAddRule: () => void;
  onDeleteRule: (index: string) => void;
  state: SettingsInterface;
  setState: Dispatch<SetStateAction<SettingsInterface>>;
}

const DateAndTimeList: React.FC<RuleListProps> = ({
  rules,
  onAddRule,
  state,
  setState,
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
        Date and Hours
      </Typography>

      {rules?.map((rule, index) => (
        <DateAndTimeListForm
          state={state}
          setState={setState}
          key={index}
          rule={rule}
          index={rule.id}
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

export default DateAndTimeList;
