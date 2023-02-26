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
    "SELECT id FROM users WHERE username = ? AND email = ?;",
    [friendUsername, friendEmail],
    (err: Error, results: any) => {
      if (err) return next(new ErrorHandler(err.message, 500));
      else {
        if (results.length == 0)
          return next(new ErrorHandler("User not found!", 400));
        else {
          const user2 = results[0].id as string;
          // @ts-expect-error -> GET THE USER's ID (FRIEND REQUEST SENDER)
          db.execute(
            "SELECT id FROM users WHERE username = ? AND email = ?;",
            [username, email],
            (err: Error, results: any) => {
              if (err) return next(new ErrorHandler(err.message, 500));
              else {
                if (results.length == 0)
                  return next(new ErrorHandler("User not found!", 404));
                const user1 = results[0].id as string;
                // @ts-expect-error -> CHECK WHETHER THEY ARE ALREADY FRIENDS
                db.execute(
                  "SELECT id FROM friends WHERE user1 = ? AND user2 = ? OR user1 = ? AND user2 = ?;",
                  [user1, user2, user2, user1],
                  (err: Error, results: any) => {
                    if (err) return next(new ErrorHandler(err.message, 500));
                    else {
                      if (results.length > 0)
                        return next(
                          new ErrorHandler(
                            "User has already been added as friend!",
                            400
                          )
                        );
                      // @ts-expect-error -> INSERT INTO FRIENDS TABLE
                      db.execute(
                        "INSERT INTO friends (user1, user2, room, timestamp) VALUES (?,?,?,?);",
                        [user1, user2, UUID, timestamp],
                        (err: Error, results: any) => {
                          if (err)
                            return next(new ErrorHandler(err.message, 500));
                          else {
                            res.status(201).json({ result: "Success" });
                          }
                        }
                      );
                    }
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
  const username = header.username as string;
  const friendUsername = header.friendusername as string;

  // @ts-expect-error -> GETING THE IDS TO DELETE FROM THE FRIENDS TABLE
  db.execute(
    "SELECT id, username FROM users WHERE username = ? OR username = ?;",
    [username, friendUsername],
    (err: Error, results: any) => {
      if (err) return next(new ErrorHandler(err.message, 500));
      else {
        if (results.length < 2)
          return next(new ErrorHandler("Invalid user data!", 400));
        const id1 = results[0].id;
        const id2 = results[1].id;
        // @ts-expect-error
        db.execute(
          "DELETE FROM friends WHERE user1 = ? AND user2 = ? OR user1 = ? AND user2 = ?;",
          [id1, id2, id2, id1],
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

export const getFriendsHandler = async (req: any, res: any, next: any) => {
  const email = req.headers.email as string;

  // @ts-expect-error -> GETTING ID OF THE USER INORDER TO USE THAT ID TO QUERY FRIENDS
  db.execute(
    "SELECT id FROM users WHERE email = ?;",
    [email],
    (err: Error, results: any) => {
      if (err) return next(new ErrorHandler(err.message, 500));
      else {
        if (results.length == 0)
          return next(
            new ErrorHandler("No user found with provided email!", 404)
          );
        const id = results[0].id;
        // @ts-expect-error -> ACTUALLY GET FRIENDS
        db.execute(
          `SELECT DISTINCT username, room FROM users INNER JOIN friends 
          ON users.id = friends.user1 OR users.id = friends.user2 
          WHERE friends.user1 = ? AND users.id != ? 
          OR friends.user2 = ? AND users.id != ?;`,
          [id, id, id, id],
          (err: Error, results: any) => {
            if (err) return next(new ErrorHandler(err.message, 500));
            else {
              if (results.length == 0)
                return next(new ErrorHandler("You have no friends!", 400));
              res.status(200).json(results);
            }
          }
        );
      }
    }
  );
};
