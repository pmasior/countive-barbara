import React, { FC, FormEvent } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import LoginFormHeader from "./LoginFormHeader";

type LoginFormProps = {
  usernameProps: UseFormRegisterReturn;
  passwordProps: UseFormRegisterReturn;
  onFormSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
};

const LoginForm: FC<LoginFormProps> = ({
  usernameProps,
  passwordProps,
  onFormSubmit,
}) => {
  return (
    // <Paper elevation={3} sx={{ padding: 3 }}>
    <form onSubmit={onFormSubmit}>
      <Box sx={{ display: "grid", gap: 3 }}>
        <LoginFormHeader title="Login" />
        <TextField inputProps={{ ...usernameProps }} label="Username" />
        {/* TOOD: pass {...usernameProps} to inputProps */}
        <TextField
          inputProps={{ ...passwordProps }}
          type="password"
          label="Password"
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ width: 1 / 3, justifySelf: "flex-end" }}
        >
          Login
        </Button>
      </Box>
    </form>
    // </Paper>
  );
};

export default LoginForm;
