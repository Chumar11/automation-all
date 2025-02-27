// import { themColor } from "@/src/theme/themColor";
import { themColor } from "@/src/theme/themColor";
import { SvgIcon, SvgIconProps } from "@mui/material";
import React from "react";

const Phone: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon viewBox="0 0 19 24" fill="none">
      <path
        d="M12.916.833H6.25c-1.15 0-2.083.934-2.083 2.084v14.166c0 1.15.933 2.084 2.083 2.084h6.666c1.15 0 2.084-.934 2.084-2.084V2.917c0-1.15-.934-2.084-2.084-2.084zm-3.333 17.5c-.691 0-1.25-.558-1.25-1.25 0-.691.559-1.25 1.25-1.25.692 0 1.25.559 1.25 1.25 0 .692-.558 1.25-1.25 1.25zM13.333 15h-7.5V3.333h7.5V15z"
        fill={themColor.primary}
      ></path>
      <SvgIcon width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M12.916.833H6.25c-1.15 0-2.083.934-2.083 2.084v14.166c0 1.15.933 2.084 2.083 2.084h6.666c1.15 0 2.084-.934 2.084-2.084V2.917c0-1.15-.934-2.084-2.084-2.084zm-3.333 17.5c-.691 0-1.25-.558-1.25-1.25 0-.691.559-1.25 1.25-1.25.692 0 1.25.559 1.25 1.25 0 .692-.558 1.25-1.25 1.25zM13.333 15h-7.5V3.333h7.5V15z"
          fill={themColor.primary}
        ></path>
      </SvgIcon>
    </SvgIcon>
  );
};

export default Phone;
