-- Citation for starter code 
-- Date: 05/22/2025
-- Code adapted from the bsg files from Exploration - Implementing CUD operations in your app
-- URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=25352968

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










-- -- #############################
-- -- CREATE bsg_people
-- -- #############################
-- DROP PROCEDURE IF EXISTS sp_CreatePerson;

-- DELIMITER //
-- CREATE PROCEDURE sp_CreatePerson(
--     IN p_fname VARCHAR(255), 
--     IN p_lname VARCHAR(255), 
--     IN p_homeworld INT, 
--     IN p_age INT,
--     OUT p_id INT)
-- BEGIN
--     INSERT INTO bsg_people (fname, lname, homeworld, age) 
--     VALUES (p_fname, p_lname, p_homeworld, p_age);

--     -- Store the ID of the last inserted row
--     SELECT LAST_INSERT_ID() into p_id;
--     -- Display the ID of the last inserted person.
--     SELECT LAST_INSERT_ID() AS 'new_id';

--     -- Example of how to get the ID of the newly created person:
--         -- CALL sp_CreatePerson('Theresa', 'Evans', 2, 48, @new_id);
--         -- SELECT @new_id AS 'New Person ID';
-- END //
-- DELIMITER ;

-- -- #############################
-- -- UPDATE bsg_people
-- -- #############################
-- DROP PROCEDURE IF EXISTS sp_UpdatePerson;

-- DELIMITER //
-- CREATE PROCEDURE sp_UpdatePerson(IN p_id INT, IN p_homeworld INT, IN p_age INT)

-- BEGIN
--     UPDATE bsg_people SET homeworld = p_homeworld, age = p_age WHERE id = p_id; 
-- END //
-- DELIMITER ;

-- -- #############################
-- -- DELETE bsg_people
-- -- #############################
-- DROP PROCEDURE IF EXISTS sp_DeletePerson;

-- DELIMITER //
-- CREATE PROCEDURE sp_DeletePerson(IN p_id INT)
-- BEGIN
--     DECLARE error_message VARCHAR(255); 

--     -- error handling
--     DECLARE EXIT HANDLER FOR SQLEXCEPTION
--     BEGIN
--         -- Roll back the transaction on any error
--         ROLLBACK;
--         -- Propogate the custom error message to the caller
--         RESIGNAL;
--     END;

--     START TRANSACTION;
--         -- Deleting corresponding rows from both bsg_people table and 
--         --      intersection table to prevent a data anamoly
--         -- This can also be accomplished by using an 'ON DELETE CASCADE' constraint
--         --      inside the bsg_cert_people table.
--         DELETE FROM bsg_cert_people WHERE pid = p_id;
--         DELETE FROM bsg_people WHERE id = p_id;

--         -- ROW_COUNT() returns the number of rows affected by the preceding statement.
--         IF ROW_COUNT() = 0 THEN
--             set error_message = CONCAT('No matching record found in bsg_people for id: ', p_id);
--             -- Trigger custom error, invoke EXIT HANDLER
--             SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
--         END IF;

--     COMMIT;

-- END //
-- DELIMITER ;