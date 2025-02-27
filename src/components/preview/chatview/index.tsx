import { themColor } from "@/src/theme/themColor";
import { ExpandMore } from "@mui/icons-material";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import React from "react";
import NewToolTip from "../../newToolTip";

const ChatView = ({ ...props }) => {
  const {
    imgPadding,
    isMobileView,
    SizeValue,
    state,
    setState,
    handleOnClose,
    setChartViewOpen,
    diconActive,
    iconActive,
    handleWhatsappOpen,
    ContactFormOpen,
    handleContactFormOpen,
    setActive,
    // FontSizeValue,
    MobileFontSizeValue,
    ImgPaddingValue,
    MobileSizeValue,
    MobileImgPaddingValue,
  } = props;
  const { channels } = state;
  const Setposition = state?.widgetcustomization?.position?.type;
  const CustomPosition =
    state?.widgetcustomization?.position?.custom?.customPosition;
  const desktopWidgets = state.channels.filter(
    (channel: any) => channel.showOnDesktop
  );

  const mobileWidgets = state.channels.filter(
    (channel: any) => channel.showOnMobile
  );

  console.log("ss 11", { state, channels });

  const CustomSize = state?.widgetcustomization?.customSize || null;

  const handleMouseEnter = () => {
    if (
      state?.widgetcustomization?.defaultState === "hover" &&
      state?.widgetcustomization?.viewType === "chat"
    ) {
      setChartViewOpen(true);
      setActive(true);
    }
  };

  const handleMouseLeave = () => {
    if (
      state?.widgetcustomization?.defaultState === "hover" &&
      state?.widgetcustomization?.viewType === "chat"
    ) {
      setChartViewOpen(false);
      setActive(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        // minHeight: "10rem",
        maxWidth: "85%",
        borderRadius: "7px",
        [Setposition === "custom"
          ? CustomPosition === "left"
            ? "marginRight"
            : "marginLeft"
          : Setposition === "left"
          ? "marginRight"
          : "marginLeft"]: "10px",
        boxShadow: "0 16px 32px rgba(26, 14, 53, 0.16)",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          background: state?.widgetcustomization?.widgetColor,
          p: 1,
          borderTopLeftRadius: "7px",
          borderTopRightRadius: "7px",
          color: "#fff",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontSize: `${parseInt(MobileFontSizeValue) + 4}px !important`,
          }}
        >
          Hi there!
        </Typography>
        <IconButton
          sx={{
            color: "#fff",
            marginRight: "2px",
            cursor: "pointer",
          }}
          onClick={handleOnClose}
        >
          <ExpandMore fontSize="small" />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          gap: "10px",
          pt: 1,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            padding: "0px 4px",
            fontSize: MobileFontSizeValue,

            // Desktop S
            // fontSize: "12px",
            // Mobile S
            // fontSize: "11px",
          }}
        >
          Get your winter skincare <strong>ebook!</strong>
          {/* <span style={{ fontWeight: "bold" }}> ebook!</span> */}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "8px",
            padding: "8px",
          }}
        >
          {/* {(iconActive || diconActive) &&
            (isMobileView ? mobileWidgets : desktopWidgets).map(
              (channel: any) =>{ 
                
                
                const handleCombinedClick = (
                  channelType: string
                ) => {
                  ContactFormOpen(channelType);
                  handleContactFormOpen(channelType);
                };
                
                
                
                
                return (
                <Avatar
                  sx={{
                    width: "40px",
                    padding: "0px",
                    height: "40px",
                    paddingBottom: "8px",
                    transition: "0.7s",
                  }}
                
                                onClick={() =>
                                  handleCombinedClick(channel.channelType)
                                }
                >
                  <NewToolTip
                    tooltext={channel.channelType}
                    width="auto"
                    placement={
                      Setposition !== "custom"
                        ? Setposition === "left"
                          ? "right"
                          : "left"
                        : CustomPosition === "left"
                        ? "right"
                        : "left"
                    }
                    state={state}
                  >
                    <img
                      src={channel.iconUrl}
                      style={{
                        background: channel.iconBackground,
                        padding: "8px",
                      }}
                      alt={channel.channelType}
                    />
                  </NewToolTip>
                </Avatar>
              )
            }
            )} */}
          {(iconActive || diconActive) &&
            (isMobileView ? mobileWidgets : desktopWidgets).map(
              (channel: any) => {
                console.log("selectedImagedata", channel);
                const handleCombinedClick = (channelType: string) => {
                  ContactFormOpen(channelType);
                  handleContactFormOpen(channelType);
                };
                return (
                  <Avatar
                    key={channel.id}
                    sx={{
                      width: SizeValue,
                      height: SizeValue,
                      // paddingBottom: "8px",
                      transition: "0.7s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
                    }}
                    onClick={() => handleCombinedClick(channel.channelType)}
                  >
                    <img
                      src={
                        channel.customImage
                          ? channel.customImage
                          : channel.iconUrl
                      }
                      style={{
                        background: channel.iconUrl && channel.iconBackground,
                        // padding: channel.customImage
                        //   ? "0px"
                        //   : (CustomSize ?? 0) >= 70
                        //   ? "10px"
                        //   : isMobileView
                        //   ? MobileImgPaddingValue
                        //   : ImgPaddingValue,

                        padding: channel.customImage
                          ? "0px"
                          : isMobileView
                          ? MobileImgPaddingValue
                          : ImgPaddingValue,

                        width: channel.customImage
                          ? "100%"
                          : isMobileView
                          ? MobileSizeValue
                          : SizeValue,
                        height: channel.customImage
                          ? "100%"
                          : isMobileView
                          ? MobileSizeValue
                          : SizeValue,
                      }}
                      alt={channel.channelType}
                    />
                  </Avatar>
                );
              }
            )}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatView;
