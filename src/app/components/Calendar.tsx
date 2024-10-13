'use client'
import { useState, useEffect, useRef } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { TextField } from "@mui/material";
import { inputLabelClasses } from "@mui/material/InputLabel";
import YearSelection from "./YearSelection";
import CalendarTitle from "./CalendarTitle";
import MonthAndYearSelection from "./MonthAndYearSelection";
import CalendarFooter from "./CalendarFooter";

const Calendar: React.FC = () => {
  const initDate = new Date(0);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [tempSelectedDate, setTempSelectedDate] = useState<Date>(initDate);
  const [hoveredDate, setHoveredDate] = useState<Date>(initDate);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedYear, setSelectedYear] = useState(currentMonth.getFullYear());
  const [dateString, setDateString] = useState("");
  const [isYearSelection, setIsYearSelection] = useState(false);

  const calendarRef = useRef<HTMLDivElement>(null);

  const handleDateClick = (date: Date) => {
    setTempSelectedDate(date);
    setHoveredDate(date);
  };

  const handleMouseEnter = (date: Date) => {
    setHoveredDate(date);
  };

  const handleMouseLeave = () => {
    setHoveredDate(initDate);
  };

  const startOfMonth = new Date(selectedYear, currentMonth.getMonth(), 1);
  const endOfMonth = new Date(selectedYear, currentMonth.getMonth() + 1, 0);

  const startOfCalendar = startOfWeek(startOfMonth, { weekStartsOn: 0 });
  const endOfCalendar = endOfWeek(endOfMonth, { weekStartsOn: 0 });
  const daysInCalendar = eachDayOfInterval({
    start: startOfCalendar,
    end: endOfCalendar,
  });

  const handleOk = () => {
    if (tempSelectedDate) {
      setTempSelectedDate(initDate);
      setSelectedDate(tempSelectedDate);
      setDateString(format(tempSelectedDate, "dd/MM/yyyy"));
    }
    setShowCalendar(false);
  };

  const cancelSelection = () => {
    setTempSelectedDate(initDate);
    setShowCalendar(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      calendarRef.current &&
      !calendarRef.current.contains(event.target as Node)
    ) {
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    setCurrentMonth(new Date(year, currentMonth.getMonth(), 1));
    setIsYearSelection(false);
  };

  const handleYearClick = () => {
    setIsYearSelection(true);
    setCurrentMonth(new Date(selectedYear, 0, 1));
  };

  const handleChange = (type: "month" | "year", direction: "prev" | "next") => {
    if (type === "month") {
      setCurrentMonth((prev) =>
        direction === "prev" ? subMonths(prev, 1) : addMonths(prev, 1)
      );
    } else if (type === "year") {
      setSelectedYear((prev) => prev + (direction === "prev" ? -1 : 1));
      setCurrentMonth(
        (prev) =>
          new Date(
            selectedYear + (direction === "prev" ? -1 : 1),
            prev.getMonth(),
            1
          )
      );
    }
  };

  return (
    <div className="flex flex-col min-h-screen text-white">
      <div className="relative w-full mb-4">
        <TextField
          value={dateString}
          onFocus={() => setShowCalendar(true)}
          label="Birthday"
          placeholder="mm/dd/yyyy"
          variant="outlined"
          className="w-[335px] mb-4 text-white placeholder:text-gray-400 border-white"
          fullWidth
          InputProps={{
            className: "text-white rounded-lg .placeholder-gray-200",
            readOnly: true,
            classes: {
              root: "text-white",
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "rgba(255, 255, 255, 0.5)",
                borderWidth: "3px",
              },
              "&:hover fieldset": {
                borderColor: "rgba(255, 255, 255, 0.5)",
              },
              "&.Mui-focused fieldset": {
                borderColor: `${dateString ? "#00A3FF" : "white"}`,
              },
            },
          }}
          InputLabelProps={{
            shrink: true,
            sx: {
              [`&.${inputLabelClasses.shrink}`]: {
                color: "#ffff",
              },
            },
          }}
        />

        {showCalendar && (
          <div
            ref={calendarRef}
            className="absolute bg-gray300 px-6 py-4 rounded-[10px] w-full z-10 mt-1 w-80"
          >
            <CalendarTitle startOfMonth={startOfMonth} />
            <MonthAndYearSelection
              isYearSelection={isYearSelection}
              startOfMonth={startOfMonth}
              onChange={handleChange}
              onYearClick={handleYearClick}
            />

            {isYearSelection ? (
              <YearSelection
                selectedYear={selectedYear}
                onClick={handleYearSelect}
                onCancel={() => setIsYearSelection(false)}
              />
            ) : (
              <>
                <div className="grid grid-cols-7 text-center">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                    <div key={day} className="text-xs text-gray200 mb-[13px]">
                      {day}
                    </div>
                  ))}

                  {daysInCalendar.map((day) => {
                    return (
                      <div
                        key={day.toDateString()}
                        onMouseEnter={() => handleMouseEnter(day)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleDateClick(day)}
                        className={`p-2 rounded-full cursor-pointer w-[36px] h-[36px] text-sm
                        ${
                          (isSameDay(tempSelectedDate, initDate) &&
                            isSameDay(day, new Date()) &&
                            isSameDay(selectedDate, new Date())) ||
                          (isSameDay(tempSelectedDate, initDate) &&
                            isSameDay(selectedDate, day))
                            ? "bg-blue50 text-white"
                            : tempSelectedDate !== initDate &&
                              isSameDay(day, selectedDate)
                            ? "border border-[#00A3FF] bg-transparent"
                            : isSameDay(day, tempSelectedDate) &&
                              tempSelectedDate !== initDate
                            ? "bg-blue50 text-white"
                            : isSameDay(day, selectedDate)
                            ? "bg-blue50 text-white"
                            : hoveredDate && isSameDay(day, hoveredDate)
                            ? "bg-white text-black"
                            : ""
                        }
                        ${
                          !isSameMonth(day, startOfMonth)
                            ? "text-white text-opacity-50"
                            : ""
                        }`}
                      >
                        {format(day, "d")}
                      </div>
                    );
                  })}
                </div>
                <CalendarFooter onCancel={cancelSelection} onOk={handleOk} />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
