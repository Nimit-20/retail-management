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
// Use body-parser middleware to parse JSON data
app.use(bodyParser.json());

// var connection = mysql.createConnection({
//   host: "localhost",
//   user: "nimit",
//   password: "admin",
//   database: "Retail_DB",
//   port: 3306,
// });

const pool = mysql.createPool({
  host: "localhost",
  user: "nimit",
  password: "admin",
  database: "Retail_DB",
  port: 3306,
});

// connection.connect((err) => {
//   if (err) {
//     console.error("Error connecting to the database:", err);
//     return;
//   }
//   console.log("Connected to MySQL database");
// });

pool.on('connection', function (connection) {
  assert.ok(connection);
  done();
 });



app.use(express.json());


app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const retrieve = `SELECT * FROM user WHERE username = ? AND password = ?`

  // connection.query(retrieve, [username, password], (err, rows) => {
  //   if (err) {
  //     console.log("Error");
  //     console.log(err);
  //     res.send({ err: err });
  //   }

  //   else if (rows.length > 0) {
  //     console.log("Success");
  //     console.log(rows);
  //     res.send({ rows: rows });
  //   }
  //   else {
  //     console.log("Invalid password");
  //     res.send({ message: "Invalid username or password" });
  //   }

  //   // Close the database connection when done
  //   connection.end();

  // });

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

