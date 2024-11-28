const express = require("express");
const cors = require("cors");
const mysql = require('mysql2');

const app = express();
const PORT = 5000;

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',          
    password: '',         
    database: 'crudapp' 
});

// Middleware
app.use(cors());
app.use(express.json());

// Sample Data (Simulating Dropdown Data)
const dropdownData = [
    { 
        id: 1, 
        itemCode: "INV001", 
        itemDec: "Paid", 
        itemTechDec: "test1",
        identQty: 4,
        rate: 1000,
        amount: 5000
    },
    {
        id: 1,
        itemCode: "INV001",
        itemDec: "Paid",
        itemTechDec: "test1",
        identQty: 4,
        rate: 1000,
        amount: 5000
    },
    {
        id: 1,
        itemCode: "INV001",
        itemDec: "Paid",
        itemTechDec: "test1",
        identQty: 4,
        rate: 1000,
        amount: 5000
    },
    {
        id: 1,
        itemCode: "INV001",
        itemDec: "Paid",
        itemTechDec: "test1",
        identQty: 4,
        rate: 1000,
        amount: 5000
    }
];

// Routes
app.get("/api/fetchTableData", (req, res) => {

    db.getConnection((error, connection) => {
        if (error) {

            console.error('Database connection error:', error);
            return res.status(500).send({
                ResponseCode: 500,
                ResponseMsg: `Database connection error`,
                error: error.message
            });
        }


        const query = `SELECT * FROM items`;

    
        connection.query(query, (queryError, result) => {
            // Release the connection back to the pool
            connection.release();

            if (queryError) {
                console.error('Query execution error:', queryError);
                return res.status(500).send({
                    ResponseCode: 500,
                    ResponseMsg: `Query execution error`,
                    error: queryError.message
                });
            }

            return res.status(200).send({
                ResponseCode: 200,
                ResponseMsg: `Data fetched successfully`,
                data: result
            });
        });
    });
});

app.delete("/api/delete/:id", (req, res) => {
    const itemId = req.params.id;

    if (!itemId || isNaN(itemId)) {
        return res.status(200).send({
            ResponseCode: 400,
            ResponseMsg: 'Invalid ID provided'
        });
    }

    db.getConnection((error, connection) => {
        if (error) {

            return res.status(200).send({
                ResponseCode: 500,
                ResponseMsg: 'Database connection error',

            });
        }

        // SQL query to delete the item from the `items` table by id
        const query = `DELETE FROM items WHERE id = ?`;

        // Execute the delete query
        connection.query(query, [itemId], (queryError, result) => {
            // Release the connection back to the pool
            connection.release();

            if (queryError) {
  
                return res.status(200).send({
                    ResponseCode: 500,
                    ResponseMsg: 'Error deleting item',
                });
            }

            // Check if any rows were affected
            if (result.affectedRows === 0) {
                return res.status(200).send({
                    ResponseCode: 404,
                    ResponseMsg: 'Item not found with the given ID'
                });
            }

            // If deletion is successful, return a success response
            return res.status(200).send({
                ResponseCode: 200,
                ResponseMsg: 'Item deleted successfully',
            });
        });
    });
});

app.post("/api/add", (req, res) => {
    const { itemDesc } = req.body;

    console.log("itemDesc from server:", itemDesc);

    // Open a connection to the database
    db.getConnection((error, connection) => {
        if (error) {
            return res.status(500).send({
                ResponseCode: 500,
                ResponseMsg: 'Database Connection Error'
            });
        }

        // Define the insert query
        const query = `INSERT INTO items (itemCode, itemDec, itemTechDec, identQty, rate, amount) VALUES (?, ?, ?, ?, ?, ?)`;

        // Generate random data
        const randomItemCode = "INV" + Math.floor(Math.random() * 10000); // Random Item Code
        const randomItemTechDesc = "Tech Desc " + Math.floor(Math.random() * 100); // Random Tech Description
        const randomIdentQty = Math.floor(Math.random() * 100) + 1; // Random Quantity between 1 and 100
        const randomRate = Math.floor(Math.random() * 500) + 1; // Random Rate between 1 and 500
        const randomAmount = randomIdentQty * randomRate; // Amount is calculated based on quantity and rate

        const values = [randomItemCode, itemDesc, randomItemTechDesc, randomIdentQty, randomRate, randomAmount];

        // Execute the query
        connection.query(query, values, (error, result) => {
            if (error) {
                console.error("Query Execution Error:", error);
                return res.status(500).send({
                    ResponseCode: 500,
                    ResponseMsg: 'Query Execution Error'
                });
            }

            // If the insertion is successful
            return res.status(200).send({
                ResponseCode: 200,
                ResponseMsg: 'Item added successfully',
                insertedId: result.insertId, // Send back the inserted item ID
            });
        });
    });
});

app.post("/api/update", (req, res) => {
    const { id, field, value } = req.body;

    const query = `UPDATE items SET ${field} = ? WHERE id = ?`;
    const values = [value, id];

    db.query(query, values, (err, result) => {
        if (err) {
            return res.status(500).send({
                ResponseCode: 500,
                ResponseMsg: "Database Error",
            });
        }

        return res.status(200).send({
            ResponseCode: 200,
            ResponseMsg: "Item updated successfully",
        });
    });
});


app.get('/api/dropdowns', (req, res) => {
    // Query to fetch all options for each label
    const query = `
    SELECT l.label, 
           o.option1, 
           o.option2, 
           o.option3, 
           o.option4
    FROM label_options o
    JOIN labels l ON o.label = l.label;
  `;

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database query failed', error: err });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'No options found for any labels' });
        }

        // Group the results by label
        const dropdownData = results.reduce((acc, row) => {
            const { label, option1, option2, option3, option4 } = row;
            if (!acc[label]) {
                acc[label] = {
                    label,
                    options: []
                };
            }
            // Push the options for the current label
            acc[label].options.push({ option1, option2, option3, option4 });
            return acc;
        }, {});

        // Send the grouped data as response
        res.json(Object.values(dropdownData)); // Convert object to array for response
    });
});



// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
