import * as yup from "yup";
import styled from "@emotion/styled";
import { Button, Card, useTheme } from "@mui/material";
import CustomTextInput from "../common/components/CustomTextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import useLogin from "../common/hooks/useLogin";
import Loading from "../common/components/Loading";

const WrapLoginPageStyle = styled("div")`
  .wrap-form-login {
    position: absolute;
    transform: translateX(-50%);
    top: 200px;
    left: 50%;

    & .form-login {
      width: 600px;
      padding: 50px;
      border-radius: 4px;

      &__title {
        text-align: center;
        color: ${(props) => (props.theme == "light" ? "#111" : "#fff")};
      }

      &__input {
        width: 100%;
      }

      &__form-item {
        margin-bottom: 30px;
      }

      &__button {
        width: 100%;
      }
    }
  }
`;

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

  const { control, handleSubmit } = useForm<IFormValue>({
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-login__form-item">
                  <CustomTextInput
                    muiProps={{ className: "form-login__input" }}
                    name="username"
                    label="Username"
                    control={control}
                  ></CustomTextInput>
                </div>
                <div className="form-login__form-item">
                  <CustomTextInput
                    muiProps={{ className: "form-login__input", type: "password" }}
                    name="password"
                    label="Password"
                    control={control}
                  ></CustomTextInput>
                </div>
                <div className="form-login__form-item">
                  <Button className="form-login__button" variant="contained" type="submit">
                    Submit form
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      </WrapLoginPageStyle>
    </>
  );
}

export default LoginPage;
