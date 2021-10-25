import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import LoginForm from "./LoginForm";

export type LoginFormData = {
  username: string;
  password: string;
};

const LoginFormContainer: FC<{}> = () => {
  const { register, handleSubmit } = useForm<LoginFormData>();
  const onSubmit: SubmitHandler<LoginFormData> = (data, e) =>
    console.log(data, e);

  return (
    <LoginForm
      usernameProps={register("username")}
      passwordProps={register("password")}
      onFormSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default LoginFormContainer;
