import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from "@mui/material";
import { ChangeEvent } from "react";
import {
  Controller,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

export type CheckboxOption = {
  optionName: string;
  optionValue: unknown;
  isDone: boolean;
};

type FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = UseControllerProps<TFieldValues, TFieldName> &
  CheckboxProps & {
    options: CheckboxOption[] | any[];
    label: string;
    returnObject?: boolean;
    valueKey?: string;
    labelKey?: string;
  };

export const CheckboxWraper = <
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  options = [],
  rules,
  label,
  defaultValue,
  shouldUnregister,
  returnObject = false,
  valueKey = "optionValue",
}: FormInputProps<TFieldValues, TFieldName>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      shouldUnregister={shouldUnregister}
      render={({ field: { onChange, value = [] }, fieldState: { error } }) => {
        const handleCheckboxes = (
          e: ChangeEvent<HTMLInputElement>,
          option: CheckboxOption
        ) => {
          let selectedOptions = [...value];

          if (e.target.checked) selectedOptions.push(e.target.value);
          else
            selectedOptions = selectedOptions.filter(
              (category) => category !== e.target.value
            );

          let objectValues = [...value];

          if (e.target.checked && returnObject) {
            objectValues.push({ ...option, [valueKey]: e.target.checked });
          } else {
            objectValues = objectValues.filter(
              (obj) => obj.optionValue !== e.target.value
            );
          }

          const selectedValues = returnObject ? objectValues : selectedOptions;
          onChange(selectedValues);
        };
        return (
          <FormControl sx={{ m: 3 }} component="fieldset" variant="standard" error={!!error}>
            <FormLabel component="legend">{label}</FormLabel>
            <FormGroup>
              {options?.map((option: CheckboxOption) => (
                <FormControlLabel
                  key={option?.optionName}
                  control={
                    <Checkbox
                      checked={value?.some((item) =>
                        returnObject
                          ? item?.optionValue === option?.optionValue
                          : item === option?.optionValue
                      )}
                      onChange={(e) => handleCheckboxes(e, option)}
                      name={name}
                      value={option?.optionName}
                    />
                  }
                  label={option?.optionName}
                />
              ))}
            </FormGroup>
            <FormHelperText>{error?.message}</FormHelperText>
          </FormControl>
        );
      }}
    />
  );
};
