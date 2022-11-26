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
  const provider = new GoogleAuthProvider();
  const { user } = useAuthContext();
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
          router.push("/user");
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
        router.push("/user");
      } else {
        console.log("signed out");
      }
    });
  };
  checkLogint();
  
  return (
    <div>
      <h3>Google ログイン</h3>
      <div>
        <button onClick={() => login()}>Login</button>
      </div>
      <div>{user !== null ? user?.displayName : "ログインしていません。"}</div>
      <div>ログイン状態 {user ? "ログイン中" : "未ログイン"}</div>
    </div>
  );
}
