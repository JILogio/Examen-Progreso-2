const request = require('supertest');
const app = require('../src/app');

test('Add new room', async () => {
    const response = await request(app).post('/rooms').send({
        roomNumber: 104,
        roomType: 'Suite',
        status: 'available',
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('room_id');
});

test('Update room status', async () => {
    const response = await request(app).patch('/rooms/1').send({
        status: 'cleaning',
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'cleaning');
});
