import axios from "axios";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function App() {
  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    try {
      const response = await axios.post("http://localhost:6969/sendmessage", {
        room: room,
        username: username,
        message: message,
      });
      console.log(response);
      if (response.status == 200) {
        socket.emit("private-message", { room: room, message: message });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const obj = { room: 1 };
  // Socket Stuff
  const socket = io("http://localhost:6969");
  useEffect(() => {
    socket.on("server", (data: any) => {
      console.log(data);
    });
    socket.emit("join-room", 1);
    socket.on("server-resp", (data: any) => {
      console.log(data);
    });
  }, [socket]);
  return (
    <>
      <div>
        <form action="" style={{ display: "flex", flexDirection: "column" }}>
          <input
            type="text"
            placeholder="room number"
            id="room"
            onChange={(e) => setRoom(e.target.value)}
          />
          <input
            type="text"
            placeholder="username"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="message"
            id="message"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" onClick={sendMessage}>
            Send
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
