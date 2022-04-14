import { Button } from "@mui/material";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomTextInput from "../../../common/components/CustomTextInput";
import useLogin, { IFormState } from "../hooks/useLogin";

const schema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

export default function Login() {
  const methods = useForm<IFormState>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const { handleLogin } = useLogin();

  return (
    <div>
      <div>
        <h1 style={{ textAlign: "center" }}>Login form</h1>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleLogin)}
            style={{ width: 500, margin: "auto" }}
          >
            <div className="form-item">
              <CustomTextInput
                label="Username"
                name="username"
                key={"username"}
                muiProps={{ style: { width: 500 }, autoComplete: "off" }}
              ></CustomTextInput>
            </div>
            <div className="form-item">
              <CustomTextInput
                label="Password"
                name="password"
                key={"password"}
                muiProps={{
                  type: "password",
                  style: { width: 500 },
                }}
              ></CustomTextInput>
            </div>
            <Button type="submit" style={{ width: "100%" }} variant="contained">
              Login
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
