import { useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import SignUpForm from "../../Components/Sign Up/SignUpForm";

const SignUp = () => {
  useEffect(() => {
    sessionStorage.setItem("convrs-test-key", "11223344");
  }, []);

  return (
    <>
      <Navbar />
      <div className="block md:grid grid-cols-2 gap-40">
        <div
          id="form-container"
          className="hidden md:flex justify-center items-center h-[calc(100vh-60px)]"
        >
          <div className="w-96 h-96 bg-[url('/home/parth/Projects/convrs/frontend/src/assets/signUp.jpg')] bg-no-repeat bg-contain bg-center"></div>
        </div>
        <div
          id="image-container"
          className="flex justify-center items-center h-[calc(100vh-60px)]"
        >
          <SignUpForm />
        </div>
      </div>
    </>
  );
};

export default SignUp;
