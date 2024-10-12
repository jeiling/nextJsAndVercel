import React, { useState } from "react";
import { YearSelectionProps } from "../types";

const YearSelection = ({
  selectedYear,
  onClick,
  onCancel,
}: YearSelectionProps) => {
  const [tempYear, setTempYear] = useState<number>(selectedYear);

  const years = Array.from({ length: 20 }, (_, i) => selectedYear - 1 + i);

  const handleYearClick = (year: number) => {
    setTempYear(year);
  };

  const handleOk = () => {
    onClick(tempYear);
  };

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-4 gap-2">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => handleYearClick(year)}
            className={`p-2 rounded-sm w-15 h-6 flex items-center justify-center group ${
              year === tempYear ? "bg-[#00A3FF] text-white" : "text-white"
            } hover:bg-white hover:text-black transition duration-150`}
          >
            {year}
          </button>
        ))}
      </div>
      <div className="flex mt-4 justify-end">
        <button
          onClick={onCancel}
          className="text-white text-sm w-20 capitalize"
        >
          Cancel
        </button>
        <button
          onClick={handleOk}
          className="text-white text-sm w-14 capitalize"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default YearSelection;
