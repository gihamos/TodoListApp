const Joi = require("joi");

const listSchema = {
  description: Joi.string()
    .allow(null,"")
    .optional()
    .messages({
      "string.base": "La description doit être une chaîne de caractères"
    }),
};

const createListShema=Joi.object({
  label: Joi.string()
  .min(4)
  .required()
  .messages({
    "string.base": "Le nom de la tâche doit être une chaîne de caractères",
    "string.empty": "Le nom de la tâche est obligatoire",
    "string.min": "Le nom de la tâche doit contenir au moins 4 caractères",
    "any.required": "Le nom de la tâche est requis"
  }),
  
  ...listSchema,
  expireAt: Joi.date()
   .allow(null,"")
   .optional()
   .messages({
     "date.base": "La date d'expiration doit être une date valide"
   })
});

const updatelistShema=Joi.object({
  label: Joi.string()
  .min(4)
  .messages({
    "string.base": "Le nom de la tâche doit être une chaîne de caractères",
    "string.empty": "Le nom de la tâche est obligatoire",
    "string.min": "Le nom de la tâche doit contenir au moins 4 caractères",
  }),
  ...listSchema,
   expireAt: Joi.date()
  .allow(null,"")
  .optional()
  .messages({
    "date.base": "La date d'expiration doit être une date valide"
  })

});


module.exports = {
    createListShema,
    updatelistShema,
}