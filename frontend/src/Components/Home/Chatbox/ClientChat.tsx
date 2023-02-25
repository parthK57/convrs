interface ClientChatProp {
  username: string;
  message: string;
}

const ClientChat = ({ username, message }: ClientChatProp) => {
  return (
    <>
      <div className="max-w-[250px] py-1 ">
        <div className="px-2 py-1 rounded-md bg-[#072f6a] text-orange-50">
          <p className="border-b border-[#021a3f]">{username}</p>
          {message}
        </div>
      </div>
    </>
  );
};

export default ClientChat;
