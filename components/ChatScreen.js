import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import {
  EllipsisVerticalIcon,
  FaceSmileIcon,
  MicrophoneIcon,
  PaperClipIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import {
  addDoc,
  collection,
  doc,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import Message from "./Message";
import getRecipientEmail from "../utils/getRecipientEmail.js";
import Image from "next/image";
import TimeAgo from "timeago-react";

const ChatScreen = ({ chat, messages }) => {
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [messagesSnapshot] = useCollection(
    // query(
    collection(doc(db, "chats", router.query.id), "messages")
    // ,

    // orderBy("timestamp", "asc")
    // )
  );

  const [recipientSnapshot] = useCollection(
    query(
      collection(db, "users"),
      where("email", "==", getRecipientEmail(chat.users, user))
    )
  );

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const ref = doc(db, "users", user.uid);
    setDoc(
      ref,
      {
        lastSeen: serverTimestamp(),
      },
      { merge: true }
    );

    const refA = doc(db, "chats", router.query.id);
    const refColl = collection(refA, "messages");
    addDoc(refColl, {
      lastSeen: serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });
    setInput("");
  };

  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(chat.users, user);

  return (
    <div>
      <div className=" sticky bg-slate-100 z-30 top-0 p-2 flex border-b border-slate-300">
        {/* <UserCircleIcon className="h-8" /> */}
        {recipient ? (
          <Image
            src={recipient?.photoURL}
            alt=""
            height={45}
            width={45}
            className="rounded-full"
          />
        ) : (
          <div className=" px-4 py-2 rounded-full bg-indigo-500 m-1 mr-3 text-white text-2xl font-bold">
            {recipientEmail[0].toUpperCase()}
          </div>
        )}
        <div className=" ml-4 flex-1">
          <h3 className=" mb-1 font-medium">{recipientEmail}</h3>
          {recipientSnapshot ? (
            <p className=" text-slate-500 text-sm">
              Last active: {""}
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
              ) : (
                "unavailable"
              )}
            </p>
          ) : (
            <p>Last active..</p>
          )}
        </div>
        <div className=" flex gap-2 items-center">
          <PaperClipIcon className="h-7" />
          <EllipsisVerticalIcon className="h-8" />
        </div>
      </div>
      <div className=" bg-indigo-200 min-h-90 p-7">{showMessages()}</div>
      <form className=" flex items-center p-3 sticky bottom-0 bg-slate-100 z-50">
        <FaceSmileIcon className="h-6" />
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className=" flex-1 outline-0 rounded-xl bg-white p-5 ml-4 mr-4"
        />
        <button
          disabled={!input}
          type="submit"
          onClick={sendMessage}
          className=" mr-4 bg-indigo-400 px-3 py-3 rounded-lg text-white disabled:hidden"
        >
          send
        </button>
        <MicrophoneIcon className="h-6" />
      </form>
    </div>
  );
};

export default ChatScreen;
