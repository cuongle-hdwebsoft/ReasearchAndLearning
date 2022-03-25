import { RadioGroup, Radio, FormControlLabel, FormLabel } from "@mui/material";
import { Controller } from "react-hook-form";

interface IProps {
  name: string;
  control: any;
  id?: string;
  label?: string;
  items?: Array<{
    value: string;
    label: string;
  }>;
}

export default function CustomRadio(props: IProps) {
  const { name, control, id, label, items } = props;

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <>
              <FormLabel id={id}>{label}</FormLabel>
              <RadioGroup aria-labelledby={id} {...field}>
                {items &&
                  items.map((item) => {
                    return (
                      <FormControlLabel
                        key={item.value}
                        control={<Radio value={item.value} />}
                        label={item.label}
                      ></FormControlLabel>
                    );
                  })}
              </RadioGroup>
            </>
          );
        }}
      ></Controller>
    </>
  );
}
