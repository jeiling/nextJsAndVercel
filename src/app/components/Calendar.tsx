import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import { Dayjs } from "dayjs";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={selectedDate}
        onChange={(newValue) => setSelectedDate(newValue)}
        slotProps={{
          field: {
            sx: {
              color: "#ffff",
            },
          },
          textField: {
            sx: {
              border: "1px solid #ffff",
              color: "#ffff",
            },
          },
          inputAdornment: {
            sx: {
              color: "#ffff !important",
            },
          },
          openPickerIcon: {
            sx: {
              color: "#ffff",
            },
          },
          layout: {
            sx: {
              background: "#1B1B1B",
              color: "#ffff",
            },
          },
          actionBar: {
            sx: {
              color: "#ffff",
            },
          },
          calendarHeader: {
            sx: {
              color: "#ffff",
              "&.MuiDayCalendar-weekDayLabel": {
                color: "red !important",
              },
            },
          },
          leftArrowIcon: {
            sx: {
              color: "#ffff",
            },
          },
          rightArrowIcon: {
            sx: {
              color: "#ffff",
            },
          },
          monthButton: {
            sx: {
              color: "#ffff",
            },
          },
          toolbar: {
            sx: {
              color: "#ffff",
            },
          },
          switchViewButton: {
            sx: {
              color: "pink",
            },
          },
          yearButton: {
            sx: {
              color: "#ffff",
            },
          },
          switchViewIcon: {
            sx: {
              color: "#ffff",
            },
          },
          desktopPaper: {
            sx: {
              color: "#ffff",
            },
          },

          day: {
            sx: {
              color: "#ffff",
              "&.MuiPickersDay-root.Mui-selected": {
                border: "1px solid #00A3FF",
                background: "transparent",
              },
              "&.MuiPickersDay-root:hover": {
                backgroundColor: "#ffff",
                color: "#1B1B1B",
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default Calendar;
