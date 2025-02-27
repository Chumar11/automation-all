// import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
// import React, { Dispatch, SetStateAction } from "react";
// import { DateScheduling, SettingsInterface } from "@/src/types/settings";

// interface TimeZoneProps {
//   // state: SettingsInterface;
//   // setState: Dispatch<SetStateAction<SettingsInterface>>;
//   handleDateSchedulingChange: (
//     id: string | undefined,
//     field: string,
//     value: string
//   ) => void;
//   // onTimeZoneChange: (value: string) => void;
//   rule?: DateScheduling;
//   setState: Dispatch<SetStateAction<SettingsInterface>>;
// }

// const TimeZone: React.FC<TimeZoneProps> = ({
//   handleDateSchedulingChange,
//   // onTimeZoneChange,
//   rule,
//   setState,
// }) => {

//   return (
//     <Box
    
//       sx={{
//         padding: "20px",
//         display: "flex",
//         flexDirection: "column",
//         gap: "10px",
//         borderBottom: `1px solid lightgray`, // Adjusted to a basic color
//         width: "100%",
//       }}
//     >
//       <Typography>Time Zone</Typography>
//       <FormControl fullWidth>
//         <Select
//           sx={{
//             height: "40px",
//             width: "80%",
//             fontWeight: 500,
//             fontSize: "15px",
//             borderColor: "primary", // Adjusted to a basic color
//           }}
//           labelId="timezone-label"
//           value={rule?.timeZone}
//           onChange={(event) =>
//             handleDateSchedulingChange(rule?.id, "timeZone", event.target.value)
//           }
//         >
//           <MenuItem value="none" disabled>
//             None
//           </MenuItem>
//           <MenuItem value="UTC-12:00">UTC-12:00</MenuItem>
//           <MenuItem value="UTC-11:00">UTC-11:00</MenuItem>
//           <MenuItem value="UTC-10:00">UTC-10:00</MenuItem>
//           <MenuItem value="UTC-09:00">UTC-09:00</MenuItem>
//           <MenuItem value="UTC-08:00">UTC-08:00</MenuItem>
//           <MenuItem value="UTC-07:00">UTC-07:00</MenuItem>
//           <MenuItem value="UTC-06:00">UTC-06:00</MenuItem>
//           <MenuItem value="UTC-05:00">UTC-05:00</MenuItem>
//           <MenuItem value="UTC-04:00">UTC-04:00</MenuItem>
//           <MenuItem value="UTC-03:00">UTC-03:00</MenuItem>
//           <MenuItem value="UTC-02:00">UTC-02:00</MenuItem>
//           <MenuItem value="UTC-01:00">UTC-01:00</MenuItem>
//           <MenuItem value="UTC+00:00">UTC+00:00</MenuItem>
//           <MenuItem value="UTC+01:00">UTC+01:00</MenuItem>
//           <MenuItem value="UTC+02:00">UTC+02:00</MenuItem>
//           <MenuItem value="UTC+03:00">UTC+03:00</MenuItem>
//           <MenuItem value="UTC+04:00">UTC+04:00</MenuItem>
//           <MenuItem value="UTC+05:00">UTC+05:00</MenuItem>
//           <MenuItem value="UTC+06:00">UTC+06:00</MenuItem>
//           <MenuItem value="UTC+07:00">UTC+07:00</MenuItem>
//           <MenuItem value="UTC+08:00">UTC+08:00</MenuItem>
//           <MenuItem value="UTC+09:00">UTC+09:00</MenuItem>
//           <MenuItem value="UTC+10:00">UTC+10:00</MenuItem>
//           <MenuItem value="UTC+11:00">UTC+11:00</MenuItem>
//           <MenuItem value="UTC+12:00">UTC+12:00</MenuItem>
//         </Select>
//       </FormControl>
//     </Box>
//   );
// };

// export default TimeZone;

import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { DateScheduling, SettingsInterface } from "@/src/types/settings";

interface TimeZoneProps {
  handleDateSchedulingChange: (
    id: string | undefined,
    field: string,
    value: string
  ) => void;
  rule?: DateScheduling;
  setState: Dispatch<SetStateAction<SettingsInterface>>;
}

export default function TimeZone({
  handleDateSchedulingChange,
  rule,
  setState,
}: TimeZoneProps) {
  return (
    <Box
      sx={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        borderBottom: "1px solid #EAEFF2",
        width: "100%",
      }}
    >
      <Typography>Time Zone</Typography>
      <FormControl fullWidth>
        <Select
          sx={{
            height: "40px",
            width: "80%",
            fontWeight: 500,
            fontSize: "15px",
            borderColor: "primary",
          }}
          labelId="timezone-label"
          value={rule?.timeZone || "none"}
          onChange={(event) =>
            handleDateSchedulingChange(rule?.id, "timeZone", event.target.value)
          }
        >
          <MenuItem value="none">None</MenuItem>
          <MenuItem value="UTC-12:00">UTC-12:00</MenuItem>
          <MenuItem value="UTC-11:00">UTC-11:00</MenuItem>
          <MenuItem value="UTC-10:00">UTC-10:00</MenuItem>
          <MenuItem value="UTC-09:00">UTC-09:00</MenuItem>
          <MenuItem value="UTC-08:00">UTC-08:00</MenuItem>
          <MenuItem value="UTC-07:00">UTC-07:00</MenuItem>
          <MenuItem value="UTC-06:00">UTC-06:00</MenuItem>
          <MenuItem value="UTC-05:00">UTC-05:00</MenuItem>
          <MenuItem value="UTC-04:00">UTC-04:00</MenuItem>
          <MenuItem value="UTC-03:00">UTC-03:00</MenuItem>
          <MenuItem value="UTC-02:00">UTC-02:00</MenuItem>
          <MenuItem value="UTC-01:00">UTC-01:00</MenuItem>
          <MenuItem value="UTC+00:00">UTC+00:00</MenuItem>
          <MenuItem value="UTC+01:00">UTC+01:00</MenuItem>
          <MenuItem value="UTC+02:00">UTC+02:00</MenuItem>
          <MenuItem value="UTC+03:00">UTC+03:00</MenuItem>
          <MenuItem value="UTC+04:00">UTC+04:00</MenuItem>
          <MenuItem value="UTC+05:00">UTC+05:00</MenuItem>
          <MenuItem value="UTC+06:00">UTC+06:00</MenuItem>
          <MenuItem value="UTC+07:00">UTC+07:00</MenuItem>
          <MenuItem value="UTC+08:00">UTC+08:00</MenuItem>
          <MenuItem value="UTC+09:00">UTC+09:00</MenuItem>
          <MenuItem value="UTC+10:00">UTC+10:00</MenuItem>
          <MenuItem value="UTC+11:00">UTC+11:00</MenuItem>
          <MenuItem value="UTC+12:00">UTC+12:00</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}