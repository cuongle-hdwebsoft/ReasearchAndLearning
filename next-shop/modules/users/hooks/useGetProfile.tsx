import { useQuery } from "react-query";
import { getCookie } from "cookies-next";
import UsersApi from "../../../services/users";

export default function useGetProfile() {
  const { data, isError } = useQuery(
    "get-me",
    function () {
      let accessToken = getCookie("accessToken") as string;

      if (!accessToken) {
        throw new Error("Missing accessToken");
      }

      return UsersApi.getMe(accessToken);
    },
    {
      retry: 3,
      refetchOnWindowFocus: false,
    }
  );

  return {
    data,
    isError,
  };
}
