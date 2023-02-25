interface UserChatProp {
  username: string;
  message: string;
}

const UserChat = ({ username, message }: UserChatProp) => {
  return (
    <>
      <div className="w-full flex justify-end items-center py-1">
        <div className="px-2 py-1 text-black rounded-md max-w-[250px] bg-[#F5F7DC]">
          <p className="bg-[#f4f7d7] border-b border-[#dff801]">{username}</p>
          <p className="messageg">{message}</p>
        </div>
      </div>
    </>
  );
};

export default UserChat;
