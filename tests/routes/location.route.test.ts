import request from 'supertest';
import app from '../../src/server';

beforeEach(async () => {

});

describe('GET /api/v1/location/getall', () => {
    it('should return array of location initially', async () => {
        const response = await request(app).get('/api/v1/location/getall');
        expect(response.status).toBe(200);
    });
});

describe('GET /api/v1/location/get/:id', () => {
    it('should return an array of specifics location', async () => {
        const locationId = 1;
        const response = await request(app).get(`/api/v1/location/get/${locationId}`);
    });
});

describe('POST /api/v1/location/create', () => {
    it('should create a new location and return the location object', async () => {
        const newLocation = {
            "location": "POINT(106.816666 -6.200000)",
            "user_carId": 1
        };
        const response = await request(app)
            .post('/api/v1/location/create')
            .send(newLocation);

        expect(response.status).toBe(200);
    });
});

describe('PATCH /api/v1/location/update', () => {
    it('should update existing location and return the location object', async () => {
        const locationId = 1;
        const newLocation = {
            "location": "POINT(106.216666 -6.210000)",
            "user_carId": 2
        };
        const response = await request(app)
            .patch(`/api/v1/location/update/${locationId}`)
            .send(newLocation);
        
        expect(response.status).toBe(200);
    });
});

describe('DELETE /api/v1/location/delete', () => {
    it('should be delete existing location and return 200', async () => {
        const locationId = 2;
        const response = await request(app).delete(`/api/v1/location/delete/${locationId}`);
        expect(response.status).toBe(200);
    });
});