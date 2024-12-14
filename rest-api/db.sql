CREATE DATABASE rest_db
    WITH
        OWNER = postgres
        ENCODING = 'UTF8'
        LOCALE_PROVIDER = 'libc'
        CONNECTION LIMIT = -1
        IS_TEMPLATE = False;

CREATE TABLE reservations (
    reservation_id SERIAL PRIMARY KEY,
    room_number INT,
    customer_name VARCHAR(100),
    start_date DATE,
    end_date DATE,
    status VARCHAR(20)
);

INSERT INTO reservations (room_number, customer_name, start_date, end_date, status) VALUES
(101, 'John Doe', '2024-12-15', '2024-12-16', 'confirmed');
