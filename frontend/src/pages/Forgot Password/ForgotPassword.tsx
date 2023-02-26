import { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const resetPassword = async (e: any) => {
    e.preventDefault();
    try {
      const { status } = await axios({
        method: "get",
        url: "http://localhost:4000/users/reset",
        headers: {
          "convrs-test-key": "11223344",
          email: email,
          username: username,
        },
      });
      console.log(status);
      if (status === 200) alert("Check your email!");
    } catch (error: any) {
      console.log(error);
      if (error.response.data) alert(error.response.data);
    }
  };
  return (
    <>
      <Navbar />
      <div className="w-screen h-[calc(100vh-60px)] flex justify-center items-center">
        <form className="bg-slate-100 p-8 rounded-[25px] shadow-sm flex flex-col w-[350px]">
          <div className="text-3xl text-center mb-8 border-b border-black pb-2">
            Password Recovery
          </div>
          <div className="flex flex-col gap-2">
            <label>Email:</label>
            <input
              type="text"
              className="px-2 py-1"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 mb-8">
            <label>Full Name:</label>
            <input
              type="text"
              className="px-2 py-1"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="btn px-3 py-1 bg-[#2f0b72] hover:bg-[#57319d] text-white text-[18px] rounded-lg"
              onClick={resetPassword}
            >
              Reset
            </button>
            <p className="pointer-events-auto cursor-pointer">
              <Link to="/">Cancel?</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
