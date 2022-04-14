import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface ICustomSelect {
  name: string;
  label: string;
  muiProps?: SelectProps;
  items?: { name: string; value: string }[];
}

export default function CustomSelect(props: ICustomSelect) {
  const { muiProps, name, label, items } = props;
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { invalid, error } }) => (
        <FormControl error={invalid} size="small">
          <InputLabel id={name + "-label"}>{label}</InputLabel>
          <Select labelId={name + "-label"} id={name} label="Age" {...muiProps} {...field}>
            {items?.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error={invalid}>{invalid ? error?.message : ""}</FormHelperText>
        </FormControl>
      )}
    ></Controller>
  );
}
