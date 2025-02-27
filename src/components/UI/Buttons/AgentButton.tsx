import { themColor } from "@/src/theme/themColor";
import { ChannelSettings } from "@/src/types/settings";
import { PersonAddAlt, SettingsOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
interface AgentButtonProps {
  addNewAgent: () => void;
  setAgentsList: Dispatch<SetStateAction<boolean>>;
  item: ChannelSettings;
  setActiveChannelType: Dispatch<SetStateAction<string | null>>;
  setSettings: Dispatch<SetStateAction<boolean>>;
}

const AgentButton: React.FC<AgentButtonProps> = ({
  addNewAgent,
  setAgentsList,
  item,
  setActiveChannelType,
  setSettings,
}) => {
  const handleIconClick = (channelType: string) => {
    setActiveChannelType((prevType) =>
      prevType === channelType ? null : channelType
    );
    setSettings((prev) => !prev);
  };

  return (
    <>
      {item?.agents &&
        item?.agents.length <= 0 &&
        item.channelType === "whatsapp" && (
          <Button
            sx={{
              border: `1px solid ${themColor.neutral}`,
              color: themColor.secondary,
              fontSize: {
                lg: "0.75rem",
                md: "0.625rem",
                sm: "0.7rem",
                xs: "0.7rem",
              },
              alignItems: "center",
              borderRadius: "4px",
              fontWeight: "400",
              padding: "3px 10px",
              height: "auto !important",
            }}
            onClick={() => {
              addNewAgent();
              setAgentsList(true);
            }}
            startIcon={
              <PersonAddAlt sx={{ width: "1rem", fontWeight: "400" }} />
            }
          >
            Add Agents
          </Button>
        )}
      <Button
        onClick={() => handleIconClick(item.channelType)}
        sx={{
          border: `1px solid`,
          borderColor: themColor.neutral,
          color: themColor.secondary,
          fontSize: {
            lg: "0.75rem",
            md: "0.625rem",
            sm: "0.7rem",
            xs: "0.7rem",
          },
          alignItems: "center",
          borderRadius: "4px",
          fontWeight: "400",
          padding: "3px 10px",
          height: "auto !important",
        }}
        startIcon={
          <SettingsOutlined
            sx={{
              width: {
                lg: "1.5rem",
                md: "1rem",
                sm: "1.2rem",
              },
              fontWeight: "400",
            }}
          />
        }
      >
        Settings
      </Button>
    </>
  );
};

export default AgentButton;
