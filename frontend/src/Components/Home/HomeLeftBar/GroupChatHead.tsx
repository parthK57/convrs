import { useDispatch } from "react-redux";
import { populateActiveChat } from "../../../slices/ActiveChat";
import axios from "axios";
import { populateMessages } from "../../../slices/Messages";

interface GroupChatHeadPropsDtype {
  groupname: string;
  room: string;
}

const GroupChatHead = ({ groupname, room }: GroupChatHeadPropsDtype) => {
  const distpatch = useDispatch();

  // SETTING ACTIVE CHAT DETAILS
  async function getMessages() {
    try {
      const { data } = await axios({
        method: "get",
        url: "http://localhost:4000/groups/messages/get",
        headers: {
          "convrs-test-key": sessionStorage.getItem("convrs-test-key"),
          email: localStorage.getItem("email"),
          password: localStorage.getItem("password"),
          room: room,
        },
      });
      distpatch(populateMessages(data));
      distpatch(populateActiveChat({ chatTitle: groupname, room: room }));
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
        <span>{groupname}</span>
      </div>
    </>
  );
};

export default GroupChatHead;