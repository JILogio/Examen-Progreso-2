const soap = require('soap');

const url = 'http://localhost:8001/wsdl?wsdl';

test('Check availability SOAP', async () => {
    const client = await new Promise((resolve, reject) => {
        soap.createClient(url, (err, client) => {
            if (err) reject(err);
            else resolve(client);
        });
    });

    const args = {
        startDate: '2024-12-15',
        endDate: '2024-12-16',
        roomType: 'Single',
    };

    const result = await new Promise((resolve, reject) => {
        client.CheckAvailabilityService.CheckAvailabilityPort.checkAvailability(
            args,
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            }
        );
    });

    console.log(result)

    expect(result).toHaveProperty('rooms');
    expect(JSON.parse(result.rooms)).toBeInstanceOf(Array);
});
