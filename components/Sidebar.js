import React from "react";
import {
  UserIcon,
  EllipsisVerticalIcon,
  ChatBubbleBottomCenterTextIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import * as EmailValidator from "email-validator";
import { auth } from "../firebase";

function Sidebar() {
  const createChat = () => {
    const input = prompt(
      "please enter an email address for the user you wish to chat with"
    );

    if (!input) return null;
    if (EmailValidator.validate(input)) {
    }
  };

  return (
    <div>
      <div className="flex sticky top-0 bg-slate-100 z-10 justify-between items-center p-4 h-20 border-b-2 border-solid border-slate-200 ">
        <UserIcon
          onClick={() => auth.signOut()}
          className="h-9 cursor-pointer hover:opacity-70"
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
    </div>
  );
}

export default Sidebar;
