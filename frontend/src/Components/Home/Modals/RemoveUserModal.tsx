import { useState } from "react";
import axios from "axios";

// REDUX TOOLKIT
import { useDispatch } from "react-redux";
import { setRemoveUserModal } from "../../../slices/ModalToggler";

const RemoveUserModal = () => {
  const dispatch = useDispatch();
  const [friendUsername, setFriendUsername] = useState("");

  const removeUser = async (event: any) => {
    event.preventDefault();
    try {
      const { status } = await axios({
        method: "delete",
        url: "http://localhost:4000/friends/remove",
        headers: {
          "convrs-test-key": localStorage.getItem("convrs-test-key"),
          email: localStorage.getItem("email"),
          password: localStorage.getItem("password"),
          username: localStorage.getItem("username"),
          friendUsername: friendUsername,
        },
      });
      console.log(status);
      if (status === 200) alert(`Unfriended user: ${friendUsername}`);
    } catch (error: any) {
      console.log(error);
      if (error.response.data) alert(error.response.data);
    }
  };
  return (
    <>
      <div className="fixed top-0 left-0 bg-white w-screen h-screen flex justify-center items-center">
        <form className="bg-slate-100 p-8 rounded-[25px] shadow-sm flex flex-col w-[300px]">
          <div className="text-3xl text-center mb-8 border-b border-black pb-2">
            Remove User
          </div>
          <div className="flex flex-col gap-2">
            <label>Full Name:</label>
            <input
              type="text"
              className="px-2 py-1"
              onChange={(e) => setFriendUsername(e.target.value)}
            />
          </div>
          <div className="mt-8 flex justify-between items-center">
            <button
              type="submit"
              className="btn px-3 py-1 bg-[#2f0b72] hover:bg-[#57319d] text-white text-[18px] rounded-lg"
              onClick={removeUser}
            >
              Remove User
            </button>
            <p
              onClick={() => dispatch(setRemoveUserModal(false))}
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

export default RemoveUserModal;
