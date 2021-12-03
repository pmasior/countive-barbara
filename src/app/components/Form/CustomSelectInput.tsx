import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import React, { FC, ReactNode } from "react";
import { UseFormGetValues, UseFormRegisterReturn } from "react-hook-form";
import { FormFieldsNames } from "../TransactionForm/TransactionForm";

type CustomSelectInputProps = {
  errorText?: string | undefined;
  reactHookFormProps: { getValues: UseFormGetValues<FormFieldsNames> };
  inputProps: UseFormRegisterReturn;
  label: string;
  name: keyof FormFieldsNames;
  options: Option[];
};

type Option = {
  label: string | ReactNode;
  value: string | number;
};

export const CustomSelectInput: FC<CustomSelectInputProps> = ({
  errorText = null,
  inputProps,
  reactHookFormProps,
  label,
  name,
  options,
}) => {
  const { getValues } = reactHookFormProps;

  return (
    <TextField
      select
      SelectProps={inputProps}
      defaultValue={getValues(name)}
      inputProps={inputProps}
      label={label}
      error={!!errorText}
      helperText={errorText}
      margin="dense"
      fullWidth
    >
      {options.map((m) => (
        <MenuItem key={`menuItem_${label}_${m.value}`} value={m.value}>
          {m.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default CustomSelectInput;
