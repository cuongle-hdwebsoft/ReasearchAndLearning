import React, { useContext } from "react";
import { Affix, Avatar, Layout, Menu, message } from "antd";
import { useHistory } from "react-router-dom";
import logo from "../../logo.svg";
import { AppContext } from "../context/context";

import vn from "../../common/images/vn.png";
import uk from "../../common/images/uk.png";

const { Header, Content } = Layout;

interface IMainLayout {
  children?: React.ReactNode;
}

function MainLayout(props: IMainLayout) {
  const history = useHistory();
  const appContext = useContext(AppContext);
  const { handleSetLang } = appContext;

  const handleSelectMenu = (value: any) => {
    if (value.key !== "/logout") {
      console.log(value.key);
      history.push(value.key);
    } else {
      appContext.setIsLogin(false);
      localStorage.clear();
    }
  };

  const handleClickChangeLang = () => {
    handleSetLang();
    message.success("Change lang success", 1);
  };

  console.log(appContext, history);

  return (
    <Layout className="layout">
      <Header style={{ backgroundColor: "#fff" }}>
        <div className="logo" />
        <Menu
          style={{ display: "flex", width: "100%" }}
          onClick={handleSelectMenu}
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["/"]}
        >
          <Menu.Item key="/logo">
            <img style={{ width: 50, height: 50 }} src={logo} alt="" />
          </Menu.Item>
          <Menu.Item key="/">Homepage</Menu.Item>
          {appContext.isLogin ? (
            <Menu.Item style={{ marginLeft: "auto" }} key="/logout">
              Logout
            </Menu.Item>
          ) : (
            <Menu.Item style={{ marginLeft: "auto" }} key="/login">
              Login
            </Menu.Item>
          )}
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px", backgroundColor: "#fff" }}>
        <div className="site-layout-content container">{props.children}</div>
      </Content>
      <Affix style={{ right: 50, position: "absolute", bottom: 50 }} offsetBottom={10}>
        <div onClick={handleClickChangeLang}>
          <Avatar size={"large"} src={appContext.lang === "vi-VN" ? vn : uk} />
        </div>
      </Affix>
    </Layout>
  );
}

export default MainLayout;
