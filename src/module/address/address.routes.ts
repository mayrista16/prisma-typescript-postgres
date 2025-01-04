import express from "express";
import AddressController from "./address.controller";
import { validate } from "../../middlewares/validate";
import addressValidate from "./address.validate";

const router = express.Router();

router.get("/getall", AddressController.getAddresses);
router.get("/get/:id", AddressController.getAddressById);
router.post("/create/:id", validate(addressValidate.createAddressValidate), AddressController.createAddress);
router.patch("/update/:id", validate(addressValidate.updateAddressValidate), AddressController.updateAddress);
router.delete("/delete/:id", validate(addressValidate.deleteAddressValidate), AddressController.deleteAddress);

export default router;