import { Tag } from ".prisma/client";
import { TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import React, { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useFetchCurrency } from "src/app/hooks/useFetchCurrency";
import { useFetchSettlementAccount } from "src/app/hooks/useFetchSettlementAccount";
import { useFetchTags } from "src/app/hooks/useFetchTags";
import { useGenerateMethodOfPayment } from "src/app/hooks/useGenerateMethodOfPayment";
import { useGenerateSubcategories } from "src/app/hooks/useGenerateSubcategories";
import { FetchPostReturn } from "src/common/hooks/useMutate";
import { CustomDatePicker } from "../Form/CustomDatePicker";
import CustomSelectInput from "../Form/CustomSelectInput";
import CustomTextInput from "../Form/CustomTextInput";
import SelectOptionWithIcon from "../Form/IconInMenuItem";

export type FormFieldsNames = {
  addedAt: Date;
  amount: string;
  note: string;
  currencyId: number;
  subcategoryId: number;
  settlementAccountId: number;
  methodOfPaymentId: number;
  tags: Tag[];
};

type TransactionFormProps = {
  defaultValues: {
    addedAt?: Date;
    amount?: string;
    note?: string;
    currencyId?: number;
    subcategoryId?: number;
    settlementAccountId?: number;
    methodOfPaymentId?: number;
    tags?: Tag[];
  };
  mutate: (body: any) => Promise<FetchPostReturn>;
};

export const TransactionForm: FC<TransactionFormProps> = ({
  defaultValues,
  mutate,
}) => {
  console.log(defaultValues);
  const subcategories = useGenerateSubcategories();
  const { settlementAccounts } = useFetchSettlementAccount();
  const { currencies } = useFetchCurrency();
  const methodOfPayments = useGenerateMethodOfPayment();
  const { tags } = useFetchTags();
  const [alertText, setAlertText] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    getValues,
    control,
    clearErrors,
    formState: { errors },
  } = useForm<FormFieldsNames>({
    defaultValues: { ...defaultValues },
  });

  const onSubmit: SubmitHandler<FormFieldsNames> = async (data, e) => {
    const { error, json, text } = await mutate(data);
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
                reactHookFormProps={{ getValues }}
                inputProps={register("currencyId", {
                  required: "Currency is required",
                })}
                label="Currency"
                name="currencyId"
                options={
                  currencies?.map((c) => ({
                    value: c.id,
                    label: c.shortName,
                  })) || []
                }
              />
            </Grid>
            <Grid item xs={12}>
              <CustomSelectInput
                errorText={errors.subcategoryId?.message}
                reactHookFormProps={{ getValues }}
                inputProps={register("subcategoryId", {
                  required: "Subcategory is required",
                })}
                label="Subcategory"
                name="subcategoryId"
                // TODO: filter subcategories by category
                options={
                  subcategories?.map((s) => ({
                    value: s.id,
                    label: (
                      <SelectOptionWithIcon
                        color={s.color}
                        iconName={s.icon?.name || ""}
                        label={s.name}
                      />
                    ),
                  })) || []
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomSelectInput
                errorText={errors.settlementAccountId?.message}
                reactHookFormProps={{ getValues }}
                inputProps={register("settlementAccountId", {
                  required: "Settlement Account is required",
                })}
                label="Settlement Account"
                name="settlementAccountId"
                options={
                  settlementAccounts?.map((s) => ({
                    value: s.id,
                    label: s.name,
                  })) || []
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomSelectInput
                errorText={errors.methodOfPaymentId?.message}
                reactHookFormProps={{ getValues }}
                inputProps={register("methodOfPaymentId", {
                  required: "Method of Payment is required",
                })}
                label="Method of Payment"
                name="methodOfPaymentId"
                options={
                  methodOfPayments?.map((m) => ({
                    value: m.id,
                    label: (
                      <SelectOptionWithIcon
                        color={"initial"}
                        iconName={m.icon?.name || ""}
                        label={m.name}
                      />
                    ),
                  })) || []
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                id="tags"
                options={tags || []}
                getOptionLabel={(option) => option.name}
                defaultValue={getValues("tags")}
                onChange={(e, v) => setValue("tags", v)}
                renderInput={(params) => (
                  <TextField
                    SelectProps={register("tags")}
                    {...params}
                    label="Tags"
                    placeholder="Tags"
                  />
                )}
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
