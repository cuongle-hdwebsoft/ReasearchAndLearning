import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { unstable_batchedUpdates } from "react-dom";
import useAuthContext from "../hooks/useAuthContext";

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
          console.log(123);
        });
      } catch (error) {
        console.log(error);
        setIsLogin(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <div>You dont have permission to view this </div>;
  }

  if (isLoading && !isLogin) {
    router.push("/login");
  }

  return props.children;
}
