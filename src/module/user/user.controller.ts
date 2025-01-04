import { Request, Response } from "express";
import { prisma } from "../../server";

const getUsers = async (req: Request, res: Response) => {
    try {
        const newGetUsers = await prisma.users.findMany();
        res.status(200).json(newGetUsers);
    } catch (e) {
        res.status(500).json({ error: e })
    }
};

const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
    const { id } = req.params;
    const newGetUserById = await prisma.users.findUnique({
        where: {
            id: Number(id),
        }
    });
    if (!newGetUserById) {
        res.status(404).json({ error: "User not found"});
        return 
    }
    res.status(200).json(newGetUserById);
    } catch (e) {
        res.status(500).json({ error: e });
        return 
    }
};

const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password, role } = req.body;
        
        // Check email is unique
        const existingEmail =  await prisma.users.findUnique({
            where: { email }
        });
        if (existingEmail) {
            res.status(400).json({ error: "Current email already registered"});
            return;
        }

        // Check username is unique
        const existingUser =  await prisma.users.findUnique({
            where: { username }
        });
        if (existingUser) {
            res.status(400).json({ error: "Current username already registered"});
            return;
        }

        const newCreateUser = await prisma.users.create({
            data: {
                username,
                email,
                password,
                role
            }
        });
        res.status(200).json(newCreateUser);
    } catch (e) {
        res.status(500).json({ error: '500 | Internal Server Error' });
    }
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { username, email, password, role } = req.body;

         // Check if email is already in use by another user
        const existingEmailUser = await prisma.users.findUnique({
            where: { email },
        });
    
        if (existingEmailUser && existingEmailUser.id !== Number(id)) {
            res.status(400).json({ error: "Email is already in use by another user." });
            return;
        }

        // Check username is unique
        const existingUser =  await prisma.users.findUnique({
            where: { username },
        });
        if (existingUser) {
            res.status(400).json({ error: "Current username already registered"});
            return;
        }

        const newUserUpdate = await prisma.users.update({
            where: {
                id: Number(id),
            },
            data: {
                username,
                email,
                password,
                role
            }
        });
        res.status(200).json(newUserUpdate);
    } catch (e){
        res.status(500).json({ error: e });
    }
};

const deleteUser = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const deletedCar = await prisma.users.delete({
            where: {
                id: Number(id),
            }
        });
        res.status(200).json(deletedCar);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

export default {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}