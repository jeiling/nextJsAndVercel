import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ValidationItem from "./ValidationItem";
import { inputLabelClasses } from "@mui/material/InputLabel";

const PasswordInput: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [validations, setValidations] = useState({
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    isLongEnough: false,
  });

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

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

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <FormControl fullWidth variant="outlined" sx={{ position: "relative" }}>
      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={handlePasswordChange}
        variant="outlined"
        onFocus={handleFocus}
        onBlur={handleBlur}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
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
      {isFocused && (
        <Card
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            mt: 1,
            boxShadow: 2,
            background: "#242424",
          }}
        >
          <CardContent>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <ValidationItem
                isValid={validations.hasUpperCase}
                text="Have at least one uppercase letter"
              />
              <ValidationItem
                isValid={validations.hasLowerCase}
                text="Have at least one lowercase letter"
              />
              <ValidationItem
                isValid={validations.hasNumber}
                text="Have at least one number"
              />
              <ValidationItem
                isValid={validations.hasSpecialChar}
                text="Have at least one special character (!@#$...etc)"
              />
              <ValidationItem
                isValid={validations.isLongEnough}
                text="Longer than 8 characters"
              />
            </ul>
          </CardContent>
        </Card>
      )}
    </FormControl>
  );
};

export default PasswordInput;
