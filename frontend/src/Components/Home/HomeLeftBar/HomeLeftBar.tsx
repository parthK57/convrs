import { BsThreeDotsVertical } from "react-icons/bs";
import { friendsObj } from "../../../TS Modals/Friends";
import ChatHead from "./ChatHead";
import { useEffect, useState } from "react";
import axios from "axios";
import { groupObj } from "../../../TS Modals/Groups";
import GroupChatHead from "./GroupChatHead";
import { io } from "socket.io-client";
import ChatsMenu from "./ChatsMenu";
import { useDispatch, useSelector } from "react-redux";
import { setChatMenu } from "../../../slices/ChatMenuState";
import AddUserModal from "../Modals/AddUserModal";
import RemoveUserModal from "../Modals/RemoveUserModal";
import CreateGroupModal from "../Modals/CreateGroupModal";
import AddMemberModal from "../Modals/AddMemberModal";
import RemoveMemberMoal from "../Modals/RemoveMemberModal";

export const socket = io("http://localhost:4000");
const HomeLeftBar = () => {
  const [friendsData, setFriendsData] = useState(Array<friendsObj>);
  const [groupsData, setGroupsData] = useState(Array<groupObj>);
  const dispatch = useDispatch();

  // CHAT MENU & MODAL TOGGLE STATES
  const chatMenuState = useSelector(
    (state: any) => state.chatMenuState.value.isActive
  ) as boolean;
  const addUserModalState = useSelector(
    (state: any) => state.modalToggler.value.AddUserModal
  ) as boolean;
  const removeUserModalState = useSelector(
    (state: any) => state.modalToggler.value.RemoveUserModal
  ) as boolean;
  const createGroupModalState = useSelector(
    (state: any) => state.modalToggler.value.CreateGroupModal
  ) as boolean;
  const addMemberModalState = useSelector(
    (state: any) => state.modalToggler.value.AddMemeberModal
  ) as boolean;
  const removeMemberModalState = useSelector(
    (state: any) => state.modalToggler.value.RemoveMemberModal
  ) as boolean;

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

  // Chat Menu Toggle
  const toggleChatMenu = () => {
    dispatch(setChatMenu({ isActive: !chatMenuState }));
  };

  return (
    <>
      <div className="flex flex-col w-[20%] h-[90%] bg-zinc-50 shadow-md rounded-tl-[25px] rounded-bl-[25px] overflow-hidden">
        <div id="User Info Container" className="flex flex-col">
          <div className="flex relative justify-between items-center h-20 rounded-tl-[25px] p-3 text-3xl bg-zinc-100 border-b border-zinc-300">
            <span>Chats</span>
            <span>
              <BsThreeDotsVertical
                onClick={toggleChatMenu}
                className="pointer-events-auto cursor-pointer"
              />
              <ChatsMenu />
            </span>
          </div>
        </div>
        <div
          id="Chats-Container"
          className="flex flex-col gap-0 border-zinc-50 h-[inherit] overflow-y-scroll"
        >
          {friendsData == null
            ? null
            : friendsData.map((val: friendsObj) => {
                socket.emit("join-room", { room: val.room });
                return <ChatHead username={val.username} room={val.room} />;
              })}
          {groupsData == null
            ? null
            : groupsData.map((val: groupObj) => {
                socket.emit("join-room", { room: val.room });
                return (
                  <GroupChatHead groupname={val.groupname} room={val.room} />
                );
              })}
        </div>
      </div>
      {addUserModalState ? <AddUserModal /> : null}
      {removeUserModalState ? <RemoveUserModal /> : null}
      {createGroupModalState ? <CreateGroupModal /> : null}
      {addMemberModalState ? <AddMemberModal /> : null}
      {removeMemberModalState ? <RemoveMemberMoal /> : null}
    </>
  );
};

export default HomeLeftBar;
