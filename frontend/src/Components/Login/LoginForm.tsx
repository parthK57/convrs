import axios from "axios";
import { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e: Event) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/users/login", {
        headers: {
          "convrs-test-key": "11223344",
          "Content-Type": "application/json",
        },
        email: email,
        password: password,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form
        onSubmit={(event) => event.preventDefault()}
        autoComplete="off"
        className="bg-slate-100 p-8 rounded-[25px] shadow-sm flex flex-col w-[350px]"
      >
        <div className="text-3xl text-center mb-8 border-b border-black pb-2">
          Login
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
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            className="px-2 py-1"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="btn px-3 py-1 bg-[#2f0b72] hover:bg-[#57319d] text-white text-[18px] rounded-lg"
            onClick={() => loginUser}
          >
            Login
          </button>
          <p className="pointer-events-auto cursor-pointer">Forgot password?</p>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
