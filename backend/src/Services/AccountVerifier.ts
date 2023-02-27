import connectionPool from "../database/db";
import { Decrypter } from "../Services/Bcrypt";
import ErrorHandler from "../Services/ErrorHandler";

const db = connectionPool;

const AccountVerifier = async (req: any, res: any, next: any) => {
  const header = req.headers;
  const email = header.email as string;
  const password = header.password as string;

  try {
    const [userData] = (await db.execute(
      "SELECT password FROM users WHERE email = ?;",
      [email]
    )) as any;
    if (userData.length == 0)
      return next(new ErrorHandler("User not found!", 404));

    const verifiedStatus = await Decrypter(password, userData[0].password);
    if (verifiedStatus) next();
    else return res.status(401).send("Invalid password!");
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
};

export default AccountVerifier;
