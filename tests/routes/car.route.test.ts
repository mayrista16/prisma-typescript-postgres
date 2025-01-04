import request from 'supertest';
import prisma from "../../client";
import app from "../../src/server";

beforeEach(async () => {
    //await prisma.cars.deleteMany();
});

describe('GET /api/v1/car/getall', () => {
    it('should return array of car initially', async () => {
        const response = await request(app).get('/api/v1/car/getall');
        expect(response.status).toBe(200);
    });
});

describe('GET /api/v1/car/get/:id', () => {
  it('should return an array of specifics car', async () => {
      const carId = 1;
      const response = await request(app).get(`/api/v1/car/get/${carId}`);
      expect(response.status).toBe(200);
  });
});

describe('POST /api/v1/car/create', () => {
    it('should create a new car and return the car object', async () => {
      const newCar = {
        "name": "Porsche Cayman XLS",
        "brand": "Porsche",
        "release_year": 2006,
        "plate_number": "N216RW",
        "status" : "available"
    };
      const response = await request(app)
        .post('/api/v1/car/create')
        .send(newCar);
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body.plate_number).toBe(newCar.plate_number);
    });
});

describe('PATCH /api/v1/car/update', () => {
  it('should update existing car and return the car object', async () => {
    const carId = 3;
    const updateCar = {
      "name": "Porsche Cayman M",
      "brand": "Porsche",
      "release_year": 2002,
      "plate_number": "N11GA",
      "status": "available"
    };
    const response = await request(app)
      .patch(`/api/v1/car/update/${carId}`)
      .send(updateCar);
      expect(response.status).toBe(200);
  })
})

describe('DELETE /api/v1/car/delete', () => {
  it('should delete existing car', async () => {
    const carId = 30;
    const response = await request(app)
      .delete(`/api/v1/car/delete/${carId}`);
      expect(response.status).toBe(200);
  })
})