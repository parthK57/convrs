import Navbar from "../../Components/Navbar/Navbar";

const Login = () => {
  return (
    <>
      <div className="grid-rows-2">
        <div className="grid-flow-row">
          <Navbar />
        </div>
        <div className="grid-flow-row flex w-screen justify-between">
          <div className="col-auto w-[100%] h-screen mt-[-70px] flex items-center justify-center">
            <form action="" className="text-white flex flex-col justify-around bg-[#242325] h-[400px] w-[330px] md:w-[350px] p-10 rounded-[35px] shadow-md">
              <div className="flex h-[60px] justify-center bg-[#1f1f20] items-center px-3 rounded-[25px] shadow-sm">
                <h3 className="text-3xl">Login</h3>
              </div>
              <div className="flex flex-col">
                <input type="text" className="mb-2 p-2 bg-transparent border-b border-black outline-none text-lg" placeholder="email" />
                <input type="password" className="mt-4 mb-2 p-2 bg-transparent border-b border-black outline-none text-lg" placeholder="Password" />
              </div>
              <div className="flex justify-between items-center">
                <button type="submit" className="text-lg bg-[#FFA630] px-5 py-1 rounded-[8px]">Login</button>
                <p className="text-lg cursor-pointer">New user, sign Up!</p>
              </div>
            </form>
          </div>
          <div className="hidden lg:flex col-auto w-[100%] h-screen mt-[-70px] items-center justify-center">
            <div className="w-[100px] h-[200px] bg-login"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
