interface ClientChatProp {
  message: string;
}

const ClientChat = ({ message }: ClientChatProp) => {
  return (
    <>
      <div className="max-w-[250px] py-1 ">
        <div className="px-2 py-1 rounded-md bg-[#072f6a] text-orange-50">
          {message}
        </div>
      </div>
    </>
  );
};

export default ClientChat;
