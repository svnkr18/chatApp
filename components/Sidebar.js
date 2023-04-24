import React from "react";
import {
  UserIcon,
  EllipsisVerticalIcon,
  ChatBubbleBottomCenterTextIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import { collection, addDoc, query, where } from "firebase/firestore";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "./Chat";
import Image from "next/image";

function Sidebar() {
  const [user] = useAuthState(auth);
  const userChatRef = query(
    collection(db, "chats"),
    where("users", "array-contains", user.email)
  );
  // db
  // .collection("chats")
  // .where("users", "array-contains", user.email);
  const [chatsSnapshot] = useCollection(userChatRef);

  const createChat = () => {
    const input = prompt(
      "please enter an email address for the user you wish to chat with"
    );

    if (!input) return null;
    if (
      EmailValidator.validate(input) &&
      !chatExists(input) &&
      input !== user.email
    ) {
      addDoc(collection(db, "chats"), {
        //we add the chat into the DB "chats" collection if it doesnt already exist and is valid and is not same as login email
        users: [user.email, input],
      });
      // db.collection("chats").add({
      //   users: [user.email, input],
      // });
    }
  };

  const chatExists = (recipientEmail) =>
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );

  return (
    <div>
      <div className="flex sticky top-0 bg-slate-100 z-10 justify-between items-center p-4 h-20 border-b-2 border-solid border-slate-200 ">
        {/* <UserIcon
          onClick={() => auth.signOut()}
          className="h-9 cursor-pointer hover:opacity-70"
        /> */}
        <Image
          src={user.photoURL}
          alt=""
          height={45}
          width={45}
          className="rounded-full"
        />
        <div className="flex space-x-8  cursor-pointer transition-all duration-200 ">
          <ChatBubbleBottomCenterTextIcon
            onClick={createChat}
            className="h-9"
          />
          <EllipsisVerticalIcon className="h-9" />
        </div>
      </div>
      <div className="flex items-center p-5  rounded-lg gap-5 bg-slate-300">
        <MagnifyingGlassIcon className="h-7 " />
        <input
          className=" border-none outline-none flex-1 bg-slate-300 text-stone-50
          "
          placeholder="search in chats"
        />
      </div>
      <button></button>
      {/* list of chats */}
      {chatsSnapshot?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </div>
  );
}

export default Sidebar;
