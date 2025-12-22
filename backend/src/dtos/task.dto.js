const Joi = require("joi");
const taskSchema={
    label: Joi.string()
      .min(4)
      .required()
      .messages({
        "string.base": "Le label de la tâche doit être une chaîne de caractères",
        "string.empty": "Le label de la tâche est obligatoire",
        "string.min": "Le label de la tâche doit contenir au moins 4 caractères",
        "any.required": "Le label de la tâche est requis"
      })
};

const createtaskSchema=Joi.object({
    list_id:Joi.string().regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
    "string.pattern.base": "id doit être une chaine de 24 caractères hexadécimaux",
        "any.required": "list_id est obligatoire pour la recherche"}),
    ...taskSchema,

});
const updatetaskSchema=Joi.object({
    _id:Joi.string().regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
     "string.pattern.base": "_id de la tache doit être une chaine de 24 caractères hexadécimaux",
     "any.required": "_id est obligatoire pour la recherche"}),
    ...taskSchema,
    done:Joi.boolean().messages({"boolean.patern.base":"la valeur doit etre une booléen "})

});

module.exports={
 createtaskSchema,
};