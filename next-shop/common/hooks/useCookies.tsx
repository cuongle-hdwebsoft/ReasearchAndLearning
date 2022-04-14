import Cookies from "cookies-next";

export default function useCookie(key: string) {
  return Cookies.getCookie(key);
}
