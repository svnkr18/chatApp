import Head from "next/head";
import Image from "next/image";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const signIn = () => {
    signInWithPopup(auth, provider).catch(alert);
  };

  return (
    <div className=" grid place-items-center h-screen bg-indigo-900 ">
      <Head>
        <title>Login</title>
      </Head>
      <div className="  flex flex-col">
        <Image
          src="/ChatApp_logo-removebg.png"
          alt=""
          width={200}
          height={200}
          className=" mb-3"
        />
        <button
          onClick={signIn}
          className=" bg-indigo-600 shadow-md text-slate-50 p-3 rounded-full active:bg-indigo-500"
        >
          Login With Google
        </button>
      </div>
    </div>
  );
};

export default Login;
