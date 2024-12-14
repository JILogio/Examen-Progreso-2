const express = require('express');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'inventory_db',
    password: 'Keyshar799',
    port: 5432,
});

const app = express();
app.use(express.json());

// Endpoint para registrar nuevas habitaciones
app.post('/rooms', async (req, res) => {
    const { roomNumber, roomType, status } = req.body;
    const result = await pool.query(
        `INSERT INTO rooms (room_number, room_type, status)
         VALUES ($1, $2, $3) RETURNING *`,
        [roomNumber, roomType, status]
    );
    res.json(result.rows[0]);
});

// Endpoint para actualizar el estado de una habitación
app.patch('/rooms/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const result = await pool.query(
        `UPDATE rooms SET status = $1 WHERE room_id = $2 RETURNING *`,
        [status, id]
    );
    if (result.rowCount === 0) {
        return res.status(404).send('Room not found');
    }
    res.json(result.rows[0]);
});

module.exports = app;
