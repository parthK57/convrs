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

  // @ts-expect-error
  db.execute(
    "INSERT INTO users (username, email, password, timestamp) VALUES (?,?,?,?)",
    [username, email, hashedPassword, timestamp],
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
    "SELECT password, username FROM users WHERE email = ?;",
    [email],
    async (err: Error, results: any) => {
      if (err) return next(new ErrorHandler(err.message, 400));
      else {
        if (results.length == 0)
          return next(new ErrorHandler("User not found!", 404));
        const verifiedStatus = await Decrypter(password, results[0].password);
        if (verifiedStatus)
          return res.status(200).json({ username: results[0].username });
        else res.status(401).send("Invalid password!");
      }
    }
  );
};

export const resetPasswordRequestHandler = async (
  req: any,
  res: any,
  next: any
) => {
  const header = req.headers;
  const email = header.email as string;
  const username = header.username as string;

  const UUID = UUIDGenerator();
  const timestamp = TimeStamp();
  // @ts-expect-error -> GET USER ID
  db.execute(
    "SELECT id FROM users WHERE email = ?;",
    [email],
    (err: Error, results: any) => {
      if (err) return next(new ErrorHandler(err.message, 500));
      else {
        const userId = results[0].id;
        const msg = {
          to: email,
          from: "parth.dev5757@gmail.com",
          subject: "Reset your password.",
          html: `
              <h1>Hello ${username}!</h1>
              <h4>Click on the button to reset your password!</h4>
              <button id="reset-password"><a href="http://localhost:4000/users/reset/form?id=${userId}">Reset Password</a></button>
            `,
        };

        const sendEmail = async () => {
          try {
            const response = await sgMail.send(msg);
            if (
              response[0].statusCode == 200 ||
              response[0].statusCode == 201 ||
              response[0].statusCode == 202
            ) {
              // @ts-expect-error
              db.execute(
                "INSERT INTO password_recovery (`user`, uuid, `timestamp`, active) VALUES (?, ?, ?, ?);",
                [userId, UUID, timestamp, 1],
                (err: Error, results: any) => {
                  if (err) return next(new ErrorHandler(err.message, 500));
                  else {
                    res.status(200).json({ request: "Approved!" });
                  }
                }
              );
            }
          } catch (error: any) {
            console.log(error);
            return next(new ErrorHandler(error.message, 500));
          }
        };
        sendEmail();
      }
    }
  );
};

export const resetPasswordFormHandler = async (
  req: any,
  res: any,
  next: any
) => {
  const userId = req.query.id as string;

  // @ts-expect-error
  db.execute(
    "SELECT id FROM password_recovery WHERE `user` = ?;",
    [userId],
    (err: any, results: any) => {
      if (err) return next(new ErrorHandler(err.message, 500));
      else {
        if (results.length == 0)
          return next(new ErrorHandler("Session Expired!", 400));
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
    }
  );
};

export const resetPasswordFormProcessHandler = async (
  req: any,
  res: any,
  next: any
) => {
  const email = req.query.email;
  const password = req.query.newpassword;

  // @ts-expect-error -> VERIFY EMAIL ID
  db.execute(
    "SELECT id FROM users WHERE email = ?;",
    [email],
    async (err: Error, results: any) => {
      if (err) return next(new ErrorHandler(err.message, 500));
      else {
        if (results.length == 0)
          return next(new ErrorHandler("Invalid Email!", 404));
        const userId = results[0].id as string;
        const hashedPassword = await Encrypter(password);
        // @ts-expect-error
        db.execute(
          "UPDATE users SET password = ? WHERE id = ?;",
          [hashedPassword, userId],
          (err: Error, results: any) => {
            if (err) return next(new ErrorHandler(err.message, 500));
            // @ts-expect-error
            db.execute(
              "DELETE FROM password_recovery WHERE `user` = ?;",
              [userId],
              (err: Error, results: any) => {
                if (err) return next(new ErrorHandler(err.message, 500));
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
              }
            );
          }
        );
      }
    }
  );
};
