const express = require('express');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'rest_db',
    password: '********',
    port: 5432,
});

const app = express();
app.use(express.json());

app.post('/reservations', async (req, res) => {
    const { roomNumber, customerName, startDate, endDate } = req.body;
    const result = await pool.query(
        `INSERT INTO reservations (room_number, customer_name, start_date, end_date, status)
         VALUES ($1, $2, $3, $4, 'confirmed') RETURNING *`,
        [roomNumber, customerName, startDate, endDate]
    );
    res.json(result.rows[0]);
});

app.get('/reservations/:id', async (req, res) => {
    const { id } = req.params;
    const result = await pool.query(
        `SELECT * FROM reservations WHERE room_number = $1`,
        [id]
    );
    res.json(result.rows[0]);
});

app.delete('/reservations/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query(`DELETE FROM reservations WHERE reservation_id = $1`, [id]);
    res.sendStatus(204);
});

module.exports = app;
