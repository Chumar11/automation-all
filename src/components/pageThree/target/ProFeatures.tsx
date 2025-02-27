import React, { Dispatch, SetStateAction } from "react";
import DateAndTimeList from "../components/dateAndTimeList";
import SchedulingList from "../components/schedulingList";
import { Box, Typography, Divider } from "@mui/material";
import { themColor } from "@/src/theme/themColor";
import FeatureList from "../components/featureList";
import { SettingsInterface } from "@/src/types/settings";

interface Rule {
  id: string;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  timeZone?: string;
}

interface Rules {
  id: string;
  startTime?: string;
  endTime?: string;
  timeZone?: string;
}

interface FeaturesProps {
  state: SettingsInterface;
  setState: Dispatch<SetStateAction<SettingsInterface>>;
}

const Features: React.FC<FeaturesProps> = ({ state, setState }) => {
  const generateUniqueId = (): string => {
    const existingIds = state.triggersAndTargeting?.dateAndTime?.map((rule) =>
      parseInt(rule.id, 10)
    );
    const maxId =
      existingIds && existingIds.length > 0 ? Math.max(...existingIds) : 0;
    return (maxId + 1).toString();
  };

  const idFordateSched = (): string => {
    const idExists = state.triggersAndTargeting?.dateScheduling?.map((rule) =>
      parseInt(rule.id, 10)
    );
    const idMax = idExists && idExists.length > 0 ? Math.max(...idExists) : 0;
    return (idMax + 1).toString();
  };

  const newRule: Rule = {
    id: idFordateSched(),
    timeZone: "none",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
  };

  const newRuleDateTime: Rules = {
    id: generateUniqueId(),
    timeZone: "none",
    startTime: "",
    endTime: "",
  };

  const handleAddRule = () => {
    setState((prev): any => ({
      ...prev,
      triggersAndTargeting: {
        ...prev.triggersAndTargeting,
        dateScheduling: prev.triggersAndTargeting?.dateScheduling
          ? [...prev.triggersAndTargeting?.dateScheduling, newRule]
          : [newRule],
      },
    }));
  };

  const handleAddRules = () => {
    setState((prev): any => ({
      ...prev,
      triggersAndTargeting: {
        ...prev.triggersAndTargeting,
        dateAndTime: prev.triggersAndTargeting?.dateAndTime
          ? [...prev.triggersAndTargeting?.dateAndTime, newRuleDateTime]
          : [newRuleDateTime],
      },
    }));
  };

  const handleDeleteRule = (id: string) => {
    setState((prev): any => ({
      ...prev,
      triggersAndTargeting: {
        ...prev.triggersAndTargeting,
        dateScheduling: prev.triggersAndTargeting?.dateScheduling?.filter(
          (rule) => rule.id !== id
        ),
      },
    }));
  };

  const handleDeleteRules = (id: string) => {
    setState((prev): any => ({
      ...prev,
      triggersAndTargeting: {
        ...prev.triggersAndTargeting,
        dateAndTime: prev.triggersAndTargeting?.dateAndTime?.filter(
          (rule) => rule.id !== id
        ),
      },
    }));
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Divider
          orientation="vertical"
          sx={{
            height: 17,
            borderColor: themColor.primary,
            borderWidth: 2,
            borderRadius: "2px",
          }}
        />
        <Typography
          variant="h5"
          sx={{ color: themColor.secondary, paddingLeft: "5px" }}
        >
          Features 🚀
        </Typography>
      </Box>

      <Divider
        sx={{ borderColor: themColor.lightGray, marginBottom: "20px" }}
      />

      <SchedulingList
        state={state}
        setState={setState}
        rules={state.triggersAndTargeting?.dateScheduling}
        onAddRule={handleAddRule}
        onDeleteRule={handleDeleteRule}
      />

      <DateAndTimeList
        state={state}
        setState={setState}
        rules={state.triggersAndTargeting?.dateAndTime}
        onAddRule={handleAddRules}
        onDeleteRule={handleDeleteRules}
      />

      <FeatureList state={state} setState={setState} />
    </Box>
  );
};

export default Features;
