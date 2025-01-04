import express from "express";
import user_carController from "./user_car.controller";

const router = express.Router();

router.get("/getall", user_carController.getUserCars);
router.get("/get/:id", user_carController.getUserCarsById);
router.post("/create", user_carController.createUserCar);
router.patch("/update/:id", user_carController.updateUserCar);
router.delete("/delete/:id", user_carController.deleteUserCar);

export default router;