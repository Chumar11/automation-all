// import { themColor } from "@/src/theme/themColor";
import { themColor } from "@/src/theme/themColor";
import { SvgIcon, SvgIconProps } from "@mui/material";
import React from "react";

const Laptop: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon viewBox="0 0 25 25" fill="none">
      <path
        d="M16.667 15c.916 0 1.666-.75 1.666-1.667V5c0-.917-.75-1.667-1.666-1.667H3.333c-.916 0-1.666.75-1.666 1.667v8.333c0 .917.75 1.667 1.666 1.667h-2.5a.836.836 0 00-.833.833c0 .459.375.834.833.834h18.334a.836.836 0 00.833-.834.836.836 0 00-.833-.833h-2.5zM4.167 5h11.666c.459 0 .834.375.834.833V12.5a.836.836 0 01-.834.833H4.167a.836.836 0 01-.834-.833V5.833c0-.458.375-.833.834-.833z"
        fill={themColor.primary}
      ></path>
    </SvgIcon>
  );
};

export default Laptop;
