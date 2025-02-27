import React from "react";
import { Box, IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import LinkInput from "../linkInput";
import RuleSelect from "../ruleSelect";
import ToggleButtons from "../toggleButtons";
import { themColor } from "@/src/theme/themColor";
interface TargetingRuleItemProps {
  rule: { show: boolean; rule: string; link: string };
  index: number;
  onShowClick: () => void;
  onDontShowClick: () => void;
  onRuleChange: (event: any) => void;
  onLinkChange: (event: any) => void;
  onDeleteClick: () => void;
}

const TargetingRuleItem: React.FC<TargetingRuleItemProps> = ({
  rule,
  onShowClick,
  onDontShowClick,
  onRuleChange,
  onLinkChange,
  onDeleteClick,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#F9FAFB",
        mt: 2,
        p: 2,
        border: "1px solid",
        borderColor: themColor.ghost,
        borderRadius: 1,
        "&:hover": {
          borderColor: themColor.tertiary,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap" ,
          flexDirection:{
            xs:"column",
            sm:"column",
            md:"column",
            lg:"row"
          },
          alignItems: {
            lg:"end",
            md:"start",
            sm:"start",
            xs:"start"
          }, // Vertically center the items
          justifyContent: "flex-start", // Align items to the start; change to 'center' or 'space-between' as needed
          gap: "10px", // Space between items
          textAlign: "start",
        }}
      >
        <ToggleButtons
          selected={rule.show}
          onShowClick={onShowClick}
          onDontShowClick={onDontShowClick}
        />
        <RuleSelect value={rule.rule} onChange={onRuleChange} />
        <LinkInput value={rule.link} onChange={onLinkChange} />
      </Box>
      <IconButton onClick={onDeleteClick}>
        <DeleteOutlineIcon />
      </IconButton>
    </Box>
  );
};

export default TargetingRuleItem;
