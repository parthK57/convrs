import connectionPool from "../database/db";
import { addFriendBody } from "../models/friends";
import ErrorHandler from "../Services/ErrorHandler";
import TimeStamp from "../Services/TimeStamp";
import UUIDGenerator from "../Services/UUIDGenerator";

const db = connectionPool;

export const addFriendHandler = async (req: any, res: any, next: any) => {
  const body: addFriendBody = req.body;
  const header = req.headers;
  const email = header.email as string;
  const username = header.username as string;
  const friendUsername = body.friendUsername;
  const friendEmail = body.friendEmail;

  const timestamp = TimeStamp();
  const UUID = UUIDGenerator();

  // @ts-expect-error -> CHECK WHETHER THE FRIEND USER EXIST
  db.execute(
    "SELECT username, email FROM users WHERE username = ? AND email = ?;",
    [friendUsername, friendEmail],
    (err: Error, results: any) => {
      if (err) return next(new ErrorHandler(err.message, 500));
      else {
        if (results.length == 0)
          return next(new ErrorHandler("User not found!", 400));
        else {
          // @ts-expect-error -> CHECK WHETHER THEY ARE ALREADY FRIENDS
          db.execute(
            "SELECT id FROM friends WHERE friendUsername = ? AND friendEmail = ? AND email = ?;",
            [friendUsername, friendEmail, email],
            (err: Error, results: any) => {
              if (err) return next(new ErrorHandler(err.message, 500));
              else if (results.length != 0)
                return next(new ErrorHandler("User already added!", 400));
              else {
                // @ts-expect-error -> ADD FRIEND
                db.execute(
                  "INSERT INTO friends (email, username, friendEmail, friendUsername, room, timestamp) VALUES (?,?,?,?,?,?);",
                  [
                    email,
                    username,
                    friendEmail,
                    friendUsername,
                    UUID,
                    timestamp,
                  ],
                  (err: Error, results: any) => {
                    if (err) return next(new ErrorHandler(err.message, 500));
                    else res.status(200).send("OK");
                  }
                );
              }
            }
          );
        }
      }
    }
  );
};

export const removeFriendHandler = async (req: any, res: any, next: any) => {
  const header = req.headers;
  const email = header.email as string;
  const friendEmail = header.friendemail as string;

  // @ts-expect-error
  db.execute(
    "DELETE FROM friends WHERE email = ? AND friendEmail = ? OR email = ? AND friendEmail = ?;",
    [email, friendEmail, friendEmail, email],
    (err: Error, results: any) => {
      if (err) return next(new ErrorHandler(err.message, 500));
      else res.status(200).send("OK!");
    }
  );
};

export const getFriendsHandler = async (req: any, res: any, next: any) => {
  const email = req.headers.email as string;

  // @ts-expect-error -> GET FRIENDS FROM TABLE WHERE USER HAS ADDED THE FRIEND
  db.execute(
    "SELECT friendUsername, room FROM friends WHERE email = ?;",
    [email],
    (err: Error, results: any) => {
      if (err) return next(new ErrorHandler(err.message, 500));
      else {
        const friendList = results;
        // @ts-expect-error -> GET FRIENDS FROM TABLE WHERE USER WAS ADDED AS FRIEND
        db.execute(
          "SELECT username, room FROM friends WHERE friendEmail = ?;",
          [email],
          (err: Error, results: any) => {
            if (err) return next(new ErrorHandler(err.message, 500));
            else {
              friendList.push(...results);
              res.status(200).json(friendList);
            }
          }
        );
      }
    }
  );
};
