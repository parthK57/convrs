interface UserChatProp {
  message: string;
}

const UserChat = ({ message }: UserChatProp) => {
  return (
    <>
      <div className="w-full flex justify-end items-center py-1 ">
        <div className="px-2 py-1 text-black rounded-md max-w-[250px] bg-[#F5F7DC]">
          {message}
        </div>
      </div>
    </>
  );
};

export default UserChat;
