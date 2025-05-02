-- Authors: Paula Tica and Drew Schlabach
-- ticap@oregonstate.edu
-- schlabad@oregonstate.edu
-- CS 340 Section 400

-- Citation:
-- Date: 05/08/2025
-- Adapted from W3Schools and Exploration - Database Application Design
-- URLs: https://www.w3schools.com/sql/sql_union.asp
-- https://canvas.oregonstate.edu/courses/1999601/pages/exploration-database-application-design?module_item_id=25352946

-- using : to denote the variables

--
-- SQL for Artists table
--
-- display all artists and their information for the Artists page

SELECT Artists.artist_ID, manager_ID, name, phone_number, email
FROM Artists;

-- get all manager IDs and Names to populate the manager_ID dropdown

SELECT NULL AS manager_ID, 'None' AS name
UNION ALL
SELECT manager_ID, name
FROM Managers
ORDER BY manager_ID;

-- ADD Artist

INSERT INTO Artists (manager_ID, name, phone_number, email)
VALUES (:manager_ID_from_dropdown_Input, :name, :phone_number, :email);

-- get all manager IDs and Names to populate the manager_ID dropdown

SELECT NULL AS manager_ID, 'None' AS name
UNION ALL
SELECT manager_ID, name
FROM Managers
ORDER BY manager_ID;

-- UPDATE Artist

UPDATE Artists
    SET manager_ID = :manager_ID_from_dropdown_Input, name = :name, phone_number = :phone_number, email = :email
    WHERE artist_ID = :artist_ID_from_update_form;

-- DELETE Artist

DELETE FROM Artists
WHERE artist_ID = :artist_ID_selected_from_artists_page;


--
-- SQL for Managers table
--
-- display all managers and their information for the Managers page

SELECT Managers.manager_ID, name, phone_number, email
FROM Managers;

-- ADD Manager

INSERT INTO Managers (name, phone_number, email)
VALUES (:name, :phone_number, :email);

-- UPDATE Manager

UPDATE Managers
    SET name = :name, phone_number = :phone_number, email = :email
    WHERE manager_ID = :manager_ID_from_update_form;

-- DELETE Manager

DELETE FROM Managers
WHERE manager_ID = :manager_ID_selected_from_Managers_page;


--
-- SQL for Rooms table
--
-- display all rooms and their information for the Rooms page

SELECT Rooms.room_ID, square_footage, floor
FROM Rooms;

-- ADD Room

INSERT INTO Rooms (square_footage, floor)
VALUES (:square_footage, :floor);


--
-- SQL for Invoices table
--

-- Display Invoices

SELECT Invoices.invoice_ID, Recording_Sessions.artist_id, Invoices.session_ID, Invoices.session_cost, Invoices.invoice_paid
FROM Invoices
JOIN Recording_Sessions ON Invoice.session_ID = Recording_Sessions.session_ID;

-- Add row to Invoices

INSERT INTO Invoices (session_ID, session_cost):
VALUES (:session_ID, :session_cost);

-- Change invoice to paid

UPDATE Invoices
SET invoice_paid = 1
WHERE session_ID = :session_ID;


--
-- SQL for Recording_Sessions table
--

-- Display Recording_Sessions

SELECT Recording_Sessions.session_ID, Recording_Sessions_has_Artists.artist_ID, Recording_Sessions.room_ID, Recording_Sessions.duration
FROM Recording_Sessions
JOIN Recording_Sessions_has_Artists ON Recording_Sessions.session_ID = Recording_Sessions_has_Artists.artist_ID;

--
-- Add row to Recording_Sessions
--

INSERT INTO Recording_Sessions (room_ID, duration):
VALUES (:room_ID, :duration);


--
-- SQL for Recording_Sessions_has_Artists table
--

-- Display Recording_Sessions_has_Artists

SELECT recording_sessions_has_artists_ID, session_ID, artist_ID
FROM Recording_Sessions_has_Artists;

-- Add row to Recording_Sessions_has_Artists

INSERT INTO Recording_Sessions_has_Artists (session_id, artist_ID)
VALUES (:session_ID, :artist_ID);

-- Update row in Recording_Sessions_has_Artists

UPDATE Recording_Sessions_has_Artists
SET session_ID = :session_ID, artist_ID = :artist_ID
WHERE recording_sessions_has_artists_ID = :recording_sessions_has_artists_ID

-- Delete row from Recording_Sessions_has_Artists

DELETE FROM Recording_Sessions_has_Artists
WHERE recording_sessions_has_artists_ID = :recording_sessions_has_artists_ID;
