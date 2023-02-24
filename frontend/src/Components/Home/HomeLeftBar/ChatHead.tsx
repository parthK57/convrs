interface ChatHeadPropsDtype {
  username: string;
  room: string;
}

const ChatHead = ({ username, room }: ChatHeadPropsDtype) => {
  return (
    <>
      <div className="pointer-events-auto cursor-pointer flex h-16 px-2 py-5 items-center border-b border-zinc-300 hover:bg-white transition ease-in-out">
        <span>{username}</span>
      </div>
    </>
  );
};

export default ChatHead;
