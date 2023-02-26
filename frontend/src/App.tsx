import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import SignUp from "./pages/Sign Up/SignUp";
import AboutUs from "./pages/About Us/AboutUs";
import { Provider } from "react-redux";
import { store } from "./store";
import ForgotPassword from "./pages/Forgot Password/ForgotPassword";

function App() {

  return (
    <>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/aboutus" element={<AboutUs />}></Route>
        <Route path="/password/recovery" element={<ForgotPassword />}></Route>  
      </Routes>
      </Provider>
    </>
  );
}

export default App;
