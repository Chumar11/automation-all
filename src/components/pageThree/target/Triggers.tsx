import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import {
  Box,
  Checkbox,
  FormGroup,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import WarningIcon from "./WarmIcon";
import TargetingRules from "./TargetingRules";
import IOSSwitchComponent from "../../settingBtn/components/IOSSwitch/index";
import { themColor } from "@/src/theme/themColor";
import Features from "./ProFeatures";
import { SettingsInterface } from "@/src/types/settings";
import { textFieldStyles } from "../../settingBtn/components/textFieldStyles";

interface Triggers {
  state: SettingsInterface;
  setState: Dispatch<SetStateAction<SettingsInterface>>;
}

const Triggers = ({ state, setState }: Triggers) => {
  // const [isEditableSeconds, setIsEditableSeconds] = useState(false);
  const [inputValueSeconds, setInputValueSeconds] = useState(
    state?.triggersAndTargeting?.displayAfterSeconds
  );
  // const [isEditablePercentage, setIsEditablePercentage] = useState(false);
  const [inputValuePercentage, setInputValuePercentage] = useState(
    state?.triggersAndTargeting?.displayAfterPercentage
  );

  useEffect(() => {
    setInputValueSeconds(state?.triggersAndTargeting?.displayAfterSeconds);
    setInputValuePercentage(
      state?.triggersAndTargeting?.displayAfterPercentage
    );
  }, [state?.triggersAndTargeting]);

  const handleChange = () => {
    setState((prevState): any => ({
      ...prevState,
      triggersAndTargeting: {
        ...prevState?.triggersAndTargeting,
        active: !prevState?.triggersAndTargeting?.active,
      },
    }));
  };

  const handleCheckboxChangeSeconds = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // setIsEditableSeconds(event.target.checked);

    setState((prevState): any => ({
      ...prevState,
      triggersAndTargeting: {
        ...prevState.triggersAndTargeting,
        displayCheckSecond: event.target.checked,
      },
    }));
  };

  const handleInputChangeSeconds = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setState((prevState): any => ({
      ...prevState,
      triggersAndTargeting: {
        ...prevState.triggersAndTargeting,
        displayAfterSeconds: Number(value),
      },
    }));
  };

  const handleExitIntentTrigger = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = event.target.checked;
    setState((prevState): any => ({
      ...prevState,
      triggersAndTargeting: {
        ...prevState.triggersAndTargeting,
        exitIntentTrigger: isChecked,
      },
    }));
  };

  const handleCheckboxChangePercentage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState((prevState): any => ({
      ...prevState,
      triggersAndTargeting: {
        ...prevState.triggersAndTargeting,
        displayCheckPercent: event.target.checked,
      },
    }));
  };

  const handleInputChangePercentage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    // setInputValuePercentage(Number(value));
    setState((prevState): any => ({
      ...prevState,
      triggersAndTargeting: {
        ...prevState.triggersAndTargeting,
        displayAfterPercentage: Number(value),
      },
    }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Box
        sx={{
          borderRadius: "0px 0px 10px 10px",
          padding: "25px 30px 0",
          borderBottom: "1px solid",
          borderColor: themColor.ghost,
          background: themColor.white,
          width: "auto",
          height: "auto",
        }}
      >
        <Box
          sx={
            {
              // marginBottom: {
              //   lg: state?.triggersAndTargeting?.active ? "0rem" : "0rem",
              //   md: state?.triggersAndTargeting?.active ? "0rem" : "0rem",
              //   sm: state?.triggersAndTargeting?.active ? "0rem" : "0rem",
              //   xs: state?.triggersAndTargeting?.active ? "0rem" : "0rem",
              // },
            }
          }
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Divider
              orientation="vertical"
              sx={{
                height: 17,
                borderColor: themColor.primary,
                borderWidth: 2,
                borderRadius: "5px",
              }}
            />
            <Typography
              variant="h5"
              sx={{
                fontWeight: "700",
                color: themColor.secondary,
                paddingLeft: "5px",
              }}
            >
              Triggers
            </Typography>
          </Box>
          <Box
            sx={{
              height: state?.triggersAndTargeting?.active ? 140 : 0,
              marginLeft: "10px",
            }}
          >
            <Typography
              sx={{
                marginTop: "20px",
                fontSize: "13px",
                color: themColor.blueGray,
              }}
            >
              Active
            </Typography>
            <FormControlLabel
              control={
                <IOSSwitchComponent
                  sx={{ color: themColor.primary, m: 1 }}
                  checked={state?.triggersAndTargeting?.active}
                  onChange={handleChange}
                />
              }
              label=""
            />
            <Box>
              <Typography sx={{ display: "flex", alignItems: "center" }}>
                {!state?.triggersAndTargeting?.active ? (
                  <Box
                    sx={{
                      display: "flex",
                      border: "1px solid #EAEFF2",
                      padding: "22px",
                      borderRadius: "8px",
                      background: "#F9FAFB",
                    }}
                  >
                    <WarningIcon sx={{ mr: 1 }} />
                    <Typography variant="body1" sx={{ color: themColor.secondary }}>
                      Widget Turned off
                    </Typography>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      marginBottom: state?.triggersAndTargeting?.active
                        ? "20px"
                        : "",
                      flexWrap: "nowrap",
                      flexDirection: {
                        xs: "column",
                        sm: "row",
                        md: "row",
                        lg: "row",
                      },
                      alignItems: {
                        xs: "start",
                      },
                      p: 5,
                      m: 1,
                      width: "100%",
                      height: {
                        xs: 300,
                        sm: 250,
                        lg: 220,
                      },
                      border: "1px solid #EAEFF2",
                      background: "#F9FAFB",
                      borderRadius: "8px",
                      "&:hover": {
                        borderColor: themColor.tertiary,
                      },
                    }}
                  >
                    <FormGroup sx={{ display: "flex", gap: "7px" }}>
                      <FormControlLabel
                        sx={{ color: themColor.secondary }}
                        control={
                          <Checkbox
                            style={{ color: themColor.primary }}
                            checked={
                              state?.triggersAndTargeting?.displayCheckSecond
                            }
                            onChange={handleCheckboxChangeSeconds}
                            sx={{
                              "&:hover": {
                                backgroundColor: "transparent",
                              },
                            }}
                          />
                        }
                        label="Display after"
                      />
                      <FormControlLabel
                        sx={{ color: themColor.secondary }}
                        control={
                          <Checkbox
                            style={{ color: themColor.primary }}
                            checked={
                              state?.triggersAndTargeting?.displayCheckPercent
                            }
                            onChange={handleCheckboxChangePercentage}
                            sx={{
                              "&:hover": {
                                backgroundColor: "transparent",
                              },
                            }}
                          />
                        }
                        label="Display after"
                      />
                      <FormControlLabel
                        sx={{ color: themColor.secondary }}
                        control={
                          <Checkbox
                            onChange={handleExitIntentTrigger}
                            checked={
                              state?.triggersAndTargeting?.exitIntentTrigger
                            }
                            style={{ color: themColor.primary }}
                            sx={{
                              "&:hover": {
                                backgroundColor: "transparent",
                              },
                            }}
                          />
                        }
                        label="Exit intent trigger"
                      />
                    </FormGroup>
                    <FormGroup sx={{ display: "flex", gap: "7px" }}>
                      <Box
                        sx={{
                          display: "flex",
                          color: themColor.secondary,
                          fontSize: "15px",
                          gap: "7px",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <TextField
                          type="number"
                          value={inputValueSeconds}
                          onChange={handleInputChangeSeconds}
                          disabled={
                            !state?.triggersAndTargeting?.displayCheckSecond
                          }
                          variant="outlined"
                          sx={{
                            ...textFieldStyles,
                            width: "100px",
                            "& .MuiInputBase-root": {
                              width: "70px",
                              height: "40px",
                            },
                            "& .MuiOutlinedInput-input": {
                              padding: 1,
                              textAlign: "center",
                            },
                          }}
                        />

                        <label>seconds on the page</label>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          color: themColor.secondary,
                          fontSize: "15px",
                          gap: "7px",
                          alignItems: "center",
                        }}
                      >
                        <TextField
                          type="number"
                          value={inputValuePercentage}
                          onChange={handleInputChangePercentage}
                          disabled={
                            !state?.triggersAndTargeting?.displayCheckPercent
                          }
                          variant="outlined"
                          sx={{
                            ...textFieldStyles,
                            width: "100px",
                            "& .MuiInputBase-root": {
                              width: "70px",
                              height: "40px",
                            },
                            "& .MuiOutlinedInput-input": {
                              padding: 0,
                              textAlign: "center",
                            },
                          }}
                        />
                        <label>% on page</label>
                      </Box>
                    </FormGroup>
                  </Box>
                )}
              </Typography>
            </Box>
          </Box>
        </Box>
        <TargetingRules state={state} setState={setState} />
      </Box>
      <Box
        sx={{
          padding: "25px 30px 0",
          borderBottom: "1px solid",
          borderColor: themColor.ghost,
          background: themColor.white,
          borderRadius: "10px",
          width: "auto",
          height: "auto",
        }}
      >
        <Features state={state} setState={setState} />
      </Box>
    </Box>
  );
};

export default Triggers;
