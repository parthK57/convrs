interface ClientChatProp {
  username: string;
  message: string;
}

const ClientChat = ({ username, message }: ClientChatProp) => {
  return (
    <>
      <div className="w-full flex py-1 ">
        <div className="max-w-[250px] px-2 py-1 rounded-md bg-[#072f6a] text-orange-50">
          <p className="border-b border-[#021a3f]">{username}</p>
          <p className="messageg">{message}</p>
        </div>
      </div>
    </>
  );
};

export default ClientChat;
