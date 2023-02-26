import { useState } from "react";
import { Link } from "react-router-dom";
import DropMenu from "../Login/DropMenu";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
  const [hamburger, sethamburger] = useState(true);

  return (
    <>
      <div className="flex justify-between text-[#F5F7DC] items-center px-10 h-[60px] bg-[#0F0326] shadow-md">
        <div className="text-3xl">convrs</div>
        <ul className="hidden md:flex gap-10">
          <li className="cursor-pointer">
            <Link to="/">Login</Link>
          </li>
          <li className="cursor-pointer">
            <Link to="/signup">Sign Up</Link>
          </li>
          <li className="cursor-pointer">
            <Link to="/aboutus">About Us</Link>
          </li>
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
