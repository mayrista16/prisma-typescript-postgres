import { Request, Response } from "express";
import { prisma } from "../../server";
import Joi from "joi";

const schema = Joi.object({
    location: Joi.string()
        .pattern(/^(POINT|LINESTRING|POLYGON)\s*\(.+\)$/i)
        .required()
        .messages({
            "string.base": "Location must be a string.",
            "string.empty": "Location cannot be empty.",
            "string.pattern.base": "Location must be a valid WKT format.",
            "any.required": "Location is required.",
        }),
    user_carId: Joi.number()
        .integer()
        .required()
        .messages({
            "number.base": "User car ID must be a number.",
            "number.integer": "User car ID must be an integer.",
            "any.required": "User car ID is required.",
        }),
});

const getLocation = async (req: Request, res: Response) => {
    try {
        const newGetLocations = await prisma.location.findMany();
        res.status(200).json(newGetLocations);
    } catch (e) {
        res.status(500).json({ error: e })
    }
};

const getLocationById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const newGetLocationById = await prisma.location.findUnique({
            where: {
                id: Number(id),
            }
        });
        res.status(200).json(newGetLocationById);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

const createLocation = async (req: Request, res: Response) => {
    try {
        const { location, user_carId } = req.body;
        const newCreateLocation = await prisma.location.create({
            data: {
                location,
                user_carId
            }
        });
        res.status(200).json(newCreateLocation);
    } catch (e) {
        res.status(500).json({ error: e })
    }
};

const updateLocation = async (req: Request, res: Response) => {
    try {
        const { error } = schema.validate(req.body);
        if (error) {
            res.status(400).json({ error: error.details[0].message })
            return
        }

        const { id } = req.params;
        const { location, user_carId } = req.body;

        const newUpdateLocation = await prisma.location.update({
            where: {
                id: Number(id),
            },
            data: {
                location,
                user_carId
            }
        });
        res.status(200).json(newUpdateLocation);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

const deleteLocation = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const newDeleteLocation = await prisma.location.delete({
            where: {
                id: Number(id),
            }
        });
        res.status(200).json(newDeleteLocation);
    } catch (e) {
        res.status(500).json({ error: e })
    }
}

export default {
    getLocation,
    getLocationById,
    createLocation,
    updateLocation,
    deleteLocation,
}