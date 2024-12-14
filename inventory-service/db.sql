CREATE DATABASE inventory_db;

CREATE TABLE rooms (
    room_id SERIAL PRIMARY KEY,
    room_number INT UNIQUE,
    room_type VARCHAR(50),
    status VARCHAR(20)
);

INSERT INTO rooms (room_number, room_type, status) VALUES
(101, 'Single', 'available'),
(102, 'Double', 'maintenance');
