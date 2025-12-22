const Joi = require("joi");

const mongoIdShema=Joi.object({
   id:Joi.string().regex(/^[0-9a-fA-F]{24}$/)
   .required()
   .messages({
    "string.pattern.base": " le paramètre id doit être une chaine de 24 caractères hexadécimaux",
    "any.required": " le paramètre id est obligatoire"
 })
});

//schema permettant de recherche un element par par exmple pour une tache:
//  id  : represnte l'id de la tache
// secondary_id : l'id de la liste auquel appartient la tache
const mongoduoShema=Joi.object({
     id:Joi.string().regex(/^[0-9a-fA-F]{24}$/).
     required()
     .messages({
      "string.pattern.base": "id doit être une chaine de 24 caractères hexadécimaux",
      "any.required": "  le parmètre id est obligatoire"})
      .description("represente l'id unique de l'element l'ide généré par mongoDb"),
    secondary_id:Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
       "string.pattern.base": "_id  doit être une chaine de 24 caractères hexadécimaux",
       "any.required": "_id est obligatoire pour la recherche"})
       .description("represente l'id d'un autre d'objet lié avec l'element "),
});
module.exports=mongoIdShema;