import { Avatar } from "@mui/material";
import { themColor } from "../theme/themColor";
import React from "react";
import { SettingsInterface } from "../types/settings";

export const NewSvg = () => (
  <svg
    style={{
      color: themColor.neutral,
      marginTop: "3px",
      width: "15px",
      height: "15px",
    }}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="presentation"
    focusable="false"
    // Corrected to tabIndex
  >
    <path
      d="M10 18.333a8.333 8.333 0 100-16.666 8.333 8.333 0 000 16.666zM10 13.333V10M10 6.667h.008"
      stroke="currentColor"
      strokeWidth="2.08"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);

export const ContactSvg = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      color={themColor.neutral}
      xmlns="http://www.w3.org/2000/svg"
      role="presentation"
      focusable="false"
      // Corrected to tabIndex
    >
      <g
        clipPath="url(#clip0_8719_30645)"
        stroke="currentColor"
        strokeWidth="1.33"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7.334 2.667H2.667A1.333 1.333 0 001.334 4v9.334a1.333 1.333 0 001.333 1.333h9.334a1.334 1.334 0 001.333-1.333V8.667"></path>
        <path d="M12.334 1.666a1.414 1.414 0 112 2L8.001 10l-2.667.667L6.001 8l6.333-6.333z"></path>
      </g>
      <defs>
        <clipPath id="clip0_8719_30645">
          <path fill="#fff" d="M0 0h16v16H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
};

export const SaveBtnSvg = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      svg-inline=""
      role="presentation"
      focusable="false"
    >
      <path
        d="M15.833 17.5H4.167A1.667 1.667 0 012.5 15.833V4.167A1.667 1.667 0 014.167 2.5h9.166L17.5 6.667v9.166a1.666 1.666 0 01-1.667 1.667z"
        stroke="#fff"
        stroke-width="1.67"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <path
        d="M14.167 17.5v-6.667H5.833V17.5M5.833 2.5v4.167H12.5"
        stroke="#fff"
        stroke-width="1.67"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
  );
};

interface CloseProps {
  handleOnClose: () => void;
  state: SettingsInterface;
  setActive?: (active: boolean) => void;
  setChartViewOpen?: (open: boolean) => void;
  SizeValueClose?: string;
  sizeTwo?: string;
}

export const CloseBtn: React.FC<CloseProps> = ({
  handleOnClose,
  state,
  setActive,
  setChartViewOpen,
  SizeValueClose,
  sizeTwo,
}) => {
  const handleclose = () => {
    handleOnClose();
  };

  const handleMouseLeave = () => {
    if (state?.widgetcustomization?.defaultState === "hover") {
      if (state?.widgetcustomization?.viewType === "simple" && setActive) {
        setActive(false);
      } else if (
        state?.widgetcustomization?.viewType === "chat" &&
        setActive &&
        setChartViewOpen
      ) {
        setActive(false);
        setChartViewOpen(false);
      }
    }
  };

  const svgg = [
    <svg
      width={sizeTwo}
      height={sizeTwo}
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        color: "#fff",
        transform: "translate(-50%, -50%)",
      }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.757.929A2 2 0 10.93 3.757L5.172 8 .929 12.243a2 2 0 002.828 2.828L8 10.828l4.243 4.243a2 2 0 002.828-2.828L10.83 8l4.242-4.243A2 2 0 1012.243.93L8 5.172 3.757.929z"
        fill="currentColor"
      ></path>
    </svg>,
  ];
  return (
    <Avatar
      sx={{
        animation: "spin 0.4s ease-in-out",
        animationIterationCount: 1,
        width: SizeValueClose,
        height: SizeValueClose,
        background: state?.widgetcustomization?.widgetColor,
        "@keyframes spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(120deg)" },
        },
      }}
      onClick={handleclose}
      onMouseLeave={handleMouseLeave}
    >
      {svgg[0]}
    </Avatar>
  );
};
