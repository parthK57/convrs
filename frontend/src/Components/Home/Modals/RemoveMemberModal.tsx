import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setRemoveMemberModal } from "../../../slices/ModalToggler";

const RemoveMemberMoal = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [groupname, setGroupname] = useState("");

  const removeMember = async (event: any) => {
    event.preventDefault();
    try {
      const { status } = await axios({
        method: "delete",
        url: "http://localhost:4000/groups/remove",
        headers: {
          "convrs-test-key": localStorage.getItem("convrs-test-key"),
          email: localStorage.getItem("email"),
          password: localStorage.getItem("password"),
          kick: username,
          groupname: groupname,
        },
      });
      console.log(status);
      if (status === 200)
        alert(`Memeber: ${username} kicked out from group: ${groupname}!`);
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
            Remove Member
          </div>
          <div className="flex flex-col gap-2">
            <label>Full Name:</label>
            <input
              type="text"
              className="px-2 py-1"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 mb-8">
            <label>Group Name:</label>
            <input
              type="text"
              className="px-2 py-1"
              onChange={(e) => setGroupname(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="btn px-3 py-1 bg-[#2f0b72] hover:bg-[#57319d] text-white text-[18px] rounded-lg"
              onClick={removeMember}
            >
              Remove
            </button>
            <p
              onClick={() => dispatch(setRemoveMemberModal(false))}
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

export default RemoveMemberMoal;
