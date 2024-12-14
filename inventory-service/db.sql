CREATE DATABASE inventory_db
    WITH
        OWNER = postgres
        ENCODING = 'UTF8'
        LOCALE_PROVIDER = 'libc'
        CONNECTION LIMIT = -1
        IS_TEMPLATE = False;

CREATE TABLE rooms (
    room_id SERIAL PRIMARY KEY,
    room_number INT UNIQUE,
    room_type VARCHAR(50),
    status VARCHAR(20)
);

INSERT INTO rooms (room_number, room_type, status) VALUES
(101, 'Single', 'available'),
(102, 'Double', 'maintenance');
