import AdapterDateFns from "@mui/lab/AdapterDateFns";
import deLocale from "date-fns/locale/de";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import React, { FC } from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import {
  Control,
  UseFormClearErrors,
  UseFormRegisterReturn,
  UseFormSetError,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";
import { FormFieldsNames } from "../TransactionForm/TransactionForm";

type ReactHookFormDatePickerProps<TFormFieldsNames> = {
  registerReturn: UseFormRegisterReturn;
  control: Control<TFormFieldsNames, object>;
  setValue: UseFormSetValue<TFormFieldsNames>;
  setError: UseFormSetError<FormFieldsNames>;
  clearErrors: UseFormClearErrors<TFormFieldsNames>;
};

type CustomDatePickerProps = {
  errorText?: string | undefined;
  label: string;
  name: keyof FormFieldsNames;
  reactHookFormProps: ReactHookFormDatePickerProps<FormFieldsNames>;
};

// TODO: remove using FormFieldsNames from TransactionForm
export const CustomDatePicker: FC<CustomDatePickerProps> = ({
  errorText,
  label,
  name,
  reactHookFormProps,
}) => {
  const { control, setValue, setError, clearErrors } = reactHookFormProps;
  const watchDateValue = useWatch({ name, control });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={deLocale}>
      <DatePicker
        onChange={(date) => {
          if (date) setValue(name, date);
        }}
        onError={(reason) =>
          reason ? setError(name, { message: reason }) : clearErrors(name)
        }
        value={watchDateValue}
        renderInput={(params: TextFieldProps) => (
          <TextField
            {...params}
            label={label}
            error={!!errorText}
            helperText={errorText}
            margin="dense"
            fullWidth
          />
        )}
        mask="__.__.____"
      ></DatePicker>
    </LocalizationProvider>
  );
};
