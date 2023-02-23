import { AiOutlineClose } from "react-icons/ai";

const DropMenuHome = () => {
  return (
    <>
      <div className="bg-slate-50 w-screen h-screen fixed top-0 left-0 z-5 flex flex-col justify-center items-center">
        <ul className="flex flex-col w-[100%] text-2xl justify-center text-center gap-10">
          <li className="cursor-pointer pb-1">Hello, User!</li>
          <li className="cursor-pointer pb-1">
            <button className="btn px-3 py-1 rounded-md bg-[#fca503] hover:bg-[#ffb833] transition ease-in-out text-white">
              Log Out
            </button>
          </li>
          <li className="cursor-pointer pb-1 flex justify-center">
            <a href="/">
              <AiOutlineClose />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default DropMenuHome;
