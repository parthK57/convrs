import connectionPool from "../database/db";
import { Decrypter, Encrypter } from "../Services/Bcrypt";
import { loginBody, signUpBody } from "../models/users";
import ErrorHandler from "../Services/ErrorHandler";
import TimeStamp from "../Services/TimeStamp";
import sgMail from "@sendgrid/mail";
import UUIDGenerator from "../Services/UUIDGenerator";

const SGAPIKEY = process.env.SENDGRID_API_KEY as string;
sgMail.setApiKey(SGAPIKEY);

const db = connectionPool;

export const signUpHandler = async (req: any, res: any, next: any) => {
  const body: signUpBody = req.body;
  const username = body.username;
  const email = body.email;
  const password = body.password;

  // Password Encryption
  const hashedPassword = await Encrypter(password);
  const timestamp = TimeStamp();

  try {
    await db.execute(
      "INSERT INTO users (username, email, password, timestamp) VALUES (?,?,?,?)",
      [username, email, hashedPassword, timestamp]
    );
    res.status(201).json({ result: "success" });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
};

export const loginHandler = async (req: any, res: any, next: any) => {
  const body: loginBody = req.body;
  const email = body.email;
  const password = body.password;

  try {
    const [userData] = (await db.execute(
      "SELECT password, username FROM users WHERE email = ?;",
      [email]
    )) as any;
    if (userData.length == 0)
      throw new ErrorHandler(`Invalid Email: ${email}`, 404);
    const username = userData[0].username;
    const verifiedStatus = await Decrypter(password, userData[0].password);
    if (verifiedStatus) return res.status(200).json({ username });
    else return res.status(401).send("Invalid password!");
  } catch (error: any) {
    if (error.statusCode) return next(error);
    return next(new ErrorHandler(error.message, 500));
  }
};

export const resetPasswordRequestHandler = async (
  req: any,
  res: any,
  next: any
) => {
  const header = req.headers;
  const email = header.email as string;

  const UUID = UUIDGenerator();
  const timestamp = TimeStamp();

  try {
    const [userData] = (await db.execute(
      "SELECT id, username FROM users WHERE email = ?;",
      [email]
    )) as any;
    // IF EMAIL IS INVALID
    if (userData.length == 0)
      return next(new ErrorHandler(`Invalid Email: ${email}`, 400));

    const userId = userData[0].id;
    const username = userData[0].username;
    const msg = {
      to: email,
      from: `${process.env.SENDGRID_EMAIL}`,
      subject: "Reset your password.",
      html: `
              <h1>Hello ${username}!</h1>
              <h4>Click on the button to reset your password!</h4>
              <button id="reset-password"><a href="http://localhost:4000/users/reset/form?id=${userId}">Reset Password</a></button>
            `,
    };
    const response = await sgMail.send(msg);
    if (
      response[0].statusCode == 200 ||
      response[0].statusCode == 201 ||
      response[0].statusCode == 202
    ) {
      await db.execute(
        "INSERT INTO password_recovery (`user`, uuid, `timestamp`, active) VALUES (?, ?, ?, ?);",
        [userId, UUID, timestamp, 1]
      );
      return res.status(200).json({ request: "Approved!" });
    }
  } catch (error: any) {
    if (error.statusCode) return next(error);
    return next(new ErrorHandler(error.message, 500));
  }
};

export const resetPasswordFormHandler = async (
  req: any,
  res: any,
  next: any
) => {
  const userId = req.query.id as string;

  try {
    const [userData] = (await db.execute(
      "SELECT id FROM password_recovery WHERE `user` = ?;",
      [userId]
    )) as any;
    // CHECK FOR PASSWORD RESET REQUEST ENTRY
    if (userData.length == 0)
      return next(new ErrorHandler("Session Expired!", 400));
    else {
      res.send(`<html>
                  <link
                  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
                  rel="stylesheet"
                  integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
                  crossorigin="anonymous"
                  />
                  <style>
                  #navbar {
                    background-color: #f7f5f5;
                  }
                  form {
                    color: #1c2321 !important;
                    border-radius: 20px;
                    background-color: #f7f5f5;
                    box-shadow: 10px 21px 56px -8px rgba(214, 214, 214, 1);
                  }
                  </style>
                  <script>
                      function formsubmitted(e){
                          e.preventDefault();
                          console.log('called')
                      }
                  </script>
                  <nav class="navbar navbar-expand-lg" id="navbar">
                    <div class="container-fluid">
                      <a class="navbar-brand" href="">convrs</a>
                    </div>
                  </div>
                  </nav>
                  <div
                  class="container d-flex flex-column align-items-center justify-content-center mt-5"
                  >
                  <form action="/users/reset/form/process" autocomplete="off" class="p-5" method="get">
                  <div
                  class="mb-3 d-flex justify-content-center align-content-center"
                  style="font-size: 25px; border-bottom: 1px solid black"
                  >
                    Details
                  </div>
                  <div class="mb-3">
                    <label for="email" class="form-label">Email:</label>
                    <input name="email" type="email" class="form-control" required></input>
                  </div>
                  <div class="mb-3">
                    <label for="newpassword" class="form-label">New Password:</label>
                    <input name="newpassword" type="password" class="form-control" required></input>
                  </div>
                  <button type="submit" class="btn btn-success">
                    Reset Password
                  </button>
                  </form>
                  </div>
              </html>`);
      res.end();
    }
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
};

export const resetPasswordFormProcessHandler = async (
  req: any,
  res: any,
  next: any
) => {
  const email = req.query.email;
  const password = req.query.newpassword;

  try {
    const [userData] = (await db.execute(
      "SELECT id FROM users WHERE email = ?;",
      [email]
    )) as any;
    // CHECK EMAIL VALIDITY
    if (userData.length == 0)
      return next(new ErrorHandler("Invalid Email!", 404));
    const userId = userData[0].id as string;
    const hashedPassword = await Encrypter(password);

    // UPDATE PASSWORD
    await db.execute("UPDATE users SET password = ? WHERE id = ?;", [
      hashedPassword,
      userId,
    ]);

    // DELETE PASSWORD RESET SESSION
    await db.execute("DELETE FROM password_recovery WHERE `user` = ?;", [
      userId,
    ]);
    res.status(200).send(`
                <html>
                  <link
                  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
                  rel="stylesheet"
                  ntegrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
                  crossorigin="anonymous"
                  />
                  <style>
                    #navbar {
                      background-color: #f7f5f5;
                    }
                    h1{
                      color: green;
                    }
                  </style>
                  <nav class="navbar navbar-expand-lg" id="navbar">
                    <div class="container-fluid">
                      <a class="navbar-brand" href="">convrs</a>
                    </div>
                  </nav>
                  <div
                  class="container d-flex flex-column align-items-center justify-content-center mt-5"
                  >
                    <h1>SUCCUESS!</h1>
                  </div>
                </html>
                `);
    res.end();
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
};
