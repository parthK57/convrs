import { useEffect, useState } from "react";
import ClientChat from "./ClientChat";
import UserChat from "./UserChat";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  activeChatDetails,
  messages,
  messagesArray,
  socketIoMessage,
} from "../../../TS Modals/Chatbox";
import { populateMessages } from "../../../slices/Messages";
import { socket } from "../HomeLeftBar/HomeLeftBar";
import { populateNewMessages } from "../../../slices/NewMessages";

const Chatbox = () => {
  const USERNAME = localStorage.getItem("username") as string;
  const distpatch = useDispatch();
  const [message, setMessage] = useState("");
  const messages: messagesArray = useSelector(
    (state: any) => state.messages.value
  );
  const groupChatState = useSelector(
    (state: any) => state.groupChatMode.value.isActive
  );
  const activeChatDetails: activeChatDetails = useSelector(
    (state: any) => state.activeChat.value
  );
  const newMessages = useSelector((state: any) => state.newMessages.value);
  useEffect(() => {
    socket.on("receive-message", (data: Array<socketIoMessage>) => {
      distpatch(populateNewMessages(data));
      // console.log(data);
    });
  }, [socket]);

  const sendMessage = async () => {
    const inputTag = document.querySelector("input") as HTMLInputElement;
    inputTag.value = "";
    try {
      const { status } = await axios({
        method: "post",
        url: "http://localhost:4000/messages/send",
        headers: {
          "convrs-test-key": "11223344",
          email: localStorage.getItem("email"),
          password: localStorage.getItem("password"),
        },
        data: {
          username: USERNAME,
          message: message,
          room: activeChatDetails.room,
        },
      });
      if (status === 200) {
        const { data } = await axios({
          method: "get",
          url: "http://localhost:4000/messages/get",
          headers: {
            "convrs-test-key": sessionStorage.getItem("convrs-test-key"),
            email: localStorage.getItem("email"),
            password: localStorage.getItem("password"),
            room: activeChatDetails.room,
          },
        });
        distpatch(populateMessages(data));
        socket.emit("private-message", {
          username: USERNAME,
          room: activeChatDetails.room,
          message: message,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendGroupMessage = async () => {
    const inputTag = document.querySelector("input") as HTMLInputElement;
    inputTag.value = "";
    try {
      const { status } = await axios({
        method: "post",
        url: "http://localhost:4000/groups/messages/send",
        headers: {
          "convrs-test-key": "11223344",
          email: localStorage.getItem("email"),
          password: localStorage.getItem("password"),
        },
        data: {
          room: activeChatDetails.room,
          message: message,
        },
      });
      if (status == 200) {
        const { data } = await axios({
          method: "get",
          url: "http://localhost:4000/groups/messages/get",
          headers: {
            "convrs-test-key": sessionStorage.getItem("convrs-test-key"),
            email: localStorage.getItem("email"),
            password: localStorage.getItem("password"),
            room: activeChatDetails.room,
          },
        });
        distpatch(populateMessages(data));
        socket.emit("private-message", {
          username: USERNAME,
          room: activeChatDetails.room,
          message: message,
        });
      }
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
            : messages.map((value: messages) => {
                if (value.username === USERNAME)
                  return <UserChat message={value.message} username="You" />;
                else
                  return (
                    <ClientChat
                      message={value.message}
                      username={value.username}
                    />
                  );
              })}
          {newMessages.length == 0 || newMessages[0].username == ""
            ? null
            : newMessages.map((value: socketIoMessage) => {
                if (value.username === USERNAME) return null;
                else
                  return (
                    <ClientChat
                      message={value.message}
                      username={value.username}
                    />
                  );
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
              onClick={groupChatState ? sendGroupMessage : sendMessage}
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
