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
import { TextField, Button } from "@mui/material";
import { inputLabelClasses } from "@mui/material/InputLabel";

const CalendarFigma = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [tempSelectedDate, setTempSelectedDate] = useState<Date>(new Date(0));
  const [hoveredDate, setHoveredDate] = useState<Date>(new Date(0));
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
    setHoveredDate(new Date(0));
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
      setSelectedDate(tempSelectedDate);
      setDateString(format(tempSelectedDate, "dd/MM/yyyy"));
    }
    setShowCalendar(false);
  };

  const cancelSelection = () => {
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

  const handleYearClick = () => {
    setIsYearSelection(true); // 顯示年份選擇器
  };

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    setCurrentMonth(new Date(year, currentMonth.getMonth(), 1)); // 更新年份和月份
    setIsYearSelection(false); // 返回月份視圖
  };

  const renderYearSelection = () => {
    const years = Array.from({ length: 12 }, (_, i) => selectedYear - 5 + i); // 顯示 12 年範圍
    return (
      <div className="grid grid-cols-3 gap-2 text-center">
        {years.map((year) => (
          <div
            key={year}
            className={`p-2 cursor-pointer rounded-lg ${
              year === selectedYear ? "bg-blue-500 text-white" : "text-gray-400"
            }`}
            onClick={() => handleYearSelect(year)}
          >
            {year}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen text-white">
      <div className="relative w-full mb-4">
        <TextField
          value={dateString}
          onFocus={() => setShowCalendar(true)}
          label="Select a date"
          placeholder="mm/dd/yyyy"
          variant="outlined"
          fullWidth
          InputProps={{
            readOnly: true,
          }}
          InputLabelProps={{
            sx: {
              [`&.${inputLabelClasses.shrink}`]: {
                color: "#ffff",
              },
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#ffff",
              },
              "&:hover fieldset": {
                borderColor: "#ffff",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#ffff",
              },
            },
            "& label": {
              color: "#ffff",
            },
            "& .MuiInputBase-input": {
              color: "#ffff",
            },
            "& .MuiInputBase-input::placeholder": {
              color: "#BDBDBD",
            },
          }}
        />

        {showCalendar && (
          <div
            ref={calendarRef}
            className="absolute bg-[#181818] p-4 rounded-lg w-full z-10 mt-1"
          >
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                className="text-white"
                disabled={isYearSelection}
              >
                &lt;
              </button>

              <div
                className="text-center cursor-pointer font-semibold"
                onClick={handleYearClick}
              >
                {format(startOfMonth, "MMMM")} {selectedYear}
              </div>

              <button
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                className="text-white"
                disabled={isYearSelection}
              >
                &gt;
              </button>
            </div>

            {isYearSelection ? (
              renderYearSelection()
            ) : (
              <>
                <div className="grid grid-cols-7 gap-2 text-center">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                    <div key={day} className="text-xs text-[#929292]">
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
                        className={`p-2 rounded-full cursor-pointer
                        ${
                          isSameDay(day, tempSelectedDate) &&
                          !isSameDay(tempSelectedDate, selectedDate)
                            ? "border border-[#00A3FF] border-solid" // 選取未確認的日期
                            : isSameDay(day, selectedDate)
                            ? "bg-[#00A3FF] text-white" // 已確認的日期
                            : ""
                        }
                        ${
                          isSameDay(day, hoveredDate) &&
                          !isSameDay(day, selectedDate)
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

                <div className="flex justify-between mt-4">
                  <Button onClick={cancelSelection} className="text-gray-400">
                    Cancel
                  </Button>
                  <Button onClick={handleOk} className="text-blue-500">
                    OK
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarFigma;
