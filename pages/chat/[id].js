import Head from "next/head";
import React from "react";
import Sidebar from "../../components/Sidebar";
import ChatScreen from "../../components/ChatScreen";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import getRecipientEmail from "../../utils/getRecipientEmail";

const Chat = ({ messages, chat }) => {
  const [user] = useAuthState(auth);
  return (
    <div className="flex">
      <Head>
        <title>chat with {getRecipientEmail(chat.users, user)}</title>
      </Head>
      <Sidebar />
      <div className=" flex-1 overflow-scroll h-screen scrollbar-hide">
        <ChatScreen chat={chat} messages={messages} />
      </div>
    </div>
  );
};

export default Chat;

export async function getServerSideProps(context) {
  const ref = doc(db, "chats", context.query.id);
  const messagesRef = collection(ref, "messages");
  const q = query(messagesRef, orderBy("timestamp", "asc"));
  const messagesRes = await getDocs(q);

  const messages = messagesRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));
  const chatRes = await getDoc(ref);
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}
