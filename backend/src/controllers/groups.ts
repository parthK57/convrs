import ErrorHandler from "../Services/ErrorHandler";
import TimeStamp from "../Services/TimeStamp";
import UUIDGenerator from "../Services/UUIDGenerator";
import connectionPool from "../database/db";

const db = connectionPool;

export const createGroupHandler = async (req: any, res: any, next: any) => {
  const body = req.body;
  const email = req.headers.email as string;
  const groupname = body.groupname as string;
  const groupPassword = body.groupPassword as string;

  const timestamp = TimeStamp();
  const room = UUIDGenerator();

  // @ts-expect-error -> INSERT INTO GROUPS TABLE
  db.execute(
    "INSERT INTO `groups` (groupname, password, room, timestamp, admin) VALUES (?,?,?,?,?);",
    [groupname, groupPassword, room, timestamp, email],
    (err: Error, results: any) => {
      if (err) return next(new ErrorHandler(err.message, 500));
      else {
        // @ts-expect-error -> GETTING PREVIOUS GROUPS OF THE USER TO UPDATE IT WITH NEW ONE
        db.execute(
          "SELECT groupMember FROM users WHERE email = ?;",
          [email],
          (err: any, results: any) => {
            if (err) return next(new ErrorHandler(err.message, 500));
            else {
              let groupMember = groupname;
              if (results.length != 0)
                groupMember = groupMember.concat(",", results[0].groupMember);
              // @ts-expect-error -> UPDATE THE USERS TABLE WITH RESPECTIVE DETAILS
              db.execute(
                "UPDATE users SET groupMember = ? WHERE email = ?;",
                [groupMember, email],
                (err: Error, results: any) => {
                  if (err) return next(new ErrorHandler(err.message, 500));
                  else res.status(201).send("OK!");
                }
              );
            }
          }
        );
      }
    }
  );
};

export const joinGroupHandler = async (req: any, res: any, next: any)=> {
    
}
