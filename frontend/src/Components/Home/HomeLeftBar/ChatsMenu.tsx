import { useDispatch, useSelector } from "react-redux";
import {
  setAddMemberModal,
  setAddUserModal,
  setCreateGroupModal,
  setRemoveMemberModal,
  setRemoveUserModal,
} from "../../../slices/ModalToggler";

const ChatsMenu = () => {
  const dispatch = useDispatch();
  const chatMenuState = useSelector(
    (state: any) => state.chatMenuState.value.isActive
  ) as boolean;

  return (
    <>
      <div
        className={
          chatMenuState
            ? `flex flex-col absolute text-lg right-0 w-[200px] h-auto bg-zinc-50 border border-zinc-200 transition translate-x-0 ease-in-out`
            : `hidden`
        }
      >
        <div
          onClick={() => dispatch(setAddUserModal(true))}
          className="pointer-events-auto cursor-pointer flex h-12 px-4 py-1 items-center border-b border-zinc-300 hover:bg-white transition ease-in-out"
        >
          <span>Add Friend</span>
        </div>
        <div
          onClick={() => dispatch(setRemoveUserModal(true))}
          className="pointer-events-auto cursor-pointer flex h-12 px-4 py-1 items-center border-b border-zinc-300 hover:bg-white transition ease-in-out"
        >
          <span>Remove Friend</span>
        </div>
        <div
          onClick={() => dispatch(setCreateGroupModal(true))}
          className="pointer-events-auto cursor-pointer flex h-12 px-4 py-1 items-center border-b border-zinc-300 hover:bg-white transition ease-in-out"
        >
          <span>Create Group</span>
        </div>
        <div
          onClick={() => dispatch(setAddMemberModal(true))}
          className="pointer-events-auto cursor-pointer flex h-12 px-4 py-1 items-center border-b border-zinc-300 hover:bg-white transition ease-in-out"
        >
          <span>Add Member</span>
        </div>
        <div
          onClick={() => dispatch(setRemoveMemberModal(true))}
          className="pointer-events-auto cursor-pointer flex h-12 px-4 py-1 items-center border-b border-zinc-300 hover:bg-white transition ease-in-out"
        >
          <span>Remove Member</span>
        </div>
      </div>
    </>
  );
};

export default ChatsMenu;
