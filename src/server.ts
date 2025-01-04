import express, { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import CarRouter from "./module/car/car.routes";
import UserRouter from "./module/user/user.routes";
import AddressRouter from "./module/address/address.routes";
import UserCarRouter from "./module/user_car/user_car.route";
import LocationRouter from "./module/location/location.routes";


export const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
})

const app = express();
const port = 8080;

async function main() {
    app.use(express.json());
    app.use("/api/v1/car", CarRouter);
    app.use("/api/v1/user", UserRouter);
    app.use("/api/v1/address", AddressRouter);
    app.use("/api/v1/user_car", UserCarRouter);
    app.use("/api/v1/location", LocationRouter);

    app.all("*", (req: Request, res: Response) => {
        res.status(404).json({ error: `Route ${req.originalUrl} not found`});
    });

    if (process.env.NODE_ENV !== 'test') {
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    }
}

main()
    .then(async () => {
        await prisma.$connect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

export default app;