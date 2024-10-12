export interface CalendarTitleProps {
    startOfMonth: Date;
  }
  
  export interface MonthAndYearSelectionProps {
    isYearSelection: boolean;
    onChange: (selectionType: "year" | "month", action: "prev" | "next") => void;
    onYearClick: () => void;
    startOfMonth: Date;
  }
  
  export interface ValidationItemProps {
    isValid: boolean;
    text: string;
  }
  
  export interface YearSelectionProps {
    selectedYear: number;
    onClick: (year: number) => void;
    onCancel: () => void;
  }
  
  export interface CalendarFooterProps {
    onCancel: () => void;
    onOk: () => void;
  }
  