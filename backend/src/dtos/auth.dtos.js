const Joi = require("joi");

const signUpSchema = Joi.object({
    first_name: Joi.string().min(3).required(),
    last_name: Joi.string().min(3).required(),
    adresse:Joi.string().min(7).default(""),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const updateShema=Joi.object({
    first_name: Joi.string().min(3),
    last_name: Joi.string().min(3),
    adresse:Joi.string().min(7).default(""),
    email: Joi.string().email(),
    password: Joi.string().min(6)
});


const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const tokenSchema=Joi.object({
    token:Joi.string().min(10).required()
});
module.exports = {
    signUpSchema,
    signInSchema,
    tokenSchema,
    updateShema
}