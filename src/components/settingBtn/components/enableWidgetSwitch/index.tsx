import React from "react";
import {
  Box,
  FormControlLabel,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import IOSSwitch from "../IOSSwitch";
import { NewSvg } from "@/src/components/svg";
// import { themColor } from "@/src/theme/themColor";
import NewToolTip from "@/src/components/newToolTip";
import { themColor } from "@/src/theme/themColor";

interface EnableWidgetSwitchProps {
  checked?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const EnableWidgetSwitch: React.FC<EnableWidgetSwitchProps> = ({
  checked,
  onChange,
  label,
}) => (
  <FormControlLabel
    sx={{
      marginTop: {
        xs: "10px",
        sm: "0px",
      },
      alignItems: {
        xs: "flex-start",
        sm: "center",
      },
      display: "flex",
      flexDirection: {
        xs: "column",
        sm: "row",
      },
      gap: "0px",
    }}
    control={<IOSSwitch checked={checked} onChange={onChange} />}
    label={
      <>
        <Typography
          variant="body2"
          sx={{
            ml: 1,
            color: themColor.secondary,
            fontSize: "13px",
            lineHeight: "1.6",
            justifyContent: "flex-start",
            display: "flex",
            gap: {
              xs: "0px",
              sm: "5px",
            },
            alignItems: "center",
            marginBottom: {
              xs: "10px",
              sm: "0px",
            },
          }}
        >
          {label}
          <NewToolTip
            tooltext="Engage visitors with a WhatsApp-style chat window with a welcome message. Visitors can start conversations by typing messages and clicking on 'Send' will redirect them to WhatsApp."
            placement="top"
            width="160px"
          >
            <IconButton
              sx={{
                mt: -1.5,
              }}
            >
              <NewSvg />
            </IconButton>
          </NewToolTip>
        </Typography>
      </>
    }
  />
);

export default EnableWidgetSwitch;
