import CheckCircleIcon from "@mui/icons-material/CheckCircle";
interface ValidationItemProps {
  isValid: boolean;
  text: string;
}

const ValidationItem: React.FC<ValidationItemProps> = ({ isValid, text }) => (
  <li className="flex items-center text-white text-sm h-10">
    <CheckCircleIcon
      sx={{
        color: isValid ? "#00D1FF" : "#565656",
        marginRight: "10px",
        width: "20px",
        height: "20px",
      }}
    />
    {text}
  </li>
);

export default ValidationItem;
