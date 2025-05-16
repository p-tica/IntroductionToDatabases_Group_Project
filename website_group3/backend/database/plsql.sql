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
-- UPDATE bsg_people
-- #############################
DROP PROCEDURE IF EXISTS sp_UpdatePerson;

DELIMITER //
CREATE PROCEDURE sp_UpdatePerson(IN p_id INT, IN p_homeworld INT, IN p_age INT)

BEGIN
    UPDATE bsg_people SET homeworld = p_homeworld, age = p_age WHERE id = p_id; 
END //
DELIMITER ;

-- #############################
-- DELETE bsg_people
-- #############################
DROP PROCEDURE IF EXISTS sp_DeletePerson;

DELIMITER //
CREATE PROCEDURE sp_DeletePerson(IN p_id INT)
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
        -- Deleting corresponding rows from both bsg_people table and 
        --      intersection table to prevent a data anamoly
        -- This can also be accomplished by using an 'ON DELETE CASCADE' constraint
        --      inside the bsg_cert_people table.
        DELETE FROM bsg_cert_people WHERE pid = p_id;
        DELETE FROM bsg_people WHERE id = p_id;

        -- ROW_COUNT() returns the number of rows affected by the preceding statement.
        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in bsg_people for id: ', p_id);
            -- Trigger custom error, invoke EXIT HANDLER
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //
DELIMITER ;