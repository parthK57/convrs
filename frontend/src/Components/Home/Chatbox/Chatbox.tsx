import { useState } from "react";
import ClientChat from "./ClientChat";
import UserChat from "./UserChat";
import axios from "axios";
import { useSelector } from "react-redux";
import { activeChatDetails } from "../Modals/Chatbox";

const Chatbox = () => {
  const USERNAME = localStorage.getItem("username");
  const [message, setMessage] = useState("");
  const messages: any = useSelector((state: any) => state.messages.value);
  const activeChatDetails: activeChatDetails = useSelector(
    (state: any) => state.activeChat.value
  );
  console.log("ActiveChat", activeChatDetails);
  console.log("MessageDetails", messages);

  const sendMessage = () => {
    try {
      const response = axios.post("");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col w-[45%] h-[90%] justify-between bg-[#f3f3f3] shadow-md rounded-tr-[25px] rounded-br-[25px]">
        <div className="flex items-center justify-between px-5 py-2 text-2xl border-b border-black">
          <span>{activeChatDetails.chatTitle}</span>
        </div>
        <div
          id="messages-container"
          className="flex flex-col gap-4 p-5 h-[inherit] overflow-y-scroll"
        >
          {messages.length == 0 || messages[0].username == ""
            ? null
            : messages.map((value: any) => {
                if (value.username === USERNAME)
                  return <UserChat message={value.message} />;
                else return <ClientChat message={value.message} />;
              })}
        </div>
        <div className="flex flex-col h-[80px] px-2 py-2 items-center justify-center border-t border-zinc-400">
          <div className="bg-zinc-100 w-full px-5 py-2 flex justify-between gap-4 rounded-full">
            <input
              type="text"
              className="px-3 py-1 w-[86%] rounded-full outline-none"
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="submit"
              className="btn px-3 py-1 bg-[#311B92] text-white hover:bg-[#512DA8] rounded-md"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbox;
