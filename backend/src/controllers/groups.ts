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

  try {
    const [userData] = (await db.execute(
      "SELECT id FROM users WHERE email = ?;",
      [email]
    )) as any;
    // CHECK EMAIL VALIDITY
    if (userData.length == 0)
      return next(new ErrorHandler(`Invalid email: ${email}`, 400));
    const adminId = userData[0].id;

    // INSERT INTO GROUPS TABLE
    await db.execute(
      "INSERT INTO `groups` (groupname, room, admin, timestamp) VALUES (?, ?, ?, ?);",
      [groupname, room, adminId, timestamp]
    );

    // GET THE NEW GROUP'S ID TO CROSS-CHECK SUCCESSFULL CREATION OF THE GROUP
    const [groupData] = (await db.execute(
      "SELECT id FROM `groups` WHERE groupname = ? AND room = ?;",
      [groupname, room]
    )) as any;
    // CROSS CHECK INSERTION
    if (groupData.length == 0)
      return next(new ErrorHandler("Something went wrong!", 500));
    const groupId = groupData[0].id;

    // ADD THE ADIMIN HIMSELF/HERSLEF INTO THE GROUP
    await db.execute(
      "INSERT INTO group_members (member, `group`) VALUES (?, ?);",
      [adminId, groupId]
    );
    res.status(201).json({ result: "Success" });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
};

export const joinGroupHandler = async (req: any, res: any, next: any) => {
  const body = req.body;
  const email = req.headers.email as string;
  const details: detailsArray = body.details;
  const groupname = body.group as string;

  try {
    const [userData] = (await db.execute(
      "SELECT id FROM users WHERE email = ?;",
      [email]
    )) as any;
    const userId = userData[0].id;

    // GET GROUP DETAILS
    const [groupDetails] = (await db.execute(
      "SELECT id, admin FROM `groups` WHERE groupname = ?;",
      [groupname]
    )) as any;
    if (groupDetails.length == 0)
      return next(new ErrorHandler(`Invalid groupname: ${groupname}`, 400));
    const groupAdmin = groupDetails[0].admin;
    // VERIFY GROUP OWNERSHIP
    if (userId != groupAdmin)
      return next(new ErrorHandler("Only admins can add group members!", 401));
    const groupId = groupDetails[0].id;

    details.forEach(async (value, index) => {
      // VALIDATING EMAILS OF THE NEW MEMBERS
      const [userData] = (await db.execute(
        "SELECT id FROM users WHERE email = ?;",
        [value.email]
      )) as any;
      if (userData.length == 0)
        return next(new ErrorHandler(`Invalid email: ${value.email}`, 400));
      const userId = userData[0].id;

      // CHECK WHETHER THE USER IS ALREADY A MEMBER OF THE GROUP
      const [groupMembership] = (await db.execute(
        "SELECT id FROM group_members WHERE member = ? AND `group` = ?;",
        [userId, groupId]
      )) as any;
      if (groupMembership.length != 0)
        return next(new ErrorHandler("Cannot add user twice!", 400));

      // INSERT INTO THE GROUP MEMBERS TABLE
      await db.execute(
        "INSERT INTO group_members (member, `group`) VALUES (?, ?);",
        [userId, groupId]
      );

      // CHECK THE LAST ENTRY AND SUBMIT THE RESULT
      if (index == details.length - 1)
        res.status(200).json({ result: "Success" });
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
};

export const getGroupsHandler = async (req: any, res: any, next: any) => {
  const email = req.headers.email as string;

  try {
    // GET THE USER ID
    const [userData] = (await db.execute(
      "SELECT id FROM users WHERE email = ?;",
      [email]
    )) as any;
    if (userData.length == 0)
      return next(new ErrorHandler(`Invalid email: ${email}`, 400));
    const userId = userData[0].id;

    // GET THE GROUPS ASSOCIATED WITH THIS USER
    const [groups] = (await db.execute(
      "SELECT DISTINCT `groups`.`groupname`, `groups`.`room` FROM `groups` INNER JOIN group_members ON groups.id = group_members.`group` WHERE group_members.member = ?;",
      [userId]
    )) as any;
    res.status(200).send(groups);
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
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

  try {
    const [userData] = (await db.execute(
      "SELECT id FROM users WHERE email = ?;",
      [email]
    )) as any;
    // CHECK EMAIL VALIDITY
    if (userData.length == 0)
      return next(new ErrorHandler(`Invalid email: ${email}`, 400));
    const userId = userData[0].id;

    // GET GROUP ID
    const [groupDetails] = (await db.execute(
      "SELECT id FROM `groups` WHERE room = ?;",
      [room]
    )) as any;
    // CROSS-CHECK GROUP NAME
    if (groupDetails.length == 0)
      return next(new ErrorHandler(`Invalid group name: ${room}`, 400));
    const groupId = groupDetails[0].id;

    // INSERT MSG INTO GROUP MESSAGES TABLE
    await db.execute(
      "INSERT INTO group_messages (user, `group`, timestamp, message) VALUES (?, ?, ?, ?);",
      [userId, groupId, timestamp, message]
    );
    res.status(200).json({ result: "Success" });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
};

export const getGroupMessageHandler = async (req: any, res: any, next: any) => {
  const room = req.headers.room as string;

  try {
    // GET GROUP DATA
    const [groupData] = (await db.execute(
      "SELECT id FROM `groups` WHERE room = ?;",
      [room]
    )) as any;
    // CHECK ROOM VALIDITY
    if (groupData.length == 0)
      return next(new ErrorHandler(`Invalid group room: ${room}`, 400));
    const groupId = groupData[0].id;

    // GET GROUP MESSAGES
    const [groupMessages] = (await db.execute(
      `SELECT users.username, group_messages.message FROM users INNER JOIN group_messages 
      ON users.id = group_messages.user 
      WHERE group_messages.group = ? ORDER BY group_messages.id;`,
      [groupId]
    )) as any;
    res.status(200).json(groupMessages);
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
};

export const removeMemberHandler = async (req: any, res: any, next: any) => {
  const header = req.headers;
  const email = header.email as string;
  const kick = header.kick as string; // Username of the person who's getting kicked
  const groupname = header.groupname as string;

  try {
    const [groupDetails] = (await db.execute(
      "SELECT id, admin FROM `groups` WHERE groupname = ?;",
      [groupname]
    )) as any;
    // CHECK GROUPNAME VALIDITY
    if (groupDetails.length == 0)
      return next(new ErrorHandler(`Invalid group name: ${groupname}`, 400));
    const groupId = groupDetails[0].id;
    const groupAdmin = groupDetails[0].admin;

    // GET USER DETAILS TO VERIFY GROUP OWNERSHIP
    const [userData] = (await db.execute(
      "SELECT id FROM users WHERE email = ?;",
      [email]
    )) as any;
    const userId = userData[0].id;
    if (groupAdmin != userId)
      return next(new ErrorHandler("Only admins can kick members!", 400));

    // GET KICK ID
    const [kickDetails] = (await db.execute(
      "SELECT id FROM users WHERE username = ?;",
      [kick]
    )) as any;
    // VERIFY EMAIL OF THE KICKED REQ
    if (kickDetails.length == 0)
      return next(new ErrorHandler(`Invalid username: ${kick}`, 400));
    const kickId = kickDetails[0].id;

    // EXECUTE THE KICK
    await db.execute(
      "DELETE FROM group_members WHERE `group` = ? AND member = ?;",
      [groupId, kickId]
    );
    res.status(200).json({ result: "Success" });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
};
