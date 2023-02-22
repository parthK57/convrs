import { sendMessageBody } from "../models/messages";
import connectionPool from "../database/db";
import TimeStamp from "../Services/TimeStamp";
import ErrorHandler from "../Services/ErrorHandler";

const db = connectionPool;

export const sendMessageHandler = async (req: any, res: any, next: any) => {
  const body: sendMessageBody = req.body;
  const email = req.headers.email;
  const room = body.room;
  const message = body.message;

  const timestamp = TimeStamp();

  // @ts-expect-error -> GETTING USER ID
  db.execute(
    "SELECT id FROM users WHERE email = ?;",
    [email],
    (err: Error, results: any) => {
      if (err) return next(new ErrorHandler(err.message, 500));
      else {
        if (results.length == 0)
          return next(new ErrorHandler(`Invalid email:${email}`, 400));
        const userId = results[0].id;
        // @ts-expect-error
        db.execute(
          "INSERT INTO messages (user, message, room, timestamp) VALUES (?, ?, ?, ?);",
          [userId, message, room, timestamp],
          (err: Error, results: any) => {
            if (err) return next(new ErrorHandler(err.message, 500));
            else {
              res.status(200).json({ result: "Success" });
            }
          }
        );
      }
    }
  );
};

export const getMessagesHandler = async (req: any, res: any, next: any) => {
  const room = req.headers.room as string;

  // @ts-expect-error
  db.execute(
    `SELECT users.username, messages.message FROM users INNER JOIN messages 
     ON users.id = messages.user WHERE messages.room = ? ORDER BY messages.id;`,
    [room],
    (err: Error, results: any) => {
      if (err) return next(new ErrorHandler(err.message, 500));
      res.status(200).json(results);
    }
  );
};
