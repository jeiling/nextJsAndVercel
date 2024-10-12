import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { ValidationItemProps } from "../types";

const ValidationItem = ({ isValid, text }: ValidationItemProps) => (
  <li className="flex items-center text-white text-sm h-10">
    {isValid ? (
      <CheckCircleIcon className="w-6 h-6 text-[#00D1FF] mr-[10px]" />
    ) : (
      <CheckCircleOutlineOutlinedIcon className="w-6 h-6 text-[#565656] mr-[10px]" />
    )}
    {text}
  </li>
);

export default ValidationItem;
