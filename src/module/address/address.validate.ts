import Joi from "joi";

const createAddressValidate = Joi.object({
    address: Joi.string().min(2).max(50),
    rt: Joi.number().integer().min(1).max(100),
    rw: Joi.number().integer().min(1).max(100),
    district: Joi.string().min(2).max(30),
    city: Joi.string().min(2).max(30),
    province: Joi.string().min(2).max(30),
    userId: Joi.number().integer().required(),
});

const updateAddressValidate = Joi.object({
    id: Joi.string().uuid().required(),
    address: Joi.string().min(4).max(50),
    rt: Joi.number().integer().min(1).max(100),
    rw: Joi.number().integer().min(1).max(100),
    district: Joi.string().min(2).max(30),
    city: Joi.string().min(2).max(30),
    province: Joi.string().min(2).max(30),
    userId: Joi.number().integer().required(),
})

const deleteAddressValidate = Joi.object({
    id: Joi.string().uuid().required()
})

export default {
    createAddressValidate,
    updateAddressValidate,
    deleteAddressValidate
}