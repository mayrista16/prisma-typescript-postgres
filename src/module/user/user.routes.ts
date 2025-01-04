import express from "express";
import UserController from "./user.controller";
import { validate } from "../../middlewares/validate";
import userValidate from "./user.validate";

const router = express.Router();

router.get("/getall", UserController.getUsers);
router.get("/get/:id", UserController.getUserById);
router.post("/create", validate(userValidate.createUserValidate), UserController.createUser);
router.patch("/update/:id", validate(userValidate.updateUserValidate), UserController.updateUser);
router.delete("/delete/:id", UserController.deleteUser);

export default router;