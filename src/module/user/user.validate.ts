import Joi from "joi";

const createUserValidate = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    role: Joi.string().valid("USER", "ADMIN", "SUPERADMIN").required(),
});

const updateUserValidate = Joi.object({
    id: Joi.number().integer().required(),
    username: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    role: Joi.string().valid("USER", "ADMIN", "SUPERADMIN"),
});

export default {
    createUserValidate,
    updateUserValidate
}