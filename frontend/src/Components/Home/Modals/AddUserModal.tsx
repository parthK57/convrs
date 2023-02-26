import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAddUserModal } from "../../../slices/ModalToggler";

const AddUserModal = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const addUser = async (event: any) => {
    event.preventDefault();
    try {
      const { status } = await axios({
        method: "post",
        url: "http://localhost:4000/friends/add",
        headers: {
          "convrs-test-key": localStorage.getItem("convrs-test-key"),
          email: localStorage.getItem("email"),
          password: localStorage.getItem("password"),
          username: localStorage.getItem("username"),
        },
        data: {
          friendUsername: username,
          friendEmail: email,
        },
      });
      console.log(status);
      if (status === 201) alert(`User: ${username} added as a friend!`);
    } catch (error: any) {
      alert(error.response.data);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 bg-white/95 w-screen h-screen flex justify-center items-center">
        <form className="bg-slate-100 p-8 rounded-[25px] shadow-sm flex flex-col w-[300px]">
          <div className="text-3xl text-center mb-8 border-b border-black pb-2">
            Add Friend
          </div>
          <div className="flex flex-col gap-2">
            <label>Email:</label>
            <input
              type="email"
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
              onClick={addUser}
            >
              Add Friend
            </button>
            <p
              onClick={() => dispatch(setAddUserModal(false))}
              className="pointer-events-auto cursor-pointer"
            >
              Cancel ?
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddUserModal;
