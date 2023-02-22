import ErrorHandler from "../Services/ErrorHandler";
import { AcceptNull, KickNull } from "../Services/Groups";
import TimeStamp from "../Services/TimeStamp";
import UUIDGenerator from "../Services/UUIDGenerator";
import connectionPool from "../database/db";
import {
  detailsArray,
  selectDetails,
  selectDetailsArray,
} from "../models/groups";

const db = connectionPool;

export const createGroupHandler = async (req: any, res: any, next: any) => {
  const body = req.body;
  const email = req.headers.email as string;
  const groupname = body.groupname as string;

  const timestamp = TimeStamp();
  const room = UUIDGenerator();

  // @ts-expect-error -> INSERT INTO GROUPS TABLE
  db.execute(
    "SELECT id FROM users WHERE email = ?;",
    [email],
    (err: Error, results: any) => {
      if (err) return next(new ErrorHandler(err.message, 500));
      else {
        if (results.length == 0)
          return next(new ErrorHandler("Invalid user details!", 400));
        // @ts-expect-error
        db.execute(
          "INSERT INTO `groups` (groupname, room, admin, timestamp) VALUES (?, ?, ?, ?);",
          [groupname, room, results[0].id, timestamp],
          (err: Error, results: any) => {
            if (err) return next(new ErrorHandler(err.message, 500));
            else {
              res.status(201).json({ result: "Success" });
            }
          }
        );
      }
    }
  );
};

export const joinGroupHandler = async (req: any, res: any, next: any) => {
  const body = req.body;
  const email = req.header.email as string;
  const details: detailsArray = body.details;
  const groupname = body.group as string;

  const addCount = details.length;
  const emailsArray = details.map((value) => {
    return value.email;
  });
  let SELECT_SQL_Repeat = "email = ? OR ";
  let SELECT_SQL_Statement = `SELECT groupMember, email FROM users WHERE ${SELECT_SQL_Repeat.repeat(
    addCount - 1
  ).concat("email = ?;")}`;
  //@ts-expect-error
  db.execute(
    SELECT_SQL_Statement,
    [...emailsArray],
    async (err: Error, results: selectDetailsArray) => {
      if (err) return next(new ErrorHandler(err.message, 500));
      else {
        const NonNullGroup = await KickNull(results, groupname);
        const NullGroup = await AcceptNull(results);

        // TODO: Replace If statements with a promise and you are done!

        if ((await NullGroup.length) != 0) {
          // @ts-expect-error
          db.execute();
        }
        if ((await NonNullGroup.length) != null) {
          NonNullGroup.forEach((value: selectDetails) => {
            // @ts-expect-error
            db.execute(
              "UPDATE users SET groupMembers = ? WHERE email = ?;",
              [value.groupMember, value.email],
              (err: Error, results: any) => {
                if (err) return next(new ErrorHandler(err.message, 500));
              }
            );
          });
        }
      }
    }
  );
};

export const getGroupsHandler = async (req: any, res: any, next: any) => {
  const email = req.headers.email;

  // @ts-expect-error
  db.execute(
    "SELECT groupMember FROM users WHERE email = ?;",
    [email],
    (err: Error, results: any) => {
      if (err) return next(new ErrorHandler(err.message, 500));
      else if (results[0].groupMember == null || undefined)
        return res.status(200).send(results);
      else res.status(200).send(results[0].groupMember.split(","));
    }
  );
};

export const sendGroupMessageHandler = async (
  req: any,
  res: any,
  next: any
) => {
  const body = req.body;
  const username = body.username;
  const message = body.message;
  const room = body.room;

  const timestamp = TimeStamp();

  // @ts-expect-error
  db.execute(
    "INSERT INTO messages (username, room, message, timestamp) VALUES (?, ?, ?, ?);",
    [username, room, message, timestamp],
    (err: Error, results: any) => {
      if (err) return next(new ErrorHandler(err.message, 500));
      else {
        res.status(200).send("OK!");
      }
    }
  );
};
