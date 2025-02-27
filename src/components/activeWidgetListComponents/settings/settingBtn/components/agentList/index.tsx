import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, TextField, Paper, Grid, IconButton, Box } from "@mui/material";
import {
  PersonAddAlt,
  SettingsOutlined,
  DeleteOutlineRounded,
} from "@mui/icons-material";
import { themColor } from "@/src/theme/themColor";
import { textFieldStyles } from "@/src/components/settingBtn/components/textFieldStyles";
import {
  Agent,
  ChannelSettings,
  SettingsInterface,
} from "@/src/types/settings";

export default function AgentList({
  state,
  setState,
  channel,
  addNewAgent,
}: {
  state: SettingsInterface;
  setState: Dispatch<SetStateAction<SettingsInterface>>;
  channel: ChannelSettings;
  addNewAgent: () => void;
}) {
  const [settingsState, setSettingsState] = useState<Record<string, boolean>>(
    {}
  );
  console.log(" ", state);

  const deleteAgent = (agentId: string) => {
    const updatedChannels = state.channels.map((channel) => ({
      ...channel,
      agents: channel.agents?.filter((agent) => agent.id !== agentId),
    }));

    setState({ ...state, channels: updatedChannels });
  };

  const updateAgent = (agentId: string, field: keyof Agent, value: string) => {
    const updatedChannels = state.channels.map((channel) => ({
      ...channel,
      agents: channel.agents?.map((agent) =>
        agent.id === agentId ? { ...agent, [field]: value } : agent
      ),
    }));

    setState({ ...state, channels: updatedChannels });
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    agentId: string
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateAgent(agentId, "profileImage", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (agentId: string) => {
    updateAgent(agentId, "profileImage", "");
  };

  // Toggle settings for a specific agent
  const toggleSettings = (agentId: string) => {
    setSettingsState((prev) => ({
      ...prev,
      [agentId]: !prev[agentId],
    }));
  };

  return (
    <Box
      sx={{
        maxWidth: "420px",
      }}
    >
      {channel?.agents?.map((agent) => (
        <>
          <Paper
            key={agent.id}
            sx={{
              position: "relative",
              border: "1px solid",
              borderRadius: "8px",
              borderColor: "#e5e9eb",
              "&:hover": {
                borderColor: themColor.tertiary,
              },
              padding: " 32px 16px 16px 16px",
              marginBottom: "16px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <div
                  style={{
                    background: channel?.iconBackground,
                    maxWidth: "45px",
                    width: "45px",
                    maxHeight: "45px",
                    height: "auto !important",
                    borderRadius: "50%",
                    overflow: "hidden",
                    padding: agent.profileImage ? "0px" : "8px",
                  }}
                >
                  <img
                    src={agent.profileImage || agent.iconUrl}
                    alt={agent.userName || "Agent"}
                    style={{
                      width: "100%",
                      height: agent.profileImage && "45px",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  sx={{
                    ...textFieldStyles,
                    "& .MuiOutlinedInput-root": {
                      ...textFieldStyles["& .MuiOutlinedInput-root"],
                      height: "70%",
                    },
                  }}
                  // type="number"
                  fullWidth
                  value={agent.handle}
                  // value={
                  //  channel
                  // }
                  // value={"agent"}
                  onChange={(e) =>
                    updateAgent(agent.id, "handle", e.target.value)
                  }
                  placeholder="+1234567890"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  value={agent.userName}
                  inputProps={{ maxLength: 12 }}
                  onChange={(e) =>
                    updateAgent(agent.id, "userName", e.target.value)
                  }
                  placeholder="Name"
                  sx={{
                    ...textFieldStyles,
                    "& .MuiOutlinedInput-root": {
                      ...textFieldStyles["& .MuiOutlinedInput-root"],
                      height: "70%",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  // maxRows={12}
                  fullWidth
                  value={agent?.salesSupport}
                  onChange={(e) =>
                    updateAgent(agent.id, "salesSupport", e.target.value)
                  }
                  inputProps={{ maxLength: 12 }}
                  placeholder="Name"
                  sx={{
                    ...textFieldStyles,
                    "& .MuiOutlinedInput-root": {
                      ...textFieldStyles["& .MuiOutlinedInput-root"],
                      height: "70%",
                    },
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
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
                  onClick={() => toggleSettings(agent.id)}
                  startIcon={
                    <SettingsOutlined
                      sx={{
                        width: { lg: "1.5rem", md: "1rem", sm: "1.2rem" },
                      }}
                    />
                  }
                >
                  Settings
                </Button>
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    color: themColor.tertiary,
                  }}
                  onClick={() => deleteAgent(agent.id)}
                >
                  <DeleteOutlineRounded />
                </IconButton>
              </Grid>
            </Grid>
            {settingsState[agent.id] && (
              <Grid
                container
                spacing={2}
                sx={{
                  marginTop: 0,
                }}
              >
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id={`icon-button-file-${agent.id}`}
                    type="file"
                    onChange={(event) => handleImageChange(event, agent.id)}
                  />
                  {agent?.profileImage && (
                    <Box
                      sx={{
                        background: channel?.iconBackground,
                        maxWidth: "45px",
                        width: "45px",
                        maxHeight: "45px",
                        height: "auto !important",
                        borderRadius: "50%",
                        overflow: "hidden",
                        padding: agent.profileImage ? "0px" : "8px",
                      }}
                    >
                      <img
                        src={agent.profileImage || agent.iconUrl}
                        alt={agent.userName || "Agent"}
                        style={{
                          width: "100%",
                          height: agent.profileImage && "45px",
                          borderRadius: "50%",
                        }}
                      />
                    </Box>
                  )}

                  <label htmlFor={`icon-button-file-${agent.id}`}>
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
                        borderRadius: "5px",
                        fontWeight: "400",
                        padding: "3px 10px",
                        height: "auto !important",
                      }}
                      onClick={() => {
                        if (agent.profileImage) {
                          removeImage(agent.id);
                        } else {
                          document
                            .getElementById(`icon-button-file-${agent.id}`)
                            ?.click();
                        }
                      }}
                    >
                      {agent.profileImage ? "Remove Image" : "Upload Image"}
                    </Button>
                  </label>
                </Grid>
              </Grid>
            )}
          </Paper>
        </>
      ))}
      <Button
        onClick={addNewAgent}
        sx={{
          border: `1px solid ${themColor.neutral}`,
          color: themColor.secondary,
          margin: "0 auto",
          width: "100%",
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
        startIcon={<PersonAddAlt sx={{ width: "1rem" }} />}
      >
        Add new Agent
      </Button>
    </Box>
  );
}
