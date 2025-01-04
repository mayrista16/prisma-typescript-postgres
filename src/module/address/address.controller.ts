import { Request, Response} from "express";
import { prisma } from "../../server"

const getAddresses = async (req: Request, res: Response) => {
    try{
        const newGetAddresses = await prisma.user_addresses.findMany();
        res.status(200).json(newGetAddresses);
    } catch (e) {
        res.status(500).json({ error: e })
    }
}

const getAddressById = async (req: Request, res: Response) => {
    try{
        const { id } = req.params
        const newGetAddressById = await prisma.user_addresses.findUnique({
            where: {
                id: Number(id),
            }
        });
        res.status(200).json(newGetAddressById)
    } catch (e) {
        res.status(400).json({ error: e })
    }
}

const createAddress = async (req: Request, res: Response) => {
    try{
        const { id } = req.params
        const { address, rt, rw, district, city, province } = req.body;
        const userId = parseInt(id, 10);

        const newCreateAddress = await prisma.user_addresses.create({
            data: {
                address,
                rt,
                rw,
                district,
                city,
                province,
                userId
            }
        })
        res.status(200).json(newCreateAddress)
    } catch (e) {
        res.status(500).json({
            error : '500 || Internal Server Error'
        });
    }
}

const updateAddress = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const userId = parseInt(id, 10);
        const { address, rt, rw, district, city, province } = req.body;

        const newUpdateAddress = await prisma.user_addresses.update({
            where: {
                id: Number(id),
            },
            data: {
                address,
                rt,
                rw,
                district,
                city,
                province
            }
        });
        res.status(200).json(newUpdateAddress)
    } catch (e){
        res.status(500).json({
            error: '500 || Internal Server Error'
        });
    }
}

const deleteAddress = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const deleteAddress = await prisma.user_addresses.delete({
            where: {
                id: Number(id),
            }
        });
        res.status(200).json(deleteAddress);
    } catch (e) {
        res.status(500).json({ error: e })
    }
}

export default {
    getAddresses,
    getAddressById,
    createAddress,
    updateAddress,
    deleteAddress,
}