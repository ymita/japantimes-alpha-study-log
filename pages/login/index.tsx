import { useEffect, useState } from "react";
import { auth } from "../../utils/firebase/init";
import {
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
  User,
} from "firebase/auth";

export default function Index() {
  const [user, setUser] = useState<User | null>(null);
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
          setUser(user);
        }
      })
      .catch((error) => {
        setUser(null);
        console.error("error", error);
      });
  }, []);
  const checkLogint = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user", user);
      } else {
        setUser(null);
        console.log("signed out");
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
      <h3>Google でログイン</h3>
      <div>
        <button onClick={() => login()}>Login</button>
        <button onClick={() => logout()}>Logout</button>
      </div>
      <div>{user !== null ? user?.displayName : "ログインしていません。"}</div>
    </div>
  );
}
