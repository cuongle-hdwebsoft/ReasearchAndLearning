import { Select, InputLabel, FormHelperText, SelectProps, MenuItem } from "@mui/material";
import { Controller } from "react-hook-form";

interface ICustomSelect {
  control: any;
  name: string;
  muiStyle?: SelectProps;
  id: string;
  items?: Array<{
    key: string;
    label: string;
  }>;
}

export default function CustomSelect(props: ICustomSelect) {
  const { control, name, id, muiStyle, items } = props;

  return (
    <>
      <InputLabel id={id}>{muiStyle?.label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { invalid, error } }) => {
          return (
            <>
              <Select {...muiStyle} id={id} {...field} error={invalid}>
                {items &&
                  items.map((item) => {
                    return (
                      <MenuItem key={item.key} value={item.key}>
                        {item.label}
                      </MenuItem>
                    );
                  })}
              </Select>
              <FormHelperText error={invalid}>{error}</FormHelperText>
            </>
          );
        }}
      ></Controller>
    </>
  );
}
