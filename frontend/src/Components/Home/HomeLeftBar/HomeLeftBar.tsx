import { BsThreeDotsVertical } from "react-icons/bs";
import HomeLeftBarModal from "../Modals/HomeLeftBarModal";
import { friendsObj } from "../Modals/Friends";
import ChatHead from "./ChatHead";
import { useEffect, useState } from "react";
import axios from "axios";
import { groupObj } from "../Modals/Groups";
import GroupChatHead from "./GroupChatHead";
import { io } from "socket.io-client";

export const socket = io("http://localhost:4000");
const HomeLeftBar = () => {
  const [friendsData, setFriendsData] = useState(Array<friendsObj>);
  const [groupsData, setGroupsData] = useState(Array<groupObj>);
  useEffect(()=>{
    socket.on("response", (data) => console.log(data));
  },[socket])
  // GETTING FRIENDS DATA
  async function getData() {
    const { data } = await axios({
      method: "get",
      url: "http://localhost:4000/friends/get",
      headers: {
        email: localStorage.getItem("email"),
        password: localStorage.getItem("password"),
        "convrs-test-key": "11223344",
      },
    });
    setFriendsData(data);
    const response = await axios({
      method: "get",
      url: "http://localhost:4000/groups/get",
      headers: {
        email: localStorage.getItem("email"),
        password: localStorage.getItem("password"),
        "convrs-test-key": "11223344",
      },
    });
    setGroupsData(response.data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="flex flex-col w-[20%] h-[90%] bg-zinc-50 shadow-md rounded-tl-[25px] rounded-bl-[25px]">
        <div id="User Info Container" className="flex flex-col">
          <div className="flex justify-between items-center h-20 rounded-tl-[25px] p-3 text-3xl bg-zinc-100 border-b border-zinc-300">
            <span>Chats</span>
            <span>
              <BsThreeDotsVertical />
            </span>
            {/* <HomeLeftBarModal /> */}
          </div>
        </div>
        <div
          id="Chats-Container"
          className="flex flex-col gap-0 border-zinc-50 h-[inherit] overflow-y-scroll"
        >
          {friendsData == null
            ? null
            : friendsData.map((val: friendsObj) => {
                socket.emit("join-room", ({ room: val.room }));
                return <ChatHead username={val.username} room={val.room} />;
              })}
          {groupsData == null
            ? null
            : groupsData.map((val: groupObj) => {
                socket.emit("join-room", ({ room: val.room }));
                return (
                  <GroupChatHead groupname={val.groupname} room={val.room} />
                );
              })}
        </div>
      </div>
    </>
  );
};

export default HomeLeftBar;
