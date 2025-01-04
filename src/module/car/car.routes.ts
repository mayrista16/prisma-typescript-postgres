import express from "express";
import CarController from "./car.controller";
import { validate } from "../../middlewares/validate"
import carValidate from "./car.validate";

const router = express.Router();

router.get("/getall", CarController.getCars);
router.get("/get/:id", validate(carValidate.getCarByIdValidate), CarController.getCarById);
router.post("/create", validate(carValidate.createCarValidate), CarController.createCar);
router.patch("/update/:id", validate(carValidate.updateCarValidate), CarController.updateCar);
router.delete("/delete/:id", validate(carValidate.deleteCarByIdValidate), CarController.deleteCar);

export default router;