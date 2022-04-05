import { FormControlLabel, FormHelperText, InputLabel, Radio, RadioGroup, RadioProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface ICustomRadio {
  name: string;
  label: string;
  muiProps?: RadioProps;
  items?: { name: string; value: string }[];
}

export default function CustomRadio(props: ICustomRadio) {
  const { muiProps, name, label, items } = props;
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { invalid, error } }) => (
        <>
          <InputLabel error={invalid}>{label}</InputLabel>
          <RadioGroup {...field}>
            {items &&
              items.map((item) => (
                <FormControlLabel
                  key={item.value}
                  label={item.name}
                  value={item.value}
                  labelPlacement="end"
                  control={<Radio {...muiProps}></Radio>}
                ></FormControlLabel>
              ))}
          </RadioGroup>
          <FormHelperText error={invalid}>{error ? error.message : ""}</FormHelperText>
        </>
      )}
    ></Controller>
  );
}
