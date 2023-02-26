import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import DropMenuHome from "../Home/DropMenuHome";

// REDUX TOOLKIT
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearActiveChat } from "../../slices/ActiveChat";
import { setChatMenu } from "../../slices/ChatMenuState";
import { clearFriends } from "../../slices/Friends";
import { setGroupChatMode } from "../../slices/GroupChatMode";
import { clearMessages } from "../../slices/Messages";
import { clearNewMessages } from "../../slices/NewMessages";

const NavbarHome = () => {
  const [hamburger, sethamburger] = useState(true);
  const navigate = useNavigate();
  const distpatch = useDispatch();

  // @ts-expect-error
  const logoutUser = (e) => {
    e.preventDefault();
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("username");
    distpatch(clearActiveChat());
    distpatch(setChatMenu(false));
    distpatch(clearFriends());
    distpatch(setGroupChatMode(false));
    distpatch(clearMessages());
    distpatch(clearNewMessages());
    navigate("/");
  };

  return (
    <>
      <div className="flex justify-between items-center px-10 h-[60px] bg-[#0F0326] text-[#F5F7DC] shadow-md">
        <div className="text-3xl">convrs</div>
        <ul className="hidden md:flex items-center gap-10">
          <li>{`Hello, ${localStorage.getItem(
            "username"
          )?.split(" ")[0]}!`}</li>
          <li className="cursor-pointer">
            <button
              onClick={logoutUser}
              className="btn px-3 py-1 rounded-md bg-[#fca503] hover:bg-[#ffb833] transition ease-in-out text-white"
            >
              Log Out
            </button>
          </li>
        </ul>
        <div className="md:hidden">
          {hamburger ? (
            <RxHamburgerMenu
              onClick={() => sethamburger(!hamburger)}
              className="w-6 h-6"
            />
          ) : (
            <DropMenuHome />
          )}
        </div>
      </div>
    </>
  );
};

export default NavbarHome;
