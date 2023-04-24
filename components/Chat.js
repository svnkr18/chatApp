import { UserIcon } from "@heroicons/react/24/outline";
import getRecipientEmail from "../utils/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, db } from "../firebase";
import { collection, addDoc, query, where } from "firebase/firestore";

import { useCollection } from "react-firebase-hooks/firestore";
import Image from "next/image";
import { useRouter } from "next/router";

const Chat = ({ id, users }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [recipientSnapshot] = useCollection(
    query(
      collection(db, "users"),
      where("email", "==", getRecipientEmail(users, user))
    )
  );

  const enterChat = () => {
    router.push(`/chat/${id}`);
  };

  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(users, user);

  return (
    <div
      onClick={enterChat}
      className="flex items-center cursor-pointer p-2 break-words hover:bg-slate-100"
    >
      {recipient ? (
        <Image src={recipient?.photoURL} alt="" height={8} width={8} />
      ) : (
        <div className=" px-4 py-2 rounded-full bg-indigo-500 m-1 mr-3 text-white text-2xl font-bold">
          {recipientEmail[0].toUpperCase()}
        </div>
      )}
      {/* <UserIcon className=" h-8 m-1 mr-3" /> */}
      <p className=" ml-2">{recipientEmail}</p>
    </div>
  );
};

export default Chat;
