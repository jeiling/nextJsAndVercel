import { Button } from "@mui/material";
import { CalendarFooterProps } from "../types";

const CalendarFooter = ({ onCancel, onOk }: CalendarFooterProps) => {
  return (
    <div className="flex mt-4 justify-end">
      <Button onClick={onCancel} className="text-white text-sm w-20 capitalize">
        Cancel
      </Button>
      <Button onClick={onOk} className="text-white text-sm">
        OK
      </Button>
    </div>
  );
};
export default CalendarFooter;
