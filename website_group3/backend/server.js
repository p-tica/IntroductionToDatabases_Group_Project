// Citation for starter code 
// Date: 06/02/2025
// Code adapted from the bsg files from Exploration - Web Application Technology
// Code adapted from the bsg files from Exploration - Implementing CUD operations in your app
// Code for Create Routes - Rooms "const query2.." and "const [[{ room_ID }]].." copied from Microsoft Copilot
// Code in lines 497-505 and lines 517-519 (within DELETE Route for Artists) copied from Microsoft Copilot
// Code in line 102 adapted from Microsoft Copilot
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948
// URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=25352968
// URL: https://copilot.microsoft.com/
// AI Tools Prompt: The Submit button to the Add a Room form is not working, I need to press Submit and then refresh the 
// page for the data entered in the form to be added to the table. This is my current route, [Pasted the Create Route for Rooms].
// AI Tools Prompt: "How can I add a window.alert when a user tries to delete an artist who has a recording session? [Pasted this file]"
// AI Tools Prompt: "Invoices is a mysql database table, and each row contains an attribute called invoice_paid that is represented with
// a tinyint. When displaying this column on my website, I want all 0s to become "No", and all nonzero numbers to become "Yes".
// How can I do this? [Pasted screenshot of Invoices.jsx and the GET invoices route]"


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
        const query1 = `SELECT Artists.artist_id AS 'Artist ID', Managers.name AS 'Manager', Artists.name AS 'Name', \
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
    
});

app.get('/managers', async (req, res) => {
    try {
        // Create and execute our queries
        // In query1, display the managers table
        const query1 = `SELECT Managers.manager_ID AS 'Manager ID', name AS 'Name', phone_number AS 'Phone Number', email AS 'Email'
            FROM Managers`;
        const [managers] = await db.query(query1);

        res.status(200).json({ managers });  // Send the results to the frontend

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
    
});

app.get('/rooms', async (req, res) => {
    try {
        // Create and execute our queries
        // In query1, display the rooms table
        const query1 = `SELECT Rooms.room_ID AS 'Room', square_footage AS 'Square Footage', floor AS 'Floor'
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
        // In query1, display the invoices table
        const query1 = `SELECT Invoices.invoice_ID AS 'Invoice ID', Invoices.session_ID AS 'Session ID', Invoices.session_cost AS 'Cost',
            CASE WHEN Invoices.invoice_paid = 0 THEN 'No' Else 'Yes' END AS Paid
            FROM Invoices
            JOIN Recording_Sessions ON Invoices.session_ID = Recording_Sessions.session_ID
            JOIN Recording_Sessions_has_Artists ON Recording_Sessions.session_ID = Recording_Sessions_has_Artists.session_ID`;
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
        // In query1, display the recording sessions table
        const query1 = `SELECT Recording_Sessions.session_ID AS 'Session ID', Recording_Sessions.room_ID as 'Room', Recording_Sessions.duration AS 'Duration'
            FROM Recording_Sessions`;
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
        // In query1, display the recording_sessions_has_artists table
        const query1 = `SELECT recording_sessions_has_artists_ID AS 'Pairing', session_ID AS 'Session ID', Artists.name AS 'Artist'
            FROM Recording_Sessions_has_Artists
            JOIN Artists ON Recording_Sessions_has_Artists.artist_ID = Artists.artist_ID;`;
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

// CREATE ROUTES
app.post('/artists/create', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Cleanse data - If the manager_ID isn't a number, make it NULL.
        if (isNaN(parseInt(data.create_artist_manager_ID)))
            data.create_artist_manager_ID = null;

        // Create and execute queries
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_CreateArtist(?, ?, ?, ?, @new_artist_ID);`;

        // Store ID of last inserted row
        const [[[rows]]] = await db.query(query1, [
            data.create_artist_manager_ID,
            data.create_artist_name,
            data.create_artist_phone_number,
            data.create_artist_email,
        ]);

        console.log(`CREATE artist. ID: ${rows.new_artist_ID} ` +
            `Name: ${data.create_artist_name}`
        );

        // Send success status to frontend
        res.status(200).json({ message: 'Artist created successfully' });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.post('/managers/create', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute queries
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_CreateManager(?, ?, ?, @new_manager_ID);`;

        // Store ID of last inserted row
        const [[[rows]]] = await db.query(query1, [
            data.create_manager_name,
            data.create_manager_phone_number,
            data.create_manager_email,
        ]);

        console.log(`CREATE manager. ID: ${rows.new_manager_ID} ` +
            `Name: ${data.create_manager_name}`
        );

        // Send success status to frontend
        res.status(200).json({ message: 'Manager created successfully' });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.post('/rooms/create', async function (req, res) {
    try {
        let data = req.body;

        // Execute the stored procedure and capture the output
        const query1 = `CALL sp_CreateRoom(?, ?, @room_ID);`;
        const query2 = `SELECT @room_ID AS room_ID;`;
        await db.query(query1, [
            data.create_room_square_footage,
            data.create_room_floor,
        ]);
        
        const [[{ room_ID }]] = await db.query(query2);

        console.log(`CREATE room. ID: ${room_ID}, 
            Square Footage: ${data.create_room_square_footage}, Floor: ${data.create_room_floor}`
        );

        res.status(200).json({ message: 'Room created successfully', room_ID });
    } catch (error) {
        console.error('Error executing queries:', error);
        res.status(500).send('An error occurred while executing the database queries.');
    }
});

app.post('/invoices/create', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;


        // Create and execute queries
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_CreateInvoice(?, ?, ?, @invoice_ID);`;
        const query2 = `SELECT @invoice_ID AS invoice_ID;`;

        // Store ID of last inserted row
        await db.query(query1, [
            data.create_invoice_session_ID,
            data.create_invoice_session_cost,
            data.create_invoice_invoice_paid,
        ]);

        const [[{ invoice_ID }]] = await db.query(query2);

        console.log(`CREATE invoice. ID: ${invoice_ID} ` +
            `Session: ${data.create_invoice_session_ID}, Cost: ${data.create_invoice_session_cost}`
        );

        // Send success status to frontend
        res.status(200).json({ message: 'Invoice created successfully', invoice_ID });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.post('/recording_sessions/create', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;


        // Create and execute queries
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_CreateRecordingSession(?, ?, @session_ID);`;
        const query2 = `SELECT @session_ID as session_ID;`; 
        
        // Store ID of last inserted row 
        await db.query(query1, [ 
            data.create_recording_session_room_ID, 
            data.create_recording_session_duration, 
        ]);

        const [[{ session_ID }]] = await db.query(query2);

        console.log(`CREATE recording_session. ID: ${session_ID} ` +
            `Duration: ${data.create_recording_session_duration}`
        );

        // Send success status to frontend
        res.status(200).json({ message: 'Recording Session created successfully', session_ID });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.post('/recording_sessions_has_artists/create', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;


        // Create and execute queries
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_CreateRecordingSessionAndArtistPairing(?, ?, @recording_session_has_artists_ID);`;
        const query2 = `SELECT @recording_session_has_artists_ID as recording_sessions_has_artists_ID;`;

        // Store ID of last inserted row
        await db.query(query1, [
            data.create_recording_session_has_artists_session_ID,
            data.create_recording_session_has_artists_artist_ID,
        ]);

        const [[{ recording_sessions_has_artists_ID }]] = await db.query(query2);

        console.log(`CREATE recording_session_has_artists. ID: ${recording_sessions_has_artists_ID} ` +
            `Session: ${data.create_recording_session_has_artists_session_ID}, Artist: ${data.create_recording_session_has_artists_artist_ID}`
        );

        // Send success status to frontend
        res.status(200).json({ message: 'Recording Session and Artists pairing created successfully' });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// UPDATE ROUTES
app.post('/artists/update', async function (req, res) {
    try {
        // Parse frontend form information
        const data = req.body;

        // Cleanse data - If manager_ID isn't a number, make it NULL.
        if (isNaN(parseInt(data.update_manager_ID)))
            data.update_manager_ID = null;
        
        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = 'CALL sp_UpdateArtist(?, ?, ?, ?, ?);';
        const query2 = 'SELECT name, phone_number, email FROM Artists WHERE artist_ID = ?;';
        await db.query(query1, [
            data.update_artist_ID,
            data.update_manager_ID,
            data.update_name,
            data.update_phone_number,
            data.update_email,
        ]);
        const [[rows]] = await db.query(query2, [data.update_artist_ID]);

        console.log(`UPDATE Artist. ID: ${data.update_artist_ID} ` +
            `Name: ${rows.name}, Phone: ${rows.phone_number}, Email: ${rows.email}`
        );

        // Send success status to frontend
        res.status(200).json({ message: 'Artist updated successfully' });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.post('/managers/update', async function (req, res) {
    try {
        // Parse frontend form information
        const data = req.body;
        
        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = 'CALL sp_UpdateManager(?, ?, ?, ?);';
        const query2 = 'SELECT name, phone_number, email FROM Managers WHERE manager_ID = ?;';
        await db.query(query1, [
            data.update_manager_ID,
            data.update_manager_name,
            data.update_manager_phone_number,
            data.update_manager_email,
        ]);
        const [[rows]] = await db.query(query2, [data.update_manager_ID]);

        console.log(`UPDATE Manager. ID: ${data.update_manager_ID} ` +
            `Name: ${rows.name}, Phone: ${rows.phone_number}, Email: ${rows.email}`
        );

        // Send success status to frontend
        res.status(200).json({ message: 'Manager updated successfully' });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.post('/invoices/update', async function (req, res) {
    try {
        // Parse frontend form information
        const data = req.body;
        
        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = 'CALL sp_UpdateInvoice(?, ?, ?, ?);';
        const query2 = 'SELECT invoice_ID, session_ID, session_cost, invoice_paid FROM Invoices WHERE invoice_ID = ?;';
        await db.query(query1, [
            data.update_invoice_ID,
            data.update_invoice_session_ID,
            data.update_invoice_session_cost,
            data.update_invoice_invoice_paid,
        ]);
        const[[rows]] = await db.query(query2, [data.update_invoice_ID]);

        console.log(`UPDATE Invoice. ID: ${data.update_invoice_ID} ` +
            `Session: ${rows.update_invoice_session_ID}, Cost: ${rows.update_invoice_session_cost}, Status: ${rows.paid_confirmation}`
        );

        // Send success status to frontend
        res.status(200).json({ message: 'Invoice updated successfully' });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.post('/recording_sessions_has_artists/update', async function (req, res) {
    try {
        // Parse frontend form information
        const data = req.body;
        
        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = 'CALL sp_UpdateRecordingSessionAndArtistPairing(?, ?, ?);';
        await db.query(query1, [
            data.update_recording_session_and_artist_pairing_ID,
            data.update_recording_session_and_artist_pairing_session_ID,
            data.update_recording_session_and_artist_pairing_artist_ID,
        ]);

        console.log(`UPDATE recording_sessions_has_artists. ID: ${data.update_recording_session_and_artist_pairing_ID} ` +
            `Session: ${data.update_recording_session_and_artist_pairing_session_ID}, Artists: ${data.update_recording_session_and_artist_pairing_artist_ID}`
        );

        // Send success status to frontend
        res.status(200).json({ message: 'Recording Session and Artist pairing updated successfully' });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// DELETE ROUTES
app.post('/artists/delete', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Check if the artist has any recording sessions
        const [[{ count }]] = await db.query(
            `SELECT COUNT(*) AS count FROM Recording_Sessions_has_Artists WHERE artist_ID = ?`,
            [data.delete_artist_ID]
        );

        if (count > 0) {
            console.log(`Cannot delete ${data.delete_artist_name}, they have recording sessions.`);
            return res.status(400).json({ message: `Cannot delete ${data.delete_artist_name}. This artist has recording sessions.` });
        }

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_DeleteArtist(?);`;
        await db.query(query1, [data.delete_artist_ID]);

        console.log(`DELETE Artist. ID: ${data.delete_artist_ID} ` +
            `Name: ${data.delete_artist_name}`
        );

        // Redirect the user to the updated webpage data
        res.status(200).json({ 
            message: 'Artist deleted successfully' 
        });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.post('/managers/delete', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_DeleteManager(?);`;
        await db.query(query1, [data.delete_manager_ID]);

        console.log(`DELETE Manager. ID: ${data.delete_manager_ID} ` +
            `Name: ${data.delete_manager_name}`
        );

        // Redirect the user to the updated webpage data
        res.redirect('/managers');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.post('/recording_sessions_has_artists/delete', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_DeleteRecordingSessionAndArtistPairing(?);`;
        await db.query(query1, [data.delete_recording_session_and_artist_pairing_ID]);

        console.log(`DELETE recording_sessions_has_artists. ID: ${data.delete_recording_session_and_artist_pairing_ID}`);

        // Redirect the user to the updated webpage data
        res.redirect('/recording_sessions_has_artists');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// RESET DATABASE ROUTE
app.post('/resetbutton', async function (req, res) {
    try {
        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = 'CALL sp_ResetDatabase();';
        await db.query(query1);

        res.status(200).json({ message: 'Recording Session and Artist pairing updated successfully' });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic message to the browser
        res.status(500).send(
            'An error occured while executing the database queries.'
        )
    }
})

// ########################################
// ########## LISTENER

app.listen(PORT, function () {
    console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
});
