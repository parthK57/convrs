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
    origin: "http://127.0.0.1:5173",
  },
});

io.on("connection", (socket: any) => {
  io.emit("server", "You are now connected to the server!");

  socket.on("join-room", (data: any) => {
    socket.join(data);
  });

  socket.on("private-message", (data: any) => {
    socket.to(data.room).emit("server-resp",data.message);
  })
});

const database: any = [];

// Routes
app.get("/", (req: any, res: any) => res.status(200).json({ server: "Live" }));
app.post("/sendmessage", (req: any, res: any) => {
    const body = req.body;
    const username = body.username;
    const room = body.room;
    const message = body.message;

    database.push({username: username, room: room, message: message});
    res.status(200).send("Received!");
})

server.listen(process.env.PORT, () =>
  console.log(`Server live at PORT:${process.env.PORT}`)
);
