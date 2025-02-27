import { DeleteOutlineRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import ActiveWidgetComponents from "src/components/activeWidgetListComponents/settings";
import { ContactSvg, NewSvg } from "src/components/svg";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { widgets } from "@/src/config";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import {
  ChannelSettings,
  ContactFormField,
  SettingsInterface,
} from "@/src/types/settings";
import IOSSwitch from "../../settingBtn/components/IOSSwitch";
import IOSSwitchComponent from "../../settingBtn";
import { textFieldStyles } from "../../settingBtn/components/textFieldStyles";
import { MuiPhone } from "../../pageOne/MuiPhone";
import { themColor } from "@/src/theme/themColor";
import NewToolTip from "../../newToolTip";
import BoxContainer from "../../settings/boxContainer/styled";
import toast from "react-hot-toast";

interface Widget {
  id: string;
  name: string;
  icon: string;
  background: string;
  color: string;
}

interface ActiveWidgetListProps {
  activeWidgets: Widget[];
  handleIconClick: (id: ChannelSettings) => void;
  state: SettingsInterface;
  setState: Dispatch<SetStateAction<SettingsInterface>>;
  widgets: Widget[];
  setWidgets: Dispatch<SetStateAction<Widget[]>>;

  agentsList: Boolean;
  setAgentsList: Dispatch<SetStateAction<boolean>>;
}

const ActiveWidgetList: React.FC<ActiveWidgetListProps> = ({
  activeWidgets,
  handleIconClick,
  state,
  setState,
  widgets,
  setWidgets,

  agentsList,
  setAgentsList,
}) => {
  console.log("activeWidgets", widgets);
  // const hasMatchingWidget = widgets
  //   .map((item) => {
  //     return state.channels.some(
  //       (channel: ChannelSettings) =>
  //         channel.channelType?.toLowerCase() === item.name.toLowerCase()
  //     );
  //   })
  //   .some((isMatch) => isMatch);

  // console.log("Has matching widget:", hasMatchingWidget);

  const [iconBgColor, setIconBgColor] = useState<{ [key: string]: string }>({});
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({
    "1": false,
    "2": false,
    "3": false,
    "4": false,
  });
  const [showOnDesktop, setShowOnDesktop] = useState<boolean>(false);
  const initialImages = state.channels?.reduce((acc, item) => {
    acc[item.channelType] = item.customImage || null; // Assuming `key` is a unique identifier in `state.channels`
    return acc;
  }, {} as { [key: string]: string | null });

  const [selectedImages, setSelectedImages] = useState<{
    [key: string]: string | null;
  }>(initialImages);

  console.log("selectedImages", selectedImages);
  // now change the image through state.channels.map((item)=> {item.customImage})
  const changeImage = state.channels
    .filter((channel) => channel.customImage)
    .forEach((channel) => {
      console.log("channel.customImage", channel.customImage);
    });
  console.log("changeImage", changeImage);
  const [value, setValue] = useState<string>("");
  const handleClick = () => {
    window.open(`https://wa.me/${value}/?text=Hi`, "_blank");
  };
  console.log("value", value);

  console.log("state", state);
  console.log("selected Color", selectedImages["1"]);

  // Drag and Drop Functionality
  const [fields, setFields] = useState(state.channels || []);
  console.log("fields", fields);

  useEffect(() => {
    console.log("isEditing state changed:", isEditing);
  }, [isEditing]);

  useEffect(() => {
    //   // if (state) {
    console.log("we are working");
    setFields(state.channels || []);
    // }
  }, [state.channels]);
  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const reorderedFields = [...fields];
    const [removed] = reorderedFields.splice(result.source.index, 1);
    reorderedFields.splice(result.destination.index, 0, removed);

    // Reassign the id based on the new index
    const updatedFields = reorderedFields.map((field, index) => ({
      ...field,
      id: (index + 1).toString(),
    }));

    setFields(updatedFields);
    setState({
      ...state,
      channels: updatedFields,
    });
  };

  const handleSetSelectedImage = (
    channelType: string,
    image: string | null
  ) => {
    console.log("code is here", channelType);

    setSelectedImages((prev) => ({
      ...prev,
      [channelType]: image,
    }));
  };
  useEffect(() => {
    console.log("image updated");
    if (Object.keys(selectedImages).length > 0) {
      const updatedChannels = state.channels.map((channel) => {
        return {
          ...channel,
          customImage:
            selectedImages[channel.channelType] || channel.customImage, // Use the selected image or keep the existing one
        };
      });

      setState({
        ...state,
        channels: updatedChannels,
      });
    }
  }, [selectedImages]);
  const handleRemoveImage = (channelType: string, image: any) => {
    setSelectedImages((prev) => {
      const updatedImages = { ...prev };
      delete updatedImages[channelType];
      return updatedImages;
    });

    setState((prevState) => {
      const updatedChannels = prevState.channels.map((channel) => {
        if (channel.channelType === channelType) {
          return { ...channel, customImage: "" };
        }
        return channel;
      });

      return { ...prevState, channels: updatedChannels };
    });

    toast.success("Image removed successfully!");
  };

  const handleIconBgColorChange = (id: string, color: string) => {
    setIconBgColor((prevColors) => ({
      ...prevColors,
      [id]: color,
    }));
  };
  console.log("fieldnewData", fields);
  console.log("iconBgColor", iconBgColor);

  console.log("state.chanels are", state.channels);

  const removeItem = (index: any, item: any) => {
    console.log("index", item.channelType);
    console.log("new", index);

    const newFields = [...fields];
    newFields.splice(index, 1);
    console.log("newFields", newFields);
    console.log("widgets", widgets);

    // Reassign the id based on the new index after removal
    const updatedWidgets = widgets.filter((widget) => {
      const widgetName = widget.name.toLowerCase();
      const itemChannelType = item.channelType.toLowerCase();
      return !(
        (widgetName === "custom5" ||
          widgetName === "custom6" ||
          widgetName === "custom7" ||
          widgetName === "custom8" ||
          widgetName === "custom9" ||
          widgetName === "custom10") &&
        widgetName === itemChannelType
      );
    });

    console.log("updatedWidgets", updatedWidgets);
    setWidgets(updatedWidgets);
    const updatedFields = newFields.map((field, i) => ({
      ...field,
      id: (i + 1).toString(),
    }));

    console.log("updatedFields", updatedFields);
    setFields(updatedFields);
    setState({
      ...state,
      channels: updatedFields,
    });
  };

  const contactForm = state.channels.find(
    (channel) => channel.channelType === "contact form"
  );

  //   fields: [
  //     {
  //       id: "1",
  //       channelType: "whatsapp",
  //       iconUrl: "/icons/whatsapp.svg",
  //       channelUrl: "https://wa.me/1234567890",
  //       iconBackground: "#54CF61",
  //       showOnDesktop: true,
  //       inputNumber: "+1",
  //       showOnMobile: true,
  //       hoverText: "WhatsApp",
  //       customImage: "",
  //       enableChatWidget: false,
  //       chatWidgetText: "How can I help you? :)",
  //       widgetHeading: "Let's Chat on WhatsApp",
  //       nickname: "Nickname",
  //       profileImage: "",
  //       placeholder: "Type your message...",
  //       presetMessage: "Hi, I need help with...",
  //     },
  //     {
  //       id: "2",
  //       channelType: "email",
  //       showOnDesktop: true,
  //       showOnMobile: true,
  //       hoverText: "Email",
  //       channelUrl: "demo@mail.com",
  //       iconBackground: "#FF4561",
  //       mailSubject: "Title and Url are Supported",
  //       iconUrl: "/icons/mail.svg",
  //       placeholder: "Example: john@example.com",
  //       customImage: "https://example.com/custom-email-image.png",
  //     },
  // ]
  const handleContactFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: ContactFormField,
    type: string
  ) => {
    const updatedChannels = state.channels.map((channel) => {
      if (channel.channelType === "contact form") {
        return {
          ...channel,
          fields: channel.fields?.map((f) => {
            if (f.id === field.id) {
              if (type === "enabled" || type === "required") {
                if (e.target instanceof HTMLInputElement) {
                  return {
                    ...f,
                    [type === "enabled" ? "isEnabled" : "required"]:
                      e.target.checked,
                  };
                }
              } else if (type === "fieldName" || type === "fieldPlaceholder") {
                return {
                  ...f,
                  [type === "fieldName" ? "fieldName" : "fieldPlaceholder"]:
                    e.target.value,
                };
              }
            }
            return f;
          }),
        };
      }
      return channel;
    });
    setState({
      ...state,
      channels: updatedChannels,
    });
  };
  const handleChangeDesktop = (id: string) => {
    const updatedChannels = state.channels.map((channel) => {
      if (channel.id === id) {
        return { ...channel, showOnDesktop: !channel.showOnDesktop };
      }
      return channel;
    });

    setState({ ...state, channels: updatedChannels });
  };
  const handleChangeMobile = (id: string) => {
    const updatedChannels = state.channels.map((channel) => {
      if (channel.id === id) {
        return { ...channel, showOnMobile: !channel.showOnMobile };
      }
      return channel;
    });

    setState({ ...state, channels: updatedChannels });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided: any) => (
          <Box>
            <Stack
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={{ padding: "20px", paddingBottom: "0px" }}
            >
              {fields.map((item: ChannelSettings, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided: any) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Box
                        key={item.id}
                        sx={{
                          width: "100%",
                          borderRadius: "10px",
                          background: "#f9fafb",
                          padding: "20px 15px",
                          border: `1px solid ${themColor.ghost}`,
                          position: "relative",
                          marginBottom: "20px",
                          // cursor: "pointer",
                          "&:hover": {
                            borderColor: themColor.tertiary,
                          },
                        }}
                      >
                        <Stack
                          sx={{
                            flexDirection: {
                              xs: "column",
                              sm: "row",
                            },
                          }}
                          gap={1}
                        >
                          <Grid
                            item
                            sx={{
                              background:
                                item.iconBackground ??
                                widgets.find(
                                  (widget) =>
                                    widget.name.toLowerCase() ===
                                    item.channelType?.toLowerCase()
                                )?.background,
                              borderRadius: "50%",
                              marginBottom: "5px",
                              padding: selectedImages[item.channelType]
                                ? ""
                                : "8px",
                              maxWidth: 45,
                              maxHeight: 45,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              transition: "all 0.3s ease",
                              overflow: "hidden",
                            }}
                          >
                            <img
                              style={{
                                width: "100%",
                                height: "100%",
                              }}
                              src={
                                selectedImages[item.channelType] ??
                                widgets.find(
                                  (widget) =>
                                    widget.name.toLowerCase() ===
                                    item.channelType?.toLowerCase()
                                )?.icon
                              }
                              alt={
                                widgets.find(
                                  (widget) =>
                                    widget.name.toLowerCase() ===
                                    item.channelType?.toLowerCase()
                                )?.name
                              }
                            />
                          </Grid>

                          <NewToolTip
                            width="160px"
                            placement="top"
                            tooltext={
                              "Choose country code from the dropdown menu. Or enter the country code (for example, +1), and then enter your phone number without the leading zero (example: 9878934509)"
                            }
                          >
                            <Box sx={{ width: "5%" }}>
                              <NewSvg />
                            </Box>
                          </NewToolTip>
                          {/* <TextField
                            fullWidth
                            placeholder={item.placeholder}
                            sx={textFieldStyles}
                            value={item.channelUrl}
                            onChange={(e) => {
                              setState({
                                ...state,
                                channels: state.channels.map((channel) =>
                                  channel.id === item.id
                                    ? {
                                        ...channel,
                                        channelUrl: e.target.value,
                                      }
                                    : channel
                                ),
                              });
                            }}
                          /> */}
                          <Box>
                            {item.channelType !== "contact form" ? (
                              item.channelType === "whatsapp" ? (
                                <>
                                  <Box
                                    position="relative"
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <MuiPhone
                                      value={item.channelUrl ?? ""}
                                      error={!item.channelUrl}
                                      onChange={(newValue) => {
                                        console.log(
                                          "Updated phone number:",
                                          newValue
                                        );
                                        setValue(newValue);
                                        setState({
                                          ...state,
                                          channels: state.channels.map(
                                            (field) =>
                                              field.id === item.id
                                                ? {
                                                    ...field,
                                                    channelUrl: newValue,
                                                  }
                                                : field
                                          ),
                                        });
                                      }}
                                    />

                                    <Button
                                      variant="outlined"
                                      sx={{
                                        marginLeft: "-60px", // Adjust the spacing as needed
                                        minWidth: "51px",
                                        borderColor: themColor.primary,
                                        color: themColor.primary,
                                        padding: "0px",
                                        height: "21px !important",
                                        borderRadius: "5px",
                                        "&:hover": {
                                          background:
                                            "rgba(102, 178, 255, 0.15) !important",
                                          borderColor: themColor.primary,
                                        },
                                      }}
                                      onClick={handleClick}
                                    >
                                      test
                                    </Button>
                                  </Box>
                                  {!item.channelUrl && (
                                    <Box
                                      sx={{ color: "red", fontSize: "12px" }}
                                    >
                                      Please Enter Details
                                    </Box>
                                  )}
                                </>
                              ) : (
                                <>
                                  <TextField
                                    fullWidth
                                    error={!item.channelUrl}
                                    placeholder={item.placeholder}
                                    sx={textFieldStyles}
                                    value={
                                      state.channels.find(
                                        (channel) => channel.id === item.id
                                      )?.channelUrl || ""
                                    }
                                    onChange={(e) => {
                                      setState({
                                        ...state,
                                        channels: state.channels.map(
                                          (channel) =>
                                            channel.id === item.id
                                              ? {
                                                  ...channel,
                                                  channelUrl: e.target.value,
                                                }
                                              : channel
                                        ),
                                      });
                                    }}
                                  />
                                  {!item.channelUrl && (
                                    <Box
                                      sx={{
                                        color: "red",
                                        fontSize: "12px",
                                      }}
                                    >
                                      Please Enter Details
                                    </Box>
                                  )}
                                </>
                              )
                            ) : (
                              <Box
                                sx={{
                                  width: "100%",
                                }}
                              >
                                {contactForm?.fields?.map((field) => {
                                  return (
                                    <Box
                                      sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        width: "100%",
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <FormControlLabel
                                          control={
                                            <IOSSwitch
                                              sx={{ m: 1 }}
                                              checked={field.isEnabled}
                                              onChange={(e) => {
                                                handleContactFormChange(
                                                  e,
                                                  field,
                                                  "enabled"
                                                );
                                              }}
                                            />
                                          }
                                          label=""
                                        />
                                        {isEditing[field.id] ? (
                                          <TextField
                                            value={field.fieldName}
                                            onChange={(e) => {
                                              handleContactFormChange(
                                                e,
                                                field,
                                                "fieldName"
                                              );
                                            }}
                                            onBlur={() => {
                                              setIsEditing((prev) => ({
                                                ...prev,
                                                [field.id]: false,
                                              }));
                                            }}
                                            sx={{
                                              ...textFieldStyles,
                                              "& .MuiOutlinedInput-root": {
                                                ...textFieldStyles[
                                                  "& .MuiOutlinedInput-root"
                                                ],
                                                height: "30px", // Override width to be 100%
                                                width: "100%", // Override width to be 100%
                                              },
                                            }}
                                            autoFocus
                                          />
                                        ) : (
                                          <Button
                                            endIcon={<ContactSvg />}
                                            sx={{
                                              alignItems: "center",
                                              height: "30px !important",
                                              cursor: "pointer",
                                              color: themColor.tertiary,
                                            }}
                                            onClick={() => {
                                              setIsEditing((prev) => ({
                                                ...prev,
                                                [field.id]: true,
                                              }));
                                            }}
                                          >
                                            {field.fieldName}
                                          </Button>
                                        )}
                                      </Box>
                                      <Box
                                        sx={{
                                          display: "flex",
                                          flexDirection: {
                                            xs: "column",
                                            sm: "row",
                                            md: "column",
                                            lg: "row",
                                          },
                                          marginY: "1px",
                                          opacity: field.isEnabled ? 1 : 0.3,
                                        }}
                                      >
                                        <TextField
                                          disabled={!field.isEnabled}
                                          placeholder={field.fieldPlaceholder}
                                          value={field.fieldPlaceholder}
                                          onChange={(e) => {
                                            handleContactFormChange(
                                              e,
                                              field,
                                              "fieldPlaceholder"
                                            );
                                          }}
                                          sx={{
                                            ...textFieldStyles,
                                            "& .MuiOutlinedInput-root": {
                                              ...textFieldStyles[
                                                "& .MuiOutlinedInput-root"
                                              ],
                                              width: "17rem",
                                            },
                                          }}
                                        />
                                        <Box
                                          sx={{
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          <Checkbox
                                            disabled={!field.isEnabled} // Enable or disable based on checkbox status
                                            checked={field.required} // Bind state to checkbox
                                            onChange={(e) => {
                                              handleContactFormChange(
                                                e,
                                                field,
                                                "required"
                                              );
                                            }}
                                            sx={{
                                              color: themColor.primary,
                                              "&.Mui-checked": {
                                                color: themColor.primary,
                                              },
                                              "&:hover": {
                                                background: "none",
                                              },
                                            }}
                                          />
                                          <Typography
                                            variant="body2"
                                            color={themColor.secondary}
                                          >
                                            Required
                                          </Typography>
                                        </Box>
                                      </Box>
                                    </Box>
                                  );
                                })}
                              </Box>
                            )}
                            {item.channelType === "whatsapp" && (
                              <IOSSwitchComponent
                                state={state}
                                setState={setState}
                                sx={undefined}
                              />
                            )}

                            <ActiveWidgetComponents
                              setAgentsList={setAgentsList}
                              agentsList={agentsList}
                              item={item}
                              state={state}
                              setState={setState}
                              Color={iconBgColor[item.id]}
                              Desktop={() => handleChangeDesktop(item.id)}
                              setColor={(color) =>
                                handleIconBgColorChange(item.id, color)
                              }
                              selectedImage={selectedImages[item.channelType]}
                              setSelectedImage={(image) =>
                                handleSetSelectedImage(item.channelType, image)
                              }
                              Mobile={() => handleChangeMobile(item.id)}
                              handleRemoveImage={() =>
                                handleRemoveImage(item.channelType, null)
                              }
                              bgColor={
                                widgets.find(
                                  (widget) =>
                                    widget.name.toLowerCase() ===
                                    item.channelType?.toLowerCase()
                                )?.background || ""
                              }
                              imgNam={
                                widgets.find(
                                  (widget) =>
                                    widget.name.toLowerCase() ===
                                    item.channelType?.toLowerCase()
                                )?.name || ""
                              }
                              showOnDesktop={
                                state.channels.find(
                                  (channel) => channel.id === item.id
                                )?.showOnDesktop || false
                              }
                              showOnMobile={
                                state.channels.find(
                                  (channel) => channel.id === item.id
                                )?.showOnMobile || false
                              }
                              // handleSetSelectedImage={handleSetSelectedImage} // maybe this has no use
                            />
                          </Box>
                        </Stack>
                        <IconButton
                          sx={{
                            border: "none",
                            position: "absolute",
                            top: "4px",
                            right: "4px",
                            color: themColor.tertiary,
                            "& .MuiSvgIcon-root": {
                              color: themColor.tertiary,
                            },
                          }}
                          // onClick={() => handleIconClick(item)}
                          onClick={() => {
                            removeItem(index, item);
                            setAgentsList(false);
                          }}
                        >
                          <DeleteOutlineRounded />
                        </IconButton>
                      </Box>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Stack>
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ActiveWidgetList;
