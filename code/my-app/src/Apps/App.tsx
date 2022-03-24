import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainLayout from "../common/hocs/MainLayout";

import { AppContext } from "../common/context/context";

import Homepage from "../pages/Homepage";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import UserPage from "../pages/UserPage";
import ComponentAndClassPage from "../pages/ComponentAndClassPage";
import UseCallbackUseMemo from "../pages/UseCallBackUseMemo";
import LoginPage from "../pages/LoginPage";
import ParamsPage from "../pages/ParamsPage";
import CourseDetailPage from "../pages/CourseDetailPage";
import AuthRoute from "../common/hocs/AuthRoute";
import PrivatePage from "../pages/PrivatePage";
import AdminPage from "../pages/admin/AdminPage";
import Dashboard from "../pages/admin/Dashboard";
import UserDashboard from "../pages/admin/UserDashboard";
import TodoDashboard from "../pages/admin/TodoDashboard";
import ConnectPage from "../pages/ConnectReduxPage";
import ConnectReduxFunc from "../pages/ConnectReduxFunc";
import SagaPage from "../pages/SagaPage";

// import store from "./redux/index";
import store from "./redux-toolkit/index";

import { Provider } from "react-redux";

function App() {
  const [theme, setTheme] = useState("light");
  const [lang, setLang] = useState("vi-VN");
  const [isLogin, setIsLogin] = useState(Boolean(localStorage.getItem("isLogin")));

  const handleSetLang = () => {
    if (lang === "vi-VN") {
      setLang("en-US");
    } else {
      setLang("vi-VN");
    }
  };

  return (
    <Provider store={store}>
      <Router>
        <AppContext.Provider
          value={{
            theme,
            lang,
            setTheme,
            handleSetLang,
            isLogin,
            setIsLogin,
          }}
        >
          <MainLayout>
            <Switch>
              <Route component={Homepage} path="/" exact={true} />
              <Route component={ComponentAndClassPage} path="/component-and-class" exact={true} />
              <Route component={UseCallbackUseMemo} path="/usecallback-usememo" exact={true} />
              <Route component={ParamsPage} path="/params-page" exact={true} />
              <Route component={CourseDetailPage} path="/course/:id" exact={true} />
              <Route component={About} path="/about" exact={true} />
              <Route component={LoginPage} path="/login" exact={true} />
              <Route component={UserPage} path="/user/:id" exact={true} />
              <AuthRoute path="/private-1" exact={true}>
                <PrivatePage></PrivatePage>
              </AuthRoute>
              <AuthRoute path="/admin">
                <Switch>
                  <Route path="/admin" exact={true}>
                    <AdminPage></AdminPage>
                  </Route>
                  <Route path="/admin/dashboard" exact={true}>
                    <Dashboard></Dashboard>
                  </Route>
                  <Route path="/admin/users" exact={true}>
                    <UserDashboard></UserDashboard>
                  </Route>
                  <Route path="/admin/todo" exact={true}>
                    <TodoDashboard></TodoDashboard>
                  </Route>
                </Switch>
              </AuthRoute>
              <Route path="/connect-page">
                <ConnectPage name="asd"></ConnectPage>
              </Route>
              <Route path="/hook-page">
                <ConnectReduxFunc></ConnectReduxFunc>
              </Route>
              <Route path="/saga-page">
                <SagaPage></SagaPage>
              </Route>
              <Route component={NotFound} path="*" />
            </Switch>
          </MainLayout>
        </AppContext.Provider>
      </Router>
    </Provider>
  );
}

export default App;
