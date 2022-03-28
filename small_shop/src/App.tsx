import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { AppContext } from "./common/context/app";
import MainLayout from "./common/hocs/MainLayout";

import { store } from "./modules";
import AuthRoutes from "./common/hocs/AuthRoutes";

import CategoryListPage from "./pages/CategoryListPage";
import DashboardPage from "./pages/DashboardPage";
import NotFound from "./pages/NotFound";
import ProductListPage from "./pages/ProductListPage";

import LoginPage from "./pages/LoginPage";

const defaultTheme = (themeMode: "light" | "dark") =>
  createTheme({
    palette: {
      mode: themeMode || "dark",
    },
  });

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <Provider store={store}>
      <AppContext.Provider value={{ theme, toggleTheme, isLogin, setIsLogin }}>
        <ThemeProvider theme={defaultTheme(theme)}>
          <BrowserRouter>
            <MainLayout>
              <Switch>
                <Route path="/login" component={LoginPage} exact={true} />
                <AuthRoutes path="/">
                  <Route path="/" component={DashboardPage} exact={true} />
                  <Route path="/category" component={CategoryListPage} exact={true} />
                  <Route path="/products" component={ProductListPage} exact={true} />
                  <Route path="*" component={NotFound} />
                </AuthRoutes>
              </Switch>
            </MainLayout>
          </BrowserRouter>
        </ThemeProvider>
      </AppContext.Provider>
    </Provider>
  );
}

export default App;
