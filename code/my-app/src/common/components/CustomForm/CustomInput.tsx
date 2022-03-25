import { Controller } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";

interface ICustomInput {
  name: string;
  control: any;
  muiStyle?: TextFieldProps;
}

export default function CustomInput(props: ICustomInput) {
  const { name, control, muiStyle } = props;

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { invalid, error } }) => {
          return (
            <TextField
              style={{ width: "100%" }}
              {...muiStyle}
              helperText={invalid ? error?.message : null}
              error={invalid}
              {...field}
            ></TextField>
          );
        }}
      />
    </>
  );
}
