import { format } from "date-fns";
import { CalendarTitleProps } from "../types";

const CalendarTitle = ({ startOfMonth }: CalendarTitleProps) => {
  return (
    <div className="h-18">
      Text
      <div className="font-bold text-[32px]">
        {format(startOfMonth, "MMM, yyyy")}
      </div>
    </div>
  );
};
export default CalendarTitle;
