import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config({
  path: "../.env",
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket: any) => {
  io.emit("confirm", "You are now connected to the server!");

  // **JOIN A ROOM - GET DATA FROM FRONTEND CODE ===> socket.emit("join-room", {room:room});
  socket.on("join-room", (data: any) => {
    socket.join(data.room);
    socket.emit("response", `Roger that!Joining room: ${data.room}`);
  });

  socket.on("private-message", (data: any) => {
    // **this is how you send a private message IO.(SOCKETS).IN(ROOM).EMIT("NAME OF THE EVENT"), DATA<MESSAGE>); REF:https://www.tutorialspoint.com/socket.io/socket.io_rooms.htm
    io.sockets.in(data.room).emit("receive-message", data);
  });
});


server.listen(process.env.PORT, () =>
  console.log(`Server live at PORT:${process.env.PORT}`)
);
