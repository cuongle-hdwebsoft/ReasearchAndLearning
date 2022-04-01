import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import vi from "./vi.json";

i18next.use(initReactI18next).init({
  lng: "en",
  debug: false,
  resources: {
    en,
    vi,
  },
});
