-- Citation for starter code 
-- Date: 05/22/2025
-- Code adapted from the bsg files from Exploration - Implementing CUD operations in your app
-- URL: https://canvas.oregonstate.edu/courses/1999601/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=25352968


-- #############################
-- CREATE an Artist
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