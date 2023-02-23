import { AiOutlineClose } from "react-icons/ai";

const DropMenu = () => {
  return (
    <>
      <div className="bg-slate-50 w-screen h-screen fixed top-0 left-0 z-5 flex flex-col justify-center items-center">
        <ul className="flex flex-col w-[100%] text-2xl justify-center text-center gap-10">
          <li className="cursor-pointer pb-1">
            <a href="/">Login</a>
          </li>
          <li className="cursor-pointer pb-1">
            <a href="/">Sign Up</a>
          </li>
          <li className="cursor-pointer pb-1">
            <a href="/">About Us</a>
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

export default DropMenu;
