import {
  Controller,
  RegisterOptions,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { Button, Checkbox, Alert, Box, IconButton } from "@mui/material";
import { DevTool } from "@hookform/devtools";
import { TextWraper } from "./FormFeilds/TextWraper";
import { Fragment } from "react";
import { CheckboxOption, CheckboxWraper } from "./FormFeilds/CheckboxWrapper";
import { Delete } from "@mui/icons-material";
type Test = {
  name: string;
};

const pattern = /[^A-Za-z 0-9]/g;

const FIRST_NAME_VALIDATIONS: RegisterOptions = {
  required: "Input required",
  minLength: {
    value: 3,
    message: "Atleast should have 3 characters",
  },
  validate: {
    shouldNotHaveAtSymbol: (val) => {
      return !pattern.test(val) || "should not have at symbol";
    },
  },
};

type FormValues = {
  test: Test[];
  inputA: number;
  inputB: string;
  text: string;
  terms: boolean;
  category: CheckboxOption[];
};

function App() {
  const {
    handleSubmit,
    watch,
    control,
    formState: { isSubmitSuccessful },
  } = useForm<FormValues>({
    defaultValues: {
      test: [{ name: "" }, { name: "" }],
      terms: false,
      category: [
        { optionName: "Accounting", optionValue: "Accounting", isDone: true },
      ],
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "test", // unique name for your Field Array
    shouldUnregister: false,
  });

  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <Fragment>
      {isSubmitSuccessful && (
        <Alert severity="success">form is submitted successfully.</Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)} autoCapitalize="characters">
        {fields.map((field, index) => (
          <output key={field.id} aria-live="assertive">
            <Box display="flex" alignItems="center">
              <TextWraper
                name={`test.${index}.name`}
                control={control}
                label={index === 0 ? "fullname" : ""}
                rules={FIRST_NAME_VALIDATIONS}
                inputProps={{
                  "aria-label": index > 0 ? `fullname ${index + 1}` : undefined,
                }}
              />
              <IconButton
                onClick={() => {
                  remove(index);
                }}
                aria-label={`remove fullname ${index + 1}`}
              >
                <Delete />
              </IconButton>
            </Box>
          </output>
        ))}
        <Button
          variant="contained"
          onClick={() => {
            append(
              {
                name: "",
              },
              {
                shouldFocus: true,
              }
            );
          }}
          disabled={fields.length > 9}
        >
          Add another name
        </Button>

        <Box>
          <CheckboxWraper
            control={control}
            name="category"
            options={[
              { optionName: "Accounting", optionValue: "Accounting" },
              { optionName: "Marketing", optionValue: "Marketing" },
              { optionName: "Production", optionValue: "Production" },
              { optionName: "Research", optionValue: "Research" },
            ]}
            label="Select a category"
            valueKey="isDone"
            returnObject={true}
            rules={{
              required: "Please select category",
            }}
          />
        </Box>
        <Box>
          <Controller
            name="terms"
            control={control}
            render={({ field }) => {
              return (
                <Checkbox
                  value={field.value}
                  inputProps={{
                    "aria-label": "terms",
                  }}
                  onChange={field.onChange}
                />
              );
            }}
          />
          {watch("terms") && (
            <output aria-live="polite">
              Kindly read our terms and conditions before submitting the form
            </output>
          )}
        </Box>
        <Button type="submit" variant="contained">
          Continue
        </Button>
      </form>
      <DevTool control={control} />
    </Fragment>
  );
}

export default App;
