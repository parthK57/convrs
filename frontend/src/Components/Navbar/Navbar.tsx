import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import DropMenu from "../Login/DropMenu";

const Navbar = () => {
  const [hamburger, sethamburger] = useState(true);

  return (
    <>
      <div className="flex justify-between items-center px-10 h-[60px] bg-slate-200 shadow-md">
        <div className="text-3xl">convrs</div>
        <ul className="hidden md:flex gap-10">
          <li className="cursor-pointer">Login</li>
          <li className="cursor-pointer">Sign Up</li>
          <li className="cursor-pointer">About Us</li>
        </ul>
        <div className="md:hidden">
          {hamburger ? (
            <RxHamburgerMenu
              onClick={() => sethamburger(!hamburger)}
              className="w-6 h-6"
            />
          ) : (
            <DropMenu />
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
