import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

import Form from "./Form";

export type FormFields = Record<"email" | "password", string>;

const LoginFormContainer: FC<{}> = () => {
  const router = useRouter();
  const [alertText, setAlertText] = useState<string>("");
  const { register, handleSubmit } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (data, e) => {
    const signInResult = await signIn("credentials", {
      redirect: false,
      ...data,
    });
    if (signInResult?.["error"]) {
      setAlertText(signInResult["error"]);
    } else if (signInResult?.["ok"]) {
      router.push("/dashboard");
    }
  };

  return (
    <Form
      title="Login"
      formProps={{ onSubmit: handleSubmit(onSubmit) }}
      textFieldsProps={[
        { inputProps: register("email"), label: "Email" },
        {
          inputProps: register("password"),
          type: "password",
          label: "Password",
        },
      ]}
      alertText={alertText}
      buttonTitle="Login"
    />
  );
};

export default LoginFormContainer;
