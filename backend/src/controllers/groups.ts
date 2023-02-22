import ErrorHandler from "../Services/ErrorHandler";
import TimeStamp from "../Services/TimeStamp";
import UUIDGenerator from "../Services/UUIDGenerator";
import connectionPool from "../database/db";
import { detailsArray } from "../models/groups";

const db = connectionPool;

export const createGroupHandler = async (req: any, res: any, next: any) => {
  const body = req.body;
  const email = req.headers.email as string;
  const groupname = body.groupname as string;

  const timestamp = TimeStamp();
  const room = UUIDGenerator();

  // @ts-expect-error -> GET ADMIN ID
  db.execute(
    "SELECT id FROM users WHERE email = ?;",
    [email],
    (err: Error, results: any) => {
      if (err) return next(new ErrorHandler(err.message, 500));
      else {
        if (results.length == 0)
          return next(new ErrorHandler("Invalid user details!", 400));
        const adminId = results[0].id;
        // @ts-expect-error -> INSERT INTO GROUPS TABLE
        db.execute(
          "INSERT INTO `groups` (groupname, room, admin, timestamp) VALUES (?, ?, ?, ?);",
          [groupname, room, adminId, timestamp],
          (err: Error, results: any) => {
            if (err) return next(new ErrorHandler(err.message, 500));
            else {
              // @ts-expect-error -> GET GROUP ID
              db.execute(
                "SELECT id FROM `groups` WHERE groupname = ? AND room = ?;",
                [groupname, room],
                (err: Error, results: any) => {
                  if (err) return next(new ErrorHandler(err.message, 500));
                  else {
                    if (results.length == 0)
                      return next(new ErrorHandler("Server Error!", 500));
                    const groupId = results[0].id;
                    // @ts-expect-error -> INSERT INTO GROUP MEMBERS TABLE
                    db.execute(
                      "INSERT INTO group_members (member, `group`) VALUES (?, ?);",
                      [adminId, groupId],
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
  );
};

export const joinGroupHandler = async (req: any, res: any, next: any) => {
  const body = req.body;
  const details: detailsArray = body.details;
  const groupname = body.group as string;

  // @ts-expect-error -> GET THE GROUP ID
  db.execute(
    "SELECT id FROM `groups` WHERE groupname = ?;",
    [groupname],
    (err: Error, results: any) => {
      if (err) return next(new ErrorHandler(err.message, 500));
      else {
        if (results.length == 0)
          return next(
            new ErrorHandler(`Invalid group_name:${groupname}!`, 400)
          );
        const groupId = results[0].id;
        details.forEach((value, index) => {
          // @ts-expect-error -> GET THE USER ID
          db.execute(
            "SELECT id FROM users WHERE email = ?;",
            [value.email],
            (err: Error, results: any) => {
              if (err) return next(new ErrorHandler(err.message, 500));
              else {
                if (results.length == 0)
                  return next(
                    new ErrorHandler(`Invalid email: ${value.email}!`, 500)
                  );
                const userId = results[0].id;
                // @ts-expect-error -> INSERT INTO THE GROUP MEMBERS TABLE
                db.execute(
                  "INSERT INTO group_members (member, `group`) VALUES (?, ?);",
                  [userId, groupId],
                  (err: Error, results: any) => {
                    if (err) return next(new ErrorHandler(err.message, 500));
                    else {
                      if (index == details.length - 1)
                        res.status(200).json({ result: "Success" });
                    }
                  }
                );
              }
            }
          );
        });
      }
    }
  );
};

export const getGroupsHandler = async (req: any, res: any, next: any) => {
  const email = req.headers.email;

  // @ts-expect-error
  db.execute(
    "SELECT id FROM users WHERE email = ?;",
    [email],
    (err: Error, results: any) => {
      if (err) return next(new ErrorHandler(err.message, 500));
      else {
        if (results.length == 0)
          return next(new ErrorHandler(`Invalid email: ${email}!`, 400));
        const userId = results[0].id;
        // @ts-expect-error
        db.execute(
          "SELECT DISTINCT `groups`.`groupname`, `groups`.`room` FROM `groups` INNER JOIN group_members ON groups.id = group_members.`group` WHERE group_members.member = ?;",
          [userId],
          (err: Error, results: any) => {
            if (err) return next(new ErrorHandler(err.message, 500));
            else if (results[0].groupMember == null || undefined)
              return res.status(200).send(results);
            else res.status(200).send(results);
          }
        );
      }
    }
  );
};

export const sendGroupMessageHandler = async (
  req: any,
  res: any,
  next: any
) => {
  const email = req.headers.email as string;
  const body = req.body;
  const message = body.message as string;
  const room = body.room as string;

  const timestamp = TimeStamp();

  // @ts-expect-error -> GET USER ID
  db.execute(
    "SELECT id FROM users WHERE email = ?;",
    [email],
    (err: Error, results: any) => {
      if (err) return next(new ErrorHandler(err.message, 500));
      else {
        if (results.length == 0)
          return next(new ErrorHandler(`Invalid email: ${email}`, 400));
        const userId = results[0].id;
        // @ts-expect-error -> GET GROUP ID
        db.execute(
          "SELECT id FROM `groups` WHERE room = ?;",
          [room],
          (err: Error, results: any) => {
            if (err) return next(new ErrorHandler(err.message, 500));
            else {
              if (results.length == 0)
                return next(new ErrorHandler(`Invalid room: ${room}`, 400));
              const groupId = results[0].id;
              // @ts-expect-error -> INSERT INTO GROUP MESSAGES TABLE
              db.execute(
                "INSERT INTO group_messages (user, `group`, timestamp, message) VALUES (?, ?, ?, ?);",
                [userId, groupId, timestamp, message],
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
      }
    }
  );
};

export const getGroupMessageHandler = async (req: any, res: any, next: any) => {
  const room = req.headers.room;

  // @ts-expect-error
  db.execute(
    "SELECT id FROM `groups` WHERE room = ?;",
    [room],
    (err: Error, results: any) => {
      if (err) return next(new ErrorHandler(err.message, 500));
      else {
        if (results.length == 0)
          return next(new ErrorHandler(`Invalid room:${room}`, 400));
        const groupId = results[0].id;
        // @ts-expect-error
        db.execute(
          `SELECT users.username, group_messages.message FROM users INNER JOIN group_messages 
           ON users.id = group_messages.user 
           WHERE group_messages.group = ? ORDER BY group_messages.id;`,
          [groupId],
          (err: Error, results: any) => {
            if (err) return next(new ErrorHandler(err.message, 500));
            else {
              res.status(200).json(results);
            }
          }
        );
      }
    }
  );
};
