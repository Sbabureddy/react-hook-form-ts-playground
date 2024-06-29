import { TextField, TextFieldProps } from "@mui/material";
import {
  Controller,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

type FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = UseControllerProps<TFieldValues, TFieldName> & TextFieldProps;

export const TextWraper = <
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  label,
  rules,
  defaultValue,
  shouldUnregister,
  inputProps,
}: FormInputProps<TFieldValues, TFieldName>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      shouldUnregister={shouldUnregister}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
        return (
          <TextField
            helperText={error?.message}
            size="small"
            error={!!error}
            onChange={onChange}
            value={value}
            label={label}
            inputRef={ref}
            variant="outlined"
            margin="dense"
            inputProps={inputProps}
          />
        );
      }}
    />
  );
};
