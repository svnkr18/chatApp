import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const Message = ({ user, message }) => {
  const [userLoggedIn] = useAuthState(auth);
  return (
    <div>
      {user === userLoggedIn.email ? (
        <p className=" w-max p-3 rounded-lg m-3  pb-5 relative text-right ml-auto bg-slate-100  min-w-60  rounded-tr-none">
          {message.message}
        </p>
      ) : (
        <p className=" w-max p-3 rounded-lg m-3  pb-5 relative text-left ml-auto bg-blue-300  min-w-60  rounded-tl-none">
          {message.message}
        </p>
      )}
    </div>
  );
};

export default Message;
