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
            connection.release();
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
            connection.release();
        })
    }
    )
})

app.post('/salesovertime', (req, res) => { // TODO HAVDOO
    const store_id = req.body.store_id;
    const sales_over_time = `SELECT 
                date,
                SUM(amount) AS total_sales
            FROM
                purchase
            WHERE
                store_id = ?
            GROUP BY
                date
            ORDER BY
                date`
        ;

    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Error connecting to the database:", err);
            return res.status(500).json({ error: "Database connection error" });
        }
        else {
            console.log("Database connection successful");
        }

        connection.query(sales_over_time, [store_id], (err, rows) => {
            if (err) {
                console.log("Error:", err);
                res.status(500).json({ error: "Database query error" });
            } else if (rows.length > 0) {
                console.log("Success");
                res.json({ rows: rows });
            } else {
                console.log(err);
            }
        })
        connection.release();
    }
    )
})

// aggregate functions - 1
// set operations
// join 
// procedure
// trigger
// create alerts table, can create a trigger to add an alert for low inventory
// TODO: 
//! make function

app.post('/analytics_data', (req, res) => {
    const store_id = req.body.store_id;

    // Define SQL queries for each type of analytics data
    const top_customers_query = `SELECT c.customer_name,
        COUNT(p.purchase_id) AS number_of_purchases,
        SUM(p.amount) AS total_amount_spent
        FROM
            customer AS c
        JOIN
            purchase AS p ON c.customer_id = p.customer_id AND p.store_id = ?
        WHERE
            p.date >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)
        GROUP BY
            c.customer_name
        ORDER BY
            number_of_purchases DESC
        LIMIT 10`;
    const top_selling_items_query = `SELECT
            i.name AS item_name,
            i.brand,
            i.type,
            SUM(pi.quantity) AS total_quantity_sold
        FROM
            purchase_items AS pi
        JOIN
            items AS i ON pi.item_id = i.item_id
        WHERE
            pi.purchase_id IN (
                SELECT p.purchase_id
                FROM purchase AS p
                WHERE p.date >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)
                AND p.store_id = ?
            )
        GROUP BY
            i.name, i.brand, i.type
        ORDER BY
            total_quantity_sold DESC
        LIMIT 10`;
    const items_unsold_last_year = `
SELECT i.item_id, i.name, i.brand, i.type
FROM purchase_items AS pi
JOIN purchase AS p ON pi.purchase_id = p.purchase_id
JOIN items AS i ON pi.item_id = i.item_id
WHERE EXTRACT(YEAR FROM p.date) = EXTRACT(YEAR FROM CURRENT_DATE) - 1
AND pi.quantity < 1

UNION

SELECT i.item_id, i.name, i.brand, i.type
FROM purchase_items AS pi
JOIN purchase AS p ON pi.purchase_id = p.purchase_id
JOIN items AS i ON pi.item_id = i.item_id
WHERE EXTRACT(YEAR FROM p.date) = EXTRACT(YEAR FROM CURRENT_DATE)
AND pi.quantity >= 1;
        `;

    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Error connecting to the database:", err);
            return res.status(500).json({ error: "Database connection error" });
        } else {
            console.log("Database connection successful");
        }

        // Execute each query in sequence
        connection.query(top_customers_query, [store_id], (err1, rows1) => {
            if (err1) {
                console.log("Error (top customers query):", err1);
                return res.status(500).json({ error: "Top customers query error" });
            }

            connection.query(top_selling_items_query, [store_id], (err2, rows2) => {
                if (err2) {
                    console.log("Error (top selling items query):", err2);
                    return res.status(500).json({ error: "Top selling items query error" });
                }
                connection.query(items_unsold_last_year, [store_id], (err4, rows4) => {
                    if (err4) {
                        console.log("Error (least selling items query):", err4);
                        return res.status(500).json({ error: "Least selling items query error" });
                    }

                    // All queries executed successfully
                    const responseData = {
                        topCustomers: rows1,
                        topSellingItems: rows2,
                        leastSellingItems: rows4,
                    };
                    console.log(responseData);
                    res.json(responseData);
                    connection.release(); // Release the connection here
                });
            });
        });
    });
});


app.get('/store-ids', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Error connecting to the database:", err);
            return res.status(500).json({ error: "Database connection error" });
        } else {
            console.log("Database connection successful for get request");
        }

        const query = 'SELECT DISTINCT store_id FROM store';

        connection.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching store_ids:', err);
                res.status(500).json({ error: 'Failed to fetch store_ids' });
            } else {
                const storeIds = results.map((result) => result.store_id);
                res.json({ storeIds });
            }
        });

        connection.release();
    });
});

app.get('/items-by-store', (req, res) => {
    const { store_id } = req.query;

    if (!store_id) {
        return res.status(400).json({ error: 'Invalid store_id' });
    }

    const query = `
      SELECT si.item_id, items.name, items.brand, si.quantity, items.price
      FROM store_items si
      JOIN items ON si.item_id = items.item_id
      WHERE si.store_id = ?`;

    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Error connecting to the database:", err);
            return res.status(500).json({ error: "Database connection error" });
        }

        connection.query(query, [store_id], (err, results) => {
            if (err) {
                console.error('Error fetching items by store:', err);
                res.status(500).json({ error: 'Failed to fetch items by store' });
            } else {
                const items = results.map((result) => ({
                    item_id: result.item_id,
                    item_name: result.name + ' - ' + result.brand, // Concatenate name and brand
                    quantity: result.quantity,
                    price: result.price,
                }));
                res.json({ items });
            }

            connection.release();
        });
    });
});

app.post('/alerts', (req, res) => {
    const store_id = req.body.store_id;

    const sql = ` 
    SELECT a.alert_id, a.date AS alert_date, a.item_id, i.name, i.brand
    FROM alerts a
    JOIN items i ON a.item_id = i.item_id
    WHERE a.store_id = ?
    ;
    `

    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Error connecting to the database:", err);
            return res.status(500).json({ error: "Database connection error" });
        }
        else {
            console.log("Database connection successful");
        }

        connection.query(sql, [store_id], (err, rows) => {
            if (err) {
                console.log("Error:", err);
                res.status(500).json({ error: "Database query error" });
            } else if (rows.length > 0) {
                console.log("Success");
                console.log(rows);
                res.json({ rows: rows });

            } else {
                console.log(err);
            }
        })
        connection.release();
    }
    )
})

app.post('/order-create', (req, res) => {
    const store_id = req.body.store_id;
    const item_id = req.body.item_id;
    const quantity = req.body.quantity;
    const sql = ` 
    CALL UpdateStoreItemsQuantity(?, ?, ?);
    ;
    `

    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Error connecting to the database:", err);
            return res.status(500).json({ error: "Database connection error" });
        }
        else {
            console.log("Database connection successful");
        }

        connection.query(sql, [store_id, item_id, quantity], (err, rows) => {
            if (err) {
                console.log("Error:", err);
                res.status(500).json({ error: "Database query error" });
            } else if (rows.length > 0) {
                console.log("Success");
                console.log(rows);
                res.json({ rows: rows });

            } else {
                console.log(err);
            }
        })
        connection.release();
    }
    )
})

// API endpoint to fetch orders for a specific store
app.get('/orders', (req, res) => {
    const store_id = req.query.store_id; // Get the store_id from the query parameter

    const query = `
      SELECT order_id, item_id, quantity, date
      FROM orders
      WHERE store_id = ?;
    `;
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Error connecting to the database:", err);
            return res.status(500).json({ error: "Database connection error" });
        }
        else {
            console.log("Database connection successful");
        }

        connection.query(query, [store_id], (err, results) => {
            if (err) {
                console.error('Error executing query: ' + err);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                res.status(200).json(results);
            }
        });
        connection.release()
    });
}
)

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});

