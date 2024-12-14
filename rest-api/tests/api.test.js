const request = require('supertest');
const app = require('../src/app');

let id

describe('REST API Tests', () => {
    test('Create reservation', async () => {
        const response = await request(app).post('/reservations').send({
            roomNumber: 102,
            customerName: 'Jane Doe',
            startDate: '2024-12-17',
            endDate: '2024-12-18',
        });

        id = response.body.room_number;
        expect(response.status).toBe(200);
    });

    test('Retrieve reservation', async () => {
        const response = await request(app).get(`/reservations/${id}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('reservation_id');
    });
});
