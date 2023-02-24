import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // @ts-expect-error
  const signUpUser = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      try {
        const { status } = await axios({
          method: "post",
          url: "http://localhost:4000/users/signup",
          headers: {
            "convrs-test-key": sessionStorage.getItem("convrs-test-key"),
          },
          data: {
            email: email,
            username: username,
            password: confirmPassword,
          },
        });
        if (status === 201) {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <>
      <form
        autoComplete="off"
        className="bg-slate-100 p-8 rounded-[25px] shadow-sm flex flex-col w-[350px]"
      >
        <div className="text-3xl text-center mb-8 border-b border-black pb-2">
          Sign Up
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="px-2 py-1"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Full Name:</label>
          <input
            type="text"
            className="px-2 py-1"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Password:</label>
          <input
            type="password"
            className="px-2 py-1"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 mb-8">
          <label>Retype Password:</label>
          <input
            type="password"
            className="px-2 py-1"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="flex gap-8 items-center">
          <button
            type="submit"
            className="btn px-3 py-1 bg-[#2f0b72] hover:bg-[#57319d] text-white text-[18px] rounded-lg"
            onClick={signUpUser}
          >
            Sign Up
          </button>
          <p className="pointer-events-auto cursor-pointer text-md">
            <Link to="/">Cancel</Link>{" "}
          </p>
        </div>
      </form>
    </>
  );
};

export default SignUpForm;
