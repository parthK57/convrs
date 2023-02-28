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

  try {
    const [friendData] = (await db.execute(
      "SELECT id FROM users WHERE username = ? AND email = ?;",
      [friendUsername, friendEmail]
    )) as any;
    // CHECK WHETHER THE FRIEND EXISTS OR NOT IN THE DB
    if (friendData.length == 0)
      return next(new ErrorHandler("Invalid data!", 400));
    const friendId = friendData[0].id as string;

    // GET USER ID
    const [userData] = (await db.execute(
      "SELECT id FROM users WHERE username = ? AND email = ?;",
      [username, email]
    )) as any;
    const userId = userData[0].id;

    // CHECK FRIENDSHIP STATUS
    const [friendShipStatus] = (await db.execute(
      "SELECT id FROM friends WHERE user1 = ? AND user2 = ? OR user1 = ? AND user2 = ?;",
      [userId, friendId, friendId, userId]
    )) as any;
    if (friendShipStatus.length > 0)
      return next(new ErrorHandler("Cannot add user as a friend twice!", 400));

    // ADD AS A FRIEND
    await db.execute(
      "INSERT INTO friends (user1, user2, room, timestamp) VALUES (?,?,?,?);",
      [userId, friendId, UUID, timestamp]
    );
    res.status(201).json({ result: "Success" });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
};

export const removeFriendHandler = async (req: any, res: any, next: any) => {
  const header = req.headers;
  const username = header.username as string;
  const friendUsername = header.friendusername as string;

  try {
    // GET IDS
    const [data] = (await db.execute(
      "SELECT id, username FROM users WHERE username = ? OR username = ?;",
      [username, friendUsername]
    )) as any;
    if (data.length == 0) return next(new ErrorHandler("Invalid data!", 400));
    const id1 = data[0].id;
    const id2 = data[1].id;

    // REMOVE THE FRIENDS ENTRY FROM THE FRIENDS TABLE
    await db.execute(
      "DELETE FROM friends WHERE user1 = ? AND user2 = ? OR user1 = ? AND user2 = ?;",
      [id1, id2, id2, id1]
    );
    res.status(200).json({ result: "Success" });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
};

export const getFriendsHandler = async (req: any, res: any, next: any) => {
  const email = req.headers.email as string;

  try {
    const [userData] = (await db.execute(
      "SELECT id FROM users WHERE email = ?;",
      [email]
    )) as any;
    const userId = userData[0].id;

    // GET FRIENDS ASSOCIATED WITH THIS ID
    const [friendsData] = (await db.execute(
      `SELECT DISTINCT username, room FROM users INNER JOIN friends
      ON users.id = friends.user1 OR users.id = friends.user2
      WHERE friends.user1 = ? AND users.id != ?
      OR friends.user2 = ? AND users.id != ?;`,
      [userId, userId, userId, userId]
    )) as any;
    if (friendsData.length == 0)
      return next(new ErrorHandler("You have no friends!", 400));
    res.status(200).json(friendsData);
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
};
