// ########################################
// ########## SETUP

// Database
const db = require('./database/db-connector');

// Express
const express = require('express');
const app = express();

// Middleware
const cors = require('cors');
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json()); // this is needed for post requests


const PORT = 60000;

// ########################################
// ########## ROUTE HANDLERS

// READ ROUTES
app.get('/artists', async (req, res) => {
    try {
        // Create and execute our queries
        // In query1, use a JOIN clause to display the names of the managers
        const query1 = `SELECT Artists.artist_id, Managers.name AS 'Manager', Artists.name AS 'Name', \
            Artists.phone_number AS 'Phone Number', Artists.email AS 'Email' FROM Artists \
            LEFT JOIN Managers ON Artists.manager_ID = Managers.manager_ID;`;
        const query2 = 'SELECT * FROM Managers;';
        const [artists] = await db.query(query1);
        const [managers] = await db.query(query2);
    
        res.status(200).json({ artists, managers });  // Send the results to the frontend

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
    
})
app.get('/managers', async (req, res) => {
    try {
        // Create and execute our queries
        // In query1, display the managers table
        const query1 = `SELECT Managers.manager_ID, name AS 'Name', phone_number AS 'Phone Number', email AS 'Email'
            FROM Managers`;
        const [managers] = await db.query(query1);

        res.status(200).json({ managers });  // Send the results to the frontend

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
    
})
app.get('/rooms', async (req, res) => {
    try {
        // Create and execute our queries
        // In query1, display the rooms table
        const query1 = `SELECT Rooms.room_ID, square_footage AS 'Square Footage', floor AS 'Floor'
            FROM Rooms`;
        const [rooms] = await db.query(query1);

        res.status(200).json({ rooms });  // Send the results to the frontend

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
    
});

app.get('/invoices', async (req, res) => {
    try {
        // Create and execute our queries
        // In query1, display the rooms table
        const query1 = `SELECT Invoices.invoice_ID, Recording_Sessions_has_Artists.artist_id, Invoices.session_ID, Invoices.session_cost AS 'Cost', Invoices.invoice_paid AS 'Paid?'
            FROM Invoices
            JOIN Recording_Sessions ON Invoices.session_ID = Recording_Sessions.session_ID
            JOIN Recording_Sessions_has_Artists ON Recording_Sessions.session_ID = Recording_Sessions_has_Artists.session_ID;`;
        const query2 = 'SELECT * FROM Recording_Sessions;';
        const [invoices] = await db.query(query1);
        const [recording_sessions] = await db.query(query2);

        res.status(200).json({ invoices, recording_sessions });  // Send the results to the frontend

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
    
});

app.get('/recording_sessions', async (req, res) => {
    try {
        // Create and execute our queries
        // In query1, display the rooms table
        const query1 = `SELECT Recording_Sessions.session_ID, Recording_Sessions_has_Artists.artist_ID, Recording_Sessions.room_ID, Recording_Sessions.duration AS 'Duration'
            FROM Recording_Sessions
            JOIN Recording_Sessions_has_Artists ON Recording_Sessions.session_ID = Recording_Sessions_has_Artists.artist_ID;`;
        const query2 = 'SELECT * FROM Rooms;';
        const [recording_sessions] = await db.query(query1);
        const [rooms] = await db.query(query2);

        res.status(200).json({ recording_sessions, rooms });  // Send the results to the frontend

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
    
});

app.get('/recording_sessions_has_artists', async (req, res) => {
    try {
        // Create and execute our queries
        // In query1, display the rooms table
        const query1 = `SELECT recording_sessions_has_artists_ID, session_ID, artist_ID
            FROM Recording_Sessions_has_Artists;`;
        const query2 = 'SELECT * FROM Recording_Sessions;';
        const query3 = 'SELECT * FROM Artists;';
        const [recording_sessions_has_artists] = await db.query(query1);
        const [recording_sessions] = await db.query(query2);
        const [artists] = await db.query(query3);

        res.status(200).json({ recording_sessions_has_artists, recording_sessions, artists });  // Send the results to the frontend

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
    
});

// ########################################
// ########## LISTENER

app.listen(PORT, function () {
    console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
});
