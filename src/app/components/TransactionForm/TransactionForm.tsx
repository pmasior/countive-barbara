import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import React, { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { API_TRANSACTION_URL } from "src/common/constants/urls";
import { useFetchPOST } from "src/common/hooks/useFetchPost";
import { CustomDatePicker } from "../Form/CustomDatePicker";
import CustomSelectInput from "../Form/CustomSelectInput";
import CustomTextInput from "../Form/CustomTextInput";

export type FormFieldsNames = {
  addedAt: Date;
  amount: string;
  note: string;
  currencyId: number;
  subcategoryId: number;
  settlementAccountId: number;
  methodOfPaymentId: number;
};

export const TransactionForm: FC<{}> = () => {
  const [alertText, setAlertText] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    control,
    clearErrors,
    formState: { errors },
  } = useForm<FormFieldsNames>({
    defaultValues: {
      addedAt: new Date(),
      // TODO: read default values from database
      // currencyId: 1,
    },
  });
  const { fetchPOST, loading } = useFetchPOST(API_TRANSACTION_URL);

  const onSubmit: SubmitHandler<FormFieldsNames> = async (data, e) => {
    const { error, json, text } = await fetchPOST(data);
    if (error) {
      setAlertText(json?.message || text);
    } else {
      setAlertText(null);
      // TODO: back to dashboard
    }
    // TODO: remove below alert
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <Dialog open={true}>
      <DialogTitle>Add transaction</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <CustomDatePicker
                errorText={errors.addedAt?.message}
                reactHookFormProps={{
                  registerReturn: register("addedAt", {
                    valueAsDate: true,
                    required: "Added at is required",
                  }),
                  control,
                  setValue,
                  setError,
                  clearErrors,
                }}
                label="Added At"
                name="addedAt"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                errorText={errors.amount?.message}
                inputProps={register("amount", {
                  required: "Amount is required",
                })}
                label="Amount"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomSelectInput
                errorText={errors.currencyId?.message}
                inputProps={register("currencyId", {
                  required: "Currency is required",
                })}
                label="Currency"
                options={[{ value: 1, label: "zł" }]}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomSelectInput
                errorText={errors.subcategoryId?.message}
                inputProps={register("subcategoryId", {
                  required: "Subcategory is required",
                })}
                label="Subcategory"
                options={[{ value: 1, label: "Spożywcze" }]}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomSelectInput
                errorText={errors.settlementAccountId?.message}
                inputProps={register("settlementAccountId", {
                  required: "Settlement Account is required",
                })}
                label="Settlement Account"
                options={[{ value: 1, label: "Santander" }]}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomSelectInput
                errorText={errors.methodOfPaymentId?.message}
                inputProps={register("methodOfPaymentId", {
                  required: "Method of Payment is required",
                })}
                label="Method of Payment"
                options={[{ value: 1, label: "MasterCard" }]}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextInput inputProps={register("note")} label="Note" />
            </Grid>
            {alertText && (
              <Grid item xs={12}>
                <Alert severity="error">{alertText}</Alert>
              </Grid>
            )}
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        {/* TODO: add action to Close */}
        <Button>Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransactionForm;
