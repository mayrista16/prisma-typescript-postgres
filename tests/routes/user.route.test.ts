import request from 'supertest';
import app from '../../src/server';

beforeEach(async () => {
    
});

describe('GET /api/v1/user/getall', () => {
    it('should return array of users initially', async () => {
        const response = await request(app).get('/api/v1/user/getall');
        expect(response.status).toBe(200);
    });
});

describe('GET /api/v1/user/get/:id', () => {
    it('should return an array of specifics user', async () => {
        const userId = 1;
        const response = await request(app).get(`/api/v1/user/get/${userId}`);
        expect(response.status).toBe(200);
    });
});

describe('POST /api/v1/user/create', () => {
    it('should create a new user and return the user object', async () => {
        const newUser = {
            "username": "arryvals",
            "email": "marrys@valentine.com",
            "password": "arryval123s",
            "role": "SUPERADMIN"
        };
        const response = await request(app)
            .post('/api/v1/user/create')
            .send(newUser);

        expect(response.status).toBe(200);
    });
});

describe('PATCH /api/v1/user/update', () => {
    it('should update existing user and return the user object', async () => {
        const userId = 3;
        const updateUser = {
            "email": "superstratos12@gmail.com",
            "username": "superentine12",
            "password": "syoertube1212",
            "role": "USER"
        };
        const response = await request(app)
            .patch(`/api/v1/user/update/${userId}`)
            .send(updateUser);
        console.log(response.status);
        expect(response.status).toBe(200);
    });
});

describe('DELETE /api/v1/user/delete', () => {
    it('should delete existing user and return the user object', async () => {
        const userId = 13;  
        const response = await request(app)
            .delete(`/api/v1/user/delete/${userId}`);
        expect(response.status).toBe(200);
    });
});