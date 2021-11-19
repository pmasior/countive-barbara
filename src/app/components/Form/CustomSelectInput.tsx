import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import React, { FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import IconInMenuItem from "./IconInMenuItem";

type CustomSelectInputProps = {
  errorText?: string | undefined;
  inputProps: UseFormRegisterReturn;
  label: string;
  options: Option[];
};

type Option = {
  label: string;
  value: string | number;
};

export const CustomSelectInput: FC<CustomSelectInputProps> = ({
  errorText = null,
  inputProps,
  label,
  options,
}) => {
  return (
    <TextField
      select
      defaultValue=""
      inputProps={inputProps}
      label={label}
      error={!!errorText}
      helperText={errorText}
      margin="dense"
      fullWidth
    >
      {options.map((m) => (
        <MenuItem key={`menuItem_${label}_${m.value}`} value={m.value}>
          {/* TODO: make IconInMenuItem optional */}
          <IconInMenuItem color="#66b7fc" iconName="payments" /> {m.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default CustomSelectInput;
