import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import CustomTextInput from "../Form/CustomTextInput";
import { FormFieldsNames } from "./TransactionForm";

export const AmountField: FC<{ form: UseFormReturn<FormFieldsNames> }> = ({
  form,
}) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <CustomTextInput
      errorText={errors.amount?.message}
      inputProps={register("amount", {
        required: "Amount is required",
      })}
      label="Amount"
    />
  );
};
