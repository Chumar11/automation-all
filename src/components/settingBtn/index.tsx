import { Box, TextField, Typography } from "@mui/material";
import EnableWidgetSwitch from "./components/enableWidgetSwitch";
import AdjustableTextField from "./components/adjustableTextField";
import { textFieldStyles } from "./components/textFieldStyles";
import { themColor } from "@/src/theme/themColor";
import ImageUploadComponent from "../activeWidgetListComponents/settings/settingBtn/components/imageUploadComponent";
import { SettingsInterface } from "@/src/types/settings";
import { Dispatch, SetStateAction } from "react";
// import { themColor } from "@/src/theme/themColor";
const IOSSwitchComponent = ({
  sx,
  state,
  setState,
}: {
  sx: any;
  state: SettingsInterface;
  setState: Dispatch<SetStateAction<SettingsInterface>>;
}) => {
  return (
    <>
      {state?.channels
        .filter((channel) => channel?.channelType === "whatsapp")
        .map((channel) => {
          const handleImageUpload = (
            event: React.ChangeEvent<HTMLInputElement>
          ) => {
            const file = event.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setState({
                  ...state,
                  channels: state.channels.map((ch: any) =>
                    ch.id === channel.id
                      ? { ...ch, profileImage: reader.result as string }
                      : ch
                  ),
                });
              };
              reader.readAsDataURL(file);
            }
          };

          const handleRemoveImage = () => {
            setState({
              ...state,
              channels: state.channels.map((ch: any) =>
                ch.id === channel.id ? { ...ch, profileImage: null } : ch
              ),
            });
          };
          return (
            <>
              <Box
                sx={{
                  margin: "5px 10px 10px 10px",
                }}
              >
                <EnableWidgetSwitch
                  key={channel.id}
                  checked={channel.enableChatWidget}
                  onChange={() =>
                    setState({
                      ...state,
                      channels: state.channels.map((ch) =>
                        ch.id === channel.id
                          ? { ...ch, enableChatWidget: !ch.enableChatWidget }
                          : ch
                      ),
                    })
                  }
                  label={"Enable WhatsApp Chat Widget 💬"}
                />
              </Box>
              {channel.enableChatWidget && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <AdjustableTextField
                    value={channel.chatWidgetText}
                    onChange={(e) => {
                      let value = e.target.value;
                      console.log("state", value);
                      setState({
                        ...state,
                        channels: state.channels.map((ch: any) =>
                          ch.id === channel.id
                            ? { ...ch, chatWidgetText: value }
                            : ch
                        ),
                      });
                    }}
                    placeholder="Widget Name"
                  />

                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: { xs: ".85rem", sm: ".875rem" },
                        color: themColor.tertiary,
                        pb: 1,
                      }}
                    >
                      Heading
                    </Typography>
                    <TextField
                      placeholder="Let's chat on WhatsApp"
                      variant="outlined"
                      fullWidth
                      value={channel.widgetHeading}
                      onChange={(e) =>
                        setState({
                          ...state,
                          channels: state.channels.map((ch: any) =>
                            ch.id === channel.id
                              ? { ...ch, widgetHeading: e.target.value }
                              : ch
                          ),
                        })
                      }
                      sx={textFieldStyles}
                    />
                  </Box>

                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: { xs: ".85rem", sm: ".875rem" },
                        color: themColor.tertiary,
                        mb: -1,
                      }}
                    >
                      Nickname
                    </Typography>
                  </Box>

                  <TextField
                    placeholder="Nickname"
                    variant="outlined"
                    fullWidth
                    value={channel.nickname || ""}
                    onChange={(e) =>
                      setState({
                        ...state,
                        channels: state.channels.map((ch: any) =>
                          ch.id === channel.id
                            ? { ...ch, nickname: e.target.value }
                            : ch
                        ),
                      })
                    }
                    sx={textFieldStyles}
                  />
                  <ImageUploadComponent
                    title="Custom Image"
                    imgTitle="Upload Image"
                    selectedImage={channel.profileImage}
                    handleImageUpload={handleImageUpload}
                    handleRemoveImage={handleRemoveImage}
                  />

                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: { xs: ".85rem", sm: ".875rem" },
                        color: themColor.tertiary,
                        pb: 1,
                      }}
                    >
                      Text input placeholder
                    </Typography>
                    <TextField
                      sx={{
                        ...textFieldStyles, // Spread the existing styles
                        "& .MuiOutlinedInput-root": {
                          ...textFieldStyles["& .MuiOutlinedInput-root"], // Spread existing nested styles if needed
                          width: "128%", // Override the width property
                        },
                      }}
                      value={channel.presetMessage}
                      onChange={(e) =>
                        setState({
                          ...state,
                          channels: state.channels.map((ch) =>
                            ch.id === channel.id
                              ? {
                                  ...ch,
                                  presetMessage: e.target.value, // Set the new input value
                                }
                              : ch
                          ),
                        })
                      }
                      placeholder={channel.presetMessage}
                    />
                  </Box>
                </Box>
              )}
            </>
          );
        })}
    </>
  );
};

export default IOSSwitchComponent;
