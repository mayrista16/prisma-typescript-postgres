import Joi from  "joi";

const getCarByIdValidate = Joi.object({
    id: Joi.number().integer().required()
})

const createCarValidate = Joi.object({
    name: Joi.string().min(3).max(40).required(),
    brand: Joi.string().min(2).max(30).required(),
    release_year: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
    plate_number: Joi.string().pattern(/^[A-Za-z0-9]+$/).required().messages({"string.pattern.base": "Plate number must only contain letter and number"}),
    status: Joi.string().valid("available", "unavailable").required()
});

const updateCarValidate = Joi.object({
    id: Joi.number().integer().required(),
    name: Joi.string().min(3).max(40),
    brand: Joi.string().min(2).max(30),
    release_year: Joi.number().integer().min(1900).max(new Date().getFullYear()),
    plate_number: Joi.string().pattern(/^[A-Za-z0-9]+$/).messages({"string.pattern.base": "Plate number must only contain letter and number"}),
    status: Joi.string().valid("available", "unavailable")
})

const deleteCarByIdValidate = Joi.object({
    id: Joi.number().integer().required()
})

export default {
    getCarByIdValidate,
    createCarValidate,
    updateCarValidate,
    deleteCarByIdValidate
}