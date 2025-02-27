// import * as React from "react";
// import dayjs from "dayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// import { DateScheduling } from "@/src/types/settings";

// interface TimePickerNewProps {
//   value?: string; // Optional value prop
//   rule: DateScheduling;
//   field: string;
//   handleDateSchedulingChange: (
//     id: string | undefined,
//     field: string,
//     value: string
//   ) => void;
// }

// export default function TimePickerNew({
//   value,
//   rule,
//   field,
//   handleDateSchedulingChange,
// }: TimePickerNewProps) {
//   // Initialize dayjsValue to null to start with no value
//   const dayjsValue = value ? dayjs(value, "hh:mm A") : null;

//   const handleTimeChange = (newValue: dayjs.Dayjs | null) => {
//     if (newValue) {
//       const formattedTime = newValue.format("hh:mm A");
//       handleDateSchedulingChange(rule.id, field, formattedTime); // Notify parent of the change
//     } else {
//       // If newValue is null (cleared), notify parent to clear the value
//       handleDateSchedulingChange(rule.id, field, ""); // Optionally send empty string or you can handle as required
//     }
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <TimePicker
//         value={dayjsValue}
//         onChange={handleTimeChange}
//         format="hh:mm A"
//         ampm={true}
//         sx={{
//           width: "100%",
//           "& .MuiInputBase-root": {
//             fontSize: "14px",
//             height: "40px",
//             fontWeight: 600,
//           },
//         }}
//         slotProps={{
//           textField: {
//             fullWidth: true,
//           },
//         }}
//       />
//     </LocalizationProvider>
//   );
// }

import * as React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateScheduling } from "@/src/types/settings";

interface TimePickerNewProps {
  value?: string; // Optional value prop
  rule: DateScheduling;
  field: string;
  handleDateSchedulingChange: (
    id: string | undefined,
    field: string,
    value: string
  ) => void;
}

export default function TimePickerNew({
  value,
  rule,
  field,
  handleDateSchedulingChange,
}: TimePickerNewProps) {
  // Initialize dayjsValue to null to start with no value
  const dayjsValue = value ? dayjs(value, "HH:mm") : null;

  const handleTimeChange = (newValue: dayjs.Dayjs | null) => {
    if (newValue) {
      const formattedTime = newValue.format("HH:mm");
      handleDateSchedulingChange(rule.id, field, formattedTime); // Notify parent of the change
    } else {
      // If newValue is null (cleared), notify parent to clear the value
      handleDateSchedulingChange(rule.id, field, ""); // Optionally send empty string or you can handle as required
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        value={dayjsValue}
        onChange={handleTimeChange}
        format="HH:mm"
        ampm={false}
        sx={{
          width: "100%",
          "& .MuiInputBase-root": {
            fontSize: "14px",
            height: "40px",
            fontWeight: 600,
          },
        }}
        slotProps={{
          textField: {
            fullWidth: true,
          },
        }}
      />
    </LocalizationProvider>
  );
}
