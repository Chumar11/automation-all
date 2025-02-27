import { Avatar, Box, IconButton, Skeleton, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Laptop from "./laptopIcon";
import Phone from "./phone";
import SvgCompo from "../pageTwo/svgcomponents";
import WhatsappChat from "./whatsappChat";
import NewToolTip from "../newToolTip";
import { SettingsInterface } from "@/src/types/settings";
import { CloseBtn } from "../svg";
import PropToolTip from "../newToolTip/propTooltip";
import { themColor } from "@/src/theme/themColor";
import ContactForm from "./contactForm";
import ChatView from "./chatview";
import ContactCard from "./contactCard";
import { position } from "stylis";
import HoverText from "../UI/HoverText";
import { number } from "yup";
interface PreProps {
  state: SettingsInterface;
  setState: Dispatch<SetStateAction<SettingsInterface>>;
  isloading: Boolean;
}

const Preview: React.FC<PreProps> = ({ ...props }) => {
  const { state, setState, isloading } = props;
  const Setposition = state?.widgetcustomization?.position?.type;
  const CustomPosition =
    state?.widgetcustomization?.position?.custom?.customPosition;
  const SideSpacing = state?.widgetcustomization?.position?.custom?.sideSpacing;
  const BottomSpacing =
    state?.widgetcustomization?.position?.custom?.bottomSpacing;
  const Direction = state?.widgetcustomization?.iconsView;
  const [isMobileView, setIsMobileView] = useState(false);
  const [widget, setWidget] = useState(false);
  const [iconActive, setActive] = useState(false);
  const [diconActive, setDactive] = useState(false);
  const [whatsappActive, setWhatsappActive] = useState(false);
  const [open, setOpen] = useState(true);
  const [contactNew, setContactForm] = useState(false);
  const [chartViewOpen, setChartViewOpen] = useState(false);
  const [chatViewOpen, setChatViewOpen] = useState(false);
  const [select, setSelect] = useState(false);

  const sizeClose = state?.widgetcustomization?.widgetSize;
  const CustomSizeClose = state?.widgetcustomization?.customSize;

  const mobileSizeClose = state?.widgetcustomization?.MobileWidgetSize;
  const CustomMobileSizeClose =
    state?.widgetcustomization?.customMobileSize || null;
  const customClose =
    (state?.widgetcustomization?.customSize ?? 0) > 58
      ? (state?.widgetcustomization?.customSize ?? 0) - 40
      : (state?.widgetcustomization?.customSize ?? 0) - 20;

  const customMobileClose =
    (state?.widgetcustomization?.customMobileSize ?? 0) > 53
      ? (state?.widgetcustomization?.customMobileSize ?? 0) - 35
      : (state?.widgetcustomization?.customMobileSize ?? 0) - 15;

  console.log("helo");
  const SizeButtonClose = () => {
    switch (sizeClose) {
      case "S":
        return "38px";
      case "M":
        return "48px";
      case "L":
        return "58px";
      case "XL":
        return "68px";
      case "XXL":
        return "78px";
      case "Custom":
        return `${CustomSizeClose}px`;
      default:
        return "48px";
    }
  };

  const Sizesvg = () => {
    switch (sizeClose) {
      case "S":
        return "15px";
      case "M":
        return "20px";
      case "L":
        return "30px";
      case "XL":
        return "40px";
      case "XXL":
        return "50px";
      case "Custom":
        return `${customClose}px`;
      default:
        return "10px";
    }
  };

  const sizeTwo = Sizesvg();
  const SizeValueClose = SizeButtonClose();

  const MobileSizeButtonClose = () => {
    switch (mobileSizeClose) {
      case "S":
        return "33px";
      case "M":
        return "43px";
      case "L":
        return "53px";
      case "Custom":
        return `${CustomMobileSizeClose}px`;
      default:
        return "43px";
    }
  };

  const MobileSizeSvg = () => {
    switch (mobileSizeClose) {
      case "S":
        return "10px";
      case "M":
        return "15px";
      case "L":
        return "25px";
      case "Custom":
        return `${customMobileClose}px`;
      default:
        return "10px";
    }
  };

  const sizeMobileTwo = MobileSizeSvg();
  const SizeValueMobileClose = MobileSizeButtonClose();

  const desktopWidgets = state?.channels?.filter(
    (channel) => channel.showOnDesktop
  );
  const mobileWidgets = state?.channels?.filter(
    (channel) => channel.showOnMobile
  );

  console.log("desktopWidgets", desktopWidgets);

  const styles = `
  @keyframes sm-shake-animation {
    0% {
      transform: translateY(100%) scale(1) skew(0.017rad);
    }
    100% {
      transform: translateY(0) scale(1) skew(0.017rad);
    }
  }
`;
  const size = state?.widgetcustomization?.widgetSize;
  const CustomSize = state?.widgetcustomization?.customSize || null;

  const SizeButton = () => {
    switch (size) {
      case "S":
        return "38px";
      case "M":
        return "48px";
      case "L":
        return "58px";
      case "XL":
        return "68px";
      case "XXL":
        return "78px";
      case "Custom":
        return `${CustomSize}px`;
      default:
        return "48px";
    }
  };
  const SizeValue = SizeButton();

  const MobileSizeButton = () => {
    switch (mobileSizeClose) {
      case "S":
        return "33px";
      case "M":
        return "43px";
      case "L":
        return "53px";
      case "Custom":
        return `${CustomMobileSizeClose}px`;
      default:
        return "43px";
    }
  };
  const MobileSizeValue = MobileSizeButton();

  useEffect(() => {
    if (state?.widgetcustomization?.defaultState === "opened") {
      if (state?.widgetcustomization?.viewType === "chat") {
        if (!widget && !contactNew && !select) {
          setDactive(true);
          setChatViewOpen(true);
          setChatViewOpen(true);
        }
      } else if (state?.widgetcustomization?.viewType === "simple") {
        if (!widget && !contactNew && !select) {
          setDactive(true);
          setChatViewOpen(true);
        }
      }
    }
  }, [
    state?.widgetcustomization?.defaultState,
    state?.widgetcustomization?.viewType,
  ]);

  useEffect(() => {
    if (state?.widgetcustomization?.defaultState === "hover") {
      setActive(false);
      setDactive(false);
      setChartViewOpen(false);
      setChatViewOpen(false);
    }
  }, [state?.widgetcustomization?.defaultState]);

  useEffect(() => {
    setActive(false);
    setDactive(false);
    setChartViewOpen(false);
    setChatViewOpen(false);
  }, [(isMobileView ? mobileWidgets : desktopWidgets)?.length >= 1]);

  useEffect(() => {
    if (state?.widgetcustomization?.defaultState === "click") {
      setActive(false);
      setDactive(false);
      setChartViewOpen(false);
      setChatViewOpen(false);
    }
  }, [state?.widgetcustomization?.defaultState === "click"]);

  useEffect(() => {
    if (
      state?.widgetcustomization?.defaultState === "hover" ||
      state?.widgetcustomization?.defaultState === "click"
    ) {
      setState({
        ...state,
        widgetcustomization: {
          ...state.widgetcustomization,
          closeButton: false,
        },
      });
    }
  }, [
    state?.widgetcustomization?.defaultState === "hover" ||
      state?.widgetcustomization?.defaultState === "click",
  ]);

  const handleMouseEnter = () => {
    if (
      state?.widgetcustomization?.defaultState === "hover" &&
      state?.widgetcustomization?.viewType === "simple"
    ) {
      setActive(true);
    }
  };
  const handleMouseLeave = () => {
    if (state?.widgetcustomization?.defaultState === "hover") {
      setActive(false);
    }
  };
  const handleViewChange = (view: "desktop" | "mobile") => {
    setIsMobileView(view === "mobile");
  };

  console.log("contact", contactNew);
  const handleWhatsappOpen = (channelType: string) => {
    const channel = state?.channels?.find((c) => c.channelType === channelType);

    console.log("channeltype", channel);
    if (channel?.enableChatWidget) {
      setWidget((prev) => !prev);
      setActive(false);
      setWhatsappActive(true);
      setContactForm(false);
      setChatViewOpen(false);
      setChartViewOpen(false);
      setDactive(false);
      setSelect(false);
    } else if (channel?.channelType === "contact form") {
      setContactForm((prev) => !prev);
      setWidget(false);
      setActive((prev) => !prev);
      setSelect(false);
      // setDactive(false);
      // setChatViewOpen(false);
      // setChartViewOpen(false)
    } else if (select === false || select === true) {
      setContactForm(false);
      setWidget(false);
      setSelect((prev) => !prev);
    }
  };

  const handleContactFormOpen = (channelType: string) => {
    const channel = state?.channels.find((c) => c.channelType === channelType);
    if (channel?.enableChatWidget) {
      setWidget((prev) => !prev);
      setActive(false);
      setWhatsappActive(true);
      setContactForm(false);
      setChatViewOpen(false);
      setChartViewOpen(false);
      setDactive(false);
    } else if (
      channelType === "whatsapp" &&
      channel?.agents &&
      channel?.agents?.length > 0
    ) {
      setContactForm(false);
      setWidget(false);
      // setActive(false);
      // setDactive(false);
      setSelect((prev) => !prev);
    }
  };

  const agentsOpen = state?.channels?.find(
    (channel) =>
      channel.channelType === "whatsapp" &&
      !channel.enableChatWidget &&
      Array.isArray(channel.agents) && // Check if agents is an array
      channel.agents.length > 0
  );

  useEffect(() => {
    state?.channels
      ?.filter((channel) => channel?.channelType === "whatsapp")
      ?.map((channel) => {
        if (select && agentsOpen) {
          setActive(false);
          setDactive(false);
          setChatViewOpen(false);
          setChartViewOpen(false);
        } else if (
          state?.widgetcustomization?.viewType === "simple" &&
          channel?.enableChatWidget === false
        ) {
          setActive(true);
          setDactive(true);
        } else if (
          state?.widgetcustomization?.viewType === "chat" &&
          channel?.enableChatWidget === false
        ) {
          setChatViewOpen(true);
          setChartViewOpen(true);
          setActive(true);
        }
      });
  }, [select, agentsOpen]);

  const ContactFormOpen = (channelType: string) => {
    const channel = state?.channels.find((c) => c.channelType === channelType);
    // console.log("🚀 ~ ContactFormOpen ~ channel:", channel);

    if (channel?.channelType === "contact form") {
      // setWidget((prev) => !prev);
      setContactForm(true);
      setActive((prev) => !prev);
      setWhatsappActive(false);
      setActive(false);
      setDactive(false);
      setChatViewOpen(false);
      setChartViewOpen(false);
    }
  };

  const handleOnClose = () => {
    setActive(!iconActive);
    setDactive(false);
    setChatViewOpen(false);
    setWhatsappActive(false);
    setWidget(false);
    setContactForm(false);
    setChartViewOpen((prev) => !prev);
    setChatViewOpen(false);
    setSelect(false);
    // setOpen(!open);
  };
  useEffect(() => {
    if (
      state?.widgetcustomization?.viewType === "chat" &&
      state?.widgetcustomization?.defaultState != "opened"
    ) {
      if (widget) {
        setWidget(true);
      } else {
        setWidget(false);
      }

      if (contactNew) {
        setContactForm(true);
      } else {
        setContactForm(false);
      }
      setChatViewOpen(false);
      setChartViewOpen(false);
      setActive(false);
    }
  }, [state.widgetcustomization?.viewType]);
  const whatsappChannels = state?.channels?.filter(
    (channel) => channel.channelType === "whatsapp"
  )[0]?.enableChatWidget;
  // console.log("object", whatsappChannels);
  useEffect(() => {
    state?.channels
      ?.filter((channel) => channel?.channelType === "whatsapp")
      ?.map((channel) => {
        // console.log(channel?.enableChatWidget, "channelnew");
        if (channel?.enableChatWidget) {
          setWidget(true);
          setActive(false);
          setDactive(false);
          setContactForm(false);
          setChartViewOpen(false);
          setChatViewOpen(false);
          setSelect(false);
        } else if (contactNew) {
          setContactForm(true);
          setWidget(false);
          setActive(false);
          setDactive(false);
          setSelect(false);
        } else {
          setWidget(false);
          setActive(true);
          setChatViewOpen(true);
          setChartViewOpen(true);

          if (channel.agents && channel?.agents?.length > 0) {
            setSelect(true);
          }
        }
      });
  }, [whatsappChannels]);

  useEffect(() => {
    if (
      !state?.channels?.some((channel) => channel?.channelType === "whatsapp")
    ) {
      setWidget(false);
    }
  }, [whatsappChannels]);

  console.log("heloo widget", widget);
  function previewHeightSet(channelsLength: number, customMobileSize: any) {
    let result;
    if (channelsLength >= 8) {
      result = "90vh";
    } else if (channelsLength === 7) {
      result = "70vh";
    } else if (channelsLength === 6) {
      result = "60vh";
    } else {
      result = "366px";
    }
    return result;
  }

  let channelsLength = previewHeightSet(
    state?.channels?.length,
    state.widgetcustomization
  );

  console.log("🚀 ~ previewHeightSet ~ previewHeightSet:", channelsLength);

  const ImgPaddingStyling = () => {
    if (sizeClose === "Custom" && CustomSizeClose !== undefined) {
      if (CustomSizeClose >= 38 && CustomSizeClose <= 47) {
        return "6px";
      } else if (CustomSizeClose >= 48 && CustomSizeClose <= 57) {
        return "8px";
      } else if (CustomSizeClose >= 58 && CustomSizeClose <= 70) {
        return "10px";
      }
    }

    switch (sizeClose) {
      case "S":
        return "6px";
      case "M":
        return "8px";
      case "L":
        return "10px";
      default:
        return "8px";
    }
  };
  const ImgPaddingValue = ImgPaddingStyling();

  const MobileImgPaddingStyling = () => {
    const customSize = CustomMobileSizeClose ?? 0;
    if (mobileSizeClose === "Custom") {
      if (customSize >= 33 && customSize <= 47) {
        return "5px";
      } else if (customSize >= 48 && customSize <= 57) {
        return "7px";
      } else if (customSize >= 58 && customSize <= 70) {
        return "9px";
      }
    }

    switch (mobileSizeClose) {
      case "S":
        return "5px";
      case "M":
        return "7px";
      case "L":
        return "9px";
      default:
        return "7px";
    }
  };
  const MobileImgPaddingValue = MobileImgPaddingStyling();

  // const CustomSize = state?.widgetcustomization?.customSize || null;

  const FontSizeStyling = () => {
    switch (sizeClose) {
      case "S":
        return "12px"; // 12px
      case "M":
        return "13px"; // 13px
      case "L":
        return "15px"; // 15px
      case "Custom":
        // return `${CustomSize - 30}px`;
        if (!CustomSizeClose) return "13px";

        if (CustomSizeClose >= 33 && CustomSizeClose <= 47) {
          return "12px";
        } else if (CustomSizeClose >= 48 && CustomSizeClose <= 57) {
          return "13px";
        } else if (CustomSizeClose >= 58 && CustomSizeClose <= 67) {
          return "15px";
        } else if (CustomSizeClose >= 68) {
          return `17px`;
        }

      default:
        return "13px"; // 13px
    }
  };
  const FontSizeValue = FontSizeStyling();

  const MobileFontSizeStyling = () => {
    switch (mobileSizeClose) {
      case "S":
        return "11px"; // 10px
      case "M":
        return "12px"; // 12px
      case "L":
        return "14px"; // 14px
      case "Custom":
        if (!CustomMobileSizeClose) return "12px";

        if (CustomMobileSizeClose >= 33 && CustomMobileSizeClose <= 42) {
          return "11px";
        } else if (CustomMobileSizeClose >= 43 && CustomMobileSizeClose <= 52) {
          return "12px";
        } else if (CustomMobileSizeClose >= 53 && CustomMobileSizeClose <= 62) {
          return "14px";
        } else if (CustomMobileSizeClose >= 63) {
          return `16px`;
        }
      default:
        return "12px"; // 12px
    }
  };
  const MobileFontSizeValue = MobileFontSizeStyling();

  return (
    <>
      {isloading ? (
        <Skeleton variant="rectangular" width={400} height={350} />
      ) : (
        <Box
          sx={{
            display: {
              xs: "none",
              sm: "none",
              md: "flex",
              lg: "flex",
            },
            flexDirection: "column",
            alignItems: "center",
            position: "sticky",
            top: "92px",
            height: "82vh",
            width: "50%",
          }}
        >
          <Box
            sx={{
              width: isMobileView
                ? state.widgetcustomization?.viewType === "chat"
                  ? "300px"
                  : "220px"
                : "394px",
              // height: isMobileView ? "366px" : "366px",

              height: isMobileView
                ? //  state.widgetcustomization?.viewType === "chat" &&
                  //   state?.widgetcustomization?.customMobileSize &&
                  //   state?.widgetcustomization?.customMobileSize >= 67
                  //   ? "78vh"
                  //   :
                  channelsLength
                : channelsLength,

              backgroundColor: "#fff",
              borderRadius: "6px",
              border: `1px solid ${themColor.ghost}`,
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              mb: 2,
              position: "relative",
            }}
          >
            <Box
              sx={{
                width: "5rem",
                height: "1rem",
                // marginLeft: "4.2rem",
                margin: "0 auto",
                backgroundColor: "#F9FAFB",
                borderBottomRightRadius: "6px",
                borderBottomLeftRadius: "6px",
              }}
            />
            {!isMobileView && (
              <Box
                sx={{
                  width: "100%",
                  height: "35px",
                  backgroundColor: "#F9FAFB",
                  borderTopLeftRadius: "5px",
                  borderTopRightRadius: "5px",
                  border: `1px solid ${themColor.ghost}`,
                  display: "flex",
                  alignItems: "center",
                  px: 1.5,
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              >
                <Box
                  sx={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: themColor.neutral,
                    borderRadius: "50%",
                    mr: 0.8,
                  }}
                />
                <Box
                  sx={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: themColor.neutral,
                    borderRadius: "50%",
                    mr: 0.8,
                  }}
                />
                <Box
                  sx={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: themColor.neutral,
                    borderRadius: "50%",
                  }}
                />
              </Box>
            )}

            <Box
              sx={{
                display: "flex",

                flexDirection:
                  Setposition === "custom"
                    ? CustomPosition === "left"
                      ? Direction === "horizontal"
                        ? "row-reverse"
                        : "column"
                      : Direction === "horizontal"
                      ? "row"
                      : "column"
                    : Setposition === "left"
                    ? Direction === "vertical"
                      ? "column"
                      : "row-reverse"
                    : Direction === "vertical"
                    ? "column"
                    : "row",
                gap: "5px",

                alignItems:
                  Direction === "horizontal"
                    ? Setposition !== "custom"
                      ? Setposition === "left"
                        ? "flex-start"
                        : "flex-start"
                      : CustomPosition === "left"
                      ? "flex-start"
                      : "flex-start"
                    : Setposition !== "custom"
                    ? Setposition === "left"
                      ? "flex-start"
                      : "flex-end"
                    : CustomPosition === "left"
                    ? "flex-start"
                    : "flex-end",

                position: "absolute",
                [Setposition === "custom"
                  ? (CustomPosition as string)
                  : (Setposition as string)]:
                  Setposition === "custom" ? `${SideSpacing}px` : "20px",
                bottom:
                  Setposition === "custom" ? `${BottomSpacing}px` : "20px",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              <>
                {/* {widget && (
                  <WhatsappChat
                    setWhatsappActive={setWhatsappActive}
                    setWidget={setWidget}
                    setActive={setActive}
                    state={state}
                    setState={setState}
                  />
                )} */}
                {widget ? (
                  <WhatsappChat
                    mobileWidgets={mobileWidgets}
                    desktopWidgets={desktopWidgets}
                    setWhatsappActive={setWhatsappActive}
                    setWidget={setWidget}
                    setActive={setActive}
                    state={state}
                    isMobileView={isMobileView}
                    setState={setState}
                    setChatViewOpen={setChatViewOpen}
                    setChartViewOpen={setChartViewOpen}
                  />
                ) : (
                  select &&
                  (() => {
                    const selectedChannel = state.channels.find(
                      (channel) =>
                        channel.channelType === "whatsapp" &&
                        !channel.enableChatWidget &&
                        Array.isArray(channel.agents) && // Check if agents is an array
                        channel.agents.length > 0
                    );
                    console.log(
                      "🚀 ~ selectedChannel:",
                      selectedChannel?.agents?.map((agent) => {
                        console.log("agent", agent);
                      })
                    );

                    return (
                      selectedChannel && (
                        <ContactCard
                          SizeValue={isMobileView ? MobileSizeValue : SizeValue}
                          MobileFontSizeValue={
                            isMobileView ? MobileFontSizeValue : FontSizeValue
                          }
                          ImgPaddingValue={
                            isMobileView
                              ? MobileImgPaddingValue
                              : ImgPaddingValue
                          }
                          isMobileView={isMobileView}
                          setSelect={setSelect}
                          agents={selectedChannel?.agents || []}
                          channels={selectedChannel}
                          setActive={setActive}
                          setChatViewOpen={setChatViewOpen}
                          setChartViewOpen={setChartViewOpen}
                        />
                      )
                    );
                  })()
                )}

                <>
                  {contactNew && (
                    <ContactForm
                      state={state}
                      setState={setState}
                      setContactForm={setContactForm}
                      setChatViewOpen={setChatViewOpen}
                      setChartViewOpen={setChartViewOpen}
                      setActive={setActive}
                    />
                  )}
                  {(isMobileView ? mobileWidgets : desktopWidgets)?.length ===
                  0 ? null : (isMobileView ? mobileWidgets : desktopWidgets)
                      ?.length === 1 ? (
                    (isMobileView ? mobileWidgets : desktopWidgets).map(
                      (channel) => (
                        <Box
                          key={channel.id}
                          onClick={() =>
                            handleWhatsappOpen(channel.channelType)
                          }
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "15px",
                            cursor: "pointer !important",
                            flexDirection:
                              Setposition !== "custom"
                                ? Setposition === "left"
                                  ? "row-reverse"
                                  : "row"
                                : CustomPosition === "left"
                                ? "row-reverse"
                                : "row",
                          }}
                        >
                          {/* <PropToolTip
                            cursor={"pointer"}
                            tooltext={
                              state?.widgetcustomization?.callToActionText
                            }
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
                            open={open}
                            handleOnClose={handleOnClose}
                            state={state}
                          >

                          </PropToolTip> */}

                          {/* <Box
                            component="div"
                            sx={{
                              display: {
                                sx: "none",
                                sm: "none",
                                md: "block",
                                lg: "block",
                              },
                              backgroundColor:
                                state?.widgetcustomization
                                  ?.callToActionTextBackground ||
                                themColor.white,
                              color: themColor.white,
                              maxWidth: "none",
                              width: "104px",
                              height: "30px",
                              // overflow: "hidden",
                              padding: "5px 15px",
                              left: "0",
                              boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.4)",
                              borderRadius: "7px",
                              position: "relative",
                              "&::before": {
                                content: '""',
                                position: "absolute",
                                top: "8.5px",
                                // bottom: 10,
                                // left: "75px",

                                left:
                                  Setposition !== "custom"
                                    ? Setposition === "left"
                                      ? "-12px"
                                      : "100%"
                                    : CustomPosition === "left"
                                    ? "-12px"
                                    : "100%",

                                width: 0,
                                height: 0,
                                border: "6px solid",
                                borderColor: "transparent",

                                borderLeftColor:
                                  Setposition !== "custom"
                                    ? Setposition === "right"
                                      ? state?.widgetcustomization
                                          ?.callToActionTextBackground ||
                                        themColor.white
                                      : "transparent"
                                    : CustomPosition === "right"
                                    ? state?.widgetcustomization
                                        ?.callToActionTextBackground ||
                                      themColor.white
                                    : "transparent",

                                // Show left border color if on the left
                                borderRightColor:
                                  Setposition !== "custom"
                                    ? Setposition === "left"
                                      ? state?.widgetcustomization
                                          ?.callToActionTextBackground ||
                                        themColor.white
                                      : "transparent"
                                    : CustomPosition === "left"
                                    ? state?.widgetcustomization
                                        ?.callToActionTextBackground ||
                                      themColor.white
                                    : "transparent",
                              },
                            }}
                            onClick={handleOnClose}
                          >
                            <Typography
                              sx={{
                                overflow: "hidden",
                                height: "100%",
                                width: "100%",
                                display: "block",
                                fontSize: ".875rem",
                                color:
                                  state?.widgetcustomization
                                    ?.callToActionTextColor || "black",
                                lineHeight: "140%",
                                cursor: `pointer`,
                              }}
                            >
                              {state?.widgetcustomization?.callToActionText}
                            </Typography>
                          </Box> */}

                          <NewToolTip
                            tooltext={channel.hoverText}
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
                            <Avatar
                              sx={{
                                width: isMobileView
                                  ? MobileSizeValue
                                  : SizeValue,
                                height: isMobileView
                                  ? MobileSizeValue
                                  : SizeValue,
                                // paddingBottom: "8px",
                                transition: "0.7s ease-in-out",
                                "&:hover": {
                                  transform: "scale(1.1)",
                                },
                              }}
                            >
                              <img
                                src={
                                  channel.customImage
                                    ? channel.customImage
                                    : channel.iconUrl
                                }
                                style={{
                                  background:
                                    channel.iconUrl && channel.iconBackground,

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
                                    ? "auto"
                                    : isMobileView
                                    ? MobileSizeValue
                                    : SizeValue,
                                }}
                                alt={channel.channelType}
                              />
                            </Avatar>
                          </NewToolTip>
                        </Box>
                      )
                    )
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        gap: "5px",
                        flexDirection:
                          Setposition === "custom"
                            ? CustomPosition === "left"
                              ? Direction === "vertical"
                                ? "column"
                                : "row-reverse"
                              : Direction === "vertical"
                              ? "column"
                              : "row"
                            : Setposition === "left"
                            ? Direction === "vertical"
                              ? "column"
                              : "row-reverse"
                            : Direction === "vertical"
                            ? "column"
                            : "row",
                        alignItems:
                          Direction === "horizontal"
                            ? Setposition !== "custom"
                              ? Setposition === "left"
                                ? "flex-start"
                                : "flex-start"
                              : CustomPosition === "left"
                              ? "flex-start"
                              : "flex-start"
                            : Setposition !== "custom"
                            ? Setposition === "left"
                              ? "flex-start"
                              : "flex-end"
                            : CustomPosition === "left"
                            ? "flex-start"
                            : "flex-end",
                      }}
                    >
                      {state?.widgetcustomization?.viewType === "chat" ? (
                        widget && contactNew && select ? null : (
                          (chartViewOpen || chatViewOpen) && (
                            <ChatView
                              MobileFontSizeValue={
                                isMobileView
                                  ? MobileFontSizeValue
                                  : FontSizeValue
                              }
                              imgPadding={
                                isMobileView
                                  ? MobileImgPaddingValue
                                  : ImgPaddingValue
                              }
                              SizeValue={
                                isMobileView ? MobileSizeValue : SizeValue
                              }
                              state={state}
                              diconActive={diconActive}
                              handleOnClose={handleOnClose}
                              iconActive={iconActive}
                              handleContactFormOpen={handleContactFormOpen}
                              ContactFormOpen={ContactFormOpen}
                              setChartViewOpen={setChartViewOpen}
                              setActive={setActive}
                              isMobileView={isMobileView}
                              MobileImgPaddingValue={MobileImgPaddingValue}
                              MobileSizeValue={MobileSizeValue}
                              ImgPaddingValue={ImgPaddingValue}
                            />
                          )
                        )
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "5px",
                          }}
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                        >
                          {(iconActive || diconActive) &&
                            (isMobileView ? mobileWidgets : desktopWidgets).map(
                              (channel) => {
                                console.log("selectedImagedata", channel);
                                const handleCombinedClick = (
                                  channelType: string
                                ) => {
                                  ContactFormOpen(channelType);
                                  handleContactFormOpen(channelType);
                                };
                                return (
                                  <Avatar
                                    key={channel.id}
                                    sx={{
                                      width: isMobileView
                                        ? MobileSizeValue
                                        : SizeValue,
                                      height: isMobileView
                                        ? MobileSizeValue
                                        : SizeValue,
                                      // paddingBottom: "8px",
                                      transition: "0.7s ease-in-out",
                                      "&:hover": {
                                        transform: "scale(1.1)",
                                      },
                                    }}
                                    onClick={() =>
                                      handleCombinedClick(channel.channelType)
                                    }
                                  >
                                    <NewToolTip
                                      tooltext={channel.hoverText}
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
                                        src={
                                          channel.customImage
                                            ? channel.customImage
                                            : channel.iconUrl
                                        }
                                        style={{
                                          background:
                                            channel.iconUrl &&
                                            channel.iconBackground,
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
                                            ? SizeValue
                                            : isMobileView
                                            ? MobileSizeValue
                                            : SizeValue,
                                        }}
                                        alt={channel.channelType}
                                      />
                                    </NewToolTip>
                                  </Avatar>
                                );
                              }
                            )}
                        </Box>
                      )}

                      <Box>
                        {!state?.widgetcustomization?.closeButton ? (
                          !iconActive &&
                          !whatsappActive &&
                          !diconActive &&
                          !widget &&
                          !contactNew &&
                          !select ? (
                            state?.widgetcustomization?.callToActionText ===
                            "" ? (
                              <SvgCompo
                                isMobileView={isMobileView}
                                state={state}
                                handleOnClose={handleOnClose}
                                setActive={setActive}
                                setChartViewOpen={setChartViewOpen}
                              />
                            ) : (
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  gap: "15px",
                                  cursor: "pointer !important",
                                  flexDirection:
                                    Setposition !== "custom"
                                      ? Setposition === "left"
                                        ? "row-reverse"
                                        : "row"
                                      : CustomPosition === "left"
                                      ? "row-reverse"
                                      : "row",
                                }}
                              >
                                {/* <Box
                                  component="div"
                                  sx={{
                                    display: {
                                      sx: "none",
                                      sm: "none",
                                      md: "block",
                                      lg: "block",
                                    },
                                    backgroundColor:
                                      state?.widgetcustomization
                                        ?.callToActionTextBackground ||
                                      themColor.white,
                                    color: themColor.white,
                                    maxWidth: "none",
                                    width: "104px",
                                    height: "30px",
                                    padding: "5px 15px",
                                    left: "0",
                                    boxShadow:
                                      "0px 2px 10px rgba(0, 0, 0, 0.4)",
                                    borderRadius: "5px",
                                    position: "relative",
                                    "&::before": {
                                      content: '""',
                                      position: "absolute",
                                      top: "7.2px",
                                      // bottom: 10,
                                      // left: "75px",
                                      left:
                                        Setposition !== "custom"
                                          ? Setposition === "left"
                                            ? "-12px"
                                            : "100%"
                                          : CustomPosition === "left"
                                          ? "-12px"
                                          : "100%",

                                      width: 0,
                                      height: 0,
                                      border: "8px solid",
                                      borderColor: "transparent",

                                      borderLeftColor:
                                        Setposition !== "custom"
                                          ? Setposition === "right"
                                            ? state?.widgetcustomization
                                                ?.callToActionTextBackground ||
                                              themColor.white
                                            : "transparent"
                                          : CustomPosition === "right"
                                          ? state?.widgetcustomization
                                              ?.callToActionTextBackground ||
                                            themColor.white
                                          : "transparent",

                                      // Show left border color if on the left
                                      borderRightColor:
                                        Setposition !== "custom"
                                          ? Setposition === "left"
                                            ? state?.widgetcustomization
                                                ?.callToActionTextBackground ||
                                              themColor.white
                                            : "transparent"
                                          : CustomPosition === "left"
                                          ? state?.widgetcustomization
                                              ?.callToActionTextBackground ||
                                            themColor.white
                                          : "transparent",
                                    },
                                  }}
                                  onClick={handleOnClose}
                                >
                                  <Typography
                                    sx={{
                                      display: "block",
                                      fontSize: ".875rem",
                                      width: `auto`,
                                      color:
                                        state?.widgetcustomization
                                          ?.callToActionTextColor || "black",
                                      lineHeight: "140%",
                                      cursor: `pointer`,
                                    }}
                                  >
                                    {
                                      state?.widgetcustomization
                                        ?.callToActionText
                                    }
                                  </Typography>
                                </Box> */}

                                <HoverText
                                  state={state}
                                  handleOnClose={handleOnClose}
                                />
                                <Box>
                                  <SvgCompo
                                    isMobileView={isMobileView}
                                    state={state}
                                    handleOnClose={handleOnClose}
                                    setActive={setActive}
                                    setChartViewOpen={setChartViewOpen}
                                  />
                                </Box>
                              </Box>
                            )
                          ) : state?.preview?.onCloseButton === "" ? (
                            <CloseBtn
                              state={state}
                              handleOnClose={handleOnClose}
                              setActive={setActive}
                              setChartViewOpen={setChartViewOpen}
                              sizeTwo={isMobileView ? sizeMobileTwo : sizeTwo}
                              SizeValueClose={
                                isMobileView
                                  ? SizeValueMobileClose
                                  : SizeValueClose
                              }
                            />
                          ) : (
                            // <div>welcome</div>
                            <NewToolTip
                              tooltext={state?.preview?.onCloseButton}
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
                              <Box sx={{}}>
                                <CloseBtn
                                  state={state}
                                  handleOnClose={handleOnClose}
                                  setActive={setActive}
                                  setChartViewOpen={setChartViewOpen}
                                  sizeTwo={
                                    isMobileView ? sizeMobileTwo : sizeTwo
                                  }
                                  SizeValueClose={
                                    isMobileView
                                      ? SizeValueMobileClose
                                      : SizeValueClose
                                  }
                                />
                              </Box>
                            </NewToolTip>
                          )
                        ) : (
                          state?.channels
                            .filter(
                              (channel) => channel.channelType === "whatsapp"
                            )
                            .map((channel) => {
                              if (channel.enableChatWidget || contactNew) {
                                return (
                                  (widget || contactNew || select) && (
                                    <NewToolTip
                                      key={channel.id}
                                      tooltext={state?.preview?.onCloseButton}
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
                                      <Box sx={{}}>
                                        <CloseBtn
                                          state={state}
                                          handleOnClose={handleOnClose}
                                          setActive={setActive}
                                          setChartViewOpen={setChartViewOpen}
                                          sizeTwo={
                                            isMobileView
                                              ? sizeMobileTwo
                                              : sizeTwo
                                          }
                                          SizeValueClose={
                                            isMobileView
                                              ? SizeValueMobileClose
                                              : SizeValueClose
                                          }
                                        />
                                      </Box>
                                    </NewToolTip>
                                  )
                                );
                              }
                            })
                        )}
                      </Box>
                    </Box>
                  )}
                </>
                {/* )} */}
              </>
            </Box>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              backgroundColor: themColor.ghost,
              borderRadius: "6px",
              height: "36px",
              width: "89px",
              padding: "2px",
            }}
          >
            <IconButton
              sx={{
                paddingTop: "13px",
                paddingLeft: "11px",
                borderRadius: "6px",
                backgroundColor: isMobileView ? themColor.ghost : "#fff",
                height: "30px",
                "&:hover": {
                  backgroundColor: isMobileView ? "transparent" : "#fff",
                  boxShadow: "none",
                },
              }}
              onClick={() => handleViewChange("desktop")}
              color={!isMobileView ? "primary" : "default"}
            >
              <Laptop />
            </IconButton>
            <IconButton
              sx={{
                paddingTop: "11px",

                borderRadius: "6px",
                backgroundColor: isMobileView ? "#fff" : themColor.ghost,
                height: "30px",
                "&:hover": {
                  backgroundColor: isMobileView ? "#fff" : "transparent",
                  boxShadow: "none",
                },
              }}
              onClick={() => handleViewChange("mobile")}
              color={!isMobileView ? "primary" : "default"}
            >
              <Phone />
            </IconButton>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Preview;
