import axios from "axios";
import { useState } from "react";

const HomeLeftBarModal = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const addUser = (e: Event) => {
    e.preventDefault();
    try {
      const response = axios.post("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-screen h-screen top-0 left-0 bg-white/95 fixed flex justify-center items-center">
        <form
          onSubmit={(event) => event.preventDefault()}
          autoComplete="off"
          className="bg-slate-100 p-8 rounded-[25px] shadow-sm flex flex-col w-[350px] text-lg"
        >
          <div className="text-3xl text-center mb-8 border-b border-black pb-2">
            Add User
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              className="px-2 py-1"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 mb-8">
            <label htmlFor="password">User Name:</label>
            <input
              type="password"
              name="password"
              className="px-2 py-1"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="btn px-3 py-1 bg-[#2f0b72] hover:bg-[#57319d] text-white text-[18px] rounded-lg"
              onClick={() => addUser}
            >
              Add
            </button>
            <p className="pointer-events-auto cursor-pointer">Cancel</p>
          </div>
        </form>
      </div>
    </>
  );
};

export default HomeLeftBarModal;
