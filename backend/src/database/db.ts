import mysql from "mysql2/promise";
import bluebird from "bluebird";

const connectionPool = mysql.createPool({
  database: process.env.DATABASE,
  password: `${process.env.DATABASE_PASSWORD}`,
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  Promise: bluebird
});

export default connectionPool;
