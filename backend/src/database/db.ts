import mysql2 from "mysql2";

const connectionPool = mysql2.createPool({
  database: process.env.DATABASE,
  password: `${process.env.DATABASE_PASSWORD}`,
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
});

export default connectionPool;