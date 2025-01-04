import request from "supertest";
import app from '../../src/server';

beforeEach(async () => {

});

describe('GET /api/v1/address/getall', () => {
    it('should return array of address initially', async () => {
        const response = await request(app).get('/api/v1/address/getall');
        expect(response.status).toBe(200);
    });
});

describe('GET /api/v1/address/get/id', () => {
    it('should return an array of specifics address', async () => {
        const addressId = 1;
        const response = await request(app).get(`/api/v1/address/get/${addressId}`);
        expect(response.status).toBe(200);
    });
});

describe('POST /api/v1/address/create', () => {
    it('should create a new address based on userid and return address object', async () => {
        const userId = 3;
        const newAddress = {
            "address": "Perum Pondok Cempaka Indah Blok F-19",
            "rt": 2,
            "rw": 3,
            "district": "Ngagel",
            "city": "Surabaya",
            "province": "Jawa Timur" 
        };
        const response = await request(app)
            .post(`/api/v1/address/create/${userId}`)
            .send(newAddress);

        expect(response.status).toBe(200);
    });
});

describe('PATCH /api/v1/address/update', () => {
    it('should update existing address based on addressId and return address object', async () => {
        const addressId = 2;
        const updateAddress = {
            "address": "Ijen Street Gg IV",
            "rt": 4,
            "rw": 8,
            "district": "Wonokromo",
            "city": "Surabaya",
            "province": "Jawa Timur"
        };
        const response = await request(app)
            .patch(`/api/v1/address/update/${addressId}`)
            .send(updateAddress);
        console.log(response.status);
        expect(response.status).toBe(200);
    });
});

describe('DELETE /api/v1/address/delete', () => {
    it('should delete existing address and return 200', async() => {
        const addressId = 3;
        const response = await request(app)
            .delete(`/api/v1/address/delete/${addressId}`);
            expect(response.status).toBe(200);
    });
});