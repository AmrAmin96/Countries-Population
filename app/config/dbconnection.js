const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  port: 3306,
});

//connect to database
connection.connect((err) => {
  if (err) throw err;
  console.log("Mysql Connected...");
});

module.exports = connection;
