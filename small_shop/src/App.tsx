import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { SnackbarProvider } from "notistack";

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

  // console.log("Parent rendered");

  return (
    <Provider store={store}>
      <AppContext.Provider value={{ theme, toggleTheme, isLogin, setIsLogin }}>
        <ThemeProvider theme={defaultTheme(theme)}>
          <SnackbarProvider maxSnack={5}>
            <BrowserRouter>
              <Switch>
                <Route path="/login" exact={true}>
                  <LoginPage></LoginPage>
                </Route>
                <AuthRoutes path="/">
                  <Route path="/" exact={true}>
                    <MainLayout>
                      <DashboardPage></DashboardPage>
                    </MainLayout>
                  </Route>
                  <Route path="/category" exact={true}>
                    <MainLayout>
                      <CategoryListPage></CategoryListPage>
                    </MainLayout>
                  </Route>
                  <Route path="/products" exact={true}>
                    <MainLayout>
                      <ProductListPage></ProductListPage>
                    </MainLayout>
                  </Route>
                  <Route path="*">
                    <NotFound></NotFound>
                  </Route>
                </AuthRoutes>
              </Switch>
            </BrowserRouter>
          </SnackbarProvider>
        </ThemeProvider>
      </AppContext.Provider>
    </Provider>
  );
}

export default App;
