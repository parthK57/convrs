import { BsThreeDotsVertical } from "react-icons/bs";
import ChatHead from "./ChatHead";
import HomeLeftBarModal from "../Modals/HomeLeftBarModal";

const HomeLeftBar = () => {

  return (
    <>
      <div className="flex flex-col w-[20%] h-[90%] bg-zinc-50 shadow-md rounded-tl-[25px] rounded-bl-[25px]">
        <div id="User Info Container" className="flex flex-col">
          <div className="flex justify-between items-center h-20 rounded-tl-[25px] p-3 text-3xl bg-zinc-100 border-b border-zinc-300">
            <span>Chats</span>
            <span><BsThreeDotsVertical /></span>
            {/* <HomeLeftBarModal /> */}
          </div>
        </div>
        <div id="Chats Container" className="flex flex-col gap-0 border-zinc-50 h-[inherit] overflow-y-scroll">
            <ChatHead />
            <ChatHead />
          </div>
      </div>
    </>
  );
};

export default HomeLeftBar;
