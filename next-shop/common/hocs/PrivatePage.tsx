import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { unstable_batchedUpdates } from "react-dom";
import useAuthContext from "../hooks/useAuthContext";
import NotPermission from "../pages/NotPermission";

interface IProps {
  children: JSX.Element;
}

export default function PrivatePage(props: IProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { getMe, setIsLogin, isLogin } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);
        await getMe();
        unstable_batchedUpdates(() => {
          setIsLogin(true);
          setIsLoading(false);
        });
      } catch (error) {
        setIsLogin(false);
        setIsLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return null;
  }

  if (!isLoading && !isLogin) {
    return <NotPermission></NotPermission>;
  }

  return props.children;
}
