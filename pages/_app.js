import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

import Login from "./login";
import Loading from "../components/Loading";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      const docData = {
        email: user.email,
        lastSeen: serverTimestamp(),
        photoURL: user.photoURL,
      };
      setDoc(doc(db, "users", user.uid), docData, { merge: true });
      // db.collection("users").doc(user.uid).set(
      //   {
      //     email: user.email,
      //     lastSeen: firebase.firestore.fieldValue.serverTimestamp(),
      //     photoURL: user.photoURL,
      //   },
      //   {
      //     merge: true,
      //   }
      // );
    }
  }, [user]);

  if (loading) return <Loading />;

  if (!user) return <Login />;

  return <Component {...pageProps} />;
}

export default MyApp;
