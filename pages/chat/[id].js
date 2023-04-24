import Head from "next/head";
import React from "react";
import Sidebar from "../../components/Sidebar";
import ChatScreen from "../../components/ChatScreen";

const Chat = () => {
  return (
    <div className="flex">
      <Head>
        <title>Chat</title>
      </Head>
      <Sidebar />
      <div className=" flex-1 overflow-scroll h-screen scrollbar-hide">
        <ChatScreen />
      </div>
    </div>
  );
};

export default Chat;
