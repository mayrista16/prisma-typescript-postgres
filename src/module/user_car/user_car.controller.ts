import { Request, Response } from "express";
import { prisma } from "../../server";

const getUserCars = async (req: Request, res: Response) => {
    try {
        const newGetUserCars = await prisma.user_car.findMany();
        res.status(200).json(newGetUserCars);
    } catch (e) {
        res.status(400).json({ error: e })
    }
}

const getUserCarsById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const newGetUserCarById = await prisma.user_car.findUnique({
            where: {
                id: Number(id),
            }
        });
        res.status(200).json(newGetUserCarById);
    } catch (e) {
        res.status(400).json({ error: e });
    }
}

const createUserCar = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { carId, userId } = req.body;
        const newCreateUserCar = await prisma.user_car.create({
            data: {
                carId,
                userId
            }
        })
        res.status(200).json(newCreateUserCar);
    } catch (e) {
        res.status(400).json({ error: e });
    }
}

const updateUserCar = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { carId, userId } = req.body;
        const newUpdateUserCar = await prisma.user_car.update({
            where: {
                id: Number(id),
            },
            data: {
                carId,
                userId
            } 
        });
        res.status(200).json(newUpdateUserCar)
    } catch (e) {
        res.status(400).json({ error: e })
    }
}

const deleteUserCar = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const newDeleteUserCar = await prisma.cars.delete({
            where: {
                id: Number(id),
            }
        });
        res.status(200).json(newDeleteUserCar)
    } catch (e) {
        res.status(400).json({ error: e })
    }
}

export default {
    getUserCars,
    getUserCarsById,
    createUserCar,
    updateUserCar,
    deleteUserCar
}