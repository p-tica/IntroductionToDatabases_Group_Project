-- Citation for starter code 
-- Date: 05/22/2025
-- Code adapted from the bsg files from Exploration - Implementing CUD operations in your app
-- URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=25352968

-- #############################
-- RESET database
-- #############################
DROP PROCEDURE IF EXISTS sp_ResetDatabase;

DELIMITER //
CREATE PROCEDURE sp_ResetDatabase()
BEGIN
SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;


-- Query to create the Managers table

CREATE OR REPLACE TABLE Managers (
    manager_ID int NOT NULL AUTO_INCREMENT,
    name varchar(145) NOT NULL,
    phone_number varchar(15) NOT NULL,
    email varchar(145) NOT NULL,
    PRIMARY KEY (manager_ID)
);

-- Query to create the Artists table

CREATE OR REPLACE TABLE Artists (
    artist_ID int NOT NULL AUTO_INCREMENT,
    manager_ID int,
    name varchar(145) NOT NULL,
    phone_number varchar(15) NOT NULL,
    email varchar(145) NOT NULL,
    PRIMARY KEY (artist_ID),
    FOREIGN KEY (manager_ID) REFERENCES Managers(manager_ID) ON DELETE SET NULL
);

-- Query to create Recording_Sessions table

CREATE OR REPLACE TABLE Recording_Sessions (
    session_ID int NOT NULL AUTO_INCREMENT,
    room_ID int NOT NULL,
    duration decimal(15,2) NOT NULL,
    PRIMARY KEY (session_ID),
    FOREIGN KEY (room_ID) REFERENCES Rooms(room_ID) ON DELETE RESTRICT
);

-- Query to create Rooms table

CREATE OR REPLACE TABLE Rooms (
    room_ID int NOT NULL AUTO_INCREMENT,
    square_footage int NOT NULL,
    floor int NOT NULL,
    PRIMARY KEY (room_ID)
);

-- Query to create Invoices table

CREATE OR REPLACE TABLE Invoices (
    invoice_ID int NOT NULL AUTO_INCREMENT,
    session_ID int NOT NULL,
    session_cost decimal(15,2) NOT NULL,
    invoice_paid tinyint NOT NULL DEFAULT 0,
    PRIMARY KEY (invoice_ID),
    FOREIGN KEY (session_ID) REFERENCES Recording_Sessions(session_ID) ON DELETE RESTRICT
);

-- Query to create the Recording_Sessions_has_Artists table

CREATE OR REPLACE TABLE Recording_Sessions_has_Artists (
    recording_sessions_has_artists_ID int NOT NULL AUTO_INCREMENT,
    session_ID int NOT NULL,
    artist_ID int,
    PRIMARY KEY (recording_sessions_has_artists_ID),
    FOREIGN KEY (session_ID) REFERENCES Recording_Sessions(session_ID) ON DELETE RESTRICT,
    FOREIGN KEY (artist_ID) REFERENCES Artists(artist_ID) ON DELETE RESTRICT
);

-- Query to insert data into Managers table

INSERT INTO Managers (name, phone_number, email)
VALUES ('Irving Azoff', '555-123-4567', 'azoffi@bandmanage.com'),
('Bob Smith', '747-321-6745', 'smithb@bandmanage.com'),
('Julie Stone', '600-987-5432', 'jstone@manager.com');

-- Query to insert data into Artists table

INSERT INTO Artists (manager_ID, name, phone_number, email)
VALUES ((SELECT manager_ID FROM Managers WHERE name = 'Irving Azoff'), 'Eagles', '555-555-5555', 'eagles@abc.com'),
((SELECT manager_ID FROM Managers WHERE name = 'Irving Azoff'), 'U2', '555-554-5555', 'u2@abc.com'),
((SELECT manager_ID FROM Managers WHERE name = 'Bob Smith'), 'MGMT', '213-813-4444', 'mgmt@abc.com'),
((SELECT manager_ID FROM Managers WHERE name = 'Julie Stone'), 'Halsey', '310-111-2222', 'halsey@abc.com'),
(NULL, 'Kid Cudi', '100-200-3333', 'kidcudi@abc.com');

-- Query to insert data into Recording_Sessions_has_Artists table

INSERT INTO Recording_Sessions_has_Artists (session_ID, artist_ID)
VALUES(1, (SELECT artist_ID FROM Artists WHERE name = 'Eagles')),
(2, (SELECT artist_ID FROM Artists WHERE name = 'MGMT')),
(3, (SELECT artist_ID FROM Artists WHERE name = 'MGMT')),
(4, (SELECT artist_ID FROM Artists WHERE name = 'Halsey'));

-- Query to insert data into Recording_Sessions table

INSERT INTO Recording_Sessions (room_ID, duration)
VALUES(3, 5.25),
(2, 3.75),
(1, 6.5),
(1, 4);

-- Query to insert data into Invoices table

INSERT INTO Invoices (session_ID, session_cost, invoice_paid)
VALUES(2, 468.75, 0),
(3, 650.00, 1),
(1, 1312.50, 0),
(4, 400.00, 1);

-- Query to insert data into Rooms table

INSERT INTO Rooms (square_footage, floor)
VALUES(200, 1),
(250, 1),
(500, 2),
(625, 1);


SET FOREIGN_KEY_CHECKS = 1;
COMMIT;

END //
DELIMITER ;

-- #############################
-- CREATE an artist
-- #############################
DROP PROCEDURE IF EXISTS sp_CreateArtist;

DELIMITER //
CREATE PROCEDURE sp_CreateArtist(
    IN manager_ID INT, 
    IN name VARCHAR(145), 
    IN phone_number VARCHAR(15), 
    IN email VARCHAR(145),
    OUT artist_ID INT)
BEGIN
    INSERT INTO Artists (manager_ID, name, phone_number, email) 
    VALUES (manager_ID, name, phone_number, email);

    -- Store the ID of the last inserted row
    SELECT LAST_INSERT_ID() into artist_ID;
    -- Display the ID of the last inserted artist
    SELECT LAST_INSERT_ID() AS 'new_artist_ID';

END //
DELIMITER ;

-- #############################
-- UPDATE an artist
-- #############################
DROP PROCEDURE IF EXISTS sp_UpdateArtist;

DELIMITER //
CREATE PROCEDURE sp_UpdateArtist(IN p_artist_ID INT, IN p_manager_ID INT, IN p_name VARCHAR(145), IN p_phone_number VARCHAR(15), IN p_email VARCHAR(145))

BEGIN
    UPDATE Artists SET manager_ID = p_manager_ID, name = p_name, phone_number = p_phone_number, email = p_email WHERE artist_ID = p_artist_ID; 

END //
DELIMITER ;

-- #############################
-- DELETE an artist
-- #############################
DROP PROCEDURE IF EXISTS sp_DeleteArtist;

DELIMITER //
CREATE PROCEDURE sp_DeleteArtist(IN p_artist_ID INT)
BEGIN
    DECLARE error_message VARCHAR(255); 

    -- error handling
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Roll back the transaction on any error
        ROLLBACK;
        -- Propogate the custom error message to the caller
        RESIGNAL;
    END;

    START TRANSACTION;
        -- Delete the artist from the Artists table
        DELETE FROM Artists WHERE artist_ID = p_artist_ID;

        -- ROW_COUNT() returns the number of rows affected by the preceding statement.
        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in Artists for artist_ID: ', p_artist_ID);
            -- Trigger custom error, invoke EXIT HANDLER
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //
DELIMITER ;

-- #############################
-- CREATE a manager
-- #############################
DROP PROCEDURE IF EXISTS sp_CreateManager;

DELIMITER //
CREATE PROCEDURE sp_CreateManager(
    IN name VARCHAR(145), 
    IN phone_number VARCHAR(15), 
    IN email VARCHAR(145),
    OUT manager_ID INT)
BEGIN
    INSERT INTO Managers (name, phone_number, email) 
    VALUES (name, phone_number, email);

    -- Store the ID of the last inserted row
    SELECT LAST_INSERT_ID() into manager_ID;
    -- Display the ID of the last inserted artist
    SELECT LAST_INSERT_ID() AS 'new_manager_ID';

END //
DELIMITER ;

-- #############################
-- UPDATE a manager
-- #############################
DROP PROCEDURE IF EXISTS sp_UpdateManager;

DELIMITER //
CREATE PROCEDURE sp_UpdateManager(IN p_manager_ID INT, IN p_name VARCHAR(145), IN p_phone_number VARCHAR(15), IN p_email VARCHAR(145))

BEGIN
    UPDATE Managers SET name = p_name, phone_number = p_phone_number, email = p_email WHERE manager_ID = p_manager_ID; 

END //
DELIMITER ;

-- #############################
-- DELETE a manager
-- #############################
DROP PROCEDURE IF EXISTS sp_DeleteManager;

DELIMITER //
CREATE PROCEDURE sp_DeleteManager(IN p_manager_ID INT)
BEGIN
    DECLARE error_message VARCHAR(255); 

    -- error handling
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Roll back the transaction on any error
        ROLLBACK;
        -- Propogate the custom error message to the caller
        RESIGNAL;
    END;

    START TRANSACTION;
        -- Delete the manager from the Managers table
        DELETE FROM `Managers` WHERE manager_ID = p_manager_ID;

        -- ROW_COUNT() returns the number of rows affected by the preceding statement.
        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in Managers for manager_ID: ', p_manager_ID);
            -- Trigger custom error, invoke EXIT HANDLER
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //
DELIMITER ;

-- #############################
-- CREATE a room
-- #############################
DROP PROCEDURE IF EXISTS sp_CreateRoom;

DELIMITER //
CREATE PROCEDURE sp_CreateRoom(
    IN square_footage INT,
    IN floor INT,
    OUT room_ID INT)
BEGIN
    INSERT INTO Rooms (square_footage, floor) 
    VALUES (square_footage, floor);

    -- Store the ID of the last inserted row
    SELECT LAST_INSERT_ID() into room_ID;

END //
DELIMITER ;

-- #############################
-- CREATE an Invoice
-- #############################
DROP PROCEDURE IF EXISTS sp_CreateInvoice;

DELIMITER //
CREATE PROCEDURE sp_CreateInvoice(
    IN p_session_ID INT,
    IN session_cost INT,
    IN invoice_paid TINYINT,
    OUT invoice_ID INT)
BEGIN
INSERT INTO Invoices (session_ID, session_cost, invoice_paid)
VALUES ((SELECT session_ID FROM Recording_Sessions WHERE session_ID = p_session_ID),
        session_cost, invoice_paid);

    -- Store the ID of the last inserted row
    SELECT LAST_INSERT_ID() into invoice_ID;

END //
DELIMITER ;

-- #############################
-- UPDATE an Invoice
-- #############################
DROP PROCEDURE IF EXISTS sp_UpdateInvoice;

DELIMITER //
CREATE PROCEDURE sp_UpdateInvoice(
    IN p_session_ID INT,
    OUT paid_confirmation VARCHAR(10))


BEGIN
UPDATE Invoices
SET invoice_paid = 1
WHERE session_ID = p_session_ID;

    SET paid_confirmation = 'Paid';

END //
DELIMITER ;

-- #############################
-- CREATE a Recording Session
-- #############################
DROP PROCEDURE IF EXISTS sp_CreateRecordingSession;

DELIMITER //
CREATE PROCEDURE sp_CreateRecordingSession(
    IN p_room_ID INT,
    IN duration INT,
    OUT session_ID INT)
BEGIN
    INSERT INTO Recording_Sessions (room_ID, duration) 
    VALUES ((SELECT room_ID FROM Rooms WHERE room_ID = p_room_ID), duration);

    -- Store the ID of the last inserted row
    SELECT LAST_INSERT_ID() into session_ID;

END //
DELIMITER ;

-- #############################
-- CREATE a Recording Sessions and Artists pairing
-- #############################
DROP PROCEDURE IF EXISTS sp_CreateRecordingSessionAndArtistPairing;

DELIMITER //
CREATE PROCEDURE sp_CreateRecordingSessionAndArtistPairing(
    IN p_session_ID INT,
    IN p_artist_ID INT,
    OUT recording_sessions_has_artists_ID INT)
BEGIN
INSERT INTO Recording_Sessions_has_Artists (session_id, artist_ID)
VALUES ((SELECT session_ID FROM Recording_Sessions WHERE session_ID = p_session_ID),
        (SELECT artist_ID FROM Artists WHERE artist_ID = p_artist_ID));

    -- Store the ID of the last inserted row
    SELECT LAST_INSERT_ID() into recording_sessions_has_artists_ID;

END //
DELIMITER ;

-- #############################
-- UPDATE a Recording Sessions and Artists pairing
-- #############################
DROP PROCEDURE IF EXISTS sp_UpdateRecordingSessionAndArtistPairing;

DELIMITER //
CREATE PROCEDURE sp_UpdateRecordingSessionAndArtistPairing(
    IN p_recording_sessions_has_artists_ID INT,
    IN p_session_ID INT,
    IN p_artist_ID INT)

BEGIN
UPDATE Recording_Sessions_has_Artists
SET session_ID = (SELECT session_ID FROM Recording_Sessions WHERE session_ID = p_session_ID), 
    artist_ID = (SELECT artist_ID FROM Artists WHERE artist_ID = p_artist_ID)
WHERE recording_sessions_has_artists_ID = p_recording_sessions_has_artists_ID;

END //
DELIMITER ;

-- #############################
-- DELETE a Recording Sessions and Artists pairing
-- #############################

DROP PROCEDURE IF EXISTS sp_DeleteRecordingSessionAndArtistPairing;

DELIMITER //
CREATE PROCEDURE sp_DeleteRecordingSessionAndArtistPairing(IN p_recording_sessions_has_artists_ID INT)
BEGIN
    DECLARE error_message VARCHAR(255); 

    -- error handling
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Roll back the transaction on any error
        ROLLBACK;
        -- Propogate the custom error message to the caller
        RESIGNAL;
    END;

    START TRANSACTION;
        -- Delete the manager from the Managers table
        DELETE FROM `Recording_Sessions_has_Artists` WHERE recording_sessions_has_artists_ID = p_recording_sessions_has_artists_ID;

        -- ROW_COUNT() returns the number of rows affected by the preceding statement.
        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in Recording_Sessions_has_Artists for recording_sessions_has_artists_ID: ', p_recording_sessions_has_artists_ID);
            -- Trigger custom error, invoke EXIT HANDLER
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //
DELIMITER ;
