import { useContext, useEffect, useState } from "react";
import { auth } from "../../utils/firebase/init";
import {
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { useAuthContext } from "../../utils/firebase/AuthProvider";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();
  const { user } = useAuthContext();
  
  const provider = new GoogleAuthProvider();
  const login = () => {
    signInWithRedirect(auth, provider);
  };
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        console.log(result);
        if (result !== null) {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential?.accessToken;
          console.log("token", token);

          const user = result.user;
          console.log("user", user);
        }
      })
      .catch((error) => {
        console.error("error", error);
      });
  }, []);
  const checkLogint = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user", user);
      } else {
        console.log("signed out");
        router.push("/login");
      }
    });
  };
  checkLogint();
  const logout = async () => {
    signOut(auth)
      .then(() => {
        console.log("ログアウトしました");
      })
      .catch((error) => {
        console.log(`ログアウト時にエラーが発生しました (${error})`);
      });
  };
  return (
    <div>
      <h3>ログインユーザー</h3>
      <div>{user !== null ? user?.displayName : "ログインしていません。"}</div>
      <div>
        <button onClick={() => logout()}>Logout</button>
      </div>
    </div>
  );
}
