import { User } from "firebase/auth";
import { useRouter } from "next/dist/client/router";
import { ReactNode, useEffect } from "react";
import { useAuthContext } from "./firebase/AuthProvider";

type Props = {
  children: ((user: User) => ReactNode) | ReactNode;
};

export const AuthGuard = ({ children }: Props) => {
  const user = useAuthContext().user;
  const router = useRouter();

  useEffect(() => {
    if (user === null && router.pathname !== "/login") {
      router.push("/login");
    }
  }, [user, router]);

  // 未ログインであればリダイレクトする。
  if (user === null && router.pathname !== "/login") {
    return null;
  }
  
  // ログインしていれば、URL に対応する画面をリターンする。
  return <>{children}</>;
};
