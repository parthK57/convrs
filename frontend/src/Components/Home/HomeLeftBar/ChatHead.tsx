import { useDispatch, useSelector } from "react-redux";
import {
  populateActiveChat,
} from "../../../slices/ActiveChat";
import axios from "axios";
import { clearMessages, populateMessages } from "../../../slices/Messages";
import { setGroupChatMode } from "../../../slices/GroupChatMode";
import { clearNewMessages, populateNewMessages } from "../../../slices/NewMessages";

interface ChatHeadPropsDtype {
  username: string;
  room: string;
}

const ChatHead = ({ username, room }: ChatHeadPropsDtype) => {
  const distpatch = useDispatch();
  // SETTING ACTIVE CHAT DETAILS
  async function getMessages() {
    distpatch(populateNewMessages([]));
    distpatch(clearMessages());
    try {
      const { data } = await axios({
        method: "get",
        url: "http://localhost:4000/messages/get",
        headers: {
          "convrs-test-key": localStorage.getItem("convrs-test-key"),
          email: localStorage.getItem("email"),
          password: localStorage.getItem("password"),
          room: room,
        },
      });
      distpatch(populateMessages(data));
      distpatch(populateActiveChat({ chatTitle: username, room: room }));
      distpatch(setGroupChatMode({ isActive: false }));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div
        onClick={getMessages}
        className="pointer-events-auto cursor-pointer flex h-16 px-2 py-5 items-center border-b border-zinc-300 hover:bg-white transition ease-in-out"
      >
        <span>{username}</span>
      </div>
    </>
  );
};

export default ChatHead;
