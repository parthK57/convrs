const Navbar = () => {
  return (
    <>
      <nav className="flex justify-between items-center bg-[#242325] text-slate-00 h-[70px] shadow-sm">
        <div className="px-5 text-white py-1 text-3xl">convrs</div>
        <ul className="hidden lg:flex px-5 justify-between lg:w-[45%] xl:w-[32%] xxl:w-[25%] rounded">
          <li className="text-xl bg-[#3581B8] px-4 py-1 rounded-xl cursor-pointer hover:bg-[#FFE0B2]">
            Login
          </li> 
          <li className="text-xl bg-[#3581B8] px-4 py-1 rounded-xl cursor-pointer hover:bg-[#FFE0B2]">
            Sign Up
          </li>
          <li className="text-xl bg-[#3581B8] px-4 py-1 rounded-xl cursor-pointer hover:bg-[#FFE0B2]">
            About
          </li>
          <li className="text-xl bg-[#3581B8] px-4 py-1 rounded-xl cursor-pointer hover:bg-[#FFE0B2]">
            Contact
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
