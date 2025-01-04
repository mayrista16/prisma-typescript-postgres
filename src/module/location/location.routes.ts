import express from "express";
import LocationController from "./location.controller";

const router = express.Router();

router.get("/getall", LocationController.getLocation)
router.get("/get/:id", LocationController.getLocationById)
router.post("/create/", LocationController.createLocation)
router.patch("/update/:id", LocationController.updateLocation)
router.delete("/delete/:id", LocationController.deleteLocation)

export default router;