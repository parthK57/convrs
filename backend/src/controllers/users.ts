import connectionPool from "../database/db";
import { Decrypter, Encrypter } from "../Services/Bcrypt";
import { loginBody, signUpBody } from "../models/users";
import ErrorHandler from "../Services/ErrorHandler";

const db = connectionPool;

export const signUpHandler = async (req: any, res: any, next: any) => {
  const body: signUpBody = req.body;
  const username = body.username;
  const email = body.email;
  const password = body.password;

  // Password Encryption
  const hashedPassword = await Encrypter(password);

  // @ts-expect-error
  db.execute(
    "INSERT INTO users (username, email, password) VALUES (?,?,?)",
    [username, email, hashedPassword],
    (err: Error, results: any) => {
      if (err) return next(new ErrorHandler(err.message, 500));
      else res.status(201).send("ID created!");
    }
  );
};

export const loginHandler = async (req: any, res: any, next: any) => {
  const body: loginBody = req.body;
  const email = body.email;
  const password = body.password;

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
        if (verifiedStatus) return res.status(200).send("OK!");
        else res.status(401).send("Invalid password!");
      }
    }
  );
};