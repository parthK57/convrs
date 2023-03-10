import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import ErrorHandler from "./Services/ErrorHandler";

dotenv.config({
  path: "../.env",
});

const app = express();
app.use(
  cors({
    origin: "http://localhost:4173",
  })
);
app.use(bodyParser.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:4173",
  },
});

io.on("connection", (socket: any) => {
  io.emit("confirm", "You are now connected to the server!");

  // **JOIN A ROOM - GET DATA FROM FRONTEND CODE ===> socket.emit("join-room", {room:room});
  socket.on("join-room", (data: any) => {
    socket.join(data.room);
    // socket.emit("response", `Roger that!Joining room: ${data.room}`);
    io.sockets.in(data.room).emit("response", data);
  });
  socket.on("private-message", (data: any)=>{
    const json = [data];
    io.sockets.in(data.room).emit("receive-message", json);
  })
});




// Routes
import userRouter from "./routes/users";
import messageRouter from "./routes/messages";
import friendsRouter from "./routes/friends";
import groupsRouter from "./routes/groups";

app.use(userRouter);
app.use(messageRouter);
app.use(friendsRouter);
app.use(groupsRouter);

// Error Handler
app.use((error: ErrorHandler, req: any, res: any, next: any) => {
  const message = error.message || "Server Error!";
  const statusCode = error.statusCode || 500;

  res.status(statusCode).send(message);
});

server.listen(process.env.PORT, () =>
  console.log(`Server live at PORT:${process.env.PORT}`)
);
