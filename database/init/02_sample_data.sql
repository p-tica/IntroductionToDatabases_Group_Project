-- Sample data for Recording Studio Database
-- This file contains the actual INSERT statements to populate the database with sample data

SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

-- Insert sample data into Managers table
INSERT INTO Managers (name, phone_number, email)
VALUES ('Irving Azoff', '555-123-4567', 'azoffi@bandmanage.com'),
('Bob Smith', '747-321-6745', 'smithb@bandmanage.com'),
('Julie Stone', '600-987-5432', 'jstone@manager.com');

-- Insert sample data into Rooms table
INSERT INTO Rooms (square_footage, floor)
VALUES(200, 1),
(250, 1),
(500, 2),
(625, 1);

-- Insert sample data into Artists table
INSERT INTO Artists (manager_ID, name, phone_number, email)
VALUES ((SELECT manager_ID FROM Managers WHERE name = 'Irving Azoff'), 'Eagles', '555-555-5555', 'eagles@abc.com'),
((SELECT manager_ID FROM Managers WHERE name = 'Irving Azoff'), 'U2', '555-554-5555', 'u2@abc.com'),
((SELECT manager_ID FROM Managers WHERE name = 'Bob Smith'), 'MGMT', '213-813-4444', 'mgmt@abc.com'),
((SELECT manager_ID FROM Managers WHERE name = 'Julie Stone'), 'Halsey', '310-111-2222', 'halsey@abc.com'),
(NULL, 'Kid Cudi', '100-200-3333', 'kidcudi@abc.com');

-- Insert sample data into Recording_Sessions table
INSERT INTO Recording_Sessions (room_ID, duration)
VALUES(3, 5.25),
(2, 3.75),
(1, 6.5),
(1, 4);

-- Insert sample data into Recording_Sessions_has_Artists table
INSERT INTO Recording_Sessions_has_Artists (session_ID, artist_ID)
VALUES(1, (SELECT artist_ID FROM Artists WHERE name = 'Eagles')),
(2, (SELECT artist_ID FROM Artists WHERE name = 'MGMT')),
(3, (SELECT artist_ID FROM Artists WHERE name = 'MGMT')),
(4, (SELECT artist_ID FROM Artists WHERE name = 'Halsey'));

-- Insert sample data into Invoices table
INSERT INTO Invoices (session_ID, session_cost, invoice_paid)
VALUES(2, 468.75, 0),
(3, 650.00, 1),
(1, 1312.50, 0),
(4, 400.00, 1);

SET FOREIGN_KEY_CHECKS = 1;
COMMIT;
