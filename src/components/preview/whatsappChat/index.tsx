import { themColor } from "@/src/theme/themColor";
import { ChannelSettings } from "@/src/types/settings";
import { ExpandMore, Send } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import PropToolTip from "../../newToolTip/propTooltip";

const WhatsappChat = ({ ...props }) => {
  const {
    state,
    setState,
    setWhatsappActive,
    setWidget,
    setActive,
    isMobileView,
    setChatViewOpen,
    setChartViewOpen,
  } = props;
  state.channels
    .filter((channel: ChannelSettings) => channel.channelType === "whatsapp")
    .forEach((channel: ChannelSettings) => {
      console.log(channel.widgetHeading, "all time");
    });
  return (
    <>
      <Box
        sx={{
          marginLeft: isMobileView ? "10px" : "10px",
          boxShadow: "0 5px 40px rgba(0, 0, 0, .16)",
          borderRadius: "11px",
          backgroundImage: 'url("https://go.chaty.app/img/whatsapp-bg.webp")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          maxWidth: "240px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            borderRadius: "10px 10px 0 0",
            justifyContent: "space-between",
            background: themColor.seaGreen,
            minHeight: "36px",
            padding: "2px 0px 2px 10px",
            gap: "20px",
            boxShadow: "0 16px 32px rgba(26, 14, 53, 0.16)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              columnGap: "6px",
            }}
          >
            <>
              <img
                width="20"
                height="20"
                style={{}}
                src="data:image/webp;base64,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"
                alt="WhatsApp"
              />
              {state.channels
                .filter(
                  (channel: ChannelSettings) =>
                    channel.channelType === "whatsapp"
                )
                .map((channel: ChannelSettings) => {
                  return (
                    <Typography
                      sx={{
                        fontSize: "11.5px",
                        color: "#ffffff",
                        maxWidth: "155px",
                        wordWrap: "break-word",
                      }}
                      key={channel.id}
                    >
                      {channel.widgetHeading}
                    </Typography>
                  );
                })}
            </>
          </Box>
          <IconButton
            sx={{
              color: "#fff",
              marginRight: "2px",
              cursor: "pointer",
            }}
            onClick={() => {
              setWhatsappActive(false);
              setWidget(false);
              setActive(true);
              setChatViewOpen(true);
              setChartViewOpen(true);
            }}
          >
            <ExpandMore fontSize="small" />
          </IconButton>
        </Box>

        {state.channels
          .filter(
            (channel: ChannelSettings) => channel.channelType === "whatsapp"
          )
          .map((channel: ChannelSettings) => {
            return (
              <Box
                sx={{
                  padding: "8px",
                  paddingLeft: channel.profileImage ? "0px" : "8px",
                  display: "flex",
                  fontSize: "1rem",
                  lineHeight: 1.6,
                  gap: "11px",
                  fontWeight: "400",
                }}
              >
                {channel.profileImage && (
                  <Box
                    sx={{
                      maxWidth: "100px",
                      height: "auto !important",
                      borderRadius: "8px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={channel.profileImage}
                      alt=""
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                      }}
                    />
                  </Box>
                )}

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    width: "80%",
                    background: "#fff",
                    flexDirection: "column",
                    padding: "6px 10px",
                    borderRadius: "0 10px 10px 10px",
                    position: "relative",
                    // "&::before": {
                    //   content: channel.profileImage ? '""' : null,
                    //   position: "absolute",
                    //   top: 0,
                    //   left: -11,
                    //   width: 0,
                    //   height: 0,
                    //   border: "7px solid",
                    //   borderColor: "transparent",
                    //   borderRightColor: "#fff",
                    //   borderTopColor: "#fff",
                    // },
                  }}
                >
                  <Box
                    sx={{
                      color: themColor.seaGreen,
                      fontSize: "9px",
                      padding: 0,
                      textAlign: "start",
                    }}
                  >
                    {" "}
                    {channel.nickname}
                  </Box>

                  {/* <Typography
                      variant="body1"
                      sx={{
                        color: themColor.seaGreen,
                        fontSize: "9px",
                        padding: 0,
                        textAlign: "start",
                      }}
                      key={channel.id}
                    >
                      {channel.nickname}
                      
                    </Typography> */}

                  <Typography
                    variant="body1"
                    sx={{
                      color: "#141414",
                      fontSize: "9px",
                      padding: 0,
                      textAlign: "start",
                    }}
                    key={channel.id}
                  >
                    {channel.chatWidgetText}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: "#93939d",
                      fontSize: "7px",
                    }}
                  >
                    16:16
                  </Typography>
                </Box>
              </Box>
            );
          })}
        <Box
          sx={{
            padding: "8px",
            display: "flex",
            columnGap: "8px",
            marginTop: "40px",
            marginBottom: "2px",

            width: "100%",
            height: "100%",
          }}
        >
          {state.channels
            .filter(
              (channel: ChannelSettings) => channel.channelType === "whatsapp"
            )
            .map((channel: ChannelSettings) => (
              <TextField
                key={channel.id}
                placeholder={channel.presetMessage}
                variant="outlined"
                sx={{
                  width: "90%",
                  background: "#fff",
                  padding: "5px",
                  borderRadius: "50px",
                  flexGrow: 1,
                  "& .MuiOutlinedInput-root": {
                    height: "20px",
                    borderRadius: "50px",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "& .MuiInputBase-input": {
                    fontSize: "0.6rem",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "#93939d",
                    fontSize: "0.6rem",
                  },
                }}
              />
            ))}

          <Button
            sx={{
              minWidth: "15%",
              height: "auto !important",
              display: "flex",
              // width: "10px",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
              cursor: "pointer",
              padding: "8px",
              transition: "background-color .2s",
              background: "rgb(37, 211, 102)",
              "&:hover": {
                background: "#22bf5b",
              },
            }}
          >
            <Send
              sx={{
                fontSize: "1rem",
                fill: "rgb(255, 255, 255)",
                stroke: "rgb(255, 255, 255)",
              }}
            />
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default WhatsappChat;
