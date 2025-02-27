import {
  Box,
  Button,
  Card,
  CardMedia,
  ClickAwayListener,
  FormControlLabel,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { IOSSwitch } from "../../../utils/IosSwitch";
import { StyledButton } from "../../../utils/StyledButton";
import { Typo } from "../Typography";
import ProFeature from "../profeature";
import { SizeButton } from "../DesktopWidgetSize";
import WidgetIcons from "../widgetIcons";
import { ChromePicker } from "react-color";
import NewToolTip from "../../newToolTip";
import { NewSvg } from "../../svg";
import { themColor } from "@/src/theme/themColor";
import { SettingsInterface } from "@/src/types/settings";
import { string } from "yup";
import { MobileWidgetSize } from "../MobileWidgetSize";

interface steperProps {
  state: SettingsInterface;
  setState: React.Dispatch<React.SetStateAction<any>>;
}

export const StepperTwo: React.FC<steperProps> = ({ ...props }) => {
  const { state, setState } = props;
  const handleNew = state?.widgetcustomization?.closeButton;
  const animationNew = state?.widgetcustomization?.animationCustom;

  const [click, setclick] = useState(false);
  const [click1, setclick1] = useState(false);
  const [mobileClick1, setMobileClick1] = useState(false);
  const [selectedButton, setSelectedButton] = useState(
    state?.widgetcustomization?.position?.type
  );
  const [selectedButton1, setSelectedButton1] = useState(
    state.widgetcustomization?.position?.custom?.customPosition
  );
  const [selectedButton2, setSelectedButton2] = useState(
    state?.widgetcustomization?.iconsView
  );
  const [selectedButton3, setSelectedButton3] = useState(
    state?.widgetcustomization?.widgetSize || ""
  );

  const [selectedMobileButton3, setSelectedMobileButton3] = useState(
    state?.widgetcustomization?.MobileWidgetSize || ""
  );

  const [value, setValue] = useState(
    state.widgetcustomization?.callToActionText
  );
  const [AvatarShowPicker, setAvatarShowPicker] = useState(false);
  const [TextShowPicker, setTextShowPicker] = useState(false);
  const [BGShowPicker, setBGShowPicker] = useState(false);
  const StateColor = state?.widgetcustomization?.widgetColor;
  const SideSpacing = state?.widgetcustomization?.position?.custom?.sideSpacing;
  console.log("SideSpacing", SideSpacing);

  const BottomSpacing =
    state?.widgetcustomization?.position?.custom?.bottomSpacing;

  const Changevalue = (event: SelectChangeEvent<any>) => {
    const value = event.target.value as string;
    setState({
      ...state,
      widgetcustomization: {
        ...state.widgetcustomization,
        defaultState: value,
      },
    });
    console.log(event.target.value);
  };

  const handleChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      widgetcustomization: {
        ...state.widgetcustomization,
        viewType: event.target.value,
      },
    });
  };
  const radioChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      widgetcustomization: {
        ...state.widgetcustomization,
        callToActionBehavior: event.target.value,
      },
    });
  };

  const ValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setState({
      ...state,
      widgetcustomization: {
        ...state.widgetcustomization,
        position: {
          ...state?.widgetcustomization?.position,
          custom: {
            ...state?.widgetcustomization?.position?.custom,
            sideSpacing: value,
          },
        },
      },
    });
  };
  const BottomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setState({
      ...state,
      widgetcustomization: {
        ...state.widgetcustomization,
        position: {
          ...state?.widgetcustomization?.position,
          custom: {
            ...state?.widgetcustomization?.position?.custom,
            bottomSpacing: value,
          },
        },
      },
    });
  };

  const handleButtonClick = (btn: "left" | "right" | "custom") => {
    setclick(false);
    if (btn === "custom") {
      setclick(true);
    }
    setSelectedButton(btn);
    setState({
      ...state,
      widgetcustomization: {
        ...state.widgetcustomization,
        position: {
          ...state?.widgetcustomization?.position,
          type: btn,
        },
      },
    });
  };
  const handleButtonClick1 = (btn: "left" | "right") => {
    setSelectedButton1(btn);
    setState({
      ...state,
      widgetcustomization: {
        ...state.widgetcustomization,
        position: {
          ...state?.widgetcustomization?.position,
          custom: {
            ...state?.widgetcustomization?.position?.custom,
            customPosition: btn,
          },
        },
      },
    });
  };
  const handleButtonClick2 = (btn: "vertical" | "horizontal") => {
    setSelectedButton2(btn);
    setState({
      ...state,
      widgetcustomization: {
        ...state.widgetcustomization,
        iconsView: btn,
      },
    });
  };

  return (
    <Box>
      <Typography
        sx={{
          fontWeight: "600",
          fontSize: "1.25rem",
          color: themColor.secondary,
          fontFamily: "Rubik, sans-serif",
          lineHeight: "1.4",
          marginX: "5px",
          position: "relative",
          "&::before": {
            borderRadius: "4px",
            content: '""',
            width: "4px",
            height: "60%",
            color: themColor.primary,
            backgroundColor: themColor.primary,
            position: "absolute",
            left: "-12px",
            top: "20%",
          },
          marginBottom: "20px",
        }}
      >
        Popup Message Design and Behavior
      </Typography>

      {/* card images radio */}
      <Box gap={2} sx={{ display: "flex " }}>
        <Box
          data-value="simple"
          onClick={(event) =>
            setState({
              ...state,
              widgetcustomization: {
                ...state.widgetcustomization,
                viewType: event.currentTarget.getAttribute("data-value"),
              },
            })
          }
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <Card
            sx={{
              maxWidth: 140,
              border: `1px solid ${
                state?.widgetcustomization?.viewType === "simple"
                  ? themColor.primary
                  : themColor.ghost
              }`,
            }}
          >
            <CardMedia
              component="img" // Ensures the image is rendered correctly
              image="/svg/2.svg"
              title="card1"
            />
          </Card>
          <Typography sx={{ fontSize: "14px", color: themColor.secondary }}>
            <Radio
              value="simple"
              checked={state?.widgetcustomization?.viewType === "simple"}
              onChange={handleChanged}
              sx={{
                "&.Mui-checked": {
                  color: themColor.primary,
                },
                "&:hover": {
                  background: "none",
                },
                "& .MuiSvgIcon-root": {
                  fontSize: "1.1rem", // Custom icon size
                },
                marginLeft: "-9px",
                marginRight: "-6px",
              }}
            />{" "}
            Simple veiw
          </Typography>
        </Box>

        <Box
          data-value="chat"
          onClick={(event) =>
            setState({
              ...state,
              widgetcustomization: {
                ...state.widgetcustomization,
                viewType: event.currentTarget.getAttribute("data-value"),
              },
            })
          }
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <Card
            sx={{
              maxWidth: 140,
              border: `1px solid ${
                state?.widgetcustomization?.viewType === "chat"
                  ? themColor.primary
                  : themColor.ghost
              }`,
            }}
          >
            <CardMedia
              component="img" // Ensures the image is rendered correctly
              image="/svg/1.svg"
              title="card1"
            />
          </Card>
          <Typography sx={{ fontSize: "14px", color: themColor.secondary }}>
            <Radio
              value="chat"
              checked={state?.widgetcustomization?.viewType === "chat"}
              // disabled
              onChange={handleChanged}
              sx={{
                marginRight: "-6px",
                marginLeft: "-9px",
                "&.Mui-checked": {
                  color: themColor.primary,
                },
                "&:hover": {
                  background: "none",
                },
                "& .MuiSvgIcon-root": {
                  fontSize: "1.1rem", // Custom icon size
                },
              }}
            />{" "}
            Chat veiw
          </Typography>
        </Box>
      </Box>

      {/* color widget */}
      <ClickAwayListener onClickAway={() => setAvatarShowPicker(false)}>
        <Box sx={{ position: "relative", display: "inline-block" }}>
          <Typo tittle={"Widget Color"} />
          <Box
            sx={{
              display: "inline-block",
              width: "40px",
              height: "40px",
              border: `2px solid  StateColor`,
              borderRadius: "50%",
              backgroundColor: StateColor,
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => setAvatarShowPicker(true)}
          ></Box>

          {/* Color Picker */}
          {AvatarShowPicker && (
            <ChromePicker
              color={StateColor}
              onChange={({ hex }) =>
                setState({
                  ...state,
                  widgetcustomization: {
                    ...state.widgetcustomization,
                    widgetColor: hex,
                  },
                })
              }
            />
          )}
        </Box>
      </ClickAwayListener>

      {/* positions */}
      <Box>
        <Typo tittle={"Position"} />
        <Box
          sx={{
            backgroundColor: themColor.ghost,
            color: themColor.secondary,
            display: "inline-block",
            borderRadius: "6px",
            padding: "4px",
          }}
        >
          <StyledButton
            selected={selectedButton === "left"}
            onClick={() => handleButtonClick("left")}
          >
            Left
          </StyledButton>
          <StyledButton
            selected={selectedButton === "right"}
            onClick={() => handleButtonClick("right")}
          >
            Right
          </StyledButton>
          <StyledButton
            selected={selectedButton === "custom"}
            onClick={() => handleButtonClick("custom")}
          >
            Custom
          </StyledButton>
        </Box>

        <Box
          sx={{
            display: `${selectedButton === "custom" ? "Block" : "none"}`,
          }}
        >
          <Box
            sx={{
              backgroundColor: "#f9fafb",
              borderRadius: "8px",
              border: `1px solid ${themColor.ghost}`,
              marginTop: "10px",
              padding: "20px",
              display: "flex",
              flexDirection: {
                lg: "row",
                md: "row",
                sm: "row",
                xs: "column",
              },
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: ".875rem",
                  lineHeight: "32px",
                  color: themColor.tertiary,
                  marginBottom: "8px",
                }}
              >
                Side Selection
              </Typography>
              <Box
                sx={{
                  backgroundColor: themColor.ghost,
                  color: themColor.secondary,
                  display: "inline-block",
                  borderRadius: "6px",
                  padding: "4px",
                }}
              >
                <StyledButton
                  selected={selectedButton1 === "left"}
                  onClick={() => handleButtonClick1("left")}
                >
                  Left
                </StyledButton>
                <StyledButton
                  selected={selectedButton1 === "right"}
                  onClick={() => handleButtonClick1("right")}
                >
                  Right
                </StyledButton>
              </Box>
            </Box>
            <Box
              sx={{
                marginLeft: {
                  xs: "0px",
                  sm: "28px",
                  md: "28px",
                  lg: "28px",
                  xl: "28px",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: ".875rem",
                  lineHeight: "32px",
                  color: themColor.tertiary,
                  marginBottom: "8px",
                }}
              >
                Bottom Spacing
              </Typography>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <TextField
                    type="number"
                    sx={{
                      width: "48px",
                      "& .MuiInputBase-root": {
                        height: "45px",
                        outline: "none",
                      },
                      fontSize: "1rem",
                      color: themColor.secondary,
                      display: "inline-block",
                    }}
                    onChange={BottomChange}
                    defaultValue={BottomSpacing}
                  />
                  <Typography
                    sx={{
                      fontSize: ".875rem",
                      lineHeight: "32px",
                      color: themColor.tertiary,
                      marginLeft: "5px",
                      marginTop: "10px",
                    }}
                  >
                    px
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                marginLeft: {
                  xs: "0px",
                  sm: "28px",
                  md: "28px",
                  lg: "28px",
                  xl: "28px",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: ".875rem",
                  lineHeight: "32px",
                  color: themColor.tertiary,
                  marginBottom: "8px",
                }}
              >
                Side Spacing
              </Typography>
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <TextField
                  type="number"
                  sx={{
                    width: "48px",
                    "& .MuiInputBase-root": {
                      height: "45px",
                      outline: "none",
                    },
                    fontSize: "1rem",
                    color: themColor.secondary,
                    display: "inline-block",
                  }}
                  onChange={ValueChange}
                  defaultValue={SideSpacing}
                />
                <Typography
                  sx={{
                    fontSize: ".875rem",
                    lineHeight: "32px",
                    color: themColor.tertiary,
                    marginLeft: "5px",
                    marginTop: "10px",
                  }}
                >
                  px
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Directions */}
      <Box>
        <Typo tittle={"Icons Veiw"} />

        <Box
          sx={{
            backgroundColor: themColor.ghost,
            color: themColor.secondary,
            display: "inline-block",
            borderRadius: "6px",
            padding: "4px",
          }}
        >
          <StyledButton
            selected={selectedButton2 === "vertical"}
            onClick={() => handleButtonClick2("vertical")}
          >
            Vertical
          </StyledButton>
          <StyledButton
            selected={selectedButton2 === "horizontal"}
            onClick={() => handleButtonClick2("horizontal")}
          >
            Horizontal
          </StyledButton>
        </Box>
      </Box>

      {/* Default S */}
      <Box
        sx={{
          position: "relative",
          display: "inline-block",
        }}
      >
        <Typo tittle={"Default State"} />

        <Select
          value={state?.widgetcustomization?.defaultState}
          onChange={Changevalue}
          displayEmpty
          sx={{
            width: "220px",
            height: "40px",
            fontSize: "17px",
            "& .MuiOutlinedInput-root": {
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "themColor.ghost", // Remove border color change on hover
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: themColor.primary, // Set border color when focused
              },
            },
          }}
        >
          <MenuItem value="click">Click To Open</MenuItem>
          <MenuItem value="hover">Hover To Open</MenuItem>
          <MenuItem value="opened">Opened by Default</MenuItem>
        </Select>
      </Box>

      {/* close button */}
      <Box
        sx={{
          display:
            state?.widgetcustomization?.defaultState === "opened"
              ? "block"
              : "none",
        }}
      >
        <Typo tittle={"Show Close Button"} />
        <IOSSwitch
          conditionType="closeButton"
          sx={{ m: 1 }}
          state={state}
          setState={setState}
          handleNew={handleNew}
        />
      </Box>

      {/* ATTenetion  */}
      <Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typo tittle={"Attention Effects"} />
          <NewToolTip
            tooltext={
              "Add an eye-catching effect to your widget. Adding an attention effect will increase your click rate and increase the visibility of your Ichonic widget. Select one of the available attention effect: Bounce, Waggle, Sheen, Spin, Fade, Shockwave, Blink, and Pulse which can be seen below"
            }
            width="160px"
            placement="top"
          >
            <IconButton
              sx={{
                mt: 1.2,
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <NewSvg />
            </IconButton>
          </NewToolTip>
        </Box>

        <IOSSwitch
          conditionType="attention"
          sx={{ m: 1 }}
          state={state}
          setState={setState}
          handleNew={animationNew}
        />
      </Box>

      {/* pending messages */}
      <Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typo tittle={"Pending Messages"} />
          <NewToolTip
            tooltext={
              "Increase your click rate by displaying a pending messages icon near your Ichonic widget to let your visitors know that you're waiting for them to contact you."
            }
            width="160px"
            placement="top"
          >
            <IconButton
              sx={{
                mt: 1.2,
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <NewSvg />
            </IconButton>
          </NewToolTip>
        </Box>

        <TextField
          type="number"
          sx={{
            marginTop: "-5px",
            width: "152px",
            "& .MuiInputBase-root": {
              height: "35px",
              outline: "none",
            },
            fontSize: "1rem",
            color: themColor.secondary,
            display: "block",
            "&:hover": { background: "rgba(102, 178, 255, 0.15) !important" },
          }}
          onChange={(event) => {
            setState({
              ...state,
              widgetcustomization: {
                ...state.widgetcustomization,
                PendingMessage: event.target.value,
              },
            });
          }}
          defaultValue={state?.widgetcustomization?.PendingMessage}
        />
      </Box>

      {/* Widget Icons */}
      <WidgetIcons state={state} setState={setState} />

      {/* call to acction */}
      <Box>
        <Typo tittle={"Call To Action"} />
        <TextField
          value={value}
          onChange={(e) => {
            setValue(e.target.value);

            setState({
              ...state,
              widgetcustomization: {
                ...state.widgetcustomization,
                callToActionText: e.target.value,
              },
            });
          }}
          sx={{
            width: "60%",
            "& .MuiOutlinedInput-root": {
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: themColor.ghost, // Remove border color change on hover
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: themColor.primary, // Set border color when focused
              },
            },
          }}
        />
      </Box>

      {/* widest Size */}
      <SizeButton
        state={state}
        setState={setState}
        click1={click1}
        setClick1={setclick1}
        selectedButton3={selectedButton3}
        setSelectedButton3={setSelectedButton3}
      />

      <MobileWidgetSize
        state={state}
        setState={setState}
        click1={mobileClick1}
        setClick1={setMobileClick1}
        selectedMobileButton3={selectedMobileButton3}
        setSelectedMobileButton3={setSelectedMobileButton3}
      />

      {/* Call TO ACTION Color */}
      <ClickAwayListener
        onClickAway={() => {
          setTextShowPicker(false);
          setBGShowPicker(false);
        }}
      >
        <Box sx={{ display: "flex", position: "relative" }}>
          <Box>
            <Typography
              sx={{
                marginTop: "24px",
                fontSize: ".875rem",
                lineHeight: "32px",
                color: themColor.tertiary,
                marginBottom: "8px",
              }}
            >
              Call to Action Text Color
            </Typography>
            <Box
              sx={{
                display: "inline-block",
                width: "40px",
                height: "40px",
                border: `2px solid rgb(11, 11, 11)`,
                borderRadius: "50%",
                backgroundColor:
                  state?.widgetcustomization?.callToActionTextColor,
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              onClick={() => {
                setBGShowPicker(false);
                setTextShowPicker(true);
              }}
            ></Box>
            {TextShowPicker && (
              <Box
                sx={{
                  position: "absolute",
                  zIndex: 2,
                }}
              >
                <ChromePicker
                  color={state?.widgetcustomization?.callToActionTextColor}
                  onChange={({ hex }) =>
                    setState({
                      ...state,
                      widgetcustomization: {
                        ...state.widgetcustomization,
                        callToActionTextColor: hex,
                      },
                    })
                  }
                />
              </Box>
            )}
          </Box>

          <Box
            sx={{
              marginLeft: "24px",
            }}
          >
            <Typography
              sx={{
                marginTop: "24px",
                fontSize: ".875rem",
                lineHeight: "32px",
                color: themColor.tertiary,
                marginBottom: "8px",
              }}
            >
              Call to Action Background
            </Typography>
            <Box
              sx={{
                display: "inline-block",
                width: "40px",
                height: "40px",
                border: "2px solid rgb(215, 215, 215)",
                borderRadius: "50%",
                backgroundColor:
                  state?.widgetcustomization?.callToActionTextBackground,
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              onClick={() => {
                setTextShowPicker(false);
                setBGShowPicker(true);
              }}
            ></Box>

            {BGShowPicker && (
              <Box
                sx={{
                  position: "absolute",
                  zIndex: 2,
                }}
              >
                <ChromePicker
                  color={state?.widgetcustomization?.callToActionTextBackground}
                  onChange={({ hex }) =>
                    setState({
                      ...state,
                      widgetcustomization: {
                        ...state.widgetcustomization,
                        callToActionTextBackground: hex,
                      },
                    })
                  }
                />
              </Box>
            )}
          </Box>
        </Box>
      </ClickAwayListener>

      {/* Call to ACtion Behaiour */}
      <Box sx={{ marginBottom: "20px" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typo tittle={"Call to Action Behavior"} />
          <NewToolTip
            tooltext={
              "Choose how the CTA button would appear. 'Hide after first click' hides the CTA button after the first visit. If you select the second option, the CTA stays visible all the time"
            }
            width="160px"
            placement="top"
          >
            <IconButton
              sx={{
                mt: 1.2,
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <NewSvg />
            </IconButton>
          </NewToolTip>
        </Box>

        <RadioGroup
          row
          onChange={radioChanged}
          name="row-radio-buttons-group"
          sx={{
            display: "flex",
            justifyContent: {
              sm: "start",
              xs: "start",
            },
            alignItems: {
              sm: "center",
              xs: "start",
            },
            flexDirection: {
              sm: "row",
              xs: "column",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: "1rem",
              color: themColor.secondary,
              cursor: "pointer",
            }}
            onClick={() =>
              setState({
                ...state,
                widgetcustomization: {
                  ...state.widgetcustomization,
                  callToActionBehavior: "hideAfterFirstClick",
                },
              })
            }
          >
            <Radio
              checked={
                state?.widgetcustomization?.callToActionBehavior ===
                "hideAfterFirstClick"
              }
              value="hideAfterFirstClick"
              sx={{
                "&.Mui-checked": {
                  color: themColor.primary,
                },
                "&:hover": {
                  background: "none",
                },
                "& .MuiSvgIcon-root": {
                  fontSize: "1.1rem", // Custom icon size
                },
                marginLeft: "-9px",
                marginRight: "-6px",
                marginTop: "-2.5px",
              }}
            />{" "}
            Hide after first click
          </Typography>

          <Typography
            sx={{
              fontSize: "1rem",
              color: themColor.secondary,
              cursor: "pointer",
              marginLeft: {
                xs: "0px",
                sm: "55px",
                md: "55px",
                lg: "55px",
                xl: "55px",
              },
            }}
            onClick={() =>
              setState({
                ...state,
                widgetcustomization: {
                  ...state.widgetcustomization,
                  callToActionBehavior: "showAllTheTime",
                },
              })
            }
          >
            <Radio
              checked={
                state?.widgetcustomization?.callToActionBehavior ===
                "showAllTheTime"
              }
              value="showAllTheTime"
              sx={{
                "&.Mui-checked": {
                  color: themColor.primary,
                },
                "& .MuiSvgIcon-root": {
                  fontSize: "1.1rem", // Custom icon size
                },
                "&:hover": {
                  background: "none",
                },
                marginLeft: "-9px",
                marginRight: "-6px",
                marginTop: "-2.5px",
              }}
            />{" "}
            Show all the time
          </Typography>
        </RadioGroup>
      </Box>

      {/* proo */}
      {/* <ProFeature state={state} setState={setState} /> */}

      {/* last */}
    </Box>
  );
};
