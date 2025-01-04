import request from 'supertest';
import app from '../../src/server';

beforeEach(async () => {

});

describe('GET /api/v1/user_car/getall', () => {
    it('should return array of user_cars initially', async () => {
        const response = await request(app).get('/api/v1/user_car');
        expect(response.status).toBe(200);
    });
});

describe('GET /api/v1/user_car/get/:id', () => {
    it('should return an array of specific user_car', async () => {
        const userCarId = 1;
        const response = await request(app).get(`/api/v1/user_car/get/${userCarId}`);
        expect(response.status).toBe(200);
    });
});

describe('POST /api/v1/user_car/create', () => {
    it('it should create a new user_car and return as object', async () => {
        const newUserCar = {
            "carId": 1,
            "userId": 1
        };
        const response = await request(app)
            .post('api/v1/user_car/create')
            .send(newUserCar);
        expect(response.status).toBe(200);
    });
});

describe('PATCH /api/v1/user_car/update', () => {
    it('it should be update existing user_car and return as object', async () => {
        const userCarId = 1;
        const updateUserCar = {
            "carId": 2,
            "userId": 3,
        };
        const response = await request(app)
            .patch(`api/v1/user_car/update/${userCarId}`)
            .send(updateUserCar);
        console.log(response.status);
        expect(response.status).toBe(200);
    });
});

describe('DELETE /api/v1/user_car/delete', () => {
    it('it should be delete existing user_car and retuern 200', async () => {
        const userCarId = 2;
        const response = await request(app)
            .delete(`api/v1/user_car/${userCarId}`);
        expect(response.status).toBe(200);
    });
});

