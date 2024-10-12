import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ValidationItem from "./ValidationItem";
import { inputLabelClasses } from "@mui/material/InputLabel";

const PasswordInput: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [validations, setValidations] = useState({
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    isLongEnough: false,
  });

  const validatePassword = (password: string) => {
    setValidations({
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      isLongEnough: password.length > 8,
    });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  return (
    <FormControl fullWidth variant="outlined" className="relative">
      <TextField
        label="Password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
        variant="outlined"
        className="w-[335px] mb-4"
        InputLabelProps={{
          className: "text-white",
          shrink: true,
          sx: {
            [`&.${inputLabelClasses.shrink}`]: {
              color: "white",
            },
          },
        }}
        InputProps={{
          className: "text-white rounded-lg .placeholder-gray-200",
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: `${password ? "#00A3FF" : "white"}`,
            },
          },
        }}
      />
      {password && (
        <Card className="absolute top-full left-0 mt-2 shadow-md bg-[#242424] w-[335px] px-[12px] py-[8px] rounded-lg">
          <CardContent className="p-0 last:pb-0">
            <ul className="list-none p-0">
              {[
                {
                  isValid: validations.hasUpperCase,
                  text: "Have at least one uppercase letter",
                },
                {
                  isValid: validations.hasLowerCase,
                  text: "Have at least one lowercase letter",
                },
                {
                  isValid: validations.hasNumber,
                  text: "Have at least one number",
                },
                {
                  isValid: validations.hasSpecialChar,
                  text: "Have at least one special character (!@#$...etc)",
                },
                {
                  isValid: validations.isLongEnough,
                  text: "Longer than 8 characters",
                },
              ].map((validation, index) => (
                <ValidationItem
                  key={`item-${index}`}
                  isValid={validation.isValid}
                  text={validation.text}
                />
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </FormControl>
  );
};

export default PasswordInput;
