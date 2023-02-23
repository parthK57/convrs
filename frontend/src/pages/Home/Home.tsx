import Chatbox from "../../Components/Home/Chatbox/Chatbox";
import HomeLeftBar from "../../Components/Home/HomeLeftBar/HomeLeftBar";
import NavbarHome from "../../Components/Navbar/NavbarHome";

const Home = () => {
  return (
    <>
      <NavbarHome />
      <div className="flex w-screen h-[calc(100vh-60px)] p-10 justify-center items-center">
        <HomeLeftBar/>
        <Chatbox />
      </div>
    </>
  );
};

export default Home;
