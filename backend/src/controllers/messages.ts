import { sendMessageBody } from "../models/messages";
import connectionPool from "../database/db";
import TimeStamp from "../Services/TimeStamp";
import ErrorHandler from "../Services/ErrorHandler";

const db = connectionPool;

export const sendMessageHandler = async (req: any, res: any, next: any) => {
  const body: sendMessageBody = req.body;
  const username = body.username;
  const room = body.room;
  const message = body.message;

  const timestamp = TimeStamp();

  // @ts-expect-error
  db.execute(
    "INSERT INTO messages (username, room, message, timestamp) VALUES (?,?,?,?);",
    [username, room, message, timestamp],
    (err: Error, results: any) => {
      if (err) return next(new ErrorHandler(err.message, 500));
      else res.status(200).send("OK!");
    }
  );
};
