import * as yup from "yup";
import styled from "@emotion/styled";
import { Button, useTheme } from "@mui/material";
import CustomTextInput from "../common/components/CustomTextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAppContextHook } from "../modules/app/hook";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import { fetch } from "../common/utils/fetch";

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
      background-color: ${(props) => (props.theme == "light" ? "#fff" : "#111")};

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
  username: yup.string().required(),
  password: yup.string().required(),
});

function LoginPage() {
  const theme = useTheme();
  const appContext = useAppContextHook();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

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
      }
    } catch (error) {
      enqueueSnackbar("Login fail");
    }
  };

  return (
    <WrapLoginPageStyle theme={theme.palette.mode}>
      <div className="wrap-form-login">
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
              <Button className="form-login__button" variant="outlined" type="submit">
                Submit form
              </Button>
            </div>
          </form>
        </div>
      </div>
    </WrapLoginPageStyle>
  );
}

export default LoginPage;
