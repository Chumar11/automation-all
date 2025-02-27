import { SvgIcon, SvgIconProps } from "@mui/material";
import React from "react";

const WarningIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path d="M1 21h22L12 2 1 21z" fill="#fbbc05" />
      <path d="M12 16a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm0-9h-1v7h2V7h-1z" />
    </SvgIcon>
  );
};

export default WarningIcon;
