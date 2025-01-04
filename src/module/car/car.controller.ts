import { Request, Response } from "express";
import { prisma } from "../../server";

const getCars = async (req: Request, res: Response) => {
    try {
        const newGetCars = await prisma.cars.findMany();
        res.status(200).json(newGetCars);
    } catch (e) {
        res.status(500).json({ error: e })
    }
};

const getCarById = async (req: Request, res: Response) => {
    try {
    const { id } = req.params;
    const newGetCarById = await prisma.cars.findUnique({
        where: {
            id: Number(id),
        }
    });
    res.status(200).json(newGetCarById);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

const createCar = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, brand, release_year, plate_number, status } = req.body;
        const existingCar = await prisma.cars.findUnique({
            where: { plate_number }
        });
        if (existingCar) {
            res.status(400).json({ error: "Current plate number already registered." });
            return;
        }

        const newCreateCar = await prisma.cars.create({
            data: {
                name,
                brand,
                release_year,
                plate_number,
                status
            }
        });
        res.status(200).json(newCreateCar);
    } catch (e) {
        res.status(500).json({ error: '500 | Internal Server Error' });
    }
};

const updateCar = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, brand, release_year, plate_number, status } = req.body;
        const newCarUpdate = await prisma.cars.update({
            where: {
                id: Number(id),
            },
            data: {
                name,
                brand,
                release_year,
                plate_number,
                status
            }
        });
        res.status(200).json(newCarUpdate);
        return;
    } catch (e){
        res.status(500).json({ error: e });
        return;
    }
};

const deleteCar = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const deletedCar = await prisma.cars.delete({
            where: {
                id: Number(id),
            }
        });
        res.status(200).json(deletedCar);
    } catch (e) {
        res.status(500).json({ error: e })
    }
};

export default {
    getCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar,
}