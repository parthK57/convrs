import connectionPool from "../database/db";
import { Decrypter } from "../Services/Bcrypt";
import ErrorHandler from "../Services/ErrorHandler";

const db = connectionPool;

const AccountVerifier = async (req: any, res: any, next: any) => {
  const header = req.headers;
  const email = header.email as string;
  const password = header.password as string;

  // @ts-expect-error
  db.execute(
    "SELECT password FROM users WHERE email = ?;",
    [email],
    async (err: Error, results: any) => {
      if (err) return next(new ErrorHandler(err.message, 400));
      else {
        if (results.length == 0)
          return next(new ErrorHandler("User not found!", 404));
        const verifiedStatus = await Decrypter(password, results[0].password);
        if (verifiedStatus) next();
        else res.status(401).send("Invalid password!");
      }
    }
  );
};

export default AccountVerifier;
