import { Button } from "@mui/material";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import CustomTextInput from "../common/components/CustomTextInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { setCookies } from "cookies-next";

interface IFormState {
  username: string;
  password: string;
}

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

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (values: IFormState) => {
    enqueueSnackbar(values.password, { variant: "success" });
    setCookies("isLogin", true, {
      expires: new Date(Date.now() + 86400 * 1000),
      path: "/",
      httpOnly: true,
    });
    setCookies("accessToken", "accessToken", {
      expires: new Date(Date.now() + 86400 * 1000),
      path: "/",
      httpOnly: true,
    });
  };

  return (
    <div>
      <div>
        <h1 style={{ textAlign: "center" }}>Login form</h1>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleSubmit)}
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
