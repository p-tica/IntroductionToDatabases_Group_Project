-- Authors: Paula Tica and Drew Schlabach
-- ticap@oregonstate.edu
-- schlabad@oregonstate.edu
-- CS 340 Section 400
--
-- Citation for this sql file:
-- Date: 05/01/2025
-- Adapted from instructions given in module 5,
-- "Project Step 2 Draft: Normalized Schema + DDL with Sample Data (Group, on Ed Discussions)"
-- The code for this sql file was based on instructions
-- provided in the aforementioned activity.
-- Original author: Presumed to be Dr. Michael Curry
-- URL: https://oregonstate.instructure.com/courses/1999601/assignments/10006385?module_item_id=25352941

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
    FOREIGN KEY (manager_ID) REFERENCES Managers(manager_ID) ON DELETE RESTRICT
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
VALUES (1, 'Eagles', '555-555-5555', 'eagles@abc.com'),
(1, 'U2', '555-554-5555', 'u2@abc.com'),
(2, 'MGMT', '213-813-4444', 'mgmt@abc.com'),
(3, 'Halsey', '310-111-2222', 'halsey@abc.com'),
(NULL, 'Kid Cudi', '100-200-3333', 'kidcudi@abc.com');

-- Query to insert data into Recording_Sessions_has_Artists table

INSERT INTO Recording_Sessions_has_Artists (session_ID, artist_ID)
VALUES(1, 1),
(2, 3),
(3, 3),
(4, 4);

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
