import { themColor } from "@/src/theme/themColor";
import { ExpandMore } from "@mui/icons-material";
import { SettingsInterface } from "@/src/types/settings";

import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { textFieldStyles } from "../../settingBtn/components/textFieldStyles";

interface PreProps {
  state: SettingsInterface;
  setState: Dispatch<SetStateAction<SettingsInterface>>;
  setContactForm: (contact: boolean) => void;
  setChatViewOpen: (chatViewForm: boolean) => void;
  setChartViewOpen: (chartViewForm: boolean) => void;
  setActive: (iconActive: boolean) => void;
}

const ContactForm: React.FC<PreProps> = ({
  state,
  setState,
  setContactForm,
  setChatViewOpen,
  setChartViewOpen,
  setActive,
}) => {
  const handleInputChange = (
    channelId: string,
    fieldId: string,
    value: string
  ) => {
    setState((prevState) => {
      const updatedChannels = prevState.channels.map((channel) => {
        if (
          channel.id === channelId &&
          channel.channelType === "contact form"
        ) {
          const updatedFields = channel.fields?.map((field) => {
            if (field.id === fieldId) {
              return { ...field, value };
            }
            return field;
          });
          return { ...channel, fields: updatedFields };
        }
        return channel;
      });
      return { ...prevState, channels: updatedChannels };
    });
  };

  return (
    <>
      {state.channels
        .filter((channel) => channel.channelType === "contact form")
        .map((channel) => (
          <Box
            key={channel.id}
            sx={{
              background: "#fff",
              zIndex: 1002,
              borderRadius: "8px",
              boxShadow: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: channel?.submitButton?.backgroundColor,
                backgroundImage: "url('/images/header-top.png')",
                borderRadius: "8px 8px 0 0",
                padding: "5px 0px 5px 10px",
                alignItems: "center",
                fontWeight: "500",
                color: channel.submitButton?.textColor,
                textAlign: "center",
                fontSize: "18px",
                borderBottom: "1px solid #acacac",
                lineHeight: "20px",
              }}
            >
              <Typography fontSize={"0.5rem"}>
                {channel.contactFormTitle}
              </Typography>
              <IconButton
                sx={{
                  color: channel.submitButton?.textColor,
                  paddingRight: "6px !important",
                  padding: "0px",
                }}
                onClick={() => {
                  setContactForm(false);
                  setChatViewOpen(true);
                  setChartViewOpen(true);
                  setActive(true);
                }}
              >
                <ExpandMore sx={{ fontSize: "0.8rem" }} />
              </IconButton>
            </Box>

            <Box
              sx={{
                padding: "9px",
              }}
            >
              {channel.fields?.map(
                (field) =>
                  field.isEnabled && (
                    <Box
                      key={field.id}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        marginBottom: "10px",
                      }}
                    >
                      <Typography
                        sx={{
                          display: "inline-block",
                          fontSize: "9px",
                          color: themColor.tertiary,
                          margin: "0",
                        }}
                      >
                        {field.fieldName}{" "}
                        {field.required && (
                          <span style={{ color: "red" }}>*</span>
                        )}
                      </Typography>
                      <TextField
                        placeholder={field.fieldPlaceholder}
                        value={field.value}
                        onChange={(e) =>
                          handleInputChange(
                            channel.id,
                            field.id,
                            e.target.value
                          )
                        }
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            fontSize: "0.7rem !important",
                            borderRadius: "0px",
                            "& .MuiInputBase-input": {
                              padding: "4.5px 13px",
                            },
                          },
                          "& .MuiFormControl-root": {
                            width: "100%",
                          },
                        }}
                      />
                    </Box>
                  )
              )}
            </Box>

            <Button
              sx={{
                width: "87%",
                height: "27px !important",
                fontSize: "9px",
                color: channel.submitButton?.textColor,
                marginBottom: "10px",
                background: channel.submitButton?.backgroundColor,
                "&:hover": {
                  background: channel.submitButton?.backgroundColor,
                },
              }}
            >
              {channel.submitButton?.buttonText}
            </Button>
          </Box>
        ))}
    </>
  );
};

export default ContactForm;
