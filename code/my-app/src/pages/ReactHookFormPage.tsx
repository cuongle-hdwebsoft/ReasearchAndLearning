import { Button } from "antd";
import { useForm } from "react-hook-form";
import CustomInput from "../common/components/CustomForm/CustomInput";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomSelect from "../common/components/CustomForm/CustomSelect";
import CustomRadio from "../common/components/CustomForm/CustomRadio";

interface IFormInput {
  firstName: string;
  lastName: string;
  age: number;
  password: string;
  prePassword: string;
  job: string;
  gender: "male" | "female";
}

const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    age: yup.number().positive("must be a number positive").min(18).required(),
    password: yup.string().required(),
    prePassword: yup.string().oneOf([yup.ref("password")], "Two password does not match"),
  })
  .required();

export default function ReactHookFormPage() {
  const { control, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      firstName: "",
      lastName: "",
      age: 18,
      password: "",
      prePassword: "",
      job: "IT",
      gender: "male",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (values: IFormInput) => {
    console.log(values);
  };

  return (
    <div>
      <h1>ReactHookFormPage</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-item">
          <CustomInput
            muiStyle={{ label: "First name", variant: "standard", size: "small" }}
            name="firstName"
            control={control}
          ></CustomInput>
        </div>

        <div className="form-item">
          <CustomInput
            muiStyle={{ label: "Last name", variant: "standard", size: "small" }}
            name="lastName"
            control={control}
          ></CustomInput>
        </div>

        <div className="form-item">
          <CustomInput
            muiStyle={{ label: "Age", variant: "standard", size: "small", type: "number" }}
            name="age"
            control={control}
          ></CustomInput>
        </div>

        <div className="form-item">
          <CustomInput
            muiStyle={{ label: "Password", variant: "standard", size: "small", type: "password" }}
            name="password"
            control={control}
          ></CustomInput>
        </div>

        <div className="form-item">
          <CustomInput
            muiStyle={{ label: "Re-enter password", variant: "standard", size: "small", type: "password" }}
            name="prePassword"
            control={control}
          ></CustomInput>
        </div>

        <div className="form-item">
          <CustomSelect
            muiStyle={{ label: "Your job", size: "small", style: { width: "300px" } }}
            name="job"
            id="job-select"
            control={control}
            items={[
              { key: "it", label: "IT" },
              { key: "teacher", label: "Teacher" },
              { key: "student", label: "Student" },
            ]}
          ></CustomSelect>
        </div>

        <div className="form-item">
          <CustomRadio
            items={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
            ]}
            id="gender"
            label="Gender"
            name="gender"
            control={control}
          ></CustomRadio>
        </div>
        <Button htmlType="submit">submit</Button>
      </form>
    </div>
  );
}
