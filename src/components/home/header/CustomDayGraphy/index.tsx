import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";

dayjs.extend(isBetweenPlugin);

interface CustomPickerDayProps extends PickersDayProps<Dayjs> {
  isInRange: boolean;
  isStart: boolean;
  isEnd: boolean;
  isToday: boolean;
}
const CustomPickersDay = React.memo(
  styled(PickersDay, {
    shouldForwardProp: (prop) =>
      prop !== "isInRange" &&
      prop !== "isStart" &&
      prop !== "isEnd" &&
      prop !== "isToday",
  })<CustomPickerDayProps>(({ theme, isInRange, isStart, isEnd, isToday }) => ({
    fontSize: "0.8rem",
    borderRadius: 0,
    padding: "6px",
    transition: "background-color 0.3s, color 0.3s", // Smooth transition for color changes
    // Apply hover effect only if it's not the start date
    "&:hover": {
      backgroundColor: !isStart ? "#e0e0e0" : "transparent", // No hover effect for start date
      cursor: !isStart ? "pointer" : "default", // Change cursor to pointer only when it's not the start date
    },
    ...(isInRange && {
      backgroundColor: "#e0e0e0",
      color: theme.palette.text.primary,
    }),
    ...(isStart && {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      borderTopLeftRadius: "50%",
      borderBottomLeftRadius: "50%",
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        borderTopLeftRadius: "50%",
        borderBottomLeftRadius: "50%",
      },
    }),
    ...(isEnd && {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      borderTopRightRadius: "50%",
      borderBottomRightRadius: "50%",
    }),
    ...(isToday && {
      ...(isStart || isEnd
        ? {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          }
        : {
            border: `2px solid ${theme.palette.primary.main}`,
            borderRadius: "50%",
            "&:hover": {
              border: "2px solid #959ea9",

              backgroundColor: "#959ea9",
            },
          }),
    }),
  }))
) as React.ComponentType<CustomPickerDayProps>;

function Day(
  props: PickersDayProps<Dayjs> & {
    startDate?: Dayjs | null;
    endDate?: Dayjs | null;
  }
) {
  const { day, startDate, endDate, ...other } = props;

  const isInRange =
    startDate && endDate && day.isBetween(startDate, endDate, null, "()");
  const isStart = startDate ? day.isSame(startDate, "day") : false;
  const isEnd = endDate ? day.isSame(endDate, "day") : false;
  const isToday = day.isSame(dayjs(), "day");

  return (
    <CustomPickersDay
      {...other}
      day={day}
      isInRange={!!isInRange}
      isStart={!!isStart}
      isEnd={!!isEnd}
      isToday={isToday}
    />
  );
}

export default function RangePicker({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: {
  startDate?: Dayjs | null;
  setStartDate: (date: Dayjs | null) => void;
  endDate?: Dayjs | null;
  setEndDate: (date: Dayjs | null) => void;
}) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDateChange = (date: Dayjs | null) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (date && date.isAfter(startDate)) {
        setEndDate(date);
      } else {
        setStartDate(date);
        setEndDate(null);
      }
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={endDate || startDate}
        onChange={handleDateChange}
        showDaysOutsideCurrentMonth
        maxDate={dayjs()} // Prevent selecting dates beyond today
        slots={{ day: Day }}
        slotProps={{
          day: {
            startDate,
            endDate,
          } as any,
        }}
        sx={{
          width: isSmallScreen ? "100%" : "auto",
          ".MuiPickersCalendarHeader-root": {
            flexDirection: isSmallScreen ? "column" : "row",
          },
          ".MuiPickersCalendarHeader-labelContainer": {
            marginBottom: isSmallScreen ? "8px" : "0",
          },
        }}
      />
    </LocalizationProvider>
  );
}
