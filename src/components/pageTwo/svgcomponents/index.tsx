import { Avatar, Box } from "@mui/material";
import React, { useState } from "react";
interface SvgProps {
  state: any;
  handleOnClose: () => void;
  setActive: (active: boolean) => void;
  setChartViewOpen: (chat: boolean) => void;
  isMobileView: boolean;
}

const SvgCompo: React.FC<SvgProps> = ({
  isMobileView,
  state,
  handleOnClose,
  setActive,
  setChartViewOpen,
}) => {
  const index = state?.widgetcustomization?.widgetIcon;
  const size = state?.widgetcustomization?.widgetSize;
  const CustomSize = state?.widgetcustomization?.customSize;

  const mobileSize = state?.widgetcustomization?.MobileWidgetSize;
  const CustomMobileSize = state?.widgetcustomization?.customMobileSize;

  const SizeButton = () => {
    switch (size) {
      case "S":
        return "38px";
      case "M":
        return "48px";
      case "L":
        return "58px";
      case "Custom":
        return `${CustomSize}px`;
      default:
        return "48px";
    }
  };

  const MobileSizeButton = () => {
    switch (mobileSize) {
      case "S":
        return "33px";
      case "M":
        return "43px";
      case "L":
        return "53px";
      case "Custom":
        return `${CustomMobileSize}px`;
      default:
        return "48px";
    }
  };

  const MobileSizeValue = MobileSizeButton();

  const SizeValue = SizeButton();

  const SvgValue = isMobileView ? MobileSizeValue : SizeValue;
  console.log("🚀 ~ sssssisMobileViews:", SvgValue);

  const svgComponents = [
    <svg
      key="svg1"
      width={SvgValue}
      height={SvgValue}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-496 507.7 54 54"
    >
      <circle
        cx="-469"
        cy="534.7"
        r="27"
        fill={state?.widgetcustomization?.widgetColor}
      />
      <path
        fill="#FFF"
        d="M-459.9 523.7h-20.3c-1.9 0-3.4 1.5-3.4 3.4v15.3c0 1.9 1.5 3.4 3.4 3.4h11.4l5.9 4.9c.2.2.3.2.5.2h.3c.3-.2.5-.5.5-.8v-4.2h1.7c1.9 0 3.4-1.5 3.4-3.4v-15.3c0-2-1.5-3.5-3.4-3.5z"
      />
      <path
        fill={state?.widgetcustomization?.widgetColor}
        d="M-477.7 530.5h11.9c.5 0 .8.4.8.8 0 .5-.4.8-.8.8h-11.9c-.5 0-.8-.4-.8-.8-.1-.5.3-.8.8-.8zM-477.7 533.5h7.9c.5 0 .8.4.8.8 0 .5-.4.8-.8.8h-7.9c-.5 0-.8-.4-.8-.8-.1-.4.3-.8.8-.8z"
      />
    </svg>,

    <svg
      width={SvgValue}
      height={SvgValue}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      svg-inline=""
      role="presentation"
      focusable="false"
      className="chat-icon chat-smile"
    >
      <path
        d="M24 48c13.255 0 24-10.745 24-24S37.255 0 24 0 0 10.745 0 24s10.745 24 24 24z"
        fill={state?.widgetcustomization?.widgetColor}
        className="color-fill"
      ></path>
      <path
        d="M33.156 14.578h-20a3.281 3.281 0 00-3.29 3.289V29.51a3.281 3.281 0 003.29 3.289H30.31l4.8 4.8c.178.178.356.178.622.178h.356c.355-.178.533-.534.533-.8V17.867c-.178-1.778-1.689-3.29-3.466-3.29z"
        fill="#fff"
      ></path>
      <path
        d="M18.045 26.844c2.222.978 7.555 1.867 11.555-2.4M32 24.356c-.09-1.067-.711-3.023-2.934-2.49"
        stroke={state?.widgetcustomization?.widgetColor}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="color-stroke"
      ></path>
    </svg>,
    <svg
      width={SvgValue}
      height={SvgValue}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="presentation"
      focusable="false"
      className="chat-icon chat-bubble"
    >
      <path
        d="M24 48c13.255 0 24-10.745 24-24S37.255 0 24 0 0 10.745 0 24s10.745 24 24 24z"
        fill={state?.widgetcustomization?.widgetColor}
        className="color-fill"
      />
      <path
        d="M21.6 13.333h4.711c2.667 0 5.334 1.067 7.2 3.023 1.867 1.866 3.022 4.533 3.022 7.2 0 5.333-4.088 9.777-9.422 10.222v3.91c0 .356-.178.623-.444.8h-.356c-.177 0-.444-.177-.622-.355L21.6 33.69c-2.667 0-5.333-1.067-7.2-3.022-1.867-1.956-3.022-4.534-3.022-7.2 0-5.6 4.622-10.134 10.222-10.134zm8.622 11.734c.978 0 1.6-.623 1.6-1.6 0-.978-.622-1.6-1.6-1.6-.977 0-1.6.622-1.6 1.6.09.977.712 1.6 1.6 1.6zm-6.222 0c.978 0 1.6-.623 1.6-1.6 0-.978-.622-1.6-1.6-1.6-.978 0-1.6.622-1.6 1.6 0 .977.622 1.6 1.6 1.6zm-6.311 0c.978 0 1.6-.623 1.6-1.6 0-.978-.622-1.6-1.6-1.6-.978 0-1.6.622-1.6 1.6 0 .977.622 1.6 1.6 1.6z"
        fill="#fff"
      />
    </svg>,

    <svg
      width={SvgValue}
      height={SvgValue}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="presentation"
      focusable="false"
      className="chat-icon chat-db"
    >
      <path
        d="M24 48c13.255 0 24-10.745 24-24S37.255 0 24 0 0 10.745 0 24s10.745 24 24 24z"
        fill={state?.widgetcustomization?.widgetColor}
        className="color-fill"
      />
      <path
        d="M27.91 18.311H14.045c-1.689 0-3.11 1.422-3.11 3.111v9.245c0 1.688 1.421 3.11 3.11 3.11h11.2l4.445 4.445c.177.178.266.178.622.178h.267c.266-.178.444-.444.444-.8V21.422c0-1.689-1.422-3.11-3.111-3.11z"
        fill="#fff"
      />
      <path
        d="M32.533 13.689H18.667c-1.69 0-3.111 1.422-3.111 3.111H27.91a4.59 4.59 0 014.622 4.622v10.311l1.69 1.69c.177.177.266.177.622.177h.266c.267-.178.445-.444.445-.8v-16c.089-1.689-1.334-3.111-3.023-3.111z"
        fill="#fff"
      />
    </svg>,
  ];

  const icon = state?.widgetcustomization?.CustomwidgetIcon;

  const handleClick = () => {
    handleOnClose();
  };

  const handleMouseEnter = () => {
    if (state?.widgetcustomization?.defaultState === "hover") {
      if (state?.widgetcustomization?.viewType === "simple" && setActive) {
        setActive(true);
      } else if (
        state?.widgetcustomization?.viewType === "chat" &&
        setActive &&
        setChartViewOpen
      ) {
        setActive(true);
        setChartViewOpen(true);
      }
    }
  };
  const PendingMessage = state?.widgetcustomization;

  const isMobileWidgetSize = isMobileView
    ? PendingMessage.MobileWidgetSize
    : PendingMessage.widgetSize;

  const isMobileCustomSize = isMobileView
    ? PendingMessage.customMobileSize
    : PendingMessage.customSize;

  const PendingMessageStyling = () => {
    if (
      isMobileWidgetSize === "Custom" &&
      PendingMessage?.customSize !== undefined
    ) {
      if (isMobileCustomSize >= 33 && isMobileCustomSize <= 47) {
        return "6px";
      } else if (isMobileCustomSize >= 48 && isMobileCustomSize <= 57) {
        return "8px";
      } else if (isMobileCustomSize >= 58 && isMobileCustomSize <= 70) {
        return "10px";
      }
    }

    switch (isMobileWidgetSize) {
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
  const PendingMessageValue = PendingMessageStyling();
  return (
    <Box
      sx={{
        position: "relative",
      }}
      className={
        state?.widgetcustomization?.animationCustom
          ? "animate__animated animate__bounce animate__infinite "
          : " "
      }
      style={{
        animationDuration: "2s",
      }}
    >
      {state?.widgetcustomization?.PendingMessage < 99 ? (
        <Box
          sx={{
            position: "absolute",
            backgroundColor: "rgb(237, 67, 55)",
            borderRadius: "50%",
            width: state?.widgetcustomization?.animationCustom ? "45%" : "45%",
            height: state?.widgetcustomization?.animationCustom ? "45%" : "45%",
            fontSize: "10px",
            alignItems: "center",
            display:
              state?.widgetcustomization?.PendingMessage === "" ||
              state?.widgetcustomization?.PendingMessage <= 0
                ? "none"
                : "flex",
            justifyContent: "center",
            right: isMobileView ? "-4px" : "-7px",
            top: state?.widgetcustomization?.animationCustom ? "-6px" : "-6px",
            zIndex: "20",
          }}
        >
          <Box
            sx={{
              position: " relative",
              display: "inline-block",
            }}
          >
            <span
              style={{
                color: "white",
                fontSize: "PendingMessageValue",
                fontWeight: "500",
              }}
            >
              {state?.widgetcustomization?.PendingMessage}
            </span>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            position: "absolute",
            backgroundColor: "rgb(237, 67, 55)",
            borderRadius: "50%",
            width: state?.widgetcustomization?.animationCustom ? "45%" : "45%",
            height: state?.widgetcustomization?.animationCustom ? "45%" : "45%",
            fontSize:
              // : "10px",
              "6px",

            // "6px",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            right: isMobileView ? "-4px" : "-7px",
            top: state?.widgetcustomization?.animationCustom ? "-6px" : "-6px",
            fontWeight: "500",
            zIndex: "20",
          }}
        >
          <Box
            sx={{
              position: " relative",
              display: "inline-block",
            }}
          >
            <span
              style={{
                color: "white",
                fontWeight: "500",
                fontSize: PendingMessageValue,
              }}
            >
              99+
            </span>
          </Box>
        </Box>
      )}

      <Avatar
        sx={{
          width: SvgValue,
          height: SvgValue,

          animation: "sin 0.3s ease-in-out",
          animationIterationCount: 1,
          "@keyframes sin": {
            "0%": { transform: "rotate(120deg)" },
            "100%": { transform: "rotate(0deg)" },
          },
        }}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
      >
        {icon && icon !== "" ? (
          <img src={icon} alt="Custom Icon" />
        ) : (
          svgComponents[index]
        )}
      </Avatar>
    </Box>
  );
};
export default SvgCompo;
