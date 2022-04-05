import { Controller, useFormContext } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";

interface ICustomTextInput {
  name: string;
  label: string;
  muiProps?: TextFieldProps;
}

export default function CustomTextInput(props: ICustomTextInput) {
  const { name, label, muiProps } = props;
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ fieldState: { invalid, error }, field }) => (
        <TextField
          {...muiProps}
          {...field}
          label={label}
          error={invalid}
          helperText={invalid ? error?.message : null}
        ></TextField>
      )}
    ></Controller>
  );
}
