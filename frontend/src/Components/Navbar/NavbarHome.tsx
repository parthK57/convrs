import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import DropMenuHome from "../Home/DropMenuHome";
import { useNavigate } from "react-router-dom";

const NavbarHome = () => {
  const [hamburger, sethamburger] = useState(true);
  const navigate = useNavigate();

  // @ts-expect-error
  const logoutUser = (e) => {
    e.preventDefault();
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    navigate("/");
  };

  return (
    <>
      <div className="flex justify-between items-center px-10 h-[60px] bg-[#0F0326] text-[#F5F7DC] shadow-md">
        <div className="text-3xl">convrs</div>
        <ul className="hidden md:flex items-center gap-10">
          <li className="cursor-pointer">{`Hello, ${localStorage.getItem(
            "email"
          )}!`}</li>
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
