import React from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import { themColor } from "@/src/theme/themColor";
import TargetingRuleItem from "../components/targetingRuleItem";

type Rule = {
  show: boolean;
  rule: string;
  link: string;
};

interface TargetingRulesProps {
  state: any;
  setState: React.Dispatch<React.SetStateAction<any>>;
}

const TargetingRules: React.FC<TargetingRulesProps> = ({ state, setState }) => {
  const targetingRules = state.triggersAndTargeting.targetingRules || [];

  const handleAddBox = () => {
    const newRule = {
      show: true,
      rule: "",
      link: "example:/Page Route here...",
    };
    setState((prevState: any) => ({
      ...prevState,
      triggersAndTargeting: {
        ...prevState.triggersAndTargeting,
        targetingRules: [
          ...prevState.triggersAndTargeting.targetingRules,
          newRule,
        ],
      },
    }));
  };

  const handleButtonClick = (value: string, index: number) => {
    const updatedRules = [...targetingRules];
    updatedRules[index].show = value === "show";

    setState((prevState: any) => ({
      ...prevState,
      triggersAndTargeting: {
        ...prevState.triggersAndTargeting,
        targetingRules: updatedRules,
      },
    }));
  };

  const handleChangeSelect = (event: any, index: number) => {
    const newRuleValue = event.target.value;
    const updatedRules = [...targetingRules];
    updatedRules[index].rule = newRuleValue;

    setState((prevState: any) => ({
      ...prevState,
      triggersAndTargeting: {
        ...prevState.triggersAndTargeting,
        targetingRules: updatedRules,
      },
    }));
  };

  const handleLinkChange = (event: any, index: number) => {
    const newLinkValue = event.target.value;
    const updatedRules = [...targetingRules];
    updatedRules[index].link = newLinkValue;

    setState((prevState: any) => ({
      ...prevState,
      triggersAndTargeting: {
        ...prevState.triggersAndTargeting,
        targetingRules: updatedRules,
      },
    }));
  };

  const handleDeleteRule = (index: number) => {
    const updatedRules = targetingRules.filter(
      (rule: Rule, i: number) => i !== index
    );

    setState((prevState: any) => ({
      ...prevState,
      triggersAndTargeting: {
        ...prevState.triggersAndTargeting,
        targetingRules: updatedRules,
      },
    }));
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: {
            lg: "10rem",
            md: "12rem",
            sm: "12rem",
            xs: "15rem",
          },
        }}
      >
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
          Targeting Rules
        </Typography>
      </Box>
      <Box sx={{ marginLeft: "10px" }}>
        <Typography
          sx={{
            fontWeight: "500",
            fontSize: "13px",
            marginTop: "10px",
            color: themColor.blueGray,
          }}
        >
          Show widget only on specific pages
        </Typography>
      </Box>

      <Box sx={{ pb: 3, ml: 1.5 }}>
        {targetingRules.map((rule: Rule, index: number) => (
          <TargetingRuleItem
            key={index}
            rule={rule}
            index={index}
            onShowClick={() => handleButtonClick("show", index)}
            onDontShowClick={() => handleButtonClick("dontShow", index)}
            onRuleChange={(event) => handleChangeSelect(event, index)}
            onLinkChange={(event) => handleLinkChange(event, index)}
            onDeleteClick={() => handleDeleteRule(index)}
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
            marginTop: "5px",
          }}
          onClick={handleAddBox}
        >
          Add rule
        </Button>
      </Box>
    </Box>
  );
};

export default TargetingRules;
