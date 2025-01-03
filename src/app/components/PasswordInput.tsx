'use client';
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ValidationItem from "./ValidationItem";
import { inputLabelClasses } from "@mui/material/InputLabel";

const isLongEnoughLength = 9;

const PasswordInput: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [validations, setValidations] = useState({
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    isLongEnough: false,
  });
  const [allValid, setAllValid] = useState(false);

  const validatePassword = (password: string) => {
    const newValidations = {
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>\+\-=]/.test(password),
      isLongEnough: password.length >= isLongEnoughLength,
    };

    setValidations(newValidations);
    setAllValid(Object.values(newValidations).every((value) => value));
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
        className="w-[335px] mb-4 border-white"
        InputLabelProps={{
          className: "!text-white",
          shrink: true,
          sx: {
            [`&.${inputLabelClasses.shrink}`]: {
              color: "white",
            },
          },
        }}
        InputProps={{
          className: "!text-white rounded-lg .placeholder-gray-200",
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "rgba(255, 255, 255, 0.5)",
              borderWidth: "3px",
            },
            "&.Mui-focused fieldset": {
              borderColor: `${password ? "#00A3FF" : "white"}`,
            },
            "&:hover fieldset": {
              borderColor: "rgba(255, 255, 255)",
            },
          },
        }}
      />
      {password && !allValid && (
        <Card className="absolute top-full left-0 mt-1 shadow-md bg-gray100 w-[335px] px-[12px] py-[8px] rounded-lg z-10">
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
                  text: `Longer than ${isLongEnoughLength} characters`,
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
