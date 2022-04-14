import { removeCookies } from "cookies-next";
import { useSnackbar } from "notistack";
import useApp from "../../../common/hooks/useApp";
import useAuthContext from "../../../common/hooks/useAuthContext";

export default function useLogout() {
  const { setUser } = useApp();
  const { setIsLogin } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = () => {
    removeCookies("accessToken", { path: "/" });
    localStorage.clear();

    setUser(null);
    setIsLogin(false);

    enqueueSnackbar("Logout successfully", { variant: "success" });

    window.location.reload();
  };

  return {
    handleLogout,
  };
}
