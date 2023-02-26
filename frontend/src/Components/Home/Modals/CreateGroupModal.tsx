import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCreateGroupModal } from "../../../slices/ModalToggler";

const CreateGroupModal = () => {
  const dispatch = useDispatch();
  const [groupname, setGroupname] = useState("");
  const [groupPassword, setGroupPassword] = useState("");
  const [confirmGroupPassword, setConfirmGroupPassword] = useState("");

  const createGroup = async (event: any) => {
    event.preventDefault();
    try {
      if (groupPassword != confirmGroupPassword)
        throw new Error("Passwords do not match!");
      const { status } = await axios({
        method: "post",
        url: "http://localhost:4000/groups/create",
        headers: {
          "convrs-test-key": localStorage.getItem("convrs-test-key"),
          email: localStorage.getItem("email"),
          password: localStorage.getItem("password"),
        },
        data: {
          groupname: groupname,
          groupPassword: groupPassword,
        },
      });
      console.log(status);
      if (status === 201) alert(`Group: ${groupname} has been created!`);
    } catch (error: any) {
      console.log(error.message);
      if (error.message) alert(error.message);
      else alert(error.response.data);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 bg-white/95 w-screen h-screen flex justify-center items-center">
        <form className="bg-slate-100 p-8 rounded-[25px] shadow-sm flex flex-col w-[300px]">
          <div className="text-3xl text-center mb-8 border-b border-black pb-2">
            Create Group
          </div>
          <div className="flex flex-col gap-2">
            <label>Name:</label>
            <input
              type="text"
              className="px-2 py-1"
              onChange={(e) => setGroupname(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Password:</label>
            <input
              type="password"
              className="px-2 py-1"
              onChange={(e) => setGroupPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 mb-8">
            <label>Retype Password:</label>
            <input
              type="password"
              className="px-2 py-1"
              onChange={(e) => setConfirmGroupPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="btn px-3 py-1 bg-[#2f0b72] hover:bg-[#57319d] text-white text-[18px] rounded-lg"
              onClick={createGroup}
            >
              Create
            </button>
            <p
              onClick={() => dispatch(setCreateGroupModal(false))}
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

export default CreateGroupModal;
