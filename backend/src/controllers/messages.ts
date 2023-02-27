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

  try {
    const [userData] = (await db.execute(
      "SELECT id FROM users WHERE email = ?;",
      [email]
    )) as any;
    if (userData.length == 0)
      return next(new ErrorHandler(`Invalid email: ${email}`, 400));
    const userId = userData[0].id;

    // INSERT MSG INTO DB
    await db.execute(
      "INSERT INTO messages (user, message, room, timestamp) VALUES (?, ?, ?, ?);",
      [userId, message, room, timestamp]
    );
    res.status(200).json({ result: "success" });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
};

export const getMessagesHandler = async (req: any, res: any, next: any) => {
  const room = req.headers.room as string;

  try {
    const [messages] = (await db.execute(
      `SELECT users.username, messages.message FROM users INNER JOIN messages 
        ON users.id = messages.user WHERE messages.room = ? ORDER BY messages.id;`,
      [room]
    )) as any;
    res.status(200).json(messages);
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
};
