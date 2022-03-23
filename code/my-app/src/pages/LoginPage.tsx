import { Form, Input, Button, notification } from "antd";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../common/context/context";
import loginImage from "../common/images/login.png";

interface IForm {
  username: string;
  password: string;
}

export default function LoginPage() {
  const appContext = useContext(AppContext);
  const history = useHistory();

  const handleSubmit = (values: IForm) => {
    if (values.username === "admin" && values.password === "admin") {
      appContext.setIsLogin(true);
      localStorage.setItem("isLogin", "true");
      notification.success({
        message: "Login success",
      });

      history.push("/");
    }
  };

  return (
    <div>
      <div className="d-flex flex-col justify-center align-items-center ">
        <div>
          <img style={{ height: 300 }} src={loginImage} alt="" />
        </div>
        <div style={{ width: 400 }}>
          <Form onFinish={handleSubmit} style={{ width: "100%" }} autoComplete="off">
            <h2>Login Form</h2>
            <Form.Item label="Username" name="username" rules={[{ required: true, message: "Please enter username" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter password" }]}>
              <Input.Password />
            </Form.Item>
            <Button htmlType="submit" type="primary" style={{ width: "100%" }}>
              Login
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
