import * as yup from "yup";
import { Button, Card, useTheme } from "@mui/material";
import { WrapLoginPageStyle } from "../components/WrapLoginPageStyle";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import useLogin from "../../../common/hooks/useLogin";
import Loading from "../../../common/components/Loading";
import CustomTextInput from "../../../common/components/CustomTextInput";

interface IFormValue {
  username: string;
  password: string;
}

const schema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

function LoginPage() {
  const theme = useTheme();
  const { isLoading, handleLogin } = useLogin();

  const methods = useForm<IFormValue>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormValue) => {
    handleLogin(data.username, data.password);
  };

  return (
    <>
      {isLoading ? <Loading></Loading> : null}
      <WrapLoginPageStyle theme={theme.palette.mode}>
        <div className="wrap-form-login">
          <Card>
            <div className="form-login">
              <h2 className="form-login__title">Form Login</h2>
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                  <div className="form-login__form-item">
                    <CustomTextInput
                      muiProps={{ className: "form-login__input" }}
                      name="username"
                      label="Username"
                    ></CustomTextInput>
                  </div>
                  <div className="form-login__form-item">
                    <CustomTextInput
                      muiProps={{ className: "form-login__input", type: "password" }}
                      name="password"
                      label="Password"
                    ></CustomTextInput>
                  </div>
                  <div className="form-login__form-item">
                    <Button className="form-login__button" variant="contained" type="submit">
                      Submit form
                    </Button>
                  </div>
                </form>
              </FormProvider>
            </div>
          </Card>
        </div>
      </WrapLoginPageStyle>
    </>
  );
}

export default LoginPage;
