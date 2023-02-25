import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  interface axiosResponse {
    status: number;
    data: {
      username: string;
    };
  }

  // @ts-expect-error
  const loginUser = async (event) => {
    event.preventDefault();
    try {
      const { status, data }: axiosResponse = await axios({
        method: "post",
        url: "http://localhost:4000/users/login",
        headers: {
          "convrs-test-key": sessionStorage.getItem("convrs-test-key"),
        },
        data: {
          email: email,
          password: password,
        },
      });
      if (status === 200) {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("username", data.username);
        localStorage.setItem("convrs-test-key", "11223344");
        console.log(data.username);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-slate-100 p-8 rounded-[25px] shadow-sm flex flex-col w-[350px]">
        <div className="text-3xl text-center mb-8 border-b border-black pb-2">
          Login
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
          <label>Password:</label>
          <input
            type="password"
            className="px-2 py-1"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="btn px-3 py-1 bg-[#2f0b72] hover:bg-[#57319d] text-white text-[18px] rounded-lg"
            onClick={loginUser}
          >
            Login
          </button>
          <p className="pointer-events-auto cursor-pointer">
            <Link to="/password/recovery">Forgot password?</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
