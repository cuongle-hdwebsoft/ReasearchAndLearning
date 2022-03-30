import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { Suspense, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { SnackbarProvider, useSnackbar } from "notistack";

import { AppContext } from "./common/context/app";
import MainLayout from "./common/hocs/MainLayout";

import { store } from "./modules";
import AuthRoutes from "./common/hocs/AuthRoutes";

import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import CategoryListPage from "./pages/CategoryListPage";
import ProductListPage from "./pages/ProductListPage";
import ProductItemPage from "./pages/ProductItemPage";
import NotFound from "./pages/NotFound";

// const CategoryListPage = React.lazy(() => import("./pages/CategoryListPage"));
// const DashboardPage = React.lazy(() => import("./pages/DashboardPage"));
// const NotFound = React.lazy(() => import("./pages/NotFound"));
// const ProductListPage = React.lazy(() => import("./pages/ProductListPage"));
// const LoginPage = React.lazy(() => import("./pages/LoginPage"));
// const ProductItemPage = React.lazy(() => import("./pages/ProductItemPage"));

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
          <SnackbarProvider
            maxSnack={5}
            autoHideDuration={1000}
            anchorOrigin={{ horizontal: "center", vertical: "top" }}
          >
            <BrowserRouter>
              <Suspense fallback={<div></div>}>
                <Switch>
                  <AuthRoutes path="/">
                    <Route path="/" exact={true}>
                      <MainLayout>
                        <DashboardPage></DashboardPage>
                      </MainLayout>
                    </Route>
                    <Route path="/login" exact={true}>
                      <LoginPage></LoginPage>
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
                    <Route path="/products/:id" exact={true}>
                      <MainLayout>
                        <ProductItemPage></ProductItemPage>
                      </MainLayout>
                    </Route>
                    <Route path="*">
                      <NotFound></NotFound>
                    </Route>
                  </AuthRoutes>
                </Switch>
              </Suspense>
            </BrowserRouter>
          </SnackbarProvider>
        </ThemeProvider>
      </AppContext.Provider>
    </Provider>
  );
}

export default App;
