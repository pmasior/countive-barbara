import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";

import Form from "./Form";
import { API_REGISTER_URL } from "shared/constants/urls";
import { useFetchPOST } from "utils/useFetchPost";

export type FormFields = Record<"email" | "password", string>;

const RegisterFormContainer: FC<{}> = () => {
  const router = useRouter();
  const [alertText, setAlertText] = useState<string>("");
  const { register, handleSubmit } = useForm<FormFields>();
  const { fetchPOST, loading } = useFetchPOST(API_REGISTER_URL);

  const onSubmit: SubmitHandler<FormFields> = async (data, e) => {
    const { error, json, status, text } = await fetchPOST(data);
    if (error) {
      setAlertText(json?.message || text);
    } else if (status === 201) {
      router.push("/login");
    }
  };

  return (
    <Form
      title="Register"
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
      buttonTitle="Register"
    />
  );
};

export default RegisterFormContainer;
