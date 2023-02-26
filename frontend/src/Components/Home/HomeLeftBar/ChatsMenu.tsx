import { useSelector } from "react-redux";

const ChatsMenu = () => {
  const chatMenuState: boolean = useSelector(
    (state: any) => state.chatMenuState.value.isActive
  );
  return (
    <>
      <div
        className={
          chatMenuState
            ? `flex flex-col absolute text-lg right-0 w-[200px] h-auto bg-zinc-50 border border-zinc-200 transition translate-x-0 ease-in-out`
            : `hidden`
        }
      >
        <div className="pointer-events-auto cursor-pointer flex h-12 px-4 py-1 items-center border-b border-zinc-300 hover:bg-white transition ease-in-out">
          <span>Add User</span>
        </div>
        <div className="pointer-events-auto cursor-pointer flex h-12 px-4 py-1 items-center border-b border-zinc-300 hover:bg-white transition ease-in-out">
          <span>Remove User</span>
        </div>
        <div className="pointer-events-auto cursor-pointer flex h-12 px-4 py-1 items-center border-b border-zinc-300 hover:bg-white transition ease-in-out">
          <span>Create Group</span>
        </div>
        <div className="pointer-events-auto cursor-pointer flex h-12 px-4 py-1 items-center border-b border-zinc-300 hover:bg-white transition ease-in-out">
          <span>Add Member</span>
        </div>
        <div className="pointer-events-auto cursor-pointer flex h-12 px-4 py-1 items-center border-b border-zinc-300 hover:bg-white transition ease-in-out">
          <span>Remove Member</span>
        </div>
      </div>
    </>
  );
};

export default ChatsMenu;
