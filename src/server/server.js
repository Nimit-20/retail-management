const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
require('dotenv').config()
app.use(cors(corsOptions));

app.use(bodyParser.json());

const pool = mysql.createPool({
  host: "localhost",
  user: "nimit",
  password: "admin",
  database: "Retail_DB",
  port: 3306,
});

app.use(express.json());


app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const retrieve = `SELECT * FROM user WHERE username = ? AND password = ?`

  pool.getConnection((err, connection) => {
    if (err) {
      console.log("Error connecting to the database:", err);
      return res.status(500).json({ error: "Database connection error" });
    }
    
    connection.query(retrieve, [username, password], (err, rows) => {
      if (err) {
        console.log("Error:", err);
        res.status(500).json({ error: "Database query error" });
      } else if (rows.length > 0) {
        console.log("Success");
        console.log(rows);
        res.json({ rows: rows });
      } else {
        console.log("Invalid password");
        res.status(401).json({ message: "Invalid username or password" });
      }
    })
  }
  )
})

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

