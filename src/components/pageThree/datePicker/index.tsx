import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { DateScheduling } from "@/src/types/settings";

interface DatePickerNewProps {
  value?: string; // Optional value prop
  handleDateSchedulingChange: (
    id: string | undefined,
    field: string,
    value: string
  ) => void;
  rule: DateScheduling;
  field: string;
}

export default function DatePickerNew({
  value,
  handleDateSchedulingChange,
  rule,
  field,
}: DatePickerNewProps) {
  // Initialize dayjsValue to null for no initial value
  const dayjsValue = value ? dayjs(value) : null;

  const handleDateChange = (newValue: dayjs.Dayjs | null) => {
    if (newValue) {
      // Format the date as YYYY-MM-DD
      const formattedDate = newValue.format("YYYY-MM-DD");
      handleDateSchedulingChange(rule?.id, field, formattedDate);
    } else {
      // Handle case where the date is cleared
      handleDateSchedulingChange(rule?.id, field, ""); // Notify parent of cleared date
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={dayjsValue}
        onChange={handleDateChange}
        sx={{
          "& .MuiInputBase-root": {
            fontSize: "14px",
            height: "40px",
            fontWeight: 600,
          },
        }}
        format="DD/MM/YYYY"
        slotProps={{
          textField: {
            fullWidth: true,
          },
        }}
      />
    </LocalizationProvider>
  );
}

// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";
// import { useEffect } from "react";
// import { DateScheduling } from "@/src/types/settings";

// interface DatePickerNewProps {
//   value?: string;
//   handleDateSchedulingChange: (
//     id: string | undefined,
//     field: string,
//     value: string
//   ) => void;
//   rule: DateScheduling;
//   field: string;
// }

// export default function DatePickerNew({
//   value,
//   handleDateSchedulingChange,
//   rule,
//   field,
// }: DatePickerNewProps) {
//   const defaultDate = dayjs("2024/10/14");
//   const dayjsValue = value ? dayjs(value) : defaultDate;

//   // Use effect to ensure that defaultDate is set in the state if no value is provided
//   useEffect(() => {
//     if (!value) {
//       const formattedDate = defaultDate.format("YYYY-MM-DD");
//       handleDateSchedulingChange(rule?.id, field, formattedDate);
//     }
//   }, [value, rule?.id, field, handleDateSchedulingChange]);

//   const handleDateChange = (newValue: dayjs.Dayjs | null) => {
//     if (newValue) {
//       const formattedDate = newValue.format("YYYY-MM-DD");
//       handleDateSchedulingChange(rule?.id, field, formattedDate);
//     }
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DatePicker
//         value={dayjsValue}
//         onChange={handleDateChange}
//         sx={{
//           "& .MuiInputBase-root": {
//             fontSize: "14px",
//             height: "40px",
//             fontWeight: 600,
//           },
//         }}
//         format="DD/MM/YYYY"
//         slotProps={{
//           textField: {
//             fullWidth: true,
//           },
//         }}
//       />
//     </LocalizationProvider>
//   );
// }
