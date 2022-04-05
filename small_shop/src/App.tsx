import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { Suspense, useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { useTranslation } from "react-i18next";

import { AppContext } from "./common/context/app";
import MainLayout from "./common/hocs/MainLayout";

import { store } from "./modules";
import AuthRoutes from "./common/hocs/AuthRoutes";
import PublicUtils from "./common/hocs/PublicUtils";
import Loading from "./common/components/Loading";
import ModalProvider from "./common/components/ModalProvider";

// import DashboardPage from "./pages/DashboardPage";
// import LoginPage from "./pages/LoginPage";
// import CategoryListPage from "./pages/CategoryListPage";
// import ProductListPage from "./pages/ProductListPage";
// import ProductItemPage from "./pages/ProductItemPage";
// import NotFound from "./pages/NotFound";

const CategoryListPage = React.lazy(() => import("./modules/category/pages/CategoryListPage"));
const DashboardPage = React.lazy(() => import("./modules/app/pages/DashboardPage"));
const NotFound = React.lazy(() => import("./modules/app/pages/NotFound"));
const ProductListPage = React.lazy(() => import("./modules/products/pages/ProductListPage"));
const LoginPage = React.lazy(() => import("./modules/login/pages/LoginPage"));
const ProductItemPage = React.lazy(() => import("./modules/products/pages/ProductItemPage"));

import "./common/i18n/index";
import AuthContextProvider, { handler } from "./common/hocs/AuthContextProvider";

const defaultTheme = (themeMode: "light" | "dark") =>
  createTheme({
    palette: {
      mode: themeMode || "dark",
    },
  });

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [lang, setLang] = useState<"vi" | "en">("en");
  const { i18n } = useTranslation();

  const toggleLang = () => {
    if (lang === "vi") {
      i18n.changeLanguage("en");
      setLang("en");
    } else {
      i18n.changeLanguage("vi");
      setLang("vi");
    }
  };

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <Provider store={store}>
      <AppContext.Provider value={{ theme, toggleTheme, toggleLang, lang }}>
        <AuthContextProvider handlers={handler}>
          <ThemeProvider theme={defaultTheme(theme)}>
            <SnackbarProvider
              maxSnack={5}
              autoHideDuration={1000}
              anchorOrigin={{ horizontal: "center", vertical: "top" }}
            >
              <BrowserRouter>
                <ModalProvider>
                  <PublicUtils></PublicUtils>
                  <Suspense fallback={<Loading></Loading>}>
                    <Switch>
                      <AuthRoutes path="/" loginPage={<LoginPage></LoginPage>}>
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
                        <Route path="/products/:id" exact={true}>
                          <MainLayout>
                            <ProductItemPage></ProductItemPage>
                          </MainLayout>
                        </Route>
                        <Route path="*">
                          <MainLayout>
                            <NotFound></NotFound>
                          </MainLayout>
                        </Route>
                      </AuthRoutes>
                    </Switch>
                  </Suspense>
                </ModalProvider>
              </BrowserRouter>
            </SnackbarProvider>
          </ThemeProvider>
        </AuthContextProvider>
      </AppContext.Provider>
    </Provider>
  );
}

export default App;
