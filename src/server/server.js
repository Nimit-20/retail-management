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

    const retrieve = `SELECT * FROM supervisor WHERE username = ? AND password = ?`

    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Error connecting to the database:", err);
            return res.status(500).json({ error: "Database connection error" });
        }
        else {
            console.log("Database connection successful");
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
                res.json({ message: "Invalid username or password" });
            }
        })
    }
    )
})

app.post('/purchases', (req, res) => {
    const store_id = req.body.store_id;
    console.log("Store id: ", store_id);
    const retrieve_store = `SELECT * FROM purchase WHERE store_id = ? ORDER BY date desc, time desc`;

    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Error connecting to the database:", err);
            return res.status(500).json({ error: "Database connection error" });
        }
        else {
            console.log("Database connection successful");
        }

        connection.query(retrieve_store, [store_id], (err, rows) => {
            if (err) {
                console.log("Error:", err);
                res.status(500).json({ error: "Database query error" });
            } else if (rows.length > 0) {
                console.log("Success");
                console.log(rows);
                res.json({ rows: rows });
            } else {
                console.log("Invalid password");
                console.log(rows);
                console.log(err);
            }
        })
    }
    )
})

app.post('/customers', (req, res) => {
    const store_id = req.body.store_id;
    console.log("Store id: ", store_id);
    const retrieve_store = `SELECT * FROM store WHERE store_id = ?`;

    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Error connecting to the database:", err);
            return res.status(500).json({ error: "Database connection error" });
        }
        else {
            console.log("Database connection successful");
        }

        connection.query(retrieve_store, [store_id], (err, rows) => {
            if (err) {
                console.log("Error:", err);
                res.status(500).json({ error: "Database query error" });
            } else if (rows.length > 0) {
                console.log("Success");
                console.log(rows);
                res.json({ rows: rows });
            } else {
                console.log("Invalid password");
                console.log(rows);
                console.log(err);
            }
        })
    }
    )
})

app.post('/employees', (req, res) => {
    const store_id = req.body.store_id;
    const retrieve_store = `SELECT * FROM employee WHERE store_id = ?`;

    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Error connecting to the database:", err);
            return res.status(500).json({ error: "Database connection error" });
        }
        else {
            console.log("Database connection successful");
        }

        connection.query(retrieve_store, [store_id], (err, rows) => {
            if (err) {
                console.log("Error:", err);
                res.status(500).json({ error: "Database query error" });
            } else if (rows.length > 0) {
                console.log("Success");
                console.log(rows);
                res.json({ rows: rows });
            } else {
                console.log("Invalid password");
                console.log(rows);
                console.log(err);
            }
        })
    }
    )
})

app.post('/inventory', (req, res) => {
    console.log(req);
    const store_id = req.body.store_id;
    console.log("Store id inventory: ", store_id);
    const retrieve_store = `SELECT
       items.item_id,
       items.name,
       store_id,
       SUM(quantity) AS total_quantity
   FROM
       items
   JOIN
       store_items ON store_items.item_id = items.item_id
   WHERE
       store_id = ?
   GROUP BY
       items.item_id, items.name, store_id
   ORDER BY items.item_id`;

    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Error connecting to the database:", err);
            return res.status(500).json({ error: "Database connection error" });
        }
        else {
            console.log("Database connection successful");
        }

        connection.query(retrieve_store, [store_id], (err, rows) => {
            if (err) {
                console.log("Error:", err);
                res.status(500).json({ error: "Database query error" });
            } else if (rows.length > 0) {
                console.log("Success");
                console.log(rows);
                res.json({ rows: rows });
            } else {
                console.log("Invalid password");
                console.log(rows);
                console.log(err);
            }
        })
    }
    )
})

app.post('/analytics', (req, res) => { // TODO HAVDOO

    // TODO: 
    //! aggregate functions - 1
    //! set operations
    //? join 
    //! make function
    //! trigger
    //! procedure
    //? create alerts table, can create a trigger to add an alert for low inventory



    const store_id = req.body.store_id;
    const retrieve_store = `SELECT * FROM store WHERE store_id = ?`;

    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Error connecting to the database:", err);
            return res.status(500).json({ error: "Database connection error" });
        }
        else {
            console.log("Database connection successful");
        }

        connection.query(retrieve_store, [store_id], (err, rows) => {
            if (err) {
                console.log("Error:", err);
                res.status(500).json({ error: "Database query error" });
            } else if (rows.length > 0) {
                console.log("Success");
                console.log(rows);
                res.json({ rows: rows });
            } else {
                console.log("Invalid password");
                console.log(rows);
                console.log(err);
            }
        })
    }
    )
})

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});

