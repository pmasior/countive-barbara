import { Autocomplete, TextField } from "@mui/material";
import React, { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { useFetchTags } from "src/app/hooks/useFetchTags";
import { FormFieldsNames } from "./TransactionForm";

export const TagsField: FC<{
  form: UseFormReturn<FormFieldsNames>;
}> = ({ form }) => {
  const {
    register,
    getValues,
    setValue,
    formState: { errors },
  } = form;

  const { tags } = useFetchTags();
  const inputProps = register("tags");

  return (
    <Autocomplete
      multiple
      id="tags"
      options={tags || []}
      getOptionLabel={(option) => option.name}
      defaultValue={getValues("tags")}
      onChange={(e, v) => setValue("tags", v)}
      renderInput={(params) => (
        <TextField {...params} label="Tags" placeholder="Tags" />
      )}
    />
  );
};
