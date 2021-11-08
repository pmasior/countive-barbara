import React, { FC, FormHTMLAttributes } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField, { TextFieldProps } from "@mui/material/TextField";

import FormHeader from "./FormHeader";

type FormProps = {
  title: string;
  formProps?: FormHTMLAttributes<HTMLFormElement>;
  textFieldsProps: TextFieldProps[];
  alertText?: string;
  buttonTitle: string;
};

const Form: FC<FormProps> = ({
  title,
  formProps,
  textFieldsProps,
  alertText,
  buttonTitle,
}) => {
  return (
    <FormHeader title={title}>
      <form {...formProps}>
        <Box sx={{ display: "grid", gap: 3 }}>
          {textFieldsProps.map((t) => (
            <TextField {...t} />
          ))}
          {alertText && <Alert severity="error">{alertText}</Alert>}
          <Button
            type="submit"
            variant="contained"
            sx={{ width: 1 / 3, justifySelf: "flex-end" }}
          >
            {buttonTitle}
          </Button>
        </Box>
      </form>
    </FormHeader>
  );
};

export default Form;
