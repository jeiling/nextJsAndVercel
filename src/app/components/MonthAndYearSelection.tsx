import { format } from "date-fns";
import { MonthAndYearSelectionProps } from "../types";

const MonthAndYearSelection = ({
  isYearSelection,
  onChange,
  onYearClick,
  startOfMonth,
}: MonthAndYearSelectionProps) => {
  return (
    <div className="flex justify-between items-center mb-2 mt-4 h-12">
      <button
        onClick={() => onChange(isYearSelection ? "year" : "month", "prev")}
        className="text-white text-2xl flex items-center justify-center"
      >
        &lt;
      </button>

      <div
        className="text-center cursor-pointer text-base"
        onClick={onYearClick}
      >
        {isYearSelection
          ? format(startOfMonth, "yyyy")
          : format(startOfMonth, "MMMM yyyy")}
      </div>
      
      <button
        onClick={() => onChange(isYearSelection ? "year" : "month", "next")}
        className="text-white text-2xl flex items-center justify-center"
      >
        &gt;
      </button>
    </div>
  );
};
export default MonthAndYearSelection;
