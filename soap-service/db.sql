CREATE DATABASE soap_db
    WITH
        OWNER = postgres
        ENCODING = 'UTF8'
        LOCALE_PROVIDER = 'libc'
        CONNECTION LIMIT = -1
        IS_TEMPLATE = False;

CREATE TABLE availability (
    room_id SERIAL PRIMARY KEY,
    room_type VARCHAR(50),
    available_date DATE,
    status VARCHAR(20)
);

INSERT INTO availability (room_type, available_date, status) VALUES
('Single', '2024-12-15', 'available'),
('Double', '2024-12-16', 'available');
