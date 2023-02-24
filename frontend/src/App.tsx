import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import SignUp from "./pages/Sign Up/SignUp";
import AboutUs from "./pages/About Us/AboutUs";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/aboutus" element={<AboutUs />}></Route>
      </Routes>
    </>
  );
}

export default App;
