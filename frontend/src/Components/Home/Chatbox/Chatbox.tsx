import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import ClientChat from "./ClientChat";
import UserChat from "./UserChat";

const Chatbox = () => {
  const [chatboxMenu, setChatboxMenu] = useState(false);

  return (
    <>
      <div className="flex flex-col w-[45%] h-[90%] justify-between bg-[#f3f3f3] shadow-md rounded-tr-[25px] rounded-br-[25px]">
        <div className="flex items-center justify-between px-5 py-2 text-2xl border-b border-black">
          <span >Parth Kolgiri</span>
          <span
            onClick={() => setChatboxMenu(!chatboxMenu)}
            className="pointer-events-auto cursor-pointer"
          >
            <BsThreeDotsVertical />
          </span>
        </div>
        <div className= "flex flex-col gap-4 p-5 h-[inherit] overflow-y-scroll">
          <ClientChat />
          <UserChat />
          <ClientChat />
          <UserChat />
          <ClientChat />
          <UserChat />
          <ClientChat />
          <UserChat />
          <ClientChat />
          <UserChat />
        </div>
        <div className="flex flex-col h-[80px] px-2 py-2 items-center justify-center border-t border-zinc-400">
          <div className="bg-zinc-100 w-full px-5 py-2 flex justify-between gap-4 rounded-full">
            <input type="text" className="px-3 py-1 w-[86%] rounded-full outline-none"/>
            <button type="submit" className="btn px-3 py-1 bg-[#311B92] text-white hover:bg-[#512DA8] rounded-md">Send</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbox;