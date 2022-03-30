import * as yup from "yup";
import styled from "@emotion/styled";
import { Button, Card, useTheme } from "@mui/material";
import CustomTextInput from "../common/components/CustomTextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAppContextHook } from "../modules/app/hook";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import { fetch } from "../common/utils/fetch";
import { useEffect, useState } from "react";

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
  const appContext = useAppContextHook();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [isHidePage, setIsHidePage] = useState<boolean>(true);

  const { control, handleSubmit } = useForm<IFormValue>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormValue) => {
    try {
      const rs = await fetch("GET", `/users?username=${data.username}&password=${data.password}`);
      if (rs && rs.data.length === 1) {
        appContext.setIsLogin(true);
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("accessToken", "fake accessToken");
        enqueueSnackbar("Login success", { variant: "success" });
        history.push("/");
      } else {
        enqueueSnackbar("username or password not match", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Login fail");
    }
  };

  useEffect(() => {
    if (appContext.isLogin) {
      return history.push("/");
    }

    return setIsHidePage(false);
  }, []);

  if (isHidePage) {
    return null;
  }

  return (
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
  );
}

export default LoginPage;
