import React, { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";

import { API_REGISTER_URL } from "src/common/constants/urls";
import { useFetchPOST } from "src/common/hooks/useFetchPost";
import FormHeader from "../Form/FormHeader";
import FormFields from "../Form/FormFields";

export type FormFields = Record<"email" | "password", string>;

const RegisterForm: FC<{}> = () => {
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
    <Box sx={{ display: "grid", gap: 3 }}>
      <FormHeader title="Register" />
      <FormFields
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
    </Box>
  );
};

export default RegisterForm;
